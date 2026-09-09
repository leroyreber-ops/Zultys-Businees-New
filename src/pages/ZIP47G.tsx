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
  ZULTYS_ZIP_47G,
  ZULTYS_FORT_WORTH_BG,
  OFFICE_COMMUNICATION,
} from '../constants/images';

export function ZIP47G() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys ZIP 47G | Professional Color IP Phone Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'The Zultys ZIP 47G is a premium Gigabit IP phone featuring a large 4.3-inch color display. Best-in-class performance for DFW executives, managers, and power users.';
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
    metaKeywords.setAttribute('content', 'Zultys ZIP 47G, ZIP 47G phone, color screen IP phone, Gigabit IP phone, professional Zultys phone, Zultys dealer Fort Worth, Dallas business phones');

    // Canonical URL
    const path = typeof window !== 'undefined' ? window.location.pathname : '/fort-worth-zultys-zip-47g-phone';
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
      name: 'Zultys ZIP 47G IP Phone',
      description: 'Professional Gigabit IP phone with 4.3-inch 480x272 pixel color display and 48 programmable keys.',
      url: canonicalUrl,
      image: ZULTYS_ZIP_47G,
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
    { label: 'Display', value: '4.3" Color LCD', icon: Monitor },
    { label: 'Lines', value: '16 Line Keys', icon: Layers },
    { label: 'Network', value: 'Dual Gigabit Ports', icon: Network },
    { label: 'Audio', value: 'Full HD Audio', icon: Phone },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Zultys <span className="text-zultys-green">ZIP 47G</span> <br />Professional Color Phone.</>}
          subtitle="The perfect balance of performance and value. A high-end Gigabit IP phone designed for managers and power users in DFW."
          icon={Zap}
          iconLabel="Professional Workhorse"
          buttonText="Request ZIP 47G Quote"
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
                  Elegance Meets Performance: The Zultys ZIP 47G for DFW Professionals
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    The <strong>Zultys ZIP 47G</strong> is more than just a desk phone; it is a sophisticated communication terminal designed to meet the rigorous demands of modern business professionals in the Dallas-Fort Worth metroplex. In an era where clear communication and rapid response times are critical for success, the ZIP 47G stands out as a reliable, high-performance workhorse that combines a sleek, professional aesthetic with an impressive array of advanced features.
                  </p>
                  <p>
                    At the heart of the ZIP 47G is its vibrant 4.3-inch color LCD display. This high-resolution screen provides a clear and intuitive interface for managing complex call flows, monitoring the presence status of colleagues, and accessing the phone's extensive menu system. For managers and power users in Fort Worth who handle a high volume of calls, the ability to see at a glance who is calling, who is available, and what features are active is a significant productivity booster.
                  </p>
                  <p>
                    The ZIP 47G is built on a foundation of high-speed connectivity. With dual Gigabit Ethernet ports, it ensures that your desktop computer maintains maximum network throughput even when sharing a single network drop with the phone. This is essential for DFW businesses that rely on data-intensive applications, cloud services, and high-speed internet for their daily operations. The integrated Power over Ethernet (PoE) support further simplifies deployment by eliminating the need for bulky power adapters and reducing cable clutter on the desktop.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Optimizing Your DFW Office Network for ZIP 47G Performance</h3>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    <strong>Optimizing Your DFW Office Network</strong> is essential for getting the most out of your ZIP 47G investment. DFW Business Communications provides expert guidance on configuring your local network to prioritize voice traffic, ensuring that your North Texas business enjoys crystal-clear call quality at all times. By implementing Quality of Service (QoS) and dedicated VLANs, we help you eliminate jitter and latency issues that can plague lesser VoIP systems.
                  </p>
                  <p>
                    Our local DFW technicians understand the unique networking challenges faced by businesses in Dallas and Fort Worth. We work closely with your IT team to ensure that your Zultys ZIP 47G phones are integrated seamlessly into your existing infrastructure, providing a robust and reliable communication platform for your entire North Texas organization.
                  </p>
                </div>
                
                <div className="mt-12 space-y-4">
                  {[
                    'High-Resolution 4.3" 480x272 Color Display for Enhanced Visibility',
                    'Dual Gigabit Ethernet Ports for Maximum Network Performance',
                    'Support for up to 3 ZIP 450M Expansion Modules (up to 180 extra keys)',
                    'Full Duplex Speakerphone with HD Audio and Echo Cancellation',
                    'Electronic Hook Switch (EHS) Support for Wireless Headset Integration',
                    'Integrated Bluetooth Support (via USB Dongle) for Mobile Sync',
                    '27 Programmable Soft Keys for Custom Workflows and BLF',
                    'Support for up to 16 SIP Accounts for Complex Call Handling'
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
                    src={OFFICE_COMMUNICATION}
                    alt="Zultys ZIP 47G Professional IP Phone in DFW Office"
                    className="w-full h-auto max-h-[600px] object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-16">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Unmatched Audio Quality for Crystal-Clear Conversations</h3>
                  <p>
                    In the competitive business landscape of North Texas, every conversation matters. Whether you are closing a deal with a new client in Dallas or coordinating a project with a team in Fort Worth, the clarity of your voice can make all the difference. The <strong>Zultys ZIP 47G</strong> is engineered to deliver exceptional audio quality through its HD handset and full-duplex speakerphone.
                  </p>
                  <p>
                    Utilizing advanced wideband audio technology and sophisticated noise-reduction algorithms, the ZIP 47G ensures that every word is heard with natural clarity. This is particularly important in the open-office environments common in many DFW workplaces, where background noise can often interfere with important calls. The ZIP 47G filters out distractions, allowing you to focus entirely on your caller and provide the highest level of professional service.
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Enhanced Productivity for Managers and Power Users</h3>
                  <p>
                    The ZIP 47G is specifically designed for those who need to do more with their phone. With 27 programmable soft keys, users can customize their phone to match their unique workflows. These keys can be used for speed dials, busy lamp fields (BLF) to monitor colleague status, call park, paging, and many other critical functions.
                  </p>
                  <p>
                    For administrative assistants and department managers in Fort Worth, the ZIP 47G can be further expanded with up to three ZIP 450M expansion modules. Each module adds 60 additional programmable keys, providing a total of up to 180 extra keys. This allows for comprehensive monitoring and management of large teams, ensuring that no call goes unanswered and that every customer is directed to the right person quickly and efficiently.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-12 rounded-3xl shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-6 text-white">Advanced Call Handling and Flexibility</h3>
                    <p className="text-white mb-6">
                      The ZIP 47G offers a level of flexibility that is rare in its class. It supports up to 16 SIP accounts, allowing users to manage multiple lines and identities from a single device. This is ideal for professionals who manage communications for multiple departments or businesses.
                    </p>
                    <p className="text-white">
                      Furthermore, the phone's support for Electronic Hook Switch (EHS) means that users can pair it with a wide range of professional wireless headsets from manufacturers like Jabra and Plantronics. This allows DFW professionals to move freely around their office while staying connected, improving both comfort and productivity during long calls.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Layers className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">16 SIP Accounts</h4>
                      <p className="text-sm text-white">Manage multiple lines with ease.</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Zap className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">BLF Support</h4>
                      <p className="text-sm text-white">Monitor colleague status in real-time.</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Phone className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">HD Voice</h4>
                      <p className="text-sm text-white">Crystal-clear audio on every call.</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <Network className="h-8 w-8 text-blue-400 mb-4" />
                      <h4 className="font-bold mb-2 text-white">Gigabit Ports</h4>
                      <p className="text-sm text-white">Maximum speed for your desktop.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Seamless Integration with the Zultys Ecosystem</h3>
                <p>
                  The true power of the <strong>Zultys ZIP 47G</strong> is realized when it is integrated into the broader Zultys Unified Communications ecosystem. When paired with a Zultys MX series IP PBX, the ZIP 47G becomes a gateway to a wealth of enterprise-grade features. Users can benefit from unified presence, which allows them to see the status of their colleagues across the entire organization, whether they are in the Fort Worth office, working from home in Arlington, or traveling.
                </p>
                <p>
                  The ZIP 47G also works in perfect harmony with the Zultys Advanced Communicator (ZAC) desktop client and the MXmobile app. This allows for a truly unified experience, where calls can be seamlessly moved between devices, and voicemails and faxes can be accessed from anywhere. For DFW businesses that embrace a hybrid work model, this level of integration is essential for maintaining team cohesion and ensuring a consistent customer experience.
                </p>

                <h4 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Advanced Call Handling for North Texas Customer Service Teams</h4>
                <p>
                  For <strong>North Texas Customer Service Teams</strong>, the ZIP 47G offers advanced call handling capabilities that are second to none. Features like multi-line support, professional call queuing, and easy call transfers empower your DFW staff to manage high call volumes with ease. DFW Business Communications helps you customize these features to match your specific customer service workflows, ensuring that every caller in Dallas or Fort Worth receives the attention they deserve.
                </p>
                <p>
                  By leveraging the integrated BLF (Busy Lamp Field) keys, your DFW receptionists can see the status of colleagues at a glance, allowing for faster and more accurate call routing. This efficiency is critical for maintaining a professional image and improving customer satisfaction for your North Texas business.
                </p>

                <h4 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Future-Proof Investment for Dallas-Fort Worth Enterprises</h4>
                <p>
                  Investing in the Zultys ZIP 47G is a <strong>Future-Proof Investment</strong> for your Dallas-Fort Worth enterprise. With its Gigabit connectivity and support for advanced expansion modules, the ZIP 47G is designed to grow alongside your North Texas organization. DFW Business Communications provides ongoing support and firmware updates, ensuring that your Zultys phones always have access to the latest features and security enhancements.
                </p>
                <p>
                  Whether you are expanding your team in Dallas or opening a new branch in Fort Worth, the ZIP 47G provides the scalability and flexibility you need. Trust DFW Business Communications to help you build a communication infrastructure that will serve your North Texas business for years to come.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Enterprise-Grade Security and Reliability</h3>
                  <p>
                    In today's digital age, the security of your business communications is paramount. The ZIP 47G supports industry-standard security protocols, including TLS and SRTP, to ensure that your voice traffic and signaling are encrypted and protected from unauthorized access. This is particularly important for DFW companies in sensitive industries such as healthcare, legal, and finance, where maintaining confidentiality is a legal and ethical requirement.
                  </p>
                  <p>
                    Reliability is another core strength of the Zultys brand. The ZIP 47G is built with high-quality components and is designed for years of heavy business use. When combined with the redundant architecture of the Zultys MX platform, you can be confident that your communication system will be there when you need it most, providing the 99.999% uptime that modern businesses demand.
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Environmental and Operational Efficiency</h3>
                  <p>
                    The ZIP 47G is designed with efficiency in mind. Its support for Power over Ethernet (PoE) Class 2 means it has a very low power consumption, helping DFW businesses reduce their environmental footprint and lower their energy costs. The dual Gigabit ports also mean you can reduce the amount of cabling required in your office, as each desk only needs a single network drop to support both the phone and the computer.
                  </p>
                  <p>
                    From an operational perspective, the ZIP 47G is easy to deploy and manage. It supports centralized provisioning and remote management through the Zultys MX Administrator tool, allowing your IT team (or your local DFW support partner) to update firmware, change configurations, and troubleshoot issues without ever having to visit the user's desk.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-12 rounded-3xl border border-blue-200">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">The DFW Business Communications Advantage</h3>
                <p className="text-center text-xl mb-12 max-w-3xl mx-auto">
                  Choosing the right phone is only half the battle. Choosing the right partner to implement and support it is just as important.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100">
                    <h4 className="text-xl font-bold text-blue-600 mb-4">Local Fort Worth Presence</h4>
                    <p className="text-gray-600">We are a local company based right here in Fort Worth. We understand the DFW business environment and provide the kind of personal, on-site service that national providers simply cannot match.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100">
                    <h4 className="text-xl font-bold text-blue-600 mb-4">Expert Implementation</h4>
                    <p className="text-gray-600">Our technicians are Zultys-certified experts. We don't just "plug in the phones"; we optimize your network, configure every feature to your specific needs, and ensure a seamless transition.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100">
                    <h4 className="text-xl font-bold text-blue-600 mb-4">Hands-On Staff Training</h4>
                    <p className="text-gray-600">A powerful phone is only useful if your team knows how to use it. We provide comprehensive, hands-on training for all your employees, ensuring they are comfortable and productive from day one.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100">
                    <h4 className="text-xl font-bold text-blue-600 mb-4">24/7 Local Support</h4>
                    <p className="text-gray-600">If you ever have a question or an issue, we are just a phone call away. Our local support team is ready to provide fast, reliable assistance whenever you need it, keeping your DFW business connected.</p>
                  </div>
                </div>
                <div className="mt-12 text-center">
                  <p className="text-2xl font-bold text-gray-900 mb-6">Ready to upgrade your DFW office with the Zultys ZIP 47G?</p>
                  <Button
                    size="lg"
                    onClick={openQuote}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg"
                  >
                    Schedule Your Free Consultation
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
