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
  Search, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Phone, 
  ClipboardCheck,
  Network,
  Lock,
  Wifi
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function FreeAudit() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Free VoIP Site Audit & Consultation | Dallas Fort Worth | DFW Business Communications';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Request a free VoIP site audit and communication consultation for your DFW business. We analyze your network, current costs, and future needs to design the perfect Zultys solution.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/free-voip-site-audit');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Free VoIP Site Audit & Consultation',
      description: 'A comprehensive audit of your business communication infrastructure and network readiness for VoIP.',
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
        <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 opacity-20">
            <img src={HERO_BACKGROUND} alt="Authorized Zultys Phone Systems and Cloud VoIP Installation in Free Audit, Texas" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-zultys-green/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-zultys-green/30">
              <ClipboardCheck className="h-5 w-5 text-zultys-green" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Complimentary Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Free VoIP Site Audit: <br />
              <span className="text-zultys-green">Is Your Network Ready?</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Don't guess when it comes to your business communications. 
              Our DFW experts will perform a comprehensive audit of your 
              current system, network, and costs—at no charge to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Schedule Your Free Audit
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

        {/* What's Included Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">What's Included in Your Audit?</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">Our 360-degree review covers every aspect of your communication infrastructure to ensure a seamless transition to Zultys.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Network Readiness',
                  desc: 'We test your local network and internet bandwidth to ensure it can handle high-quality voice and video traffic.',
                  icon: Network
                },
                {
                  title: 'Cost Analysis',
                  desc: 'We review your current phone bills to identify "hidden" fees and show you exactly how much you can save with Zultys.',
                  icon: BarChart3
                },
                {
                  title: 'Security Review',
                  desc: 'We assess your current firewall and security protocols to ensure your new VoIP system will be fully protected.',
                  icon: Lock
                },
                {
                  title: 'Workflow Mapping',
                  desc: 'We analyze how your team handles calls today and design a custom Zultys workflow to improve efficiency.',
                  icon: Users
                }
              ].map((item, i) => (
                <Card key={i} className="p-8 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="p-4 bg-zultys-green/10 rounded-2xl mb-6 w-fit">
                    <item.icon className="h-8 w-8 text-zultys-green" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Matters Section */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why a Professional Site Audit is Critical</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    Many DFW businesses rush into a VoIP contract only to find that their office wiring is outdated or their internet connection is insufficient for clear calls. This leads to jitter, dropped calls, and frustrated employees.
                  </p>
                  <p>
                    By performing a <strong>Free VoIP Site Audit</strong>, we eliminate the guesswork. We identify potential bottlenecks before they become problems, ensuring that your Zultys system works perfectly from day one.
                  </p>
                  <ul className="space-y-4 mt-8">
                    {[
                      'Identify and resolve network bottlenecks',
                      'Optimize your firewall for VoIP traffic',
                      'Ensure cabling and hardware are up to spec',
                      'Verify bandwidth requirements for remote workers',
                      'Eliminate unnecessary monthly phone expenses'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                        <CheckCircle className="h-6 w-6 text-zultys-green flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="VoIP Site Audit and Consultation"
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
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Prepare for Your Transition</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/blog/how-to-optimize-your-office-network-for-voip-performance" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Wifi className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">Network Optimization Guide</h3>
                  <p className="text-slate-600">Learn how to prep your DFW office for high-performance VoIP.</p>
                </Card>
              </Link>
              <Link to="/zultys-pricing" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <BarChart3 className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">Pricing & ROI</h3>
                  <p className="text-slate-600">See the financial benefits of switching to a Zultys system.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Search className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">Common Questions</h3>
                  <p className="text-slate-600">Get answers to technical and service questions about Zultys.</p>
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
