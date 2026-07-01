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
  Database, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Phone, 
  RefreshCw,
  Share2,
  MessageSquare,
  Layout
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, ZULTYS_ZAC_MOBILE_COMBO } from '../constants/images';

const crmIntegrations = [
  { name: 'Salesforce', desc: 'Full integration with Salesforce for click-to-dial, screen pops, and automatic call logging.', icon: Cloud },
  { name: 'Microsoft Dynamics', desc: 'Seamlessly connect your Zultys system with Dynamics 365 for enhanced customer insights.', icon: Layout },
  { name: 'HubSpot', desc: 'Improve sales productivity with HubSpot CRM integration and real-time call tracking.', icon: Zap },
  { name: 'Zoho CRM', desc: 'Streamline your workflows with Zoho CRM and Zultys unified communications.', icon: RefreshCw },
  { name: 'Zendesk', desc: 'Enhance your customer support with Zendesk integration and automatic ticket creation.', icon: MessageSquare },
  { name: 'NetSuite', desc: 'Integrate your ERP and communications for a complete view of your business.', icon: Database }
];

// Re-importing Cloud since it's used in the array
import { Cloud } from 'lucide-react';

export function ZultysCRMIntegration() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Zultys CRM Integration Guide | Salesforce, HubSpot & More | DFW Business Communications';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Learn how to integrate Zultys with Salesforce, HubSpot, Microsoft Dynamics, and other CRMs. Improve productivity and customer service for your DFW business.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-crm-integration-guide');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys CRM Integration Guide',
      description: 'A comprehensive guide to integrating Zultys with popular CRM platforms.',
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
            <img src={HERO_BACKGROUND} alt="Authorized Zultys Partner - Zultys CRM Integration showing Hero Background with Zultys unified communications" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-blue-500/30">
              <Share2 className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Workflow Optimization</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys CRM Integration: <br />
              <span className="text-blue-400">Unify Your Data & Voice.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Stop switching between apps. Integrate Zultys with Salesforce, 
              HubSpot, and other leading CRMs to automate call logging, 
              improve customer service, and boost your DFW team's productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Request an Integration Demo
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

        {/* Integration Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Supported CRM Platforms</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">Zultys offers native and API-based integrations with the world's most popular CRM and ERP systems.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {crmIntegrations.map((crm, i) => (
                <Card key={i} className="p-10 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col items-center text-center group">
                  <div className="p-4 bg-blue-50 rounded-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    <crm.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{crm.name}</h3>
                  <p className="text-slate-600 leading-relaxed">{crm.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why Integrate Zultys with Your CRM?</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    When your phone system and CRM talk to each other, your business becomes more efficient and your customers get a better experience.
                  </p>
                  <ul className="space-y-6 mt-8">
                    {[
                      { title: 'Click-to-Dial', desc: 'Call any contact directly from your CRM with a single click.' },
                      { title: 'Inbound Screen Pops', desc: 'Instantly see customer details and history when they call.' },
                      { title: 'Automatic Call Logging', desc: 'Every call is automatically recorded in the CRM, saving time and improving data accuracy.' },
                      { title: 'Real-Time Analytics', desc: 'Combine communication data with sales data for deeper insights.' },
                      { title: 'Improved Customer Service', desc: 'Personalize every interaction by having the customer\'s history at your fingertips.' }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-black text-slate-900 block mb-1">{item.title}</span>
                          <span className="text-slate-600">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 bg-white p-12">
                  <ImageWithFallback
                    src={ZULTYS_ZAC_MOBILE_COMBO}
                    alt="Zultys CRM Integration Interface"
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
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Integration Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/fort-worth-zultys-zac" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Layout className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Zultys ZAC</h3>
                  <p className="text-slate-600">The desktop application that powers your CRM integrations.</p>
                </Card>
              </Link>
              <Link to="/zultys-user-guides" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Database className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">User Guides</h3>
                  <p className="text-slate-600">Download technical manuals for setting up your CRM integration.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <MessageSquare className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Integration FAQ</h3>
                  <p className="text-slate-600">Get answers to common questions about Zultys and CRM connectivity.</p>
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
