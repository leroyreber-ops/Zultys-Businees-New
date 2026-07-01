import { HashLink as Link } from './HashLink';
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter, ExternalLink, Globe, Shield, Cpu, FileText } from 'lucide-react';
import { ZultysLogo } from './ZultysLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-slate-300 border-t border-white/5 pt-16 pb-12 relative overflow-hidden">
      {/* Background soft glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zultys-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zultys-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Three-Column Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 pb-12 border-b border-white/10">
          
          {/* Column 1: About Zultys DFW */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white uppercase tracking-wider border-l-4 border-zultys-green pl-3">
                About Zultys DFW
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We are the premier certified partner and authorized dealer for Zultys unified communications in North Texas. Serving Dallas, Fort Worth, and the entire DFW Metroplex with enterprise-grade VoIP phone systems, certified local engineering, and direct hands-on support.
              </p>
            </div>

            {/* Authorized Partner Badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl">
              <ZultysLogo className="h-7" />
              <div className="border-l border-white/20 pl-3">
                <div className="text-[9px] text-zultys-green font-black tracking-widest uppercase">AUTHORIZED</div>
                <div className="text-xs text-white font-bold tracking-wide">PARTNER</div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 text-sm pt-2">
              <a 
                href="tel:817-231-2962" 
                className="inline-flex items-center justify-center gap-2.5 bg-zultys-green hover:bg-zultys-green/90 text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-zultys-green/20 hover:scale-[1.03] active:scale-95 transition-all w-full sm:w-auto"
              >
                <Phone className="h-4 w-4 animate-pulse" />
                <span>Call 817-231-2962</span>
              </a>
              
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="h-4 w-4 text-zultys-green shrink-0" />
                  <a href="mailto:info@dallasfortworthzultys.com" className="hover:text-zultys-green transition-colors font-medium">
                    info@dallasfortworthzultys.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin className="h-4 w-4 text-zultys-green shrink-0" />
                  <span className="font-medium">Fort Worth, Texas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-white uppercase tracking-wider border-l-4 border-zultys-green pl-3">
              Quick Links
            </h3>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-medium">
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Solutions</div>
                <ul className="space-y-2">
                  <li><Link to="/products" className="text-slate-400 hover:text-zultys-green transition-colors">Products & VoIP</Link></li>
                  <li><Link to="/solutions" className="text-slate-400 hover:text-zultys-green transition-colors">Business Solutions</Link></li>
                  <li><Link to="/zultys-pricing" className="text-slate-400 hover:text-zultys-green transition-colors">Zultys Pricing</Link></li>
                  <li><Link to="/hipaa-compliant-voip" className="text-slate-400 hover:text-zultys-green transition-colors">HIPAA VoIP</Link></li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Resources</div>
                <ul className="space-y-2">
                  <li><Link to="/zultys-faq" className="text-slate-400 hover:text-zultys-green transition-colors">Help & FAQ</Link></li>
                  <li><Link to="/case-studies" className="text-slate-400 hover:text-zultys-green transition-colors">Case Studies</Link></li>
                  <li><Link to="/blog" className="text-slate-400 hover:text-zultys-green transition-colors">Zultys Blog</Link></li>
                  <li><Link to="/sitemap.html" className="text-slate-400 hover:text-zultys-green transition-colors">HTML Sitemap</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-3">
              <Link 
                to="/free-voip-site-audit" 
                className="text-xs font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/10 transition-colors inline-flex items-center gap-1.5"
              >
                <Cpu className="h-3 w-3 text-zultys-green" />
                Free Site Audit
              </Link>
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/10 transition-colors inline-flex items-center gap-1.5"
              >
                <FileText className="h-3 w-3 text-zultys-gold" />
                XML Sitemap
              </a>
            </div>
          </div>

          {/* Column 3: Other Business Needs */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-white uppercase tracking-wider border-l-4 border-zultys-green pl-3">
              Other Business Needs
            </h3>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Looking for support with other essential technology or communications infrastructure? Our trusted local network provides comprehensive professional services including:
            </p>

            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-zultys-green shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Custom Website Design</span>
                  <span className="text-slate-400 text-xs">High-converting designs and rental websites built to rank.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-zultys-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Security & Surveillance</span>
                  <span className="text-slate-400 text-xs">Wholesale commercial security cameras, access control, & cabling.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Cpu className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Structured Voice & Data Cabling</span>
                  <span className="text-slate-400 text-xs">Professional Ethernet, fiber optic running, and rack cleanups.</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Visually Distinct Partner Resources Highlight Area */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-zultys-green/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-widest text-zultys-green flex items-center gap-2">
                Partner Resources & Sister Sites
              </h4>
              <p className="text-xs text-slate-400 max-w-2xl">
                Explore recommended services for professional business growth, physical security integrations, custom web development, and digital communications.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold shrink-0">
              <a 
                href="https://DallasFortworthwebsitedesigners.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-slate-300 hover:text-zultys-green transition-colors bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/5 hover:border-white/20"
              >
                <span>DFW Website Designers</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
              <a 
                href="https://DallasFortworthwebsitedesigns.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-slate-300 hover:text-zultys-green transition-colors bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/5 hover:border-white/20"
              >
                <span>DFW Website Designs</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
              <a 
                href="https://FortWorthwebsiterental.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-slate-300 hover:text-zultys-green transition-colors bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/5 hover:border-white/20"
              >
                <span>Fort Worth Website Rental</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
              <a 
                href="https://DFWwholesalesecurity.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-slate-300 hover:text-zultys-green transition-colors bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/5 hover:border-white/20"
              >
                <span>DFW Wholesale Security</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-slate-400">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
            <p>© {currentYear} DFW Business Communications. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-zultys-green transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-zultys-green transition-colors">
                Terms
              </Link>
            </div>
          </div>
          
          <div className="flex gap-4">
            <a
              href="#"
              className="bg-white/5 p-2 rounded-lg text-slate-400 hover:text-zultys-green hover:bg-white/10 transition-all"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="bg-white/5 p-2 rounded-lg text-slate-400 hover:text-zultys-green hover:bg-white/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="bg-white/5 p-2 rounded-lg text-slate-400 hover:text-zultys-green hover:bg-white/10 transition-all"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
