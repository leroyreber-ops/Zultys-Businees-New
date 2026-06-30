import { useState } from 'react';
import { HashLink as Link } from './HashLink';
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import { ZultysLogo } from './ZultysLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (section: string) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const solutionsPages = [
    { name: 'Business Phone Systems', path: '/fort-worth-zultys-business-phone-systems' },
    { name: 'VoIP Phone Systems', path: '/fort-worth-zultys-voip-phone-system' },
    { name: 'Cloud Phone Systems', path: '/fort-worth-zultys-cloud-phone-system' },
    { name: 'Small Business VoIP', path: '/fort-worth-zultys-phone-system-small-business' },
    { name: 'Video Conferencing', path: '/fort-worth-zultys-mxconference' },
    { name: 'Unified Communications', path: '/fort-worth-zultys-zac' },
    { name: 'Contact Center', path: '/fort-worth-zultys-contact-center' },
    { name: 'Cloud Services', path: '/fort-worth-zultys-cloud-services' },
  ];

  const industryPages = [
    { name: 'Healthcare', path: '/fort-worth-zultys-healthcare' },
    { name: 'Legal Firms', path: '/zultys-for-legal-firms' },
    { name: 'Financial Services', path: '/zultys-for-financial-services' },
    { name: 'Manufacturing & Logistics', path: '/zultys-for-manufacturing-logistics' },
    { name: 'Real Estate', path: '/zultys-for-real-estate' },
    { name: 'Education', path: '/zultys-for-education' },
    { name: 'Retail & Automotive', path: '/zultys-for-retail' },
    { name: 'Hospitality', path: '/zultys-for-hospitality' },
    { name: 'Non-Profits', path: '/zultys-for-non-profits' },
    { name: 'Enterprise', path: '/fort-worth-zultys-enterprise' },
  ];

  const comparisonPages = [
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
    { name: 'Zultys vs Ooma Office', path: '/zultys-vs-ooma-office' },
    { name: 'Zultys vs Comcast Business', path: '/zultys-vs-comcast-business' },
    { name: 'Zultys vs Spectrum Business', path: '/zultys-vs-spectrum-business' },
    { name: 'Zultys vs AT&T Business', path: '/zultys-vs-att-business' },
    { name: 'View All Comparisons', path: '/zultys-vs-competitors' },
  ];

  const resourcePages = [
    { name: 'Comprehensive FAQ', path: '/zultys-faq' },
    { name: 'HIPAA Compliance', path: '/hipaa-compliant-voip' },
    { name: 'Zultys Pricing', path: '/zultys-pricing' },
    { name: 'Free Site Audit', path: '/free-voip-site-audit' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'VoIP Glossary', path: '/voip-glossary' },
    { name: 'Our Team', path: '/our-team' },
    { name: 'Certifications', path: '/certifications-awards' },
    { name: 'User Guides', path: '/zultys-user-guides' },
    { name: 'Migration Guide', path: '/zultys-migration-guide-dfw' },
    { name: 'CRM Integration', path: '/zultys-crm-integration-guide' },
    { name: 'Remote Solutions', path: '/remote-work-solutions' },
    { name: 'VoIP Security', path: '/voip-security-encryption' },
    { name: 'Zultys Blog', path: '/blog' },
  ];

  const locationPages = [
    { name: 'Dallas', path: '/dallas' },
    { name: 'Fort Worth', path: '/fort-worth' },
    { name: 'Arlington', path: '/arlington' },
    { name: 'Plano', path: '/plano' },
    { name: 'Irving', path: '/irving' },
    { name: 'Garland', path: '/garland' },
    { name: 'Frisco', path: '/frisco' },
    { name: 'McKinney', path: '/mckinney' },
    { name: 'Grand Prairie', path: '/grand-prairie' },
    { name: 'Mesquite', path: '/mesquite' },
    { name: 'Carrollton', path: '/carrollton' },
    { name: 'Denton', path: '/denton' },
    { name: 'Richardson', path: '/richardson' },
    { name: 'Lewisville', path: '/lewisville' },
    { name: 'Allen', path: '/allen' },
    { name: 'Flower Mound', path: '/flower-mound' },
    { name: 'Mansfield', path: '/mansfield' },
    { name: 'Rowlett', path: '/rowlett' },
    { name: 'Euless', path: '/euless' },
    { name: 'Bedford', path: '/bedford' },
    { name: 'Hurst', path: '/hurst' },
    { name: 'Grapevine', path: '/grapevine' },
    { name: 'Keller', path: '/keller' },
    { name: 'Coppell', path: '/coppell' },
    { name: 'The Colony', path: '/the-colony' },
    { name: 'Southlake', path: '/southlake' },
    { name: 'Watauga', path: '/watauga' },
    { name: 'Colleyville', path: '/colleyville' },
    { name: 'North Richland Hills', path: '/north-richland-hills' },
    { name: 'Cedar Hill', path: '/cedar-hill' },
    { name: 'DeSoto', path: '/desoto' },
    { name: 'Duncanville', path: '/duncanville' },
    { name: 'Lancaster', path: '/lancaster' },
    { name: 'Little Elm', path: '/little-elm' },
    { name: 'Wylie', path: '/wylie' },
    { name: 'Rockwall', path: '/rockwall' },
    { name: 'Forney', path: '/forney' },
    { name: 'Midlothian', path: '/midlothian' },
    { name: 'Waxahachie', path: '/waxahachie' },
    { name: 'Ennis', path: '/ennis' },
    { name: 'Cleburne', path: '/cleburne' },
    { name: 'Weatherford', path: '/weatherford' },
    { name: 'Burleson', path: '/burleson' },
    { name: 'Terrell', path: '/terrell' },
    { name: 'Prosper', path: '/prosper' },
    { name: 'Murphy', path: '/murphy' },
    { name: 'Sachse', path: '/sachse' },
    { name: 'Seagoville', path: '/seagoville' },
    { name: 'Balch Springs', path: '/balch-springs' },
    { name: 'Celina', path: '/celina' },
    { name: 'Princeton', path: '/princeton' },
    { name: 'Anna', path: '/anna' },
    { name: 'Melissa', path: '/melissa' },
    { name: 'Royse City', path: '/royse-city' },
    { name: 'Fate', path: '/fate' },
    { name: 'Heath', path: '/heath' },
    { name: 'Sunnyvale', path: '/sunnyvale' },
    { name: 'Crandall', path: '/crandall' },
    { name: 'Lavon', path: '/lavon' },
    { name: 'Red Oak', path: '/red-oak' },
    { name: 'Ovilla', path: '/ovilla' },
    { name: 'Glenn Heights', path: '/glenn-heights' },
    { name: 'Hutchins', path: '/hutchins' },
    { name: 'Wilmer', path: '/wilmer' },
    { name: 'Kaufman', path: '/kaufman' },
    { name: 'Pilot Point', path: '/pilot-point' },
    { name: 'Sanger', path: '/sanger' },
    { name: 'Aubrey', path: '/aubrey' },
    { name: 'Alvarado', path: '/alvarado' },
    { name: 'Decatur', path: '/decatur' },
    { name: 'Bridgeport', path: '/bridgeport' },
    { name: 'Justin', path: '/justin' },
    { name: 'Krum', path: '/krum' },
    { name: 'Ponder', path: '/ponder' },
    { name: 'Trophy Club', path: '/trophy-club' },
    { name: 'Roanoke', path: '/roanoke' },
    { name: 'Argyle', path: '/argyle' },
    { name: 'Kennedale', path: '/kennedale' },
    { name: 'Forest Hill', path: '/forest-hill' },
  ];

  return (
    <footer className="bg-charcoal text-gray-300 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-black text-white mb-6">
              Dallas Fort Worth <span className="text-zultys-green">Zultys</span>
            </h3>
            
            {/* Authorized Zultys Partner Badge */}
            <div className="mb-6 inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <ZultysLogo className="h-8" />
              <div className="border-l border-white/20 pl-3">
                <div className="text-[10px] text-zultys-green font-black tracking-widest uppercase">AUTHORIZED</div>
                <div className="text-xs text-white font-bold">PARTNER</div>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-zultys-green" />
                <a href="tel:817-231-2962" className="hover:text-zultys-green transition-colors font-medium">
                  817-231-2962
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-zultys-green" />
                <a href="mailto:info@dallasfortworthzultys.com" className="hover:text-zultys-green transition-colors font-medium">
                  info@dallasfortworthzultys.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-zultys-green" />
                <span className="font-medium">Fort Worth, Texas</span>
              </div>
            </div>
          </div>

          {/* Solutions Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown('solutions')}
              className="flex items-center justify-between w-full font-bold text-white mb-6 text-base hover:text-zultys-green transition-colors"
            >
              Solutions
              <ChevronDown className={`h-5 w-5 transition-transform ${openDropdown === 'solutions' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'solutions' && (
              <ul className="space-y-3 text-sm max-h-60 overflow-y-auto pr-2">
                {solutionsPages.map((page, index) => (
                  <li key={index}>
                    <Link to={page.path} className="hover:text-zultys-green transition-colors block py-1">
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Industries Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown('industries')}
              className="flex items-center justify-between w-full font-bold text-white mb-6 text-base hover:text-zultys-green transition-colors"
            >
              Industries
              <ChevronDown className={`h-5 w-5 transition-transform ${openDropdown === 'industries' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'industries' && (
              <ul className="space-y-3 text-sm max-h-60 overflow-y-auto pr-2">
                {industryPages.map((page, index) => (
                  <li key={index}>
                    <Link to={page.path} className="hover:text-zultys-green transition-colors block py-1">
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Comparisons Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown('comparisons')}
              className="flex items-center justify-between w-full font-bold text-white mb-6 text-base hover:text-zultys-green transition-colors"
            >
              Comparisons
              <ChevronDown className={`h-5 w-5 transition-transform ${openDropdown === 'comparisons' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'comparisons' && (
              <ul className="space-y-3 text-sm max-h-60 overflow-y-auto pr-2">
                {comparisonPages.map((page, index) => (
                  <li key={index}>
                    <Link to={page.path} className="hover:text-zultys-green transition-colors block py-1">
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Resources Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown('resources')}
              className="flex items-center justify-between w-full font-bold text-white mb-6 text-base hover:text-zultys-green transition-colors"
            >
              Resources
              <ChevronDown className={`h-5 w-5 transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'resources' && (
              <ul className="space-y-3 text-sm max-h-60 overflow-y-auto pr-2">
                {resourcePages.map((page, index) => (
                  <li key={index}>
                    <Link to={page.path} className="hover:text-zultys-green transition-colors block py-1">
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* DFW Locations Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown('locations')}
              className="flex items-center justify-between w-full font-bold text-white mb-6 text-base hover:text-zultys-green transition-colors"
            >
              DFW Locations
              <ChevronDown className={`h-5 w-5 transition-transform ${openDropdown === 'locations' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'locations' && (
              <ul className="space-y-3 text-sm max-h-60 overflow-y-auto pr-2">
                {locationPages.map((page, index) => (
                  <li key={index}>
                    <Link to={page.path} className="hover:text-zultys-green transition-colors block py-1">
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center text-sm">
              <p>© {currentYear} DFW Business Communications. All rights reserved.</p>
              <div className="flex gap-6 text-sm">
                <Link to="/privacy" className="hover:text-zultys-green transition-colors">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-zultys-green transition-colors">
                  Terms
                </Link>
                <Link to="/sitemap" className="hover:text-zultys-green transition-colors font-bold">
                  Sitemap
                </Link>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-white/5 p-2 rounded-lg text-gray-400 hover:text-zultys-green hover:bg-white/10 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/5 p-2 rounded-lg text-gray-400 hover:text-zultys-green hover:bg-white/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/5 p-2 rounded-lg text-gray-400 hover:text-zultys-green hover:bg-white/10 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
