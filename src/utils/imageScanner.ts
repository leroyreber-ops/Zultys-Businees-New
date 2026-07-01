import fs from 'fs';
import path from 'path';

export interface ImageAuditItem {
  id: string;
  filePath: string;
  lineNumber: number;
  tagName: string;
  rawLine: string;
  src: string;
  alt: string | null;
  status: 'missing' | 'empty' | 'valid';
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
      // Skip node_modules, dist, .git
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

// Convert camelCase or PascalCase to spaced words
function formatPageName(name: string): string {
  return name
    .replace(/([A-Z]+)/g, ' $1')
    .replace(/([A-Z][a-z])/g, ' $1')
    .trim()
    .replace(/\s+/g, ' ');
}

// Create clean label from src
function formatSrcLabel(src: string): string {
  // If it's a variable name in uppercase
  if (/^[A-Z0-9_]+$/.test(src)) {
    return src.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
  }
  
  // If it's a path, get the filename
  const filename = path.basename(src).split('?')[0];
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
  
  return nameWithoutExt
    .replace(/[-_]+/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/\s+/g, ' ');
}

export function scanImagesInProject(): ImageAuditItem[] {
  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) return [];

  const files = getFilesRecursively(srcDir);
  const items: ImageAuditItem[] = [];

  files.forEach(filePath => {
    const relativePath = path.relative(process.cwd(), filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Look for `<img` or `<ImageWithFallback`
      if (line.includes('<img') || line.includes('<ImageWithFallback')) {
        const tagName = line.includes('<ImageWithFallback') ? 'ImageWithFallback' : 'img';
        
        // Extract src attribute: match src="..." or src={...}
        let src = 'Unknown';
        const srcMatch = line.match(/src=(?:"([^"]*)"|{([^}]*)})/);
        if (srcMatch) {
          src = srcMatch[1] || srcMatch[2] || 'Unknown';
        }

        // Extract alt attribute: match alt="..." or alt={...}
        let alt: string | null = null;
        let status: 'missing' | 'empty' | 'valid' = 'missing';

        const altMatch = line.match(/alt=(?:"([^"]*)"|{([^}]*)})/);
        if (altMatch) {
          alt = altMatch[1] !== undefined ? altMatch[1] : (altMatch[2] !== undefined ? altMatch[2] : null);
          if (alt === '') {
            status = 'empty';
          } else if (alt !== null) {
            status = 'valid';
          }
        } else {
          // Multiline check: if no alt attribute is found on the main line
          let fullTagText = line;
          let altFoundInAdjacent = false;
          let tempAlt: string | null = null;
          
          if (!line.includes('/>') && !line.includes('</img') && !line.includes('</ImageWithFallback')) {
            for (let offset = 1; offset <= 6; offset++) {
              if (index + offset < lines.length) {
                const nextLine = lines[index + offset];
                fullTagText += ' ' + nextLine;
                const innerAltMatch = nextLine.match(/alt=(?:"([^"]*)"|{([^}]*)})/);
                if (innerAltMatch) {
                  altFoundInAdjacent = true;
                  tempAlt = innerAltMatch[1] !== undefined ? innerAltMatch[1] : (innerAltMatch[2] !== undefined ? innerAltMatch[2] : null);
                  break;
                }
                if (nextLine.includes('/>') || nextLine.includes('</img') || nextLine.includes('</ImageWithFallback')) {
                  break;
                }
              }
            }
          }

          if (altFoundInAdjacent) {
            alt = tempAlt;
            status = alt === '' ? 'empty' : 'valid';
          } else {
            status = 'missing';
          }
        }

        const pageName = path.basename(filePath, '.tsx');
        const id = Buffer.from(`${relativePath}:${index + 1}`).toString('base64');

        items.push({
          id,
          filePath: relativePath,
          lineNumber: index + 1,
          tagName,
          rawLine: line.trim(),
          src,
          alt,
          status,
          pageName
        });
      }
    });
  });

  return items;
}

export function generateSeoSuggestion(pageName: string, src: string): string {
  const cleanPage = formatPageName(pageName);
  const cleanSrc = formatSrcLabel(src);

  // Common high-ranking SEO DFW business phrases
  const keywordDfw = "Dallas-Fort Worth business communication solutions";
  const keywordZultys = "Zultys IP phone systems and unified communications";

  if (cleanPage === "Home") {
    if (cleanSrc.toLowerCase().includes("hero")) {
      return `DFW Zultys Dealer - ${keywordZultys} and cloud phone setups for Dallas-Fort Worth companies`;
    }
    return `Dallas-Fort Worth Zultys Partner - ${cleanSrc} office telecom options`;
  }

  if (cleanPage.toLowerCase().includes("vs")) {
    return `${cleanPage} Comparison - ${keywordZultys} vs competitor office phone systems`;
  }

  if (cleanPage.toLowerCase().includes("city") || cleanPage.toLowerCase().includes("page")) {
    return `Local Zultys Partner - Business VoIP and phone installation solutions in DFW`;
  }

  // Fallback beautiful suggestion
  return `Authorized Zultys Partner: ${cleanPage} - ${cleanSrc} featuring high-performance ${keywordDfw}`;
}

export function updateAltTagInFile(
  filePath: string,
  lineNumber: number,
  newAlt: string
): boolean {
  const absolutePath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(absolutePath)) {
    return false;
  }

  const content = fs.readFileSync(absolutePath, 'utf-8');
  const lines = content.split('\n');
  const targetLineIdx = lineNumber - 1;

  if (targetLineIdx < 0 || targetLineIdx >= lines.length) {
    return false;
  }

  const originalLine = lines[targetLineIdx];

  // Replace existing alt attribute or inject it
  let updatedLine = originalLine;
  const hasAltAttribute = originalLine.match(/alt=(?:"[^"]*"|{[^}]*})/);

  if (hasAltAttribute) {
    updatedLine = originalLine.replace(/alt=(?:"[^"]*"|{[^}]*})/, `alt="${newAlt}"`);
  } else {
    // If not found, check if it's a self-closing or regular tag
    if (originalLine.includes('/>')) {
      updatedLine = originalLine.replace('/>', ` alt="${newAlt}" />`);
    } else if (originalLine.includes('>')) {
      updatedLine = originalLine.replace('>', ` alt="${newAlt}">`);
    } else {
      updatedLine = originalLine + ` alt="${newAlt}"`;
    }
  }

  lines[targetLineIdx] = updatedLine;
  fs.writeFileSync(absolutePath, lines.join('\n'), 'utf-8');
  return true;
}
