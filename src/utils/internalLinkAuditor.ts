import fs from "fs";
import path from "path";
import { productKeywords, cityKeywords } from "./seoLinker";
import { extractRoutesFromApp } from "./sitemapGenerator";

export interface InternalLinkOpportunity {
  id: string;
  filePath: string;
  pageName: string;
  keyword: string;
  targetRoute: string;
  contextSnippet: string;
  lineNumber: number;
  status: 'pending' | 'applied';
}

/**
 * Recursively gets all .tsx pages in the src/pages directory
 */
function getPageFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      getPageFiles(filePath, arrayOfFiles);
    } else {
      if (file.endsWith(".tsx")) {
        // Skip administrative / dashboard / template pages
        if (
          file !== "SEODashboard.tsx" &&
          file !== "NotFound.tsx" &&
          file !== "Sitemap.tsx" &&
          file !== "BlogPost.tsx"
        ) {
          arrayOfFiles.push(filePath);
        }
      }
    }
  });

  return arrayOfFiles;
}

/**
 * Maps a page component name to its route in App.tsx
 */
function getRouteForPage(pageName: string): string | null {
  const lower = pageName.toLowerCase();
  if (lower === "home") return "/";
  if (lower === "about") return "/about";
  if (lower === "contact") return "/contact";
  if (lower === "pricing") return "/zultys-pricing";
  if (lower === "blog") return "/blog";

  try {
    const appPath = path.join(process.cwd(), "src", "App.tsx");
    if (fs.existsSync(appPath)) {
      const appContent = fs.readFileSync(appPath, "utf8");
      const regex = new RegExp(`normalizedPath\\s*===\\s*['"]([^'"]+)['"]\\s*return\\s*<${pageName}\\s*\\/?>`, "i");
      const match = appContent.match(regex);
      if (match && match[1]) {
        return match[1];
      }
    }
  } catch (e) {
    console.error("Error mapping page to route in App.tsx:", e);
  }

  return `/${lower}`;
}

/**
 * Checks if a match index is within a JSX text node (not inside an attribute, tag, or code block)
 */
function isMatchInTextNode(content: string, index: number): boolean {
  // 1. Check if we are inside a tag definition (between < and >)
  let beforeOpen = -1;
  let beforeClose = -1;
  for (let i = index - 1; i >= 0; i--) {
    if (content[i] === '<') { beforeOpen = i; break; }
    if (content[i] === '>') { beforeClose = i; break; }
  }

  if (beforeOpen !== -1 && (beforeClose === -1 || beforeOpen > beforeClose)) {
    return false; // Inside <tag attr="val">
  }

  // 2. Check if we are inside a curly-braced JS/TS expression in JSX
  let braceCount = 0;
  for (let i = index - 1; i >= 0; i--) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
  }
  if (braceCount > 0) {
    return false; // Inside {...}
  }

  // 3. Ensure we are not inside imports, comment blocks, or code-level constants
  let lineStart = 0;
  for (let i = index - 1; i >= 0; i--) {
    if (content[i] === '\n') {
      lineStart = i + 1;
      break;
    }
  }
  let lineEnd = content.length;
  for (let i = index; i < content.length; i++) {
    if (content[i] === '\n') {
      lineEnd = i;
      break;
    }
  }
  const lineText = content.substring(lineStart, lineEnd).trim();
  if (
    lineText.startsWith("import ") ||
    lineText.startsWith("const ") ||
    lineText.startsWith("export ") ||
    lineText.startsWith("function ") ||
    lineText.startsWith("return (") ||
    lineText.startsWith("//") ||
    lineText.startsWith("/*") ||
    lineText.startsWith("*") ||
    lineText.includes("useSEO(") ||
    lineText.includes("className=") ||
    lineText.includes("title=") ||
    lineText.includes("metaDescription=")
  ) {
    return false;
  }

  return true;
}

/**
 * Scans the project for internal link opportunities
 */
export function scanInternalLinks(): InternalLinkOpportunity[] {
  const opportunities: InternalLinkOpportunity[] = [];
  const pagesDir = path.join(process.cwd(), "src", "pages");
  const pageFiles = getPageFiles(pagesDir);
  const activeRoutes = extractRoutesFromApp();

  // Combine keywords, sorting by length descending to match longest phrases first
  const allKeywords = [...productKeywords, ...cityKeywords].sort(
    (a, b) => b.phrase.length - a.phrase.length
  );

  for (const filePath of pageFiles) {
    const pageName = path.basename(filePath, ".tsx");
    const relativePath = path.relative(process.cwd(), filePath);
    const pageRoute = getRouteForPage(pageName);

    if (!pageRoute) continue;

    try {
      const content = fs.readFileSync(filePath, "utf8");

      for (const keywordMapping of allKeywords) {
        const keyword = keywordMapping.phrase;
        const targetRoute = keywordMapping.url;

        // Rule 1: Skip self-referencing links
        if (targetRoute === pageRoute) {
          continue;
        }

        // Rule 2: Verify the target route is actually a valid route in App.tsx
        if (!activeRoutes.includes(targetRoute)) {
          continue;
        }

        // Rule 3: Skip if the file already contains the target route linked
        const alreadyLinkedPattern = new RegExp(`(to|href)\\s*=\\s*["']${targetRoute}["']`, "i");
        if (alreadyLinkedPattern.test(content)) {
          continue;
        }

        // Search for the keyword
        const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        const regex = new RegExp(`\\b(${escapedKeyword})\\b`, "gi");

        let match;
        let matchCount = 0;

        // Reset regex index
        regex.lastIndex = 0;

        while ((match = regex.exec(content)) !== null) {
          const index = match.index;
          const matchedPhrase = match[0];

          // Rule 4: Verify the match is within a visible JSX text node
          if (isMatchInTextNode(content, index)) {
            // Find line number
            let lineNumber = 1;
            for (let i = 0; i < index; i++) {
              if (content[i] === '\n') lineNumber++;
            }

            // Get context snippet (about 40 chars before and after)
            const startSnippet = Math.max(0, index - 45);
            const endSnippet = Math.min(content.length, index + matchedPhrase.length + 45);
            let snippet = content.substring(startSnippet, endSnippet).replace(/\n/g, " ").trim();
            if (startSnippet > 0) snippet = "..." + snippet;
            if (endSnippet < content.length) snippet = snippet + "...";

            const opportunityId = `${pageName}-${keyword.replace(/\s+/g, "-")}-${lineNumber}`;

            opportunities.push({
              id: opportunityId,
              filePath: relativePath,
              pageName,
              keyword: matchedPhrase,
              targetRoute,
              contextSnippet: snippet,
              lineNumber,
              status: 'pending'
            });

            // We only recommend one link per keyword/target URL per page to avoid keyword stuffing
            matchCount++;
            if (matchCount >= 1) {
              break;
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error auditing file ${filePath}:`, err);
    }
  }

  return opportunities;
}

/**
 * Injects a context-aware internal link into a source file
 */
export function injectInternalLink(
  filePath: string,
  lineNumber: number,
  keyword: string,
  targetRoute: string
): boolean {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) return false;

  try {
    const lines = fs.readFileSync(fullPath, "utf8").split("\n");
    if (lineNumber < 1 || lineNumber > lines.length) return false;

    const targetLineIndex = lineNumber - 1;
    const originalLine = lines[targetLineIndex];

    // Escape regex characters of the keyword
    const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const keywordRegex = new RegExp(`\\b(${escapedKeyword})\\b`, "i");

    if (!keywordRegex.test(originalLine)) {
      console.warn(`Keyword "${keyword}" not found on line ${lineNumber} of ${filePath}`);
      return false;
    }

    // Wrap keyword with <Link> tag
    const replacement = `<Link to="${targetRoute}">${keyword}</Link>`;
    const newLine = originalLine.replace(keywordRegex, replacement);
    lines[targetLineIndex] = newLine;

    // Check if the page has HashLink imported as Link
    let content = lines.join("\n");
    const hasHashLinkImport = content.includes("import { HashLink as Link }");
    const hasLinkImport = content.includes("import { Link }");

    if (!hasHashLinkImport && !hasLinkImport) {
      // Find where to prepend or insert the import statement
      // Prepend at the top, or after any import
      let lastImportIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith("import ")) {
          lastImportIndex = i;
        }
      }

      // Compute correct relative path to HashLink
      // Since page files are typically in `src/pages` or `src/pages/<subfolder>`,
      // we can calculate the relative path based on the directory depth
      const parts = filePath.split(path.sep);
      const depth = parts.length - 2; // e.g. src/pages/About.tsx -> depth 1
      const prefix = depth > 1 ? "../".repeat(depth) : "../";
      const importStatement = `import { HashLink as Link } from '${prefix}components/HashLink';`;

      if (lastImportIndex !== -1) {
        lines.splice(lastImportIndex + 1, 0, importStatement);
      } else {
        lines.unshift(importStatement);
      }
      content = lines.join("\n");
    }

    fs.writeFileSync(fullPath, content, "utf8");
    return true;
  } catch (err) {
    console.error(`Error auto-injecting internal link in ${filePath} on line ${lineNumber}:`, err);
    return false;
  }
}
