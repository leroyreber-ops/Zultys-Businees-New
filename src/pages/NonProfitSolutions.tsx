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
  Heart, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  Phone, 
  MessageSquare, 
  Globe, 
  HandHeart, 
  DollarSign,
  Gift
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function NonProfitSolutions() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys for Non-Profits | Affordable DFW VoIP | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Maximize your impact with Zultys. Discover our affordable and powerful communication solutions for DFW non-profits, including special pricing and flexible features.';
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
    metaKeywords.setAttribute('content', 'non-profit phone system Dallas, charity VoIP Fort Worth, affordable communication DFW, Zultys for non-profits, religious organization phone system North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-for-non-profits');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys VoIP for Non-Profits',
      description: 'Affordable and powerful business communication solutions for non-profit organizations in Dallas-Fort Worth.',
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
            <img src={HERO_BACKGROUND} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-rose-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-rose-500/30">
              <Heart className="h-5 w-5 text-rose-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Non-Profit Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Empower Your Mission <br />
              <span className="text-rose-400">with Zultys VoIP.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Your mission is to make a difference. Our mission is to provide the 
              affordable, reliable, and powerful communication tools you need to 
              succeed. Discover Zultys solutions designed for DFW non-profits.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Request Non-Profit Pricing
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

        {/* Non-Profit Features Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Powerful Tools for a Purpose-Driven Workflow</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">Zultys provides specialized features that help non-profits maximize their resources and improve community outreach.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: 'Affordable Pricing', desc: 'Take advantage of special pricing and licensing options designed specifically for non-profit organizations.', icon: DollarSign },
                { title: 'Flexible Deployment', desc: 'Choose from Cloud, On-Premise, or Hybrid options to fit your organization\'s unique needs and budget.', icon: Zap },
                { title: 'Mobile Outreach', desc: 'Keep your volunteers and staff connected in the field with the MXmobile app and full feature parity.', icon: Users },
                { title: 'Integrated Messaging', desc: 'Communicate with your donors and community via text or chat for better engagement and support.', icon: MessageSquare },
                { title: 'Multi-Site Connectivity', desc: 'Seamlessly link multiple locations and remote offices with a single, unified platform.', icon: Globe },
                { title: 'Local DFW Support', desc: 'Get rapid, on-site support from our Fort Worth team whenever your organization needs it.', icon: Shield }
              ].map((item, i) => (
                <Card key={i} className="p-10 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col items-center text-center group">
                  <div className="p-4 bg-rose-50 rounded-2xl mb-6 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-500">
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
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why DFW Non-Profits Trust DFW Business Communications</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    We understand that for a non-profit, every dollar saved on overhead is a dollar that can go toward your mission.
                  </p>
                  <ul className="space-y-4 mt-8">
                    {[
                      'Cost-effective communication solutions',
                      'Redundant systems for maximum reliability',
                      'On-site training for staff and volunteers',
                      'Scalable features that grow with your impact',
                      'Dedicated account management for DFW non-profits'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                        <CheckCircle className="h-6 w-6 text-rose-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-rose-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Zultys VoIP for Non-Profits"
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
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Non-Profit Communication Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/fort-worth-zultys-mxmobile" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Users className="h-10 w-10 text-rose-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-rose-600 transition-colors">MXmobile App</h3>
                  <p className="text-slate-600">Keep your team connected in the field and on the go.</p>
                </Card>
              </Link>
              <Link to="/zultys-pricing" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <DollarSign className="h-10 w-10 text-rose-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-rose-600 transition-colors">Pricing & Quotes</h3>
                  <p className="text-slate-600">Learn more about our affordable pricing for non-profits.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <MessageSquare className="h-10 w-10 text-rose-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-rose-600 transition-colors">Non-Profit VoIP FAQ</h3>
                  <p className="text-slate-600">Get answers to common questions from non-profit leaders.</p>
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
