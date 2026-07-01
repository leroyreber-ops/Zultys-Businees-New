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
  Award,
  Clock,
  Headphones,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Hero } from '../components/Hero';
import { ReadMore } from '../components/ReadMore';
import {
  ZULTYS_ZAC_MOBILE_COMBO,
  ZULTYS_CLOUD_SERVICES,
  ZULTYS_MX_MOBILE,
  ZULTYS_MXIE,
  ZULTYS_MXMEETING,
  ZULTYS_MXSE,
  ZULTYS_ZIP_45G_EASE,
  OFFICE_COMMUNICATION,
} from '../constants/images';

export function Sanger() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Dynamic Page Title
    document.title = 'Sanger Zultys Business Phone Systems | VoIP & IP PBX Solutions';
    
    // Meta Description setup
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Sanger Zultys business phone systems and VoIP solutions. Authorized Zultys dealer providing unified communications, cloud phone systems, and local support for Sanger businesses.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Meta Keywords setup
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'Sanger Zultys, Zultys business phone systems Sanger, Sanger business VoIP solutions, Sanger unified communications, Zultys cloud phone system Sanger, authorized Zultys dealer Sanger TX');

    // Canonical URL setup
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/sanger-tx-zultys-phone-systems');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Sanger Zultys Support',
      description: 'Authorized Zultys dealer providing enterprise business phone systems and VoIP solutions to businesses in Sanger, Texas.',
      url: 'https://dallasfortworthzultys.com/sanger-tx-zultys-phone-systems',
      telephone: '817-231-2962',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sanger',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
      areaServed: 'Sanger, TX',
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
      title: 'Enterprise Support',
      description: 'Tailored Zultys phone systems for Sanger\'s diverse economy, from local commercial offices to regional industrial centers.',
      icon: MapPin,
    },
    {
      title: 'North Texas Hub',
      description: 'Rapid on-site support for businesses located in the heart of Sanger\'s commercial and industrial districts.',
      icon: Zap,
    },
    {
      title: 'Unified Communications',
      description: 'Integrate voice, video, and chat into a single platform for your Sanger workforce.',
      icon: Users,
    },
    {
      title: 'Cloud Scalability',
      description: 'Zultys cloud phone systems that scale effortlessly with Sanger\'s business growth.',
      icon: Cloud,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Sanger Zultys <br /><span className="text-zultys-green">Business Phone Systems.</span></>}
          subtitle="Empower your Sanger organization with the most reliable Zultys business phone systems in North Texas. As your local authorized Zultys dealer, we provide expert sales, professional installation, and 24/7 support for businesses across Sanger."
          icon={Zap}
          iconLabel="Authorized Sanger Zultys Partner"
          buttonText="Get a Free Sanger Quote"
          onButtonClick={openQuote}
        />

        {/* Benefits Grid - SaaS Style */}
        <section className="relative py-20 bg-slate-950 border-y border-white/10 overflow-hidden">
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

        <ReadMore initialHeight="max-h-[400px]" className="bg-white">

          {/* Introduction Section - SaaS Style */}
          <section className="py-32 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                    The Preferred <span className="text-zultys-green">Sanger Zultys</span> Partner for Business.
                  </h2>
                  <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                    <p className="text-xl leading-relaxed mb-8">
                      Sanger is a vital and growing business community within the larger Dallas-Fort Worth Metroplex. In this competitive North Texas business climate, organizations of all sizes—from growing local startups near key municipal districts to large-scale enterprises with multi-regional presence—require a state-of-the-art communication infrastructure that is stable, secure, and highly scalable. That is where professional <strong>Zultys business phone systems Sanger</strong> solutions from DFW Business Communications deliver a distinct competitive advantage.
                    </p>
                    <p className="leading-relaxed mb-8">
                      We specialize in providing high-performance <strong>VoIP and unified communications systems</strong> that Sanger organizations rely on to keep their employees, partners, and customers connected. Our customized communication setups are designed to handle the specific operational demands of local businesses, whether you operate a medical facility requiring strict HIPAA compliance, a professional services firm looking to improve client experiences, or a logistics and manufacturing facility needing robust overhead paging and multi-device routing. By partnering with DFW Business Communications, you gain access to factory-certified engineers, expert on-site training, and dedicated 24/7 local support.
                    </p>
                    <p className="leading-relaxed mb-8">
                      Our local presence in the DFW area ensures that we understand the unique challenges and opportunities facing Sanger organizations. We do not just sell hardware; we provide a comprehensive communication strategy that includes professional site surveys, seamless installation, and ongoing 24/7 local support.
                    </p>
                  </div>

                  <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                    <h3 className="text-2xl font-black text-charcoal mb-4">Why Sanger Businesses Choose Us</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Our commitment to Sanger goes beyond technology. We pride ourselves on being a local partner that understands the pulse of the city. We provide on-site training for your staff, ensuring everyone is comfortable with the new system from day one.
                    </p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                    <ImageWithFallback
                      src={OFFICE_COMMUNICATION}
                      alt="Sanger Zultys Business Phone Systems and VoIP Experts"
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
                      alt="Zultys Unified Communications for Sanger Business"
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
                    <span className="text-zultys-green">for Sanger Enterprises.</span>
                  </h2>
                  <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                    <p className="text-xl leading-relaxed mb-8">
                      Implementing <strong>Sanger unified communications</strong> is essential for modern businesses. Zultys brings voice, video, chat, and presence into a single interface, allowing your Sanger team to collaborate effectively regardless of their physical location.
                    </p>
                    <p className="leading-relaxed mb-6">
                      With Zultys ZAC (Zultys Advanced Communicator), your employees have a powerful toolset at their fingertips. They can see the availability of colleagues, initiate a video conference with one click, and manage their calls with ease. This level of integration is particularly valuable for Sanger businesses with multiple locations or a distributed workforce.
                    </p>
                    <p className="leading-relaxed">
                      Furthermore, Zultys unified communications includes robust mobile integration. Your Sanger team can take their office extension with them on their smartphones, ensuring they stay connected and productive while traveling or working from home.
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
                    <span className="text-zultys-gold">Solutions in Sanger.</span>
                  </h2>
                  <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                    <p className="text-xl leading-relaxed mb-8">
                      Choosing between a <strong>Zultys cloud phone system Sanger</strong> and an on-premise solution is a strategic decision. Zultys Cloud offers the ultimate in flexibility and scalability, moving your communication infrastructure to our secure, redundant data centers.
                    </p>
                    <p className="leading-relaxed mb-6">
                      For Sanger businesses that are rapidly growing or have a distributed workforce, the cloud is often the preferred choice. It eliminates the need for significant upfront hardware investment and provides a predictable monthly cost. Scalability is seamless—adding new users or locations is as simple as a few clicks.
                    </p>
                    <p className="leading-relaxed">
                      Hyper-growth companies in Sanger often find that the cloud model allows them to focus on their core business while we handle the complexities of their communication platform.
                    </p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-zultys-gold/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                    <ImageWithFallback
                      src={ZULTYS_CLOUD_SERVICES}
                      alt="Zultys Cloud Phone Systems Sanger"
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
                        alt="Zultys MX-SE for Sanger Small Business"
                        className="w-full h-auto max-h-[250px] object-contain transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-white p-10 border border-white/10 group">
                      <ImageWithFallback
                        src={ZULTYS_ZIP_45G_EASE}
                        alt="Zultys ZIP 45G for Sanger Teams"
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
                      At the core of our <strong>Sanger Zultys</strong> solutions is the Zultys MX series. This enterprise-grade platform is designed for 99.999% reliability, ensuring your business communications are always up and running.
                    </p>
                    <p className="leading-relaxed mb-6">
                      The MX series is a truly unified platform, meaning all features—from voice and video to contact center and mobile integration—run on a single software stream. This eliminates the complexity and instability often found in "bolted-on" solutions. For a Sanger business, this means a more stable system and a lower total cost of ownership.
                    </p>
                    <p className="leading-relaxed">
                      Whether you choose the MX-SE for a growing office or the MX250 for a large enterprise, you get the same powerful feature set. This allows your Sanger organization to scale seamlessly as you grow, without having to learn a new system or replace your existing infrastructure.
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
                  Empowering Your <span className="text-zultys-green">Sanger Workforce.</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Zultys provides a suite of applications that turn your phone system into a powerful productivity engine for your Sanger team.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-10">
                {[
                  {
                    title: 'MXie Desktop',
                    description: 'Manage every aspect of your communications from your desktop. Drag-and-drop call handling, instant messaging, and more.',
                    image: ZULTYS_MXIE,
                  },
                  {
                    title: 'MXmobile',
                    description: 'Take your Sanger office extension anywhere. Full UC functionality on your smartphone with seamless handoff.',
                    image: ZULTYS_MX_MOBILE,
                  },
                  {
                    title: 'MXmeeting',
                    description: 'Professional web conferencing for up to 500 participants. Perfect for Sanger businesses with remote clients.',
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
                    <span className="text-zultys-green">Support in Sanger.</span>
                  </h2>
                  <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                    <p className="leading-relaxed mb-6">
                      A successful <strong>Sanger Zultys</strong> rollout requires more than just good hardware. It requires a partner who understands your network, your workflow, and your business goals. DFW Business Communications provides a white-glove implementation process that ensures a smooth transition with zero downtime.
                    </p>
                    <p className="leading-relaxed mb-6">
                      We start with a comprehensive site survey of your Sanger office to identify any potential network issues. We then pre-configure your Zultys system to your exact specifications, including call routing, auto-attendants, and user profiles. Our professional installation team then handles the physical setup and provides hands-on training for your entire staff.
                    </p>
                    <p className="leading-relaxed">
                      Once your system is live, our support doesn\'t stop. We provide 24/7 local monitoring and support for all our Sanger clients. If you ever have a question or an issue, you can speak directly to a local expert who can be on-site in Sanger quickly if needed. That\'s the DFW Business Communications difference.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl">
                  <h3 className="text-2xl font-black text-charcoal mb-8">Sanger Support Features</h3>
                  <div className="space-y-8">
                    {[
                      { title: 'On-Site Training', desc: 'Personalized training for your Sanger team at your location.' },
                      { title: '24/7 Monitoring', desc: 'Proactive monitoring of your Sanger Zultys system to ensure maximum uptime.' },
                      { title: 'Local Technicians', desc: 'Expert DFW-based technicians who can be on-site in Sanger quickly.' },
                      { title: 'Number Porting', desc: 'We handle the entire process of moving your existing Sanger numbers.' }
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

          {/* Section 6: Local DFW Compliance & High-Availability SLA */}
          <section className="py-32 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-zultys-green/10 to-transparent rounded-full blur-2xl"></div>
                  <h3 className="text-2xl font-black text-charcoal mb-6">Compliance & SLA Standard</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Our high-availability service level agreements are backed by local North Texas specialists, guaranteeing that your Sanger operations never skip a beat.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 font-bold text-slate-800">
                      <Shield className="h-5 w-5 text-zultys-green" />
                      <span>HIPAA and SOC 2 Compliant setups</span>
                    </div>
                    <div className="flex items-center gap-3 font-bold text-slate-800">
                      <CheckCircle className="h-5 w-5 text-zultys-green" />
                      <span>99.999% Service Level Agreements</span>
                    </div>
                    <div className="flex items-center gap-3 font-bold text-slate-800">
                      <Clock className="h-5 w-5 text-zultys-green" />
                      <span>24/7 Proactive carrier monitoring</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-black text-charcoal mb-8 leading-tight">
                    Regulatory Compliance & <br />
                    <span className="text-zultys-green">High-Availability SLAs.</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    North Texas businesses face increasingly strict compliance mandates. From protecting personal health information (PHI) under HIPAA to adhering to corporate financial reporting guidelines, your telephone platform must be secure. DFW Business Communications installs hardened Zultys VoIP systems with fully encrypted call records, secure transmission channels, and high-security remote phone provisioning.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Furthermore, every single communication package is backed by our strict regional uptime guarantee. We operate persistent monitoring servers that scan for device dropouts, SIP registration losses, and carrier route delays. If an anomaly is detected on your local system in Sanger, our team addresses it instantly, avoiding any visible disruption to your operations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Business Intelligence & CRM Integrations */}
          <section className="py-32 bg-gray-50/50 border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-4xl font-black text-charcoal mb-8 leading-tight">
                    Native CRM Integrations & <br />
                    <span className="text-zultys-green">Advanced Call Center Analytics.</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Elevate your business intelligence by connecting your Sanger telephone system directly with your core database or CRM software. Zultys offers out-of-the-box integration with market-leading software suites like Salesforce, Microsoft Dynamics, HubSpot, and Zoho.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    When an inbound call arrives, the agent\'s screen automatically displays the customer\'s history, past tickets, and open proposals. This significantly reduces caller wait times, eliminates administrative routing steps, and drives higher conversion rates. Our reporting tools provide managers with real-time dashboards to track call metrics, staff utilization, and service speeds.
                  </p>
                </div>
                <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl relative group">
                  <h3 className="text-2xl font-black text-charcoal mb-6">Supported Integrations</h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    Sync call records, customer records, and active caller details seamlessly with your core platform:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {['Salesforce', 'HubSpot', 'Microsoft Dynamics', 'Zoho CRM', 'Zendesk', 'SugarCRM'].map((crm, i) => (
                      <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                        <CheckCircle className="h-5 w-5 text-zultys-green flex-shrink-0" />
                        <span>{crm}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Frequently Asked Questions (FAQ) */}
          <section className="py-32 bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
                  Frequently Asked <span className="text-zultys-green">Questions.</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Answers to the most common questions regarding Zultys VoIP systems and support in Sanger.
                </p>
              </div>
              <div className="max-w-4xl mx-auto grid gap-8">
                {[
                  {
                    q: 'Can we keep our existing Sanger phone numbers when migrating to Zultys?',
                    a: 'Absolutely! We manage the entire number porting process, coordinating with your current carrier to ensure a seamless transition of all your direct dials, main lines, and toll-free numbers with zero downtime on migration day.'
                  },
                  {
                    q: 'What is the difference between Zultys Cloud and Zultys On-Premise?',
                    a: 'Zultys Cloud is hosted in our secure, redundant data centers, offering low upfront costs, automatic software updates, and simple scalability. Zultys On-Premise utilizes a dedicated hardware appliance at your Sanger office, providing maximum control and local network survivability independent of internet connectivity.'
                  },
                  {
                    q: 'Does Zultys support remote and mobile workers in Sanger?',
                    a: 'Yes, remote work is a core feature of the Zultys platform. Through the MXmobile app and secure softphone technology, employees can access their full office extensions, chat, and video tools from home or while traveling, with no complex VPN configuration required.'
                  },
                  {
                    q: 'How does DFW Business Communications provide local support?',
                    a: 'Unlike nationwide providers who rely on remote call centers, we are based locally in the DFW Metroplex. We provide on-site installation, face-to-face staff training, and rapid on-site dispatch of certified technicians if physical support is ever needed at your Sanger facility.'
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                    <h4 className="text-lg font-black text-slate-900 mb-2">Q: {faq.q}</h4>
                    <p className="text-slate-600 leading-relaxed text-base">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final SEO Text Block - SaaS Style */}
          <section className="py-32 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-10">Ready to Upgrade Your <span className="text-zultys-green">Sanger Communications?</span></h2>
                <div className="prose prose-lg text-gray-600 mx-auto max-w-none prose-strong:text-charcoal">
                  <p className="text-xl leading-relaxed mb-8">
                    Don\'t let an outdated phone system hold your Sanger business back. Experience the power, reliability, and flexibility of a modern <strong>Sanger Zultys business phone system</strong> solution from DFW Business Communications.
                  </p>
                  <p className="text-xl leading-relaxed mb-12">
                    Whether you\'re looking for a cloud-based system, an on-premise appliance, or a hybrid solution, we have the expertise to design and implement the perfect platform for your needs. Contact us today to schedule your free Sanger site survey and discover how we can help your organization communicate more effectively.
                  </p>
                  <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
                    <p className="font-black text-charcoal text-3xl mb-4">
                      Call Leroy today at <span className="text-zultys-green">817-231-2962</span>
                    </p>
                    <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">For a free Sanger Zultys consultation.</p>
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
