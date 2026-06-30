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
  Compass
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function Justin() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Justin TX Business Phone Systems | Zultys VoIP Installation';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Upgrade your Justin business with Zultys unified communications. DFW Business Communications offers expert local installation and 24/7 support for Justin organizations.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/justin-tx-zultys-phone-systems');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Justin',
      description: 'Premier Zultys business phone system provider in Justin, Texas.',
      areaServed: 'Justin, TX',
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
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-blue-500/30">
              <Compass className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Serving Justin, Texas</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Modern Business Phone <br />
              <span className="text-blue-400">Solutions for Justin.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              As Justin continues to grow, your business needs a communication platform 
              that can scale with you. DFW Business Communications delivers 
              enterprise-grade Zultys VoIP systems tailored for local success.
            </p>
            <div className="flex flex-col sm:row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Request Justin Quote
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

        {/* Local Advantage Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why Justin Businesses Trust Us</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  We don't just ship you phones; we provide a complete communication strategy. 
                  From the initial site survey in Justin to the final staff training session, 
                  our team ensures your Zultys system is optimized for your specific workflow.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Local Expertise', desc: 'Technicians who know Justin and the Denton County area.' },
                    { title: 'Custom Integration', desc: 'Connecting your phones with your CRM and business tools.' },
                    { title: 'Scalable Growth', desc: 'Easily add lines as your Justin office expands.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Zultys Support Justin"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 text-center">Enterprise Features for Justin</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Powerful tools designed to enhance productivity and customer service.</p>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 grid md:grid-cols-3 gap-10">
            {[
              { title: 'Unified Comms', desc: 'Voice, video, and chat in one seamless application.', icon: Globe },
              { title: 'Mobile Freedom', desc: 'Take your Justin office extension anywhere with MXmobile.', icon: Phone },
              { title: 'Call Center Tools', desc: 'Advanced queuing and reporting for high-volume offices.', icon: BarChart3 },
              { title: 'Secure & Reliable', desc: 'Built-in encryption and 99.999% uptime guarantee.', icon: Shield },
              { title: 'Easy Management', desc: 'Simple web-based portal for all your system changes.', icon: Zap },
              { title: 'Local Presence', desc: 'Get a local Justin number or port your existing one.', icon: MapPin }
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
        </section>

        <CTASection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
