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
  Anchor
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function Lavon() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Lavon TX Business Phone Systems | Zultys VoIP Installation';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Discover the best business phone systems in Lavon, TX. DFW Business Communications provides expert Zultys VoIP installation and local support for Lavon offices.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/lavon-tx-zultys-phone-systems');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Lavon',
      description: 'Zultys business phone system provider in Lavon, Texas.',
      areaServed: 'Lavon, TX',
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
        <section className="relative pt-24 pb-32 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-8 font-bold">
              <Anchor className="h-5 w-5" />
              <span>Serving Lavon, Texas</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
              Elevate Your Lavon <br />
              <span className="text-blue-600 font-outline-2">Business Communications.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Lavon is a community of excellence. Your business deserves a phone system 
              that reflects that. DFW Business Communications delivers Zultys solutions 
              that combine enterprise power with local Lavon service.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-12 py-8 font-black rounded-2xl shadow-xl hover:shadow-blue-200 transition-all"
              >
                Get a Lavon Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-200 text-slate-900 hover:bg-slate-50 text-xl px-12 py-8 font-black rounded-2xl"
                asChild
              >
                <a href="tel:817-231-2962">Call 817-231-2962</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Local Advantage Section */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
                <h2 className="text-4xl font-black mb-8 leading-tight">The Local Advantage for Lavon Businesses</h2>
                <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                  We understand that Lavon businesses value personal service and reliability. 
                  Unlike national providers, we are right here in the DFW area, ready to 
                  visit your office for installation, training, and ongoing support.
                </p>
                <ul className="space-y-6">
                  {[
                    'On-site site survey and network assessment in Lavon',
                    'Customized call flow design for your unique business',
                    'Hands-on training for every member of your staff',
                    'Direct access to local DFW technicians 24/7'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 bg-blue-600 rounded-lg p-1">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-lg font-bold text-slate-100">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-2xl"></div>
                <ImageWithFallback
                  src={OFFICE_COMMUNICATION}
                  alt="Lavon Zultys Support"
                  className="relative rounded-[2.5rem] shadow-2xl border border-white/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Zultys Features for Lavon Offices</h2>
              <p className="text-xl text-slate-600">Enterprise-grade tools scaled for your business.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: 'Cloud & On-Premise', desc: 'Choose the deployment that fits your Lavon office best.', icon: Building2 },
                { title: 'Mobile Integration', desc: 'Your office extension on your smartphone with MXmobile.', icon: Phone },
                { title: 'Unified Messaging', desc: 'Voicemail, fax, and chat in a single, easy-to-use interface.', icon: MessageSquare },
                { title: 'Advanced Reporting', desc: 'Get deep insights into your call volume and staff performance.', icon: BarChart3 },
                { title: 'Local Survivability', desc: 'Your phones keep working even if the internet goes down.', icon: Shield },
                { title: 'Expert Local Support', desc: 'DFW-based technicians ready to help 24/7.', icon: Award }
              ].map((item, i) => (
                <Card key={i} className="p-10 border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all group">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
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
