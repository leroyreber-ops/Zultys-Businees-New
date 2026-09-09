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
  Users, 
  Globe, 
  Cpu,
  Layers,
  Network,
  Smartphone
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_MX250,
  ZULTYS_FORT_WORTH_BG,
  OFFICE_COMMUNICATION,
} from '../constants/images';

export function MXSeries() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys MX Series | MX250 & MX30 IP PBX Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Explore the Zultys MX Series IP PBX solutions. High-performance MX250 and MX30 appliances for enterprise communications in Dallas-Fort Worth.';
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
    metaKeywords.setAttribute('content', 'Zultys MX250 Dallas, Zultys MX30 Fort Worth, IP PBX hardware DFW, Zultys server Dallas, business phone appliances North Texas');

    // Canonical URL
    const path = typeof window !== 'undefined' ? window.location.pathname : '/fort-worth-zultys-mx-series';
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
      name: 'Zultys MX Series IP PBX',
      description: 'Enterprise-grade IP PBX appliances including MX250 and MX30 for businesses in DFW.',
      url: canonicalUrl,
      image: ZULTYS_MX250,
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
    { label: 'User Capacity', value: 'Up to 2,000 per unit', icon: Users },
    { label: 'Network Capacity', value: 'Up to 10,000 users', icon: Network },
    { label: 'Architecture', value: 'All-in-One Linux', icon: Cpu },
    { label: 'Redundancy', value: 'High Availability', icon: Shield },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Zultys <span className="text-zultys-green">MX Series</span> <br />Solutions.</>}
          subtitle="The backbone of enterprise communications. Scalable, reliable, and feature-rich IP PBX appliances for DFW businesses."
          icon={Server}
          iconLabel="Enterprise IP PBX"
          buttonText="Get MX Series Pricing"
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

        {/* Detailed Content Section 1: Introduction */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  The Foundation of Enterprise Communications: Zultys MX Series
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    In the rapidly evolving landscape of business communications, having a reliable, scalable, and feature-rich foundation is not just an advantage—it's a necessity. The <strong>Zultys MX series business communications solution</strong> represents the pinnacle of IP PBX technology, designed specifically to meet the rigorous demands of modern enterprises in the Dallas-Fort Worth area. Whether you are a growing mid-sized business or a large-scale enterprise with thousands of users across multiple locations, the MX series provides a robust platform that integrates voice, video, data, and mobility into a single, cohesive system.
                  </p>
                  <p>
                    At the heart of the MX series is a commitment to simplicity and efficiency. Unlike traditional phone systems that often require a complex web of third-party applications and separate servers for different functions, Zultys has engineered an "All-in-One" architecture. This means that every essential communication tool—from advanced call routing and voicemail to high-definition video conferencing and comprehensive contact center management—is built directly into the MX appliance. This integrated approach not only simplifies management for your IT team but also ensures a seamless and consistent experience for your employees, regardless of where they are working.
                  </p>
                  <p>
                    For businesses in Fort Worth, Arlington, and the surrounding DFW communities, DFW Business Communications is proud to offer the full range of Zultys MX series appliances. Our team of certified experts specializes in designing, installing, and supporting these powerful systems, ensuring that your communication infrastructure is optimized for peak performance and long-term success.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-100">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Zultys MX Series Enterprise Communications"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

                  {/* Detailed Content Section 2: All-in-One Architecture */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">The "All-in-One" Advantage</h2>
              <p className="text-xl text-gray-600">
                Why settle for a fragmented system when you can have a unified solution? The Zultys MX series redefines what an IP PBX can do.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                The primary differentiator of the <strong>Zultys MX series</strong> is its unique architecture. Most enterprise-grade communication systems are built using a "best-of-breed" approach, which sounds good in theory but often leads to significant integration challenges. In those systems, you might have one server for the PBX, another for the voicemail system, a third for the contact center, and yet another for the mobile application gateway. Each of these components often comes from a different vendor or uses a different software stack, requiring complex APIs and constant maintenance to keep them working together.
              </p>
              <p>
                Zultys takes a fundamentally different approach. Every feature of the MX series is developed in-house by Zultys engineers to run on a single, hardened Linux-based software platform. This means that the <strong>MX250</strong> and <strong>MX30</strong> are not just "phone systems"—they are comprehensive communication appliances. When you update the software on your MX appliance, you are updating the entire system simultaneously, ensuring that all features remain perfectly synchronized.
              </p>
              <p>
                This "All-in-One" design provides several critical benefits for DFW businesses:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Reduced Complexity</strong>
                  Fewer servers and applications to manage means your IT team can spend less time on maintenance and more time on strategic initiatives.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Higher Reliability</strong>
                  By eliminating the need for complex integrations between disparate systems, Zultys removes dozens of potential points of failure.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Lower Total Cost of Ownership</strong>
                  Reduced hardware requirements, simplified licensing, and lower maintenance costs translate to significant long-term savings.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Consistent User Experience</strong>
                  Because every feature is part of the same platform, users enjoy a unified interface across their desk phones, desktop software, and mobile apps.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 3: Scalability & Networking */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900 p-4">
                  <ImageWithFallback
                    src={ZULTYS_MX250}
                    alt="Scalable Zultys MX250 Networking"
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Scalability That Grows With Your DFW Business
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    One of the most significant challenges for growing businesses is outgrowing their technology. With the <strong>Zultys MX series</strong>, that is a concern of the past. The system is designed with modularity and networking at its core, allowing you to scale your communication infrastructure seamlessly as your needs evolve.
                  </p>
                  <p>
                    The <strong>MX250</strong> is the powerhouse of the series, capable of supporting up to 2,000 users in a single 2U rack-mount appliance. For smaller offices or branch locations, the <strong>MX30</strong> provides the same enterprise-grade features in a more compact form factor, supporting up to 30 users. But the true power of the MX series lies in its ability to be networked together.
                  </p>
                  <p>
                    Furthermore, <strong>Global Connectivity and Multi-National Support</strong> allow DFW organizations to expand their reach far beyond North Texas. With support for international dial plans, multi-language interfaces, and global SIP trunking, the MX series ensures that your DFW enterprise can communicate effectively with partners and customers around the world.
                  </p>
                  <p>
                    Using Zultys' advanced MXnetwork technology, you can connect up to 128 MX appliances into a single, unified system. This creates a global communication fabric that can support up to 10,000 users across multiple cities, states, or even countries. For a business headquartered in Fort Worth with satellite offices in Dallas, Plano, and Houston, this means:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Unified Dial Plan:</strong> Every employee can be reached via a simple 3 or 4-digit extension, regardless of their physical location.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Shared Resources:</strong> Centralize your receptionist, contact center agents, and voicemail systems to improve efficiency and reduce costs.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Presence Awareness:</strong> See the real-time status of any colleague across the entire network, making collaboration effortless.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Advanced Hardware Redundancy and High Availability */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Advanced Hardware Redundancy and High Availability in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    For mission-critical operations in the Dallas-Fort Worth area, the <strong>Zultys MX series</strong> offers unmatched hardware-level redundancy. The MX250 is engineered for maximum uptime, featuring dual hot-swappable power supplies and RAID-1 mirrored hard drives. This ensures that your DFW enterprise communications remain active even in the event of a critical hardware component failure.
                  </p>
                  <p>
                    In addition to hardware redundancy, Zultys provides <strong>High Availability (HA)</strong> software configurations. By deploying two MX appliances in a "Hot Standby" pair, DFW businesses can ensure near-instantaneous failover. If the primary unit in your North Texas data center goes offline, the secondary unit takes over all system functions, including active calls, with zero impact on your users.
                  </p>
                  <p>
                    Key availability benefits for DFW enterprises:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Hot-Swappable Components:</strong> Replace power supplies without powering down your DFW communication system.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Real-Time Data Mirroring:</strong> Ensure your DFW system configuration and voicemails are always protected on redundant drives.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Seamless Software Failover:</strong> Maintain 24/7 connectivity for your DFW office with automated Hot Standby.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-4 border border-slate-200">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=1080"
                    alt="Zultys MX Series Redundancy DFW"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Custom API Integration and Workflow Automation */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Custom API Integration and Workflow Automation</h2>
              <p className="text-xl text-gray-600">
                Unlock the full potential of your DFW enterprise with deep software integration and automated business processes.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                The <strong>Zultys MX series</strong> is more than just a phone system; it's an open platform designed for integration. With a comprehensive set of APIs, DFW enterprises can connect their communication system with their existing CRM, ERP, and other business-critical applications. This allows for <strong>workflow automation</strong> that can significantly improve efficiency across your North Texas organization.
              </p>
              <p>
                Imagine having your CRM automatically pop up a customer's record when they call your DFW office, or having your communication system automatically log every interaction in your database. These integrations reduce manual data entry, eliminate errors, and provide your DFW team with the information they need to deliver superior customer service.
              </p>
              <p>
                Integration benefits for DFW enterprises include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">CRM Screen Pops</strong>
                  Provide your DFW agents with instant access to customer data during every call.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Automated Call Logging</strong>
                  Ensure every interaction in your DFW office is accurately recorded in your business systems.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Custom Application Development</strong>
                  Build unique communication tools tailored to the specific needs of your North Texas business.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Streamlined Business Processes</strong>
                  Eliminate manual steps and improve efficiency across your entire DFW enterprise.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 4: Business Continuity */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl font-bold mb-6 text-white">Unmatched Reliability and Business Continuity</h2>
              <p className="text-xl text-white">
                In today's 24/7 business world, downtime is not an option. The Zultys MX series is engineered for maximum uptime and resilience.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p className="text-white">
                  When your communication system goes down, your business stops. That's why the <strong>Zultys MX series business communications solution</strong> includes a comprehensive suite of high-availability and disaster recovery features. The MX250, in particular, is built with hardware-level redundancy, including dual hot-swappable power supplies and RAID-1 mirrored hard drives. This ensures that even in the event of a hardware failure, your system continues to operate without interruption.
                </p>
                <p className="text-white">
                  Beyond hardware redundancy, Zultys offers a powerful "Hot Standby" software feature. This allows you to have a secondary MX appliance that stays perfectly synchronized with your primary system. If the primary appliance ever goes offline, the secondary unit takes over all functions—including active calls—in a matter of seconds. This level of resilience is critical for emergency services, healthcare providers, and any DFW business that relies on constant connectivity.
                </p>
              </div>
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p className="text-white">
                  For multi-location businesses, the MXnetwork architecture provides an additional layer of disaster recovery. If a local office loses its connection to the primary system, the local MX appliance can continue to provide local dial tone and emergency services. Furthermore, Zultys' "Survivable Branch" capabilities ensure that remote users can automatically re-register to a different MX appliance in the network if their primary server becomes unavailable.
                </p>
                <p className="text-white">
                  At DFW Business Communications, we work with you to design a business continuity plan that fits your specific risk profile and budget. From simple off-site backups to full real-time redundancy, we ensure that your <strong>Zultys MX series</strong> system is always ready to keep you connected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 5: Unified Communications Integration */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Seamless Unified Communications Integration
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    A phone system is only as good as the tools it provides to its users. The <strong>Zultys MX series</strong> excels in this area by providing a truly unified communications experience. Every MX appliance comes with built-in support for Zultys' award-winning software applications, including the Zultys Advanced Communicator (ZAC) and MXmobile.
                  </p>
                  <p>
                    ZAC is the ultimate control center for your desktop. It allows users to manage their calls, send instant messages, view the presence status of colleagues, and launch video conferences with a single click. Because ZAC is a native application designed specifically for the MX series, it provides a level of speed and reliability that web-based alternatives simply cannot match.
                  </p>
                  <p>
                    For the mobile workforce in the Dallas-Fort Worth area, MXmobile extends the full power of the MX series to your smartphone. This is not just a simple "softphone" app; it is a full UC client that allows you to stay connected to your office extension, access the corporate directory, and participate in team chats from anywhere with a data connection.
                  </p>
                </div>
                <div className="mt-8">
                  <Button variant="outline" size="lg" asChild className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <a href="/fort-worth-zultys-zac">Learn More About ZAC Software</a>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <Layers className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Integrated Video</h3>
                    <p className="text-sm text-gray-600">High-definition video conferencing built directly into the platform.</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <Globe className="h-10 w-10 text-slate-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Remote Access</h3>
                    <p className="text-sm text-gray-600">Securely connect from anywhere without the need for complex VPNs.</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <Zap className="h-10 w-10 text-slate-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Instant Messaging</h3>
                    <p className="text-sm text-gray-600">Secure, enterprise-grade chat for real-time team collaboration.</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <Smartphone className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Mobile UC</h3>
                    <p className="text-sm text-gray-600">Full office functionality on your iOS or Android device.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 6: Contact Center */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Enterprise-Grade Contact Center Capabilities</h2>
              <p className="text-xl text-gray-600">
                Deliver superior customer service with the built-in Integrated Contact Center (ICC) features of the MX series.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                For many businesses in the DFW area, the contact center is the primary point of interaction with their customers. The <strong>Zultys MX series business communications solution</strong> includes powerful Integrated Contact Center (ICC) capabilities that allow you to manage high volumes of customer interactions with ease. Unlike other systems that require expensive add-on modules, Zultys ICC is a core part of the MX platform.
              </p>
              <p>
                With Zultys ICC, you can implement advanced call routing strategies, such as skill-based routing, which ensures that every customer is connected to the most qualified agent for their specific needs. Supervisors gain real-time visibility into queue status and agent performance via customizable dashboards, allowing them to make data-driven decisions to improve service levels.
              </p>
              <p>
                Key features of the Zultys ICC on the MX series include:
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                  <h4 className="text-xl font-bold mb-4 text-blue-600">Omni-Channel Support</h4>
                  <p>Manage voice, email, and web chat interactions from a single, unified agent interface.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                  <h4 className="text-xl font-bold mb-4 text-blue-600">Real-Time Monitoring</h4>
                  <p>Supervisors can "listen in," "whisper" to agents, or "barge in" on active calls to ensure quality.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                  <h4 className="text-xl font-bold mb-4 text-blue-600">Detailed Analytics</h4>
                  <p>Generate comprehensive historical reports to track KPIs like average wait time and first-call resolution.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 7: Security & Compliance */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Security and Compliance You Can Trust
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    In an era of increasing cybersecurity threats and strict regulatory requirements, the security of your communication system is paramount. The <strong>Zultys MX series</strong> is built on a hardened Linux-based operating system that is designed to be inherently secure. Zultys employs multiple layers of security to protect your voice traffic and sensitive business data.
                  </p>
                  <p>
                    All communication between MX appliances, and between the appliances and Zultys software clients, is encrypted using industry-standard protocols like TLS and SRTP. This prevents eavesdropping and ensures the integrity of your conversations. Furthermore, the MX series includes built-in firewall and intrusion prevention features that actively monitor for and block malicious activity.
                  </p>
                  <p>
                    For businesses in the healthcare, legal, and financial sectors in Fort Worth, the MX series provides the tools needed to maintain compliance with regulations like HIPAA and SOC 2. Features like integrated call recording with secure archiving and detailed audit logs ensure that you have a complete record of all communication activities.
                  </p>
                </div>
              </div>
              <div className="bg-slate-900 rounded-3xl p-12 text-white">
                <Shield className="h-16 w-16 text-blue-400 mb-8" />
                <h3 className="text-3xl font-bold mb-6">Hardened Security Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>TLS/SRTP Voice Encryption</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Built-in Intrusion Prevention</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Secure Remote Access (No VPN Required)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Comprehensive Audit & Activity Logs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Role-Based Access Control (RBAC)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 8: Why Choose DFW Business Communications */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">Your Local Zultys MX Series Experts in Fort Worth</h2>
            <div className="prose prose-xl prose-invert mx-auto max-w-4xl text-white">
              <p>
                Choosing the right communication system is a major decision, but choosing the right partner to implement it is just as important. At DFW Business Communications, we have over two decades of experience helping businesses in the Dallas-Fort Worth area navigate the complex world of business technology.
              </p>
              <p>
                We are not just a vendor; we are your local partner. When you choose us for your <strong>Zultys MX series business communications solution</strong>, you get:
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h4 className="text-2xl font-bold mb-4">Certified Expertise</h4>
                <p className="text-white">Our technicians are fully certified by Zultys and have hands-on experience with every model in the MX series.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h4 className="text-2xl font-bold mb-4">Local Support</h4>
                <p className="text-white">Based in Fort Worth, we are just a phone call away and can be on-site quickly whenever you need us.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h4 className="text-2xl font-bold mb-4">Customized Solutions</h4>
                <p className="text-white">We don't believe in one-size-fits-all. We design a Zultys system that is tailored to your unique business needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Models Comparison */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">MX Series Models</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the appliance that fits your business size and growth plans.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 bg-white border-slate-200">
                <h3 className="text-3xl font-bold text-blue-600 mb-4">MX250</h3>
                <p className="text-gray-600 mb-6">Designed for large enterprises and high-volume contact centers.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-gray-500">Max Users</span>
                    <span className="font-bold">2,000</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-gray-500">Concurrent Calls</span>
                    <span className="font-bold">240</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-gray-500">Redundancy</span>
                    <span className="font-bold">Dual Power/RAID</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={openQuote}>Request MX250 Quote</Button>
              </Card>
              <Card className="p-8 bg-white border-slate-200">
                <h3 className="text-3xl font-bold text-blue-600 mb-4">MX30</h3>
                <p className="text-gray-600 mb-6">Perfect for small to mid-sized businesses needing enterprise features.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-gray-500">Max Users</span>
                    <span className="font-bold">30</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-gray-500">Concurrent Calls</span>
                    <span className="font-bold">12</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-gray-500">Form Factor</span>
                    <span className="font-bold">Compact 1U</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={openQuote}>Request MX30 Quote</Button>
              </Card>
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
