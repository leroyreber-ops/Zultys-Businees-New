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
  DollarSign, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Cloud, 
  Server,
  Calculator,
  Tag,
  Phone,
  HelpCircle
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, ZULTYS_IP_PHONES_BG } from '../constants/images';

export function Pricing() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Zultys Pricing & Quote | Business Phone System Costs DFW | DFW Business Communications';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Get a custom Zultys pricing quote for your Dallas-Fort Worth business. Compare cloud vs on-premise costs and find the best VoIP solution for your budget.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-pricing');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys Pricing and Quote Information',
      description: 'Pricing information and quote request for Zultys business phone systems in Dallas-Fort Worth.',
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
        <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 opacity-20">
            <img src={HERO_BACKGROUND} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-zultys-green/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-zultys-green/30">
              <Tag className="h-5 w-5 text-zultys-green" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Pricing & Packages</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys Pricing: <br />
              <span className="text-zultys-green">Value That Scales with You.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              No hidden fees. No complex tiers. Just enterprise-grade communication 
              at a price that makes sense for your North Texas business.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-zultys-gold hover:bg-zultys-gold/90 text-slate-950 text-xl px-10 py-8 font-black rounded-xl shadow-2xl border-none hover:scale-[1.02] active:scale-95 transition-all"
              >
                Request a Custom Quote
              </Button>
              <Button
                size="lg"
                asChild
                className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl shadow-zultys-green/20 border-none hover:scale-[1.02] active:scale-95 transition-all"
              >
                <a href="tel:817-231-2962" className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-white animate-pulse" />
                  Call 817-231-2962
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Philosophy */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Transparent Pricing for DFW Businesses</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">We don't believe in "one-size-fits-all" pricing. We design a system that fits your specific user count, feature needs, and budget.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'Cloud-Based (SaaS)',
                  desc: 'Low upfront cost with a predictable monthly per-user fee. Perfect for businesses that want a fully managed solution with no hardware to maintain.',
                  icon: Cloud,
                  features: ['No Hardware Maintenance', 'Automatic Updates', 'Predictable Monthly OpEx', 'Scales Instantly']
                },
                {
                  title: 'On-Premise (CapEx)',
                  desc: 'Higher upfront investment in hardware, but significantly lower long-term monthly costs. Ideal for businesses that want total control and maximum ROI.',
                  icon: Server,
                  features: ['Total System Control', 'Lowest Long-Term TCO', 'Local Survivability', 'One-Time License Options']
                },
                {
                  title: 'Hybrid Model',
                  desc: 'The best of both worlds. Keep core infrastructure on-site for security while leveraging the cloud for remote workers and disaster recovery.',
                  icon: Zap,
                  features: ['Maximum Flexibility', 'Disaster Recovery Built-in', 'Optimized Bandwidth', 'Custom Growth Path']
                }
              ].map((plan, i) => (
                <Card key={i} className="p-10 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="p-4 bg-zultys-green/10 rounded-2xl mb-6 w-fit">
                    <plan.icon className="h-10 w-10 text-zultys-green" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{plan.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-8 flex-1">{plan.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                        <CheckCircle className="h-5 w-5 text-zultys-green" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full border-zultys-green text-zultys-green hover:bg-zultys-green hover:text-white font-black"
                    onClick={openQuote}
                  >
                    Get {plan.title} Quote
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Dive Content */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Understanding Your Total Cost of Ownership (TCO)</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    When comparing <strong>Zultys pricing</strong> to other providers in Dallas-Fort Worth, it's important to look beyond the initial monthly quote. Many national hosted providers "nickel and dime" you for features like call recording, mobile apps, and advanced reporting.
                  </p>
                  <p>
                    With Zultys, most of these enterprise features are included in the core software license. This means your costs stay predictable as your business grows. 
                  </p>
                  <div className="mt-8 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                    <h4 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                      <Calculator className="h-6 w-6 text-zultys-green" />
                      The DFW Savings Factor
                    </h4>
                    <p className="text-slate-600 mb-0">
                      On average, North Texas businesses save <strong>25-40% over 5 years</strong> by choosing a Zultys on-premise or hybrid system compared to a traditional hosted-only provider.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                  <ImageWithFallback
                    src={ZULTYS_IP_PHONES_BG}
                    alt="Zultys Business Phone System Value"
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
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Ready to See the Numbers?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/contact" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Phone className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">Request a Quote</h3>
                  <p className="text-slate-600">Get a detailed, no-obligation pricing proposal for your office.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <HelpCircle className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">Pricing FAQ</h3>
                  <p className="text-slate-600">Common questions about licensing, hardware, and monthly fees.</p>
                </Card>
              </Link>
              <Link to="/products" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">Product Specs</h3>
                  <p className="text-slate-600">See the hardware and software that delivers the most value.</p>
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
