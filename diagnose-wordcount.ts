import fs from 'fs';
import path from 'path';

// Target word count
const TARGET_WORD_COUNT = 1500;

interface PageStats {
  filename: string;
  pageName: string;
  path: string;
  wordCount: number;
  status: 'PASSED' | 'FAILED';
  topWords: { word: string; count: number }[];
}

// Simple English stop words to exclude from top keywords
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'against', 'between', 'into',
  'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in',
  'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there',
  'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other',
  'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
  's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'i', 'you', 'he', 'she', 'it',
  'we', 'they', 'them', 'their', 'our', 'your', 'his', 'her', 'its', 'us', 'this', 'that',
  'these', 'those', 'have', 'has', 'had', 'do', 'does', 'did', 'but', 'if', 'then', 'else',
  'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between',
  'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up',
  'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once'
]);

function extractWords(content: string): string[] {
  // 1. Remove standard imports, exports, and React-specific code patterns
  let cleaned = content;
  
  // Remove top imports
  cleaned = cleaned.replace(/^import\s+[\s\S]*?from\s+['"].*?['"];?/gm, '');
  
  // Remove SVG structures completely
  cleaned = cleaned.replace(/<svg[\s\S]*?<\/svg>/g, '');
  
  // Remove useEffect and document.title updates, meta tag setups, schema definitions
  cleaned = cleaned.replace(/useEffect\(\(\)\s*=>\s*\{[\s\S]*?\},[^)]*?\);?/g, '');
  cleaned = cleaned.replace(/const\s+schema\s*=[\s\S]*?;/g, '');
  cleaned = cleaned.replace(/const\s+metaDescription\s*=[\s\S]*?;/g, '');
  
  // Remove JSX properties / attributes such as className="..." style={...} etc.
  cleaned = cleaned.replace(/className\s*=\s*["'][^"']*?["']/g, '');
  cleaned = cleaned.replace(/className\s*=\s*\{[^}]*?\}/g, '');
  cleaned = cleaned.replace(/id\s*=\s*["'][^"']*?["']/g, '');
  cleaned = cleaned.replace(/href\s*=\s*["'][^"']*?["']/g, '');
  cleaned = cleaned.replace(/src\s*=\s*[\w{}._-]+/g, '');
  cleaned = cleaned.replace(/alt\s*=\s*["'][^"']*?["']/g, '');
  cleaned = cleaned.replace(/style\s*=\s*\{[^}]*?\}/g, '');
  cleaned = cleaned.replace(/onClick\s*=\s*\{[^}]*?\}/g, '');
  cleaned = cleaned.replace(/size\s*=\s*["'][^"']*?["']/g, '');
  cleaned = cleaned.replace(/variant\s*=\s*["'][^"']*?["']/g, '');
  
  // Remove tailwind/CSS classes patterns and inline javascript keywords
  const keywordsToRemove = [
    'flex', 'grid', 'hidden', 'block', 'relative', 'absolute', 'fixed', 'inset-0', 'col-span',
    'rounded', 'shadow', 'border', 'text', 'bg', 'hover', 'focus', 'active', 'transition',
    'duration', 'ease', 'animate', 'pulse', 'spin', 'transform', 'translate', 'scale',
    'md:', 'lg:', 'xl:', 'sm:', 'dark:', 'group', 'cursor', 'opacity', 'w-full', 'h-full',
    'mx-auto', 'max-w', 'px-', 'py-', 'pt-', 'pb-', 'm-', 'p-', 'gap-', 'leading-', 'tracking-',
    'const', 'let', 'var', 'function', 'return', 'export', 'import', 'from', 'default', 'true', 'false',
    'null', 'undefined', 'void', 'interface', 'type', 'class', 'extends', 'implements', 'string',
    'number', 'boolean', 'any', 'array', 'object', 'React', 'useState', 'useEffect', 'useRef', 'useMemo',
    'useCallback', 'useContext', 'openQuote', 'closeQuote', 'toggleQuote', 'quoteOpen', 'quoteClose'
  ];
  
  // Replace symbols/punctuation with spaces
  cleaned = cleaned.replace(/[{}()\[\]<>=\/\\,.:;!?"'+#@%&|~`^*_]/g, ' ');
  
  // Now split into raw words
  const words = cleaned.split(/\s+/);
  
  // Filter out:
  // - empty strings
  // - single characters (unless 'a', 'i')
  // - purely numeric strings
  // - words that are technical terms or common tailwind classes
  const filteredWords = words.filter(word => {
    const lower = word.toLowerCase();
    if (!word || word.length <= 1) return false;
    if (/^\d+$/.test(word)) return false;
    if (keywordsToRemove.includes(lower)) return false;
    // Exclude words containing numbers or common hex/CSS codes
    if (/[0-9]/.test(word)) return false;
    return true;
  });
  
  return filteredWords;
}

function analyzePages() {
  const pagesDir = path.join(process.cwd(), 'src', 'pages');
  if (!fs.existsSync(pagesDir)) {
    console.error(`Pages directory not found at: ${pagesDir}`);
    return;
  }

  const files = fs.readdirSync(pagesDir);
  const reports: PageStats[] = [];

  for (const file of files) {
    if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;

    const filePath = path.join(pagesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const words = extractWords(content);
    
    // Count occurrences of each non-stopword for keyword analysis
    const wordCounts: { [key: string]: number } = {};
    for (const word of words) {
      const lower = word.toLowerCase();
      if (lower.length > 3 && !STOP_WORDS.has(lower)) {
        wordCounts[lower] = (wordCounts[lower] || 0) + 1;
      }
    }

    const topWords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));

    const pageName = file.replace(/\.(tsx|ts)$/, '');
    const wordCount = words.length;
    const status = wordCount >= TARGET_WORD_COUNT ? 'PASSED' : 'FAILED';

    reports.push({
      filename: file,
      pageName,
      path: `src/pages/${file}`,
      wordCount,
      status,
      topWords
    });
  }

  // Sort reports by status (FAILED first) and then by word count ascending
  reports.sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === 'FAILED' ? -1 : 1;
    }
    return a.wordCount - b.wordCount;
  });

  // Calculate statistics
  const totalPages = reports.length;
  const failedPages = reports.filter(r => r.status === 'FAILED').length;
  const passedPages = totalPages - failedPages;
  const passRate = ((passedPages / totalPages) * 100).toFixed(1);
  const averageWordCount = Math.round(reports.reduce((sum, r) => sum + r.wordCount, 0) / totalPages);

  // Print text console summary
  console.log('\n======================================================');
  console.log('       DIAGNOSTIC WORD COUNT REPORT SUMMARY           ');
  console.log('======================================================');
  console.log(`Total Pages Checked : ${totalPages}`);
  console.log(`Passed (>= 1500w)   : ${passedPages}`);
  console.log(`Failed (< 1500w)    : ${failedPages}`);
  console.log(`Compliance Rate     : ${passRate}%`);
  console.log(`Average Word Count  : ${averageWordCount} words`);
  console.log('======================================================\n');

  // Generate markdown report content
  let markdown = `# Site Pages Word Count & SEO Diagnostic Report

This report was automatically generated on **${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}** at **${new Date().toLocaleTimeString('en-US')}**.
It scans all TSX/TS page components under the \`src/pages\` directory, cleans code and layout markup, and calculates the actual human-readable prose word count against an industry-standard **1,500-word SEO target**.

---

## 📊 High-Level Metrics

| Metric | Value | Status / Notes |
| :--- | :--- | :--- |
| **Total Pages Scanned** | \`${totalPages}\` | All routes present in the workspace |
| **Passed Target (≥ 1,500 words)** | \`${passedPages}\` | Fully optimized for long-form SEO authority |
| **Failed Target (< 1,500 words)** | \`${failedPages}\` | Flagged for content expansion / diagnostics |
| **Compliance Rate** | \`${passRate}%\` | Overall score |
| **Average Word Count** | \`${averageWordCount} words\` | Representative of total site density |

---

## 🚨 Detailed Page Analysis

Below is the complete list of site pages, sorted with failed pages first to highlight areas needing expansion.

| Status | Page Name | Current Word Count | % of Target | Top Focus Keywords | File Path |
| :---: | :--- | :---: | :---: | :--- | :--- |
`;

  for (const r of reports) {
    const statusEmoji = r.status === 'PASSED' ? '✅' : '⚠️';
    const percent = ((r.wordCount / TARGET_WORD_COUNT) * 100).toFixed(0);
    const keywordsStr = r.topWords.map(kw => `\`${kw.word}\` (${kw.count})`).join(', ') || 'N/A';
    
    markdown += `| ${statusEmoji} **${r.status}** | **${r.pageName}** | ${r.wordCount.toLocaleString()} | ${percent}% | ${keywordsStr} | \`${r.path}\` |\n`;
  }

  markdown += `
---

## 💡 Practical Recommendations for Low-Word-Count Pages

For the **${failedPages} pages** falling below the 1,500-word SEO threshold, consider implementing these content enhancement strategies:

1. **Add DFW Local Relevance Sub-sections**:
   - Integrate specific references to DFW cities, highway access, local business districts, and county-specific compliance or communication requirements.
   - Detail local on-site implementation processes, technician dispatch steps, and on-premises physical layout reviews for businesses in Fort Worth, Dallas, Plano, etc.

2. **Expand the Technical Specifications & FAQs**:
   - Provide an in-depth breakdown of network requirements, QoS (Quality of Service) router configurations, VLAN setups, and internet bandwidth calculations.
   - Include a dedicated, highly contextual Frequently Asked Questions (FAQ) section targeting long-tail voice search queries (e.g., *"How does latency impact VoIP call quality in Fort Worth legal offices?"*).

3. **Include Rich Use-Cases & Vertical Insights**:
   - Describe multi-department setups (e.g., reception desk routing, executive softphones, warehouse paging integration).
   - Detail industry-specific workflow integrations (CRM syncing, HIPAA logging policies, or high-volume call handling for retail/hospitality).

4. **Add Detailed Comparison Matrices**:
   - Contrast native Zultys MXIE / ZAC features directly against legacy PBX architectures or specific cloud alternatives with a multi-paragraph descriptive explanation.
`;

  // Write markdown report to disk
  const reportPath = path.join(process.cwd(), 'WORD_COUNT_REPORT.md');
  fs.writeFileSync(reportPath, markdown, 'utf8');
  console.log(`Successfully generated visual report at: ${reportPath}`);
}

analyzePages();
