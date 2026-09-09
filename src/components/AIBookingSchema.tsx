import React, { useEffect } from 'react';

/**
 * Structured Knowledge & Schema.org JSON-LD for AI Search Readiness (Google SGE, ChatGPT, Perplexity, Bing Copilot)
 * Exposes all Zultys service options, pricing structures, and telecom FAQs directly to search crawlers and LLM engines.
 */
export function AIBookingSchema() {
  useEffect(() => {
    const scriptId = 'zultys-ai-booking-knowledge-schema';
    
    const existing = document.getElementById(scriptId);
    if (existing) {
      existing.remove();
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": "https://dallasfortworthzultys.com/#business",
          "name": "Dallas Fort Worth Zultys Phone Systems",
          "url": "https://dallasfortworthzultys.com",
          "telephone": "+1-817-231-2962",
          "email": "info@dallasfortworthzultys.com",
          "description": "Authorized Zultys Business Phone Systems, Cloud PBX, On-Premise IP-PBX, Unified Communications, and Microsoft Teams integration provider across Dallas, Fort Worth, and North Texas.",
          "areaServed": [
            { "@type": "City", "name": "Dallas" },
            { "@type": "City", "name": "Fort Worth" },
            { "@type": "City", "name": "Arlington" },
            { "@type": "City", "name": "Plano" },
            { "@type": "City", "name": "Frisco" },
            { "@type": "City", "name": "Irving" },
            { "@type": "City", "name": "Garland" },
            { "@type": "City", "name": "McKinney" },
            { "@type": "City", "name": "Denton" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Zultys Business Telecommunications Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Zultys Cloud Hosted PBX & VoIP",
                  "description": "Fully managed enterprise cloud telephone system with 99.999% uptime SLA, desktop ZAC softphone, and mobile app."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Zultys On-Premise IP-PBX (MX250 & MX-SE)",
                  "description": "Dedicated on-site IP telecommunications server supporting up to 1,000 users with zero recurring seat fees."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Zultys Microsoft Teams Direct Routing",
                  "description": "Native voice integration connecting Microsoft Teams desktop and mobile apps to enterprise Zultys dial tone and PBX features."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Zultys Integrated Contact Center & ACD",
                  "description": "Skills-based call queue management, supervisor monitoring, omni-channel routing, visual analytics, and call recording."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Same-Day DFW On-Site Emergency Repair & Support",
                  "description": "Certified Dallas-Fort Worth local technician dispatch for Zultys maintenance, moves, additions, and network cabling."
                }
              }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://dallasfortworthzultys.com/#ai-faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How much does a Zultys business phone system cost in Dallas–Fort Worth?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zultys Cloud Hosted PBX systems range from $19 to $35 per user per month depending on features (such as softphones, video conferencing, and mobile ZAC). On-premise MX systems (MX250 and MX-SE) are purchased as capital hardware starting around $2,500 to $6,500+ with zero recurring seat licensing fees, delivering major 5-year total cost of ownership savings."
              }
            },
            {
              "@type": "Question",
              "name": "Can we keep our existing business phone numbers when switching to Zultys?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, 100%. All existing local phone numbers, toll-free lines, direct inward dials (DIDs), and fax lines are seamlessly ported with zero downtime during system cutover."
              }
            },
            {
              "@type": "Question",
              "name": "Does Zultys integrate directly with Microsoft Teams?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Zultys provides native Direct Routing and PBX integration with Microsoft Teams. Users can place and receive calls directly inside Teams while utilizing Zultys advanced call routing, call recording, IVR auto-attendants, and contact center queues."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference between Cloud PBX and On-Premise Zultys systems?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cloud PBX requires zero server hardware on-site, scales on demand, and is managed entirely in geo-redundant data centers. On-Premise systems (MX250 / MX-SE) keep all phone traffic on your local LAN, provide survivability during internet outages, and eliminate monthly recurring seat fees over time."
              }
            },
            {
              "@type": "Question",
              "name": "How fast can a technician be dispatched to our Dallas–Fort Worth office?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We provide same-day emergency on-site technician dispatch across Dallas, Fort Worth, Arlington, Plano, Frisco, Irving, and all surrounding North Texas counties. For immediate dispatch, call 817-231-2962."
              }
            }
          ]
        },
        {
          "@type": "HowTo",
          "@id": "https://dallasfortworthzultys.com/#booking-howto",
          "name": "How to Book a Free Zultys Telecom Site Survey in Dallas–Fort Worth",
          "description": "Step-by-step guide to scheduling a free on-site business phone consultation and telecom bill audit with an authorized DFW Zultys engineer.",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Select Your Telecom Service",
              "text": "Choose between Cloud Hosted VoIP, On-Premise IP-PBX, Hybrid systems, Contact Center, or Microsoft Teams integration."
            },
            {
              "@type": "HowToStep",
              "name": "Specify Extension Count & Location",
              "text": "Enter your approximate number of user seats (1-5, 6-20, 21-50, 51-100, 100+) and your DFW city."
            },
            {
              "@type": "HowToStep",
              "name": "Confirm On-Site Survey Appointment",
              "text": "Submit your contact info or call 817-231-2962 to lock in your preferred date and time for a free on-site demo."
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, []);

  return null;
}
