import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Cloud, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Globe, 
  Server,
  Cpu,
  Lock,
  Smartphone,
  Users
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Hero } from '../components/Hero';
import {
  ZULTYS_FORT_WORTH_BG,
  SUPPORT_TEAM,
  ZULTYS_MX_MOBILE,
  HERO_BACKGROUND,
  ZULTYS_CLOUD_SERVICES,
} from '../constants/images';

export function CloudServices() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys Cloud Services | Hosted VoIP Phone Systems Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Zultys Cloud services provide a powerful, hosted VoIP solution for businesses in Fort Worth and Dallas. Scalable, secure, and managed communication systems in DFW.';
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
    metaKeywords.setAttribute('content', 'cloud phone system Dallas, hosted VoIP Fort Worth, managed communications DFW, Zultys cloud, business cloud PBX North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/cloud-services');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys Cloud Communication Services',
      description: 'Fully managed, hosted Zultys communication solutions for businesses across Dallas-Fort Worth.',
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
        <Hero
          title={<>Zultys <span className="text-zultys-green">Cloud</span> <br />Solutions.</>}
          subtitle="Experience the full power of Zultys without the hardware. Scalable, secure, and fully managed hosted VoIP for DFW businesses."
          icon={Cloud}
          iconLabel="Cloud Communication Services"
          buttonText="Request Cloud Pricing"
          onButtonClick={openQuote}
        />

        {/* Benefits Section - SaaS Style */}
        <section className="py-24 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
                The Benefits of <span className="text-zultys-green">Zultys Cloud.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Move your communications to the cloud and enjoy increased flexibility and reduced overhead for your North Texas business.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'No Hardware to Manage',
                  description: 'Eliminate the need for on-site servers and maintenance. We handle all the technical details in the cloud for your DFW office.',
                  icon: Server,
                },
                {
                  title: 'Instant Scalability',
                  description: 'Easily add or remove users as your North Texas business grows, paying only for what you need in the DFW metroplex.',
                  icon: Zap,
                },
                {
                  title: 'Enterprise Security',
                  description: 'Benefit from enterprise-grade security and redundancy in our state-of-the-art data centers, protecting your DFW data.',
                  icon: Lock,
                },
              ].map((benefit, index) => (
                <Card key={index} className="p-12 border border-gray-100 bg-white hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] transition-all duration-500 group rounded-[2rem]">
                  <div className="p-4 bg-gray-50 rounded-2xl w-fit mb-8 group-hover:bg-zultys-green transition-colors duration-500">
                    <benefit.icon className="h-8 w-8 text-charcoal group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-black text-charcoal mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section 1: Introduction - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-block bg-zultys-gold/10 text-zultys-gold px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  The Future is Here
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Zultys Cloud Services: The Future of <span className="text-zultys-green">Business Communications</span> in DFW.
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    In today's fast-paced business world, flexibility and agility are key to staying competitive. For businesses in the Dallas-Fort Worth metroplex, this means having a communication system that can adapt to changing needs, support a distributed workforce, and deliver enterprise-grade features without the burden of managing complex on-site hardware. <strong>Zultys Cloud services Fort Worth</strong> provide exactly that—a fully managed, hosted VoIP solution that delivers the full power of the Zultys MX platform from the cloud.
                  </p>
                  <p className="leading-relaxed mb-8">
                    Moving your communications to the cloud is about more than just "getting rid of the box in the closet." It's about empowering your team with tools that work wherever they are, ensuring that your business is always reachable, and reducing the total cost of ownership of your communication infrastructure.
                  </p>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    At DFW Business Communications, we specialize in helping local companies transition to the cloud. Whether you are a small startup in Fort Worth or a large enterprise with multiple locations across North Texas, Zultys Cloud provides the foundation for your success.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_FORT_WORTH_BG}
                    alt="Zultys Cloud Services Dallas-Fort Worth"
                    className="w-full h-auto object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

                  {/* Detailed Content Section 2: The Advantage - SaaS Style */}
        <section className="py-32 bg-gray-50/50 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">The Advantage of a <span className="text-zultys-gold">Hosted Platform</span> for DFW.</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Why manage hardware when you can have a fully managed service? Zultys Cloud offers a superior alternative to traditional on-premise systems in North Texas.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {[
                {
                  title: 'Reduced Complexity',
                  description: 'No on-site servers to manage, cool, or power in your DFW office. All you need are your IP phones and a reliable internet connection.',
                },
                {
                  title: 'Always Current',
                  description: 'New features and security updates are applied automatically in the cloud, ensuring your North Texas business always has access to the latest technology.',
                },
                {
                  title: 'Superior Reliability',
                  description: 'Our cloud infrastructure is designed for 99.999% uptime, with built-in redundancy at every level to keep your DFW operations running smoothly.',
                },
                {
                  title: 'Expert Management',
                  description: 'Your system is monitored and managed 24/7 by Zultys experts and your local DFW support team at DFW Business Communications.',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
                  <h3 className="text-2xl font-black text-charcoal mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section 3: Enterprise Features - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-charcoal p-12 border border-white/10">
                  <ImageWithFallback
                    src={ZULTYS_MX_MOBILE}
                    alt="Zultys Cloud Enterprise Features for DFW Businesses"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block bg-zultys-green/10 text-zultys-green px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Enterprise Grade
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Enterprise Features Without the <span className="text-zultys-green">Enterprise Price Tag.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    One of the most unique aspects of <strong>Zultys Cloud services Fort Worth</strong> is that they provide the exact same award-winning feature set as Zultys' on-premise appliances.
                  </p>
                  <ul className="space-y-8 mt-10 list-none pl-0">
                    {[
                      {
                        title: 'Unified Communications',
                        desc: 'Seamlessly integrate voice, video, and chat across all your devices in the DFW metroplex.',
                      },
                      {
                        title: 'Mobility',
                        desc: 'Empower your remote and mobile workers in North Texas with the full power of the office phone system.',
                      },
                      {
                        title: 'Collaboration',
                        desc: 'Foster teamwork with integrated conferencing, screen sharing, and group chat for your DFW team.',
                      },
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-6 group">
                        <div className="p-3 bg-zultys-green/10 rounded-xl group-hover:bg-zultys-green transition-colors duration-500">
                          <CheckCircle className="h-6 w-6 text-zultys-green group-hover:text-white transition-colors duration-500" />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-charcoal mb-1">{feature.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 4: Security - HubSpot Style */}
        <section className="py-24 bg-charcoal text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-zultys-green/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-block bg-zultys-green/20 text-zultys-green px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-zultys-green/30">
                  Secure & Compliant
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                  Advanced Cloud <span className="text-zultys-green">Security</span> and Compliance in DFW.
                </h2>
                <div className="prose prose-lg prose-invert text-white prose-strong:text-white">
                  <p className="leading-relaxed mb-6">
                    Security is not an afterthought in the Zultys Cloud; it is a fundamental design principle. For DFW businesses handling sensitive data, <strong>Zultys Cloud security features</strong> provide the protection needed to meet strict regulatory requirements in North Texas.
                  </p>
                  <p className="leading-relaxed mb-6">
                    All voice traffic is encrypted using Secure Real-Time Transport Protocol (SRTP), and signaling is protected by Transport Layer Security (TLS). This ensures that your conversations and data are protected from interception across the DFW metroplex.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-8 mt-12">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <Shield className="h-10 w-10 text-zultys-green mb-4" />
                      <h4 className="text-xl font-black mb-2 text-white">End-to-End Encryption</h4>
                      <p className="text-white">Protect your voice and data traffic across the entire DFW metroplex.</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <Lock className="h-10 w-10 text-zultys-green mb-4" />
                      <h4 className="text-xl font-black mb-2 text-white">Regulatory Compliance</h4>
                      <p className="text-white">Meet HIPAA, PCI DSS, and other standards with ease in North Texas.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1080"
                    alt="Zultys Cloud Security DFW"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 5: Managed Services - HubSpot Style */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">Managed Services and <span className="text-zultys-green">Local DFW Support.</span></h2>
              <p className="text-xl text-gray-600">
                You're never alone in the cloud. DFW Business Communications provides the local expertise and managed services you need in North Texas.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Expert Migration',
                  description: 'A seamless transition to the cloud with minimal disruption to your DFW operations, handled by our local Fort Worth team.',
                },
                {
                  title: 'Proactive Monitoring',
                  description: 'We keep an eye on your system 24/7 to ensure optimal performance across North Texas and the entire DFW metroplex.',
                },
                {
                  title: 'Local Technical Support',
                  description: 'Rapid, personal assistance from our Fort Worth based team whenever you need it in Dallas, Arlington, or anywhere in DFW.',
                },
                {
                  title: 'Ongoing Optimization',
                  description: 'Regular reviews to ensure your Zultys Cloud solution is always perfectly sized for your growing North Texas business.',
                },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-black text-charcoal mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section 6: Scalability - HubSpot Style */}
        <section className="py-24 bg-charcoal text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-block bg-zultys-gold/20 text-zultys-gold px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-zultys-gold/30">
                  Scalability
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                  Growing Your DFW Business <span className="text-zultys-gold">Without Limits.</span>
                </h2>
                <div className="prose prose-lg prose-invert text-white prose-strong:text-white">
                  <p className="leading-relaxed mb-8">
                    One of the biggest challenges for growing businesses in the Dallas-Fort Worth area is predicting their future communication needs. <strong>Zultys Cloud</strong> eliminates this problem entirely, providing a truly elastic platform that adapts to your North Texas business's changing requirements.
                  </p>
                  <p className="leading-relaxed mb-6">
                    Whether you are adding one employee in Fort Worth or opening a new branch office in Dallas, Zultys Cloud scales with you instantly, ensuring that your communication infrastructure never becomes a bottleneck for your DFW growth.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-white/5 p-10 rounded-3xl border border-white/10 text-center hover:bg-white/10 transition-colors">
                  <Zap className="h-12 w-12 text-zultys-gold mx-auto mb-6" />
                  <h4 className="text-2xl font-black mb-2">Instant Scale</h4>
                  <p className="text-white">Add users in minutes, not days, across your DFW locations.</p>
                </div>
                <div className="bg-white/5 p-10 rounded-3xl border border-white/10 text-center hover:bg-white/10 transition-colors">
                  <Users className="h-12 w-12 text-zultys-gold mx-auto mb-6" />
                  <h4 className="text-2xl font-black mb-2">Pay-as-you-Go</h4>
                  <p className="text-white">Only pay for the seats you actually use in your North Texas office.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 7: Business Continuity - HubSpot Style */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-block bg-zultys-green/10 text-zultys-green px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Resilience
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Business Continuity for <span className="text-zultys-green">North Texas.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal">
                  <p className="leading-relaxed mb-6">
                    For any business in North Texas, the threat of severe weather or power outages is a constant reality. <strong>Zultys Cloud services Fort Worth</strong> provide a built-in disaster recovery solution that ensures your communications remain functional even when your physical office is not.
                  </p>
                  <p className="leading-relaxed mb-6">
                    Because the "brain" of your phone system is located in a secure, remote data center, your calls can always be handled. If your DFW office loses power, calls can be automatically routed to mobile phones via the MXmobile app.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center hover:shadow-lg transition-all">
                  <Globe className="h-12 w-12 text-zultys-green mx-auto mb-4" />
                  <h4 className="font-black text-charcoal mb-2">Geo-Redundancy</h4>
                  <p className="text-sm text-gray-600">Multiple data centers for DFW reliability.</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center hover:shadow-lg transition-all">
                  <Zap className="h-12 w-12 text-zultys-green mx-auto mb-4" />
                  <h4 className="font-black text-charcoal mb-2">Auto-Failover</h4>
                  <p className="text-sm text-gray-600">Reroute calls instantly during DFW outages.</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center hover:shadow-lg transition-all">
                  <Cloud className="h-12 w-12 text-zultys-green mx-auto mb-4" />
                  <h4 className="font-black text-charcoal mb-2">Cloud Backup</h4>
                  <p className="text-sm text-gray-600">Continuous data protection in the cloud.</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center hover:shadow-lg transition-all">
                  <Smartphone className="h-12 w-12 text-zultys-green mx-auto mb-4" />
                  <h4 className="font-black text-charcoal mb-2">Mobile Ready</h4>
                  <p className="text-sm text-gray-600">Switch to mobile apps instantly in DFW.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 8: Predictable Costs - HubSpot Style */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-block bg-zultys-gold/10 text-zultys-gold px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Cost Efficiency
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Predictable Costs and Reduced <span className="text-zultys-gold">IT Overhead</span> for DFW.
                </h2>
                <div className="prose prose-lg text-gray-600 prose-strong:text-charcoal">
                  <p className="leading-relaxed mb-6">
                    One of the most immediate benefits of moving to <strong>Zultys Cloud services Fort Worth</strong> is the financial clarity it provides. Instead of dealing with unexpected repair costs or expensive hardware upgrades, you have a simple, predictable monthly fee.
                  </p>
                  <p className="leading-relaxed mb-6">
                    Furthermore, Zultys Cloud significantly reduces your internal IT overhead. Because the core system is managed by Zultys and DFW Business Communications, your IT staff doesn't have to spend time troubleshooting phone issues or applying updates in your North Texas office.
                  </p>
                </div>
              </div>
              <div className="bg-charcoal rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-zultys-gold/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <Shield className="h-16 w-16 text-zultys-gold mb-8" />
                <h3 className="text-3xl font-black mb-8">Cloud Financial Benefits for DFW</h3>
                <ul className="space-y-6 list-none pl-0">
                  <li className="flex items-center gap-4 group">
                    <CheckCircle className="h-6 w-6 text-zultys-gold" />
                    <span className="text-lg text-white">No Large Upfront Capital Investment (CapEx)</span>
                  </li>
                  <li className="flex items-center gap-4 group">
                    <CheckCircle className="h-6 w-6 text-zultys-gold" />
                    <span className="text-lg text-white">Predictable Monthly Subscription Pricing (OpEx)</span>
                  </li>
                  <li className="flex items-center gap-4 group">
                    <CheckCircle className="h-6 w-6 text-zultys-gold" />
                    <span className="text-lg text-white">Eliminate Maintenance and Repair Costs in DFW</span>
                  </li>
                  <li className="flex items-center gap-4 group">
                    <CheckCircle className="h-6 w-6 text-zultys-gold" />
                    <span className="text-lg text-white">Lower Total Cost of Ownership (TCO) for DFW</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 9: Why Choose Us - HubSpot Style */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <div className="inline-block bg-zultys-green/10 text-zultys-green px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              Your Local Partner
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-charcoal mb-10 leading-tight">
              Your Local Zultys Cloud Partner in <span className="text-zultys-green">Fort Worth.</span>
            </h2>
            <div className="prose prose-xl mx-auto max-w-4xl text-gray-600 prose-strong:text-charcoal">
              <p className="leading-relaxed mb-10">
                Choosing a cloud provider is a big decision that impacts every aspect of your business operations. When you choose DFW Business Communications for your <strong>Zultys Cloud services</strong>, you are choosing a local partner with over 15 years of experience serving the Dallas-Fort Worth area.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                <Users className="h-12 w-12 text-zultys-green mx-auto mb-8 group-hover:scale-110 transition-transform" />
                <h4 className="text-2xl font-black text-charcoal mb-4">Local DFW Expertise</h4>
                <p className="text-gray-600 text-lg">We live and work in the same community as you, providing personal service across the DFW area.</p>
              </div>
              <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                <Zap className="h-12 w-12 text-zultys-green mx-auto mb-8 group-hover:scale-110 transition-transform" />
                <h4 className="text-2xl font-black text-charcoal mb-4">Seamless Migration</h4>
                <p className="text-gray-600 text-lg">Our proven process ensures your North Texas business stays connected throughout the transition.</p>
              </div>
              <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                <Shield className="h-12 w-12 text-zultys-green mx-auto mb-8 group-hover:scale-110 transition-transform" />
                <h4 className="text-2xl font-black text-charcoal mb-4">Ongoing Local Support</h4>
                <p className="text-gray-600 text-lg">Our Fort Worth based support team is always available to help with any technical needs in DFW.</p>
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
