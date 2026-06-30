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
  BookOpen, 
  Search, 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Phone, 
  Globe, 
  Cloud, 
  Server,
  Network
} from 'lucide-react';
import { HERO_BACKGROUND } from '../constants/images';

const glossaryTerms = [
  {
    term: 'Auto-Attendant',
    definition: 'A voice menu system that allows callers to be routed to a specific extension or department without the help of a human operator or receptionist. Essential for DFW businesses looking to professionalize their call handling.'
  },
  {
    term: 'Bandwidth',
    definition: 'The amount of data that can be transmitted over an internet connection in a given amount of time. High-quality VoIP in Dallas or Fort Worth requires stable, sufficient bandwidth to prevent call drops.'
  },
  {
    term: 'Cloud PBX',
    definition: 'A business phone system that is hosted in the cloud, eliminating the need for on-premise hardware and reducing maintenance costs for North Texas organizations.'
  },
  {
    term: 'Direct Inward Dialing (DID)',
    definition: 'A feature that allows an organization to allocate individual phone numbers to each person or workstation without requiring a separate physical phone line for each.'
  },
  {
    term: 'Find Me/Follow Me',
    definition: 'A feature that allows a user to receive calls at any location and on any device. Calls can be routed to a desk phone, mobile app, or home office in Plano or Arlington sequentially or simultaneously.'
  },
  {
    term: 'IP Phone',
    definition: 'A telephone that uses internet protocols to transmit voice data, rather than traditional analog or digital phone lines. Modern Zultys IP phones provide HD audio and advanced feature integration.'
  },
  {
    term: 'IVR (Interactive Voice Response)',
    definition: 'An advanced auto-attendant that can interact with callers through voice or keypad inputs to provide information or route calls based on complex logic.'
  },
  {
    term: 'Jitter',
    definition: 'A variation in the delay of received packets, which can cause audio distortion or "choppiness" in VoIP calls. Proper network optimization in your DFW office can eliminate jitter.'
  },
  {
    term: 'Latency',
    definition: 'The time it takes for a voice packet to travel from one point to another. High latency can cause noticeable delays in conversation, often referred to as "lag."'
  },
  {
    term: 'Mobile Twinning',
    definition: 'A feature that allows your business extension to ring on your desk phone and your mobile device (like the ZAC app) at the same time.'
  },
  {
    term: 'Presence',
    definition: 'A feature that allows users to see the real-time status of their coworkers (e.g., Available, Busy, On a Call, Away), improving collaboration for remote DFW teams.'
  },
  {
    term: 'QoS (Quality of Service)',
    definition: 'A set of network protocols that prioritize voice traffic over data traffic to ensure high call quality even during periods of heavy internet usage.'
  },
  {
    term: 'SIP Trunking',
    definition: 'A method of delivering voice and media services over the internet to an on-premise IP PBX system, often replacing traditional PRI or analog lines.'
  },
  {
    term: 'Softphone',
    definition: 'A software application (like Zultys Advanced Communicator) that allows you to make and receive business calls from your computer or mobile device without a physical desk phone.'
  },
  {
    term: 'Unified Communications (UC)',
    definition: 'The integration of multiple communication methods, such as voice, video, instant messaging, and presence, into a single, cohesive platform.'
  },
  {
    term: 'VoIP (Voice over Internet Protocol)',
    definition: 'A technology that allows you to make voice calls using a broadband internet connection instead of a regular phone line, providing more features at a lower cost.'
  }
];

export function VoIPGlossary() {
  const { openQuote } = useQuote();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Page Title
    document.title = 'VoIP Glossary | Business Phone System Terms & Definitions | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Understand the key terms of business communications with our VoIP glossary. Definitions for SIP, PBX, Unified Communications, and more for DFW businesses.';
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
    metaKeywords.setAttribute('content', 'VoIP terms Dallas, business phone glossary Fort Worth, unified communications definitions DFW, Zultys terminology North Texas, telecom jargon explained, VoIP dictionary Dallas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/voip-glossary');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'VoIP and Business Communications Glossary',
      description: 'A comprehensive glossary of terms related to VoIP and unified communications.',
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

  const filteredTerms = glossaryTerms.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <BookOpen className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Educational Resource</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              VoIP Glossary: <br />
              <span className="text-blue-400">The Definitive Guide to Business Phone Terms.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Navigating the world of modern business communications can be challenging with all 
              the technical jargon. This comprehensive VoIP glossary provides clear, 
              plain-English definitions for the most important terms in unified 
              communications, SIP trunking, and cloud PBX technology. Whether you're a 
              business owner in Dallas or an IT manager in Fort Worth, this guide will help 
              you master the terminology and make informed decisions about your organization's 
              communication infrastructure.
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input
                type="text"
                placeholder="Search for a term..."
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 pl-16 pr-6 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Glossary Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTerms.length > 0 ? (
                filteredTerms.map((item, i) => (
                  <Card key={i} className="p-8 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col">
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{item.term}</h3>
                    <p className="text-slate-600 leading-relaxed flex-1">{item.definition}</p>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <Search className="h-16 w-16 text-slate-200 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No terms found</h3>
                  <p className="text-slate-500">Try adjusting your search term.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Internal Linking Section */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Put Your Knowledge to Work</h2>
              <p className="text-xl text-slate-600">See how these technologies power Zultys business phone systems.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/fort-worth-zultys-mx-series" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full bg-white">
                  <Server className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Zultys MX Series</h3>
                  <p className="text-slate-600">The powerful IP PBX hardware that runs it all.</p>
                </Card>
              </Link>
              <Link to="/fort-worth-zultys-cloud-services" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full bg-white">
                  <Cloud className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Cloud Services</h3>
                  <p className="text-slate-600">Hosted VoIP solutions for maximum flexibility.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full bg-white">
                  <Phone className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Zultys FAQ</h3>
                  <p className="text-slate-600">Common questions about implementing these technologies.</p>
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
