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
  Factory, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Phone, 
  MessageSquare, 
  Truck, 
  Package, 
  Network
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function ManufacturingLogistics() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys for Manufacturing & Logistics | DFW Industrial VoIP | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Streamline your operations with Zultys. Discover our communication solutions for DFW manufacturing and logistics companies, including multi-site connectivity and ruggedized options.';
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
    metaKeywords.setAttribute('content', 'manufacturing phone system Dallas, logistics VoIP Fort Worth, industrial communication DFW, Zultys for manufacturing, warehouse phone system North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-for-manufacturing-logistics');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys VoIP for Manufacturing and Logistics',
      description: 'Specialized business communication solutions for industrial and logistics companies in Dallas-Fort Worth.',
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
            <img src={HERO_BACKGROUND} alt="Authorized Zultys Phone Systems and Cloud VoIP Installation in Manufacturing Logistics, Texas" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-amber-500/30">
              <Factory className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Industrial Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Powering DFW <br />
              <span className="text-amber-400">Manufacturing & Logistics.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              In the fast-paced world of manufacturing and logistics, clear 
              communication is the engine of efficiency. Zultys delivers a robust 
              platform designed to connect your office, warehouse, and fleet seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Request an Industrial Demo
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

        {/* Manufacturing Features Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Built for the Industrial Workflow</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">Zultys provides specialized features that streamline operations and improve safety in manufacturing and logistics environments.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: 'Multi-Site Connectivity', desc: 'Seamlessly link multiple warehouses and offices across DFW with a single, unified communication platform.', icon: Globe },
                { title: 'Ruggedized Endpoints', desc: 'Deploy durable, high-visibility IP phones and wireless handsets designed for warehouse and factory floor environments.', icon: Package },
                { title: 'Paging & Intercom', desc: 'Integrated overhead paging and intercom systems ensure that critical messages reach every corner of your facility.', icon: Network },
                { title: 'Mobile Fleet Integration', desc: 'Keep your drivers and field staff connected with the MXmobile app and full feature parity.', icon: Truck },
                { title: 'Advanced Call Routing', desc: 'Ensure that logistics and supply chain calls are routed to the right person instantly, reducing delays.', icon: Zap },
                { title: 'Local DFW Support', desc: 'Get rapid, on-site support from our Fort Worth team whenever your facility needs it.', icon: Shield }
              ].map((item, i) => (
                <Card key={i} className="p-10 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col items-center text-center group">
                  <div className="p-4 bg-amber-50 rounded-2xl mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-500">
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
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why DFW Industrial Firms Trust Zultys</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    We understand that in manufacturing and logistics, downtime is not just an inconvenience—it's a disruption to the entire supply chain.
                  </p>
                  <ul className="space-y-4 mt-8">
                    {[
                      'Redundant systems for maximum uptime',
                      'Customized call routing for supply chain priority',
                      'On-site training for warehouse and office staff',
                      'Ruggedized hardware options for harsh environments',
                      'Dedicated account management for DFW firms'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                        <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-amber-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Zultys VoIP for Manufacturing & Logistics"
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
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Industrial Communication Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/fort-worth-zultys-multi-location" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Globe className="h-10 w-10 text-amber-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors">Multi-Location Solutions</h3>
                  <p className="text-slate-600">See how Zultys connects multiple facilities seamlessly.</p>
                </Card>
              </Link>
              <Link to="/fort-worth-zultys-mx-series" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-amber-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors">MX Series Systems</h3>
                  <p className="text-slate-600">The powerful all-in-one Zultys communication servers.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <MessageSquare className="h-10 w-10 text-amber-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors">Industrial VoIP FAQ</h3>
                  <p className="text-slate-600">Get answers to common questions from industrial professionals.</p>
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
