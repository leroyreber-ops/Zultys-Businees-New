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
  Building2, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  Phone, 
  MessageSquare, 
  Globe, 
  MapPin,
  Star,
  Award,
  BarChart3,
  Activity
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function Sanger() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Sanger TX Business Phone Systems | Zultys VoIP Installation';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Zultys business phone system installation in Sanger, TX. DFW Business Communications provides scalable, reliable VoIP solutions for Sanger businesses.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/sanger-tx-zultys-phone-systems');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Sanger',
      description: 'Zultys phone system experts serving Sanger, Texas.',
      areaServed: 'Sanger, TX',
      provider: {
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
            <img src={HERO_BACKGROUND} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-blue-500/30">
                  <Activity className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-bold text-white uppercase tracking-widest">Sanger, Texas Tech Support</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                  Smart Phone Systems <br />
                  <span className="text-blue-400">for Sanger Businesses.</span>
                </h1>
                <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                  Sanger businesses deserve enterprise-grade communication tools. 
                  Our Zultys solutions provide the features you need to stay competitive, 
                  backed by local DFW installation and support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={openQuote}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-8 font-black rounded-xl"
                  >
                    Get a Sanger Quote
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 text-xl px-10 py-8 font-black rounded-xl"
                    asChild
                  >
                    <a href="tel:817-231-2962">Call 817-231-2962</a>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="absolute -inset-10 bg-blue-600/20 rounded-full blur-3xl"></div>
                <ImageWithFallback
                  src={OFFICE_COMMUNICATION}
                  alt="Sanger TX Business Communication"
                  className="relative rounded-3xl shadow-2xl border border-white/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Local Advantage Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Why Sanger Chooses DFW Business Communications</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">Local support, expert installation, and the most reliable phone system on the market.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { title: 'On-Site Installation', desc: 'We come to your Sanger office to handle everything from cabling to final setup.', icon: MapPin },
                { title: 'Custom Training', desc: 'Your team will be experts on their new Zultys phones in no time with our hands-on training.', icon: Users },
                { title: '24/7 Local Support', desc: 'When you need help, a DFW-based technician is ready to assist you immediately.', icon: Phone }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black mb-8">Enterprise Features for Sanger Organizations</h2>
                <ul className="space-y-6">
                  {[
                    'Unified Messaging (Voicemail to Email)',
                    'Advanced Auto-Attendant & IVR',
                    'Mobile App for Remote Work',
                    'Built-in Video Conferencing',
                    'Detailed Call Analytics & Reporting',
                    'Seamless CRM Integration'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg font-bold">
                      <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-12 rounded-[3rem] border border-white/10">
                <h3 className="text-3xl font-black mb-6 text-blue-400">Ready to Upgrade?</h3>
                <p className="text-xl text-slate-300 mb-8">
                  Join the dozens of Sanger businesses that have already switched to Zultys. 
                  Get a free site audit and custom quote today.
                </p>
                <Button
                  size="lg"
                  onClick={openQuote}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-8 font-black rounded-2xl"
                >
                  Get Started Now
                </Button>
              </div>
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
