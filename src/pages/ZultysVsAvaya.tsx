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
import { CheckCircle, ArrowRight, Shield, Zap, Users, BarChart3, MessageSquare, Phone, RefreshCw } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, ZULTYS_MX_MOBILE_ZAC } from '../constants/images';

export function ZultysVsAvaya() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys vs Avaya | Modern VoIP vs Legacy PBX | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Comparing Zultys vs Avaya for Dallas-Fort Worth businesses. Discover why Zultys is the superior choice for organizations migrating from legacy Avaya systems to modern VoIP.';
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
    metaKeywords.setAttribute('content', 'Zultys vs Avaya, replace Avaya phone system, Avaya alternative Dallas, Zultys dealer Fort Worth, legacy PBX migration DFW, business VoIP comparison');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-vs-avaya');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys vs Avaya Comparison & Migration Guide',
      description: 'A detailed comparison between Zultys and Avaya phone systems, focusing on migration for DFW businesses.',
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
            <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-red-500/30">
              <RefreshCw className="h-5 w-5 text-red-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Migration Strategy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys vs. Avaya: <br />
              <span className="text-red-400">The Definitive Migration Guide for DFW Businesses.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              When evaluating Zultys vs. Avaya for your Dallas-Fort Worth organization, it's important to 
              distinguish between legacy hardware and a modern unified communications platform. While 
              Avaya has a long history in telephony, Zultys offers a more robust, telephony-first 
              platform that is built for reliability, deployment flexibility, and superior local 
              support. This guide explores why DFW businesses that are ready to move away from 
              complex, aging infrastructure consistently choose Zultys over Avaya.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-red-600 hover:bg-red-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Plan Your Migration
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
                'Modern, Linux-based all-in-one architecture',
                'Seamless mobile and desktop integration (ZAC)',
                'Flexible Cloud, On-Premise, or Hybrid deployment',
                'Lower maintenance and licensing costs',
                'No complex hardware "cards" or proprietary wiring',
                'Local DFW experts for a smooth transition'
              ]}
              competitorDisadvantages={[
                'Complex, legacy architecture (often Windows-based)',
                'Fragmented mobile apps and user experience',
                'Expensive and confusing licensing models',
                'High maintenance costs for aging hardware',
                'Difficult to scale without major hardware upgrades',
                'Support can be slow and expensive for legacy systems'
              ]}
              features={[
                { feature: 'Architecture', zultys: 'Modern All-in-One', competitor: 'Legacy Modular', zultysDetail: 'Single server/instance', competitorDetail: 'Multiple boxes/cards' },
                { feature: 'Mobile Integration', zultys: 'Excellent (MXmobile)', competitor: 'Varies by Version', zultysDetail: 'Native SIP stack', competitorDetail: 'Often requires extra servers' },
                { feature: 'Local DFW Support', zultys: true, competitor: 'Limited', zultysDetail: 'On-site experts', competitorDetail: 'Varies by partner' },
                { feature: 'Ease of Management', zultys: 'High (Web-based)', competitor: 'Low (Complex GUI)', zultysDetail: 'Intuitive admin tools', competitorDetail: 'Requires specialized training' },
                { feature: 'Cost of Ownership', zultys: 'Low', competitor: 'High', zultysDetail: 'Predictable pricing', competitorDetail: 'Expensive maintenance' },
              ]}
            />
          </div>
        </section>

        {/* Deep Dive Content */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none text-slate-700">
                <h2 className="text-4xl font-black text-slate-900 mb-8">Zultys vs. Avaya: Why Migration is the Smart Move for DFW Businesses</h2>
                <p>
                  For years, Avaya was the standard for business telephony. But as the world moves toward <strong>Unified Communications</strong> and remote work, many Dallas-Fort Worth organizations are finding their legacy Avaya systems are holding them back.
                </p>
                
                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Breaking Free from Legacy Hardware</h3>
                <p>
                  Avaya systems often rely on proprietary hardware cards, complex wiring, and expensive maintenance contracts. If a card fails in your Fort Worth office, you might be waiting days for a replacement. <strong>Zultys</strong> runs on modern, standard server hardware or in the cloud, making it much easier to maintain and scale.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. A Unified User Experience</h3>
                <p>
                  Avaya's mobile and desktop applications have historically been fragmented and difficult to use. Zultys' <strong>ZAC (Zultys Advanced Communicator)</strong> provides a single, intuitive interface for everything—voice, video, chat, and presence. This is a game-changer for DFW teams that need to stay connected across multiple locations or from home.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Predictable Costs and ROI</h3>
                <p>
                  Avaya licensing is notoriously complex and can change with every software update. Zultys offers a straightforward, all-in-one licensing model. When you migrate from Avaya to Zultys, you typically see an immediate reduction in monthly maintenance costs and a significant improvement in employee productivity.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Advanced Contact Center Integration</h3>
                <p>
                  For DFW businesses that require more than just basic calling, Zultys offers a fully integrated Contact Center solution. Unlike many Avaya configurations that require separate servers or complex third-party integrations for advanced call center features, Zultys provides real-time wallboards, detailed agent reporting, and sophisticated queuing within the same software ecosystem. This ensures your customer service team in Dallas or Fort Worth has the tools they need without the added complexity.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Local DFW Support and Training</h3>
                <p>
                  When you migrate from Avaya to Zultys with <strong>DFW Business Communications</strong>, you're not just getting a new phone system; you're getting a local partner. We handle the entire migration process, provide on-site training for your staff, and are available for 24/7 emergency support right here in the metroplex. This level of personalized service is something national providers and legacy hardware vendors simply can't match.
                </p>

                <div className="mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Zultys vs. Avaya FAQs</h2>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Can I keep my existing phone numbers when moving from Avaya to Zultys?</h4>
                      <p className="text-slate-600">Yes! We handle the entire number porting process for you, ensuring a seamless transition from your legacy Avaya system to Zultys without any downtime for your DFW business.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Does Zultys support the same features as my Avaya PBX?</h4>
                      <p className="text-slate-600">Zultys not only supports all the standard PBX features you're used to but also adds modern unified communications tools like video conferencing, team chat, and advanced mobile integration that legacy Avaya systems often lack.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">How long does a typical migration from Avaya to Zultys take?</h4>
                      <p className="text-slate-600">Most migrations for DFW businesses can be completed in just a few weeks. Our local team will perform a detailed site audit and create a customized migration plan to ensure a smooth, stress-free transition.</p>
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
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Migration Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/zultys-migration-guide-dfw" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <RefreshCw className="h-10 w-10 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">Migration Guide</h3>
                  <p className="text-slate-600">Our step-by-step process for moving from legacy PBX to Zultys.</p>
                </Card>
              </Link>
              <Link to="/free-voip-site-audit" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">Free Site Audit</h3>
                  <p className="text-slate-600">Let us assess your current Avaya system and network readiness.</p>
                </Card>
              </Link>
              <Link to="/case-studies" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Users className="h-10 w-10 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">Success Stories</h3>
                  <p className="text-slate-600">See how other DFW businesses successfully migrated to Zultys.</p>
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
