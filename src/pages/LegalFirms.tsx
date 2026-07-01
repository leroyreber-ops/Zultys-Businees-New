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
  Scale, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  Lock, 
  FileText, 
  Clock, 
  Phone, 
  MessageSquare,
  Mic
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function LegalFirms() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys for Law Firms | Secure Legal Communications DFW | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Secure, compliant, and efficient communication solutions for DFW law firms. Discover how Zultys empowers legal professionals with call recording, billing integration, and mobile access.';
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
    metaKeywords.setAttribute('content', 'law firm phone system Dallas, legal office VoIP Fort Worth, secure communication DFW, Zultys for lawyers, law office technology North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-for-legal-firms');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys VoIP for Law Firms',
      description: 'Specialized business communication solutions for legal practices in Dallas-Fort Worth.',
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
            <img src={HERO_BACKGROUND} alt="Authorized Zultys Phone Systems and Cloud VoIP Installation in Legal Firms, Texas" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-blue-500/30">
              <Scale className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Legal Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Secure Communications <br />
              <span className="text-blue-400">for DFW Law Firms.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Confidentiality, reliability, and efficiency are the cornerstones of 
              legal practice. Zultys delivers a hardened communication platform 
              designed to meet the unique needs of Dallas-Fort Worth legal professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Request a Legal Demo
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

        {/* Legal Features Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Built for the Legal Workflow</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">Zultys provides specialized features that streamline legal operations and protect client confidentiality.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: 'Secure Call Recording', desc: 'Record depositions, client calls, and consultations with enterprise-grade encryption and secure storage.', icon: Mic },
                { title: 'Billing Integration', desc: 'Easily track billable time spent on calls with integrated reporting and CRM connectivity.', icon: Clock },
                { title: 'Mobile Practice', desc: 'Stay connected to the firm from the courthouse or home with the MXmobile app and full feature parity.', icon: Users },
                { title: 'Confidential Presence', desc: 'See who is available or in a private consultation with real-time presence indicators.', icon: Lock },
                { title: 'Unified Messaging', desc: 'Receive voicemails and faxes directly in your email for faster response and better record keeping.', icon: FileText },
                { title: 'Local DFW Support', desc: 'Get rapid, on-site support from our Fort Worth team whenever your firm needs it.', icon: Shield }
              ].map((item, i) => (
                <Card key={i} className="p-10 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col items-center text-center group">
                  <div className="p-4 bg-blue-50 rounded-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
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
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why DFW Law Firms Trust DFW Business Communications</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    We understand that for a law firm, a missed call is a missed opportunity, and a security breach is a disaster.
                  </p>
                  <ul className="space-y-4 mt-8">
                    {[
                      'HIPAA and SOC-2 compliant architecture',
                      'Redundant systems for maximum uptime',
                      'Customized call routing for after-hours needs',
                      'On-site training for attorneys and staff',
                      'Dedicated account management for DFW firms'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                        <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Zultys VoIP for Law Firms"
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
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Legal Communication Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/voip-security-encryption" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Lock className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">VoIP Security</h3>
                  <p className="text-slate-600">Learn more about the encryption that protects your firm.</p>
                </Card>
              </Link>
              <Link to="/zultys-crm-integration-guide" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">CRM Integration</h3>
                  <p className="text-slate-600">See how Zultys integrates with legal practice management software.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <MessageSquare className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Legal VoIP FAQ</h3>
                  <p className="text-slate-600">Get answers to common questions from legal professionals.</p>
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
