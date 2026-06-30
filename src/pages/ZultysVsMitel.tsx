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
import { CheckCircle, ArrowRight, Shield, Zap, Users, BarChart3, MessageSquare, Phone, Globe } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, ZULTYS_ZAC_MOBILE_COMBO } from '../constants/images';

export function ZultysVsMitel() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys vs Mitel | Better Business Phones for DFW | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Comparing Zultys vs Mitel for Dallas-Fort Worth businesses. Discover why Zultys offers better unified communications, more flexible deployment, and superior local support.';
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
    metaKeywords.setAttribute('content', 'Zultys vs Mitel, Mitel alternative Dallas, Zultys vs Mitel DFW, business phone system Fort Worth, VoIP comparison North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-vs-mitel');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys vs Mitel Comparison',
      description: 'A detailed comparison between Zultys and Mitel phone systems for DFW organizations.',
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
              <Globe className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Platform Comparison</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys vs. Mitel: <br />
              <span className="text-blue-400">The Definitive VoIP Comparison for DFW Businesses.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              When evaluating Zultys vs. Mitel for your Dallas-Fort Worth organization, it's essential to 
              look beyond the legacy brand name. While Mitel has a long history in the PBX market, 
              Zultys offers a more robust, telephony-first platform that is built for reliability, 
              deployment flexibility, and superior local support. This guide explores why DFW 
              businesses that prioritize a truly unified experience and deep PBX functionality 
              consistently choose Zultys over Mitel.
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
                'Truly unified software (one app for everything)',
                'Native mobile app with superior call handover',
                'Flexible Cloud, On-Premise, or Hybrid deployment',
                'Integrated Contact Center included in core software',
                'Local DFW-based installation and 24/7 support',
                'Lower total cost of ownership (no hidden fees)'
              ]}
              competitorDisadvantages={[
                'Often requires multiple apps for different features',
                'Mobile app can be inconsistent on varying networks',
                'Complex licensing tiers that increase as you grow',
                'Support is often remote and ticket-based',
                'Difficult to scale without major hardware upgrades',
                'Proprietary hardware can be expensive to maintain'
              ]}
              features={[
                { feature: 'User Interface', zultys: 'Truly Unified (ZAC)', competitor: 'Fragmented Apps', zultysDetail: 'One app for voice/video/chat', competitorDetail: 'Multiple apps often needed' },
                { feature: 'Mobile Reliability', zultys: 'High', competitor: 'Moderate', zultysDetail: 'Native SIP stack', competitorDetail: 'WebRTC based' },
                { feature: 'Local DFW Support', zultys: true, competitor: false, zultysDetail: 'On-site in DFW', competitorDetail: 'Remote only' },
                { feature: 'Deployment Options', zultys: 'Cloud/On-Prem/Hybrid', competitor: 'Cloud/On-Prem', zultysDetail: 'Maximum flexibility', competitorDetail: 'Varies by product line' },
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
                <h2 className="text-4xl font-black text-slate-900 mb-8">Zultys vs. Mitel: Why DFW Businesses are Choosing Zultys</h2>
                <p>
                  Mitel is a well-known name in the PBX market, but their platform often feels fragmented due to years of acquisitions. When comparing <strong>Zultys vs Mitel</strong>, the difference in user experience and management simplicity becomes clear very quickly.
                </p>
                
                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. A Truly Unified Experience</h3>
                <p>
                  Mitel users often have to juggle multiple applications for voice, video, and team chat, depending on which product line they are using. Zultys' <strong>ZAC (Zultys Advanced Communicator)</strong> brings everything into a single, unified interface. This reduces employee frustration and improves productivity across your entire DFW team.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Reliability and Local Survivability</h3>
                <p>
                  While Mitel offers on-premise options, their cloud platform is a "pure cloud" service. Zultys offers the MX series of appliances that provide local survivability, ensuring your internal communications continue to work even if the cloud is unreachable. This is a critical advantage for DFW businesses that cannot afford a single second of downtime.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Local Support vs. National Call Centers</h3>
                <p>
                  When you have a problem with your Mitel system, you are often calling a national support line or dealing with a distant partner. With <strong>DFW Business Communications</strong>, you are calling a local partner who can be at your office in Dallas or Fort Worth the same day. We provide personalized training and on-site support that national providers simply can't match.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Advanced Contact Center Integration</h3>
                <p>
                  For DFW businesses that require more than just basic calling, Zultys offers a fully integrated Contact Center solution. Unlike many Mitel configurations that require separate licensing or complex integrations for advanced call center features, Zultys provides real-time wallboards, detailed agent reporting, and sophisticated queuing within the same software ecosystem. This ensures your customer service team in Dallas or Fort Worth has the tools they need without the added complexity.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Predictable Pricing and Lower TCO</h3>
                <p>
                  Mitel's pricing can quickly escalate as you add features like call recording or advanced analytics. Zultys offers a straightforward, all-in-one licensing model that includes enterprise-grade features as standard. Over a 3-5 year period, DFW businesses typically find that Zultys offers a significantly lower Total Cost of Ownership (TCO) compared to the "per-feature" pricing of Mitel.
                </p>

                <div className="mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Zultys vs. Mitel FAQs</h2>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Is Zultys more reliable than Mitel?</h4>
                      <p className="text-slate-600">While both offer high uptime, Zultys provides local survivability options (MX appliances) that many Mitel cloud configurations do not. This ensures your business stays connected even during local internet outages in Dallas or Fort Worth.</p>
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
                  <p className="text-slate-600">Compare Zultys to another major cloud provider.</p>
                </Card>
              </Link>
              <Link to="/zultys-vs-microsoft-teams" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Zultys vs. Teams</h3>
                  <p className="text-slate-600">See why Teams might not be enough for your voice needs.</p>
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
