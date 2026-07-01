import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Home, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  Monitor, 
  Smartphone, 
  Globe, 
  Video,
  Wifi,
  Lock
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, ZULTYS_MX_MOBILE_ZAC } from '../constants/images';

export function RemoteWorkSolutions() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Remote Work & Hybrid Office Solutions | Zultys DFW | DFW Business Communications';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Empower your remote and hybrid workforce with Zultys. Discover our solutions for WFH, mobile integration, and secure business communications in Dallas-Fort Worth.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/remote-work-solutions');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Remote Work and Hybrid Office Solutions',
      description: 'A guide to Zultys solutions for remote and hybrid work environments.',
      publisher: {
        '@type': 'Organization',
        name: 'DFW Business Communications'
      }
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
            <img src={HERO_BACKGROUND} alt="Authorized Zultys Phone Systems and Cloud VoIP Installation in Remote Work Solutions, Texas" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-zultys-green/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-zultys-green/30">
              <Home className="h-5 w-5 text-zultys-green" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Modern Workforce</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Remote Work & Hybrid <br />
              <span className="text-zultys-green">Office Solutions for DFW.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Empower your team to work from anywhere with the same powerful 
              features they have in the office. Zultys delivers a seamless, 
              secure, and unified experience for the modern DFW workforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Request a Remote Demo
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

        {/* Key Features Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">The Tools Your Remote Team Needs</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">Zultys provides a complete suite of unified communication tools designed for maximum flexibility and productivity.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'ZAC Desktop App', desc: 'A powerful unified interface for voice, video, chat, and presence on any computer.', icon: Monitor },
                { title: 'MXmobile App', desc: 'Take your office extension with you on iPhone or Android with full feature parity.', icon: Smartphone },
                { title: 'Video Conferencing', desc: 'Integrated HD video meetings and screen sharing for seamless collaboration.', icon: Video },
                { title: 'Secure Access', desc: 'Built-in security and encryption ensures your business data stays private.', icon: Lock }
              ].map((item, i) => (
                <Card key={i} className="p-8 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col items-center text-center group">
                  <div className="p-4 bg-zultys-green/10 rounded-2xl mb-6 group-hover:bg-zultys-green group-hover:text-white transition-colors duration-500">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
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
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why Zultys is the Best Choice for Hybrid DFW Teams</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    A successful hybrid office requires more than just a phone app. It requires a system that can bridge the gap between the office and the home office seamlessly.
                  </p>
                  <ul className="space-y-4 mt-8">
                    {[
                      'Single number reach for all employees',
                      'Real-time presence to see who is available',
                      'Seamless call handover between desk and mobile',
                      'No VPN required for secure remote access',
                      'Centralized management for IT administrators'
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
                    src={ZULTYS_MX_MOBILE_ZAC}
                    alt="Zultys Remote Work Interface"
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
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Remote Work Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/fort-worth-zultys-mxmobile" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Smartphone className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">MXmobile App</h3>
                  <p className="text-slate-600">Learn more about the mobile app that powers remote work.</p>
                </Card>
              </Link>
              <Link to="/fort-worth-zultys-zac" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Monitor className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">Zultys ZAC</h3>
                  <p className="text-slate-600">The desktop unified communications client for any location.</p>
                </Card>
              </Link>
              <Link to="/zultys-user-guides" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">Remote User Guides</h3>
                  <p className="text-slate-600">Download quick-start guides for your remote employees.</p>
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
