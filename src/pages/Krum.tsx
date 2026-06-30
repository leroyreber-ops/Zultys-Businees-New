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
  Waves
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function Krum() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Krum TX Business Phone Systems | Zultys VoIP Dealer';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Reliable Zultys phone systems for Krum, TX businesses. DFW Business Communications provides expert local installation, custom call routing, and 24/7 support.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/krum-tx-zultys-phone-systems');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Krum',
      description: 'Zultys business phone system provider in Krum, Texas.',
      areaServed: 'Krum, TX',
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
        <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 opacity-10">
            <img src={HERO_BACKGROUND} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-8">
              <Waves className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-blue-100 uppercase tracking-widest">Serving Krum, Texas</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Brighter Communication for <br />
              <span className="text-blue-500">Krum Businesses.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Krum businesses need a phone system that is as reliable as it is powerful. 
              Zultys provides the unified communications tools required for modern 
              North Texas organizations to stay connected and productive.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-12 py-8 font-black rounded-2xl shadow-xl transition-all hover:scale-105"
              >
                Get Krum Pricing
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 text-xl px-12 py-8 font-black rounded-2xl border border-white/20"
                asChild
              >
                <a href="tel:817-231-2962">Call Local Support</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Local Advantage Section */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Krum Zultys Installation"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span>Top-Rated Krum Support</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-black text-slate-900 mb-6">Your Local Krum VoIP Partner</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  We specialize in helping Krum businesses transition from legacy phone lines to 
                  modern, feature-rich VoIP solutions. Our local technicians handle everything from 
                  cabling to configuration, ensuring a smooth transition with zero downtime.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    'On-Site Training',
                    'Local DFW Support',
                    'Custom Call Routing',
                    'Mobile App Setup',
                    'CRM Integration',
                    '24/7 Monitoring'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 font-bold text-slate-800">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unique Value Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-16">The Zultys Advantage for Krum</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: 'Scalability', desc: 'Add users instantly as you grow.', icon: Zap },
                { title: 'Reliability', desc: '99.999% uptime for your office.', icon: Shield },
                { title: 'Mobility', desc: 'Work from anywhere in Krum.', icon: Users },
                { title: 'Support', desc: 'Local experts just a call away.', icon: Award }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
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
