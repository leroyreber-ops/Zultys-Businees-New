import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { VALID_PATHS } from "../src/routes";
import { generateEliteMetadata, canonicalMap, getCityNameFromPath } from "../src/utils/seoHelpers";

console.log("\n==================================================");
console.log("🚀 STARTING STATIC SEO PRE-RENDERING ENGINE (PHASE C)");
console.log("==================================================");

const currentFilename = typeof import.meta !== "undefined" && import.meta.url
  ? fileURLToPath(import.meta.url)
  : (typeof __filename !== "undefined" ? __filename : "");

const currentDirname = typeof import.meta !== "undefined" && import.meta.url
  ? path.dirname(currentFilename)
  : (typeof __dirname !== "undefined" ? __dirname : "");

const distPath = path.join(process.cwd(), "dist");
const templatePath = path.join(distPath, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("❌ ERROR: dist/index.html not found! Please run 'vite build' before running pre-renderer.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");

// DFW Coordinates Mapping
const serverCityCoordinates: Record<string, { lat: number; lng: number; zip: string }> = {
  'Dallas': { lat: 32.7767, lng: -96.7970, zip: '75201' },
  'Fort Worth': { lat: 32.7555, lng: -97.3308, zip: '76102' },
  'Arlington': { lat: 32.7357, lng: -97.1081, zip: '76010' },
  'Plano': { lat: 33.0198, lng: -96.6989, zip: '75074' },
  'Garland': { lat: 32.9126, lng: -96.6389, zip: '75040' },
  'Irving': { lat: 32.8140, lng: -96.9489, zip: '75060' },
  'Grand Prairie': { lat: 32.7460, lng: -96.9978, zip: '75050' },
  'McKinney': { lat: 33.1972, lng: -96.6398, zip: '75069' },
  'Frisco': { lat: 33.1507, lng: -96.8236, zip: '75034' },
  'Carrollton': { lat: 32.9746, lng: -96.8903, zip: '75006' },
  'Denton': { lat: 33.2148, lng: -97.1331, zip: '76201' },
  'Richardson': { lat: 32.9483, lng: -96.7299, zip: '75080' },
  'Lewisville': { lat: 33.0462, lng: -96.9942, zip: '75057' },
  'Allen': { lat: 33.1032, lng: -96.6706, zip: '75002' },
  'Mesquite': { lat: 32.7668, lng: -96.5992, zip: '75149' },
  'Flower Mound': { lat: 33.0146, lng: -97.0970, zip: '75028' },
  'North Richland Hills': { lat: 32.8343, lng: -97.2292, zip: '76180' },
  'Mansfield': { lat: 32.5632, lng: -97.1417, zip: '76063' },
  'Rowlett': { lat: 32.9029, lng: -96.5358, zip: '75088' },
  'Southlake': { lat: 32.9412, lng: -97.1342, zip: '76092' },
  'Grapevine': { lat: 32.9343, lng: -97.0781, zip: '76051' },
  'Bedford': { lat: 32.8440, lng: -97.1431, zip: '76021' },
  'Euless': { lat: 32.8371, lng: -97.0820, zip: '76039' },
  'Hurst': { lat: 32.8235, lng: -97.1706, zip: '76053' },
  'Burleson': { lat: 32.5421, lng: -97.3208, zip: '76028' },
  'Weatherford': { lat: 32.7593, lng: -97.7972, zip: '76086' },
  'Cleburne': { lat: 32.3476, lng: -97.3867, zip: '76031' },
  'Waxahachie': { lat: 32.3865, lng: -96.8483, zip: '75165' }
};

function getServerCityName(pathStr: string): string {
  return getCityNameFromPath(pathStr);
}

/**
 * Generates rich, semantic, crawlable HTML inside <div id="root">
 * so every page has an accessible H1, main content, breadcrumbs, nav,
 * internal links, FAQs, and conversion CTAs.
 */
function generatePrerenderBody(route: string, title: string, description: string, cityName: string): string {
  const norm = route.toLowerCase();
  const isHome = norm === '/' || norm === '' || norm === '/index.html';
  
  // 1. Determine exact H1
  let h1 = title.split('|')[0].trim();
  if (isHome) {
    h1 = "Zultys Business Phone Systems in Dallas–Fort Worth";
  } else if (norm.includes('pricing')) {
    h1 = "Zultys VoIP & Cloud Phone System Pricing";
  } else if (norm.includes('cloud')) {
    h1 = "Zultys Hosted Cloud Phone System & PBX";
  } else if (norm === '/products' || norm === '/zultys-ip-phones') {
    h1 = "Zultys IP Phones & Communications Hardware";
  } else if (norm === '/solutions') {
    h1 = "Zultys Unified Communications & VoIP Solutions";
  } else if (norm === '/about') {
    h1 = "About DFW Business Communications";
  } else if (norm === '/contact') {
    h1 = "Contact DFW Zultys Phone Experts";
  } else if (norm.includes('audit')) {
    h1 = "Free VoIP & Telecom Network Readiness Audit";
  } else if (norm.includes('faq')) {
    h1 = "Frequently Asked Questions About Zultys";
  } else if (norm.includes('-vs-') || norm.includes('compare')) {
    h1 = title.split('|')[0].trim();
  } else if (norm.includes('zip-') || norm.includes('z-2') || norm.includes('mx-') || norm.includes('gateways') || norm.includes('zac')) {
    h1 = title.split('|')[0].trim();
  } else if (cityName && cityName !== 'Dallas-Fort Worth') {
    h1 = `Zultys Business Phone Systems in ${cityName}, TX`;
  }

  // 2. Determine breadcrumbs
  const breadcrumbItems = [
    { label: 'Home', href: '/' }
  ];
  if (!isHome) {
    if (norm.includes('product') || norm.includes('zip-') || norm.includes('z-2') || norm.includes('mx-') || norm.includes('gateways')) {
      breadcrumbItems.push({ label: 'Products & Hardware', href: '/products' });
    } else if (norm.includes('solution') || norm.includes('healthcare') || norm.includes('education') || norm.includes('legal') || norm.includes('financial')) {
      breadcrumbItems.push({ label: 'VoIP Solutions', href: '/solutions' });
    } else if (norm.includes('cloud')) {
      breadcrumbItems.push({ label: 'Cloud Services', href: '/zultys-cloud-services' });
    } else if (cityName !== 'Dallas-Fort Worth') {
      breadcrumbItems.push({ label: 'DFW Service Areas', href: '/solutions' });
    }
    breadcrumbItems.push({ label: h1, href: route });
  }

  // 3. Category contextual text
  let deepContent = '';
  let relatedLinks: { label: string; href: string }[] = [];

  if (isHome) {
    deepContent = `
      <p>DFW Business Communications is the premier certified Zultys partner and telecom provider serving enterprises, mid-market businesses, and rapidly scaling organizations across Dallas, Fort Worth, Arlington, Plano, Frisco, Irving, and the surrounding North Texas metroplex. We specialize in designing, deploying, and maintaining resilient all-in-one unified communications (UCaaS), hybrid IP-PBX systems, SIP trunking, and cloud-hosted telecommunications architectures tailored specifically for demanding business environments.</p>
      <p>Modern organizations need communications systems that combine high-fidelity HD voice, enterprise call routing, integrated video conferencing, contact center reporting, and robust mobility through Zultys Advanced Communicator (ZAC) and MXmobile smartphone applications. Whether you operate a single corporate headquarters or manage a decentralized workforce across multiple commercial facilities, our local certified engineers guarantee zero-downtime number porting, seamless carrier coordination, custom dial plan programming, and on-site staff training.</p>
      <p>Unlike national VoIP aggregators who route support calls to remote overseas call centers, DFW Business Communications delivers local, on-site technician dispatch within hours. Every installation is backed by comprehensive network readiness testing, QoS voice packet prioritization, carrier failover redundancy, and our 99.99% uptime guarantee.</p>
    `;
    relatedLinks = [
      { label: 'Zultys Cloud Services', href: '/zultys-cloud-services' },
      { label: 'ZIP 49G Smart Media Phone', href: '/fort-worth-zultys-zip-49g-phone' },
      { label: 'ZIP 47G Executive Gigabit Phone', href: '/fort-worth-zultys-zip-47g-phone' },
      { label: 'Zultys MX-SE Hardware Appliance', href: '/fort-worth-zultys-mx-se' },
      { label: 'Fort Worth Zultys Systems', href: '/fort-worth-zultys-systems' },
      { label: 'Dallas Zultys Phones', href: '/dallas-zultys-phones' },
      { label: 'Arlington IP-PBX Solutions', href: '/arlington-ip-pbx' },
      { label: 'Plano Zultys Dealer', href: '/plano-zultys-dealer' },
      { label: 'Frisco VoIP Solutions', href: '/frisco-voip-solutions' },
      { label: 'Free VoIP Site Audit', href: '/free-voip-site-audit' }
    ];
  } else if (norm.includes('product') || norm.includes('zip-') || norm.includes('z-2') || norm.includes('mx-') || norm.includes('gateways') || norm.includes('zac')) {
    deepContent = `
      <p>The ${h1} represents the pinnacle of enterprise communication hardware, built from the ground up for maximum voice clarity, reliable hardware longevity, and effortless day-to-day usability. Engineered specifically to interface natively with the Zultys MXvirtual, cloud-hosted, and on-premise IP-PBX platforms, this solution eliminates the interoperability issues and voice latency typical of generic third-party SIP hardware.</p>
      <p>Key architectural highlights include dual auto-sensing Gigabit Ethernet ports with integrated Power over Ethernet (PoE), dedicated hardware acoustic echo cancellation, wideband HD audio codecs (including G.722 and Opus), and full cryptographic support via TLS and SRTP. Users benefit from programmable multi-function keys for one-touch speed dialing, busy lamp fields (BLF), park slots, call recording triggers, and intercom paging.</p>
      <p>When you purchase or lease your Zultys communication hardware through DFW Business Communications, our certified technical team provisions every phone with zero-touch automated configuration, executes rigorous on-site switch and cabling audits, and provides hands-on executive training for your entire team across Dallas and Fort Worth.</p>
    `;
    relatedLinks = [
      { label: 'All Zultys Products', href: '/products' },
      { label: 'ZIP 49G Smart Phone', href: '/fort-worth-zultys-zip-49g-phone' },
      { label: 'ZIP 47G Business Phone', href: '/fort-worth-zultys-zip-47g-phone' },
      { label: 'ZIP 45G High Performance', href: '/fort-worth-zultys-zip-45g-phone' },
      { label: 'ZIP 43G Entry Gigabit', href: '/fort-worth-zultys-zip-43g-phone' },
      { label: 'MX-SE Appliance', href: '/fort-worth-zultys-mx-se' },
      { label: 'Zultys IP Phones', href: '/zultys-ip-phones' },
      { label: 'Professional Installation', href: '/fort-worth-zultys-installation' },
      { label: 'VoIP Pricing Plans', href: '/zultys-pricing' },
      { label: 'Contact Hardware Sales', href: '/contact' }
    ];
  } else if (norm.includes('-vs-') || norm.includes('compare')) {
    deepContent = `
      <p>Selecting the right enterprise telecommunications platform for your North Texas business is a mission-critical decision. While national public-cloud providers rely heavily on standardized self-service portals, shared public cloud tenants, and remote offshore support desks, Zultys delivered by DFW Business Communications gives you a dedicated local partner, tailored hybrid architectures, and guaranteed voice QoS.</p>
      <p>Unlike competitors that force organizations into rigid multi-year cloud contracts with recurring monthly per-seat licensing fees that escalate over time, Zultys provides unmatched deployment flexibility: deploy 100% in the cloud, on dedicated on-premise hardware appliances, or in a hybrid survivable configuration. If your external internet connection ever suffers an outage, your internal office intercom, paging, emergency 911 dispatch, and local line connectivity continue operating uninterrupted.</p>
      <p>Furthermore, DFW Business Communications provides local on-site technicians dispatched from within the Dallas-Fort Worth Metroplex. We personally audit your cabling, configure your PoE switches and firewall voice VLANS, and support your team 24/7 with zero automated phone trees.</p>
    `;
    relatedLinks = [
      { label: 'Zultys vs RingCentral', href: '/zultys-vs-ringcentral' },
      { label: 'Zultys vs 8x8', href: '/zultys-vs-8x8' },
      { label: 'Zultys vs Microsoft Teams', href: '/zultys-vs-microsoft-teams' },
      { label: 'Zultys vs Cisco', href: '/zultys-vs-cisco-webex' },
      { label: 'Zultys vs Nextiva', href: '/zultys-vs-nextiva' },
      { label: 'Zultys vs Zoom Phone', href: '/zultys-vs-zoom-phone' },
      { label: 'Free VoIP Site Audit', href: '/free-voip-site-audit' },
      { label: 'Zultys FAQ', href: '/zultys-faq' },
      { label: 'Cloud VoIP Services', href: '/zultys-cloud-services' }
    ];
  } else if (norm.includes('healthcare') || norm.includes('education') || norm.includes('legal') || norm.includes('financial') || norm.includes('solution')) {
    deepContent = `
      <p>Specialized industries require communication platforms designed to meet strict regulatory compliance mandates, stringent client confidentiality rules, and demanding workflow efficiencies. DFW Business Communications engineers custom Zultys telecommunication solutions architected specifically to solve the unique voice, messaging, and data challenges of commercial enterprises in Dallas-Fort Worth.</p>
      <p>For healthcare clinics, dental networks, and hospitals, Zultys ensures complete HIPAA compliance with 256-bit AES encryption for all voice calls, encrypted voicemail-to-email delivery, and secure multi-tier user authentication. For legal practices, accounting firms, and financial institutions, built-in cradle-to-grave call recording, automatic billing matter code entry, and CRM integration allow billable client calls to be logged and archived automatically.</p>
      <p>Every industry deployment is executed with zero downtime. Our local technical specialists coordinate number porting with existing carriers, program custom after-hours auto-attendants, configure hunt groups and ring groups, and provide staff training tailored to your exact operational requirements.</p>
    `;
    relatedLinks = [
      { label: 'Healthcare VoIP Solutions', href: '/fort-worth-zultys-healthcare' },
      { label: 'Financial Services VoIP', href: '/zultys-for-financial-services' },
      { label: 'Legal Firm Communications', href: '/zultys-for-legal-firms' },
      { label: 'HIPAA Compliant VoIP', href: '/hipaa-compliant-voip' },
      { label: 'Contact Center Systems', href: '/fort-worth-zultys-contact-center' },
      { label: 'Remote Work VoIP', href: '/remote-work-solutions' },
      { label: 'VoIP Security & Encryption', href: '/voip-security-encryption' },
      { label: 'Request Industry Quote', href: '/contact' }
    ];
  } else {
    // City or Local Page
    const activeCity = cityName && cityName !== 'Dallas-Fort Worth' ? cityName : 'Dallas-Fort Worth';
    deepContent = `
      <p>Businesses throughout ${activeCity}, Texas rely on dependable, crystal-clear business telephone systems to drive daily commerce, support customer inquiries, and coordinate multi-site operations. As an authorized Zultys dealer serving ${activeCity} and the broader North Texas commercial corridor, DFW Business Communications delivers enterprise-grade VoIP phone systems, hosted PBX cloud calling, and unified communications platforms tailored to your company’s exact size and budget.</p>
      <p>Whether your ${activeCity} facility requires modern desktop Gigabit IP phones (such as the Zultys ZIP 49G and ZIP 47G), smartphone mobility via MXmobile, automated multi-level interactive voice response (IVR) auto-attendants, or Microsoft Teams direct voice integration, our local telecom engineers build a unified ecosystem that optimizes your team's workflow. We manage the entire lifecycle of your telecommunications infrastructure—from carrier coordination and zero-downtime telephone number porting to structured voice cabling and switch QoS optimization.</p>
      <p>Unlike national telecommunications resellers with distant call centers, DFW Business Communications is located right here in the DFW Metroplex. If your ${activeCity} office requires hands-on troubleshooting, hardware expansion, or personalized staff training, our certified engineers are on-site quickly to ensure your phones stay connected 24/7/365.</p>
    `;
    relatedLinks = [
      { label: 'Zultys Cloud VoIP Services', href: '/zultys-cloud-services' },
      { label: 'Zultys Hardware & IP Phones', href: '/products' },
      { label: 'ZIP 49G Touchscreen Phone', href: '/fort-worth-zultys-zip-49g-phone' },
      { label: 'ZIP 47G Gigabit Business Phone', href: '/fort-worth-zultys-zip-47g-phone' },
      { label: 'MX-SE Enterprise Appliance', href: '/fort-worth-zultys-mx-se' },
      { label: 'Fort Worth Phone Systems', href: '/fort-worth-zultys-systems' },
      { label: 'Dallas Business Phones', href: '/dallas-zultys-phones' },
      { label: 'Arlington IP-PBX', href: '/arlington-ip-pbx' },
      { label: 'Plano Zultys Dealer', href: '/plano-zultys-dealer' },
      { label: 'Frisco VoIP Solutions', href: '/frisco-voip-solutions' },
      { label: 'Free VoIP Site Survey', href: '/free-voip-site-audit' },
      { label: 'Contact Local Support', href: '/contact' }
    ];
  }

  // 4. Build standard HTML string for inside #root
  return `
    <div class="prerender-wrapper" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.6; background-color: #f8fafc; margin: 0; padding: 0;">
      
      <!-- Top Utility Header -->
      <header class="site-header" style="background: #020617; color: #ffffff; padding: 16px 24px; border-bottom: 1px solid #1e293b;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;">
          <a href="/" style="color: #ffffff; text-decoration: none; font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
            <span style="color: #00a82d;">ZULTYS</span> DFW Business Communications
          </a>
          <nav aria-label="Primary Navigation" style="display: flex; flex-wrap: wrap; align-items: center; gap: 20px; font-size: 15px; font-weight: 600;">
            <a href="/products" style="color: #cbd5e1; text-decoration: none;">Products & Hardware</a>
            <a href="/solutions" style="color: #cbd5e1; text-decoration: none;">VoIP Solutions</a>
            <a href="/zultys-cloud-services" style="color: #cbd5e1; text-decoration: none;">Cloud Services</a>
            <a href="/zultys-pricing" style="color: #cbd5e1; text-decoration: none;">Pricing</a>
            <a href="/about" style="color: #cbd5e1; text-decoration: none;">About Us</a>
            <a href="/contact" style="color: #cbd5e1; text-decoration: none;">Contact</a>
            <a href="tel:8172312962" style="background: #00a82d; color: #ffffff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: 700;">(817) 231-2962</a>
          </nav>
        </div>
      </header>

      <!-- Breadcrumbs -->
      <div style="background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 12px 24px;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <nav aria-label="Breadcrumb" style="font-size: 14px; color: #64748b;">
            ${breadcrumbItems.map((item, idx) => {
              const isLast = idx === breadcrumbItems.length - 1;
              if (isLast) {
                return `<span style="color: #0f172a; font-weight: 600;">${item.label}</span>`;
              }
              return `<a href="${item.href}" style="color: #2563eb; text-decoration: none;">${item.label}</a> <span style="margin: 0 8px;">/</span>`;
            }).join('')}
          </nav>
        </div>
      </div>

      <!-- Hero Banner -->
      <section style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); color: #ffffff; padding: 64px 24px; text-align: center;">
        <div style="max-width: 900px; margin: 0 auto;">
          <span style="display: inline-block; background: rgba(0, 168, 45, 0.2); border: 1px solid rgba(0, 168, 45, 0.4); color: #4ade80; padding: 6px 16px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
            Authorized Zultys Partner Dallas-Fort Worth
          </span>
          <h1 style="font-size: 38px; line-height: 1.2; font-weight: 900; margin: 0 0 20px 0; color: #ffffff; letter-spacing: -0.5px;">
            ${h1}
          </h1>
          <p style="font-size: 19px; line-height: 1.6; color: #cbd5e1; margin: 0 0 32px 0; font-weight: 400;">
            ${description}
          </p>
          <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 16px;">
            <a href="/contact" style="background: #d4a017; color: #020617; padding: 14px 32px; border-radius: 8px; font-weight: 800; text-decoration: none; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">
              Request Free Consultation
            </a>
            <a href="tel:8172312962" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); color: #ffffff; padding: 14px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 16px;">
              Call (817) 231-2962
            </a>
          </div>
        </div>
      </section>

      <!-- Main Content Container -->
      <main style="max-width: 1200px; margin: 48px auto; padding: 0 24px;">
        
        <!-- Key Capabilities Grid -->
        <section style="margin-bottom: 56px;">
          <h2 style="font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 24px; text-align: center;">
            Enterprise Zultys Phone System Capabilities
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="font-size: 20px; font-weight: 700; margin-top: 0; color: #0f172a;">All-In-One Unified Communications</h3>
              <p style="color: #475569; font-size: 15px; margin-bottom: 0;">Integrate voice calling, secure corporate chat, presence status, multi-party video conferencing, and fax directly within the ZAC desktop application and MXmobile smartphone app.</p>
            </div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="font-size: 20px; font-weight: 700; margin-top: 0; color: #0f172a;">Carrier-Grade High Availability</h3>
              <p style="color: #475569; font-size: 15px; margin-bottom: 0;">Designed with native survivability and automatic carrier failover. If local internet service is interrupted, calls automatically reroute to cellular endpoints, remote sites, or backup trunk lines.</p>
            </div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="font-size: 20px; font-weight: 700; margin-top: 0; color: #0f172a;">Local On-Site DFW Engineering</h3>
              <p style="color: #475569; font-size: 15px; margin-bottom: 0;">Our technicians are based locally in the Dallas-Fort Worth Metroplex. We execute structured cabling, switch configuration, on-site deployment, and face-to-face staff training with 24/7 emergency dispatch.</p>
            </div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="font-size: 20px; font-weight: 700; margin-top: 0; color: #0f172a;">Advanced Contact Center & Analytics</h3>
              <p style="color: #475569; font-size: 15px; margin-bottom: 0;">Comprehensive supervisor dashboards, live agent call monitoring, whisper coaching, barge-in capabilities, automated call recording, and detailed queue analytics for customer support teams.</p>
            </div>
          </div>
        </section>

        <!-- Deep Context Section -->
        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; margin-bottom: 56px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
          <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 20px;">
            Comprehensive Telecommunications Overview
          </h2>
          <div style="font-size: 16px; line-height: 1.8; color: #334155;">
            ${deepContent}
          </div>
        </section>

        <!-- Frequently Asked Questions -->
        <section style="margin-bottom: 56px;">
          <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; margin-bottom: 24px; text-align: center;">
            Frequently Asked Questions
          </h2>
          <div style="display: flex; flex-direction: column; gap: 16px; max-width: 900px; margin: 0 auto;">
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px;">
              <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 8px;">Can we port our existing phone numbers to the new Zultys system?</h3>
              <p style="color: #475569; font-size: 15px; margin: 0;">Yes. DFW Business Communications manages the entire telephone number porting process with your existing telecom carrier. We coordinate all main billing numbers, direct inward dial (DID) lines, and toll-free numbers for a seamless, zero-downtime cutover.</p>
            </div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px;">
              <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 8px;">How does Zultys support remote and hybrid employees?</h3>
              <p style="color: #475569; font-size: 15px; margin: 0;">The Zultys Advanced Communicator (ZAC) desktop app and MXmobile iOS/Android applications allow team members to make and receive business calls using their office caller ID, access extension dialing, check corporate voicemails, and participate in video meetings from any location without requiring complex VPN setups.</p>
            </div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px;">
              <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 8px;">What is the difference between Zultys Cloud and an On-Premise appliance?</h3>
              <p style="color: #475569; font-size: 15px; margin: 0;">Zultys Cloud is hosted in redundant, secure data centers with zero server maintenance and low upfront costs. The on-premise MX-SE and MXvirtual appliances reside within your physical data closet, giving organizations absolute local control, local survivability during internet outages, and long-term hardware ownership.</p>
            </div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px;">
              <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 8px;">How quickly can local technicians be dispatched in Dallas-Fort Worth?</h3>
              <p style="color: #475569; font-size: 15px; margin: 0;">Because our certified technicians are stationed directly across the DFW Metroplex, we provide same-day on-site response for urgent hardware or network disruptions, as well as 24/7 remote monitoring and proactive system health checks.</p>
            </div>
          </div>
        </section>

        <!-- Internal Links & Context Matrix -->
        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; margin-bottom: 56px;">
          <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 16px;">
            Related Zultys Telecommunications Resources
          </h2>
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            ${relatedLinks.map(link => `
              <a href="${link.href}" style="background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">
                ${link.label}
              </a>
            `).join('')}
          </div>
        </section>

        <!-- Bottom CTA -->
        <section style="background: linear-gradient(135deg, #00a82d 0%, #008724 100%); color: #ffffff; border-radius: 16px; padding: 48px; text-align: center; margin-bottom: 48px;">
          <h2 style="font-size: 30px; font-weight: 900; margin-top: 0; margin-bottom: 16px; color: #ffffff;">
            Ready to Upgrade Your Dallas-Fort Worth Business Phone System?
          </h2>
          <p style="font-size: 18px; max-width: 700px; margin: 0 auto 32px auto; color: #e2fbe8;">
            Schedule a free on-site VoIP network assessment or request a tailored system quote. Speak with our local certified Zultys engineers today.
          </p>
          <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 16px;">
            <a href="/free-voip-site-audit" style="background: #020617; color: #ffffff; padding: 14px 32px; border-radius: 8px; font-weight: 800; text-decoration: none; font-size: 16px;">
              Request Free Site Audit
            </a>
            <a href="tel:8172312962" style="background: #ffffff; color: #008724; padding: 14px 28px; border-radius: 8px; font-weight: 800; text-decoration: none; font-size: 16px;">
              Call (817) 231-2962
            </a>
          </div>
        </section>

      </main>

      <!-- Footer -->
      <footer class="site-footer" style="background: #020617; color: #94a3b8; padding: 48px 24px; border-top: 1px solid #1e293b; font-size: 14px;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; margin-bottom: 40px;">
          <div>
            <h3 style="color: #ffffff; font-size: 16px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">DFW Business Communications</h3>
            <p style="margin: 0 0 12px 0; color: #94a3b8;">Authorized Zultys Partner serving Dallas, Fort Worth, and the entire North Texas Metroplex.</p>
            <p style="margin: 0; color: #ffffff; font-weight: 600;">Phone: <a href="tel:8172312962" style="color: #4ade80; text-decoration: none;">(817) 231-2962</a></p>
            <p style="margin: 4px 0 0 0; color: #94a3b8;">Dispatch: Fort Worth & Dallas, TX</p>
          </div>
          <div>
            <h3 style="color: #ffffff; font-size: 16px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Core Solutions</h3>
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
              <li><a href="/products" style="color: #cbd5e1; text-decoration: none;">Zultys IP Phones</a></li>
              <li><a href="/solutions" style="color: #cbd5e1; text-decoration: none;">VoIP Solutions</a></li>
              <li><a href="/zultys-cloud-services" style="color: #cbd5e1; text-decoration: none;">Hosted Cloud PBX</a></li>
              <li><a href="/fort-worth-zultys-hybrid" style="color: #cbd5e1; text-decoration: none;">Hybrid PBX Deployments</a></li>
              <li><a href="/zultys-pricing" style="color: #cbd5e1; text-decoration: none;">Pricing Plans</a></li>
            </ul>
          </div>
          <div>
            <h3 style="color: #ffffff; font-size: 16px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Top Service Areas</h3>
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
              <li><a href="/fort-worth-zultys-systems" style="color: #cbd5e1; text-decoration: none;">Fort Worth Systems</a></li>
              <li><a href="/dallas-zultys-phones" style="color: #cbd5e1; text-decoration: none;">Dallas Zultys Phones</a></li>
              <li><a href="/arlington-ip-pbx" style="color: #cbd5e1; text-decoration: none;">Arlington IP-PBX</a></li>
              <li><a href="/plano-zultys-dealer" style="color: #cbd5e1; text-decoration: none;">Plano Zultys Dealer</a></li>
              <li><a href="/frisco-voip-solutions" style="color: #cbd5e1; text-decoration: none;">Frisco VoIP Solutions</a></li>
            </ul>
          </div>
          <div>
            <h3 style="color: #ffffff; font-size: 16px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Company & Support</h3>
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
              <li><a href="/about" style="color: #cbd5e1; text-decoration: none;">About Us</a></li>
              <li><a href="/contact" style="color: #cbd5e1; text-decoration: none;">Contact & Support</a></li>
              <li><a href="/free-voip-site-audit" style="color: #cbd5e1; text-decoration: none;">Free Site Audit</a></li>
              <li><a href="/zultys-faq" style="color: #cbd5e1; text-decoration: none;">Knowledgebase FAQ</a></li>
              <li><a href="/privacy" style="color: #cbd5e1; text-decoration: none;">Privacy Policy</a></li>
              <li><a href="/sitemap.html" style="color: #cbd5e1; text-decoration: none;">HTML Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div style="max-width: 1200px; margin: 0 auto; padding-top: 24px; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 13px;">
          &copy; ${new Date().getFullYear()} DFW Business Communications. All rights reserved. Authorized independent Zultys partner serving the Dallas-Fort Worth Metroplex.
        </div>
      </footer>

    </div>
  `;
}

function injectSEOMetadataAndBody(html: string, urlPath: string): string {
  // Normalize path
  let normPath = urlPath.split('?')[0].split('#')[0];
  if (normPath === '/index.html') {
    normPath = '/';
  } else if (normPath.endsWith('/') && normPath.length > 1) {
    normPath = normPath.slice(0, -1);
  }

  // 1. Get the elite metadata for this path
  const { title, description, keywords } = generateEliteMetadata(normPath);
  
  // 2. Build the canonical URL
  const siteUrl = "https://dallasfortworthzultys.com";
  const canonicalPath = canonicalMap[normPath] || normPath;
  const canonicalUrl = `${siteUrl}${canonicalPath === '/' ? '' : canonicalPath}`;

  // 3. Determine if this page should be noindexed
  const isNoIndex = 
    normPath === '/seo-dashboard' || 
    normPath === '/admin/search-console' || 
    normPath === '/citation-health' || 
    normPath === '/admin/citations' ||
    normPath === '/seo-admin' ||
    normPath.startsWith('/admin/');

  const robotsDirective = isNoIndex 
    ? "noindex, nofollow, noarchive" 
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const googlebotDirective = isNoIndex 
    ? "noindex, nofollow" 
    : "index, follow";

  const ogImage = `${siteUrl}/og-image.jpg`;

  // 4. Generate clean, unified @graph JSON-LD structured schema
  const isHome = normPath === '/' || normPath === '';
  const cityName = getServerCityName(normPath);
  
  const graphNodes: any[] = [];

  // Node 1: Organization
  graphNodes.push({
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'DFW Business Communications',
    url: siteUrl,
    logo: `${siteUrl}/zultys-logo.png`,
    description: 'Authorized Zultys dealer, partner, and VoIP service provider serving Dallas, Fort Worth, and the entire DFW Metroplex.',
    email: 'info@dallasfortworthzultys.com',
    telephone: '+1-817-231-2962',
    sameAs: [
      'https://www.facebook.com/zultys',
      'https://www.linkedin.com/company/zultys-inc-'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-817-231-2962',
      contactType: 'sales and customer support',
      areaServed: 'US',
      availableLanguage: 'en'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '201 Main St, Suite 600',
      addressLocality: 'Fort Worth',
      addressRegion: 'TX',
      postalCode: '76102',
      addressCountry: 'US'
    }
  });

  // Node 2: WebSite
  graphNodes.push({
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'DFW Business Communications - Zultys VoIP DFW',
    publisher: {
      '@id': `${siteUrl}/#organization`
    }
  });

  // Node 3: BreadcrumbList
  const breadcrumbElements = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}/`
    }
  ];

  if (!isHome) {
    let crumbName = cityName;
    if (normPath.includes('/products')) crumbName = 'Zultys Products';
    else if (normPath.includes('/solutions')) crumbName = 'VoIP Solutions';
    else if (normPath.includes('/about')) crumbName = 'About Us';
    else if (normPath.includes('/contact')) crumbName = 'Contact';
    else if (normPath.includes('/blog')) crumbName = 'VoIP Blog';
    else if (normPath.includes('/zultys-faq')) crumbName = 'FAQ';
    else if (normPath.includes('/pricing')) crumbName = 'Pricing';
    else if (normPath.includes('/free-voip-site-audit')) crumbName = 'Free Audit';
    
    breadcrumbElements.push({
      '@type': 'ListItem',
      position: 2,
      name: crumbName,
      item: canonicalUrl
    });
  }

  graphNodes.push({
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbElements
  });

  // Node 4: WebPage
  graphNodes.push({
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description: description,
    isPartOf: { '@id': `${siteUrl}/#website` },
    breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
    inLanguage: 'en-US'
  });

  // Node 5: Route-specific Entity (LocalBusiness, Product, Service, BlogPosting)
  const isSpecificHardware = 
    normPath.includes('zip-49g') ||
    normPath.includes('zip-47g') ||
    normPath.includes('zip-45g') ||
    normPath.includes('zip-43g') ||
    normPath.includes('z-23ge') ||
    normPath.includes('z23g') ||
    normPath.includes('z-22g') ||
    normPath.includes('z-21i') ||
    normPath.includes('mx-series') ||
    normPath.includes('mx-se');

  if (isSpecificHardware) {
    // Only actual hardware products receive Product schema
    let prodName = 'Zultys IP Phone';
    let prodImage: string | undefined;
    if (normPath.includes('zip-49g')) {
      prodName = 'Zultys ZIP 49G Smart Media Phone';
      prodImage = 'https://images.dallasfortworthzultys.com/dallas-fort-worth-zultys-zip-49g-ip-phone.jpg';
    } else if (normPath.includes('zip-47g')) {
      prodName = 'Zultys ZIP 47G Business Gigabit Phone';
      prodImage = 'https://images.dallasfortworthzultys.com/dallas-fort-worth-zultys-zip-47g-ip-phone.jpg';
    } else if (normPath.includes('zip-45g')) {
      prodName = 'Zultys ZIP 45G High-Performance Phone';
      prodImage = 'https://images.dallasfortworthzultys.com/dallas-fort-worth-zultys-zip-45g-ip-phone.jpg';
    } else if (normPath.includes('zip-43g')) {
      prodName = 'Zultys ZIP 43G Entry Gigabit Phone';
    } else if (normPath.includes('z-23ge') || normPath.includes('z23g')) {
      prodName = 'Zultys Z 23GE IP Phone';
      prodImage = 'https://images.dallasfortworthzultys.com/dallas-fort-worth-zultys-Z-23GE-ip-phone.jpg';
    } else if (normPath.includes('z-22g')) {
      prodName = 'Zultys Z 22G IP Phone';
      prodImage = 'https://images.dallasfortworthzultys.com/dallas-fort-worth-zultys-Z-22G-ip-phone.jpg';
    } else if (normPath.includes('z-21i')) {
      prodName = 'Zultys Z 21i IP Phone';
      prodImage = 'https://images.dallasfortworthzultys.com/dallas-fort-worth-zultys-Z-21i-ip-phone.jpg';
    } else if (normPath.includes('mx-series')) {
      prodName = 'Zultys MX Series IP PBX';
      prodImage = 'https://images.dallasfortworthzultys.com/dallas-fort-worth-zultys-mx250-phone-system.jpg';
    } else if (normPath.includes('mx-se')) {
      prodName = 'Zultys MX-SE IP-PBX Appliance';
      prodImage = 'https://images.dallasfortworthzultys.com/dallas-fort-worth-zultys-mx-se-phone-system.jpg';
    }

    const productNode: Record<string, any> = {
      '@type': 'Product',
      '@id': `${canonicalUrl}#product`,
      name: prodName,
      description: description,
      url: canonicalUrl,
      brand: {
        '@type': 'Brand',
        name: 'Zultys'
      }
    };
    if (prodImage) {
      productNode.image = prodImage;
    }

    graphNodes.push(productNode);
  } else if (normPath.startsWith('/blog') || normPath.includes('blog-') || normPath.includes('-blog')) {
    // Blog Posting Schema
    graphNodes.push({
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#blogpost`,
      headline: title,
      description: description,
      image: ogImage,
      author: {
        '@id': `${siteUrl}/#organization`
      },
      publisher: {
        '@id': `${siteUrl}/#organization`
      },
      mainEntityOfPage: {
        '@id': `${canonicalUrl}#webpage`
      },
      inLanguage: 'en-US'
    });
  } else if (cityName && cityName !== 'Dallas-Fort Worth') {
    // LocalBusiness / ProfessionalService schema for local service area routes
    const coords = serverCityCoordinates[cityName] || { lat: 32.7555, lng: -97.3308, zip: '76102' };
    graphNodes.push({
      '@type': 'ProfessionalService',
      '@id': `${canonicalUrl}#localbusiness`,
      name: `DFW Business Communications - ${cityName} Zultys Partner`,
      url: canonicalUrl,
      image: ogImage,
      telephone: '+1-817-231-2962',
      priceRange: '$$',
      parentOrganization: {
        '@id': `${siteUrl}/#organization`
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: cityName,
        addressRegion: 'TX',
        postalCode: coords.zip,
        addressCountry: 'US'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: coords.lat,
        longitude: coords.lng
      },
      areaServed: {
        '@type': 'City',
        name: cityName,
        sameAs: `https://en.wikipedia.org/wiki/${cityName.replace(/\s+/g, '_')},_Texas`
      }
    });

    // Service node for local route
    graphNodes.push({
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: `Business Phone Systems & VoIP in ${cityName}`,
      serviceType: 'TelecommunicationsService',
      provider: {
        '@id': `${siteUrl}/#organization`
      },
      areaServed: {
        '@type': 'City',
        name: cityName
      }
    });
  } else {
    // General Services/Solutions
    graphNodes.push({
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: title.split('|')[0].trim(),
      serviceType: 'TelecommunicationsService',
      provider: {
        '@id': `${siteUrl}/#organization`
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Dallas-Fort Worth Metroplex, TX'
      }
    });
  }

  // FAQ Schema if relevant
  graphNodes.push({
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: `Can we port our existing phone numbers to Zultys?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. DFW Business Communications manages the entire telephone number porting process with your current carrier to ensure a seamless zero-downtime cutover.`
        }
      },
      {
        '@type': 'Question',
        name: `Does Zultys support mobile and remote employees?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. The Zultys Advanced Communicator (ZAC) desktop client and MXmobile iOS/Android applications provide full access to office extensions, video meetings, and chat from anywhere.`
        }
      },
      {
        '@type': 'Question',
        name: `How quickly can local technicians respond in Dallas-Fort Worth?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Because our certified engineers are stationed directly across the DFW Metroplex, we provide same-day on-site response and 24/7 emergency dispatch.`
        }
      }
    ]
  });

  const singleJsonLdScript = `<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': graphNodes
}, null, 2)}
</script>`;

  // 5. Build our clean set of SEO head tags
  const seoHeadTags = [
    `<!-- Dynamic SEO Injection -->`,
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="keywords" content="${keywords}" />`,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<meta name="robots" content="${robotsDirective}" />`,
    `<meta name="googlebot" content="${googlebotDirective}" />`,
    `<meta name="author" content="DFW Business Communications" />`,
    `<meta name="geo.region" content="US-TX" />`,
    `<meta name="geo.placename" content="${cityName === 'Dallas-Fort Worth' ? 'Fort Worth, Dallas' : cityName + ', TX'}" />`,
    `<meta name="geo.position" content="32.7555;-97.3308" />`,
    `<meta name="ICBM" content="32.7555, -97.3308" />`,
    `<!-- Open Graph -->`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta property="og:site_name" content="DFW Business Communications" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<!-- Twitter -->`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<!-- Unified Schema.org Graph -->`,
    singleJsonLdScript,
    `<!-- End Dynamic SEO Injection -->`
  ].join('\n    ');

  // 6. Clean up the existing template
  let cleanedHtml = html;
  cleanedHtml = cleanedHtml.replace(/<title>[\s\S]*?<\/title>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+content="[^"]*"\s+name="description"\s*\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+content="[^"]*"\s+name="keywords"\s*\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<link\s+href="[^"]*"\s+rel="canonical"\s*\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+(name|property)="robots"[\s\S]*?\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+(name|property)="googlebot"[\s\S]*?\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+(name|property)="og:[\s\S]*?\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+(name|property)="twitter:[\s\S]*?\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, '');

  // 7. Inject our clean set right after <head>
  cleanedHtml = cleanedHtml.replace(/<head>/i, `<head>\n    ${seoHeadTags}`);

  // 8. CRITICAL: Inject the crawlable, meaningful HTML body into <div id="root">
  const prerenderBody = generatePrerenderBody(normPath, title, description, cityName);
  cleanedHtml = cleanedHtml.replace(
    /<div id="root">([\s\S]*?)<\/div>/i,
    `<div id="root">\n${prerenderBody}\n</div>`
  );

  return cleanedHtml;
}

/**
 * Creates an HTML redirect document for alias/non-canonical routes
 */
function generateRedirectHtml(targetCanonicalPath: string): string {
  const fullUrl = `https://dallasfortworthzultys.com${targetCanonicalPath === '/' ? '' : targetCanonicalPath}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=${fullUrl}">
  <link rel="canonical" href="${fullUrl}">
  <meta name="robots" content="noindex, follow">
  <title>Redirecting...</title>
</head>
<body style="font-family: sans-serif; padding: 40px; text-align: center;">
  <p>This page has permanently moved. Redirecting to <a href="${fullUrl}">${fullUrl}</a>...</p>
</body>
</html>`;
}

// Perform Pre-rendering for each valid route
let successCount = 0;
let redirectCount = 0;
let errorCount = 0;

VALID_PATHS.forEach((route) => {
  try {
    let normPath = route.toLowerCase().split('?')[0].split('#')[0];
    if (normPath.endsWith('/') && normPath.length > 1) {
      normPath = normPath.slice(0, -1);
    }
    if (normPath === "") normPath = "/";

    const isRedirect = canonicalMap[normPath] && canonicalMap[normPath] !== normPath;
    const finalHtml = isRedirect 
      ? generateRedirectHtml(canonicalMap[normPath])
      : injectSEOMetadataAndBody(template, route);

    if (isRedirect) {
      redirectCount++;
    }

    if (route === "/" || route === "") {
      fs.writeFileSync(templatePath, finalHtml, "utf8");
      successCount++;
    } else {
      const relativeDirPath = route.startsWith("/") ? route.slice(1) : route;
      const targetPath = path.join(distPath, relativeDirPath);

      if (relativeDirPath.endsWith(".html") || relativeDirPath.includes(".")) {
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.writeFileSync(targetPath, finalHtml, "utf8");
      } else {
        fs.mkdirSync(targetPath, { recursive: true });
        fs.writeFileSync(path.join(targetPath, "index.html"), finalHtml, "utf8");
      }
      successCount++;
    }
  } catch (err) {
    console.error(`❌ FAILED to pre-render route: ${route}`, err);
    errorCount++;
  }
});

console.log(`\n🎉 STATIC PRE-RENDERING COMPLETED SUCCESSFULLY!`);
console.log(`✅ Processed ${successCount} total routes in 'dist/'.`);
console.log(`   - Fully Pre-rendered Indexable HTML Pages: ${successCount - redirectCount}`);
console.log(`   - 301 Meta-Redirect Alias Stubs: ${redirectCount}`);
if (errorCount > 0) {
  console.warn(`⚠️ Encountered errors on ${errorCount} pages.`);
}
console.log("==================================================\n");
