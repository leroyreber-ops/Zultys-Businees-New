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

export function LakeWorth() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Lake Worth Zultys Business Phone Systems | VoIP & IP PBX Solutions';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Lake Worth Zultys business phone systems and VoIP solutions. Authorized Zultys dealer providing unified communications, cloud phone systems, and local support for Lake Worth businesses.';
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
    metaKeywords.setAttribute('content', 'Lake Worth Zultys, Zultys business phone systems Lake Worth, Lake Worth business VoIP solutions, Lake Worth unified communications, Zultys cloud phone system Lake Worth, authorized Zultys dealer Lake Worth TX');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/lake-worth-tx-zultys-phone-systems');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Lake Worth Zultys Support',
      description: 'Authorized Zultys dealer providing enterprise business phone systems and VoIP solutions to businesses in Lake Worth, Texas.',
      url: 'https://dallasfortworthzultys.com/lake-worth-tx-zultys-phone-systems',
      telephone: '817-231-2962',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lake Worth',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '32.8132',
        longitude: '-97.4261',
      },
      areaServed: 'Lake Worth, TX',
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
      title: 'Local Business Support',
      description: 'Tailored Zultys systems for Lake Worth\'s mix of professional services, retail centers, and growing commercial sectors in Tarrant County.',
      icon: MapPin,
    },
    {
      title: 'West Tarrant Focus',
      description: 'Rapid on-site support for businesses located near the Lake Worth shopping and business districts.',
      icon: Zap,
    },
    {
      title: 'Unified Communications',
      description: 'Integrate voice, video, and chat into a single platform for your Lake Worth workforce.',
      icon: Users,
    },
    {
      title: 'Cloud Scalability',
      description: 'Zultys cloud phone systems that scale effortlessly with Lake Worth\'s business growth.',
      icon: Cloud,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Lake Worth Zultys <br /><span className="text-zultys-green">Business Phone Systems.</span></>}
          subtitle="Empower your Lake Worth organization with the most reliable Zultys business phone systems in North Texas. As your local authorized Zultys dealer, we provide expert sales, professional installation, and 24/7 support for businesses across Lake Worth."
          icon={Zap}
          iconLabel="Authorized Lake Worth Zultys Partner"
          buttonText="Get a Free Lake Worth Quote"
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
                  The Preferred <span className="text-zultys-green">Lake Worth Zultys</span> Partner for Business.
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Lake Worth is a vibrant and rapidly growing community in North Texas, known for its excellent schools, family-friendly atmosphere, and a diverse business landscape that includes professional offices, retail centers, and a variety of service providers. In such a competitive environment, Lake Worth businesses require a communication infrastructure that is as reliable and efficient as their operations. That's where <strong>Lake Worth Zultys</strong> solutions from DFW Business Communications come in.
                  </p>
                  <p className="leading-relaxed mb-8">
                    We specialize in delivering high-performance <strong>Zultys business phone systems Lake Worth</strong> businesses trust to stay connected. Whether you're a professional firm near the Lake Worth City Hall or a growing service business near the SH-199 corridor, our VoIP and unified communications solutions provide the reliability, scalability, and advanced features you need to thrive in today's fast-paced environment.
                  </p>
                  <p className="leading-relaxed mb-8">
                    Our local presence in the DFW area ensures that we understand the unique challenges and opportunities facing Lake Worth organizations. We don't just sell hardware; we provide a comprehensive communication strategy that includes professional site surveys, seamless installation, and ongoing 24/7 local support.
                  </p>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <h3 className="text-2xl font-black text-charcoal mb-4">Why Lake Worth Businesses Choose Us</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Our commitment to Lake Worth goes beyond technology. We pride ourselves on being a local partner that understands the pulse of the city. We provide on-site training for your staff, ensuring everyone is comfortable with the new system from day one.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Lake Worth Zultys Business Phone Systems and VoIP Experts"
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
                    alt="Zultys Unified Communications for Lake Worth Business"
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
                  <span className="text-zultys-green">for Lake Worth Enterprises.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Implementing <strong>Lake Worth unified communications</strong> is essential for modern businesses. Zultys brings voice, video, chat, and presence into a single interface, allowing your Lake Worth team to collaborate effectively regardless of their physical location.
                  </p>
                  <p className="leading-relaxed mb-6">
                    With Zultys ZAC (Zultys Advanced Communicator), your employees have a powerful toolset at their fingertips. They can see the availability of colleagues, initiate a video conference with one click, and manage their calls with ease. This level of integration is particularly valuable for Lake Worth businesses with multiple locations or a distributed workforce.
                  </p>
                  <p className="leading-relaxed">
                    Furthermore, Zultys unified communications includes robust mobile integration. Your Lake Worth team can take their office extension with them on their smartphones, ensuring they stay connected and productive while traveling or working from home.
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
                  <span className="text-zultys-gold">Solutions in Lake Worth.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Choosing between a <strong>Zultys cloud phone system Lake Worth</strong> and an on-premise solution is a strategic decision. Zultys Cloud offers the ultimate in flexibility and scalability, moving your communication infrastructure to our secure, redundant data centers.
                  </p>
                  <p className="leading-relaxed mb-6">
                    For Lake Worth businesses that are rapidly growing or have a distributed workforce, the cloud is often the preferred choice. It eliminates the need for significant upfront hardware investment and provides a predictable monthly cost. Scalability is seamless—adding new users or locations is as simple as a few clicks.
                  </p>
                  <p className="leading-relaxed">
                    Hyper-growth companies in Lake Worth often find that the cloud model allows them to focus on their core business while we handle the complexities of their communication platform.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-gold/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_CLOUD_SERVICES}
                    alt="Zultys Cloud Phone Systems Lake Worth"
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
                      alt="Zultys MX-SE for Lake Worth Small Business"
                      className="w-full h-auto max-h-[250px] object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-white p-10 border border-white/10 group">
                    <ImageWithFallback
                      src={ZULTYS_ZIP_45G_EASE}
                      alt="Zultys ZIP 45G for Lake Worth Teams"
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
                    At the core of our <strong>Lake Worth Zultys</strong> solutions is the Zultys MX series. This enterprise-grade platform is designed for 99.999% reliability, ensuring your business communications are always up and running.
                  </p>
                  <p className="leading-relaxed mb-6">
                    The MX series is a truly unified platform, meaning all features—from voice and video to contact center and mobile integration—run on a single software stream. This eliminates the complexity and instability often found in "bolted-on" solutions. For a Lake Worth business, this means a more stable system and a lower total cost of ownership.
                  </p>
                  <p className="leading-relaxed">
                    Whether you choose the MX-SE for a growing office or the MX250 for a large enterprise, you get the same powerful feature set. This allows your Lake Worth organization to scale seamlessly as you grow, without having to learn a new system or replace your existing infrastructure.
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
                Empowering Your <span className="text-zultys-green">Lake Worth Workforce.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Zultys provides a suite of applications that turn your phone system into a powerful productivity engine for your Lake Worth team.
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
                  description: 'Take your Lake Worth office extension anywhere. Full UC functionality on your smartphone with seamless handoff.',
                  image: ZULTYS_MX_MOBILE,
                },
                {
                  title: 'MXmeeting',
                  description: 'Professional web conferencing for up to 500 participants. Perfect for Lake Worth businesses with remote clients.',
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
                  <span className="text-zultys-green">Support in Lake Worth.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="leading-relaxed mb-6">
                    A successful <strong>Lake Worth Zultys</strong> rollout requires more than just good hardware. It requires a partner who understands your network, your workflow, and your business goals. DFW Business Communications provides a white-glove implementation process that ensures a smooth transition with zero downtime.
                  </p>
                  <p className="leading-relaxed mb-6">
                    We start with a comprehensive site survey of your Lake Worth office to identify any potential network issues. We then pre-configure your Zultys system to your exact specifications, including call routing, auto-attendants, and user profiles. Our professional installation team then handles the physical setup and provides hands-on training for your entire staff.
                  </p>
                  <p className="leading-relaxed">
                    Once your system is live, our support doesn't stop. We provide 24/7 local monitoring and support for all our Lake Worth clients. If you ever have a question or an issue, you can speak directly to a local expert who can be on-site in Lake Worth quickly if needed. That's the DFW Business Communications difference.
                  </p>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl">
                <h3 className="text-2xl font-black text-charcoal mb-8">Lake Worth Support Features</h3>
                <div className="space-y-8">
                  {[
                    { title: 'On-Site Training', desc: 'Personalized training for your Lake Worth team at your location.' },
                    { title: '24/7 Monitoring', desc: 'Proactive monitoring of your Lake Worth Zultys system to ensure maximum uptime.' },
                    { title: 'Local Technicians', desc: 'Expert DFW-based technicians who can be on-site in Lake Worth quickly.' },
                    { title: 'Number Porting', desc: 'We handle the entire process of moving your existing Lake Worth numbers.' }
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
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-10">Ready to Upgrade Your <span className="text-zultys-green">Lake Worth Communications?</span></h2>
              <div className="prose prose-lg text-gray-600 mx-auto max-w-none prose-strong:text-charcoal">
                <p className="text-xl leading-relaxed mb-8">
                  Don't let an outdated phone system hold your Lake Worth business back. Experience the power, reliability, and flexibility of a modern <strong>Lake Worth Zultys business phone system</strong> solution from DFW Business Communications.
                </p>
                <p className="text-xl leading-relaxed mb-12">
                  Whether you're looking for a cloud-based system, an on-premise appliance, or a hybrid solution, we have the expertise to design and implement the perfect platform for your needs. Contact us today to schedule your free Lake Worth site survey and discover how we can help your organization communicate more effectively.
                </p>
                <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
                  <p className="font-black text-charcoal text-3xl mb-4">
                    Call Leroy today at <span className="text-zultys-green">817-231-2962</span>
                  </p>
                  <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">For a free Lake Worth Zultys consultation.</p>
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
