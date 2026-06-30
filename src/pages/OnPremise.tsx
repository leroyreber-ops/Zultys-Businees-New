import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Server, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Lock, 
  Cpu, 
  Network,
  Database,
  Settings,
  Clock
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_FORT_WORTH_BG,
  ZULTYS_MX250,
  OFFICE_COMMUNICATION,
} from '../constants/images';

export function OnPremise() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Zultys On-Premise Solutions | Local Business Phone Systems Fort Worth';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Zultys on-premise communication solutions for businesses in Fort Worth. Secure, reliable, and self-hosted IP PBX systems for DFW organizations.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys On-Premise Communication Solutions',
      description: 'Secure and robust on-site Zultys communication systems for businesses in Dallas-Fort Worth.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'DFW Business Communications'
      },
      areaServed: 'Dallas-Fort Worth'
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src={ZULTYS_FORT_WORTH_BG}
              alt="Zultys On-Premise Solutions Fort Worth"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-500/30">
                <Server className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-100 uppercase tracking-wider">On-Premise Communication Solutions</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Zultys On-Premise Solutions
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-white leading-relaxed">
                Total control, maximum security, and unmatched reliability. 
                Self-hosted IP PBX appliances for DFW businesses that demand the best.
              </p>
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
              >
                Request On-Premise Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose On-Premise?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                For many organizations, an on-site system provides the ultimate level of security and customization.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Complete Control',
                  description: 'Manage your own hardware, data, and security protocols within your DFW office infrastructure.',
                  icon: Settings,
                },
                {
                  title: 'Maximum Security',
                  description: 'Keep your communication data entirely within your own network for the highest level of privacy.',
                  icon: Lock,
                },
                {
                  title: 'Unmatched Reliability',
                  description: 'Local appliances ensure that your internal communications stay up even if your internet connection goes down.',
                  icon: Shield,
                },
              ].map((benefit, index) => (
                <Card key={index} className="p-8 border-slate-200 hover:border-blue-500 transition-colors">
                  <div className="p-3 bg-blue-100 rounded-xl w-fit mb-6">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section 1: Introduction */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Zultys On-Premise Solutions: Local Control for Your DFW Business
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    In an era where cloud-based services are increasingly common, many businesses in the Dallas-Fort Worth area still recognize the significant advantages of maintaining their own on-site communication infrastructure. <strong>Zultys on-premise phone systems Fort Worth</strong> provide the ultimate level of control, security, and reliability for organizations that demand the best. By hosting your communication platform on-site, you gain total sovereignty over your data, your hardware, and your security protocols.
                  </p>
                  <p>
                    Zultys on-premise solutions are built around our high-performance MX series appliances, which provide a robust and all-in-one platform for your entire organization. These systems are designed to handle high call volumes, complex routing, and deep integration with your existing IT assets. Whether you are a single-site business in Fort Worth or a multi-location enterprise in Dallas, Zultys on-premise delivers the enterprise-grade tools you need to thrive.
                  </p>
                  <p>
                    At DFW Business Communications, we have over 20 years of experience designing, implementing, and supporting on-premise communication solutions for businesses across North Texas. We understand the unique needs of organizations that prefer to own and manage their own technology assets, and we are dedicated to providing <strong>on-site VoIP solutions in DFW</strong> that are both powerful and manageable.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-100 p-4">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="On-Premise Communications Solutions DFW"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 2: Benefits */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">The Benefits of On-Site Communication Infrastructure</h2>
              <p className="text-xl text-gray-600">
                Gain total control and unmatched reliability with a self-hosted Zultys communication system.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                Choosing an on-premise solution offers several key benefits for DFW businesses. First and foremost is <strong>total control</strong>. You own the hardware, you manage the software updates, and you define the security protocols that best meet your organization's needs. This level of control is essential for businesses with strict compliance requirements or those that simply prefer to have direct oversight of their critical technology assets.
              </p>
              <p>
                Another significant advantage is <strong>unmatched reliability</strong>. Because the system is hosted on-site, your internal communications stay up even if your internet connection goes down. This "local survivability" is critical for businesses that cannot afford any communication downtime. On-premise systems also eliminate the latency and bandwidth concerns that can sometimes affect cloud-based systems, ensuring crystal-clear voice quality for every call.
              </p>
              <p>
                Key benefits of Zultys on-premise for DFW businesses include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Data Sovereignty</strong>
                  Keep all your communication data entirely within your own network for maximum privacy.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Customizable Security</strong>
                  Define and implement the security protocols that best meet your organization's unique needs.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Local Survivability</strong>
                  Ensure your internal communications stay functional even during an external network outage.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">One-Time Capital Investment</strong>
                  Choose a one-time capital investment option rather than ongoing monthly service fees.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 3: Security */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900 p-8">
                  <ImageWithFallback
                    src={ZULTYS_MX250}
                    alt="Secure On-Premise Solutions with Zultys MX250"
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Unmatched Security and Data Sovereignty
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    For many organizations in the Dallas-Fort Worth area, security and data privacy are the primary reasons for choosing an on-premise solution. <strong>Zultys on-premise systems</strong> allow you to keep all your communication data, including call recordings, voicemails, and messages, entirely within your own secure network.
                  </p>
                  <p>
                    This level of data sovereignty is essential for businesses in highly regulated industries such as healthcare, finance, and legal services. You can also implement your own advanced security measures, such as custom firewalls, intrusion detection systems, and encryption protocols, to ensure that your corporate communications are protected to the highest standards.
                  </p>
                  <p>
                    Furthermore, <strong>The Role of On-Premise Systems in Regulatory Compliance</strong> cannot be overstated. For DFW businesses subject to HIPAA, PCI DSS, or other stringent regulations, having an on-site Zultys system provides the physical and digital control necessary to pass audits and protect sensitive client information across the North Texas region.
                  </p>
                  <p>
                    For DFW businesses, this security means:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Total Privacy:</strong> Your communication data never leaves your own secure facility.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Regulatory Compliance:</strong> Meet the most stringent data privacy and security requirements with ease.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Peace of Mind:</strong> Know that your sensitive business communications are protected by your own security protocols.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Optimizing Local Network Performance for On-Premise Voice */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Optimizing Local Network Performance for On-Premise Voice
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    To get the most out of your <strong>Zultys on-premise system</strong>, it's essential to have a properly optimized local area network (LAN). DFW Business Communications works closely with your North Texas IT team to ensure that your network infrastructure is configured for peak voice performance. This includes implementing Quality of Service (QoS) protocols to prioritize voice traffic over data, reducing jitter and latency for your DFW office.
                  </p>
                  <p>
                    We also assist with VLAN configuration to isolate your voice traffic, providing an additional layer of security and performance for your DFW enterprise. By optimizing your local network, we ensure that every call in your Dallas or Fort Worth office is crystal-clear and reliable, providing the professional experience your customers expect.
                  </p>
                  <p>
                    Network optimization benefits for DFW businesses:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Superior Voice Quality:</strong> Eliminate jitter and latency with advanced QoS settings on your DFW network.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Enhanced Network Security:</strong> Isolate voice traffic through VLANs for a more secure DFW communication environment.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Proactive Performance Monitoring:</strong> Identify and resolve network issues before they affect your DFW business calls.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-4 border border-slate-200">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1080"
                    alt="Optimized Network for DFW On-Premise Systems"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Disaster Recovery and Off-Site Backup Strategies */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Disaster Recovery and Off-Site Backup Strategies</h2>
              <p className="text-xl text-gray-600">
                Protect your critical on-premise communication data with robust backup and recovery solutions in DFW.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                While on-premise systems provide excellent local reliability, it's critical to have a <strong>Disaster Recovery (DR)</strong> plan in place for your DFW business. We help North Texas organizations implement automated off-site backup strategies for their Zultys system configuration, voicemails, and call recordings. This ensures that your critical business data is protected even in the event of a physical disaster at your DFW facility.
              </p>
              <p>
                We also offer hybrid failover options, where your on-premise Zultys system can automatically failover to a cloud-based instance during a major outage. This provides the best of both worlds: the control and performance of an on-site system with the resilience and accessibility of the cloud for your DFW enterprise.
              </p>
              <p>
                Disaster recovery benefits for DFW on-premise businesses include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Automated Off-Site Backups</strong>
                  Ensure your DFW system data is always protected and recoverable.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Hybrid Cloud Failover</strong>
                  Maintain communication continuity for your DFW office during major local outages.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Rapid System Restoration</strong>
                  Minimize downtime for your North Texas business with streamlined recovery processes.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Comprehensive DR Planning</strong>
                  Work with our DFW experts to design a resilient communication strategy for your organization.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 4: Reliability */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl font-bold mb-6">Reliability and Business Continuity: Local Survivability</h2>
              <p className="text-xl text-white">
                Ensure your critical business communications are always functional, even during a major network outage.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p>
                  In a business environment where communication is essential, downtime is not an option. <strong>Zultys on-premise solutions</strong> provide a level of reliability that cloud-based systems simply cannot match. Because the system is hosted on-site, your internal communications stay up even if your internet connection is lost.
                </p>
                <p>
                  This "local survivability" ensures that your team can still communicate with each other, access voicemail, and use the auto-attendant during a network failure. You can also implement redundant hardware and power supplies to further enhance the system's resilience. For DFW businesses that require "five-nines" reliability, Zultys on-premise is the gold standard.
                </p>
              </div>
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p>
                  For DFW organizations, this reliability translates into uninterrupted business operations. At DFW Business Communications, we specialize in designing and implementing <strong>resilient on-site Zultys systems</strong> that are built to withstand any challenge.
                </p>
                <p>
                  We ensure that your system is configured to support your unique business continuity needs, from redundant hardware to custom failover protocols.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 5: Customization */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Customization and Integration with Local IT Assets
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    An on-premise communication system offers a level of customization and integration that is often difficult to achieve with cloud-based solutions. <strong>Zultys on-premise systems</strong> can be deeply integrated with your existing local IT assets, including your local area network (LAN), servers, and storage systems.
                  </p>
                  <p>
                    This allows for powerful features like direct integration with Active Directory for user management, local call recording storage, and custom integrations with your on-site business applications. You can also tailor the system's configuration to meet your specific business needs, from custom call routing to unique auto-attendant greetings.
                  </p>
                  <p>
                    For DFW businesses, this customization means:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Optimized Workflows:</strong> Tailor your communication system to support your unique business processes.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Better IT Efficiency:</strong> Leverage your existing IT infrastructure to support your communication system.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Enhanced User Experience:</strong> Provide your team with a communication system that is perfectly suited to their needs.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <Settings className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold">Control</h4>
                  <p className="text-sm text-gray-600">Total control over your hardware and software.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <Lock className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">Security</h4>
                  <p className="text-sm text-gray-600">Maximum privacy and data sovereignty.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <Shield className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">Reliability</h4>
                  <p className="text-sm text-gray-600">Local survivability and business continuity.</p>
                </div>
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold">Speed</h4>
                  <p className="text-sm text-gray-600">Instant access to critical information and people.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 6: Value */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Cost-Effectiveness and Long-Term Value</h2>
              <p className="text-xl text-gray-600">
                Invest in a communication system that provides significant long-term value for your organization.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                While on-premise solutions often require a higher initial capital investment, they can provide significant long-term value for DFW businesses. By choosing a one-time capital investment option, you can eliminate the ongoing monthly service fees associated with cloud-based systems. This can lead to substantial cost savings over the life of the system.
              </p>
              <p>
                On-premise systems also allow you to leverage your existing IT infrastructure and administrative staff, further reducing your operational costs. At DFW Business Communications, we help you evaluate the total cost of ownership (TCO) for your <strong>Zultys on-premise system</strong> and ensure that it provides the best possible value for your organization.
              </p>
              <p>
                For DFW businesses, this value means:
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Reduced Long-Term Costs:</strong> Eliminate ongoing monthly service fees and reduce your operational overhead.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Better ROI:</strong> Maximize the value of your communication investment over the life of the system.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Asset Ownership:</strong> Own and manage your own critical technology assets.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 7: Scalability */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Scalability and Future-Proofing Your On-Premise System
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    As your business grows, your communication system must be able to scale easily to support your needs. <strong>Zultys on-premise solutions</strong> provide a highly scalable architecture that can support from a few users to thousands across multiple locations.
                  </p>
                  <p>
                    Adding new users or sites is a simple administrative task, and the system's flexible licensing model allows you to pay for only what you need. Zultys also provides regular software updates and new features, ensuring that your on-premise system remains at the cutting edge of communication technology.
                  </p>
                  <p>
                    At DFW Business Communications, we help you plan for your future growth and ensure that your <strong>Zultys on-site system</strong> is ready to scale whenever you are.
                  </p>
                </div>
              </div>
              <div className="bg-blue-900 rounded-3xl p-12 text-white shadow-2xl">
                <Cpu className="h-16 w-16 text-blue-400 mb-8" />
                <h3 className="text-3xl font-bold mb-6">On-Premise Scalability</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Support for up to 10,000 Users</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Seamless Addition of New Sites & Users</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Flexible Licensing & Deployment Options</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Future-Proof Technology & Regular Updates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Proven Performance for Businesses of All Sizes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 8: Why Choose DFW Business Communications */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">Your Local Zultys On-Premise Partner in Fort Worth</h2>
            <div className="prose prose-xl prose-invert mx-auto max-w-4xl text-white">
              <p>
                When you choose DFW Business Communications for your <strong>Zultys on-premise solution</strong>, you are choosing a partner with a deep understanding of the North Texas business community. We've been serving the Dallas-Fort Worth area for over 20 years, and we pride ourselves on providing the highest level of local, personal service.
              </p>
              <p>
                From the initial system design and implementation to the final staff training and ongoing support, we are with you every step of the way. We know that for many organizations, local control and security are paramount, and we are dedicated to ensuring that your on-site communication system supports your mission of providing exceptional value to your organization.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Server className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">On-Premise Expertise</h4>
                <p className="text-white">We understand the unique communication and infrastructure needs of organizations that prefer on-site solutions.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Shield className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Security Focused</h4>
                <p className="text-white">We ensure that your system is configured to meet the highest standards of security and data privacy.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">24/7 Local Support</h4>
                <p className="text-white">Our Fort Worth based team is always available to support your critical on-site operations.</p>
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
