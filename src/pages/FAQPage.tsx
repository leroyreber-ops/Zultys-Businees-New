import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Cloud, 
  Shield, 
  Zap, 
  Users, 
  MessageSquare,
  Search
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND } from '../constants/images';

const faqs = [
  {
    category: 'General Zultys Questions',
    questions: [
      {
        q: 'What is Zultys?',
        a: 'Zultys is a premier provider of Unified Communications (UC) solutions. Their platform integrates voice, video, chat, and presence into a single, easy-to-use interface. Zultys is known for its "all-in-one" architecture, meaning all features run on a single server or cloud instance, simplifying management and improving reliability.'
      },
      {
        q: 'Is Zultys a cloud-based or on-premise system?',
        a: 'Both! Zultys offers total flexibility. You can deploy it as a 100% cloud-based service, an on-premise hardware appliance, or a hybrid of both. This allows DFW businesses to choose the model that best fits their security and infrastructure needs.'
      },
      {
        q: 'How many users can a Zultys system support?',
        a: 'Zultys is highly scalable. The MX-SE is perfect for small offices with up to 50 users, while the MX250 can support up to 250 users per appliance. Multiple appliances can be networked together to support thousands of users across multiple locations.'
      }
    ]
  },
  {
    category: 'Technical & Features',
    questions: [
      {
        q: 'What is ZAC (Zultys Advanced Communicator)?',
        a: 'ZAC is the unified communications application for your desktop (Windows/Mac) and mobile device. It allows you to manage calls, send instant messages, see the presence status of coworkers, and launch video conferences from a single screen.'
      },
      {
        q: 'Does Zultys support remote workers?',
        a: 'Yes, Zultys is built for the modern mobile workforce. With the MXmobile app, your employees can take their office extension with them on their iPhone or Android device, making and receiving calls as if they were sitting at their desk in Dallas or Fort Worth.'
      },
      {
        q: 'Can Zultys integrate with my CRM?',
        a: 'Absolutely. Zultys offers robust integration with popular CRMs like Salesforce, Microsoft Dynamics, and many others. This allows for features like screen pops (showing customer info on incoming calls) and click-to-dial directly from your CRM.'
      }
    ]
  },
  {
    category: 'Local Support & Service',
    questions: [
      {
        q: 'Why should I choose a local DFW Zultys dealer?',
        a: 'Local dealers like DFW Business Communications provide on-site installation, face-to-face training, and rapid emergency support. National providers often rely on remote troubleshooting, which can be frustrating when you have a complex hardware or network issue.'
      },
      {
        q: 'Do you provide training for our staff?',
        a: 'Yes. We believe a phone system is only as good as the people using it. We provide comprehensive on-site or remote training for both end-users and system administrators to ensure your DFW team gets the most out of your Zultys investment.'
      },
      {
        q: 'What happens if my internet goes down?',
        a: 'If you have an on-premise or hybrid Zultys system, your internal communications and paging will continue to work. We can also configure "failover" routes that automatically send incoming calls to mobile devices or a secondary location if your primary Dallas or Fort Worth office loses connectivity.'
      }
    ]
  }
];

export function FAQPage() {
  const { openQuote } = useQuote();
  const [openIndex, setOpenIndex] = useState<string | null>('0-0');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Page Title
    document.title = 'Zultys FAQ | Business Phone System Questions & Answers | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Find answers to common questions about Zultys business phone systems, VoIP, cloud services, and local support in Dallas-Fort Worth.';
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
    metaKeywords.setAttribute('content', 'VoIP FAQ Dallas, business phone questions Fort Worth, Zultys help DFW, cloud PBX FAQ Dallas, business communication answers North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-faq');

    // JSON-LD FAQ Schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.flatMap(cat => cat.questions).map(q => ({
        '@type': 'Question',
        'name': q.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': q.a
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  const toggleFaq = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-blue-500/30">
              <HelpCircle className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Knowledge Base</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys FAQ: <br />
              <span className="text-blue-400">Expert Answers for DFW Business Phone Systems.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Choosing the right communication platform for your Dallas-Fort Worth business 
              often starts with getting the right answers. This comprehensive Zultys FAQ 
              resource addresses the most common questions about unified communications, 
              cloud vs. on-premise deployment, VoIP security, and local DFW support. 
              Whether you're exploring Zultys for the first time or looking to optimize 
              your existing system in Plano, Arlington, or Fort Worth, our expert 
              insights will help you make informed decisions for your organization's 
              connectivity needs.
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input
                type="text"
                placeholder="Search for a question..."
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 pl-16 pr-6 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((category, catIdx) => (
                <div key={catIdx} className="mb-16">
                  <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <div className="h-2 w-8 bg-blue-600 rounded-full"></div>
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, qIdx) => {
                      const index = `${catIdx}-${qIdx}`;
                      const isOpen = openIndex === index;
                      return (
                        <div 
                          key={index} 
                          className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-blue-200 bg-blue-50/30 shadow-sm' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                          <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center justify-between p-6 text-left"
                          >
                            <span className="text-lg font-bold text-slate-900 pr-8">{faq.q}</span>
                            {isOpen ? (
                              <ChevronUp className="h-6 w-6 text-blue-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6 text-slate-600 leading-relaxed text-lg animate-in fade-in slide-in-from-top-2 duration-300">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <HelpCircle className="h-16 w-16 text-slate-200 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-500">Try adjusting your search term or contact us directly.</p>
              </div>
            )}
          </div>
        </section>

        {/* Internal Linking / Resources */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Still Have Questions?</h2>
              <p className="text-xl text-slate-600">Explore our detailed product guides or speak with a local DFW expert.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/products" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full bg-white">
                  <Zap className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Product Catalog</h3>
                  <p className="text-slate-600">Detailed specs for all Zultys MX appliances and ZIP phones.</p>
                </Card>
              </Link>
              <Link to="/solutions" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full bg-white">
                  <Shield className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Industry Solutions</h3>
                  <p className="text-slate-600">See how Zultys fits your specific business sector in North Texas.</p>
                </Card>
              </Link>
              <Link to="/blog" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full bg-white">
                  <MessageSquare className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Zultys Blog</h3>
                  <p className="text-slate-600">In-depth articles on VoIP best practices and industry news.</p>
                </Card>
              </Link>
            </div>

            <div className="mt-24 max-w-4xl mx-auto prose prose-lg text-slate-700">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Deep Dive: Understanding the Zultys Advantage in DFW</h2>
              <p>
                Beyond the basic questions, it's important to understand why Zultys has become a preferred choice for businesses across the Dallas-Fort Worth Metroplex.
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The "All-in-One" Architecture Explained</h3>
              <p>
                One of the most frequent technical questions we receive is about the Zultys architecture. Unlike many competitors that require separate servers for voice, chat, and conferencing, Zultys runs everything on a single, integrated software stream. For DFW IT managers, this means fewer points of failure, easier backups, and a much simpler management interface.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Total Cost of Ownership (TCO)</h3>
              <p>
                When evaluating the cost of a new phone system in Dallas or Fort Worth, it's critical to look at the TCO over 5-10 years. Zultys' energy-efficient hardware, reduced maintenance requirements, and flexible licensing models often result in a significantly lower TCO compared to traditional PBX systems or per-user hosted models that can become expensive as your team grows.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Disaster Recovery and Business Continuity</h3>
              <p>
                North Texas weather can be unpredictable. Zultys provides robust disaster recovery options, including automatic failover to the cloud or secondary physical locations. We work with our DFW clients to design a business continuity plan that ensures your phones stay ringing, even if your primary office loses power or internet connectivity.
              </p>
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
