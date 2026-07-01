import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Monitor, 
  MessageSquare, 
  Video, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Zap,
  Shield,
  Layout,
  MousePointer2
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Hero } from '../components/Hero';
import {
  ZULTYS_MXIE,
  ZULTYS_FORT_WORTH_BG,
  ZULTYS_ZAC_MOBILE_COMBO,
  HERO_BACKGROUND,
} from '../constants/images';

export function ZAC() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys ZAC | Zultys Advanced Communicator Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Zultys Advanced Communicator (ZAC) is the ultimate desktop interface for unified communications. Manage calls, chat, and video in Fort Worth and Dallas.';
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
    metaKeywords.setAttribute('content', 'Zultys ZAC Dallas, Zultys desktop app Fort Worth, unified communications software DFW, Zultys Advanced Communicator Dallas, business chat software North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-zac');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Zultys Advanced Communicator (ZAC)',
      operatingSystem: 'Windows, macOS',
      applicationCategory: 'CommunicationApplication',
      description: 'Unified communications desktop client for Zultys IP PBX systems, providing chat, video, and call control in DFW.',
      offers: {
        '@type': 'Offer',
        areaServed: 'Dallas-Fort Worth'
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Zultys <br /><span className="text-zultys-green">ZAC.</span></>}
          subtitle="The ultimate control center for your business communications. Manage voice, video, chat, and presence from a single window."
          icon={Monitor}
          iconLabel="Unified Desktop Client"
          buttonText="Request a ZAC Demo"
          onButtonClick={openQuote}
        />

        {/* Features Section - SaaS Style */}
        <section className="py-24 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">One Window, <span className="text-zultys-green">Infinite Possibilities.</span></h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                ZAC streamlines your workflow by bringing all your communication tools together.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'Real-Time Presence',
                  description: 'See at a glance who is available, on a call, or in a meeting across your DFW organization.',
                  icon: Users,
                },
                {
                  title: 'Secure Instant Messaging',
                  description: 'Engage in one-on-one or group chats with colleagues, including file sharing and history.',
                  icon: MessageSquare,
                },
                {
                  title: 'Drag-and-Drop Control',
                  description: 'Transfer calls, initiate conferences, and manage your voicemail with simple mouse movements.',
                  icon: MousePointer2,
                },
              ].map((feature, index) => (
                <Card key={index} className="p-12 border border-gray-100 bg-white hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] transition-all duration-500 group rounded-[2rem]">
                  <div className="p-4 bg-gray-50 rounded-2xl w-fit mb-8 group-hover:bg-zultys-green transition-colors duration-500">
                    <feature.icon className="h-8 w-8 text-charcoal group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-black text-charcoal mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section 1: Introduction - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Zultys Advanced Communicator (ZAC): <span className="text-zultys-green">Your Desktop Control Center.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    In the modern business environment, the desktop is the hub of all activity. The <strong>Zultys Advanced Communicator (ZAC)</strong> is designed to be the primary interface for all your business communications.
                  </p>
                  <p className="leading-relaxed mb-8">
                    ZAC is not just a "softphone"; it is a comprehensive Unified Communications (UC) client that integrates seamlessly with the Zultys MX series IP PBX.
                  </p>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <h3 className="text-2xl font-black text-charcoal mb-4">The Collaborative Advantage</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    By providing a unified platform for all communication channels, ZAC empowers DFW teams to work more cohesively. Whether your staff is in Dallas or Fort Worth, ZAC ensures everyone is on the same page.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gray-50 p-8 border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_MXIE}
                    alt="Zultys ZAC Unified Communications Desktop Client"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 2: The Unified Interface - SaaS Style */}
        <section className="py-32 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">One Window, <span className="text-zultys-gold">Infinite Possibilities.</span></h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                ZAC streamlines your workflow by bringing all your communication tools together into a single, cohesive interface.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {[
                {
                  title: 'Reduced Context Switching',
                  desc: 'No more jumping between your phone, your email, and your chat app. Everything is in one place.',
                },
                {
                  title: 'Consistent User Experience',
                  desc: 'The same intuitive controls are used for voice, video, and chat, making the system easy to learn.',
                },
                {
                  title: 'Improved Visibility',
                  desc: 'See all your active communications at a glance, including call history and voicemails.',
                },
                {
                  title: 'Enhanced Productivity',
                  desc: 'Spend less time managing your tools and more time communicating with your team.',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
                  <h3 className="text-2xl font-black text-charcoal mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section 3: Presence Awareness - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-charcoal p-12 border border-white/10">
                  <ImageWithFallback
                    src={ZULTYS_ZAC_MOBILE_COMBO}
                    alt="Zultys ZAC Presence and Collaboration"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Presence Awareness: <br />
                  <span className="text-zultys-green">Know Before You Call.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    One of the most powerful features of <strong>ZAC</strong> is real-time presence awareness. See instantly if a colleague is available, on a call, or in a meeting.
                  </p>
                  <ul className="space-y-8 mt-10 list-none pl-0">
                    {[
                      { title: 'Eliminate Phone Tag', desc: "Don't waste time calling someone who is already on the phone." },
                      { title: 'Improve Collaboration', desc: 'Quickly find an available expert to help with a customer question.' },
                      { title: 'Manage Remote Teams', desc: 'Stay connected with your remote employees and know when they are available.' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-6 group">
                        <div className="p-3 bg-zultys-green/10 rounded-xl group-hover:bg-zultys-green transition-colors duration-500">
                          <CheckCircle className="h-6 w-6 text-zultys-green group-hover:text-white transition-colors duration-500" />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-charcoal mb-1">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

                  {/* Detailed Content Section 4: Advanced Call Handling - SaaS Style */}
        <section className="py-32 bg-charcoal text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-zultys-green/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-zultys-green/20 transition-colors duration-700"></div>
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white">Advanced Call Handling & Softphone Capabilities</h2>
              <p className="text-xl text-white leading-relaxed">
                ZAC turns your computer into a powerful communication hub, giving you total control over every call.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-20">
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p className="text-white leading-relaxed mb-8">
                  While ZAC integrates perfectly with your Zultys ZIP desk phone, it is also a fully capable softphone. This means you can make and receive calls directly through your computer using a headset.
                </p>
                <p className="text-white leading-relaxed">
                  The call handling capabilities within <strong>ZAC</strong> are truly enterprise-grade. You can transfer calls with a simple drag-and-drop and initiate conferences with a single click.
                </p>
              </div>
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p className="text-white leading-relaxed mb-8">
                  One of the most appreciated features for DFW businesses is ZAC's integrated call recording management. Start, stop, and archive recordings with a single click.
                </p>
                <p className="text-white leading-relaxed">
                  At DFW Business Communications, we ensure that your <strong>Zultys Advanced Communicator</strong> is configured to provide the best possible audio quality and reliability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 5: Instant Messaging - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Secure, Enterprise-Grade <span className="text-zultys-green">Instant Messaging.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    The <strong>Zultys Advanced Communicator</strong> includes a built-in, secure instant messaging platform designed specifically for the enterprise.
                  </p>
                  <p className="leading-relaxed mb-8">
                    ZAC's IM feature allows for one-on-one chats as well as persistent group rooms for team collaboration. All conversations are encrypted and stored securely on your own server.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: MessageSquare, title: 'Group Chat', desc: 'Create persistent rooms for team projects.' },
                  { icon: Zap, title: 'File Sharing', desc: 'Securely send documents through chat.' },
                  { icon: Shield, title: 'Encrypted', desc: 'All messages are encrypted and secure.' },
                  { icon: Layout, title: 'History', desc: 'Easily search and review past conversations.' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500 text-center group">
                    <item.icon className="h-12 w-12 text-zultys-green mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
                    <h4 className="text-xl font-black text-charcoal mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 7: CRM Integration - SaaS Style */}
        <section className="py-32 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  CRM Integration: Powering Your <span className="text-zultys-gold">Sales & Support.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    The <strong>Zultys Advanced Communicator</strong> can be integrated with a wide range of popular CRM systems, including Salesforce and Microsoft Dynamics.
                  </p>
                  <p className="leading-relaxed mb-8">
                    Even more powerful is ZAC's "screen pop" capability. When a customer calls, ZAC can automatically search your CRM and display the caller's record before you even answer.
                  </p>
                </div>
              </div>
              <div className="bg-charcoal rounded-[3rem] p-16 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-zultys-gold/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-zultys-gold/20 transition-colors duration-700"></div>
                <MousePointer2 className="h-16 w-16 text-zultys-gold mb-8 relative z-10" />
                <h3 className="text-3xl font-black mb-8 relative z-10">Productivity Boosters</h3>
                <ul className="space-y-6 relative z-10">
                  {[
                    'Click-to-Dial from Any Application',
                    'Inbound Caller ID Screen Pops',
                    'Microsoft Outlook Integration',
                    'Customizable Hotkeys',
                    'Integrated Directory Search'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 group/item">
                      <CheckCircle className="h-6 w-6 text-zultys-gold group-hover/item:scale-110 transition-transform" />
                      <span className="text-lg font-bold text-white group-hover/item:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 8: Why Choose DFW Business Communications - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8">Your Local Zultys ZAC Experts</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Implementing a Unified Communications solution like ZAC is about more than just installing software; it's about changing the way your business communicates.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 mb-20">
              <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100">
                <h3 className="text-3xl font-black text-charcoal mb-6">Seamless Mobile Integration</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  <strong>Seamless Mobile Integration</strong> is a cornerstone of the ZAC experience. The ZAC mobile app brings the full power of your office phone system to your smartphone, keeping your North Texas team productive on the go.
                </p>
              </div>
              <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100">
                <h3 className="text-3xl font-black text-charcoal mb-6">Enterprise-Grade Security</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We prioritize <strong>Enterprise-Grade Security</strong> in every ZAC implementation. ZAC leverages advanced encryption to ensure that your voice calls and instant messages remain private and protected.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { icon: Monitor, title: 'Expert Implementation', desc: 'We ensure ZAC is perfectly integrated with your network.' },
                { icon: Users, title: 'Personalized Training', desc: 'We provide hands-on training tailored to your DFW team.' },
                { icon: Shield, title: 'Local DFW Support', desc: 'Our Fort Worth based team is always here to help.' },
              ].map((item, i) => (
                <div key={i} className="text-center p-10 bg-white rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all duration-500 group">
                  <item.icon className="h-12 w-12 text-zultys-green mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h4 className="text-2xl font-black text-charcoal mb-4">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
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
