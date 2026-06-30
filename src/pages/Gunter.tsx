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

export function Gunter() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Gunter Zultys Business Phone Systems | VoIP & IP PBX Solutions';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Gunter Zultys business phone systems and VoIP solutions. Authorized Zultys dealer providing unified communications, cloud phone systems, and local support for Gunter businesses.';
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
    metaKeywords.setAttribute('content', 'Gunter Zultys, Zultys business phone systems Gunter, Gunter business VoIP solutions, Gunter unified communications, Zultys cloud phone system Gunter, authorized Zultys dealer Gunter TX');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/gunter-tx-zultys-phone-systems');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Gunter Zultys Support',
      description: 'Authorized Zultys dealer providing enterprise business phone systems and VoIP solutions to businesses in Gunter, Texas.',
      url: 'https://dallasfortworthzultys.com/gunter-tx-zultys-phone-systems',
      telephone: '817-231-2962',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gunter',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '33.4473',
        longitude: '-96.7458',
      },
      areaServed: 'Gunter, TX',
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
      title: 'South Grayson Support',
      description: 'Localized Zultys support for Gunter\'s emerging business sector at the intersection of Grayson and Collin Counties.',
      icon: MapPin,
    },
    {
      title: 'Growth Optimized',
      description: 'Unified communications designed for Gunter businesses scaling alongside the North Texas Tollway expansion.',
      icon: Zap,
    },
    {
      title: 'Modern UC Tools',
      description: 'Integrate voice, video, and chat into one platform for your Gunter team with Zultys ZAC productivity apps.',
      icon: Users,
    },
    {
      title: 'Reliable Cloud Platform',
      description: 'Secure Zultys cloud phone systems that ensure continuous connectivity for Gunter organizations.',
      icon: Cloud,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Gunter Zultys <br /><span className="text-zultys-green">Business Phone Systems.</span></>}
          subtitle="Equip your Gunter business with the most reliable Zultys phone systems in South Grayson County. As your local authorized Zultys dealer, we provide professional installation and 24/7 technical support for organizations across Gunter."
          icon={Zap}
          iconLabel="Authorized Gunter Zultys Partner"
          buttonText="Get a Free Gunter Quote"
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
                  The Preferred <span className="text-zultys-green">Gunter Zultys</span> Partner for Business.
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Gunter stands at a pivotal moment as the North Texas growth wave reaches South Grayson County. As local businesses prepare for the upcoming Tollway expansion and increased commercial density, <strong>Gunter Zultys</strong> solutions from DFW Business Communications provide the technological foundation they need.
                  </p>
                  <p className="leading-relaxed mb-8">
                    We specialize in delivering <strong>Zultys business phone systems Gunter</strong> businesses trust to stay competitive. Whether you're a local service firm, a retail storefront, or a professional office, our VoIP and unified communications tools provide the reliability and advanced features needed to succeed in the North Texas market.
                  </p>
                  <p className="leading-relaxed mb-8">
                    Our local presence in North Texas ensures we understand Gunter's unique growth outlook. We don't just sell technology; we provide a complete communication strategy including on-site surveys, fiber-ready integration, and ongoing local 24/7 technical support for Gunter organizations.
                  </p>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <h3 className="text-2xl font-black text-charcoal mb-4">Why Gunter Businesses Choose Us</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We are your local Grayson County experts. Our team provides personalized on-site implementation and training for your Gunter staff, ensuring you get the most out of your Zultys investment from day one.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Gunter Zultys Business Phone Systems and VoIP Experts"
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
                    alt="Zultys Unified Communications for Gunter Business"
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
                  <span className="text-zultys-green">for Gunter Enterprises.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Modern collaboration is essential for growing North Texas businesses. <strong>Gunter unified communications</strong> from Zultys brings voice, video, chat, and presence into one interface, allowing your Gunter team to collaborate perfectly from any location.
                  </p>
                  <p className="leading-relaxed mb-6">
                    With Zultys ZAC (Zultys Advanced Communicator), your Gunter staff can see who is available, initiate video calls with a click, and manage their system from any location. This integration is vital for Gunter businesses serving clients across the Grayson and Collin county lines.
                  </p>
                  <p className="leading-relaxed">
                    Plus, Zultys mobile tools ensure your Gunter team never misses a call. Use your office extension on your smartphone with full professional functionality, ensuring you stay connected whether you're in Sherman, Cellina, or Gunter.
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
                  <span className="text-zultys-gold">Solutions in Gunter.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Deciding between a <strong>Zultys cloud phone system Gunter</strong> and an on-premise application is a key infrastructure decision. Zultys Cloud provides ultimate scalability by hosting your system in secure, redundant data centers, perfect for the Gunter market.
                  </p>
                  <p className="leading-relaxed mb-6">
                    For Gunter businesses wanting to avoid expensive upfront hardware costs, the cloud is often the best fit. It eliminates the need for complex on-site maintenance and allows you to add users instantly as your Gunter business expands.
                  </p>
                  <p className="leading-relaxed">
                    Reliability is vital in North Texas, and our cloud-based Zultys systems ensure you stay connected even if your local office faces power or local internet issues, providing true continuity for Gunter.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-gold/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_CLOUD_SERVICES}
                    alt="Zultys Cloud Phone Systems Gunter"
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
                      alt="Zultys MX-SE for Gunter Small Business"
                      className="w-full h-auto max-h-[250px] object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-white p-10 border border-white/10 group">
                    <ImageWithFallback
                      src={ZULTYS_ZIP_45G_EASE}
                      alt="Zultys ZIP 45G for Gunter Teams"
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
                    At the heart of our <strong>Gunter Zultys</strong> services is the enterprise MX platform. Engineered for 99.999% uptime, it ensures your Gunter business is always ready for service in Grayson County.
                  </p>
                  <p className="leading-relaxed mb-6">
                    The MX series is built on a single software stream, providing true integration. For a Gunter organization, this means greater stability and a lower total cost of ownership compared to fragmented systems.
                  </p>
                  <p className="leading-relaxed">
                    Whether you need the MX-SE for a local Gunter office or the MX250 for a multi-site regional operation, Zultys delivers consistent enterprise-grade performance that scales with your North Texas business.
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
                Productivity Tools for <span className="text-zultys-green">Gunter Teams.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Zultys provides high-performance applications that turn your Gunter phone system into a collaborative productivity machine for your North Texas staff.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'MXie for Desktop',
                  description: 'Manage every interaction from your screen. Perfect for Gunter offices requiring efficient enterprise call handling.',
                  image: ZULTYS_MXIE,
                },
                {
                  title: 'Zultys Mobile',
                  description: 'Take your Gunter extension on the road. Full functionality on your smartphone for mobile staff traveling the region.',
                  image: ZULTYS_MX_MOBILE,
                },
                {
                  title: 'MXmeeting',
                  description: 'Host professional web and video conferences from Gunter. Connect with partners anywhere across North Texas.',
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
                  <span className="text-zultys-green">Support in Gunter.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="leading-relaxed mb-6">
                    A successful <strong>Gunter Zultys</strong> rollout starts with a partner who understands the local Grayson and Collin County landscape. DFW Business Communications provides the local expertise needed for a smooth transition with zero Gunter office downtime.
                  </p>
                  <p className="leading-relaxed mb-6">
                    We begin with a detailed site survey of your Gunter facility. We then pre-configure your Zultys platform to your exact business needs, from auto-attendants to call routing. Our technicians handle on-site setup and Gunter staff training.
                  </p>
                  <p className="leading-relaxed">
                    Our support continues long after installation. We provide local 24/7 monitoring for all Gunter clients. If you have a question, you talk to a local expert who knows North Texas and can provide fast on-site assistance if required.
                  </p>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl">
                <h3 className="text-2xl font-black text-charcoal mb-8">Gunter Support Features</h3>
                <div className="space-y-8">
                  {[
                    { title: 'Local Grayson Service', desc: 'Direct on-site support for Gunter businesses from local North Texas experts.' },
                    { title: '24/7 Monitoring', desc: 'Proactive system monitoring to ensure your Gunter business stays unified.' },
                    { title: 'Personalized Training', desc: 'In-person training for your Gunter team on all modern Zultys features.' },
                    { title: 'Seamless Transition', desc: 'Zero-downtime implementation for your Gunter office communications.' }
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
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-10">Ready to Upgrade Your <span className="text-zultys-green">Gunter Communications?</span></h2>
              <div className="prose prose-lg text-gray-600 mx-auto max-w-none prose-strong:text-charcoal">
                <p className="text-xl leading-relaxed mb-8">
                  Don't let outdated technology slow down your Gunter business. Experience the enterprise power of a modern <strong>Gunter Zultys business phone system</strong> from DFW Business Communications.
                </p>
                <p className="text-xl leading-relaxed mb-12">
                  Whether you prefer a cloud-first approach or a hybrid on-premise system, we have the North Texas expertise to deliver. Contact us today for your free Gunter site survey and consultation.
                </p>
                <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
                  <p className="font-black text-charcoal text-3xl mb-4">
                    Call Leroy today at <span className="text-zultys-green">817-231-2962</span>
                  </p>
                  <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">For a free Gunter Zultys consultation.</p>
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
