import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Building2, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Globe, 
  Server,
  Network,
  BarChart3,
  Clock
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_FORT_WORTH_BG,
  ZULTYS_MX250,
  OFFICE_COMMUNICATION,
} from '../constants/images';

export function Enterprise() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys Enterprise Solutions | Large Business Phone Systems Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Zultys enterprise communication solutions for large businesses in Fort Worth and Dallas. Scalable, reliable, and feature-rich systems for DFW corporations.';
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
    metaKeywords.setAttribute('content', 'enterprise phone system Dallas, corporate VoIP Fort Worth, scalable communication DFW, Zultys enterprise, large office phone system North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/enterprise-solutions');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys Enterprise Communication Solutions',
      description: 'Scalable and robust communication systems for large enterprises and corporations across Dallas-Fort Worth.',
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
              alt="Zultys Enterprise Solutions Fort Worth"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-500/30">
                <Building2 className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-100 uppercase tracking-wider">Enterprise Solutions</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Zultys for Large Enterprises
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-slate-300 leading-relaxed">
                Scalable, high-availability communication infrastructure designed to 
                power the most demanding corporate environments in DFW.
              </p>
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
              >
                Request Enterprise Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Scalability, Reliability, & Control</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Zultys provides the robust foundation large corporations need for global connectivity.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Massive Scalability',
                  description: 'Support up to 10,000 users across 128 locations with a single, unified communication fabric.',
                  icon: Network,
                },
                {
                  title: 'High Availability',
                  description: 'Redundant hardware and software options ensure your DFW enterprise stays connected 24/7.',
                  icon: Shield,
                },
                {
                  title: 'Advanced Analytics',
                  description: 'Gain deep insights into your communication patterns with comprehensive reporting and monitoring tools.',
                  icon: BarChart3,
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
                  Zultys for Enterprise: Powering Large-Scale Communications in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    For large enterprises in the Dallas-Fort Worth area, communication is more than just a utility—it's a strategic asset that drives productivity, collaboration, and customer engagement. In a corporate environment with hundreds or thousands of employees across multiple locations, the communication system must be robust, scalable, and highly reliable. <strong>Zultys enterprise phone systems Fort Worth</strong> are designed to meet these demanding requirements, providing a unified, enterprise-grade platform that empowers your entire organization.
                  </p>
                  <p>
                    From the corporate headquarters to regional offices and remote teams, Zultys ensures that everyone is connected through a single, seamless communication fabric. Our systems provide a rich set of features, including advanced call handling, integrated messaging, video conferencing, and a powerful contact center, all managed through a centralized and intuitive interface. Whether you are a financial institution, a healthcare network, or a global manufacturing firm, Zultys delivers the tools you need to stay ahead in the DFW market.
                  </p>
                  <p>
                    At DFW Business Communications, we specialize in designing and supporting complex enterprise communication solutions for businesses across North Texas. We understand the unique challenges of large-scale deployments, the importance of high availability, and the need for deep integration with existing IT infrastructure. We are dedicated to providing <strong>enterprise VoIP solutions in DFW</strong> that are both powerful and manageable, allowing your IT team to focus on strategic initiatives rather than day-to-day phone system maintenance.
                  </p>
                  <p>
                    Our approach to enterprise communications is holistic. we don't just provide a phone system; we provide a complete communication strategy that aligns with your business goals. We work closely with your leadership and IT teams to ensure that your Zultys solution is optimized for your specific workflows, providing the maximum return on your investment.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-100 p-4">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Enterprise Communications Solutions DFW"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 2: High Availability */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">High Availability and Business Continuity: The Enterprise Standard</h2>
              <p className="text-xl text-gray-600">
                In an enterprise environment, downtime is not an option. Zultys ensures your communications are always functional and resilient.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                For large corporations in the DFW area, a communication failure can lead to significant financial loss, reputational damage, and operational disruption. <strong>Zultys enterprise solutions</strong> are built with high availability and business continuity at their core. The MX platform supports a variety of redundancy options, including hardware failover, software clustering, and geographically distributed survivability.
              </p>
              <p>
                In the event of a hardware failure or a network outage at one location, the system can automatically fail over to a redundant unit or a different site, ensuring that calls are still handled and users stay connected. This "five-nines" reliability is essential for mission-critical operations such as emergency services, healthcare facilities, and financial institutions in North Texas.
              </p>
              <p>
                Furthermore, Zultys provides a robust disaster recovery framework. Your system configuration and data are backed up continuously, allowing for rapid restoration in the event of a catastrophic failure. This ensures that your DFW enterprise can recover quickly and maintain its commitments to customers and stakeholders.
              </p>
              <p>
                Key high availability features for DFW enterprises include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Hardware Redundancy</strong>
                  Deploy redundant MX appliances in a high-availability cluster for instant failover. This protects your DFW business from single points of failure.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Geographic Survivability</strong>
                  Ensure communication continuity even during a major regional outage with multi-site networking across the Dallas-Fort Worth metroplex.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Automatic Failover</strong>
                  The system automatically detects issues and switches to redundant resources without user intervention, providing a seamless experience for your North Texas team.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Proactive Monitoring</strong>
                  DFW Business Communications provides 24/7 monitoring to identify and resolve potential issues before they cause downtime for your DFW enterprise.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 3: Scalability */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900 p-8">
                  <ImageWithFallback
                    src={ZULTYS_MX250}
                    alt="Scalable Enterprise Solutions with Zultys MX250"
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Scalability Without Complexity: Growing with Your Business in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    Large enterprises are dynamic organizations that are constantly evolving. Your communication system must be able to scale easily to support new employees, new locations, and new business units. The <strong>Zultys MX platform</strong> provides a highly scalable architecture that can support up to 10,000 users across 128 locations in a single, unified network. This is ideal for DFW businesses that are expanding rapidly across the North Texas region.
                  </p>
                  <p>
                    Adding new users or sites is a simple administrative task, and the system's flexible licensing model allows you to pay for only what you need. Whether you are expanding through organic growth or acquisition, Zultys ensures that your communications remain cohesive and manageable. This flexibility is a major advantage for DFW enterprises that need to remain agile in a dynamic market.
                  </p>
                  <p>
                    Furthermore, <strong>Multi-Site Networking and SD-WAN Integration</strong> allow DFW enterprises to optimize their network performance across all locations in North Texas. By leveraging SD-WAN technology, you can ensure that your voice and video traffic always takes the most efficient path, reducing latency and ensuring crystal-clear communication for your DFW team.
                  </p>
                  <p>
                    For DFW enterprises, this scalability leads to:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Future-Proof Infrastructure:</strong> Invest in a system that can grow with your organization for years to come, protecting your DFW business from technology obsolescence.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Simplified Management:</strong> Manage your entire global communication network from a single, centralized interface, reducing the complexity of your North Texas IT environment.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Cost-Effective Growth:</strong> Scale your system incrementally without the need for major hardware overhauls in your DFW office.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Corporate Governance and Compliance */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Corporate Governance and Compliance in North Texas
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    In the enterprise sector, maintaining strict adherence to corporate governance and regulatory standards is non-negotiable. <strong>Zultys enterprise solutions</strong> are designed with these requirements in mind, providing the tools and documentation needed to satisfy internal audits and external regulators in the DFW area.
                  </p>
                  <p>
                    Our systems feature comprehensive logging of all administrative actions, call activity, and system changes. This audit trail is essential for DFW businesses in finance, healthcare, and legal services across North Texas. We also support advanced call recording policies, allowing you to automatically record specific extensions or departments to meet compliance mandates like MiFID II or HIPAA in the DFW metroplex.
                  </p>
                  <p>
                    Key compliance features for DFW enterprises:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Detailed Audit Logs:</strong> Track every change and interaction within your DFW communication system for complete transparency.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Policy-Based Call Recording:</strong> Automatically capture and store calls based on your DFW organization's specific compliance needs.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><span><strong>Secure Data Archiving:</strong> Store your communication records in a secure, encrypted environment that meets North Texas regulatory standards.</span></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-4 border border-slate-200">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1080"
                    alt="Corporate Governance and Compliance DFW"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Custom API Development and Workflow Automation */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Custom API Development and Workflow Automation</h2>
              <p className="text-xl text-gray-600">
                Tailor your communications to your unique business processes with Zultys' powerful integration capabilities in DFW.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                Every enterprise has unique workflows that drive its success. <strong>Zultys' open API architecture</strong> allows DFW businesses to integrate their communication system directly into their custom applications and business processes in North Texas. This enables powerful automation that can significantly improve efficiency and reduce manual errors across your DFW organization.
              </p>
              <p>
                Whether you need to trigger an automated notification based on a database event, integrate voice features into your custom CRM, or build a specialized reporting dashboard, Zultys provides the tools you need to succeed. At DFW Business Communications, we have the expertise to help you design and implement these custom integrations, ensuring that your communication system is a true driver of innovation for your DFW enterprise.
              </p>
              <p>
                Automation benefits for DFW enterprises include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Streamlined Workflows</strong>
                  Eliminate manual steps and reduce the time spent on routine communication tasks in your DFW office.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Enhanced Data Integration</strong>
                  Ensure that your communication data is always synchronized with your other business systems across North Texas.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Customized User Experiences</strong>
                  Build communication features that are perfectly tailored to the needs of your DFW employees and customers.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Improved Operational Visibility</strong>
                  Gain deeper insights into your business processes by integrating communication data into your DFW analytics platforms.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 4: Unified Communications */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl font-bold mb-6">Unified Communications for a Global Workforce in DFW</h2>
              <p className="text-xl text-slate-300">
                Break down silos and empower your team with a unified suite of communication and collaboration tools.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="prose prose-lg prose-invert text-slate-300 max-w-none">
                <p>
                  In a large enterprise, employees are often distributed across different departments, buildings, and even time zones. Effective collaboration requires a unified set of tools that work seamlessly together. <strong>Zultys enterprise solutions</strong> provide a comprehensive suite of unified communications (UC) features, including presence awareness, instant messaging, video conferencing, and file sharing for your North Texas team.
                </p>
                <p>
                  The Zultys Advanced Communicator (ZAC) provides a single, intuitive interface for all these tools, allowing employees to communicate and collaborate more effectively, regardless of their location or device. Integrated mobile apps ensure that your team stays connected and productive even when they are on the move in the Dallas-Fort Worth area.
                </p>
                <p>
                  Zultys UC also integrates with popular business applications such as Microsoft Outlook and Salesforce, providing a more streamlined workflow for your DFW team. This level of integration improves productivity and ensures that your team has the information they need to provide a superior customer experience.
                </p>
              </div>
              <div className="prose prose-lg prose-invert text-slate-300 max-w-none">
                <p>
                  For DFW enterprises, these UC features translate into a more agile and productive workforce. At DFW Business Communications, we work with your team to identify your specific collaboration needs and implement <strong>Zultys features</strong> that streamline your workflows and enhance your competitive advantage in North Texas.
                </p>
                <p>
                  We ensure that your system is configured to support your unique needs, from custom call routing for global teams to integrated video conferencing for large-scale corporate events in the DFW metroplex. Our goal is to provide you with a communication platform that empowers your team to work smarter, not harder.
                </p>
                <p>
                  We also provide comprehensive training and support for your DFW employees to ensure they can effectively use all the features of your Zultys UC solution. This maximizes the value of your investment and ensures a smooth and successful transition to your new communication platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 5: Security & Compliance */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Advanced Security and Compliance for Large Organizations in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    For large enterprises, security and compliance are paramount. Your communication system must be able to protect sensitive data and meet various regulatory requirements. <strong>Zultys enterprise solutions</strong> include a robust set of security features, including voice encryption (SRTP), secure signaling (TLS), and advanced firewall protection. This is essential for DFW businesses that operate in regulated industries such as healthcare, finance, and legal services.
                  </p>
                  <p>
                    The system also provides comprehensive logging and auditing capabilities, allowing you to track all communication activity and ensure compliance with regulations such as HIPAA, PCI-DSS, and SOC2. Integrated call recording can be used for quality assurance and to meet specific industry compliance standards in North Texas.
                  </p>
                  <p>
                    Zultys also provides robust access controls, allowing you to manage user permissions and ensure that only authorized individuals have access to sensitive information. This is essential for maintaining the integrity of your corporate communications and protecting your DFW organization from internal and external threats.
                  </p>
                  <p>
                    For DFW enterprises, these security features lead to:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Data Protection:</strong> Ensure that all voice and data communications are secure and encrypted, protecting your DFW business from data breaches.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Regulatory Compliance:</strong> Meet the stringent requirements of your industry with ease, ensuring that your North Texas organization remains in good standing.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Peace of Mind:</strong> Know that your corporate communications are protected by enterprise-grade security, allowing you to focus on your core business in DFW.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold">Security</h4>
                  <p className="text-sm text-gray-600">Enterprise-grade encryption and protection for your DFW communications.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <Globe className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">Global</h4>
                  <p className="text-sm text-gray-600">Connect your entire global workforce seamlessly from North Texas.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <Server className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">Reliability</h4>
                  <p className="text-sm text-gray-600">High availability and business continuity for your DFW enterprise.</p>
                </div>
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold">Speed</h4>
                  <p className="text-sm text-gray-600">Instant access to critical information and people in the DFW metroplex.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 6: Integration */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Deep Integration with Enterprise IT Ecosystems in DFW</h2>
              <p className="text-xl text-gray-600">
                Connect your communications with your existing business applications for a more efficient and informed organization.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                A communication system should not exist in a silo. To maximize its value, it must be integrated with your other business applications. <strong>Zultys enterprise solutions</strong> offer deep integration with a wide range of enterprise software, including CRM systems (Salesforce, Microsoft Dynamics), ERP platforms, and directory services (Active Directory, LDAP). This is essential for DFW enterprises that rely on a complex ecosystem of software to run their operations.
              </p>
              <p>
                These integrations allow for powerful features like click-to-dial, automatic call logging, and screen pops that display customer information when a call arrives. This not only improves agent productivity but also ensures that your team has the information they need to provide a more personalized and effective service to your North Texas customers. Zultys also provides a comprehensive API for custom integrations, allowing you to tailor the system to your specific business needs in the DFW metroplex.
              </p>
              <p>
                Furthermore, Zultys integrates with popular productivity tools such as Microsoft Teams and Slack, allowing your team to communicate and collaborate more effectively across all their preferred channels. This level of integration ensures that your communication system is a central part of your DFW organization's digital workspace, rather than just another isolated tool.
              </p>
              <p>
                For DFW enterprises, this integration means:
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Improved Workflow Efficiency:</strong> Automate repetitive tasks and reduce manual data entry for your North Texas team.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Better Data Accuracy:</strong> Ensure that all communication activity is accurately logged in your CRM or ERP, providing a single source of truth for your DFW business.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Enhanced Customer Insights:</strong> Gain a more complete view of your customer interactions across all channels, allowing you to provide a more personalized service in DFW.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 7: Analytics */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Actionable Insights with Enterprise Analytics and Reporting in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    To optimize your communication strategy, you need data. <strong>Zultys enterprise solutions</strong> include a powerful set of analytics and reporting tools that provide deep insights into your communication patterns. You can track key metrics such as call volume, wait times, agent productivity, and customer satisfaction across your entire DFW organization.
                  </p>
                  <p>
                    Real-time dashboards allow managers to see what's happening in the moment and make adjustments on the fly, while historical reports allow you to identify trends and make data-driven decisions about staffing, training, and resource allocation in your North Texas office. This level of visibility is essential for large enterprises looking to improve operational efficiency and enhance the customer experience in the DFW metroplex.
                  </p>
                  <p>
                    Zultys also provides advanced reporting features such as custom report builders and automated report delivery, allowing you to get the information you need, when you need it. This ensures that your leadership team has the insights they need to make informed decisions about your DFW organization's communication strategy.
                  </p>
                  <p>
                    At DFW Business Communications, we help you leverage these <strong>enterprise analytics</strong> to gain a competitive edge in the North Texas market. We work with your team to identify the key metrics that matter most to your business and configure your Zultys solution to provide the data you need to succeed in DFW.
                  </p>
                </div>
              </div>
              <div className="bg-blue-900 rounded-3xl p-12 text-white shadow-2xl">
                <BarChart3 className="h-16 w-16 text-blue-400 mb-8" />
                <h3 className="text-3xl font-bold mb-6">Enterprise Analytics</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Real-Time Performance Dashboards for DFW Managers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Comprehensive Historical Reporting for North Texas Enterprises</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Customizable Metrics & KPIs Tailored to Your DFW Business</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Automated Report Delivery to Your DFW Leadership Team</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Deep Insights into Customer Interactions in the DFW Metroplex</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 8: Why Choose DFW Business Communications */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">Your Local Zultys Enterprise Partner in Fort Worth and Dallas</h2>
            <div className="prose prose-xl prose-invert mx-auto max-w-4xl text-slate-300">
              <p>
                When you choose DFW Business Communications for your <strong>Zultys enterprise solution</strong>, you are choosing a partner with a deep understanding of the North Texas corporate landscape. We've been serving the Dallas-Fort Worth area for over 20 years, and we pride ourselves on providing the highest level of local, personal service to our DFW clients.
              </p>
              <p>
                From the initial system design and multi-site planning to the final implementation and ongoing support, we are with you every step of the way. We know that in an enterprise environment, every detail matters, and we are dedicated to ensuring that your communication system supports your mission of providing exceptional value to your stakeholders in the DFW metroplex.
              </p>
              <p>
                Our local presence in Fort Worth allows us to provide rapid, on-site support and a level of personal attention that national providers simply can't match. We are committed to your long-term success and work with you to continuously optimize your Zultys solution as your DFW business grows and evolves.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Building2 className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Enterprise Expertise in DFW</h4>
                <p className="text-slate-400">We understand the unique communication and infrastructure needs of large corporations operating in North Texas.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Shield className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Security Focused for DFW</h4>
                <p className="text-slate-400">We ensure that your system is configured to meet the highest standards of enterprise security and compliance in DFW.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">24/7 Local DFW Support</h4>
                <p className="text-slate-400">Our Fort Worth based team is always available to support your critical enterprise operations across the DFW metroplex.</p>
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
