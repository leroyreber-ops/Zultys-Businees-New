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

export function Fate() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Fate TX Business Phone Systems | Zultys VoIP Installation & Support';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Modern Zultys phone systems for Fate, TX businesses. DFW Business Communications offers local installation, custom call routing, and 24/7 support for your Fate office.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/fate-tx-zultys-phone-systems');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Fate',
      description: 'Zultys business phone system experts serving Fate, Texas.',
      areaServed: 'Fate, TX',
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
          <div className="absolute inset-0 opacity-15">
            <img src={HERO_BACKGROUND} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 px-4 py-2 rounded-full mb-8">
                <Compass className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">Serving Fate, Texas</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                Your Business Communication <br />
                <span className="text-blue-500 text-glow">Partner in Fate, TX.</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                Fate is one of the fastest-growing cities in Rockwall County. 
                Ensure your business has the communication tools to match your growth 
                with Zultys unified communications.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  onClick={openQuote}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-12 py-8 font-black rounded-2xl shadow-xl transition-all hover:scale-105"
                >
                  Request Fate Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 text-xl px-12 py-8 font-black rounded-2xl backdrop-blur-sm"
                  asChild
                >
                  <a href="tel:817-231-2962">Call 817-231-2962</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Local Advantage Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why Fate Businesses Trust Us</h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  We provide more than just hardware. We deliver a complete communication 
                  ecosystem that integrates seamlessly with your business processes. 
                  Our local Fate technicians are experts in Zultys deployment and support.
                </p>
                <div className="space-y-8">
                  {[
                    { title: 'On-Site Site Survey', desc: 'We visit your Fate office to ensure your network is ready for VoIP.' },
                    { title: 'Custom Call Flow', desc: 'We design your system to match how your business actually operates.' },
                    { title: 'Local 24/7 Support', desc: 'Get help from a DFW-based expert whenever you need it.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <CheckCircle className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-600/5 rounded-[3rem] blur-3xl"></div>
                <ImageWithFallback
                  src={OFFICE_COMMUNICATION}
                  alt="Zultys Support Fate"
                  className="relative rounded-[2.5rem] shadow-2xl border border-slate-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Zultys Features for Fate Offices</h2>
              <p className="text-xl text-slate-600">Enterprise power scaled for your local business.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: 'Unified Comms', desc: 'Voice, video, and chat in one seamless application.', icon: Globe },
                { title: 'Mobile Freedom', desc: 'Take your Fate office extension anywhere with MXmobile.', icon: Phone },
                { title: 'Call Analytics', desc: 'Deep insights into your call volume and staff performance.', icon: BarChart3 },
                { title: 'Secure & Reliable', desc: 'Built-in encryption and 99.999% uptime guarantee.', icon: Shield },
                { title: 'Cloud Flexibility', desc: 'Deploy in the cloud or on-premise based on your needs.', icon: Zap },
                { title: 'Local Presence', desc: 'Get local Fate numbers or port your existing ones.', icon: MapPin }
              ].map((item, i) => (
                <Card key={i} className="p-10 border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                </Card>
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
