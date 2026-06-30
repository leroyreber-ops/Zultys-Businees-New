import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Phone,
  Cloud,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Users,
  BarChart3,
  Globe,
  MessageSquare,
  Video,
  Server,
  MapPin,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Hero } from '../components/Hero';
import { ReadMore } from '../components/ReadMore';
import {
  ZULTYS_IP_PHONES_BG,
  ZULTYS_ZAC_MOBILE_COMBO,
  ZULTYS_CLOUD_SERVICES,
  ZULTYS_MX_MOBILE,
  ZULTYS_MXIE,
  ZULTYS_MXMEETING,
  ZULTYS_MX_MOBILE_ZAC,
  ZULTYS_MXSE,
  ZULTYS_ZIP_45G_EASE,
  OFFICE_COMMUNICATION,
} from '../constants/images';

export function Gober() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Gober Zultys Business Phone Systems | VoIP & IP PBX Solutions';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Gober Zultys business phone systems and VoIP solutions. Authorized Zultys dealer providing unified communications, cloud phone systems, and local support for Gober businesses.';
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
    metaKeywords.setAttribute('content', 'Gober Zultys, Zultys business phone systems Gober, Gober business VoIP solutions, Gober unified communications, Zultys cloud phone system Gober, authorized Zultys dealer Gober TX');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/gober-tx-zultys-phone-systems');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Gober Zultys Support',
      description: 'Authorized Zultys dealer providing enterprise business phone systems and VoIP solutions to businesses in Gober, Texas.',
      url: 'https://dallasfortworthzultys.com/gober-tx-zultys-phone-systems',
      telephone: '817-231-2962',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gober',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '33.4565',
        longitude: '-96.0261',
      },
      areaServed: 'Gober, TX',
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const benefits = [
    {
      title: 'Fannin County Support',
      description: 'Localized Zultys support for Gober\'s community services and agricultural operations in Central Fannin County.',
      icon: MapPin,
    },
    {
      title: 'Reliable VoIP Performance',
      description: 'Enterprise VoIP platforms designed for Gober organizations requiring high uptime and rural resilience.',
      icon: Zap,
    },
    {
      title: 'Unified Communication',
      description: 'Connect your Gober office with mobile tools like Zultys ZAC, keeping your team linked everywhere.',
      icon: Users,
    },
    {
      title: 'Secure Cloud Platform',
      description: 'Zultys Cloud solutions that provide reliability and business continuity for growing Gober organizations.',
      icon: Cloud,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Gober Zultys <br /><span className="text-zultys-green">Business Phone Systems.</span></>}
          subtitle="Modernize your Gober business with the most reliable Zultys phone systems in Fannin County. As your local authorized Zultys dealer, we provide professional installation and 24/7 technical support for organizations across Gober."
          icon={Zap}
          iconLabel="Authorized Gober Zultys Partner"
          buttonText="Get a Free Gober Quote"
          onButtonClick={openQuote}
        />

        {/* Benefits Grid - SaaS Style */}
        <section className="py-24 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="group">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 group-hover:border-zultys-green transition-colors duration-500 w-fit">
                    <benefit.icon className="h-8 w-8 text-zultys-green" />
                  </div>
                  <h3 className="text-xl font-black text-charcoal mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction Section - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  The Preferred <span className="text-zultys-green">Gober Zultys</span> Partner for Business.
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Gober is a historic community in Fannin County, supporting a variety of local businesses and agricultural centers as North Texas continues to grow. As the region develops south of Honey Grove, Gober businesses require a communication infrastructure that is as durable and versatile as their community. That's where <strong>Gober Zultys</strong> solutions from DFW Business Communications come in.
                  </p>
                  <p className="leading-relaxed mb-8">
                    We specialize in delivering <strong>Zultys business phone systems Gober</strong> businesses trust to stay competitive. Whether you're a local service provider, an agricultural operation, or a professional firm, our VoIP and unified communications tools provide the reliability and advanced features needed to succeed in today's digital landscape.
                  </p>
                  <p className="leading-relaxed mb-8">
                    Our local presence in North Texas ensures we understand Gober's unique infrastructure. We don't just sell technology; we deliver a complete communication strategy including professional on-site surveys, fiber-ready setup, and ongoing local 24/7 technical support for Gober organizations.
                  </p>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <h3 className="text-2xl font-black text-charcoal mb-4">Why Gober Businesses Choose Us</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We are your North Texas neighbors. Our team provides personalized on-site implementation and training for your Gober staff, ensuring your organization maximizes its Zultys investment from day one.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Gober Zultys Business Phone Systems and VoIP Experts"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-charcoal text-white p-10 rounded-3xl shadow-2xl border border-white/10 hidden md:block">
                    <div className="text-5xl font-black mb-1 text-zultys-green">#1</div>
                    <div className="text-sm font-black uppercase tracking-widest text-gray-400">Authorized Zultys Dealer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReadMore initialHeight="max-h-[0px]" className="bg-white">
          {/* Section 1: Unified Communications - SaaS Style */}
        <section className="py-32 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-white p-10">
                  <ImageWithFallback
                    src={ZULTYS_ZAC_MOBILE_COMBO}
                    alt="Zultys Unified Communications for Gober Business"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block bg-zultys-green/10 text-zultys-green px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Unified Communications
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Unified Communications <br />
                  <span className="text-zultys-green">for Gober Enterprises.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Modern collaboration is essential for growing North Texas firms. <strong>Gober unified communications</strong> from Zultys brings voice, video, chat, and presence into one interface, allowing your Gober team to collaborate effectively from any location.
                  </p>
                  <p className="leading-relaxed mb-6">
                    With Zultys ZAC (Zultys Advanced Communicator), your Gober staff can see who is available, initiate video calls with a click, and manage their system with ease. This level of integration is particularly valuable for Gober businesses that serve regional clients.
                  </p>
                  <p className="leading-relaxed">
                    Plus, Zultys mobile tools ensure your Gober team never misses a call. Use your office extension on your smartphone with full professional functionality, ensuring you stay connected whether you're in Bonham, Honey Grove, or Gober.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Cloud vs On-Premise - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-block bg-zultys-gold/10 text-zultys-gold px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Cloud & Hybrid
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Zultys Cloud <br />
                  <span className="text-zultys-gold">Solutions in Gober.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Deciding between a <strong>Zultys cloud phone system Gober</strong> and an on-premise application is a critical choice for your business's future. Zultys Cloud provides ultimate scalability by hosting your system in secure, redundant data centers.
                  </p>
                  <p className="leading-relaxed mb-6">
                    For Gober businesses wanting to avoid expensive upfront hardware costs, the cloud is often the best fit. It eliminates the need for complex on-site maintenance and allows you to add users instantly as your Gober organization grows.
                  </p>
                  <p className="leading-relaxed">
                    Reliability is paramount in North Texas, and our cloud-based Zultys platform ensures your Gober business stays connected even in the event of local office disruptions or localized weather issues.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-gold/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_CLOUD_SERVICES}
                    alt="Zultys Cloud Phone Systems Gober"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Technical Excellence - SaaS Style */}
        <section className="py-32 bg-charcoal text-white relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-1 gap-8">
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-white p-10 border border-white/10 group">
                    <ImageWithFallback
                      src={ZULTYS_MXSE}
                      alt="Zultys MX-SE for Gober Small Business"
                      className="w-full h-auto max-h-[250px] object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-white p-10 border border-white/10 group">
                    <ImageWithFallback
                      src={ZULTYS_ZIP_45G_EASE}
                      alt="Zultys ZIP 45G for Gober Teams"
                      className="w-full h-auto max-h-[250px] object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block bg-zultys-green/20 text-zultys-green px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-zultys-green/30">
                  Technical Excellence
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                  The Power of the <br />
                  <span className="text-zultys-green">Zultys MX Series.</span>
                </h2>
                <div className="prose prose-lg prose-invert text-gray-100 max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    At the heart of our <strong>Gober Zultys</strong> services is the enterprise-grade MX platform. Built for 99.999% reliability, it ensures your Gober business is always operational regardless of conditions.
                  </p>
                  <p className="leading-relaxed mb-6">
                    The MX series is a truly unified platform, with all features integrated on a single software stream. For a Gober business, this means a more stable system and a much lower total cost of ownership compared to piecemeal systems.
                  </p>
                  <p className="leading-relaxed">
                    Whether you need the MX-SE for a local Gober office or the MX250 for a multi-county operation, Zultys provides the consistent high performance your organization needs to thrive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Software & Tools - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
                Tools for the <span className="text-zultys-green">Gober Workforce.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Zultys provides high-performance applications that transform your Gober phone system into a collaborative productivity machine.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'MXie Desktop',
                  description: 'Manage every interaction from your screen. Perfect for Gober offices requiring enterprise-level call handling.',
                  image: ZULTYS_MXIE,
                },
                {
                  title: 'Zultys Mobile',
                  description: 'Carry your Gober extension on the road. Full functionality on your smartphone for mobile staff traveling the region.',
                  image: ZULTYS_MX_MOBILE,
                },
                {
                  title: 'MXmeeting',
                  description: 'Host professional video and web conferences from Gober. Connect with partners across North Texas and beyond.',
                  image: ZULTYS_MXMEETING,
                },
              ].map((tool, index) => (
                <Card key={index} className="p-0 border border-gray-100 bg-white hover:shadow-xl transition-all duration-500 group rounded-[2rem] overflow-hidden">
                  <div className="aspect-video bg-gray-50 p-8 group-hover:bg-white transition-colors duration-500">
                    <ImageWithFallback src={tool.image} alt={tool.title} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-black text-charcoal mb-4">{tool.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{tool.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Local Support & Implementation - SaaS Style */}
        <section className="py-32 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-charcoal mb-8 leading-tight">
                  Expert Implementation & <br />
                  <span className="text-zultys-green">Support in Gober.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="leading-relaxed mb-6">
                    A successful <strong>Gober Zultys</strong> rollout requires a partner who understands the Fannin County business landscape. DFW Business Communications provides the local expertise for a seamless transition with zero Gober office downtime.
                  </p>
                  <p className="leading-relaxed mb-6">
                    We start with a detailed site survey of your Gober facility. We then pre-configure your Zultys platform to your exact business needs, from auto-attendants to call routing. Our technicians handle on-site setup and professional Gober staff training.
                  </p>
                  <p className="leading-relaxed">
                    Our support continues long after installation. We provide local 24/7 monitoring for all Gober clients. If you have an issue, you talk to a local expert who knows North Texas and can provide fast on-site support whenever needed.
                  </p>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl">
                <h3 className="text-2xl font-black text-charcoal mb-8">Gober Support Features</h3>
                <div className="space-y-8">
                  {[
                    { title: 'Local Fannin Service', desc: 'Direct on-site support for Gober businesses from local expert technicians.' },
                    { title: '24/7 Monitoring', desc: 'Proactive system monitoring to ensure your Gober business stays unified.' },
                    { title: 'Personalized Training', desc: 'In-person training for your Gober team on all modern Zultys features.' },
                    { title: 'Seamless Transition', desc: 'Zero-downtime implementation for your Gober office communications.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="bg-zultys-green/10 p-2 rounded-2xl h-fit">
                        <CheckCircle className="h-6 w-6 text-zultys-green" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-charcoal">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final SEO Text Block - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-10">Ready to Upgrade Your <span className="text-zultys-green">Gober Communications?</span></h2>
              <div className="prose prose-lg text-gray-600 mx-auto max-w-none prose-strong:text-charcoal">
                <p className="text-xl leading-relaxed mb-8">
                  Don't let outdated technology slow down your Gober business. Experience the enterprise power of a modern <strong>Gober Zultys business phone system</strong> from DFW Business Communications.
                </p>
                <p className="text-xl leading-relaxed mb-12">
                  Whether you prefer a cloud-first approach or a hybrid on-premise system, we have the North Texas expertise to deliver. Contact us today for your free Gober site survey and consultation.
                </p>
                <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
                  <p className="font-black text-charcoal text-3xl mb-4">
                    Call Leroy today at <span className="text-zultys-green">817-231-2962</span>
                  </p>
                  <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">For a free Gober Zultys consultation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        </ReadMore>

        <CTASection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
