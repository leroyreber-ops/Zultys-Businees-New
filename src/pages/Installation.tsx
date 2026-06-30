import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Wrench, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Clock, 
  Phone,
  Settings,
  Shield,
  Layout
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_FORT_WORTH_BG,
  OFFICE_COMMUNICATION,
  SUPPORT_TEAM,
} from '../constants/images';

export function Installation() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys Installation & Setup | Business Phone System Installation Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Professional Zultys installation and setup services in Fort Worth and Dallas. Seamless migration and expert configuration for DFW business phone systems.';
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
    metaKeywords.setAttribute('content', 'phone system installation Dallas, Zultys setup Fort Worth, VoIP migration DFW, business phone configuration North Texas, Zultys implementation Dallas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/installation-setup');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys Professional Installation & Setup',
      description: 'Expert installation and configuration services for Zultys communication systems in the Dallas-Fort Worth metroplex.',
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
              alt="Zultys Installation Fort Worth"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-500/30">
                <Wrench className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-100 uppercase tracking-wider">Professional Installation Services</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Zultys Installation & Setup for DFW Businesses
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-slate-100 leading-relaxed">
                Professional Zultys installation and expert setup services for your 
                Dallas-Fort Worth organization. We provide seamless migration, 
                customized configuration, and comprehensive network optimization 
                to ensure your new business phone system delivers peak performance 
                from day one across North Texas.
              </p>
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
              >
                Schedule Your Installation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Installation Process Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Professional Installation Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We follow a structured approach to ensure your Zultys system is installed correctly and efficiently.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Site Survey & Planning',
                  description: 'We conduct a thorough assessment of your DFW office network and infrastructure to ensure a smooth setup.',
                  icon: Layout,
                },
                {
                  title: 'Expert Configuration',
                  description: 'Our certified technicians configure your Zultys system to meet your specific business requirements and call flows.',
                  icon: Settings,
                },
                {
                  title: 'Seamless Migration',
                  description: 'We manage the transition from your old system to Zultys, ensuring minimal disruption to your business operations.',
                  icon: Zap,
                },
              ].map((step, index) => (
                <Card key={index} className="p-8 border-slate-200 hover:border-blue-500 transition-colors">
                  <div className="p-3 bg-blue-100 rounded-xl w-fit mb-6">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
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
                  Professional Zultys Installation: The Foundation of Your DFW Business Communications
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    A successful communication system starts with a professional installation. At DFW Business Communications, we understand that your phone system is the lifeline of your business. Whether you are a small startup in Fort Worth or a large enterprise with multiple locations across the Dallas-Fort Worth metroplex, a seamless <strong>Zultys installation Fort Worth</strong> is critical for ensuring long-term reliability, high-quality voice traffic, and a positive user experience.
                  </p>
                  <p>
                    Our team of certified technicians has years of experience installing and configuring Zultys MX systems for a wide range of industries. We don't just "plug in phones"; we provide a comprehensive, end-to-end installation service that covers everything from initial site surveys and network assessments to custom call flow design, hardware mounting, and post-installation training. We work closely with your IT team to ensure that your Zultys system is perfectly integrated into your existing infrastructure, providing a robust and scalable communication platform that grows with your business.
                  </p>
                  <p>
                    When you choose DFW Business Communications for your <strong>Zultys setup in DFW</strong>, you're choosing a local partner dedicated to your success. We pride ourselves on our attention to detail, our technical expertise, and our commitment to providing the highest level of personal service to our North Texas clients.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-100 p-4">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Professional Zultys installation services in Fort Worth"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 2: Network Assessment */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Network Assessment and Planning</h2>
              <p className="text-xl text-gray-600">
                The secret to high-quality VoIP is a robust network. We ensure your DFW office infrastructure is ready for Zultys.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                Before a single phone is installed, our team conducts a thorough assessment of your local area network (LAN) and wide area network (WAN). This is a critical step in any <strong>business phone system installation in Fort Worth</strong>. We analyze your bandwidth, latency, jitter, and packet loss to ensure that your network can handle the demands of high-definition voice traffic.
              </p>
              <p>
                We also review your network hardware, including routers, switches, and firewalls, to ensure they are properly configured for Quality of Service (QoS). QoS is essential for prioritizing voice traffic over other data, preventing dropped calls and audio issues. If upgrades are needed, we provide expert recommendations on the best hardware for your specific needs and budget. Our goal is to create a stable and high-performing environment for your <strong>Zultys communication system</strong>.
              </p>
              <p>
                Our planning process also includes:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Bandwidth Analysis</strong>
                  We ensure your internet connection has the capacity to support your expected call volume and UC features.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">VLAN Configuration</strong>
                  We set up dedicated Voice VLANs to isolate and protect your voice traffic from other network data.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Power over Ethernet (PoE)</strong>
                  We assess your switch capacity to provide power to your Zultys IP phones without the need for individual power adapters.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Security Review</strong>
                  We ensure your firewall is configured to allow secure Zultys traffic while protecting your network from external threats.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 3: Custom Configuration */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900 p-8">
                  <ImageWithFallback
                    src={SUPPORT_TEAM}
                    alt="Custom Zultys configuration for DFW businesses"
                    className="w-full h-auto max-h-[400px] object-cover opacity-90"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Custom Configuration Tailored to Your Business Workflows
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    One of the greatest strengths of the Zultys platform is its incredible flexibility. During the <strong>Zultys installation process</strong>, we work closely with you to design a call flow and system configuration that matches your unique business processes. We don't believe in a "one-size-fits-all" approach; we tailor every aspect of the system to your specific needs.
                  </p>
                  <p>
                    Our technicians configure your auto-attendants, hunt groups, call queues, and user permissions to ensure that every call is handled efficiently and professionally. We also set up your unified communications features, including instant messaging, presence, and mobile integration, to empower your team with the tools they need to collaborate effectively.
                  </p>
                  <p>
                    Furthermore, <strong>Custom Integration Setup and API Configuration</strong> allow DFW businesses to connect their Zultys system with their existing CRM, ERP, and other business applications. This deep integration ensures that your communication data is always synchronized and that your team has the information they need to provide superior service across the DFW metroplex.
                  </p>
                  <p>
                    For DFW businesses, this custom configuration leads to:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Improved Customer Experience:</strong> Ensure callers reach the right person or department quickly and easily.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Enhanced Employee Productivity:</strong> Streamline workflows with intuitive call handling and collaboration tools.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Professional Brand Image:</strong> Present a polished and organized front to your customers with professional greetings and IVRs.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Post-Installation Optimization and Performance Tuning */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Post-Installation Optimization and Performance Tuning in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    The installation is just the beginning. To ensure that your Zultys system continues to deliver peak performance, we provide <strong>post-installation optimization and performance tuning</strong> for DFW businesses. Our technicians monitor your system's performance in the weeks following the installation, making adjustments to call flows, network settings, and user configurations to ensure everything is running perfectly in North Texas.
                  </p>
                  <p>
                    We analyze call data and user feedback to identify areas for improvement, ensuring that your communication system is always perfectly aligned with your DFW business's needs. This proactive approach to optimization ensures that you get the maximum value from your investment in Zultys technology across the DFW metroplex.
                  </p>
                  <p>
                    Key optimization benefits for DFW organizations:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Fine-Tuned Call Flows:</strong> Adjust your IVRs and hunt groups based on real-world usage in your DFW office.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Network Performance Monitoring:</strong> Ensure your DFW network is always optimized for high-quality voice traffic.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>User Feedback Integration:</strong> Make adjustments based on the actual experience of your DFW team.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-4 border border-slate-200">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1080"
                    alt="Zultys Performance Optimization DFW"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Ongoing System Health Checks and Proactive Maintenance */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ongoing System Health Checks and Proactive Maintenance</h2>
              <p className="text-xl text-gray-600">
                Keep your communications resilient and secure with regular health checks from your local DFW partner.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                In a business environment where downtime is not an option, <strong>proactive maintenance</strong> is essential. At DFW Business Communications, we provide regular system health checks for our Zultys clients across the Dallas-Fort Worth metroplex. We review your system logs, check for software updates, and assess your hardware's performance to identify and resolve potential issues before they cause disruption in your DFW office.
              </p>
              <p>
                These regular health checks ensure that your Zultys system is always running the latest security patches and features, protecting your North Texas business from external threats and ensuring optimal performance. We also provide regular backups of your system configuration and data, ensuring that you can recover quickly in the event of an emergency in the DFW area.
              </p>
              <p>
                Maintenance benefits for DFW enterprises include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Early Issue Detection</strong>
                  Identify and resolve potential problems before they impact your DFW operations.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Security Patch Management</strong>
                  Ensure your Zultys system is always protected against the latest threats in North Texas.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">System Performance Audits</strong>
                  Regular reviews to ensure your DFW communication system is always running at its best.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Reliable Data Backups</strong>
                  Peace of mind knowing your DFW system configuration is always backed up and secure.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 4: Seamless Migration */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl font-bold mb-6">Seamless Migration: Minimizing Disruption to Your DFW Operations</h2>
              <p className="text-xl text-slate-100">
                Transitioning to a new phone system shouldn't be stressful. We manage the entire migration process for you.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="prose prose-lg prose-invert text-slate-100 max-w-none">
                <p>
                  We understand that your business can't afford to be offline. That's why we place a high priority on a seamless migration from your old system to Zultys. Our <strong>Zultys migration services in Fort Worth</strong> are designed to minimize downtime and ensure that your transition is as smooth as possible.
                </p>
                <p>
                  We handle the porting of your existing phone numbers, the coordination with your service providers, and the physical cutover to the new system. We often perform the final transition after hours or during weekends to ensure that your business operations are not interrupted. Our goal is to have your new Zultys system up and running with zero impact on your customer service.
                </p>
              </div>
              <div className="prose prose-lg prose-invert text-slate-100 max-w-none">
                <p>
                  During the migration, our team is on-site to provide immediate support and address any questions or issues that may arise. We perform extensive testing of every phone, every line, and every feature to ensure that everything is working perfectly before we consider the installation complete.
                </p>
                <p>
                  At DFW Business Communications, we take the stress out of <strong>upgrading your business phone system</strong>. We handle the technical heavy lifting so you can focus on what matters most—serving your DFW customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 5: User Training */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Empowering Your Team with Comprehensive Zultys Training
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    A new communication system is only effective if your team knows how to use it. That's why comprehensive user training is a core part of our <strong>Zultys installation services</strong>. We provide hands-on training for your employees, ensuring they are comfortable with their new phones, the Zultys Advanced Communicator (ZAC) desktop client, and the MXmobile app.
                  </p>
                  <p>
                    We also provide specialized training for your system administrators, empowering them to manage basic tasks like adding new users, changing greetings, and monitoring system performance. Our goal is to ensure that your entire organization can leverage the full power of the Zultys platform from day one.
                  </p>
                  <p>
                    Our training programs for DFW businesses include:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>End-User Training:</strong> Hands-on sessions covering basic call handling, voicemail, and UC features.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Admin Training:</strong> In-depth training for your IT team on system management and configuration.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Custom Documentation:</strong> We provide easy-to-follow quick reference guides tailored to your specific setup.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold">Team Training</h4>
                  <p className="text-sm text-gray-600">Empower your staff with hands-on learning.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <CheckCircle className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">Certification</h4>
                  <p className="text-sm text-gray-600">Our technicians are fully Zultys certified.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <Clock className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">Efficiency</h4>
                  <p className="text-sm text-gray-600">Streamlined setup to save your business time.</p>
                </div>
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold">Support</h4>
                  <p className="text-sm text-gray-600">Ongoing assistance after the installation is complete.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 6: Post-Installation Support */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ongoing Support and Optimization</h2>
              <p className="text-xl text-gray-600">
                Our commitment to your DFW business doesn't end when the installation is finished.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                After your <strong>Zultys system is installed</strong>, we provide ongoing support to ensure it continues to perform at its best. We offer proactive monitoring, regular software updates, and expert technical assistance whenever you need it. Our local Fort Worth support team is just a phone call away, ready to help with any questions or issues that may arise.
              </p>
              <p>
                We also work with you to periodically review your system configuration and call flows to ensure they are still meeting your evolving business needs. As your organization grows and changes, we help you optimize your Zultys system to maximize its value and support your long-term success.
              </p>
              <p>
                For DFW businesses, this ongoing partnership means:
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Peace of Mind:</strong> Know that your critical communications are supported by a team of local experts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Maximum Uptime:</strong> Benefit from proactive monitoring and rapid response to any technical issues.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Continuous Improvement:</strong> Keep your system optimized for your changing business requirements.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 7: Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Why Choose DFW Business Communications for Your Zultys Installation?</h2>
            <div className="prose prose-xl mx-auto max-w-4xl text-gray-600">
              <p>
                With over 20 years of experience serving the Dallas-Fort Worth area, we have built a reputation for excellence in <strong>business phone system installation</strong>. We are a locally owned and operated company, and we take pride in providing a level of personal service and technical expertise that national providers simply can't match.
              </p>
              <p>
                When you partner with us, you're not just getting a new phone system; you're getting a dedicated team of professionals committed to ensuring your communications are a strategic asset for your business. We handle every detail of your <strong>Zultys installation in Fort Worth</strong> with care and precision, ensuring a seamless and successful experience from start to finish.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Certified Expertise</h4>
                <p className="text-gray-600">Our technicians are fully certified on the Zultys MX platform and latest VoIP technologies.</p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Local DFW Team</h4>
                <p className="text-gray-600">We are based in Fort Worth and provide rapid, on-site support to our North Texas clients.</p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Proven Process</h4>
                <p className="text-gray-600">Our structured installation process ensures a seamless migration and high-quality results.</p>
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
