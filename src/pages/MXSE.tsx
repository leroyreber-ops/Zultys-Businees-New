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
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Shield,
  Cpu,
  Layout,
  Smartphone,
  Clock
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { HashLink as Link } from '../components/HashLink';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_MXSE,
  ZULTYS_FORT_WORTH_BG,
  SUPPORT_TEAM,
} from '../constants/images';

export function MXSE() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys MX-SE | Small Business Phone System Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'The Zultys MX-SE is the perfect all-in-one phone system for small businesses in Fort Worth and Dallas. Enterprise features for up to 50 users.';
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
    metaKeywords.setAttribute('content', 'Zultys MX-SE Dallas, small business server Fort Worth, all-in-one phone system DFW, Zultys small office server North Texas, office phone hardware Dallas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-mx-se');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Zultys MX-SE IP PBX',
      description: 'Compact all-in-one IP PBX for small businesses in Dallas-Fort Worth.',
      brand: {
        '@type': 'Brand',
        name: 'Zultys'
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        areaServed: 'Dallas-Fort Worth'
      }
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
        <Hero
          title={<>Zultys <span className="text-zultys-green">MX-SE</span> <br />Solution.</>}
          subtitle="Enterprise-grade unified communications scaled perfectly for Fort Worth small businesses. Everything you need in one compact box."
          icon={Zap}
          iconLabel="Small Business Powerhouse"
          buttonText="Get a Free MX-SE Quote"
          onButtonClick={openQuote}
        />

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Big Features for Small Business</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't let the size fool you. The MX-SE delivers the full power of the Zultys MX software.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Up to 50 Users',
                  description: 'Perfectly sized for small offices, branch locations, and retail stores in DFW.',
                  icon: Users,
                },
                {
                  title: 'All-in-One Design',
                  description: 'Integrated PBX, voicemail, auto-attendant, and unified communications.',
                  icon: Layout,
                },
                {
                  title: 'Mobile Ready',
                  description: 'Full support for MXmobile, allowing your team to work from anywhere.',
                  icon: Smartphone,
                },
              ].map((feature, index) => (
                <Card key={index} className="p-8 border-slate-200 hover:border-blue-500 transition-colors">
                  <div className="p-3 bg-blue-100 rounded-xl w-fit mb-6">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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
                  Enterprise-Grade Power for Small Business: The Zultys MX-SE
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    In the competitive business environment of the Dallas-Fort Worth metroplex, small businesses need every advantage they can get. Often, the biggest hurdle to growth is a communication system that is either too basic to handle professional needs or too complex and expensive to manage. The <strong>Zultys MX-SE business communications solution</strong> was designed specifically to bridge this gap. It is a compact, all-in-one IP PBX appliance that delivers the full power of Zultys' enterprise-grade software to businesses with up to 50 users.
                  </p>
                  <p>
                    The "SE" in MX-SE stands for "Small Enterprise," and that is exactly what this system creates. It allows a small office in Fort Worth or a boutique retail shop in Arlington to project the image and utilize the tools of a much larger corporation. From advanced auto-attendants and professional call queuing to integrated instant messaging and mobile collaboration, the MX-SE ensures that your small business never sounds "small" to your customers.
                  </p>
                  <p>
                    At DFW Business Communications, we understand the unique challenges faced by small business owners in North Texas. We've helped hundreds of local companies transition from outdated analog phones or limited "cloud-only" systems to the robust, reliable, and feature-rich environment of the Zultys MX-SE. Our goal is to provide you with a communication platform that doesn't just work, but actually helps your business grow.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-100">
                  <ImageWithFallback
                    src={ZULTYS_MXSE}
                    alt="Zultys MX-SE Small Business Phone System"
                    className="w-full h-auto max-h-[500px] object-contain p-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

                  {/* Detailed Content Section 2: Big Features, Small Budget */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Big Features for Small Business Budgets</h2>
              <p className="text-xl text-gray-600">
                The MX-SE doesn't compromise on features. You get the same award-winning software as the enterprise-level MX250.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                One of the most common misconceptions in the telecommunications industry is that small businesses don't need—or can't afford—advanced features. Zultys has turned this idea on its head with the <strong>MX-SE</strong>. Because the system uses the exact same Linux-based software as the larger MX series appliances, every single feature is available to you from day one. There are no "lite" versions or restricted modules.
              </p>
              <p>
                Imagine having a professional IVR (Interactive Voice Response) system that greets your callers and directs them to the right department, just like a Fortune 500 company. Consider the productivity boost of having visual voicemail delivered directly to your email inbox, or the ability to record any call with a single click for quality assurance or legal compliance. These are not "add-ons" for the MX-SE; they are core components of the <strong>Zultys MX-SE business communications solution</strong>.
              </p>
              <p>
                For DFW businesses, this means you can implement sophisticated communication strategies that were previously reserved for large corporations:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Unified Messaging</strong>
                  Receive your voicemails and faxes directly in your email, allowing you to manage all your communications from a single inbox.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Presence Awareness</strong>
                  See at a glance if a colleague is on a call, in a meeting, or available for a quick chat, reducing "phone tag" and improving internal efficiency.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Integrated Conferencing</strong>
                  Host your own conference calls without the need for expensive third-party services. The MX-SE includes a built-in conference bridge.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Advanced Call Routing</strong>
                  Create custom schedules and routing rules to ensure that calls are handled correctly after hours, on holidays, or during emergencies.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 3: All-in-One Architecture */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900 p-4">
                  <ImageWithFallback
                    src={SUPPORT_TEAM}
                    alt="Reliable Zultys MX-SE Support Fort Worth"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  The All-in-One Appliance Advantage
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    For a small business in the DFW area, IT resources are often limited. You don't have a dedicated team of engineers to manage a complex server room. This is where the <strong>MX-SE</strong> truly shines. Its "All-in-One" appliance architecture means that everything—the PBX, the voicemail server, the gateway for mobile apps, and the security firewall—is contained within a single, compact device.
                  </p>
                  <p>
                    This design significantly reduces the "footprint" of your phone system. It doesn't require a massive rack or a specialized cooling system. In fact, the MX-SE is so quiet and compact that it can be placed almost anywhere in your office. But don't let its small size fool you; inside is a powerful, hardened Linux system that is built for 24/7 operation.
                  </p>
                  <p>
                    Furthermore, <strong>Energy Efficiency and Sustainability</strong> are key considerations for modern DFW businesses. The MX-SE is designed to consume minimal power, reducing your carbon footprint and lowering your monthly utility bills in North Texas. This makes it an ideal choice for environmentally conscious small enterprises across the DFW metroplex.
                  </p>
                  <p>
                    The benefits of this integrated approach are clear:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Simplified Installation:</strong> With fewer components to connect and configure, your new system can be up and running in hours, not days.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Lower Maintenance:</strong> One box to manage means fewer things that can go wrong. Software updates are applied to the entire system at once.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Energy Efficiency:</strong> The MX-SE consumes significantly less power than a traditional multi-server phone system, lowering your utility bills.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Advanced Call Reporting and Analytics for Small Business */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Advanced Call Reporting and Analytics for Small Business in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    Data-driven decision-making is no longer just for large corporations. With the <strong>Zultys MX-SE</strong>, DFW small businesses gain access to powerful call reporting and analytics tools. You can track call volumes, monitor agent performance, and identify peak calling periods in your North Texas office.
                  </p>
                  <p>
                    These insights allow you to optimize your staffing levels, improve customer service, and ensure that every lead is handled effectively. Whether you're running a boutique law firm in Dallas or a medical clinic in Fort Worth, the MX-SE provides the data you need to run a more efficient and profitable DFW business.
                  </p>
                  <p>
                    Key reporting benefits for DFW small enterprises:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Real-Time Call Monitoring:</strong> See exactly what's happening on your DFW phone system at any moment.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Historical Trend Analysis:</strong> Identify patterns in your DFW customer communications over time.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Customizable Reports:</strong> Create reports tailored to the specific KPIs of your North Texas business.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-4 border border-slate-200">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1080"
                    alt="Zultys MX-SE Analytics DFW"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Disaster Recovery and Business Continuity for DFW Small Enterprises */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Disaster Recovery and Business Continuity</h2>
              <p className="text-xl text-gray-600">
                Ensure your DFW small business stays connected, no matter what happens in North Texas.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                For a small business, a single day of downtime can be devastating. The <strong>Zultys MX-SE</strong> includes built-in disaster recovery features that ensure your communications remain active even during an emergency in the Dallas-Fort Worth area. By leveraging Zultys' hybrid capabilities, you can automatically failover to the cloud or another location if your primary DFW office is impacted.
              </p>
              <p>
                This level of resilience is essential for maintaining customer trust and ensuring that your North Texas team can continue to work effectively, even in challenging circumstances. With the MX-SE, you have a partner that is as dedicated to your business continuity as you are.
              </p>
              <p>
                Continuity benefits for DFW small businesses include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Automatic Cloud Failover</strong>
                  Seamlessly transition to cloud resources if your DFW hardware is unavailable.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Remote User Resilience</strong>
                  Ensure your remote DFW team stays connected even if the main office is down.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Secure Data Redundancy</strong>
                  Benefit from regular backups and redundant storage for your DFW communication data.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Rapid System Recovery</strong>
                  Get your DFW communications back up and running quickly after an incident.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 4: Mobility & Remote Work */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl font-bold mb-6 text-white">Empower Your Mobile Workforce</h2>
              <p className="text-xl text-white">
                In the modern DFW business world, work happens everywhere. The MX-SE ensures your team stays connected, whether they are in the office, at home, or on the road.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p className="text-white">
                  The "office" is no longer just a physical location. For many small businesses in Fort Worth, employees might be working from a home office in Keller, meeting a client in downtown Dallas, or traveling for business. The <strong>Zultys MX-SE business communications solution</strong> was built with this mobility in mind. Through the Zultys Advanced Communicator (ZAC) and the MXmobile app, your employees can take their office extension with them wherever they go.
                </p>
                <p className="text-white">
                  When an employee uses MXmobile on their smartphone, they aren't just making a phone call; they are fully integrated into the corporate communication system. They can see who is available, join a group chat, and even record calls—all while using their professional business number. This protects their personal privacy and ensures that your company maintains a professional image at all times.
                </p>
              </div>
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p className="text-white">
                  The MX-SE also makes it incredibly easy to support full-time remote workers. Because the system includes built-in secure remote access technology, an employee can simply take their Zultys IP phone home, plug it into their internet connection, and it will work exactly as if it were sitting on their desk in the office. There is no need for complex VPNs or expensive network configurations.
                </p>
                <p className="text-white">
                  At DFW Business Communications, we specialize in helping local businesses implement these mobile and remote work strategies. We ensure that your <strong>MX-SE</strong> is configured for maximum security and performance, giving your team the freedom to work from anywhere without sacrificing connectivity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 5: Scalability */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Scalability: A System That Grows With You
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    One of the biggest fears for a small business owner is investing in technology that they will quickly outgrow. With the <strong>Zultys MX-SE</strong>, that fear is eliminated. While the MX-SE is optimized for up to 50 users, it is part of a larger ecosystem that can scale to support thousands of users across hundreds of locations.
                  </p>
                  <p>
                    If your business expands beyond the capacity of a single MX-SE, you don't have to start over. You can simply add another MX appliance or upgrade to a larger model like the MX250. Because all Zultys MX appliances use the same software, your users won't need any additional training, and your existing configuration can be easily migrated.
                  </p>
                  <p>
                    Furthermore, the MX-SE can be networked with other Zultys systems using MXnetwork technology. This allows you to connect multiple offices into a single, seamless communication fabric. Whether you are opening a second location in Plano or a third in Southlake, your <strong>MX-SE</strong> will remain a vital and integrated part of your growing organization.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">50</div>
                  <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">Max Users</div>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <div className="text-4xl font-bold text-slate-600 mb-2">128</div>
                  <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">Max Locations</div>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <div className="text-4xl font-bold text-slate-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">Feature Match</div>
                </div>
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">Reliability</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 6: Ease of Management */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Simplified Management for Non-Technical Staff</h2>
              <p className="text-xl text-gray-600">
                You don't need to be a rocket scientist to manage your Zultys system. The MX-SE is designed for ease of use at every level.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                As a small business owner in Fort Worth, you wear many hats. "IT Administrator" shouldn't have to be one of them. The <strong>Zultys MX-SE business communications solution</strong> features an intuitive, web-based management interface that allows you to make common changes quickly and easily. Adding a new user, changing an auto-attendant greeting, or updating a holiday schedule can be done in minutes without the need for a service call.
              </p>
              <p>
                This empowerment is a key part of the Zultys philosophy. We provide your team with the training and tools they need to be self-sufficient, while our expert support team at DFW Business Communications is always available for more complex tasks or troubleshooting.
              </p>
              <p>
                The MX-SE also includes powerful reporting tools that give you visibility into your communication patterns. See how many calls your team is handling, identify peak hours, and ensure that your customers are getting the attention they deserve. This data allows you to make informed decisions about staffing and service levels, helping you run a more efficient and profitable DFW business.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 7: Reliability & Security */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Reliability and Security You Can Depend On
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    For a small business, a few hours of phone downtime can mean thousands of dollars in lost revenue. The <strong>MX-SE</strong> is built on the same rock-solid Linux foundation as Zultys' largest enterprise systems, ensuring maximum uptime. Because it is an on-premise appliance, you aren't at the mercy of a "cloud" provider's data center or a widespread internet outage. If your internet goes down, your local calls and internal communications continue to function.
                  </p>
                  <p>
                    Security is also a top priority. The MX-SE includes a built-in stateful packet inspection firewall and supports encrypted voice traffic (SRTP) and signaling (TLS). This protects your business from eavesdropping and unauthorized access. For DFW businesses in sensitive industries like healthcare or finance, the MX-SE provides the security features needed to maintain compliance with strict regulations.
                  </p>
                  <p>
                    At DFW Business Communications, we also provide regular software updates and proactive monitoring for your <strong>MX-SE</strong>, ensuring that your system is always protected against the latest threats and performing at its best.
                  </p>
                </div>
              </div>
              <div className="bg-blue-900 rounded-3xl p-12 text-white shadow-2xl">
                <Shield className="h-16 w-16 text-blue-400 mb-8" />
                <h3 className="text-3xl font-bold mb-6">Small Business Security</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Hardened Linux Operating System</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Built-in Firewall & Intrusion Prevention</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Encrypted Voice & Data Transmission</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Secure Remote User Connectivity</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Regular Security Patches & Updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 8: Why Choose DFW Business Communications */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">Your Local Zultys MX-SE Partner in Fort Worth</h2>
            <div className="prose prose-xl prose-invert mx-auto max-w-4xl text-white">
              <p className="text-white">
                When you choose DFW Business Communications for your <strong>Zultys MX-SE business communications solution</strong>, you aren't just buying a box; you're gaining a partner dedicated to your success. We've been serving the Dallas-Fort Worth area for over 20 years, and we pride ourselves on providing the highest level of local, personal service.
              </p>
              <p className="text-white">
                From the initial site survey and system design to the final user training and ongoing support, we are with you every step of the way. We know that every DFW business is unique, and we take the time to understand your specific needs and goals.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4 text-white">Certified Technicians</h4>
                <p className="text-white">Our team is fully trained and certified by Zultys, ensuring a professional installation every time.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4 text-white">24/7 Local Support</h4>
                <p className="text-white">We are based in Fort Worth and ready to help whenever you need us, day or night.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Shield className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4 text-white">Proven Reliability</h4>
                <p className="text-white">We only recommend solutions that we know will provide the reliability your business demands.</p>
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
