import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Video, 
  Users, 
  Monitor, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Shield,
  MessageSquare,
  Share2
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Hero } from '../components/Hero';
import {
  ZULTYS_MXMEETING,
  ZULTYS_FORT_WORTH_BG,
  PEOPLE_ON_CALLS,
  HERO_BACKGROUND,
} from '../constants/images';

export function MXconference() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys MXconference | Video & Web Conferencing Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Zultys MXconference provides HD video conferencing and screen sharing for up to 500 participants. Professional web meetings for businesses in Fort Worth and Dallas.';
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
    metaKeywords.setAttribute('content', 'Zultys MXconference Dallas, video conference software Fort Worth, web meeting DFW, screen sharing Dallas, Zultys webinar software North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-mxconference');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Zultys MXconference / MXmeeting',
      operatingSystem: 'Windows, macOS, Web',
      applicationCategory: 'CommunicationApplication',
      description: 'HD video conferencing and screen sharing solution for Zultys IP PBX systems in Dallas-Fort Worth.',
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
          title={<>Zultys <br /><span className="text-zultys-green">MXconference.</span></>}
          subtitle="HD video conferencing, screen sharing, and collaborative web meetings for up to 500 participants. Connect your DFW team instantly."
          icon={Video}
          iconLabel="Enterprise Web Conferencing"
          buttonText="Schedule a Video Demo"
          onButtonClick={openQuote}
        />

        {/* Collaboration Benefits Section - SaaS Style */}
        <section className="py-24 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">Collaborate Without <span className="text-zultys-green">Boundaries.</span></h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Professional-grade conferencing tools that make remote meetings feel like you're in the same room.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'HD Video & Audio',
                  description: 'Crystal-clear high-definition video and audio for professional meetings and presentations.',
                  icon: Video,
                },
                {
                  title: 'Screen Sharing',
                  description: 'Share your entire screen or specific applications with a single click for effective collaboration.',
                  icon: Monitor,
                },
                {
                  title: 'Interactive Tools',
                  description: 'Utilize whiteboarding, chat, and polling to keep your participants engaged and productive.',
                  icon: Share2,
                },
              ].map((benefit, index) => (
                <Card key={index} className="p-12 border border-gray-100 bg-white hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] transition-all duration-500 group rounded-[2rem]">
                  <div className="p-4 bg-gray-50 rounded-2xl w-fit mb-8 group-hover:bg-zultys-green transition-colors duration-500">
                    <benefit.icon className="h-8 w-8 text-charcoal group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-black text-charcoal mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={PEOPLE_ON_CALLS}
                    alt="Team using Zultys MXconference"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Integrated Web Meetings <br />
                  <span className="text-zultys-green">for DFW Businesses.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    <strong>Zultys MXconference</strong> is a fully integrated component of the Zultys unified communications platform. MXconference provides the tools your team needs to work together effectively, regardless of where they are located.
                  </p>
                  <p className="leading-relaxed mb-8">
                    You can launch a meeting directly from your ZAC desktop client or your MXmobile smartphone app with a single click. Participants can join via a simple web link, with no software download required for guests.
                  </p>
                </div>
                
                <div className="mt-12 grid sm:grid-cols-2 gap-6">
                  {[
                    'HD Video & Audio',
                    'No software download',
                    'Real-time chat',
                    'Meeting recording',
                    'Interactive Whiteboarding',
                    'Enterprise Encryption',
                    'One-click launch'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-charcoal font-bold">
                      <CheckCircle className="h-5 w-5 text-zultys-green" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-none space-y-32">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h3 className="text-3xl font-black text-charcoal mb-8 leading-tight">Professional Video Conferencing Made Simple</h3>
                  <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                    <p className="leading-relaxed mb-6">
                      In a world of remote work and global business, video conferencing has become an essential tool. Zultys MXconference delivers high-definition video and crystal-clear audio that makes your virtual meetings feel as productive as in-person ones.
                    </p>
                    <p className="leading-relaxed">
                      The platform is designed for ease of use. There are no complex codes to remember or difficult software to install. As a host, you have full control over the meeting environment, including the ability to mute participants and manage screen sharing.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100">
                  <h3 className="text-3xl font-black text-charcoal mb-8 leading-tight">Integrated Recording & Archiving</h3>
                  <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                    <p className="leading-relaxed mb-6">
                      For many DFW businesses, maintaining a record of meetings is essential for compliance and training. <strong>MXconference</strong> includes built-in recording capabilities that allow you to capture every aspect of your meeting.
                    </p>
                    <p className="leading-relaxed">
                      You can easily share recordings with participants who were unable to attend, or use them as a resource for future training sessions in your DFW office.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="order-2 lg:order-1 bg-charcoal p-12 rounded-[2.5rem] text-white shadow-2xl">
                  <h3 className="text-3xl font-black mb-8 leading-tight text-white">Collaborative Screen Sharing</h3>
                  <div className="prose prose-lg prose-invert text-white max-w-none">
                    <p className="text-white leading-relaxed mb-6">
                      MXconference's powerful screen sharing capabilities allow you to show exactly what you're talking about. Whether you're presenting a sales deck or providing technical support, screen sharing ensures everyone is on the same page.
                    </p>
                    <p className="text-white leading-relaxed">
                      To keep your participants engaged, MXconference also includes interactive tools like whiteboarding and polling, perfect for brainstorming sessions and training workshops.
                    </p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-3xl font-black text-charcoal mb-8 leading-tight text-right">Advanced Visual Brainstorming</h3>
                  <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none text-right">
                    <p className="leading-relaxed mb-6">
                      Visual collaboration is a powerful way to generate ideas. <strong>Advanced Collaborative Whiteboarding</strong> in MXconference allows DFW teams to sketch, diagram, and annotate in real-time.
                    </p>
                    <p className="leading-relaxed">
                      Participants can contribute simultaneously, making it feel as if you're all standing in front of the same physical whiteboard in a DFW conference room.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-16 rounded-[3rem] border border-gray-100 shadow-xl">
                <h3 className="text-4xl font-black text-charcoal mb-12 text-center">Why Choose DFW Business Communications?</h3>
                <div className="grid md:grid-cols-2 gap-12">
                  {[
                    {
                      title: 'Expert System Integration',
                      desc: 'We ensure that MXconference is perfectly integrated with your Zultys system and your local DFW network.',
                    },
                    {
                      title: 'Comprehensive User Training',
                      desc: 'We provide hands-on training for your team, ensuring they know how to use all the features of MXconference.',
                    },
                    {
                      title: 'Local Support & Assistance',
                      desc: 'Our local Fort Worth support team is ready to help with fast, reliable assistance when you need it most.',
                    },
                    {
                      title: 'Customized Collaboration',
                      desc: 'We work with you to design a conferencing strategy that fits your business needs and North Texas goals.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="group">
                      <h4 className="text-2xl font-black text-zultys-green mb-4 group-hover:translate-x-2 transition-transform duration-300">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-16 text-center pt-12 border-t border-gray-200">
                  <p className="text-3xl font-black text-charcoal mb-4">
                    Call Leroy today at <span className="text-zultys-green">817-231-2962</span>
                  </p>
                  <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">For a Zultys MXconference demo.</p>
                </div>
              </div>
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
