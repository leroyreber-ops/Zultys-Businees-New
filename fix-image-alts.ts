import fs from 'fs';
import path from 'path';

interface AuditItem {
  filePath: string;
  lineNumber: number;
  tagName: string;
  rawLine: string;
  src: string;
  oldAlt: string | null;
  newAlt: string;
  pageName: string;
}

// Helper to recursively find files in directory
function getFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return [];
  
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
        results = results.concat(getFilesRecursively(filePath));
      }
    } else {
      if (filePath.endsWith('.tsx')) {
        results.push(filePath);
      }
    }
  });
  return results;
}

// Format page names to clean English
function formatPageName(name: string): string {
  // e.g. "ZultysVsRingCentral" -> "Zultys Vs RingCentral"
  return name
    .replace(/([A-Z]+)/g, ' $1')
    .replace(/([A-Z][a-z])/g, ' $1')
    .trim()
    .replace(/\s+/g, ' ');
}

// Extract human descriptive names from image sources
function formatSrcLabel(src: string): string {
  if (!src || src === 'Unknown') return 'business phone systems';
  
  // If it's a variable name in uppercase, e.g. SUPPORT_TEAM
  if (/^[A-Z0-9_]+$/.test(src)) {
    return src.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
  }
  
  // Extract filename
  const filename = path.basename(src).split('?')[0];
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
  
  return nameWithoutExt
    .replace(/[-_]+/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/\s+/g, ' ');
}

// Generate highly custom, SEO-friendly, context-aware alt text
function generateContextualAlt(pageName: string, filePath: string, src: string): string {
  const cleanPage = formatPageName(pageName);
  const cleanSrc = formatSrcLabel(src);

  const dfwKeywords = [
    "Dallas-Fort Worth business communications",
    "authorized Zultys IP phone solutions",
    "DFW cloud VoIP office setup",
    "Zultys unified communications",
    "business telephone system installation"
  ];

  // Detect local DFW city pages
  // e.g. src/pages/Arlington.tsx or src/pages/Frisco.tsx
  const isCityPage = filePath.includes('/pages/') && 
    !['Home', 'About', 'Contact', 'Blog', 'Products', 'Solutions', 'Sitemap', 'Pricing', 'FAQPage', 'NotFound'].includes(pageName) &&
    !pageName.startsWith('Blog') && !pageName.startsWith('Zultys');

  if (isCityPage) {
    const city = cleanPage;
    if (cleanSrc.toLowerCase().includes('hero') || cleanSrc.toLowerCase().includes('bg') || cleanSrc.toLowerCase().includes('background')) {
      return `Authorized Zultys Phone Systems and Cloud VoIP Installation in ${city}, Texas`;
    }
    if (cleanSrc.toLowerCase().includes('phone') || cleanSrc.toLowerCase().includes('model') || cleanSrc.toLowerCase().includes('z21') || cleanSrc.toLowerCase().includes('zip')) {
      return `Zultys IP Phone Hardware setup for local companies in ${city} TX`;
    }
    return `Zultys unified communications support and business telephone systems in ${city}, Texas`;
  }

  // Competitor comparison pages
  if (pageName.startsWith('ZultysVs')) {
    const competitor = cleanPage.replace('Zultys Vs ', '');
    return `Zultys vs ${competitor} comparison - Best business VoIP phone systems for DFW enterprise companies`;
  }

  // Blog pages
  if (pageName.startsWith('Blog')) {
    return `${cleanPage} - SEO optimization and Zultys unified communications advice for DFW businesses`;
  }

  // Specific Product hardware pages
  if (pageName.startsWith('Z2') || pageName.startsWith('ZIP') || pageName.includes('MX')) {
    return `Zultys ${cleanPage} Business IP Telephone hardware - Premium VoIP desktop solutions`;
  }

  // Common main pages
  if (pageName === 'Home') {
    if (cleanSrc.toLowerCase().includes('hero')) {
      return `Fort Worth Zultys Dealer - #1 Authorized Partner for Dallas-Fort Worth business VoIP phone systems`;
    }
    if (cleanSrc.toLowerCase().includes('support') || cleanSrc.toLowerCase().includes('team')) {
      return `Local Dallas-Fort Worth Zultys certified technical support and setup crew`;
    }
    return `Dallas-Fort Worth Zultys Phone Partner - ${cleanSrc} office telecommunication options`;
  }

  if (pageName === 'About') {
    return `About DFW Business Communications - Experienced Zultys dealer in Fort Worth and Dallas, Texas`;
  }

  if (pageName === 'Contact') {
    return `Contact DFW Business Communications - Speak with our Fort Worth Zultys IP phone installation experts`;
  }

  if (pageName === 'Pricing') {
    return `DFW Zultys Phone Systems pricing packages and VoIP cloud subscription plans`;
  }

  // General Fallback
  const randomKeyword = dfwKeywords[Math.floor(Math.random() * dfwKeywords.length)];
  return `Authorized Zultys Partner - ${cleanPage} showing ${cleanSrc} with ${randomKeyword}`;
}

export function runAutoFix() {
  console.log("=================================================================");
  console.log("   ZULTYS DFW - AUTO-FIX SEO IMAGE ALT ATTRIBUTES SCRIPT         ");
  console.log("=================================================================");
  
  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) {
    console.error("Could not find /src directory!");
    process.exit(1);
  }

  const files = getFilesRecursively(srcDir);
  console.log(`Discovered ${files.length} source code files. Scanning...`);

  const repairedItems: AuditItem[] = [];
  let totalImagesScanned = 0;

  files.forEach(filePath => {
    const relativePath = path.relative(process.cwd(), filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let hasChanges = false;

    const pageName = path.basename(filePath, '.tsx');

    lines.forEach((line, index) => {
      // Find matches for img or ImageWithFallback
      if (line.includes('<img') || line.includes('<ImageWithFallback')) {
        totalImagesScanned++;
        const tagName = line.includes('<ImageWithFallback') ? 'ImageWithFallback' : 'img';
        
        // Extract src attribute: match src="..." or src={...}
        let src = 'Unknown';
        const srcMatch = line.match(/src=(?:"([^"]*)"|{([^}]*)})/);
        if (srcMatch) {
          src = srcMatch[1] || srcMatch[2] || 'Unknown';
        }

        // Determine if alt is missing or empty
        let isLackingAlt = false;
        let originalAlt: string | null = null;

        const altMatch = line.match(/alt=(?:"([^"]*)"|{([^}]*)})/);
        if (altMatch) {
          originalAlt = altMatch[1] !== undefined ? altMatch[1] : (altMatch[2] !== undefined ? altMatch[2] : null);
          if (originalAlt === '') {
            isLackingAlt = true;
          }
        } else {
          // Check multiline - if there's no alt attribute at all on this line
          let fullTagText = line;
          let altFoundInAdjacent = false;
          let adjacentAlt: string | null = null;

          if (!line.includes('/>') && !line.includes('</img') && !line.includes('</ImageWithFallback')) {
            for (let offset = 1; offset <= 6; offset++) {
              if (index + offset < lines.length) {
                const nextLine = lines[index + offset];
                fullTagText += ' ' + nextLine;
                const innerAltMatch = nextLine.match(/alt=(?:"([^"]*)"|{([^}]*)})/);
                if (innerAltMatch) {
                  altFoundInAdjacent = true;
                  adjacentAlt = innerAltMatch[1] !== undefined ? innerAltMatch[1] : (innerAltMatch[2] !== undefined ? innerAltMatch[2] : null);
                  break;
                }
                if (nextLine.includes('/>') || nextLine.includes('</img') || nextLine.includes('</ImageWithFallback')) {
                  break;
                }
              }
            }
          }

          if (altFoundInAdjacent) {
            originalAlt = adjacentAlt;
            if (originalAlt === '') {
              isLackingAlt = true;
            }
          } else {
            isLackingAlt = true;
          }
        }

        if (isLackingAlt) {
          // Generate customized alt description
          const generatedAlt = generateContextualAlt(pageName, relativePath, src);
          
          // Modify the line in memory
          let updatedLine = line;
          const hasAltAttr = line.match(/alt=(?:"[^"]*"|{[^}]*})/);

          if (hasAltAttr) {
            updatedLine = line.replace(/alt=(?:"[^"]*"|{[^}]*})/, `alt="${generatedAlt}"`);
          } else {
            if (line.includes('/>')) {
              updatedLine = line.replace('/>', ` alt="${generatedAlt}" />`);
            } else if (line.includes('>')) {
              updatedLine = line.replace('>', ` alt="${generatedAlt}">`);
            } else {
              updatedLine = line + ` alt="${generatedAlt}"`;
            }
          }

          lines[index] = updatedLine;
          hasChanges = true;

          repairedItems.push({
            filePath: relativePath,
            lineNumber: index + 1,
            tagName,
            rawLine: line.trim(),
            src,
            oldAlt: originalAlt,
            newAlt: generatedAlt,
            pageName
          });
        }
      }
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
    }
  });

  // Print results summary
  console.log("\n-----------------------------------------------------------------");
  console.log("   SCAN & REPAIR COMPLETED SUCCESSFULY                           ");
  console.log("-----------------------------------------------------------------");
  console.log(`Total Image Tags Audited: ${totalImagesScanned}`);
  console.log(`Total Lacking/Empty Alt Attributes Patched: ${repairedItems.length}`);
  console.log("-----------------------------------------------------------------");

  if (repairedItems.length > 0) {
    console.log("\nSample of repaired tags:");
    repairedItems.slice(0, 10).forEach((item, i) => {
      console.log(`[${i + 1}] File: ${item.filePath}:${item.lineNumber} (${item.pageName})`);
      console.log(`    Src: ${item.src}`);
      console.log(`    Original Alt: ${item.oldAlt === '' ? '"" (empty)' : 'None'}`);
      console.log(`    Generated Alt: "${item.newAlt}"`);
    });

    if (repairedItems.length > 10) {
      console.log(`    ... and ${repairedItems.length - 10} more images.`);
    }

    // Generate markdown report
    const reportPath = path.join(process.cwd(), 'IMAGE_ALT_REPAIR_REPORT.md');
    let md = `# SEO & Accessibility Image Alt Tag Repair Report\n\n`;
    md += `**Date:** ${new Date().toISOString().substring(0, 10)}\n`;
    md += `**Audited Images Total:** ${totalImagesScanned}\n`;
    md += `**Auto-repaired Empty/Missing Alt Tags:** ${repairedItems.length}\n\n`;
    md += `Below is the list of files modified to improve Google image indexing and screen reader compatibility:\n\n`;
    md += `| File Path | Line | Component/Tag | Image Source | Generated Alt Text | Status |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

    repairedItems.forEach(item => {
      const cleanSrc = item.src.length > 40 ? item.src.substring(0, 37) + '...' : item.src;
      md += `| \`${item.filePath}\` | \`${item.lineNumber}\` | \`${item.tagName}\` | \`${cleanSrc}\` | **"${item.newAlt}"** | ✅ Patched |\n`;
    });

    fs.writeFileSync(reportPath, md, 'utf-8');
    console.log(`\nA comprehensive report has been written to: IMAGE_ALT_REPAIR_REPORT.md\n`);
  } else {
    console.log("\n🎉 All images in the codebase are already optimized with high-quality SEO descriptive Alt tags!");
  }
}

// Execute
runAutoFix();
