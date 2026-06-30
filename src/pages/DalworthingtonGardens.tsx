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

export function DalworthingtonGardens() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Dalworthington Gardens Zultys Business Phone Systems | VoIP & IP PBX Solutions';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Dalworthington Gardens Zultys business phone systems and VoIP solutions. Authorized Zultys dealer providing unified communications, cloud phone systems, and local support for Dalworthington Gardens businesses.';
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
    metaKeywords.setAttribute('content', 'Dalworthington Gardens Zultys, Zultys business phone systems Dalworthington Gardens, Dalworthington Gardens business VoIP solutions, Dalworthington Gardens unified communications, Zultys cloud phone system Dalworthington Gardens, authorized Zultys dealer Dalworthington Gardens TX');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/dalworthington-gardens-tx-zultys-phone-systems');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Dalworthington Gardens Zultys Support',
      description: 'Authorized Zultys dealer providing enterprise business phone systems and VoIP solutions to businesses in Dalworthington Gardens, Texas.',
      url: 'https://dallasfortworthzultys.com/dalworthington-gardens-tx-zultys-phone-systems',
      telephone: '817-231-2962',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dalworthington Gardens',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '32.7018',
        longitude: '-97.1581',
      },
      areaServed: 'Dalworthington Gardens, TX',
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
      description: 'Tailored Zultys systems for Dalworthington Gardens\' unique professional offices, boutique services, and established commercial landscape.',
      icon: MapPin,
    },
    {
      title: 'Arlington Area Focus',
      description: 'Rapid on-site support for businesses located within the heart of Dalworthington Gardens and the greater Arlington area.',
      icon: Zap,
    },
    {
      title: 'Unified Communications',
      description: 'Integrate voice, video, and chat into a single platform for your Dalworthington Gardens workforce.',
      icon: Users,
    },
    {
      title: 'Cloud Scalability',
      description: 'Zultys cloud phone systems that scale effortlessly with Dalworthington Gardens\' business growth.',
      icon: Cloud,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Dalworthington Gardens Zultys <br /><span className="text-zultys-green">Business Phone Systems.</span></>}
          subtitle="Empower your Dalworthington Gardens organization with the most reliable Zultys business phone systems in North Texas. As your local authorized Zultys dealer, we provide expert sales, professional installation, and 24/7 support for businesses across Dalworthington Gardens."
          icon={Zap}
          iconLabel="Authorized Dalworthington Gardens Partner"
          buttonText="Get a Free Consultation"
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
                  The Preferred <span className="text-zultys-green">Dalworthington Gardens</span> Zultys Partner.
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Dalworthington Gardens is a distinctive and prestigious community in Tarrant County, known for its small-town charm within a major metropolitan area, high-end residential landscape, and a diverse range of professional and boutique businesses. In such a high-quality environment, Dalworthington Gardens businesses require a communication infrastructure that mirrors their commitment to excellence. That's where <strong>Dalworthington Gardens Zultys</strong> solutions from DFW Business Communications come in.
                  </p>
                  <p className="leading-relaxed mb-8">
                    We specialize in delivering high-performance <strong>Zultys business phone systems Dalworthington Gardens</strong> organizations trust to stay connected. Whether you're a professional practice near Pioneer Parkway or a growing service business in the heart of the city, our VoIP and unified communications solutions provide the reliability, scalability, and advanced features you need to maintain a professional edge.
                  </p>
                  <p className="leading-relaxed mb-8">
                    Our local presence in North Texas ensures that we understand the unique character and business expectations of Dalworthington Gardens organizations. We don't just sell technology; we provide a comprehensive communication strategy that includes professional site surveys, seamless installation, and ongoing 24/7 local support.
                  </p>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <h3 className="text-2xl font-black text-charcoal mb-4">Why Dalworthington Gardens Businesses Choose Us</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Dalworthington Gardens is a vital commercial part of the Tarrant landscape. We are your local partner that understands the pulse of the community. We provide personalized on-site training for your staff, ensuring your team can leverage every feature of your new Zultys system from day one.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Dalworthington Gardens Zultys Business Phone Systems and VoIP Experts"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
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
                    alt="Zultys Unified Communications for Dalworthington Gardens Business"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block bg-zultys-green/10 text-zultys-green px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Unified Communications
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Unified Communications <br />
                  <span className="text-zultys-green">for DWG Enterprises.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Implementing <strong>Dalworthington Gardens unified communications</strong> is essential for modern business flow. Zultys brings voice, video, chat, and presence into a single interface, allowing your team to collaborate effectively regardless of their physical location.
                  </p>
                  <p className="leading-relaxed mb-6">
                    With Zultys ZAC (Zultys Advanced Communicator), your employees have a powerful toolset at their fingertips. They can manage calls, see colleague availability, and initiate video meetings with one click. This level of integration is particularly valuable for professional firms in Dalworthington Gardens that demand high efficiency and seamless client interaction.
                  </p>
                  <p className="leading-relaxed">
                    Furthermore, Zultys mobile tools ensure your extension is always with you. Your Dalworthington Gardens workforce can take calls on their smartphones with full office functionality, maintaining a professional presence throughout North Texas.
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
                  <span className="text-zultys-gold">Solutions in DWG.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Choosing between a <strong>Zultys cloud phone system Dalworthington Gardens</strong> and an on-premise solution is a strategic decision for your development. Zultys Cloud offers the ultimate in flexibility and scalability, hosting your communication platform in our secure, redundant data centers.
                  </p>
                  <p className="leading-relaxed mb-6">
                    For Dalworthington Gardens businesses that are growing or have mobile teams, the cloud is often the preferred choice. It eliminates the need for significant infrastructure maintenance and provides a predictable monthly cost. Scalability is effortless—adding new users as your organization expands is simple and fast.
                  </p>
                  <p className="leading-relaxed">
                    Local firms in Dalworthington Gardens find that the cloud model allows them to focus on their unique services while we handle the complexities of their communication infrastructure.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-gold/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_CLOUD_SERVICES}
                    alt="Zultys Cloud Phone Systems Dalworthington Gardens"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
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
                      alt="Zultys MX-SE for Dalworthington Gardens Business"
                      className="w-full h-auto max-h-[250px] object-contain transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-white p-10 border border-white/10 group">
                    <ImageWithFallback
                      src={ZULTYS_ZIP_45G_EASE}
                      alt="Zultys ZIP 45G for DWG Teams"
                      className="w-full h-auto max-h-[250px] object-contain transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
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
                    At the heart of our <strong>Dalworthington Gardens Zultys</strong> services is the enterprise-grade MX platform. This system is designed for 99.999% reliability, ensuring your organization stays connected regardless of conditions.
                  </p>
                  <p className="leading-relaxed mb-6">
                    The MX series is a truly unified platform, meaning all features run on a single software stream. For a Dalworthington Gardens organization, this means a more stable system and a lower total cost of ownership compared to fragmented alternatives.
                  </p>
                  <p className="leading-relaxed">
                    Whether you choose the MX-SE for your boutique office or the MX250 for a large enterprise operation, you get the same powerful feature set that scales as your Dalworthington Gardens organization expands.
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
                Empowering Your <span className="text-zultys-green">DWG Workforce.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Zultys provides a suite of applications that turn your phone system into a powerful productivity engine for your local team.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'MXie Desktop',
                  description: 'Complete control of your communications from your desktop. Manage calls and messages with enterprise-level ease.',
                  image: ZULTYS_MXIE,
                },
                {
                  title: 'MXmobile',
                  description: 'Take your office extension anywhere. Full functionality on your smartphone with seamless local connectivity.',
                  image: ZULTYS_MX_MOBILE,
                },
                {
                  title: 'MXmeeting',
                  description: 'Professional web conferencing for your DWG organization. Connect with clients and partners anywhere.',
                  image: ZULTYS_MXMEETING,
                },
              ].map((tool, index) => (
                <Card key={index} className="p-0 border border-gray-100 bg-white hover:shadow-xl transition-all duration-500 group rounded-[2rem] overflow-hidden">
                  <div className="aspect-video bg-gray-50 p-8 group-hover:bg-white transition-colors duration-500">
                    <ImageWithFallback src={tool.image} alt={tool.title} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
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
                  <span className="text-zultys-green">Support in DWG.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="leading-relaxed mb-6">
                    A successful <strong>Dalworthington Gardens Zultys</strong> rollout requires more than just good technology. It requires a partner who understands your local environment and specific goals. DFW Business Communications provides a white-glove implementation process that ensures a smooth transition.
                  </p>
                  <p className="leading-relaxed mb-6">
                    We start with a thorough site survey of your Dalworthington Gardens office. We then pre-configure your Zultys system to your exact needs, including local call routing and auto-attendants. Our professional team handles the physical setup and provides hands-on training for your entire staff.
                  </p>
                  <p className="leading-relaxed">
                    Our support doesn't stop after the sale. We provide 24/7 local monitoring and support for all our Dalworthington Gardens clients. If you have any issue, a local expert is just a phone call away and can be on-site in DWG quickly if required.
                  </p>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl">
                <h3 className="text-2xl font-black text-charcoal mb-8">Dalworthington Gardens Support Features</h3>
                <div className="space-y-8">
                  {[
                    { title: 'Bespoke Installation', desc: 'Expert physical setup and configuration tailored to your specific Dalworthington Gardens facility.' },
                    { title: '24/7 Proactive Monitoring', desc: 'Secure monitoring of your Zultys system to ensure peak performance and uptime.' },
                    { title: 'Arlington Area Experts', desc: 'Connect directly with local DFW technicians who know your specific requirements.' },
                    { title: 'Personalized Local Training', desc: 'Hands-on training for your staff to ensure system mastery from day one.' }
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
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-10">Ready to Upgrade Your <span className="text-zultys-green">DWG Communications?</span></h2>
              <div className="prose prose-lg text-gray-600 mx-auto max-w-none prose-strong:text-charcoal">
                <p className="text-xl leading-relaxed mb-8">
                  Don't let outdated technology hold your Dalworthington Gardens organization back. Experience the power, reliability, and flexibility of a modern <strong>Dalworthington Gardens Zultys business phone system</strong> solution from DFW Business Communications.
                </p>
                <p className="text-xl leading-relaxed mb-12">
                  Whether you're looking for a cloud-based system, an on-premise appliance, or a hybrid solution, we have the Tarrant County expertise to deliver. Contact us today to schedule your free site survey and discover a better way to communicate.
                </p>
                <div className="bg-gray-50 p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
                  <p className="font-black text-charcoal text-3xl mb-4">
                    Call Leroy today at <span className="text-zultys-green">817-231-2962</span>
                  </p>
                  <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">For a free Dalworthington Gardens consultation.</p>
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
