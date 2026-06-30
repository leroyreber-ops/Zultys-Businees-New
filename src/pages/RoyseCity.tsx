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
  Train
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function RoyseCity() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Royse City TX Zultys Phone Systems | Local VoIP Support';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Zultys business phone system installation and support in Royse City, TX. Discover why Royse City businesses trust DFW Business Communications for reliable VoIP solutions.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/royse-city-tx-zultys-phone-systems');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Royse City',
      description: 'Business phone system experts serving Royse City, Texas.',
      areaServed: 'Royse City, TX',
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
              <Train className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Royse City, Texas</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Enterprise VoIP for <br />
              <span className="text-blue-400">Royse City Businesses.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Royse City is on the move. Empower your team with a Zultys phone system 
              that offers the flexibility, reliability, and advanced features your 
              growing business demands.
            </p>
            <div className="flex flex-col sm:row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Get a Royse City Quote
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
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Your Local Zultys Partner in Royse City</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Royse City businesses need a communication partner that understands the local landscape. 
                  Whether you're a professional office in the growing commercial district or a 
                  local service provider, we provide the on-site expertise you need to succeed.
                </p>
                <ul className="space-y-4">
                  {[
                    'On-site installation and cabling in Royse City',
                    'Face-to-face training for your entire staff',
                    'Rapid 24/7 emergency support',
                    'Customized call routing for your specific workflow',
                    'Direct coordination with Royse City ISPs'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                      <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Zultys Installation Royse City"
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
            <h2 className="text-4xl font-black text-slate-900 mb-4 text-center">Why Royse City Chooses Zultys</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Enterprise-grade features scaled for Royse City organizations of all sizes.</p>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 grid md:grid-cols-3 gap-10">
            {[
              { title: 'Cloud & On-Premise', desc: 'Choose the deployment that fits your Royse City office best.', icon: Zap },
              { title: 'Mobile Integration', desc: 'Keep your team connected with the MXmobile app.', icon: Users },
              { title: 'Local Survivability', desc: 'Your phones work even if the internet goes down.', icon: Shield },
              { title: 'Unified Messaging', desc: 'Voicemail, fax, and chat in a single interface.', icon: MessageSquare },
              { title: 'Advanced Reporting', desc: 'Deep insights into your call volume and performance.', icon: BarChart3 },
              { title: 'Expert Support', desc: 'Local DFW technicians ready to help 24/7.', icon: Award }
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

        {/* Internal Linking Section */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Explore More DFW Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/rockwall-tx-zultys-phone-systems" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <MapPin className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Rockwall Solutions</h3>
                  <p className="text-slate-600">Zultys phone systems for Rockwall businesses.</p>
                </Card>
              </Link>
              <Link to="/forney-tx-zultys-phone-systems" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Forney Systems</h3>
                  <p className="text-slate-600">Powerful communication servers for Forney offices.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <MessageSquare className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Zultys FAQ</h3>
                  <p className="text-slate-600">Get answers to common questions about Zultys systems.</p>
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
