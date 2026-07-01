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

export function Farmersville() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Farmersville Zultys Business Phone Systems | VoIP & IP PBX Solutions';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Farmersville Zultys business phone systems and VoIP solutions. Authorized Zultys dealer providing unified communications, cloud phone systems, and local support for Farmersville businesses.';
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
    metaKeywords.setAttribute('content', 'Farmersville Zultys, Zultys business phone systems Farmersville, Farmersville business VoIP solutions, Farmersville unified communications, Zultys cloud phone system Farmersville, authorized Zultys dealer Farmersville TX');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/farmersville-tx-zultys-phone-systems');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Farmersville Zultys Support',
      description: 'Authorized Zultys dealer providing enterprise business phone systems and VoIP solutions to businesses in Farmersville, Texas.',
      url: 'https://dallasfortworthzultys.com/farmersville-tx-zultys-phone-systems',
      telephone: '817-231-2962',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Farmersville',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '33.1593',
        longitude: '-96.3597',
      },
      areaServed: 'Farmersville, TX',
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
      title: 'Collin County Focus',
      description: 'Specialized Zultys support for Farmersville\'s burgeoning business sector in Northeast Collin County.',
      icon: MapPin,
    },
    {
      title: 'Regional Hub Ready',
      description: 'Unified communications designed for Farmersville shops and services connecting across Collin and Hunt Counties.',
      icon: Zap,
    },
    {
      title: 'Scalable UC Tools',
      description: 'Integrate voice, video, and chat into one platform for your Farmersville team with Zultys ZAC.',
      icon: Users,
    },
    {
      title: 'Cloud Resilience',
      description: 'Secure Zultys cloud phone systems that ensure business continuity for Farmersville organizations.',
      icon: Cloud,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Farmersville Zultys <br /><span className="text-zultys-green">Business Phone Systems.</span></>}
          subtitle="Modernize your Farmersville business with the most reliable Zultys phone systems in Northeast Collin County. As your local authorized Zultys dealer, we provide professional installation and 24/7 technical support for organizations across Farmersville."
          icon={Zap}
          iconLabel="Authorized Farmersville Zultys Partner"
          buttonText="Get a Free Farmersville Quote"
          onButtonClick={openQuote}
        />

                {/* Benefits Grid - SaaS Style */}
        <section className="relative py-20 bg-slate-950 border-y border-white/10 overflow-hidden">
          {/* Subtle tech dot grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,168,45,0.08),transparent_70%)]"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {benefits.map((benefit, index) => {
                const gradients = [
                  'from-emerald-400 to-green-600',
                  'from-sky-400 to-blue-600',
                  'from-amber-400 to-zultys-gold',
                  'from-rose-400 to-red-600'
                ];
                const glows = [
                  'shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_35px_rgba(16,185,129,0.65)]',
                  'shadow-[0_0_20px_rgba(56,189,248,0.35)] group-hover:shadow-[0_0_35px_rgba(56,189,248,0.65)]',
                  'shadow-[0_0_20px_rgba(212,160,23,0.35)] group-hover:shadow-[0_0_35px_rgba(212,160,23,0.65)]',
                  'shadow-[0_0_20px_rgba(239,68,68,0.35)] group-hover:shadow-[0_0_35px_rgba(239,68,68,0.65)]'
                ];
                const textColors = [
                  'group-hover:text-emerald-400',
                  'group-hover:text-sky-400',
                  'group-hover:text-zultys-gold',
                  'group-hover:text-rose-400'
                ];
                
                return (
                  <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
                    <div className="relative mb-5">
                      <div className={"w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br " + gradients[index % 4] + " " + glows[index % 4] + " text-white flex items-center justify-center relative z-10 border border-white/20 transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:rotate-6"}>
                        <benefit.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" strokeWidth={2} />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-white/5 scale-110 -z-0 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none"></div>
                    </div>
                    <h3 className={"text-sm sm:text-base font-extrabold text-slate-100 mb-2 transition-colors duration-300 " + textColors[index % 4]}>
                      {benefit.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-xs sm:text-sm max-w-[240px]">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <ReadMore initialHeight="max-h-[0px]" className="bg-white">

        {/* Introduction Section - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  The Preferred <span className="text-zultys-green">Farmersville Zultys</span> Partner for Business.
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    As Farmersville grows along the US-380 corridor, local businesses are looking for communication platforms that bridge the gap between historic charm and modern efficiency. Whether you're a local boutique on Main Street or a growing professional service firm, <strong>Farmersville Zultys</strong> solutions from DFW Business Communications offer the enterprise power you need.
                  </p>
                  <p className="leading-relaxed mb-8">
                    We specialize in delivering <strong>Zultys business phone systems Farmersville</strong> businesses trust. From cloud-based phone systems that offer maximum mobility to on-premise appliances for secure, localized control, our VoIP and unified communications tools are designed specifically for the unique needs of Collin County businesses.
                  </p>
                  <p className="leading-relaxed mb-8">
                    Our local presence in North Texas ensures we understand Farmersville's infrastructure and business community. We don't just sell software; we provide a complete communication strategy that includes on-site surveys, fiber-ready setup, and ongoing local 24/7 technical support.
                  </p>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <h3 className="text-2xl font-black text-charcoal mb-4">Why Farmersville Businesses Choose Us</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We are your local North Texas partners. Our team provides personalized on-site implementation and training for your Farmersville staff, ensuring your team is fully equipped to use the latest Zultys features from day one.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Farmersville Zultys Business Phone Systems and VoIP Experts"
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

                  {/* Section 1: Unified Communications - SaaS Style */}
        <section className="py-32 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-white p-10">
                  <ImageWithFallback
                    src={ZULTYS_ZAC_MOBILE_COMBO}
                    alt="Zultys Unified Communications for Farmersville Business"
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
                  <span className="text-zultys-green">for Farmersville Enterprises.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Implementing <strong>Farmersville unified communications</strong> is crucial for modern North Texas organizations. Zultys brings voice, video, chat, and presence into one interface, allowing your Farmersville team to collaborate effectively whether they are in the office or field.
                  </p>
                  <p className="leading-relaxed mb-6">
                    With Zultys ZAC (Zultys Advanced Communicator), your Farmersville employees can see who is available, initiate video calls with a click, and manage their system from anywhere. This integration is vital for businesses in Farmersville that need to maintain a professional appearance across multiple locations in Collin and Hunt counties.
                  </p>
                  <p className="leading-relaxed">
                    Plus, Zultys mobile tools ensure your Farmersville team stays connected. Use your office extension on your smartphone with full functionality, ensuring you never miss a client call even while away from your desk.
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
                  <span className="text-zultys-gold">Solutions in Farmersville.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Deciding between a <strong>Zultys cloud phone system Farmersville</strong> and an on-premise solution is an important decision for your business. Zultys Cloud provides ultimate flexibility by hosting your system in secure, redundant data centers, perfect for the growing Farmersville market.
                  </p>
                  <p className="leading-relaxed mb-6">
                    For Farmersville businesses looking to avoid expensive upfront hardware costs, the cloud is often the best fit. It eliminates the need for complex on-site server maintenance and allows you to add users instantly as your Farmersville business grows along US-380.
                  </p>
                  <p className="leading-relaxed">
                    Reliability is critical, and our cloud-based Zultys systems ensure you stay connected even if your local office faces power or local internet issues, providing true business continuity for Farmersville.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-gold/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_CLOUD_SERVICES}
                    alt="Zultys Cloud Phone Systems Farmersville"
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
                      alt="Zultys MX-SE for Farmersville Small Business"
                      className="w-full h-auto max-h-[250px] object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-white p-10 border border-white/10 group">
                    <ImageWithFallback
                      src={ZULTYS_ZIP_45G_EASE}
                      alt="Zultys ZIP 45G for Farmersville Teams"
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
                    At the heart of our <strong>Farmersville Zultys</strong> services is the MX series platform. Engineered for 99.999% uptime, it ensures your Farmersville business is always ready for service.
                  </p>
                  <p className="leading-relaxed mb-6">
                    The MX series is built on a single software stream, providing true integration. For a Farmersville organization, this means greater stability and a lower total cost of ownership compared to piecemeal systems.
                  </p>
                  <p className="leading-relaxed">
                    Whether you need the MX-SE for a local Farmersville office or the MX250 for a multi-site regional operation, Zultys delivers consistent enterprise-grade performance that scales with your growth.
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
                Productivity Tools for <span className="text-zultys-green">Farmersville Teams.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Zultys provides high-performance applications that turn your Farmersville phone system into a collaborative productivity machine for your North Texas staff.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'MXie for Desktop',
                  description: 'Manage every interaction from your screen. Perfect for Farmersville offices requiring efficient call handling.',
                  image: ZULTYS_MXIE,
                },
                {
                  title: 'Zultys Mobile',
                  description: 'Take your Farmersville extension on the road. Full functionality on your smartphone for mobile staff.',
                  image: ZULTYS_MX_MOBILE,
                },
                {
                  title: 'MXmeeting',
                  description: 'Host professional web and video conferences from Farmersville. Connect with partners anywhere in North Texas.',
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
                  <span className="text-zultys-green">Support in Farmersville.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="leading-relaxed mb-6">
                    A successful <strong>Farmersville Zultys</strong> rollout starts with a partner who understands the local North Texas landscape. DFW Business Communications provides the local expertise needed for a smooth transition with zero Farmersville office downtime.
                  </p>
                  <p className="leading-relaxed mb-6">
                    We begin with a detailed site survey of your Farmersville facility. We then pre-configure your Zultys platform to your exact business needs, from auto-attendants to call routing. Our technicians handle on-site setup and Farmersville staff training.
                  </p>
                  <p className="leading-relaxed">
                    Our support continues long after installation. We provide local 24/7 monitoring for all Farmersville clients. If you have a question, you talk to a local expert who knows Collin County and can provide fast on-site assistance if required.
                  </p>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl">
                <h3 className="text-2xl font-black text-charcoal mb-8">Farmersville Support Features</h3>
                <div className="space-y-8">
                  {[
                    { title: 'Local Deployment', desc: 'Direct on-site support for Farmersville businesses from local experts.' },
                    { title: '24/7 Monitoring', desc: 'Proactive system monitoring to ensure your Farmersville business stays online.' },
                    { title: 'In-Person Training', desc: 'Comprehensive, on-site training for your Farmersville team on the latest features.' },
                    { title: 'Strategic Config', desc: 'Call routing and auto-attendant setups tailored for your Farmersville office.' }
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
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-10">Ready to Upgrade Your <span className="text-zultys-green">Farmersville Communications?</span></h2>
              <div className="prose prose-lg text-gray-600 mx-auto max-w-none prose-strong:text-charcoal">
                <p className="text-xl leading-relaxed mb-8">
                  Don't let outdated technology slow down your Farmersville business. Experience the enterprise features of a modern <strong>Farmersville Zultys business phone system</strong> from DFW Business Communications.
                </p>
                <p className="text-xl leading-relaxed mb-12">
                  Whether you prefer a cloud-first approach or a hybrid on-premise system, we have the North Texas expertise to deliver. Contact us today for your free Farmersville site survey and consultation.
                </p>
                <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
                  <p className="font-black text-charcoal text-3xl mb-4">
                    Call Leroy today at <span className="text-zultys-green">817-231-2962</span>
                  </p>
                  <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">For a free Farmersville Zultys consultation.</p>
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
