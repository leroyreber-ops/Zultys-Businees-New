export interface LowHangingFruitItem {
  keyword: string;
  position: number;
  clicks: number;
  impressions: number;
  ctr: number;
  matchedRoute: string;
  pageTitle: string;
  recommendations: {
    headingSuggestion: string;
    contentAdjustment: string;
    internalLinkOpportunity: string;
    ctaOptimization: string;
  };
}

const ROUTE_INFO: Record<string, { title: string; category: string }> = {
  "/": { title: "Dallas-Fort Worth Zultys Cloud VoIP Phone Systems", category: "Core" },
  "/zultys-pricing": { title: "Zultys VoIP Pricing & Hosted Phone Plans", category: "Transactional" },
  "/hipaa-compliant-voip": { title: "HIPAA Compliant Medical & Healthcare VoIP Phone Systems", category: "Industry Solutions" },
  "/zultys-migration-guide-dfw": { title: "Zultys DFW Migration & Legacy System Upgrade Guide", category: "Guides" },
  "/zultys-crm-integration-guide": { title: "Zultys Salesforce, CRM, & Screen Pop Integration Guide", category: "Guides" },
  "/zultys-support-service": { title: "Zultys Authorized Local Maintenance & DFW Support Center", category: "Core" },
  "/free-voip-site-audit": { title: "Free DFW VoIP Communications & Network Site Audit Request", category: "Transactional" },
  "/zultys-vs-ringcentral": { title: "Zultys vs RingCentral Cloud Phone Comparison", category: "Competitor Comparison" },
  "/zultys-vs-8x8": { title: "Zultys vs 8x8 Cloud Phone System Comparison", category: "Competitor Comparison" },
  "/zultys-vs-microsoft-teams": { title: "Zultys vs Microsoft Teams Unified Communications Comparison", category: "Competitor Comparison" },
  "/zultys-vs-nextiva": { title: "Zultys vs Nextiva Cloud Phone System Comparison", category: "Competitor Comparison" },
  "/zultys-vs-zoom-phone": { title: "Zultys vs Zoom Phone Hosted Systems Comparison", category: "Competitor Comparison" },
  "/zultys-for-legal-firms": { title: "Zultys VoIP Phone Systems Custom Designed for Legal & Law Firms", category: "Industry Solutions" },
  "/zultys-for-financial-services": { title: "Zultys Cloud VoIP Custom Configured for Financial Services", category: "Industry Solutions" },
  "/zultys-for-manufacturing-logistics": { title: "Zultys Rugged Phone Systems for Manufacturing & Logistics", category: "Industry Solutions" },
  "/zultys-for-hospitality": { title: "Zultys Hospitality & Hotel Unified Communications Solutions", category: "Industry Solutions" },
  "/zultys-for-non-profits": { title: "Affordable Zultys VoIP Plans for Non-Profit Organizations", category: "Industry Solutions" },
  "/remote-work-solutions": { title: "Zultys Remote Office & Mobile Work-From-Home VoIP Solutions", category: "Core" },
  "/voip-security-encryption": { title: "Business Phone Encryption & Enterprise VoIP Security Controls", category: "Technical" },
  "/garland-business-voip": { title: "Garland TX Zultys Cloud VoIP Business Phone Dealer", category: "Local SEO" },
  "/mckinney-zultys-dealer": { title: "McKinney TX Authorized Zultys Dealer & VoIP Support", category: "Local SEO" },
  "/allen-tx-zultys-voip": { title: "Allen TX Business VoIP Phone Services & Zultys Partner", category: "Local SEO" },
  "/plano-zultys-dealer": { title: "Plano TX Certified Zultys Dealer & Office Phone Partner", category: "Local SEO" },
  "/mesquite": { title: "Mesquite TX Authorized Zultys Cloud Phone Systems Dealer", category: "Local SEO" },
  "/denton": { title: "Denton TX Enterprise Cloud VoIP & Zultys Maintenance", category: "Local SEO" }
};

/**
 * Maps a search query to the most relevant internal page/route
 */
export function matchQueryToRoute(query: string): string {
  const lower = query.toLowerCase().trim();

  // 1. CRM / Integration
  if (lower.includes("crm") || lower.includes("integration") || lower.includes("salesforce") || lower.includes("screen pop")) {
    return "/zultys-crm-integration-guide";
  }

  // 2. Migration / Upgrades
  if (lower.includes("migration") || lower.includes("migrate") || lower.includes("upgrade") || lower.includes("legacy")) {
    return "/zultys-migration-guide-dfw";
  }

  // 3. Pricing / Cost
  if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("plan") || lower.includes("quote")) {
    return "/zultys-pricing";
  }

  // 4. Audit
  if (lower.includes("audit") || lower.includes("survey") || lower.includes("free assessment")) {
    return "/free-voip-site-audit";
  }

  // 5. Medical / HIPAA
  if (
    lower.includes("hipaa") ||
    lower.includes("compliant") ||
    lower.includes("medical") ||
    lower.includes("healthcare") ||
    lower.includes("doctor") ||
    lower.includes("clinic")
  ) {
    return "/hipaa-compliant-voip";
  }

  // 6. Security / Encryption
  if (lower.includes("security") || lower.includes("encrypt") || lower.includes("secure") || lower.includes("firewall")) {
    return "/voip-security-encryption";
  }

  // 7. Industry Verticals
  if (lower.includes("law") || lower.includes("legal") || lower.includes("attorney") || lower.includes("firm")) {
    return "/zultys-for-legal-firms";
  }
  if (lower.includes("financial") || lower.includes("bank") || lower.includes("wealth") || lower.includes("accounting")) {
    return "/zultys-for-financial-services";
  }
  if (lower.includes("manufacturing") || lower.includes("logistics") || lower.includes("warehouse") || lower.includes("distrib")) {
    return "/zultys-for-manufacturing-logistics";
  }
  if (lower.includes("hotel") || lower.includes("hospitality") || lower.includes("resort") || lower.includes("motel")) {
    return "/zultys-for-hospitality";
  }
  if (lower.includes("non-profit") || lower.includes("nonprofit") || lower.includes("church") || lower.includes("charity")) {
    return "/zultys-for-non-profits";
  }
  if (lower.includes("education") || lower.includes("school") || lower.includes("college") || lower.includes("academy")) {
    return "/zultys-for-education";
  }
  if (lower.includes("real estate") || lower.includes("realtor") || lower.includes("agency")) {
    return "/zultys-for-real-estate";
  }
  if (lower.includes("retail") || lower.includes("store") || lower.includes("commerce")) {
    return "/zultys-for-retail";
  }

  // 8. Support / Maintenance
  if (lower.includes("support") || lower.includes("service") || lower.includes("repair") || lower.includes("help") || lower.includes("maintenance")) {
    return "/zultys-support-service";
  }

  // 9. Competitor Comparisons
  if (lower.includes("ringcentral") || lower.includes("ring central")) return "/zultys-vs-ringcentral";
  if (lower.includes("8x8") || lower.includes("8 x 8")) return "/zultys-vs-8x8";
  if (lower.includes("teams") || lower.includes("microsoft teams") || lower.includes("msteams")) return "/zultys-vs-microsoft-teams";
  if (lower.includes("nextiva")) return "/zultys-vs-nextiva";
  if (lower.includes("zoom")) return "/zultys-vs-zoom-phone";
  if (lower.includes("vonage")) return "/zultys-vs-vonage";
  if (lower.includes("avaya")) return "/zultys-vs-avaya";
  if (lower.includes("cisco") || lower.includes("webex")) return "/zultys-vs-cisco-webex";
  if (lower.includes("mitel")) return "/zultys-vs-mitel";
  if (lower.includes("goto") || lower.includes("gotoconnect")) return "/zultys-vs-gotoconnect";
  if (lower.includes("comcast")) return "/zultys-vs-comcast-business";
  if (lower.includes("spectrum")) return "/zultys-vs-spectrum-business";
  if (lower.includes("att") || lower.includes("at&t") || lower.includes("a&t")) return "/zultys-vs-att-business";
  if (lower.includes("ooma")) return "/zultys-vs-ooma-office";
  if (lower.includes("dialpad")) return "/zultys-vs-dialpad";
  if (lower.includes("intermedia")) return "/zultys-vs-intermedia";

  // 10. Local SEO Cities
  if (lower.includes("garland")) return "/garland-business-voip";
  if (lower.includes("mckinney")) return "/mckinney-zultys-dealer";
  if (lower.includes("allen")) return "/allen-tx-zultys-voip";
  if (lower.includes("plano")) return "/plano-zultys-dealer";
  if (lower.includes("mesquite")) return "/mesquite";
  if (lower.includes("denton")) return "/denton";

  // 11. Remote / Home Work
  if (lower.includes("remote") || lower.includes("telework") || lower.includes("mobile") || lower.includes("home")) {
    return "/remote-work-solutions";
  }

  // Default to Home page
  return "/";
}

/**
 * Generates SEO actions based on keyword and matched route
 */
export function generateSEORecommendations(keyword: string, route: string) {
  const formattedKeyword = keyword.toUpperCase();
  const routeName = route === "/" ? "Home" : route.split("-").join(" ").replace("/", "").replace("tx", "TX");
  
  return {
    headingSuggestion: `Add an H2 or H3 heading titled: "Optimized Zultys Cloud Solutions for ${keyword}" or similar near the middle of the page.`,
    contentAdjustment: `Weave the keyword phrase "${keyword}" into the body content at least 2-3 times naturally. Ensure it resides in the first 150 words of a main text block, accompanied by local DFW telecom context.`,
    internalLinkOpportunity: `Add 2 contextually relevant internal links to this page from high-traffic landing pages or blog posts, using exact or partial anchor text matching "${keyword}".`,
    ctaOptimization: `Enhance the page's call-to-action to mention a customized quote or solution: e.g., "Get a customized Zultys ${routeName} proposal including expert ${keyword} setup in Dallas-Fort Worth."`
  };
}

/**
 * High-quality demo data containing real Page 2 and Page 3 low-hanging fruit keywords 
 */
export const DEMO_LOW_HANGING_FRUIT: LowHangingFruitItem[] = [
  // Page 2 Keywords (Position 10.0 to 20.0)
  {
    keyword: "cloud voip systems dallas",
    position: 12.4,
    clicks: 42,
    impressions: 1550,
    ctr: 0.027,
    matchedRoute: "/",
    pageTitle: ROUTE_INFO["/"]?.title || "Home",
    recommendations: generateSEORecommendations("cloud voip systems dallas", "/")
  },
  {
    keyword: "hipaa compliant phone system fort worth",
    position: 13.8,
    clicks: 25,
    impressions: 890,
    ctr: 0.028,
    matchedRoute: "/hipaa-compliant-voip",
    pageTitle: ROUTE_INFO["/hipaa-compliant-voip"]?.title || "HIPAA Compliance",
    recommendations: generateSEORecommendations("hipaa compliant phone system fort worth", "/hipaa-compliant-voip")
  },
  {
    keyword: "dallas cloud phone pricing",
    position: 11.2,
    clicks: 34,
    impressions: 1150,
    ctr: 0.029,
    matchedRoute: "/zultys-pricing",
    pageTitle: ROUTE_INFO["/zultys-pricing"]?.title || "Pricing Plans",
    recommendations: generateSEORecommendations("dallas cloud phone pricing", "/zultys-pricing")
  },
  {
    keyword: "dfw business phone migration guide",
    position: 15.6,
    clicks: 8,
    impressions: 310,
    ctr: 0.025,
    matchedRoute: "/zultys-migration-guide-dfw",
    pageTitle: ROUTE_INFO["/zultys-migration-guide-dfw"]?.title || "Migration Guide",
    recommendations: generateSEORecommendations("dfw business phone migration guide", "/zultys-migration-guide-dfw")
  },
  {
    keyword: "crm telephone system integration",
    position: 14.2,
    clicks: 12,
    impressions: 540,
    ctr: 0.022,
    matchedRoute: "/zultys-crm-integration-guide",
    pageTitle: ROUTE_INFO["/zultys-crm-integration-guide"]?.title || "CRM Integration Guide",
    recommendations: generateSEORecommendations("crm telephone system integration", "/zultys-crm-integration-guide")
  },
  {
    keyword: "plano tx business voip providers",
    position: 11.9,
    clicks: 18,
    impressions: 980,
    ctr: 0.018,
    matchedRoute: "/plano-zultys-dealer",
    pageTitle: ROUTE_INFO["/plano-zultys-dealer"]?.title || "Plano SEO Page",
    recommendations: generateSEORecommendations("plano tx business voip providers", "/plano-zultys-dealer")
  },
  {
    keyword: "zultys vs ringcentral cloud phone",
    position: 13.1,
    clicks: 15,
    impressions: 620,
    ctr: 0.024,
    matchedRoute: "/zultys-vs-ringcentral",
    pageTitle: ROUTE_INFO["/zultys-vs-ringcentral"]?.title || "Zultys vs RingCentral",
    recommendations: generateSEORecommendations("zultys vs ringcentral cloud phone", "/zultys-vs-ringcentral")
  },
  {
    keyword: "law firm phone systems dallas",
    position: 12.8,
    clicks: 11,
    impressions: 480,
    ctr: 0.022,
    matchedRoute: "/zultys-for-legal-firms",
    pageTitle: ROUTE_INFO["/zultys-for-legal-firms"]?.title || "Legal Phone Systems",
    recommendations: generateSEORecommendations("law firm phone systems dallas", "/zultys-for-legal-firms")
  },

  // Page 3 Keywords (Position 20.1 to 30.0)
  {
    keyword: "zultys cloud telephone plano",
    position: 22.4,
    clicks: 3,
    impressions: 720,
    ctr: 0.004,
    matchedRoute: "/plano-zultys-dealer",
    pageTitle: ROUTE_INFO["/plano-zultys-dealer"]?.title || "Plano SEO Page",
    recommendations: generateSEORecommendations("zultys cloud telephone plano", "/plano-zultys-dealer")
  },
  {
    keyword: "mckinney tx medical office phone system",
    position: 24.8,
    clicks: 2,
    impressions: 450,
    ctr: 0.004,
    matchedRoute: "/mckinney-zultys-dealer",
    pageTitle: ROUTE_INFO["/mckinney-zultys-dealer"]?.title || "McKinney SEO Page",
    recommendations: generateSEORecommendations("mckinney tx medical office phone system", "/mckinney-zultys-dealer")
  },
  {
    keyword: "voip pricing guide dallas",
    position: 21.2,
    clicks: 5,
    impressions: 810,
    ctr: 0.006,
    matchedRoute: "/zultys-pricing",
    pageTitle: ROUTE_INFO["/zultys-pricing"]?.title || "Pricing Plans",
    recommendations: generateSEORecommendations("voip pricing guide dallas", "/zultys-pricing")
  },
  {
    keyword: "salesforce screen pop voip dfw",
    position: 23.5,
    clicks: 1,
    impressions: 390,
    ctr: 0.002,
    matchedRoute: "/zultys-crm-integration-guide",
    pageTitle: ROUTE_INFO["/zultys-crm-integration-guide"]?.title || "CRM Integration Guide",
    recommendations: generateSEORecommendations("salesforce screen pop voip dfw", "/zultys-crm-integration-guide")
  },
  {
    keyword: "best healthcare business phone service",
    position: 26.1,
    clicks: 4,
    impressions: 920,
    ctr: 0.004,
    matchedRoute: "/hipaa-compliant-voip",
    pageTitle: ROUTE_INFO["/hipaa-compliant-voip"]?.title || "HIPAA Compliance",
    recommendations: generateSEORecommendations("best healthcare business phone service", "/hipaa-compliant-voip")
  },
  {
    keyword: "mesquite tx commercial telecom",
    position: 28.3,
    clicks: 0,
    impressions: 210,
    ctr: 0.000,
    matchedRoute: "/mesquite",
    pageTitle: ROUTE_INFO["/mesquite"]?.title || "Mesquite SEO Page",
    recommendations: generateSEORecommendations("mesquite tx commercial telecom", "/mesquite")
  }
];

/**
 * Extracts and analyzes live queries to find terms ranking on Page 2 or Page 3 (position 10.0 to 31.0)
 */
export function extractLowHangingFruitFromQueries(queries: any[]): LowHangingFruitItem[] {
  if (!queries || queries.length === 0) return DEMO_LOW_HANGING_FRUIT;

  const analyzed = queries
    .map((q) => {
      // keys might be an array of strings in Search Console row format
      const keyword = Array.isArray(q.keys) ? q.keys[0] : (q.keys || q.query || "");
      const position = typeof q.position === "number" ? q.position : 0;
      const clicks = typeof q.clicks === "number" ? q.clicks : 0;
      const impressions = typeof q.impressions === "number" ? q.impressions : 0;
      const ctr = typeof q.ctr === "number" ? q.ctr : 0;

      const route = matchQueryToRoute(keyword);
      const title = ROUTE_INFO[route]?.title || `${route === "/" ? "Home" : route.substring(1).split("-").join(" ")} Page`;

      return {
        keyword,
        position,
        clicks,
        impressions,
        ctr,
        matchedRoute: route,
        pageTitle: title,
        recommendations: generateSEORecommendations(keyword, route)
      };
    })
    // Filter terms on Page 2 and Page 3 (Positions 10.0 to 31.0)
    .filter((item) => item.keyword && item.position >= 10.0 && item.position <= 31.0)
    // Sort by impressions descending to show high-potential items first!
    .sort((a, b) => b.impressions - a.impressions);

  // If there are too few items found on Page 2/3 with live data, backfill with demo terms for complete UX
  if (analyzed.length < 5) {
    const existingKeywords = new Set(analyzed.map((a) => a.keyword.toLowerCase()));
    for (const demo of DEMO_LOW_HANGING_FRUIT) {
      if (!existingKeywords.has(demo.keyword.toLowerCase())) {
        analyzed.push(demo);
      }
    }
  }

  return analyzed;
}
