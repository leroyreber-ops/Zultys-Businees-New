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
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Hero } from '../components/Hero';
import { ReadMore } from '../components/ReadMore';
import {
  HERO_BACKGROUND,
  OFFICE_COMMUNICATION,
  SUPPORT_TEAM,
  PEOPLE_ON_CALLS,
  ZULTYS_MX250,
  ZULTYS_ZIP_45G,
  ZULTYS_MXSE,
  ZULTYS_ZAC_MOBILE_COMBO,
  ZULTYS_CLOUD_SERVICES,
  ZULTYS_MX_MOBILE,
  ZULTYS_MXIE,
  ZULTYS_MXMEETING,
  ZULTYS_IP_PHONES_BG,
  ZULTYS_FORT_WORTH_BG,
  ZULTYS_MX_MOBILE_ZAC,
  ZULTYS_ZIP_45G_EASE,
} from '../constants/images';

export function ZultysBusinessPhoneSystems() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys Business Phone Systems Fort Worth | #1 Authorized Zultys Dealer DFW';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Zultys business phone system sales and support in Fort Worth. #1 authorized Zultys partner providing unified communications, cloud systems, and VoIP for DFW businesses.';
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
    metaKeywords.setAttribute('content', 'Zultys business phone systems Fort Worth, Zultys unified communications for business Dallas, Zultys cloud business phone system DFW, Zultys VoIP phone systems for small business, hosted Zultys business phone system, Zultys MX series business communications solution, authorized Zultys dealer Fort Worth');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/fort-worth-zultys-business-phone-systems');

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: 'Zultys Business Phone Systems Fort Worth | #1 Authorized Zultys Dealer' },
      { property: 'og:description', content: 'Enterprise-grade Zultys business phone systems and unified communications for Dallas-Fort Worth businesses. Local expert support.' },
      { property: 'og:url', content: 'https://dallasfortworthzultys.com/fort-worth-zultys-business-phone-systems' },
      { property: 'og:type', content: 'website' },
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys Business Phone Systems Fort Worth',
      description: 'Comprehensive guide to Zultys business phone systems and unified communications in Dallas-Fort Worth, provided by DFW Business Communications.',
      url: 'https://dallasfortworthzultys.com/fort-worth-zultys-business-phone-systems',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://dallasfortworthzultys.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Zultys Business Phone Systems',
            item: 'https://dallasfortworthzultys.com/fort-worth-zultys-business-phone-systems',
          },
        ],
      },
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
      title: 'Unified Communications',
      description: 'Streamline your workflow with a single platform for voice, video, chat, and presence in Fort Worth.',
      icon: Users,
    },
    {
      title: 'Cloud Phone Systems',
      description: 'Enjoy the flexibility and scalability of a hosted Zultys business phone system for your DFW office.',
      icon: Cloud,
    },
    {
      title: 'VoIP for Small Business',
      description: 'Enterprise-grade features at a price point that makes sense for North Texas small businesses.',
      icon: Phone,
    },
    {
      title: 'MX Series Hardware',
      description: 'The Zultys MX series business communications solution offers unmatched reliability and uptime.',
      icon: Server,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Zultys Business Phone Systems <br /><span className="text-zultys-green">Fort Worth, TX.</span></>}
          subtitle="Empower your North Texas organization with the most reliable Zultys business phone systems Fort Worth has to offer. As your #1 authorized Zultys dealer, we provide expert sales, installation, and 24/7 local support for unified communications and VoIP solutions."
          icon={Zap}
          iconLabel="Authorized Zultys Partner"
          buttonText="Get a Free DFW Quote"
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
                  The Gold Standard for <br />
                  <span className="text-zultys-green">Fort Worth Communications.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    When it comes to <strong>Zultys business phone systems Fort Worth</strong>, DFW Business Communications stands as the region's most trusted authority and authorized partner. We understand that in the "City of Cowboys and Culture," a phone system is more than just hardware; it's the lifeline of your customer service, sales, and internal collaboration.
                  </p>
                  <p className="leading-relaxed mb-8">
                    The modern workplace in North Texas has evolved, and your communication tools must keep pace. Whether your team is centralized in a downtown Fort Worth office, operating in the Stockyards, or distributed across the DFW metroplex, our Zultys solutions ensure that every call is crystal clear and every team member is reachable. We specialize in delivering enterprise-grade VoIP and unified communications that are tailored to the unique needs of Fort Worth businesses.
                  </p>
                  <p className="leading-relaxed mb-8">
                    Our local expertise allows us to provide a level of service that national providers simply cannot match. From the initial site survey to professional installation and ongoing 24/7 support, we are your dedicated partner in building a communication infrastructure that drives growth and efficiency for your organization.
                  </p>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <h3 className="text-2xl font-black text-charcoal mb-4">Strategic Advantage in North Texas</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Zultys Unified Communications provides that edge by breaking down communication barriers and fostering a more collaborative environment for your North Texas organization. By integrating voice, video, chat, and mobile collaboration into a single platform, we help you respond to customers faster and work more effectively as a team.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_IP_PHONES_BG}
                    alt="Zultys Business Phone Systems Fort Worth Experts"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-charcoal text-white p-10 rounded-3xl shadow-2xl border border-white/10 hidden md:block">
                    <div className="text-5xl font-black mb-1 text-zultys-green">20+</div>
                    <div className="text-sm font-black uppercase tracking-widest text-gray-400">Years of DFW Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

                  {/* Long-tail Keyword Section 1: Unified Communications - SaaS Style */}
        <section className="py-32 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-white p-10">
                  <ImageWithFallback
                    src={ZULTYS_ZAC_MOBILE_COMBO}
                    alt="Zultys Unified Communications for Fort Worth Business"
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
                  Zultys Unified <br />
                  <span className="text-zultys-green">Communications DFW.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Implementing <strong>Zultys unified communications for business</strong> is a transformative step for any Fort Worth organization. Zultys brings voice, video, chat, and fax into a single, intuitive interface known as ZAC (Zultys Advanced Communicator). This integration eliminates the silos that often hinder productivity in modern offices.
                  </p>
                  <p className="leading-relaxed mb-6">
                    With ZAC, your employees can see the "presence" of their colleagues in real-time. This transparency eliminates the frustration of "phone tag" and significantly speeds up internal decision-making. Whether your team is in a high-rise in Downtown Fort Worth or working remotely from Keller, they stay connected as if they were in the same room.
                  </p>
                  <p className="leading-relaxed">
                    Furthermore, Zultys unified communications includes powerful features like integrated call recording, secure instant messaging, and one-click video conferencing. It's a comprehensive toolset designed to empower your workforce and provide a superior experience for your customers across the entire Dallas-Fort Worth area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Long-tail Keyword Section 2: Cloud Business Phone System - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-block bg-zultys-gold/10 text-zultys-gold px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Cloud Solutions
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Zultys Cloud <br />
                  <span className="text-zultys-gold">Phone Systems Fort Worth.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    The shift toward the cloud is accelerating in North Texas, and a <strong>Zultys cloud business phone system</strong> offers the ultimate in flexibility, scalability, and disaster recovery for your Fort Worth enterprise.
                  </p>
                  <p className="leading-relaxed mb-6">
                    One of the primary benefits of a cloud-based solution is its inherent scalability. As your Fort Worth business grows, adding new users or new locations in the DFW area is as simple as ordering a new phone and plugging it in. There's no need for expensive hardware upgrades or complex wiring changes.
                  </p>
                  <p className="leading-relaxed">
                    Additionally, Zultys Cloud provides built-in redundancy. If your local office in Fort Worth experiences a power outage or internet failure, your calls can be automatically routed to mobile devices or other locations, ensuring your business never goes dark. DFW Business Communications manages the entire cloud environment for you, so you can focus on running your business while we handle the technology.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-gold/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_CLOUD_SERVICES}
                    alt="Zultys Cloud Business Phone System Fort Worth"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Long-tail Keyword Section 3: VoIP for Small Business - SaaS Style */}
        <section className="py-32 bg-charcoal text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src={ZULTYS_FORT_WORTH_BG} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-1 gap-8">
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-white p-10 border border-white/10 group">
                    <ImageWithFallback
                      src={ZULTYS_MXSE}
                      alt="Zultys MX-SE for Fort Worth Small Business"
                      className="w-full h-auto max-h-[250px] object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-white p-10 border border-white/10 group">
                    <ImageWithFallback
                      src={ZULTYS_ZIP_45G_EASE}
                      alt="Zultys ZIP 45G Ease of Use for DFW Teams"
                      className="w-full h-auto max-h-[250px] object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block bg-zultys-green/20 text-zultys-green px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-zultys-green/30">
                  Small Business VoIP
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                  VoIP Solutions for <br />
                  <span className="text-zultys-green">Fort Worth Small Business.</span>
                </h2>
                <div className="prose prose-lg prose-invert text-gray-100 max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Small businesses are the heartbeat of the Fort Worth economy. <strong>Zultys VoIP phone systems for small business</strong> are specifically designed to bridge the gap between enterprise power and small business budgets, giving you the tools you need to compete with much larger organizations.
                  </p>
                  <p className="leading-relaxed mb-6">
                    The Zultys MX-SE is a perfect example of this philosophy. It packages the full power of the Zultys MX software into a more affordable hardware platform for offices with up to 50 users. You get the same unified communications, mobile integration, and contact center features as a Fortune 500 company, but at a price point that makes sense for a Fort Worth local business.
                  </p>
                  <p className="leading-relaxed">
                    Our team at DFW Business Communications specializes in helping North Texas small businesses navigate the transition to VoIP. We ensure your network is optimized, your staff is trained, and your system is configured to provide the best possible experience for your customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Long-tail Keyword Section 4: Hosted Zultys Business Phone System - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-block bg-zultys-green/10 text-zultys-green px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Hosted Systems
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Hosted Zultys <br />
                  <span className="text-zultys-green">Phone Systems Fort Worth.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    A <strong>hosted Zultys business phone system</strong> provides ultimate peace of mind for busy Fort Worth business owners. By moving your communication infrastructure to our secure data centers, DFW Business Communications takes on the responsibility of managing, updating, and securing your platform.
                  </p>
                  <p className="leading-relaxed mb-6">
                    The "hosted" advantage extends beyond maintenance. It provides superior support for remote and mobile workers, ensuring everyone stays fully integrated into the company's communication flow regardless of their physical location in the DFW Metroplex. It also eliminates the need for expensive on-site hardware and the associated cooling and power costs.
                  </p>
                  <p className="leading-relaxed">
                    With a hosted solution, you always have access to the latest Zultys features and security patches. Our local Fort Worth support team monitors your system 24/7, ensuring maximum uptime and performance. It's the most efficient way to manage your business communications in the modern era.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_MX_MOBILE}
                    alt="Hosted Zultys Business Phone System Fort Worth Mobile Integration"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Software & Tools Section - SaaS Style */}
        <section className="py-32 bg-gray-50/50 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
                Powerful Tools for a <span className="text-zultys-green">Fort Worth Workforce.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Zultys provides a complete suite of software applications designed to enhance productivity and collaboration for your North Texas team.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'MXie Desktop',
                  description: 'The ultimate desktop control center. Manage calls, chat with colleagues, and see presence status all from your PC or Mac in your Fort Worth office.',
                  image: ZULTYS_MXIE,
                },
                {
                  title: 'MXmeeting',
                  description: 'Professional web conferencing and screen sharing. Host meetings with up to 500 participants across DFW with ease.',
                  image: ZULTYS_MXMEETING,
                },
                {
                  title: 'Mobile ZAC',
                  description: 'Take your office with you. Full unified communications functionality on your iPhone or Android device while traveling through North Texas.',
                  image: ZULTYS_MX_MOBILE_ZAC,
                },
              ].map((tool, index) => (
                <Card key={index} className="p-0 border border-gray-100 bg-white hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] transition-all duration-500 group rounded-[2rem] overflow-hidden">
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

            <div className="mt-32 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-3xl font-black text-charcoal mb-8 leading-tight">Optimizing Your DFW Business with Zultys Cloud Solutions</h3>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="leading-relaxed mb-6">
                    <strong>Optimizing Your DFW Business</strong> with Zultys Cloud Solutions is about more than just moving to the cloud; it's about gaining the agility and resilience your North Texas organization needs to thrive in a competitive market. Our cloud-based Zultys systems provide seamless connectivity for your entire DFW team, whether they are in a Downtown Fort Worth high-rise, a home office in Arlington, or on the road in Dallas.
                  </p>
                  <p className="leading-relaxed">
                    We handle all the technical details of your cloud migration, ensuring a smooth transition for your Dallas or Fort Worth enterprise with zero downtime. With Zultys Cloud, you benefit from automatic updates, enterprise-grade security, and the peace of mind that comes with knowing your communication system is managed by local DFW experts who understand your business.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-charcoal mb-8 leading-tight">Why Small Businesses in North Texas Choose Zultys VoIP</h3>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="leading-relaxed mb-6">
                    It's clear <strong>Why Small Businesses in North Texas Choose Zultys VoIP</strong>. They need the same powerful features as large corporations—like auto-attendants, call recording, and mobile integration—but at a price point that fits their budget. Zultys VoIP phone systems for small business deliver exactly that, providing enterprise-grade tools without the enterprise-grade price tag.
                  </p>
                  <p className="leading-relaxed">
                    For a small business in Fort Worth or Dallas, every customer interaction counts. Zultys ensures that you never miss a call and that your team always appears professional, regardless of their size. DFW Business Communications is dedicated to helping North Texas small businesses leverage this technology to grow and succeed in the competitive DFW market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final SEO Text Block - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-10">Your Local Fort Worth <span className="text-zultys-green">Zultys Experts.</span></h2>
              <div className="prose prose-lg text-gray-600 mx-auto max-w-none prose-strong:text-charcoal">
                <p className="text-xl leading-relaxed mb-8">
                  Choosing the right <strong>Zultys business phone system Fort Worth</strong> is a significant decision for your organization's future, and you don't have to make it alone. DFW Business Communications has over 20 years of experience helping North Texas companies navigate the complex world of telecommunications.
                </p>
                <p className="text-xl leading-relaxed mb-12">
                  From the initial consultation and site survey to professional installation and lifetime local support, we are with you every step of the way. Our local Fort Worth presence means that if you ever have an issue, we can be on-site quickly to resolve it, ensuring your business stays connected and productive. We pride ourselves on being the #1 authorized Zultys dealer in the DFW area, delivering technology that drives real results.
                </p>
                <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
                  <p className="font-black text-charcoal text-3xl mb-4">
                    Call Leroy today at <span className="text-zultys-green">817-231-2962</span>
                  </p>
                  <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">For a free, no-obligation Fort Worth consultation.</p>
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
