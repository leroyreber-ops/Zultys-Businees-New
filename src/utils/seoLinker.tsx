import React from 'react';
import { HashLink as Link } from '../components/HashLink';

export interface KeywordLink {
  phrase: string;
  url: string;
}

// Main dictionary of high-intent keywords mapped to product and solution pages
export const productKeywords: KeywordLink[] = [
  { phrase: 'Zultys business phone systems', url: '/fort-worth-zultys-business-phone-systems' },
  { phrase: 'Zultys business phone system', url: '/fort-worth-zultys-business-phone-systems' },
  { phrase: 'business phone systems', url: '/fort-worth-zultys-business-phone-systems' },
  { phrase: 'business phone system', url: '/fort-worth-zultys-business-phone-systems' },
  { phrase: 'Zultys IP Phones', url: '/dallas-zultys-phones' },
  { phrase: 'Zultys IP Phone', url: '/dallas-zultys-phones' },
  { phrase: 'VoIP phone systems', url: '/fort-worth-zultys-cloud-services' },
  { phrase: 'VoIP phone system', url: '/fort-worth-zultys-cloud-services' },
  { phrase: 'Zultys cloud phone systems', url: '/fort-worth-zultys-cloud-services' },
  { phrase: 'Zultys cloud phone system', url: '/fort-worth-zultys-cloud-services' },
  { phrase: 'cloud phone systems', url: '/fort-worth-zultys-cloud-services' },
  { phrase: 'cloud phone system', url: '/fort-worth-zultys-cloud-services' },
  { phrase: 'Zultys Advanced Communicator', url: '/fort-worth-zultys-zac' },
  { phrase: 'Mobile ZAC', url: '/fort-worth-zultys-mxmobile' },
  { phrase: 'Zultys MXmobile', url: '/fort-worth-zultys-mxmobile' },
  { phrase: 'MXmobile', url: '/fort-worth-zultys-mxmobile' },
  { phrase: 'Integrated Contact Center', url: '/fort-worth-zultys-contact-center' },
  { phrase: 'Zultys Contact Center', url: '/fort-worth-zultys-contact-center' },
  { phrase: 'Contact Center', url: '/fort-worth-zultys-contact-center' },
  { phrase: 'HIPAA compliant VoIP', url: '/hipaa-compliant-voip' },
  { phrase: 'HIPAA compliant', url: '/hipaa-compliant-voip' },
  { phrase: 'Zultys MX Series', url: '/fort-worth-zultys-mx-series' },
  { phrase: 'MX Series', url: '/fort-worth-zultys-mx-series' },
  { phrase: 'Zultys MX-SE', url: '/fort-worth-zultys-mx-se' },
  { phrase: 'MX-SE', url: '/fort-worth-zultys-mx-se' },
  { phrase: 'ZIP 49GA', url: '/fort-worth-zultys-zip-49g-phone' },
  { phrase: 'ZIP 49G', url: '/fort-worth-zultys-zip-49g-phone' },
  { phrase: 'ZIP 47GE', url: '/fort-worth-zultys-zip-47g-phone' },
  { phrase: 'ZIP 47G', url: '/fort-worth-zultys-zip-47g-phone' },
  { phrase: 'ZIP 45G', url: '/fort-worth-zultys-zip-45g-phone' },
  { phrase: 'ZIP 43G', url: '/fort-worth-zultys-zip-43g-phone' },
  { phrase: 'Z 23GE', url: '/fort-worth-zultys-z-23ge-phone' },
  { phrase: 'Z 22G', url: '/fort-worth-zultys-z-22g-phone' },
  { phrase: 'Z 21i', url: '/fort-worth-zultys-z-21i-phone' },
  { phrase: 'healthcare phone systems', url: '/fort-worth-zultys-healthcare' },
  { phrase: 'education phone systems', url: '/fort-worth-zultys-education' },
  { phrase: 'professional services phone systems', url: '/fort-worth-zultys-professional-services' },
  { phrase: 'real estate phone systems', url: '/fort-worth-zultys-real-estate' },
  { phrase: 'retail phone systems', url: '/fort-worth-zultys-retail-automotive' },
  { phrase: 'automotive phone systems', url: '/fort-worth-zultys-retail-automotive' },
  { phrase: 'small business phone systems', url: '/fort-worth-zultys-phone-system-small-business' },
  { phrase: 'small business VoIP', url: '/fort-worth-zultys-phone-system-small-business' },
  { phrase: 'multi-location phone systems', url: '/fort-worth-zultys-multi-location' },
  { phrase: 'enterprise phone systems', url: '/fort-worth-zultys-enterprise' },
  { phrase: 'unified communications', url: '/fort-worth-zultys-zac' },
];

// Major city page mappings for cross-linking
export const cityKeywords: KeywordLink[] = [
  { phrase: 'Addison', url: '/addison-tx-zultys-phone-systems' },
  { phrase: 'Aledo', url: '/aledo-tx-zultys-phone-systems' },
  { phrase: 'Allen', url: '/allen-tx-zultys-voip' },
  { phrase: 'Arlington', url: '/arlington-ip-pbx' },
  { phrase: 'Aubrey', url: '/aubrey-tx-zultys-phone-systems' },
  { phrase: 'Azle', url: '/azle-tx-zultys-phone-systems' },
  { phrase: 'Balch Springs', url: '/balch-springs-tx-zultys-voip' },
  { phrase: 'Bedford', url: '/bedford-zultys-solutions' },
  { phrase: 'Benbrook', url: '/benbrook-phone-systems' },
  { phrase: 'Burleson', url: '/burleson-tx-zultys-phone-systems' },
  { phrase: 'Carrollton', url: '/carrollton-zultys' },
  { phrase: 'Cedar Hill', url: '/cedar-hill-tx-zultys-voip' },
  { phrase: 'Celina', url: '/celina-tx-zultys-phone-systems' },
  { phrase: 'Cleburne', url: '/cleburne-tx-zultys-phone-systems' },
  { phrase: 'Colleyville', url: '/colleyville-voip' },
  { phrase: 'Coppell', url: '/coppell-tx-zultys-phone-systems' },
  { phrase: 'Crowley', url: '/crowley-tx-zultys-phone-systems' },
  { phrase: 'Dallas', url: '/dallas-zultys-phones' },
  { phrase: 'Decatur', url: '/decatur-tx-zultys-phone-systems' },
  { phrase: 'Denton', url: '/denton-business-phone-systems' },
  { phrase: 'DeSoto', url: '/desoto-tx-zultys-phone-systems' },
  { phrase: 'Duncanville', url: '/duncanville-tx-zultys-voip' },
  { phrase: 'Euless', url: '/euless-business-phones' },
  { phrase: 'Flower Mound', url: '/flower-mound-business-phones' },
  { phrase: 'Forney', url: '/forney-tx-zultys-phone-systems' },
  { phrase: 'Fort Worth', url: '/fort-worth-zultys-systems' },
  { phrase: 'Frisco', url: '/frisco-voip-solutions' },
  { phrase: 'Garland', url: '/garland-business-voip' },
  { phrase: 'Grand Prairie', url: '/grand-prairie-zultys' },
  { phrase: 'Grapevine', url: '/grapevine-business-voip' },
  { phrase: 'Haslet', url: '/haslet-tx-zultys-phone-systems' },
  { phrase: 'Hurst', url: '/hurst-ip-pbx' },
  { phrase: 'Irving', url: '/irving-business-phone-systems' },
  { phrase: 'Joshua', url: '/joshua-tx-zultys-phone-systems' },
  { phrase: 'Keller', url: '/keller-zultys-dealer' },
  { phrase: 'Lancaster', url: '/lancaster-tx-zultys-dealer' },
  { phrase: 'Lewisville', url: '/lewisville-voip-solutions' },
  { phrase: 'Little Elm', url: '/little-elm-tx-zultys-phone-systems' },
  { phrase: 'Mansfield', url: '/mansfield-tx-zultys-phone-systems' },
  { phrase: 'McKinney', url: '/mckinney-zultys-dealer' },
  { phrase: 'Mesquite', url: '/mesquite-zultys-phone-systems' },
  { phrase: 'Midlothian', url: '/midlothian-tx-zultys-phone-systems' },
  { phrase: 'Murphy', url: '/murphy-tx-zultys-voip' },
  { phrase: 'North Richland Hills', url: '/north-richland-hills-zultys' },
  { phrase: 'Plano', url: '/plano-zultys-dealer' },
  { phrase: 'Prosper', url: '/prosper-tx-zultys-phone-systems' },
  { phrase: 'Red Oak', url: '/red-oak-tx-zultys-phone-systems' },
  { phrase: 'Richardson', url: '/richardson-phone-systems' },
  { phrase: 'Rockwall', url: '/rockwall-tx-zultys-phone-systems' },
  { phrase: 'Rowlett', url: '/rowlett-tx-zultys-dealer' },
  { phrase: 'Sachse', url: '/sachse-tx-zultys-dealer' },
  { phrase: 'Saginaw', url: '/saginaw-business-communications' },
  { phrase: 'Southlake', url: '/southlake-ip-phones' },
  { phrase: 'Terrell', url: '/terrell-tx-zultys-phone-systems' },
  { phrase: 'The Colony', url: '/the-colony-tx-zultys-voip' },
  { phrase: 'Waxahachie', url: '/waxahachie-tx-zultys-phone-systems' },
  { phrase: 'Weatherford', url: '/weatherford-tx-zultys-phone-systems' },
  { phrase: 'Wylie', url: '/wylie-tx-zultys-phone-systems' },
];

// Combine all links and sort by length descending to match longest phrase matches first
const allLinks: KeywordLink[] = [...productKeywords, ...cityKeywords].sort(
  (a, b) => b.phrase.length - a.phrase.length
);

/**
 * Automagically injects high-intent internal links into plain text.
 * Respects SEO guardrails:
 * 1. Never links back to the current page (self-referencing link).
 * 2. Links only the FIRST occurrence of a given keyword or target URL per call.
 * 3. Uses case-insensitive word boundaries to match exact phrases cleanly.
 * 4. Preserves the original casing of the matched phrase.
 */
export function injectInternalLinks(
  text: string,
  currentPath: string = window.location.pathname,
  linkedUrls: Set<string> = new Set<string>(),
  linkedPhrases: Set<string> = new Set<string>()
): React.ReactNode[] {
  if (!text) return [];

  // Normalize current path for comparisons
  const normalizedCurrentPath = currentPath.toLowerCase().endsWith('/') && currentPath.length > 1
    ? currentPath.toLowerCase().slice(0, -1)
    : currentPath.toLowerCase();

  // Helper type for split tokens
  type Token = {
    text: string;
    isLink: boolean;
    url?: string;
  };

  let tokens: Token[] = [{ text, isLink: false }];

  for (const mapping of allLinks) {
    // Normalize target URL for comparison
    const normalizedTargetUrl = mapping.url.toLowerCase();
    
    // Skip if target URL is the current page itself
    if (normalizedTargetUrl === normalizedCurrentPath) {
      continue;
    }

    // Skip if this URL or phrase has already been linked in this text block
    if (linkedUrls.has(normalizedTargetUrl) || linkedPhrases.has(mapping.phrase.toLowerCase())) {
      continue;
    }

    const nextTokens: Token[] = [];
    let matchFoundForThisMapping = false;

    for (const token of tokens) {
      if (token.isLink || matchFoundForThisMapping) {
        nextTokens.push(token);
        continue;
      }

      // Escape regex special chars
      const escapedPhrase = mapping.phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Use word boundaries for precise phrase matching (case-insensitive)
      const regex = new RegExp(`\\b(${escapedPhrase})\\b`, 'i');
      const match = token.text.match(regex);

      if (match && match.index !== undefined) {
        const matchedStr = match[0];
        const index = match.index;

        // Split text around match
        const before = token.text.substring(0, index);
        const after = token.text.substring(index + matchedStr.length);

        if (before) nextTokens.push({ text: before, isLink: false });
        
        nextTokens.push({
          text: matchedStr, // Keep original casing
          isLink: true,
          url: mapping.url,
        });

        if (after) nextTokens.push({ text: after, isLink: false });

        // Record linked keys to avoid duplicating links to same URL/phrase
        linkedUrls.add(normalizedTargetUrl);
        linkedPhrases.add(mapping.phrase.toLowerCase());
        matchFoundForThisMapping = true;
      } else {
        nextTokens.push(token);
      }
    }

    tokens = nextTokens;
  }

  // Convert tokens to React elements
  return tokens.map((token, idx) => {
    if (token.isLink && token.url) {
      return (
        <Link
          key={`${token.url}-${idx}`}
          to={token.url}
          className="text-zultys-green hover:text-emerald-500 font-extrabold underline decoration-zultys-green/30 decoration-2 underline-offset-4 transition-colors cursor-pointer"
        >
          {token.text}
        </Link>
      );
    }
    return <span key={idx}>{token.text}</span>;
  });
}

/**
 * Recursively traverses a React node tree and injects internal links into raw strings
 * while skipping buttons, headers, links, or nodes marked with data-no-seo-link.
 */
export function injectLinksIntoChildrenRecursive(
  children: React.ReactNode,
  currentPath: string = window.location.pathname,
  linkedUrls: Set<string> = new Set<string>(),
  linkedPhrases: Set<string> = new Set<string>()
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (child === null || child === undefined) return child;

    if (typeof child === 'string') {
      return <>{injectInternalLinks(child, currentPath, linkedUrls, linkedPhrases)}</>;
    }

    if (typeof child === 'number' || typeof child === 'boolean') {
      return child;
    }

    if (React.isValidElement(child)) {
      const element = child as React.ReactElement<any>;
      const type = element.type;
      
      // Determine element tag name or component name
      const componentName = typeof type === 'string' ? type : (type as any).displayName || (type as any).name || '';

      // Skip elements where internal linking would break UX or create nested anchors/buttons
      if (
        componentName === 'a' ||
        componentName === 'Link' ||
        componentName === 'button' ||
        componentName === 'Button' ||
        componentName === 'h1' ||
        componentName === 'h2' ||
        componentName === 'h3' ||
        componentName === 'h4' ||
        componentName === 'h5' ||
        componentName === 'h6' ||
        element.props?.['data-no-seo-link'] === true
      ) {
        return child;
      }

      if (element.props && element.props.children) {
        const newChildren = injectLinksIntoChildrenRecursive(
          element.props.children,
          currentPath,
          linkedUrls,
          linkedPhrases
        );
        return React.cloneElement(element, { ...element.props }, newChildren);
      }
    }

    return child;
  });
}

interface SEOAutoLinkerProps {
  text?: string;
  children?: React.ReactNode;
  currentPath?: string;
}

/**
 * A handy React Component wrapper for automatically linking paragraph text.
 * Can be used as `<SEOAutoLinker text="some text" />` or `<SEOAutoLinker><div>complex tree</div></SEOAutoLinker>`
 */
export const SEOAutoLinker: React.FC<SEOAutoLinkerProps> = ({ text, children, currentPath }) => {
  const path = currentPath || window.location.pathname;
  if (children) {
    return <>{injectLinksIntoChildrenRecursive(children, path)}</>;
  }
  if (text) {
    return <>{injectInternalLinks(text, path)}</>;
  }
  return null;
};
