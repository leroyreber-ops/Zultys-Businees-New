import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Smartphone, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Shield,
  MessageSquare,
  Phone,
  Wifi,
  Lock
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Hero } from '../components/Hero';
import {
  ZULTYS_MX_MOBILE,
  ZULTYS_FORT_WORTH_BG,
  ZULTYS_MX_MOBILE_ZAC,
  HERO_BACKGROUND,
} from '../constants/images';

export function MXmobile() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys MXmobile | Business Phone App Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Take your business extension anywhere with Zultys MXmobile. The full-featured mobile app for iPhone and Android for businesses in Fort Worth and Dallas.';
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
    metaKeywords.setAttribute('content', 'Zultys MXmobile Dallas, business phone app Fort Worth, mobile VoIP app DFW, Zultys iPhone app Dallas, Android business phone North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-mxmobile');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Zultys MXmobile',
      operatingSystem: 'iOS, Android',
      applicationCategory: 'CommunicationApplication',
      description: 'Mobile unified communications app for Zultys IP PBX systems, providing full office phone functionality on the go in DFW.',
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
          title={<>Zultys MXmobile: <br /><span className="text-zultys-green">The Ultimate Business Phone App for DFW.</span></>}
          subtitle="Empower your Dallas-Fort Worth workforce with true mobility. Make and receive business calls using your company number, access corporate directories, and collaborate with your team from anywhere in North Texas or around the globe."
          icon={Smartphone}
          iconLabel="Mobile Unified Communications"
          buttonText="Get MXmobile for Your Team"
          onButtonClick={openQuote}
        />

        {/* Mobility Benefits Section - SaaS Style */}
        <section className="py-24 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">True Mobility for the <span className="text-zultys-green">DFW Workforce.</span></h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Stay connected to your office, your team, and your customers no matter where you are.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'One Number Reach',
                  description: 'Make calls from your mobile phone while displaying your business caller ID. Keep your personal number private.',
                  icon: Phone,
                },
                {
                  title: 'Secure Messaging',
                  description: 'Engage in secure, encrypted business chat with your colleagues directly from the app.',
                  icon: MessageSquare,
                },
                {
                  title: 'Seamless Handoff',
                  description: 'Move active calls between your desk phone and your mobile device without interruption.',
                  icon: Wifi,
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
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-gray-100 p-8">
                  <ImageWithFallback
                    src={ZULTYS_MX_MOBILE_ZAC}
                    alt="Zultys MXmobile and ZAC Integration for DFW Businesses"
                    className="w-full h-auto object-contain rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Enterprise Features on <br />
                  <span className="text-zultys-green">Your Smartphone.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    <strong>Zultys MXmobile</strong> is a full-featured unified communications client for your iPhone or Android device. Your business shouldn't be tied to a desk.
                  </p>
                  <p className="leading-relaxed mb-8">
                    Whether you're commuting through Dallas traffic or meeting a client in downtown Fort Worth, MXmobile ensures you have the full power of your office phone system in the palm of your hand.
                  </p>
                </div>
                
                <div className="mt-12 grid sm:grid-cols-2 gap-6">
                  {[
                    'Real-time Presence',
                    'Visual Voicemail',
                    'Corporate Directory',
                    'Call Transfer & Park',
                    'Secure Business Chat',
                    'One-Number Reach',
                    'Call Handoff',
                    'Bluetooth Support'
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
              <div className="grid lg:grid-cols-2 gap-20 items-start">
                <div>
                  <h3 className="text-3xl font-black text-charcoal mb-8 leading-tight">Stay Connected Anywhere in DFW</h3>
                  <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                    <p className="leading-relaxed mb-6">
                      The Dallas-Fort Worth area is vast, and business often takes you away from the office. Zultys MXmobile is designed to bridge that gap. By utilizing your smartphone's data connection, MXmobile provides a high-quality voice connection integrated with your Zultys system.
                    </p>
                    <p className="leading-relaxed">
                      This means you can participate in call queues, handle customer inquiries, and collaborate with your team as if you were sitting at your desk in Fort Worth.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100">
                  <h3 className="text-3xl font-black text-charcoal mb-8 leading-tight text-right">Secure & Encrypted Communications</h3>
                  <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none text-right">
                    <p className="leading-relaxed mb-6">
                      Security is a major concern when using mobile devices for professional communication. Zultys MXmobile utilizes enterprise-grade encryption for all voice and data traffic.
                    </p>
                    <p className="leading-relaxed">
                      This ensures your sensitive business conversations and messages are protected, providing peace of mind for DFW companies in regulated industries.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-charcoal text-white p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-zultys-green/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-zultys-green/20 transition-colors duration-700"></div>
                <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                  <div>
                    <h3 className="text-4xl font-black mb-8 leading-tight text-white">Seamless Integration with ZAC and Desk Phones</h3>
                    <div className="prose prose-lg prose-invert text-white max-w-none">
                      <p className="text-white leading-relaxed mb-8">
                        One of the most powerful features of MXmobile is its ability to work in harmony with your other Zultys tools. With the "Call Handoff" feature, you can start a call on your mobile phone and seamlessly move it to your desk phone.
                      </p>
                      <p className="text-white leading-relaxed">
                        This level of integration extends to your presence status as well. When you're on a call on your mobile app, your colleagues will see you as "Busy" on their ZAC desktop clients.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: Smartphone, title: 'Mobile UC', desc: 'Full office features on the go.' },
                      { icon: Zap, title: 'Call Handoff', desc: 'Move calls between devices.' },
                      { icon: MessageSquare, title: 'Secure IM', desc: 'Encrypted business chat.' },
                      { icon: Globe, title: 'Global Reach', desc: 'Work from anywhere.' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <item.icon className="h-10 w-10 text-zultys-green mb-4" />
                        <h4 className="text-xl font-black mb-2 text-white">{item.title}</h4>
                        <p className="text-sm text-white leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h3 className="text-3xl font-black text-charcoal mb-8 leading-tight">Mobile Workforce Management</h3>
                  <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                    <p className="leading-relaxed mb-6">
                      Managing a mobile workforce requires visibility. <strong>Mobile Workforce Management</strong> in Zultys MXmobile provide DFW managers with the tools they need to oversee their distributed team effectively.
                    </p>
                    <p className="leading-relaxed">
                      Track mobile call activity, monitor agent availability, and analyze communication patterns across your North Texas organization.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100">
                  <h3 className="text-3xl font-black text-charcoal mb-8 leading-tight">Empowering the Hybrid Workforce</h3>
                  <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                    <p className="leading-relaxed mb-6">
                      The modern workforce is increasingly distributed. For DFW businesses that offer hybrid work options, MXmobile ensures employees are just as productive at home as they are in the office.
                    </p>
                    <p className="leading-relaxed">
                      By providing a single, unified interface for voice, video, and chat, MXmobile fosters collaboration and keeps teams connected, regardless of location.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-16 rounded-[3rem] border border-gray-100 shadow-xl">
                <h3 className="text-4xl font-black text-charcoal mb-12 text-center">Why Partner with DFW Business Communications?</h3>
                <div className="grid md:grid-cols-2 gap-12">
                  {[
                    {
                      title: 'Expert Mobile Configuration',
                      desc: 'We ensure your network and firewall are correctly configured for secure, high-quality mobile voice traffic throughout DFW.',
                    },
                    {
                      title: 'Comprehensive Mobile Training',
                      desc: 'We provide detailed training for your mobile employees, ensuring they know how to use all the features of MXmobile.',
                    },
                    {
                      title: 'Local Support & Troubleshooting',
                      desc: 'Our local Fort Worth support team is ready to help with fast, reliable troubleshooting to keep your mobile workforce connected.',
                    },
                    {
                      title: 'Customized Mobility Solutions',
                      desc: 'We work with you to design a mobility strategy that fits your business needs, whether you have a few remote workers or a large field team.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="group">
                      <h4 className="text-2xl font-black text-zultys-green mb-4 group-hover:translate-x-2 transition-transform duration-300">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-16 text-center pt-12 border-t border-gray-200">
                  <p className="text-3xl font-black text-charcoal mb-8">
                    Ready to empower your DFW mobile team?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Button
                      size="lg"
                      onClick={openQuote}
                      className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-12 py-8 shadow-2xl hover:shadow-zultys-green/20 transition-all font-bold"
                    >
                      Schedule Your Mobility Consultation
                    </Button>
                    <p className="text-xl text-gray-500 font-bold">
                      Or call Leroy at <span className="text-zultys-green">817-231-2962</span>
                    </p>
                  </div>
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
