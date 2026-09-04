import { CONCIERGE_DESTINATIONS, ConciergeDestination } from '../data/conciergeDestinations';

export interface ConciergeAction {
  id: string;
  label: string;
  url: string;
  category: string;
  description?: string;
}

export interface ConciergeRouteResult {
  intent: string;
  intentLabel: string;
  verifiedAnswer: string;
  actions: ConciergeAction[];
  fallback: {
    label: string;
    phone: string;
    url: string;
  };
  disclosure: string;
}

const SPECIALIST_DISCLOSURE = "Solution details and exact pricing are confirmed by a DFW Zultys certified specialist.";

/**
 * Deterministically routes user questions to verified answers and 2–3 allowlisted canonical destination actions.
 */
export function routeConciergeIntent(query: string, rawAnswer?: string): ConciergeRouteResult {
  const q = (query || '').toLowerCase().trim();

  const fallbackContactAction: ConciergeAction = {
    id: 'contact-specialist',
    label: 'Contact a DFW Specialist',
    url: '/contact',
    category: 'Contact',
    description: 'Speak directly with our local telecom engineers at 817-231-2962.'
  };

  const defaultResult: ConciergeRouteResult = {
    intent: 'general-inquiry',
    intentLabel: 'Business Communications Inquiry',
    verifiedAnswer: rawAnswer || "We provide enterprise Zultys Cloud PBX, On-Premise IP-PBX, and Microsoft Teams integration across Dallas–Fort Worth with local Texas technician dispatch. Would you like to view our solutions or speak directly with an engineer?",
    actions: [
      {
        id: 'business-voip',
        label: 'Explore VoIP Solutions',
        url: CONCIERGE_DESTINATIONS['business-voip'].canonicalUrl,
        category: 'VoIP Solutions'
      },
      {
        id: 'cloud-pbx',
        label: 'View Cloud PBX',
        url: CONCIERGE_DESTINATIONS['cloud-pbx'].canonicalUrl,
        category: 'Cloud Phone Systems'
      },
      fallbackContactAction
    ],
    fallback: {
      label: 'Call Direct: 817-231-2962',
      phone: '817-231-2962',
      url: '/contact'
    },
    disclosure: SPECIALIST_DISCLOSURE
  };

  // Guard against prompt injection or attempts to invent URLs
  if (
    q.includes('ignore') || 
    q.includes('invent') || 
    q.includes('fake') || 
    q.includes('hallucinate') || 
    q.includes('does not exist') ||
    q.includes('http://') ||
    q.includes('https://') ||
    q.includes('script')
  ) {
    return {
      intent: 'safety-fallback',
      intentLabel: 'Verified Navigation Assist',
      verifiedAnswer: "I can only direct you to verified, canonical pages on our official site. Please select an approved service or contact our local Dallas–Fort Worth team directly.",
      actions: [
        {
          id: 'cloud-pbx',
          label: 'Cloud Phone Systems',
          url: CONCIERGE_DESTINATIONS['cloud-pbx'].canonicalUrl,
          category: 'Cloud Phone Systems'
        },
        {
          id: 'pricing',
          label: 'Pricing & Plans',
          url: CONCIERGE_DESTINATIONS['pricing'].canonicalUrl,
          category: 'Pricing'
        },
        fallbackContactAction
      ],
      fallback: {
        label: 'Call Specialist: 817-231-2962',
        phone: '817-231-2962',
        url: '/contact'
      },
      disclosure: SPECIALIST_DISCLOSURE
    };
  }

  // 1. Pricing / Cost / Quote requests
  if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('how much') || q.includes('rate') || q.includes('fee')) {
    return {
      intent: 'pricing-quote',
      intentLabel: 'Pricing & Cost Estimate',
      verifiedAnswer: rawAnswer || "Zultys Cloud PBX seats typically range from $19 to $35/user/month based on feature tiers (standard voice vs executive UCaaS and mobile softphones). On-premise MX systems have zero recurring seat licensing fees. We offer transparent quotes and a free on-site telecom bill audit.",
      actions: [
        {
          id: 'pricing',
          label: 'View Pricing Breakdown',
          url: CONCIERGE_DESTINATIONS['pricing'].canonicalUrl,
          category: 'Pricing'
        },
        {
          id: 'free-audit',
          label: 'Book Free Bill & Site Audit',
          url: CONCIERGE_DESTINATIONS['free-audit'].canonicalUrl,
          category: 'Assessment'
        },
        {
          id: 'contact-specialist',
          label: 'Request Custom Proposal',
          url: '/contact?service=Pricing+%26+Quote',
          category: 'Contact'
        }
      ],
      fallback: {
        label: 'Speak with Leroy: 817-231-2962',
        phone: '817-231-2962',
        url: '/contact'
      },
      disclosure: SPECIALIST_DISCLOSURE
    };
  }

  // 2. Microsoft Teams Phone Integration
  if (q.includes('teams') || q.includes('microsoft') || q.includes('m365') || q.includes('office 365')) {
    return {
      intent: 'teams-integration',
      intentLabel: 'Microsoft Teams Phone Integration',
      verifiedAnswer: rawAnswer || "Zultys provides direct routing integration with Microsoft Teams. Your staff can place and receive calls within Microsoft Teams while retaining enterprise Zultys dial tone, multi-level IVR auto-attendants, call recording, and contact center queues.",
      actions: [
        {
          id: 'teams-integration',
          label: 'Teams Integration Overview',
          url: CONCIERGE_DESTINATIONS['teams-integration'].canonicalUrl,
          category: 'Unified Communications'
        },
        {
          id: 'cloud-pbx',
          label: 'Cloud PBX Details',
          url: CONCIERGE_DESTINATIONS['cloud-pbx'].canonicalUrl,
          category: 'Cloud Phone Systems'
        },
        {
          id: 'contact-specialist',
          label: 'Schedule a Teams Voice Demo',
          url: '/contact?service=Microsoft+Teams+Integration',
          category: 'Contact'
        }
      ],
      fallback: {
        label: 'Consult an Engineer: 817-231-2962',
        phone: '817-231-2962',
        url: '/contact'
      },
      disclosure: SPECIALIST_DISCLOSURE
    };
  }

  // 3. Contact Center / IVR / Call Queues / Recording
  if (q.includes('contact center') || q.includes('call center') || q.includes('queue') || q.includes('ivr') || q.includes('recording') || q.includes('auto attendant')) {
    return {
      intent: 'contact-center',
      intentLabel: 'Contact Center & Call Management',
      verifiedAnswer: rawAnswer || "Zultys Integrated Contact Center delivers skills-based routing, visual queue monitoring, supervisor whisper/barge-in capabilities, comprehensive analytics, and compliance call recording integrated into your phone system.",
      actions: [
        {
          id: 'contact-center',
          label: 'Explore Contact Center Features',
          url: CONCIERGE_DESTINATIONS['contact-center'].canonicalUrl,
          category: 'Contact Center'
        },
        {
          id: 'solutions',
          label: 'View Business Solutions',
          url: CONCIERGE_DESTINATIONS['business-voip'].canonicalUrl,
          category: 'VoIP Solutions'
        },
        {
          id: 'contact-specialist',
          label: 'Request Contact Center Consultation',
          url: '/contact?service=Contact+Center',
          category: 'Contact'
        }
      ],
      fallback: {
        label: 'Contact Center Desk: 817-231-2962',
        phone: '817-231-2962',
        url: '/contact'
      },
      disclosure: SPECIALIST_DISCLOSURE
    };
  }

  // 4. Cloud PBX / Hosted VoIP / Moving from Old PBX to Cloud
  if (q.includes('cloud') || q.includes('hosted') || q.includes('move') || q.includes('migration') || q.includes('switch')) {
    return {
      intent: 'cloud-pbx',
      intentLabel: 'Cloud PBX & Hosted Phone Systems',
      verifiedAnswer: rawAnswer || "Zultys Cloud Services provide a fully hosted business phone system with 99.999% reliability, zero closet hardware maintenance, mobile softphones (ZAC), and seamless number porting with zero downtime during cutover.",
      actions: [
        {
          id: 'cloud-pbx',
          label: 'Zultys Cloud Phone System',
          url: CONCIERGE_DESTINATIONS['cloud-pbx'].canonicalUrl,
          category: 'Cloud Phone Systems'
        },
        {
          id: 'pricing',
          label: 'Cloud Pricing & Plans',
          url: CONCIERGE_DESTINATIONS['pricing'].canonicalUrl,
          category: 'Pricing'
        },
        {
          id: 'contact-specialist',
          label: 'Discuss Migration Plan',
          url: '/contact?service=Cloud+PBX',
          category: 'Contact'
        }
      ],
      fallback: {
        label: 'Call Cloud Specialist: 817-231-2962',
        phone: '817-231-2962',
        url: '/contact'
      },
      disclosure: SPECIALIST_DISCLOSURE
    };
  }

  // 5. On-Premise & Hybrid PBX
  if (q.includes('on-premise') || q.includes('premise') || q.includes('hybrid') || q.includes('mx250') || q.includes('mx-se') || q.includes('hardware server')) {
    return {
      intent: 'hybrid-pbx',
      intentLabel: 'On-Premise & Hybrid IP-PBX',
      verifiedAnswer: rawAnswer || "For businesses desiring capital asset ownership, zero recurring seat fees, and complete local LAN survivability, Zultys MX series IP-PBX appliances deliver unmatched durability with optional cloud disaster-recovery failover.",
      actions: [
        {
          id: 'hybrid-pbx',
          label: 'Hybrid & On-Premise Systems',
          url: CONCIERGE_DESTINATIONS['hybrid-pbx'].canonicalUrl,
          category: 'Phone Systems'
        },
        {
          id: 'ip-phones',
          label: 'Browse Compatible Phones',
          url: CONCIERGE_DESTINATIONS['ip-phones'].canonicalUrl,
          category: 'Hardware'
        },
        {
          id: 'contact-specialist',
          label: 'Request On-Premise Specs',
          url: '/contact?service=Phone+system',
          category: 'Contact'
        }
      ],
      fallback: {
        label: 'Speak with Systems Architect: 817-231-2962',
        phone: '817-231-2962',
        url: '/contact'
      },
      disclosure: SPECIALIST_DISCLOSURE
    };
  }

  // 6. Installation, Maintenance, Support & Emergency Repair
  if (q.includes('support') || q.includes('repair') || q.includes('service') || q.includes('technician') || q.includes('install') || q.includes('down') || q.includes('cabling')) {
    return {
      intent: 'installation-support',
      intentLabel: 'Local DFW Support & Installation',
      verifiedAnswer: rawAnswer || "We provide certified on-site technicians across Dallas, Fort Worth, Arlington, Plano, and all surrounding North Texas communities. Services include emergency dispatch, system moves, additions, structured Cat6 cabling, and QoS optimization.",
      actions: [
        {
          id: 'support-installation',
          label: 'Installation & Support Details',
          url: CONCIERGE_DESTINATIONS['support-installation'].canonicalUrl,
          category: 'Local Support'
        },
        {
          id: 'free-audit',
          label: 'Request Site Inspection',
          url: CONCIERGE_DESTINATIONS['free-audit'].canonicalUrl,
          category: 'Assessment'
        },
        {
          id: 'contact-specialist',
          label: 'Emergency Technician Dispatch',
          url: '/contact?service=Installation+or+support',
          category: 'Contact'
        }
      ],
      fallback: {
        label: 'Direct Dispatch Desk: 817-231-2962',
        phone: '817-231-2962',
        url: '/contact'
      },
      disclosure: SPECIALIST_DISCLOSURE
    };
  }

  // 7. Phones, Hardware, ZIP 49G
  if (q.includes('phone') || q.includes('hardware') || q.includes('handset') || q.includes('zip') || q.includes('49g') || q.includes('47g') || q.includes('desk phone')) {
    return {
      intent: 'hardware-phones',
      intentLabel: 'Zultys IP Phones & Hardware',
      verifiedAnswer: rawAnswer || "Zultys Gigabit IP phones offer high-definition voice, programmable multi-line presence keys, and intuitive color touchscreen interfaces, including the flagship ZIP 49G executive smart media phone with built-in Wi-Fi and Bluetooth.",
      actions: [
        {
          id: 'ip-phones',
          label: 'View All IP Phones',
          url: CONCIERGE_DESTINATIONS['ip-phones'].canonicalUrl,
          category: 'Hardware'
        },
        {
          id: 'zip-49g',
          label: 'ZIP 49G Executive Phone',
          url: CONCIERGE_DESTINATIONS['zip-49g'].canonicalUrl,
          category: 'Hardware'
        },
        {
          id: 'contact-specialist',
          label: 'Request Hardware Sample Demo',
          url: '/contact?service=Phone+system',
          category: 'Contact'
        }
      ],
      fallback: {
        label: 'Hardware Desk: 817-231-2962',
        phone: '817-231-2962',
        url: '/contact'
      },
      disclosure: SPECIALIST_DISCLOSURE
    };
  }

  // 8. Direct Contact / Speak to Someone
  if (q.includes('talk') || q.includes('speak') || q.includes('human') || q.includes('someone') || q.includes('contact') || q.includes('call')) {
    return {
      intent: 'speak-to-specialist',
      intentLabel: 'Speak to a DFW Specialist',
      verifiedAnswer: "You can reach our local Dallas–Fort Worth communications desk directly by phone or text at **817-231-2962**, or submit a contact request to schedule an on-site consultation at your convenience.",
      actions: [
        {
          id: 'contact-specialist',
          label: 'Open Contact & Consultation Form',
          url: '/contact',
          category: 'Contact'
        },
        {
          id: 'free-audit',
          label: 'Schedule Free Site Survey',
          url: CONCIERGE_DESTINATIONS['free-audit'].canonicalUrl,
          category: 'Assessment'
        }
      ],
      fallback: {
        label: 'Direct Line: 817-231-2962',
        phone: '817-231-2962',
        url: '/contact'
      },
      disclosure: SPECIALIST_DISCLOSURE
    };
  }

  return defaultResult;
}
