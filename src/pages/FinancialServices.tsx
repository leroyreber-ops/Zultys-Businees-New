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
  Landmark, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  Lock, 
  BarChart3, 
  ShieldCheck, 
  Phone, 
  MessageSquare,
  Globe
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function FinancialServices() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys for Financial Services | Secure Banking VoIP DFW | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Secure, compliant, and highly reliable communication solutions for DFW financial institutions. Discover how Zultys empowers banking and investment firms with advanced security.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'banking phone system Dallas, financial services VoIP Fort Worth, secure communication DFW, Zultys for finance, investment firm technology North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-for-financial-services');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys VoIP for Financial Services',
      description: 'Specialized business communication solutions for financial institutions in Dallas-Fort Worth.',
      provider: {
        '@type': 'Organization',
        name: 'DFW Business Communications'
      },
      areaServed: 'Dallas-Fort Worth Metroplex'
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 opacity-20">
            <img src={HERO_BACKGROUND} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-emerald-500/30">
              <Landmark className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Financial Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Secure Communications <br />
              <span className="text-emerald-400">for DFW Financial Firms.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              In the financial sector, security and reliability are non-negotiable. 
              Zultys delivers a hardened communication platform designed to protect 
              sensitive data and ensure continuous connectivity for DFW firms.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Request a Security Audit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 text-xl px-10 py-8 font-black rounded-xl backdrop-blur-md"
                asChild
              >
                <a href="tel:817-231-2962">Call 817-231-2962</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Financial Features Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Built for Financial Compliance</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">Zultys provides specialized features that meet the strict regulatory requirements of the financial industry.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: 'Enterprise Encryption', desc: 'SRTP and TLS encryption protect all voice and data traffic from interception.', icon: Lock },
                { title: 'Local Survivability', desc: 'Ensure your firm stays connected during internet outages with MX appliance survivability.', icon: ShieldCheck },
                { title: 'Call Recording & Audit', desc: 'Securely record and archive calls for compliance and quality assurance monitoring.', icon: BarChart3 },
                { title: 'Multi-Site Connectivity', desc: 'Seamlessly link multiple branches across DFW with a single, unified communication platform.', icon: Globe },
                { title: 'Secure Mobile Access', desc: 'Empower advisors to work securely from anywhere with the MXmobile app.', icon: Users },
                { title: '24/7 Local Support', desc: 'Get rapid, on-site support from our Fort Worth team whenever your firm needs it.', icon: Shield }
              ].map((item, i) => (
                <Card key={i} className="p-10 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col items-center text-center group">
                  <div className="p-4 bg-emerald-50 rounded-2xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                    <item.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why DFW Financial Firms Trust Zultys</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    We understand that for a financial institution, downtime is not just an inconvenience—it's a risk to reputation and revenue.
                  </p>
                  <ul className="space-y-4 mt-8">
                    {[
                      'SOC-2 and PCI-DSS compliant architecture',
                      'Redundant systems for maximum uptime',
                      'Customized call routing for client priority',
                      'On-site training for advisors and staff',
                      'Dedicated account management for DFW firms'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                        <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-emerald-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Zultys VoIP for Financial Services"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Linking Section */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Financial Communication Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/voip-security-encryption" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Lock className="h-10 w-10 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">VoIP Security</h3>
                  <p className="text-slate-600">Learn more about the encryption that protects your firm.</p>
                </Card>
              </Link>
              <Link to="/fort-worth-zultys-mx-series" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">MX Series Systems</h3>
                  <p className="text-slate-600">The powerful all-in-one Zultys communication servers.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <MessageSquare className="h-10 w-10 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">Financial VoIP FAQ</h3>
                  <p className="text-slate-600">Get answers to common questions from financial professionals.</p>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
