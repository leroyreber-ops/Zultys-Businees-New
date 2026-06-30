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

export function ZIP45G() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys ZIP 45G | Versatile Gigabit IP Phone Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'The Zultys ZIP 45G is a versatile, high-performance Gigabit IP phone with a crisp backlit display. The ideal business workhorse for Dallas-Fort Worth companies of all sizes.';
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
    metaKeywords.setAttribute('content', 'Zultys ZIP 45G, ZIP 45G phone, business IP phone, Gigabit IP phone, Zultys DFW, Zultys dealer Fort Worth, mid-range VoIP phone');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-zip-45g-ip-phone');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Zultys ZIP 45G IP Phone',
      description: 'Versatile Gigabit IP phone with 3.7-inch backlit display and 21 programmable keys.',
      brand: {
        '@type': 'Brand',
        name: 'Zultys'
      },
      offers: {
        '@type': 'AggregateOffer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'USD',
        seller: {
          '@type': 'Organization',
          name: 'DFW Business Communications'
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  const specs = [
    { label: 'Display', value: '3.7" Backlit LCD', icon: Monitor },
    { label: 'Lines', value: '6 Line Keys', icon: Layers },
    { label: 'Network', value: 'Dual Gigabit Ports', icon: Network },
    { label: 'Audio', value: 'Full HD Audio', icon: Phone },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Zultys <span className="text-zultys-green">ZIP 45G</span> <br />Business Workhorse.</>}
          subtitle="The ultimate business workhorse. A versatile Gigabit IP phone that delivers enterprise features and HD audio to every desk in DFW."
          icon={Zap}
          iconLabel="Business Workhorse"
          buttonText="Request ZIP 45G Quote"
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
                  The Ultimate Business Workhorse: Zultys ZIP 45G for DFW Offices
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    The <strong>Zultys ZIP 45G</strong> is engineered to be the backbone of business communications for companies across the Dallas-Fort Worth metroplex. In a region known for its dynamic economy and diverse business landscape, having a reliable, high-performance desk phone is essential for maintaining productivity and delivering exceptional customer service. The ZIP 45G is designed to meet these needs, offering a professional feature set, crystal-clear audio, and the durability required for years of heavy business use.
                  </p>
                  <p>
                    At the center of the ZIP 45G is its 3.7-inch backlit graphical LCD display. This high-contrast screen ensures that call information, corporate directories, and presence status are easy to read in any office environment, from brightly lit showrooms in Dallas to professional offices in Fort Worth. The intuitive interface allows users to navigate features quickly, reducing the learning curve and empowering your team to focus on their core responsibilities.
                  </p>
                  <p>
                    Connectivity is a hallmark of the ZIP 45G. With dual Gigabit Ethernet ports, it ensures that your desktop computer maintains maximum network speed even when sharing a single network connection with the phone. This is critical for DFW businesses that rely on high-speed internet for cloud-based applications, video conferencing, and large data transfers. The integrated Power over Ethernet (PoE) support simplifies installation and reduces cable clutter, making it an ideal choice for modern, streamlined workspaces.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Optimizing Your DFW Office Network for ZIP 45G Performance</h3>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    <strong>Optimizing Your DFW Office Network</strong> is essential for getting the most out of your ZIP 45G investment. DFW Business Communications provides expert guidance on configuring your local network to prioritize voice traffic, ensuring that your North Texas business enjoys crystal-clear call quality at all times. By implementing Quality of Service (QoS) and dedicated VLANs, we help you eliminate jitter and latency issues that can plague lesser VoIP systems.
                  </p>
                  <p>
                    Our local DFW technicians understand the unique networking challenges faced by businesses in Dallas and Fort Worth. We work closely with your IT team to ensure that your Zultys ZIP 45G phones are integrated seamlessly into your existing infrastructure, providing a robust and reliable communication platform for your entire North Texas organization.
                  </p>
                </div>
                
                <div className="mt-12 space-y-4">
                  {[
                    '3.7" 360x160 Backlit Graphical LCD Display for Clear Visibility',
                    'Dual Gigabit Ethernet Ports for High-Speed Desktop Connectivity',
                    'Support for up to 3 ZIP 450M Expansion Modules (up to 180 extra keys)',
                    'Full Duplex Speakerphone with HD Audio and Echo Cancellation',
                    'Power over Ethernet (PoE) Support for Simplified Deployment',
                    'Integrated Bluetooth Support (via USB Dongle) for Wireless Headsets',
                    '21 Programmable Soft Keys for Custom Functions and BLF',
                    'Support for up to 6 SIP Accounts for Versatile Call Handling'
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
                    alt="Zultys ZIP 45G Business Phone Support in DFW"
                    className="w-full h-auto max-h-[600px] object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-16">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Crystal-Clear HD Audio for Every Interaction</h3>
                  <p>
                    In business, clarity is paramount. A misunderstood instruction or a garbled conversation can lead to costly mistakes and frustrated clients. The <strong>Zultys ZIP 45G</strong> addresses this by incorporating high-definition (HD) audio technology into both the handset and the full-duplex speakerphone. This ensures that every conversation is clear, natural, and free from the distortion often found in lesser IP phones.
                  </p>
                  <p>
                    For businesses in the Dallas-Fort Worth area that rely heavily on phone-based sales, customer support, or internal collaboration, the ZIP 45G's audio quality is a significant advantage. Advanced noise-reduction and echo-cancellation technologies further enhance the experience, allowing your team to communicate effectively even in busy or noisy office environments.
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Versatile Connectivity and Expansion Options</h3>
                  <p>
                    The ZIP 45G is designed to grow with your business. It features an integrated USB port that can be used to add Bluetooth support via a dongle, allowing users to pair their favorite wireless headsets for hands-free communication. It also supports Electronic Hook Switch (EHS) for a wide range of professional wireless headsets, providing DFW employees with the freedom to move around their office while staying connected.
                  </p>
                  <p>
                    For users who need to monitor many lines or extensions, the ZIP 45G supports up to three ZIP 450M expansion modules. Each module adds 60 additional programmable keys, providing a total of up to 180 extra keys for speed dials, busy lamp fields (BLF), and other critical functions. This scalability ensures that the ZIP 45G is a future-proof investment for your growing DFW team.
                  </p>
                </div>
              </div>

              <div className="bg-blue-900 text-white p-12 rounded-3xl shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-6 text-white">Reliability and Security You Can Trust</h3>
                    <p className="text-white mb-6">
                      In today's digital world, the security of your business communications is more important than ever. The ZIP 45G supports enterprise-grade security protocols, including TLS and SRTP, to ensure that your voice traffic and signaling are encrypted and protected from unauthorized access.
                    </p>
                    <p className="text-white">
                      This is critical for DFW companies in sensitive industries like healthcare, legal, and finance, where maintaining confidentiality is a top priority. Furthermore, when paired with a Zultys MX series IP PBX, you benefit from a system designed for 99.999% uptime, ensuring that your business is always reachable.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Shield className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">Secure Voice</h4>
                      <p className="text-sm text-white">SRTP & TLS encryption.</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Zap className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">99.999% Uptime</h4>
                      <p className="text-sm text-white">Enterprise-grade reliability.</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Phone className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">HD Audio</h4>
                      <p className="text-sm text-white">Wideband voice quality.</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Network className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">Gigabit Speed</h4>
                      <p className="text-sm text-white">Dual 10/100/1000 ports.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Seamless Integration with Zultys Unified Communications</h3>
                <p>
                  The true power of the <strong>Zultys ZIP 45G</strong> is realized when it is integrated into the broader Zultys Unified Communications ecosystem. When paired with a Zultys MX series IP PBX, the ZIP 45G becomes a gateway to a wealth of enterprise-grade features. Users can benefit from unified presence, which allows them to see the status of their colleagues across the entire organization, whether they are in the Fort Worth office, working from home in Dallas, or traveling.
                </p>
                <p>
                  The ZIP 45G also works in perfect harmony with the Zultys Advanced Communicator (ZAC) desktop client and the MXmobile app. This allows for a truly unified experience, where calls can be seamlessly moved between devices, and voicemails and faxes can be accessed from anywhere. For DFW businesses that embrace a hybrid work model, this level of integration is essential for maintaining team cohesion and ensuring a consistent customer experience.
                </p>

                <h4 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Advanced Call Handling for North Texas Customer Service Teams</h4>
                <p>
                  For <strong>North Texas Customer Service Teams</strong>, the ZIP 45G offers advanced call handling capabilities that are second to none. Features like multi-line support, professional call queuing, and easy call transfers empower your DFW staff to manage high call volumes with ease. DFW Business Communications helps you customize these features to match your specific customer service workflows, ensuring that every caller in Dallas or Fort Worth receives the attention they deserve.
                </p>
                <p>
                  By leveraging the integrated BLF (Busy Lamp Field) keys, your DFW receptionists can see the status of colleagues at a glance, allowing for faster and more accurate call routing. This efficiency is critical for maintaining a professional image and improving customer satisfaction for your North Texas business.
                </p>

                <h4 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Future-Proof Investment for Dallas-Fort Worth Enterprises</h4>
                <p>
                  Investing in the Zultys ZIP 45G is a <strong>Future-Proof Investment</strong> for your Dallas-Fort Worth enterprise. With its Gigabit connectivity and support for advanced expansion modules, the ZIP 45G is designed to grow alongside your North Texas organization. DFW Business Communications provides ongoing support and firmware updates, ensuring that your Zultys phones always have access to the latest features and security enhancements.
                </p>
                <p>
                  Whether you are expanding your team in Dallas or opening a new branch in Fort Worth, the ZIP 45G provides the scalability and flexibility you need. Trust DFW Business Communications to help you build a communication infrastructure that will serve your North Texas business for years to come.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Efficiency and Ease of Management</h3>
                  <p>
                    The ZIP 45G is designed for operational efficiency. Its support for Power over Ethernet (PoE) means it has a very low power consumption, helping DFW businesses reduce their environmental footprint and lower their energy costs. The dual Gigabit ports also mean you can reduce the amount of cabling required in your office, as each desk only needs a single network drop to support both the phone and the computer.
                  </p>
                  <p>
                    From a management perspective, the ZIP 45G is easy to deploy and maintain. It supports centralized provisioning and remote management through the Zultys MX Administrator tool, allowing your IT team (or your local DFW support partner) to update firmware, change configurations, and troubleshoot issues without ever having to visit the user's desk.
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">A Professional Image for Your DFW Business</h3>
                  <p>
                    The appearance of your office and the tools your employees use send a message to your clients and partners. The ZIP 45G, with its sleek, modern design and professional feature set, projects an image of competence and technological sophistication. It shows that your business values quality and is equipped with the tools needed to provide exceptional service.
                  </p>
                  <p>
                    Whether you are a small startup in Fort Worth or a large enterprise in Dallas, the ZIP 45G provides the professional communication platform you need to succeed. It's the ideal choice for businesses that want the best in performance, reliability, and value.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Partner with DFW Business Communications?</h3>
                <p className="text-center text-xl mb-12 max-w-3xl mx-auto">
                  We are more than just a phone vendor; we are your local communication partner in the Dallas-Fort Worth area.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="text-xl font-bold text-blue-600 mb-4">Local Fort Worth Support</h4>
                    <p className="text-gray-600">We are a local company based right here in Fort Worth. When you need help, we are just a phone call away, providing the kind of personal service and on-site support that national providers simply cannot match.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="text-xl font-bold text-blue-600 mb-4">Expert System Design</h4>
                    <p className="text-gray-600">Our team has over 20 years of experience in the DFW business communications market. We don't just sell phones; we design complete communication strategies tailored to your specific business goals.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="text-xl font-bold text-blue-600 mb-4">Professional Installation</h4>
                    <p className="text-gray-600">Our certified technicians handle every aspect of your installation, ensuring that your ZIP 45G phones are configured correctly and integrated seamlessly into your existing network.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="text-xl font-bold text-blue-600 mb-4">Comprehensive Training</h4>
                    <p className="text-gray-600">We provide detailed, hands-on training for your entire team, ensuring that everyone knows how to use the ZIP 45G's features to improve their productivity and provide better customer service.</p>
                  </div>
                </div>
                <div className="mt-12 text-center">
                  <p className="text-2xl font-bold text-gray-900 mb-6">Ready to equip your DFW team with the Zultys ZIP 45G?</p>
                  <Button
                    size="lg"
                    onClick={openQuote}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg"
                  >
                    Get Your Free ZIP 45G Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="mt-6 text-gray-600 font-medium">Or call Leroy directly at <a href="tel:8172312962" className="text-blue-600 hover:underline">817-231-2962</a></p>
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
