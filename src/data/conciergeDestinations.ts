/**
 * Single Source of Truth for Approved AI Concierge Destinations.
 * Every destination in this registry MUST:
 * 1. Exist in VALID_PATHS (src/routes.ts)
 * 2. Return HTTP 200 OK
 * 3. Be the preferred canonical URL (no 301 redirects, no aliases, no index.html)
 * 4. Be verified during the build process
 */

export interface ConciergeDestination {
  id: string;
  label: string;
  category: string;
  canonicalUrl: string;
  description: string;
}

export const CONCIERGE_DESTINATIONS: Record<string, ConciergeDestination> = {
  'cloud-pbx': {
    id: 'cloud-pbx',
    label: 'Zultys Cloud PBX & Hosted VoIP',
    category: 'Cloud Phone Systems',
    canonicalUrl: '/zultys-cloud-services',
    description: 'Fully hosted cloud phone systems with 99.999% uptime, mobile apps, and zero server maintenance.'
  },
  'hybrid-pbx': {
    id: 'hybrid-pbx',
    label: 'On-Premise & Hybrid PBX',
    category: 'Phone Systems',
    canonicalUrl: '/fort-worth-zultys-hybrid',
    description: 'Enterprise on-site MX appliances with cloud failover and capital ownership.'
  },
  'business-voip': {
    id: 'business-voip',
    label: 'Business VoIP Solutions',
    category: 'VoIP Solutions',
    canonicalUrl: '/solutions',
    description: 'Tailored enterprise VoIP solutions for Dallas-Fort Worth businesses of all sizes.'
  },
  'contact-center': {
    id: 'contact-center',
    label: 'Contact Center & Call Queues',
    category: 'Contact Center',
    canonicalUrl: '/fort-worth-zultys-contact-center',
    description: 'Skills-based ACD routing, supervisor whisper/barge-in, and call recording.'
  },
  'teams-integration': {
    id: 'teams-integration',
    label: 'Microsoft Teams Phone Integration',
    category: 'Unified Communications',
    canonicalUrl: '/zultys-vs-microsoft-teams',
    description: 'Direct routing connecting Microsoft Teams clients to enterprise Zultys dial tone.'
  },
  'ip-phones': {
    id: 'ip-phones',
    label: 'Zultys IP Desktop Phones',
    category: 'Hardware',
    canonicalUrl: '/products',
    description: 'Gigabit color touchscreen desktop phones, reception consoles, and wireless handsets.'
  },
  'zip-49g': {
    id: 'zip-49g',
    label: 'ZIP 49G Executive Smart Phone',
    category: 'Hardware',
    canonicalUrl: '/fort-worth-zultys-zip-49g-phone',
    description: 'Executive 7-inch color touchscreen media phone with Bluetooth, Wi-Fi, and video.'
  },
  'pricing': {
    id: 'pricing',
    label: 'VoIP & Cloud Pricing Plans',
    category: 'Pricing',
    canonicalUrl: '/zultys-pricing',
    description: 'Transparent pricing for cloud seats, on-premise servers, and free bill audits.'
  },
  'support-installation': {
    id: 'support-installation',
    label: 'Installation, Cabling & Support',
    category: 'Local Support',
    canonicalUrl: '/fort-worth-zultys-installation',
    description: 'Certified local DFW technician dispatch, structured cabling, and system maintenance.'
  },
  'free-audit': {
    id: 'free-audit',
    label: 'Free Site & Network Audit',
    category: 'Assessment',
    canonicalUrl: '/free-voip-site-audit',
    description: 'Comprehensive on-site network readiness inspection and telecom cost audit.'
  },
  'contact-specialist': {
    id: 'contact-specialist',
    label: 'Request a Quote / Contact Specialist',
    category: 'Contact',
    canonicalUrl: '/contact',
    description: 'Speak directly with a local certified Zultys telecommunications engineer.'
  }
};

/**
 * Quick-navigation explore links displayed in the AI Concierge toolbar.
 * Strictly pulled from the verified allowlist.
 */
export const CONCIERGE_EXPLORE_LINKS = [
  { id: 'cloud-pbx', label: '☁️ Cloud PBX', href: CONCIERGE_DESTINATIONS['cloud-pbx'].canonicalUrl },
  { id: 'hybrid-pbx', label: '🏢 Hybrid & On-Prem', href: CONCIERGE_DESTINATIONS['hybrid-pbx'].canonicalUrl },
  { id: 'teams-integration', label: '💼 Teams Integration', href: CONCIERGE_DESTINATIONS['teams-integration'].canonicalUrl },
  { id: 'contact-center', label: '🎧 Contact Center', href: CONCIERGE_DESTINATIONS['contact-center'].canonicalUrl },
  { id: 'ip-phones', label: '📞 Zultys Phones', href: CONCIERGE_DESTINATIONS['ip-phones'].canonicalUrl },
  { id: 'pricing', label: '💰 Pricing & Plans', href: CONCIERGE_DESTINATIONS['pricing'].canonicalUrl },
  { id: 'contact-specialist', label: '📋 Request Quote', href: CONCIERGE_DESTINATIONS['contact-specialist'].canonicalUrl }
];
