import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Map,
  ChevronRight,
  Phone,
  Server,
  Building2,
  Info,
  Mail,
  Layout,
  Shield,
} from 'lucide-react';

export function Sitemap() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Sitemap | Dallas Fort Worth Zultys | DFW Business Communications';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Sitemap for DallasFortWorthZultys.com. Find all pages related to Zultys business phone systems, products, and solutions in Dallas-Fort Worth.');
    }
  }, []);

  const sitemapData = [
    {
      title: 'Main Pages',
      icon: Layout,
      links: [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Solutions', path: '/solutions' },
        { name: 'Zultys Business Phone Systems (SEO)', path: '/zultys-business-phone-systems' },
        { name: 'Dallas Zultys Phones (SEO)', path: '/dallas-zultys-phones' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
      ],
    },
    {
      title: 'Zultys Products',
      icon: Server,
      links: [
        { name: 'Zultys MX Series', path: '/fort-worth-zultys-mx-series' },
        { name: 'Zultys MX-SE', path: '/fort-worth-zultys-mx-se' },
        { name: 'Zultys ZIP 49G Phone', path: '/fort-worth-zultys-zip-49g-phone' },
        { name: 'Zultys ZIP 47G Phone', path: '/fort-worth-zultys-zip-47g-phone' },
        { name: 'Zultys ZIP 45G Phone', path: '/fort-worth-zultys-zip-45g-phone' },
        { name: 'Zultys ZIP 43G Phone', path: '/fort-worth-zultys-zip-43g-phone' },
        { name: 'Zultys Z 23GE Phone', path: '/fort-worth-zultys-z-23ge-phone' },
        { name: 'Zultys Z 22G Phone', path: '/fort-worth-zultys-z-22g-phone' },
        { name: 'Zultys Z 21i Phone', path: '/fort-worth-zultys-z-21i-phone' },
        { name: 'Zultys ZAC Software', path: '/fort-worth-zultys-zac' },
        { name: 'Zultys MXmobile', path: '/fort-worth-zultys-mxmobile' },
        { name: 'Zultys MXconference', path: '/fort-worth-zultys-mxconference' },
      ],
    },
    {
      title: 'Industry Solutions',
      icon: Building2,
      links: [
        { name: 'Healthcare Solutions', path: '/fort-worth-zultys-healthcare' },
        { name: 'Legal & Professional', path: '/fort-worth-zultys-professional-services' },
        { name: 'Real Estate Solutions', path: '/fort-worth-zultys-real-estate' },
        { name: 'Education Solutions', path: '/fort-worth-zultys-education' },
        { name: 'Retail & Automotive', path: '/fort-worth-zultys-retail-automotive' },
        { name: 'Enterprise Solutions', path: '/fort-worth-zultys-enterprise' },
        { name: 'Multi-Location', path: '/fort-worth-zultys-multi-location' },
        { name: 'Zultys for Law Firms', path: '/zultys-for-legal-firms' },
        { name: 'Zultys for Financial Services', path: '/zultys-for-financial-services' },
        { name: 'Zultys for Manufacturing', path: '/zultys-for-manufacturing-logistics' },
        { name: 'Zultys for Hospitality', path: '/zultys-for-hospitality' },
        { name: 'Zultys for Non-Profits', path: '/zultys-for-non-profits' },
        { name: 'Zultys for Education', path: '/zultys-for-education' },
        { name: 'Zultys for Real Estate', path: '/zultys-for-real-estate' },
        { name: 'Zultys for Retail', path: '/zultys-for-retail' },
      ],
    },
    {
      title: 'Service Areas',
      icon: Map,
      links: [
        { name: 'Dallas Zultys Support', path: '/dallas-zultys-phones' },
        { name: 'Fort Worth Zultys Systems', path: '/fort-worth-zultys-systems' },
        { name: 'Arlington IP PBX', path: '/arlington-ip-pbx' },
        { name: 'Plano Zultys Dealer', path: '/plano-zultys-dealer' },
        { name: 'Irving Business Phones', path: '/irving-business-phone-systems' },
        { name: 'Frisco VoIP Solutions', path: '/frisco-voip-solutions' },
        { name: 'Grand Prairie Zultys', path: '/grand-prairie-zultys' },
        { name: 'Southlake IP Phones', path: '/southlake-ip-phones' },
        { name: 'Grapevine Business VoIP', path: '/grapevine-business-voip' },
        { name: 'Carrollton Zultys', path: '/carrollton-zultys' },
        { name: 'Richardson Phone Systems', path: '/richardson-phone-systems' },
        { name: 'Hurst IP PBX', path: '/hurst-ip-pbx' },
        { name: 'Zultys for Mesquite', path: '/mesquite-zultys-phone-systems' },
        { name: 'Zultys for Garland', path: '/garland-business-voip' },
        { name: 'Zultys for McKinney', path: '/mckinney-zultys-dealer' },
        { name: 'Zultys for Denton', path: '/denton-business-phone-systems' },
        { name: 'Zultys for Lewisville', path: '/lewisville-voip-solutions' },
        { name: 'Zultys for Allen', path: '/allen-tx-zultys-voip' },
        { name: 'Zultys for Mansfield', path: '/mansfield-tx-zultys-phone-systems' },
        { name: 'Zultys for Rowlett', path: '/rowlett-tx-zultys-dealer' },
        { name: 'Zultys for Cedar Hill', path: '/cedar-hill-tx-zultys-voip' },
        { name: 'Zultys for DeSoto', path: '/desoto-tx-zultys-phone-systems' },
        { name: 'Zultys for Coppell', path: '/coppell-tx-zultys-phone-systems' },
        { name: 'Zultys for Duncanville', path: '/duncanville-tx-zultys-voip' },
        { name: 'Zultys for Lancaster', path: '/lancaster-tx-zultys-dealer' },
        { name: 'Zultys for The Colony', path: '/the-colony-tx-zultys-voip' },
        { name: 'Zultys for Little Elm', path: '/little-elm-tx-zultys-phone-systems' },
        { name: 'Zultys for Wylie', path: '/wylie-tx-zultys-phone-systems' },
        { name: 'Zultys for Rockwall', path: '/rockwall-tx-zultys-phone-systems' },
        { name: 'Zultys for Forney', path: '/forney-tx-zultys-phone-systems' },
        { name: 'Zultys for Midlothian', path: '/midlothian-tx-zultys-phone-systems' },
        { name: 'Zultys for Waxahachie', path: '/waxahachie-tx-zultys-phone-systems' },
        { name: 'Zultys for Ennis', path: '/ennis-tx-zultys-phone-systems' },
        { name: 'Zultys for Cleburne', path: '/cleburne-tx-zultys-phone-systems' },
        { name: 'Zultys for Weatherford', path: '/weatherford-tx-zultys-phone-systems' },
        { name: 'Zultys for Burleson', path: '/burleson-tx-zultys-phone-systems' },
        { name: 'Zultys for Terrell', path: '/terrell-tx-zultys-phone-systems' },
        { name: 'Zultys for Prosper', path: '/prosper-tx-zultys-phone-systems' },
        { name: 'Zultys for Murphy', path: '/murphy-tx-zultys-voip' },
        { name: 'Zultys for Sachse', path: '/sachse-tx-zultys-dealer' },
        { name: 'Zultys for Seagoville', path: '/seagoville-tx-zultys-phone-systems' },
        { name: 'Zultys for Balch Springs', path: '/balch-springs-tx-zultys-voip' },
        { name: 'Zultys for Celina', path: '/celina-tx-zultys-phone-systems' },
        { name: 'Zultys for Princeton', path: '/princeton-tx-zultys-phone-systems' },
        { name: 'Zultys for Anna', path: '/anna-tx-zultys-phone-systems' },
        { name: 'Zultys for Melissa', path: '/melissa-tx-zultys-phone-systems' },
        { name: 'Zultys for Royse City', path: '/royse-city-tx-zultys-phone-systems' },
        { name: 'Zultys for Fate', path: '/fate-tx-zultys-phone-systems' },
        { name: 'Zultys for Heath', path: '/heath-tx-zultys-phone-systems' },
        { name: 'Zultys for Sunnyvale', path: '/sunnyvale-tx-zultys-phone-systems' },
        { name: 'Zultys for Crandall', path: '/crandall-tx-zultys-phone-systems' },
        { name: 'Zultys for Lavon', path: '/lavon-tx-zultys-phone-systems' },
        { name: 'Zultys for Red Oak', path: '/red-oak-tx-zultys-phone-systems' },
        { name: 'Zultys for Ovilla', path: '/ovilla-tx-zultys-phone-systems' },
        { name: 'Zultys for Glenn Heights', path: '/glenn-heights-tx-zultys-phone-systems' },
        { name: 'Zultys for Hutchins', path: '/hutchins-tx-zultys-phone-systems' },
        { name: 'Zultys for Wilmer', path: '/wilmer-tx-zultys-phone-systems' },
        { name: 'Zultys for Kaufman', path: '/kaufman-tx-zultys-phone-systems' },
        { name: 'Zultys for Pilot Point', path: '/pilot-point-tx-zultys-phone-systems' },
        { name: 'Zultys for Sanger', path: '/sanger-tx-zultys-phone-systems' },
        { name: 'Zultys for Aubrey', path: '/aubrey-tx-zultys-phone-systems' },
        { name: 'Zultys for Alvarado', path: '/alvarado-tx-zultys-phone-systems' },
        { name: 'Zultys for Decatur', path: '/decatur-tx-zultys-phone-systems' },
        { name: 'Zultys for Bridgeport', path: '/bridgeport-tx-zultys-phone-systems' },
        { name: 'Zultys for Justin', path: '/justin-tx-zultys-phone-systems' },
        { name: 'Zultys for Krum', path: '/krum-tx-zultys-phone-systems' },
        { name: 'Zultys for Ponder', path: '/ponder-tx-zultys-phone-systems' },
        { name: 'Zultys for Trophy Club', path: '/trophy-club-tx-zultys-phone-systems' },
        { name: 'Zultys for Roanoke', path: '/roanoke-tx-zultys-phone-systems' },
        { name: 'Zultys for Argyle', path: '/argyle-tx-zultys-phone-systems' },
        { name: 'Zultys for Kennedale', path: '/kennedale-tx-zultys-phone-systems' },
        { name: 'Zultys for Forest Hill', path: '/forest-hill-tx-zultys-phone-systems' },
        { name: 'Zultys for Van Alstyne', path: '/van-alstyne-tx-zultys-phone-systems' },
        { name: 'Zultys for Leonard', path: '/leonard-tx-zultys-phone-systems' },
        { name: 'Zultys for Farmersville', path: '/farmersville-tx-zultys-phone-systems' },
        { name: 'Zultys for Howe', path: '/howe-tx-zultys-phone-systems' },
        { name: 'Zultys for Whitewright', path: '/whitewright-tx-zultys-phone-systems' },
        { name: 'Zultys for Gunter', path: '/gunter-tx-zultys-phone-systems' },
        { name: 'Zultys for Collinsville', path: '/collinsville-tx-zultys-phone-systems' },
        { name: 'Zultys for Tioga', path: '/tioga-tx-zultys-phone-systems' },
        { name: 'Zultys for Tom Bean', path: '/tom-bean-tx-zultys-phone-systems' },
        { name: 'Zultys for Trenton', path: '/trenton-tx-zultys-phone-systems' },
        { name: 'Zultys for Savoy', path: '/savoy-tx-zultys-phone-systems' },
        { name: 'Zultys for Bells', path: '/bells-tx-zultys-phone-systems' },
        { name: 'Zultys for Blue Ridge', path: '/blue-ridge-tx-zultys-phone-systems' },
        { name: 'Zultys for Ector', path: '/ector-tx-zultys-phone-systems' },
        { name: 'Zultys for Ravenna', path: '/ravenna-tx-zultys-phone-systems' },
        { name: 'Zultys for Bonham', path: '/bonham-tx-zultys-phone-systems' },
        { name: 'Zultys for Honey Grove', path: '/honey-grove-tx-zultys-phone-systems' },
        { name: 'Zultys for Ladonia', path: '/ladonia-tx-zultys-phone-systems' },
        { name: 'Zultys for Windom', path: '/windom-tx-zultys-phone-systems' },
        { name: 'Zultys for Dodd City', path: '/dodd-city-tx-zultys-phone-systems' },
        { name: 'Zultys for Merit', path: '/merit-tx-zultys-phone-systems' },
        { name: 'Zultys for Celeste', path: '/celeste-tx-zultys-phone-systems' },
        { name: 'Zultys for Wolfe City', path: '/wolfe-city-tx-zultys-phone-systems' },
        { name: 'Zultys for Caddo Mills', path: '/caddo-mills-tx-zultys-phone-systems' },
        { name: 'Zultys for Nevada', path: '/nevada-tx-zultys-phone-systems' },
        { name: 'Zultys for Josephine', path: '/josephine-tx-zultys-phone-systems' },
        { name: 'Zultys for Bailey', path: '/bailey-tx-zultys-phone-systems' },
        { name: 'Zultys for Randolph', path: '/randolph-tx-zultys-phone-systems' },
        { name: 'Zultys for Telephone', path: '/telephone-tx-zultys-phone-systems' },
        { name: 'Zultys for Ivanhoe', path: '/ivanhoe-tx-zultys-phone-systems' },
        { name: 'Zultys for Gober', path: '/gober-tx-zultys-phone-systems' },
        { name: 'Zultys for Springtown', path: '/springtown-tx-zultys-phone-systems' },
        { name: 'Zultys for Granbury', path: '/granbury-tx-zultys-phone-systems' },
        { name: 'Zultys for Glen Rose', path: '/glen-rose-tx-zultys-phone-systems' },
        { name: 'Zultys for Godley', path: '/godley-tx-zultys-phone-systems' },
        { name: 'Zultys for Grandview', path: '/grandview-tx-zultys-phone-systems' },
        { name: 'Zultys for Venus', path: '/venus-tx-zultys-phone-systems' },
        { name: 'Zultys for Maypearl', path: '/maypearl-tx-zultys-phone-systems' },
        { name: 'Zultys for Italy', path: '/italy-tx-zultys-phone-systems' },
        { name: 'Zultys for Milford', path: '/milford-tx-zultys-phone-systems' },
        { name: 'Zultys for Palmer', path: '/palmer-tx-zultys-phone-systems' },
        { name: 'Zultys for Hudson Oaks', path: '/hudson-oaks-tx-zultys-phone-systems' },
        { name: 'Zultys for Willow Park', path: '/willow-park-tx-zultys-phone-systems' },
        { name: 'Zultys for Everman', path: '/everman-tx-zultys-phone-systems' },
        { name: 'Zultys for Pantego', path: '/pantego-tx-zultys-phone-systems' },
        { name: 'Zultys for Dalworthington Gardens', path: '/dalworthington-gardens-tx-zultys-phone-systems' },
        { name: 'Zultys for Westover Hills', path: '/westover-hills-tx-zultys-phone-systems' },
        { name: 'Zultys for Edgecliff Village', path: '/edgecliff-village-tx-zultys-phone-systems' },
        { name: 'Zultys for Richland Hills', path: '/richland-hills-tx-zultys-phone-systems' },
        { name: 'Zultys for Sansom Park', path: '/sansom-park-tx-zultys-phone-systems' },
        { name: 'Zultys for Reno', path: '/reno-tx-zultys-phone-systems' },
        { name: 'Zultys for Addison', path: '/addison-tx-zultys-phone-systems' },
        { name: 'Zultys for Aledo', path: '/aledo-tx-zultys-phone-systems' },
        { name: 'Zultys for Azle', path: '/azle-tx-zultys-phone-systems' },
        { name: 'Zultys for Bartonville', path: '/bartonville-tx-zultys-phone-systems' },
        { name: 'Zultys for Bedford', path: '/bedford-zultys-solutions' },
        { name: 'Zultys for Benbrook', path: '/benbrook-phone-systems' },
        { name: 'Zultys for Blue Mound', path: '/blue-mound-tx-zultys-phone-systems' },
        { name: 'Zultys for Bowie', path: '/bowie-tx-zultys-phone-systems' },
        { name: 'Zultys for Boyd', path: '/boyd-tx-zultys-phone-systems' },
        { name: 'Zultys for Brock', path: '/brock-tx-zultys-phone-systems' },
        { name: 'Zultys for Crowley', path: '/crowley-tx-zultys-phone-systems' },
        { name: 'Zultys for Haslet', path: '/haslet-tx-zultys-phone-systems' },
        { name: 'Zultys for Joshua', path: '/joshua-tx-zultys-phone-systems' },
        { name: 'Zultys for Lake Worth', path: '/lake-worth-tx-zultys-phone-systems' },
        { name: 'Zultys for Lakeside', path: '/lakeside-tx-zultys-phone-systems' },
        { name: 'Zultys for Euless', path: '/euless-business-phones' },
        { name: 'Zultys for North Richland Hills', path: '/north-richland-hills-zultys' },
        { name: 'Zultys for Flower Mound', path: '/flower-mound-business-phones' },
        { name: 'Zultys for Colleyville', path: '/colleyville-voip' },
        { name: 'Zultys for Keller', path: '/keller-zultys-dealer' },
        { name: 'Zultys for Saginaw', path: '/saginaw-business-communications' },
        { name: 'Zultys for Haltom City', path: '/haltom-city-zultys' },
        { name: 'Zultys for Watauga', path: '/watauga-voip-solutions' },
        { name: 'Zultys for Westworth Village', path: '/westworth-village-zultys' },
        { name: 'Zultys for White Settlement', path: '/white-settlement-business-phones' },
        { name: 'Zultys for River Oaks', path: '/river-oaks-zultys' },
      ],
    },
    {
      title: 'Resources & Trust',
      icon: Shield,
      links: [
        { name: 'Zultys vs RingCentral', path: '/zultys-vs-ringcentral' },
        { name: 'Zultys vs 8x8', path: '/zultys-vs-8x8' },
        { name: 'Zultys vs Microsoft Teams', path: '/zultys-vs-microsoft-teams' },
        { name: 'Zultys vs Vonage', path: '/zultys-vs-vonage' },
        { name: 'Zultys vs Avaya', path: '/zultys-vs-avaya' },
        { name: 'Zultys vs Cisco Webex', path: '/zultys-vs-cisco-webex' },
        { name: 'Zultys vs Mitel', path: '/zultys-vs-mitel' },
        { name: 'Zultys vs Zoom Phone', path: '/zultys-vs-zoom-phone' },
        { name: 'Zultys vs GoToConnect', path: '/zultys-vs-gotoconnect' },
        { name: 'Zultys vs Nextiva', path: '/zultys-vs-nextiva' },
        { name: 'Zultys vs Dialpad', path: '/zultys-vs-dialpad' },
        { name: 'Zultys vs Intermedia', path: '/zultys-vs-intermedia' },
        { name: 'Zultys vs Ooma', path: '/zultys-vs-ooma-office' },
        { name: 'Zultys vs Comcast', path: '/zultys-vs-comcast-business' },
        { name: 'Zultys vs Spectrum', path: '/zultys-vs-spectrum-business' },
        { name: 'Zultys vs AT&T', path: '/zultys-vs-att-business' },
        { name: 'Comprehensive FAQ', path: '/zultys-faq' },
        { name: 'HIPAA Compliance', path: '/hipaa-compliant-voip' },
        { name: 'Pricing & Quotes', path: '/zultys-pricing' },
        { name: 'Free VoIP Site Audit', path: '/free-voip-site-audit' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'VoIP Glossary', path: '/voip-glossary' },
        { name: 'Our Team', path: '/our-team' },
        { name: 'Certifications & Awards', path: '/certifications-awards' },
        { name: 'User Guides & Manuals', path: '/zultys-user-guides' },
        { name: 'Zultys Migration Guide', path: '/zultys-migration-guide-dfw' },
        { name: 'CRM Integration Guide', path: '/zultys-crm-integration-guide' },
        { name: 'Remote Work Solutions', path: '/remote-work-solutions' },
        { name: 'VoIP Security & Encryption', path: '/voip-security-encryption' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
      ],
    },
    {
      title: 'Zultys Insights',
      icon: Mail,
      links: [
        { name: 'Blog Home', path: '/blog' },
        { name: 'Best Choice for DFW', path: '/blog/why-zultys-is-the-best-choice-for-dfw-small-businesses' },
        { name: 'Cloud vs On-Premise', path: '/blog/on-premise-vs-cloud-which-zultys-deployment-is-right-for-you' },
        { name: 'Network Optimization', path: '/blog/how-to-optimize-your-office-network-for-voip-performance' },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Map className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Site Map</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Dallas Fort Worth Zultys Sitemap
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Find exactly what you're looking for. Use the links below to navigate through our 
              comprehensive Zultys product and solution offerings.
            </p>
          </div>

          <div className="prose prose-lg text-gray-600 max-w-none mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Navigating Your Zultys Communication Journey in DFW</h2>
            <p>
              At DFW Business Communications, we understand that choosing the right communication system is a critical decision for your North Texas organization. Our sitemap is designed to help you easily find the information you need about <strong>Zultys products and solutions in Fort Worth</strong>. Whether you're exploring the latest MX series IP PBX systems, looking for specialized industry solutions, or seeking expert technical support in Dallas, our comprehensive site structure ensures you can find the right resources quickly.
            </p>
            <p>
              From small business phone systems to large-scale enterprise deployments, we provide the expertise and local support that DFW businesses demand. Use the categorized links below to explore our offerings and learn how Zultys technology can transform your business communications across the entire Dallas-Fort Worth metroplex.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Value of a Comprehensive Sitemap for DFW SEO</h3>
            <p>
              A well-structured sitemap is more than just a navigation tool; it's a critical component of <strong>DFW SEO strategy</strong>. By providing search engines with a clear map of our website's content, we ensure that every page related to Zultys products and solutions in North Texas is indexed and easily discoverable. This visibility is essential for DFW Business Communications to reach organizations in Dallas and Fort Worth that are searching for reliable and professional business phone systems.
            </p>
            <p>
              Our sitemap helps search engines understand the relationships between our various offerings, from the core Zultys MX series to specialized industry solutions for healthcare and legal professionals in North Texas. This structural clarity improves our overall search ranking, making it easier for DFW business owners to find the expert Zultys support and guidance they need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {sitemapData.filter(section => !['Resources & Trust', 'Service Areas'].includes(section.title)).map((section, index) => (
              <Card key={index} className="p-8 border-gray-200 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-4">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link 
                        to={link.path} 
                        className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Service Areas - Full Width Section */}
          {sitemapData.filter(section => section.title === 'Service Areas').map((section, index) => (
            <Card key={index} className="p-8 lg:p-12 border-gray-200 shadow-sm mb-12">
              <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-6">
                <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                  <section.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{section.title}</h2>
                  <p className="text-gray-500 mt-1">Expert Zultys support and installation across the entire DFW Metroplex.</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      to={link.path} 
                      className="group flex items-start gap-2 text-gray-600 hover:text-blue-600 transition-all duration-200"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-[15px] leading-tight font-medium">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}

          {/* Resources & Trust - Full Width Section */}
          {sitemapData.filter(section => section.title === 'Resources & Trust').map((section, index) => (
            <Card key={index} className="p-8 lg:p-12 border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-6">
                <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                  <section.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{section.title}</h2>
                  <p className="text-gray-500 mt-1">Comprehensive guides, competitor comparisons, and trust resources.</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      to={link.path} 
                      className="group flex items-start gap-2 text-gray-600 hover:text-blue-600 transition-all duration-200"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-[15px] leading-tight font-medium">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}

          <div className="mt-20 prose prose-lg text-gray-600 max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Zultys Solutions for Every North Texas Business</h2>
            <p>
              Our sitemap reflects our commitment to providing a wide range of <strong>Zultys solutions for DFW organizations</strong>. We cover everything from initial system design and professional installation to ongoing user training and 24/7 technical support. By organizing our content into logical categories, we aim to provide a seamless browsing experience for our North Texas clients, helping them discover the full potential of the Zultys unified communications platform.
            </p>
            <p>
              Whether you're interested in cloud-based services, on-premise appliances, or flexible hybrid solutions, DFW Business Communications has the knowledge and experience to guide you. We are proud to be your local Zultys partner in Fort Worth, serving businesses of all sizes across the Dallas-Fort Worth area with the technology that keeps them connected and productive.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Finding Specialized Zultys Resources for North Texas Industries</h3>
            <p>
              For organizations in specific sectors, our sitemap provides a direct path to <strong>Specialized Zultys Resources for North Texas Industries</strong>. We have dedicated pages for healthcare, legal, real estate, and education sectors in the DFW area, each detailing how Zultys technology meets the unique communication and compliance needs of these industries. By using our sitemap, DFW professionals can quickly find the information most relevant to their specific business environment.
            </p>
            <p>
              Whether you're a medical clinic in Fort Worth needing secure communication or a law firm in Dallas requiring advanced call handling, our categorized links guide you to the right solution. DFW Business Communications is committed to providing industry-specific expertise that helps North Texas organizations thrive through better communication.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Navigating the Zultys Product Lifecycle in Dallas-Fort Worth</h3>
            <p>
              Our sitemap also helps you <strong>Navigate the Zultys Product Lifecycle</strong>, from initial research and selection to professional installation and ongoing support. We provide detailed information on the latest Zultys ZIP phones, MX series appliances, and advanced software tools like ZAC and MXmobile. By following the links in our sitemap, DFW businesses can understand the full range of Zultys technology and how it can be integrated into their North Texas operations.
            </p>
            <p>
              We also include resources for system administrators and IT teams in Dallas and Fort Worth, providing the technical information needed to manage and optimize a Zultys environment. DFW Business Communications is your partner throughout the entire lifecycle of your communication system, ensuring you get the most value from your investment in North Texas.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Roadmap to Communication Success in DFW</h3>
            <p>
              Think of our sitemap as <strong>Your Roadmap to Communication Success in DFW</strong>. It provides a clear and organized view of the many ways DFW Business Communications can help your North Texas organization stay connected. From exploring new technologies to seeking expert local support, every link is a step toward a more efficient and productive communication environment for your Dallas or Fort Worth business.
            </p>
            <p>
              We invite you to explore our website and discover the many Zultys solutions we offer. If you have any questions or need personalized guidance, our local Fort Worth team is always just a phone call away. Let DFW Business Communications be your guide to the future of business communications in North Texas.
            </p>
          </div>

          <div className="mt-20 p-12 bg-blue-900 rounded-3xl text-white text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Need Immediate Assistance?</h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Our Fort Worth based team is ready to help you find the perfect Zultys solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100"
                onClick={openQuote}
              >
                Contact Us Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:8172312962">Call 817-231-2962</a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
