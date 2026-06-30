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

export function ZultysVsCisco() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys vs Cisco Webex | Enterprise VoIP for DFW | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Comparing Zultys vs Cisco Webex for Dallas-Fort Worth organizations. See why Zultys offers better telephony features, simpler management, and superior local support.';
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
    metaKeywords.setAttribute('content', 'Zultys vs Cisco, Cisco Webex alternative Dallas, Zultys vs Webex DFW, enterprise phone system Fort Worth, VoIP comparison North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-vs-cisco-webex');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys vs Cisco Webex Comparison',
      description: 'A detailed comparison between Zultys and Cisco Webex phone systems for DFW organizations.',
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
              <span className="text-sm font-bold text-white uppercase tracking-widest">Enterprise Comparison</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys vs. Cisco Webex: <br />
              <span className="text-blue-400">The Ultimate Enterprise VoIP Comparison for DFW.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              When comparing Zultys vs. Cisco Webex for your Dallas-Fort Worth enterprise, the choice often 
              comes down to complexity vs. performance. While Cisco is a global leader in networking, 
              their Webex platform can be overly complex and expensive for many DFW organizations. 
              Zultys delivers the same enterprise-grade power with a more intuitive interface, 
              superior local survivability, and the personalized support of a local North Texas partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Get an Enterprise Quote
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
              productName="Zultys MX Series"
              zultysAdvantages={[
                'Purpose-built for telephony (not a meeting app add-on)',
                'Single, intuitive application for all UC features (ZAC)',
                'True hybrid deployment for local survivability',
                'Lower total cost of ownership (no complex licensing)',
                'Local DFW-based installation and 24/7 support',
                'Integrated Contact Center included in core software'
              ]}
              competitorDisadvantages={[
                'Complex architecture often requiring multiple servers',
                'User interface can be cluttered and confusing',
                'Expensive licensing tiers and hardware requirements',
                'Primarily cloud-focused (limited local control)',
                'Support is often global and difficult to reach',
                'Requires specialized Cisco-certified staff to manage'
              ]}
              features={[
                { feature: 'Primary Focus', zultys: 'Business Voice', competitor: 'Meetings/Video', zultysDetail: 'Telephony first', competitorDetail: 'Video first' },
                { feature: 'Ease of Use', zultys: 'High', competitor: 'Moderate', zultysDetail: 'Clean, simple UI', competitorDetail: 'Complex feature set' },
                { feature: 'Local DFW Support', zultys: true, competitor: false, zultysDetail: 'On-site in DFW', competitorDetail: 'Remote only' },
                { feature: 'Deployment Flexibility', zultys: 'Cloud/On-Prem/Hybrid', competitor: 'Cloud Only', zultysDetail: 'Total control', competitorDetail: 'Cloud-locked' },
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
                <h2 className="text-4xl font-black text-slate-900 mb-8">Zultys vs. Cisco Webex: Why DFW Enterprises are Choosing Zultys</h2>
                <p>
                  Cisco Webex is a powerful tool, but for many Dallas-Fort Worth organizations, it's "too much system" for their actual needs. When comparing <strong>Zultys vs Cisco Webex</strong>, the focus is on finding the right balance between enterprise power and operational simplicity.
                </p>
                
                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Telephony-First Architecture</h3>
                <p>
                  Webex started as a meeting tool and added phone features later. <strong>Zultys</strong> was built from the ground up as a business phone system. This means the call handling, routing, and queuing features are more robust and intuitive than what you'll find in Webex.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Local Survivability and Control</h3>
                <p>
                  Cisco Webex is primarily a cloud service. If your internet connection in Arlington or Plano fails, your phones are affected. Zultys offers the MX series of appliances that provide local survivability, ensuring your internal communications continue to work even if the cloud is unreachable.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. The Advantage of Local Support</h3>
                <p>
                  Cisco support is a global operation. When you have a problem, you're just a ticket number. With <strong>DFW Business Communications</strong>, you have a local partner who knows your network and can be at your office the same day. We provide personalized training and on-site support that national providers can't match.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Simplified Licensing and Lower TCO</h3>
                <p>
                  Cisco's licensing models are notoriously complex, often requiring various tiers for different features and users. Zultys offers a straightforward, all-in-one licensing model that includes enterprise-grade features like call recording and advanced analytics as standard. This simplicity leads to a significantly lower Total Cost of Ownership (TCO) for DFW businesses over a 3-5 year period.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Superior Mobile Integration for DFW Teams</h3>
                <p>
                  In the fast-paced DFW business environment, your team needs to be reachable anywhere. Zultys' <strong>MXmobile</strong> app provides a more seamless and stable mobile experience than the Webex app, with better call handover between Wi-Fi and cellular networks. Whether your team is in the office in Dallas or on the road in Fort Worth, Zultys keeps them connected.
                </p>

                <div className="mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Zultys vs. Cisco Webex FAQs</h2>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Is Zultys as secure as Cisco Webex?</h4>
                      <p className="text-slate-600">Yes. Zultys employs enterprise-grade encryption and security protocols for all voice and data traffic. For DFW businesses with high security requirements, our on-premise appliances provide even greater control over your communication data.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Can Zultys integrate with my existing Cisco hardware?</h4>
                      <p className="text-slate-600">Zultys is highly compatible with standard SIP-based hardware. Our DFW technical team can evaluate your current Cisco phones and infrastructure to see if they can be integrated into a new Zultys system.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">How does Zultys handle multi-location DFW businesses?</h4>
                      <p className="text-slate-600">Zultys is designed for multi-site organizations. We can link your offices in Dallas, Fort Worth, and beyond into a single, unified system with centralized management and seamless inter-office calling.</p>
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
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Explore More Enterprise Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/fort-worth-zultys-enterprise" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Globe className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Enterprise Solutions</h3>
                  <p className="text-slate-600">See how Zultys scales for large DFW organizations.</p>
                </Card>
              </Link>
              <Link to="/fort-worth-zultys-mx-series" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">MX Series Systems</h3>
                  <p className="text-slate-600">The powerful all-in-one Zultys communication servers.</p>
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
