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
  Monitor, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Network,
  Layers,
  Shield
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_ZIP_45G,
  ZULTYS_FORT_WORTH_BG,
  SUPPORT_TEAM,
} from '../constants/images';

export function ZIP43G() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys ZIP 43G | Cost-Effective Gigabit IP Phone Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'The Zultys ZIP 43G is an affordable, entry-level Gigabit IP phone with a backlit screen. The perfect VoIP workhorse for DFW businesses needing reliability and performance.';
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
    metaKeywords.setAttribute('content', 'Zultys ZIP 43G, ZIP 43G phone, entry level IP phone, Gigabit IP phone, Zultys dealer Dallas, Zultys support Fort Worth, business VoIP phone DFW');

    // Canonical URL
    const path = typeof window !== 'undefined' ? window.location.pathname : '/fort-worth-zultys-zip-43g-phone';
    const canonicalUrl = `https://dallasfortworthzultys.com${path.startsWith('/') ? path : `/${path}`}`;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // JSON-LD Schema - Truthful Product schema without unverified offers
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${canonicalUrl}#product`,
      name: 'Zultys ZIP 43G IP Phone',
      description: 'Cost-effective Gigabit IP phone with 2.8-inch backlit display for small and medium businesses.',
      url: canonicalUrl,
      brand: {
        '@type': 'Brand',
        name: 'Zultys'
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  const specs = [
    { label: 'Display', value: '2.8" Backlit LCD', icon: Monitor },
    { label: 'Lines', value: '3 Line Keys', icon: Layers },
    { label: 'Network', value: 'Dual Gigabit Ports', icon: Network },
    { label: 'Audio', value: 'Full HD Audio', icon: Phone },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Zultys <span className="text-zultys-green">ZIP 43G</span> <br />Exceptional Value Phone.</>}
          subtitle="The perfect balance of performance and value. A cost-effective Gigabit IP phone that brings enterprise features to every DFW office."
          icon={Zap}
          iconLabel="Exceptional Value"
          buttonText="Request ZIP 43G Quote"
          onButtonClick={openQuote}
        />

        {/* Specs Grid */}
        <section className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                    <spec.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium">{spec.label}</div>
                    <div className="text-lg font-bold text-gray-900">{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  The Smart Choice for DFW Businesses: Zultys ZIP 43G
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    The <strong>Zultys ZIP 43G</strong> is designed for businesses in the Dallas-Fort Worth area that demand high performance without the high price tag. It combines a compact footprint with a professional feature set, making it the ideal choice for open-plan offices, retail environments, and cubicle-based teams in North Texas. Despite its cost-effective positioning, the ZIP 43G doesn't compromise on quality, offering the same Gigabit connectivity and HD audio found in Zultys' more expensive models.
                  </p>
                  <p>
                    The 2.8-inch backlit graphical LCD display provides clear visibility for call information and system status, even in varied lighting conditions common in DFW workplaces. The intuitive interface and dedicated function keys ensure that your team can handle calls efficiently, improving overall productivity and customer response times across your Dallas or Fort Worth organization.
                  </p>
                  <p>
                    With dual Gigabit Ethernet ports, the ZIP 43G ensures that your desktop network connection remains fast and reliable. This is a critical feature for DFW businesses that rely on cloud applications and high-speed data transfer. The integrated Power over Ethernet (PoE) support simplifies deployment, reducing the need for extra power outlets and making it easy to scale your communication system as your North Texas business grows.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Maximizing Value for Your DFW Communication Budget</h3>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    <strong>Maximizing Value for Your DFW Communication Budget</strong> is a top priority for many North Texas business owners. The Zultys ZIP 43G allows you to equip your entire team with high-quality, Gigabit-capable IP phones without breaking the bank. DFW Business Communications helps you leverage the ZIP 43G's cost-effectiveness to build a robust and professional communication infrastructure that serves your Dallas or Fort Worth business for years to come.
                  </p>
                  <p>
                    Our local DFW experts can show you how the ZIP 43G integrates seamlessly with the Zultys MX series IP PBX, providing access to advanced unified communications features at a highly competitive price point. By choosing the ZIP 43G, you're making a smart, value-driven decision for your North Texas organization's future.
                  </p>
                </div>
                
                <div className="mt-12 space-y-4">
                  {[
                    '2.8" 320x240 Backlit Graphical LCD Display',
                    'Dual Gigabit Ethernet Ports for High-Speed Connectivity',
                    'Full Duplex Speakerphone with HD Audio',
                    'Power over Ethernet (PoE) Support',
                    '3 Programmable Line Keys with Dual-Color LEDs',
                    'Support for up to 3 SIP Accounts',
                    'Integrated Wall Mount Bracket Included',
                    'Compatible with Zultys Cloud and On-Premise Systems'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-100 p-4">
                  <ImageWithFallback
                    src={SUPPORT_TEAM}
                    alt="Zultys ZIP 43G Business Phone Support in DFW"
                    className="w-full h-auto max-h-[600px] object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-16">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Professional Features for North Texas Teams</h3>
                  <p>
                    The <strong>Zultys ZIP 43G</strong> may be cost-effective, but it's packed with professional features that DFW teams need to stay productive. From advanced call handling like transfer, hold, and conference to integrated presence status, the ZIP 43G provides the tools required for modern business communication.
                  </p>
                  <p>
                    For businesses in Dallas and Fort Worth that need a reliable and easy-to-use phone for their general staff, the ZIP 43G is the perfect solution. Its compact design and intuitive operation make it a favorite for DFW organizations that value both performance and office aesthetics.
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Reliable Performance in the DFW Market</h3>
                  <p>
                    In the fast-paced DFW business market, reliability is non-negotiable. The ZIP 43G is built to the same high standards as all Zultys products, ensuring consistent performance and long-term durability. When paired with a Zultys MX series system, you benefit from a communication platform designed for maximum uptime and security.
                  </p>
                  <p>
                    DFW Business Communications provides the local expertise and support needed to ensure your ZIP 43G phones are always performing at their best. From initial configuration to ongoing maintenance, we are your trusted partner for Zultys technology in North Texas.
                  </p>
                </div>
              </div>

              <div className="bg-blue-900 text-white p-12 rounded-3xl shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-6 text-white">Enterprise Security for Your DFW Business</h3>
                    <p className="text-white mb-6">
                      Security is a top priority for every DFW business. The ZIP 43G supports industry-standard encryption protocols like TLS and SRTP, ensuring that your voice communications are protected from unauthorized access.
                    </p>
                    <p className="text-white">
                      This level of security is essential for North Texas companies in all sectors, providing peace of mind that your sensitive business conversations remain confidential. Trust Zultys and DFW Business Communications to keep your communications secure in the Dallas-Fort Worth area.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Shield className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">Secure Voice</h4>
                      <p className="text-sm text-white">Encryption support.</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Zap className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">High Value</h4>
                      <p className="text-sm text-white">Cost-effective performance.</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Phone className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">HD Audio</h4>
                      <p className="text-sm text-white">Clear voice quality.</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Network className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">Gigabit Speed</h4>
                      <p className="text-sm text-white">Fast network ports.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 bg-slate-50 p-12 rounded-3xl border border-slate-200">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose DFW Business Communications for Your ZIP 43G?</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="text-xl font-bold text-blue-600 mb-4">Local DFW Expertise</h4>
                  <p className="text-gray-600">We are based in Fort Worth and have served the DFW area for over 20 years. We understand the local business environment and provide personalized service that national vendors can't match.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="text-xl font-bold text-blue-600 mb-4">Certified Zultys Support</h4>
                  <p className="text-gray-600">Our technicians are fully certified on the Zultys platform, ensuring your ZIP 43G phones are installed and maintained to the highest standards in North Texas.</p>
                </div>
              </div>
              <div className="mt-12 text-center">
                <Button
                  size="lg"
                  onClick={openQuote}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg"
                >
                  Get Your Free ZIP 43G Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
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
