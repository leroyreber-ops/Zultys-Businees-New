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
import { CheckCircle, ArrowRight, Shield, Zap, Users, BarChart3, MessageSquare, Phone, Globe, Wifi } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, ZULTYS_ZAC_MOBILE_COMBO } from '../constants/images';

export function ZultysVsComcast() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys vs Comcast Business Voice | Better DFW Phone Systems | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Comparing Zultys vs Comcast Business Voice for Dallas-Fort Worth businesses. Discover why Zultys offers superior features, reliability, and local DFW support over ISP-provided voice.';
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
    metaKeywords.setAttribute('content', 'Zultys vs Comcast, Comcast Business Voice alternative Dallas, Zultys vs Comcast DFW, business phone system Fort Worth, VoIP comparison North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-vs-comcast-business');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys vs Comcast Business Voice Comparison',
      description: 'A detailed comparison between Zultys and Comcast Business Voice systems for DFW organizations.',
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
              <Wifi className="h-5 w-5 text-red-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">ISP vs. Enterprise Voice</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys vs. Comcast Business Voice: <br />
              <span className="text-red-400">The Enterprise-Grade Choice for DFW Businesses.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              When evaluating Zultys vs. Comcast Business Voice for your Dallas-Fort Worth organization, 
              it's important to distinguish between a basic ISP add-on and a professional unified 
              communications platform. While Comcast provides reliable internet, their voice services 
              often lack the depth, flexibility, and local DFW support that growing businesses require. 
              This guide breaks down why Zultys is the smarter investment for North Texas companies 
              that need more than just a dial tone.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-red-600 hover:bg-red-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Get a Professional Voice Quote
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
                'Enterprise-grade PBX features (not a basic add-on)',
                'Superior local survivability with MX appliances',
                'Flexible Cloud, On-Premise, or Hybrid deployment',
                'Truly unified application (ZAC) for all features',
                'Local DFW-based installation and 24/7 support',
                'Direct coordination with your ISP for optimization'
              ]}
              competitorDisadvantages={[
                'Basic feature set designed for small/simple needs',
                'Limited local survivability (Cloud-only)',
                'Support is primarily through a massive call center',
                'Proprietary hardware can be limiting',
                'Often bundled with internet, making it hard to switch',
                'Frequent price increases after initial contract'
              ]}
              features={[
                { feature: 'Feature Depth', zultys: 'Enterprise PBX', competitor: 'Basic Voice', zultysDetail: 'Advanced routing/queuing', competitorDetail: 'Simple call handling' },
                { feature: 'Local Survivability', zultys: 'High (MX Series)', competitor: 'Low (Cloud Only)', zultysDetail: 'Works without internet', competitorDetail: 'Requires internet' },
                { feature: 'Local DFW Support', zultys: true, competitor: false, zultysDetail: 'On-site in DFW', competitorDetail: 'Call center only' },
                { feature: 'Deployment Options', zultys: 'Cloud/On-Prem/Hybrid', competitor: 'Cloud Only', zultysDetail: 'Total flexibility', competitorDetail: 'Cloud-locked' },
                { feature: 'Unified Comms', zultys: 'Truly Unified (ZAC)', competitor: 'Fragmented', zultysDetail: 'One app for everything', competitorDetail: 'Multiple apps/portals' },
              ]}
            />
          </div>
        </section>

        {/* Deep Dive Content */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none text-slate-700">
                <h2 className="text-4xl font-black text-slate-900 mb-8">Zultys vs. Comcast Business: Why Your Choice Matters</h2>
                <p>
                  Many DFW businesses choose Comcast Business Voice simply because they already have Comcast internet. While bundling is convenient, it often leaves businesses with a "one-size-fits-all" phone system that lacks the power and flexibility needed for growth.
                </p>
                
                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Enterprise Features vs. Basic Dial Tone</h3>
                <p>
                  Comcast's voice service is designed for simplicity. <strong>Zultys</strong> is designed for business performance. With Zultys, you get advanced features like multi-level auto-attendants, sophisticated call recording, and deep CRM integration as standard options, not expensive add-ons.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. The Local Support Advantage</h3>
                <p>
                  When your Comcast phones go down, you're stuck in a national support queue. With <strong>DFW Business Communications</strong>, you have a local partner who can be at your office in Dallas or Fort Worth the same day. We don't just provide a service; we provide a partnership.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Reliability and Survivability</h3>
                <p>
                  Comcast Voice is entirely dependent on your internet connection. Zultys offers <strong>MX series appliances</strong> that provide local survivability. This means your internal communications and critical call routing continue to work even if your internet goes down.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Advanced Unified Communications (UC) Tools</h3>
                <p>
                  Comcast's voice platform is often fragmented, requiring different apps or portals for different tasks. Zultys' <strong>ZAC (Zultys Advanced Communicator)</strong> is a truly unified application that brings voice, video, chat, and presence into a single, intuitive interface. For DFW teams that need to stay productive across multiple offices or from home, this level of integration is a significant advantage over basic ISP voice services.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Scalability Without the "ISP Headache"</h3>
                <p>
                  Scaling a phone system with a major ISP like Comcast can often involve long wait times, complex contract changes, and limited hardware options. Zultys is designed for rapid growth. Whether you're adding five users in Plano or fifty in Fort Worth, our local team can scale your system instantly, ensuring your communications infrastructure always keeps pace with your business.
                </p>

                <div className="mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Zultys vs. Comcast Business FAQs</h2>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Can I use Zultys if I have Comcast internet?</h4>
                      <p className="text-slate-600">Yes! Zultys works exceptionally well over Comcast Business internet. In fact, many of our DFW clients use Comcast for data while relying on Zultys for their critical voice communications.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">How does Zultys' local support compare to Comcast?</h4>
                      <p className="text-slate-600">Comcast support is a massive, national operation. When you have a voice issue, you're often stuck in a long queue. Our local DFW team provides personalized, same-day support and knows your network inside and out.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Is Zultys more expensive than Comcast Voice?</h4>
                      <p className="text-slate-600">While Comcast may offer low introductory bundles, their long-term costs can be higher due to hidden fees and limited features. Zultys provides a more predictable, all-in-one licensing model that typically offers better value for DFW businesses.</p>
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
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Explore More Comparisons</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/zultys-vs-ringcentral" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <BarChart3 className="h-10 w-10 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">Zultys vs. RingCentral</h3>
                  <p className="text-slate-600">Compare Zultys to the leading cloud PBX provider.</p>
                </Card>
              </Link>
              <Link to="/zultys-vs-spectrum-business" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">Zultys vs. Spectrum</h3>
                  <p className="text-slate-600">See how Zultys compares to another major ISP voice provider.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <MessageSquare className="h-10 w-10 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">Zultys FAQ</h3>
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
