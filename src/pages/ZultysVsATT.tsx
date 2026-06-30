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

export function ZultysVsATT() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys vs AT&T Business Voice | Better DFW Phone Systems | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Comparing Zultys vs AT&T Business Voice for Dallas-Fort Worth businesses. Discover why Zultys offers superior features, reliability, and local DFW support over AT&T.';
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
    metaKeywords.setAttribute('content', 'Zultys vs AT&T, AT&T business voice alternative, Zultys vs ATT, business phone system Dallas, local DFW VoIP support, Fort Worth phone dealer');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-vs-att-business');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys vs AT&T Business Voice Comparison',
      description: 'A detailed comparison between Zultys and AT&T Business Voice systems for DFW organizations.',
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
              <Wifi className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">ISP vs. Enterprise Voice</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys vs. AT&T Business Voice: <br />
              <span className="text-blue-400">The Smarter VoIP Choice for DFW Enterprises.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Comparing Zultys vs. AT&T Business Voice is a common task for Dallas-Fort Worth IT managers. 
              While AT&T is a household name in telecommunications, their business voice solutions often 
              lack the granular control, advanced features, and personalized local support that Zultys 
              provides. This guide explores why DFW organizations are moving away from the "big telco" 
              model in favor of Zultys' more agile and feature-rich unified communications platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
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
                <h2 className="text-4xl font-black text-slate-900 mb-8">Zultys vs. AT&T Business: Why Your Choice Matters</h2>
                <p>
                  Many DFW businesses choose AT&T Business Voice simply because they already have AT&T internet or mobile services. While bundling is convenient, it often leaves businesses with a "one-size-fits-all" phone system that lacks the power and flexibility needed for growth.
                </p>
                
                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Enterprise Features vs. Basic Dial Tone</h3>
                <p>
                  AT&T's voice service is designed for simplicity. <strong>Zultys</strong> is designed for business performance. With Zultys, you get advanced features like multi-level auto-attendants, sophisticated call recording, and deep CRM integration as standard options, not expensive add-ons.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. The Local Support Advantage</h3>
                <p>
                  When your AT&T phones go down, you're stuck in a national support queue. With <strong>DFW Business Communications</strong>, you have a local partner who can be at your office in Dallas or Fort Worth the same day. We don't just provide a service; we provide a partnership.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Reliability and Survivability</h3>
                <p>
                  AT&T Voice is entirely dependent on your internet connection. Zultys offers <strong>MX series appliances</strong> that provide local survivability. This means your internal communications and critical call routing continue to work even if your internet goes down.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Advanced Call Handling and Queuing</h3>
                <p>
                  AT&T's business voice solutions often provide basic call handling that can be difficult to customize. Zultys, however, offers a sophisticated suite of call routing and queuing tools as standard. Whether you need visual call parking, multi-level auto-attendants, or advanced hunt groups, Zultys provides the flexibility to design a call flow that perfectly matches your DFW business operations.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Seamless CRM Integration</h3>
                <p>
                  In today's data-driven business environment, your phone system should talk to your CRM. Zultys offers deep, native integration with popular platforms like Salesforce, Microsoft Dynamics, and HubSpot. This allows your Dallas-based sales and support teams to see caller info instantly, log calls automatically, and improve overall customer engagement—features that are often complex or expensive to implement with AT&T.
                </p>

                <div className="mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Zultys vs. AT&T Business FAQs</h2>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Is Zultys compatible with AT&T Fiber?</h4>
                      <p className="text-slate-600">Absolutely. Zultys works perfectly over AT&T Fiber and other high-speed DFW internet connections. We can even help you optimize your AT&T circuit for the best possible voice quality.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Why is local support better than AT&T's national support?</h4>
                      <p className="text-slate-600">National providers rely on massive call centers where you are just a ticket number. Our local DFW team knows your specific office layout, your network, and your staff, allowing us to resolve issues much faster.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Can Zultys save my DFW business money over AT&T?</h4>
                      <p className="text-slate-600">In most cases, yes. By eliminating hidden "per-feature" fees and providing a more efficient all-in-one license, Zultys typically offers a lower total cost of ownership over a 3-5 year period.</p>
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
                  <BarChart3 className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Zultys vs. RingCentral</h3>
                  <p className="text-slate-600">Compare Zultys to the leading cloud PBX provider.</p>
                </Card>
              </Link>
              <Link to="/zultys-vs-comcast-business" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Zultys vs. Comcast</h3>
                  <p className="text-slate-600">See how Zultys compares to another major ISP voice provider.</p>
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
