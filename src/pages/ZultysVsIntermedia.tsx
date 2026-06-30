import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CompetitorComparison } from '../components/CompetitorComparison';
import { CheckCircle, ArrowRight, Shield, Zap, Users, BarChart3, MessageSquare, Phone, Globe, Layers } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, ZULTYS_ZAC_MOBILE_COMBO } from '../constants/images';

export function ZultysVsIntermedia() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys vs Intermedia | Better Cloud Communications for DFW | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Comparing Zultys vs Intermedia for Dallas-Fort Worth businesses. Discover why Zultys offers superior unified communications, more flexible deployment, and local DFW support.';
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
    metaKeywords.setAttribute('content', 'Zultys vs Intermedia, Intermedia alternative Dallas, Zultys vs Intermedia DFW, business phone system Fort Worth, VoIP comparison North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-vs-intermedia');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys vs Intermedia Comparison',
      description: 'A detailed comparison between Zultys and Intermedia phone systems for DFW organizations.',
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
            <img src={HERO_BACKGROUND} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-blue-500/30">
              <Layers className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Channel Comparison</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys vs. Intermedia: <br />
              <span className="text-blue-400">The Definitive VoIP Comparison for DFW Businesses.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              When comparing Zultys vs. Intermedia for your Dallas-Fort Worth organization, it's essential to 
              look beyond the basic cloud features. While Intermedia is a popular choice for IT managed 
              service providers, Zultys offers a more robust, telephony-first platform that is built 
              for reliability, deployment flexibility, and superior local support. This guide explores 
              why DFW businesses that prioritize uptime and deep PBX functionality consistently choose 
              Zultys over Intermedia.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Get a Custom Quote
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

        {/* Comparison Table Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <CompetitorComparison
              productName="Zultys Unified Communications"
              zultysAdvantages={[
                'Truly unified application (ZAC) for all features',
                'Superior local survivability with MX appliances',
                'Flexible Cloud, On-Premise, or Hybrid deployment',
                'Integrated Contact Center included in core software',
                'Local DFW-based installation and 24/7 support',
                'Lower total cost of ownership (no hidden fees)'
              ]}
              competitorDisadvantages={[
                'User interface can be complex and fragmented',
                'Limited local survivability (Cloud-only)',
                'Support is primarily remote and ticket-based',
                'Expensive licensing tiers for advanced features',
                'Difficult to scale without major hardware upgrades',
                'Proprietary hardware can be expensive to maintain'
              ]}
              features={[
                { feature: 'User Interface', zultys: 'Truly Unified (ZAC)', competitor: 'Moderate', zultysDetail: 'One app for everything', competitorDetail: 'Multiple interfaces' },
                { feature: 'Local Survivability', zultys: 'High (MX Series)', competitor: 'Low (Cloud Only)', zultysDetail: 'Works without internet', competitorDetail: 'Requires internet' },
                { feature: 'Local DFW Support', zultys: true, competitor: false, zultysDetail: 'On-site in DFW', competitorDetail: 'Remote only' },
                { feature: 'Deployment Options', zultys: 'Cloud/On-Prem/Hybrid', competitor: 'Cloud Only', zultysDetail: 'Total flexibility', competitorDetail: 'Cloud-locked' },
                { feature: 'Cost Predictability', zultys: 'High', competitor: 'Low', zultysDetail: 'Flat licensing', competitorDetail: 'Complex tiering' },
              ]}
            />
          </div>
        </section>

        {/* Deep Dive Content */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none text-slate-700">
                <h2 className="text-4xl font-black text-slate-900 mb-8">Zultys vs. Intermedia: Why DFW Businesses are Choosing Zultys</h2>
                <p>
                  Intermedia is a strong cloud platform, but for many Dallas-Fort Worth businesses, the lack of local support and deployment flexibility is a deal-breaker. When comparing <strong>Zultys vs Intermedia</strong>, the focus is on finding a partner, not just a provider.
                </p>
                
                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Truly Unified Communications</h3>
                <p>
                  Intermedia has a lot of features, but they aren't always integrated seamlessly. Zultys' <strong>ZAC (Zultys Advanced Communicator)</strong> was designed from the ground up to be a single, unified interface for voice, video, chat, and presence. This reduces employee training time and improves daily productivity.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. The Hybrid Advantage</h3>
                <p>
                  Intermedia is a "pure cloud" service. If your internet connection in Dallas or Fort Worth fails, your business stops. Zultys offers <strong>Hybrid deployment</strong> options that give you the best of both worlds: cloud flexibility with local survivability.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Local DFW Expertise</h3>
                <p>
                  When you have a problem with Intermedia, you're calling a national support line. With <strong>DFW Business Communications</strong>, you have a local partner who knows your network and can be at your office the same day. We provide personalized training and on-site support that national providers simply can't match.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Advanced Contact Center Integration</h3>
                <p>
                  For DFW businesses that require more than just basic calling, Zultys offers a fully integrated Contact Center solution. Unlike Intermedia, which often requires separate licensing or complex integrations for advanced call center features, Zultys provides real-time wallboards, detailed agent reporting, and sophisticated queuing within the same software ecosystem. This ensures your customer service team in Dallas or Fort Worth has the tools they need without the added complexity.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Predictable Pricing and Lower TCO</h3>
                <p>
                  Intermedia's pricing can quickly escalate as you add features like call recording or advanced analytics. Zultys offers a straightforward, all-in-one licensing model that includes enterprise-grade features as standard. Over a 3-5 year period, DFW businesses typically find that Zultys offers a significantly lower Total Cost of Ownership (TCO) compared to the "per-feature" pricing of Intermedia.
                </p>

                <div className="mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Zultys vs. Intermedia FAQs</h2>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Is Zultys more reliable than Intermedia?</h4>
                      <p className="text-slate-600">While both offer high uptime, Zultys provides local survivability options (MX appliances) that Intermedia does not. This means your phones keep working even if your internet connection fails.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Can I use my existing internet with Zultys?</h4>
                      <p className="text-slate-600">Absolutely. Zultys is designed to work over any high-quality DFW internet connection. Our local team will perform a network audit to ensure your infrastructure is ready for high-quality VoIP traffic.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">How does Zultys handle remote workers in North Texas?</h4>
                      <p className="text-slate-600">The ZAC (Zultys Advanced Communicator) app provides a seamless experience for remote workers, allowing them to use their business extension from home in Plano or a job site in Arlington with full feature parity.</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Internal Linking Section */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Explore More DFW Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/zultys-vs-ringcentral" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <BarChart3 className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Zultys vs. RingCentral</h3>
                  <p className="text-slate-600">Compare Zultys to the leading cloud PBX provider.</p>
                </Card>
              </Link>
              <Link to="/zultys-vs-microsoft-teams" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Zultys vs. Teams</h3>
                  <p className="text-slate-600">See why Teams Phone might not be enough for your business.</p>
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
