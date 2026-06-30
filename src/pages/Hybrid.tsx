import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Layers, 
  Cloud, 
  Server, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Globe, 
  Network,
  Settings,
  Clock
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_FORT_WORTH_BG,
  ZULTYS_MX250,
  ZULTYS_MX_MOBILE,
} from '../constants/images';

export function Hybrid() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Zultys Hybrid Solutions | Hybrid Cloud Phone Systems Fort Worth';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Zultys hybrid communication solutions for businesses in Fort Worth. Combine the power of on-premise hardware with the flexibility of the cloud in DFW.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys Hybrid Communication Solutions',
      description: 'Flexible communication systems that combine on-premise and cloud-based Zultys technology.',
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
              alt="Zultys Hybrid Solutions Fort Worth"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-500/30">
                <Layers className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-100 uppercase tracking-wider">Hybrid Communication Solutions</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                The Best of Both Worlds
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-slate-100 leading-relaxed">
                Combine the security of on-premise hardware with the flexibility of 
                the cloud. Custom-tailored hybrid solutions for DFW businesses.
              </p>
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
              >
                Request Hybrid Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Hybrid?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hybrid solutions offer unmatched flexibility, allowing you to place resources where they make the most sense.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Flexible Deployment',
                  description: 'Keep your headquarters on-premise while using the cloud for branch offices and remote workers in DFW.',
                  icon: Network,
                },
                {
                  title: 'Disaster Recovery',
                  description: 'Use the cloud as a seamless failover for your on-site system, ensuring business continuity.',
                  icon: Shield,
                },
                {
                  title: 'Optimized Costs',
                  description: 'Balance capital expenditures and operating expenses to fit your DFW business budget.',
                  icon: Zap,
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
                  Zultys Hybrid Solutions: Flexible Communications for Your DFW Business
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    In today's rapidly evolving business landscape, a one-size-fits-all approach to communications rarely meets the complex needs of modern organizations. For businesses in the Dallas-Fort Worth area, the choice between on-premise and cloud-based systems doesn't have to be an either-or proposition. <strong>Zultys hybrid phone systems Fort Worth</strong> provide the flexibility to combine the best of both worlds, allowing you to leverage the security and control of on-site hardware with the agility and scalability of the cloud.
                  </p>
                  <p>
                    Zultys hybrid solutions are designed to adapt to your unique operational requirements and growth plans. You can maintain your core communication infrastructure on-site at your headquarters for maximum control and data sovereignty, while using the cloud to support branch offices, remote workers, and mobile teams. This hybrid approach allows you to transition to the cloud at your own pace, ensuring that your communication strategy always aligns with your business goals.
                  </p>
                  <p>
                    At DFW Business Communications, we specialize in designing and managing complex hybrid communication environments for businesses across North Texas. We understand that every organization has its own unique set of challenges and priorities, and we are dedicated to providing <strong>hybrid VoIP solutions in DFW</strong> that are custom-tailored to your specific needs.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-100 p-4">
                  <ImageWithFallback
                    src={ZULTYS_MX_MOBILE}
                    alt="Hybrid Communications Solutions DFW"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 2: Best of Both Worlds */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">On-Premise Security Meets Cloud Agility</h2>
              <p className="text-xl text-gray-600">
                Combine the strengths of different deployment models to create a truly optimized communication environment.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                The primary advantage of a <strong>Zultys hybrid solution</strong> is the ability to place your communication resources where they make the most sense for your business. For many DFW organizations, this means keeping sensitive data and critical call handling on-site for maximum security and reliability, while leveraging the cloud for its flexibility and ease of deployment.
              </p>
              <p>
                This approach allows you to maintain total control over your core infrastructure while still providing your distributed workforce with the enterprise-grade tools they need to stay productive. Whether your team is in a corporate office in Dallas, a branch in Fort Worth, or working from home anywhere in North Texas, Zultys ensures a seamless and unified communication experience for everyone.
              </p>
              <p>
                Key advantages of the Zultys hybrid model for DFW businesses include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Optimized Resource Placement</strong>
                  Deploy on-premise hardware where security is paramount and cloud services where flexibility is needed.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Enhanced Resilience</strong>
                  Use the cloud as a seamless failover for your on-site system, ensuring business continuity.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Scalable Growth</strong>
                  Easily add new sites and users through the cloud without the need for major hardware overhauls.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Unified Management</strong>
                  Manage your entire hybrid network from a single, centralized interface.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 3: Deployment Strategies */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900 p-8">
                  <ImageWithFallback
                    src={ZULTYS_MX250}
                    alt="Flexible Hybrid Deployment with Zultys MX250"
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Flexible Deployment Strategies for Distributed Organizations
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    For businesses with a distributed workforce across the Dallas-Fort Worth area, a hybrid deployment strategy offers unmatched flexibility. You can choose to maintain your core communication infrastructure on-site at your primary location, while using <strong>Zultys Cloud services</strong> to support smaller branch offices, retail locations, or remote employees.
                  </p>
                  <p>
                    This allows you to provide a consistent and professional communication experience for all your employees, regardless of their location, while still maintaining the level of control and security that your organization requires. Zultys ensures that all your sites are seamlessly connected, allowing for extension-to-extension dialing, shared presence awareness, and unified messaging across the entire organization.
                  </p>
                  <p>
                    Furthermore, <strong>Centralized Management of Distributed Assets</strong> allows DFW IT teams to oversee their entire hybrid network from a single pane of glass. Whether you're managing users in Dallas, branch offices in Fort Worth, or remote workers in Arlington, Zultys provides the visibility and control needed to ensure optimal performance across the entire DFW metroplex.
                  </p>
                  <p>
                    For DFW distributed organizations, this flexibility leads to:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Improved Operational Efficiency:</strong> Tailor your deployment model to the specific needs of each location.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Enhanced Employee Productivity:</strong> Provide your team with the tools they need to stay connected and productive anywhere.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Simplified Multi-Site Management:</strong> Manage your entire hybrid network from a single, centralized point.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Hybrid Cloud Survivability and Local Failover */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Hybrid Cloud Survivability and Local Failover in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    One of the most critical advantages of a hybrid approach is its inherent resilience. For DFW businesses, <strong>hybrid cloud survivability</strong> ensures that your communications remain functional even if your primary connection to the cloud is interrupted. By maintaining local hardware at your headquarters or key branch offices in North Texas, you can ensure that internal communications and local PSTN connectivity remain active during a network outage.
                  </p>
                  <p>
                    Zultys' hybrid architecture allows for automatic failover between on-premise and cloud resources. If your DFW office loses its internet connection, your local MX appliance can continue to handle internal calls and route external calls through local SIP trunks or analog lines. This level of local survivability is essential for mission-critical operations in the DFW metroplex.
                  </p>
                  <p>
                    Key survivability benefits for DFW organizations:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Local Call Continuity:</strong> Maintain internal communications even during a cloud outage in North Texas.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>PSTN Failover:</strong> Route external calls through local lines if your primary SIP trunks are unavailable in DFW.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Seamless User Experience:</strong> Employees can continue to use their desk phones and features without interruption across the DFW metroplex.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-4 border border-slate-200">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1080"
                    alt="Hybrid Cloud Survivability DFW"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Optimizing Network Performance with SD-WAN and QoS */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Optimizing Network Performance with SD-WAN and QoS</h2>
              <p className="text-xl text-gray-600">
                Ensure crystal-clear communication across your entire hybrid network with advanced traffic management in DFW.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                In a hybrid environment, the performance of your network is critical to the quality of your communications. <strong>SD-WAN and Quality of Service (QoS)</strong> integration allow DFW enterprises to prioritize voice and video traffic, ensuring that your critical communications are never impacted by other network activity in North Texas.
              </p>
              <p>
                By leveraging SD-WAN technology, you can dynamically route traffic across multiple connections, ensuring that your Zultys system always has the bandwidth it needs to deliver superior performance. This is particularly valuable for DFW businesses with multiple locations, as it allows you to optimize your network costs while maintaining the highest level of communication quality across the entire metroplex.
              </p>
              <p>
                Network optimization benefits for DFW enterprises include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Prioritized Voice Traffic</strong>
                  Ensure that your calls always have the highest priority on your DFW network.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Dynamic Path Selection</strong>
                  Automatically route traffic across the best available connection in North Texas.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Reduced Latency and Jitter</strong>
                  Deliver crystal-clear voice and video quality for your DFW team and customers.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Improved Network Resilience</strong>
                  Benefit from multiple redundant connections to ensure your DFW communications are always active.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 4: Disaster Recovery */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl font-bold mb-6">Disaster Recovery and Business Continuity in a Hybrid Environment</h2>
              <p className="text-xl text-slate-100">
                Leverage the power of the cloud to ensure your critical business communications are always resilient.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="prose prose-lg prose-invert text-slate-100 max-w-none">
                <p>
                  In a business environment where communication is essential, downtime is not an option. A <strong>Zultys hybrid solution</strong> provides a robust foundation for disaster recovery and business continuity. By using the cloud as a seamless failover for your on-site system, you can ensure that your communications remain functional even during a major hardware failure or a local network outage.
                </p>
                <p>
                  In the event of an issue with your on-premise system, calls can be automatically rerouted to the cloud, ensuring that your customers can still reach you and your team can still communicate. This level of resilience is essential for businesses that require "five-nines" reliability and cannot afford any communication downtime.
                </p>
              </div>
              <div className="prose prose-lg prose-invert text-slate-100 max-w-none">
                <p>
                  For DFW organizations, this hybrid resilience translates into uninterrupted business operations. At DFW Business Communications, we specialize in designing and implementing <strong>resilient hybrid Zultys systems</strong> that are built to withstand any challenge.
                </p>
                <p>
                  We ensure that your system is configured to support your unique business continuity needs, from redundant hardware to custom cloud failover protocols.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 5: User Experience */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Seamless User Experience Across All Environments
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    One of the key strengths of the <strong>Zultys MX platform</strong> is its ability to provide a consistent and seamless user experience, regardless of the deployment model. Whether an employee is using an on-premise handset in a Dallas office, the ZAC desktop client in a Fort Worth branch, or the MXmobile app on their smartphone, they have access to the same rich set of features and tools.
                  </p>
                  <p>
                    This unified experience simplifies training, improves adoption, and ensures that your team can communicate and collaborate effectively, regardless of their location or device. Features like presence awareness, instant messaging, and video conferencing work seamlessly across the entire hybrid network, breaking down the silos between your offices and empowering your team to work as one.
                  </p>
                  <p>
                    For DFW businesses, this unified experience leads to:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Improved Team Collaboration:</strong> Foster a more collaborative culture across your entire organization.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Enhanced Employee Engagement:</strong> Keep your distributed team connected and informed.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Better Customer Service:</strong> Provide a consistent and professional experience for every caller.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <Layers className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold">Hybrid</h4>
                  <p className="text-sm text-gray-600">The best of on-premise and cloud combined.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <Cloud className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">Cloud</h4>
                  <p className="text-sm text-gray-600">Agile and scalable services for remote teams.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <Server className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">On-Premise</h4>
                  <p className="text-sm text-gray-600">Total control and maximum security.</p>
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

        {/* Detailed Content Section 6: Costs */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Optimizing Costs and Balancing Capital vs. Operating Expenses</h2>
              <p className="text-xl text-gray-600">
                Choose the financial model that best fits your organization's budget and long-term goals.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                A <strong>Zultys hybrid solution</strong> allows you to optimize your communication costs by balancing capital expenditures (CapEx) and operating expenses (OpEx). You can choose to invest in on-premise hardware for your core locations, providing a one-time capital investment that reduces long-term costs. At the same time, you can use cloud services for your branch offices and remote workers, providing a flexible operating expense that scales with your business.
              </p>
              <p>
                This hybrid financial model allows you to tailor your communication spending to your organization's specific budget and long-term goals. At DFW Business Communications, we help you evaluate the total cost of ownership (TCO) for your hybrid Zultys system and ensure that it provides the best possible value for your organization.
              </p>
              <p>
                For DFW businesses, this financial flexibility means:
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Better Budget Management:</strong> Align your communication spending with your organization's financial strategy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Reduced Long-Term Costs:</strong> Leverage on-premise hardware to lower your ongoing service fees.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Scalable Operating Expenses:</strong> Use the cloud to easily add new resources as your business grows.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 7: Migration */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  A Smooth Migration Path to the Cloud
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    For many organizations in the Dallas-Fort Worth area, the transition to the cloud is a journey, not a destination. A <strong>Zultys hybrid solution</strong> provides a smooth and manageable migration path, allowing you to move to the cloud at your own pace. You can start by leveraging the cloud for specific departments or locations, while maintaining your core infrastructure on-site.
                  </p>
                  <p>
                    As your organization becomes more comfortable with cloud-based services, you can gradually migrate more of your communications to the cloud, ensuring a seamless and unified experience for your employees throughout the process. Zultys ensures that your system remains cohesive and manageable, regardless of where your resources are hosted.
                  </p>
                  <p>
                    At DFW Business Communications, we help you plan and execute your <strong>cloud migration strategy</strong>, ensuring a successful transition for your organization.
                  </p>
                </div>
              </div>
              <div className="bg-blue-900 rounded-3xl p-12 text-white shadow-2xl">
                <Settings className="h-16 w-16 text-blue-400 mb-8" />
                <h3 className="text-3xl font-bold mb-6">Hybrid Migration Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Transition to the Cloud at Your Own Pace</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Maintain Core Infrastructure Control</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Unified Experience Throughout Migration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Reduced Risk & Minimal Disruption</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Future-Proof Your Communication Strategy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 8: Why Choose DFW Business Communications */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">Your Local Zultys Hybrid Partner in Fort Worth</h2>
            <div className="prose prose-xl prose-invert mx-auto max-w-4xl text-slate-100">
              <p>
                When you choose DFW Business Communications for your <strong>Zultys hybrid solution</strong>, you are choosing a partner with a deep understanding of the North Texas business landscape. We've been serving the Dallas-Fort Worth area for over 20 years, and we pride ourselves on providing the highest level of local, personal service.
              </p>
              <p>
                From the initial system design and migration planning to the final implementation and ongoing support, we are with you every step of the way. We know that every organization is unique, and we are dedicated to ensuring that your hybrid communication system supports your mission of providing exceptional value to your organization.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Layers className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Hybrid Expertise</h4>
                <p className="text-slate-200">We understand the unique communication and infrastructure needs of organizations that prefer hybrid solutions.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Network className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Networking Focused</h4>
                <p className="text-slate-200">We ensure that your system is configured to support the complex needs of modern hybrid networks.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">24/7 Local Support</h4>
                <p className="text-slate-200">Our Fort Worth based team is always available to support your critical hybrid operations.</p>
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
