import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Headphones, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Clock, 
  Phone,
  Wrench,
  LifeBuoy
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_FORT_WORTH_BG,
  SUPPORT_TEAM,
  OFFICE_COMMUNICATION,
} from '../constants/images';

export function Support() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys Support & Maintenance | Business Phone Support Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Zultys support and maintenance services in Fort Worth and Dallas. 24/7 technical assistance and reliable phone system support for DFW businesses.';
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
    metaKeywords.setAttribute('content', 'Zultys technical support Dallas, business phone repair Fort Worth, VoIP maintenance DFW, Zultys help desk North Texas, 24/7 phone support Dallas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/support-maintenance');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys Technical Support & Maintenance',
      description: 'Comprehensive support and maintenance services for Zultys communication systems across Dallas-Fort Worth.',
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
              alt="Zultys Support Fort Worth"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-500/30">
                <LifeBuoy className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-100 uppercase tracking-wider">Expert Technical Support</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Zultys Support & Maintenance for DFW Businesses
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-slate-100 leading-relaxed">
                Reliable, local, and expert Zultys support and maintenance services for your 
                Dallas-Fort Worth organization. We provide 24/7 technical assistance, 
                proactive system monitoring, and rapid on-site response to keep your 
                business communications performing at their peak across North Texas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={openQuote}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
                >
                  Request Technical Support
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-6"
                >
                  <a href="tel:8177176012">Call Support Now</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Support Benefits Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Peace of Mind for Your Business</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our support services are designed to ensure your communication system is always performing at its best.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Local DFW Experts',
                  description: 'Our team of certified Zultys technicians is based right here in Fort Worth, ready to help when you need us.',
                  icon: Users,
                },
                {
                  title: '24/7 Emergency Support',
                  description: 'We understand that business doesn\'t stop. Our emergency support team is available around the clock.',
                  icon: Clock,
                },
                {
                  title: 'Proactive Maintenance',
                  description: 'We perform regular system checks and updates to prevent issues before they affect your business.',
                  icon: Wrench,
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

        {/* Detailed Content Section */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-200">
                  <ImageWithFallback
                    src={SUPPORT_TEAM}
                    alt="DFW Business Communications Support Team"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                  Your Trusted Zultys Partner in Fort Worth: Expert Support & Maintenance
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    At DFW Business Communications, we don't just sell phone systems; we build long-term relationships with our clients. <strong>Zultys support Fort Worth</strong> is a core part of what we do. We know that your communication system is the lifeblood of your business, and we take that responsibility seriously. In the fast-paced business environment of Dallas-Fort Worth, even a few minutes of downtime can result in lost revenue and frustrated customers.
                  </p>
                  <p>
                    Our support plans are tailored to meet the needs of businesses of all sizes, from small offices to large enterprises across North Texas. Whether you need a simple configuration change, a complex system upgrade, or emergency troubleshooting, our team has the knowledge and experience to get the job done right. We are committed to ensuring that your Zultys system is always performing at its peak.
                  </p>
                  <p>
                    When you choose DFW Business Communications for your Zultys support, you're choosing a partner that is dedicated to your success. We provide proactive maintenance, 24/7 emergency assistance, and expert guidance to help you get the most out of your communication investment.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Disaster Recovery Planning for DFW Businesses</h3>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    <strong>Disaster Recovery Planning</strong> is a critical component of our comprehensive support services. For businesses in the Dallas-Fort Worth area, being prepared for unexpected events—whether it's a severe North Texas storm or a major network outage—is essential for maintaining business continuity. DFW Business Communications works with you to develop a robust disaster recovery strategy for your Zultys system, ensuring that your Dallas or Fort Worth office can stay connected even in the most challenging circumstances.
                  </p>
                  <p>
                    Our local DFW experts help you implement redundant communication paths, cloud-based failover options, and automated backup procedures. We ensure that your North Texas organization has a clear and tested plan for restoring communications quickly, minimizing the impact on your customers and your bottom line. Trust DFW Business Communications to safeguard your communication infrastructure against the unexpected.
                  </p>
                </div>
                
                <div className="mt-12 space-y-4">
                  {[
                    'Certified Zultys technical assistance from local experts',
                    'Remote & on-site support options for fast resolution',
                    'Proactive software update & security patch management',
                    'Hardware replacement & comprehensive warranty support',
                    '24/7 Emergency support for critical system issues',
                    'System health monitoring & performance reporting',
                    'Customized maintenance plans for every business size'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Proactive Maintenance for Maximum Uptime</h3>
                <p>
                  The best way to handle a problem is to prevent it from happening in the first place. Our Zultys support services include proactive maintenance and regular system health checks. We monitor your system for potential issues, apply the latest software updates and security patches, and ensure that your hardware is performing optimally. This proactive approach significantly reduces the risk of unexpected downtime and extends the life of your communication system.
                </p>
                <p>
                  For businesses in Fort Worth and Dallas, this means peace of mind. You can focus on running your business, knowing that your communication infrastructure is being managed by experts who are dedicated to keeping you connected.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">24/7 Emergency Support When You Need It Most</h3>
                <p>
                  We understand that business doesn't always happen between 9 and 5. That's why we offer 24/7 emergency support for our Zultys clients. If your system experiences a critical failure outside of normal business hours, our emergency response team is ready to help. We provide fast, reliable assistance to get your communications back online as quickly as possible, minimizing the impact on your DFW business.
                </p>
                <p>
                  Our local presence in Fort Worth allows us to provide on-site emergency support when necessary, something that national providers simply cannot match. We are committed to being there for our clients whenever they need us.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Expert Guidance and System Optimization</h3>
                <p>
                  As your business evolves, your communication needs will change. Our support services include expert guidance to help you optimize your Zultys system for your growing needs. Whether you're adding new users, opening a new location in the DFW area, or looking to implement new features like integrated conferencing or mobile collaboration, our team is here to help.
                </p>
                <p>
                  We provide customized configuration services to ensure that your call flows, IVRs, and user settings are perfectly aligned with your business processes. We also offer ongoing training for your team, ensuring that everyone knows how to use the full power of the Zultys platform to improve their productivity.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Remote Support and Diagnostic Tools for Fast Resolution</h3>
                <p>
                  In many cases, technical issues can be resolved quickly through our advanced <strong>Remote Support and Diagnostic Tools</strong>. Our DFW-based technicians can securely access your Zultys system remotely to perform real-time troubleshooting, configuration changes, and software updates. This remote capability allows us to provide near-instant support for your North Texas business, minimizing the need for on-site visits and reducing resolution times.
                </p>
                <p>
                  We use professional-grade diagnostic software to monitor system performance, identify network bottlenecks, and analyze call quality metrics across your DFW enterprise. This data-driven approach ensures that we can pinpoint the root cause of any issue and implement a lasting solution for your Dallas or Fort Worth office.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Hardware Replacement and Warranty Management in DFW</h3>
                <p>
                  Should a hardware component fail, DFW Business Communications provides comprehensive <strong>Hardware Replacement and Warranty Management</strong> services. We maintain a local inventory of critical Zultys components in Fort Worth to ensure that we can provide rapid replacements for our North Texas clients. Our team handles the entire RMA process, from initial diagnosis to the installation of the replacement hardware at your DFW facility.
                </p>
                <p>
                  We also help you manage your Zultys warranties and service contracts, ensuring that your communication investment is always protected. By partnering with us, you can rest assured that any hardware issues will be handled professionally and efficiently, keeping your DFW business operations running smoothly.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Customized Support Plans for DFW Businesses of All Sizes</h3>
                <p>
                  We recognize that every organization has unique support requirements. That's why we offer <strong>Customized Support Plans</strong> tailored to the specific needs of your DFW business. Whether you need basic maintenance and software updates or comprehensive 24/7 emergency support with guaranteed response times, we have a plan that fits your budget and operational goals in North Texas.
                </p>
                <p>
                  Our team works with you to evaluate your communication infrastructure and design a support strategy that provides the best value for your DFW enterprise. From small Fort Worth startups to large Dallas corporations, we provide the expert Zultys support you need to stay connected and productive.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">The Importance of Regular System Backups and Data Protection</h3>
                <p>
                  Protecting your communication data is a critical part of our support philosophy. We help DFW businesses implement <strong>Regular System Backups and Data Protection</strong> strategies for their Zultys systems. This includes automated off-site backups of system configurations, voicemails, and call recordings, ensuring that your critical data is always recoverable in the event of a disaster at your North Texas facility.
                </p>
                <p>
                  We also provide guidance on data retention policies and security best practices to ensure that your DFW business remains compliant with relevant regulations. By prioritizing data protection, we help you safeguard your communication assets and maintain business continuity across the entire Dallas-Fort Worth metroplex.
                </p>

                <h4 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Network Infrastructure Audits and Optimization for North Texas</h4>
                <p>
                  A reliable phone system depends on a robust network. DFW Business Communications offers comprehensive <strong>Network Infrastructure Audits</strong> for our North Texas clients. Our local DFW technicians analyze your existing cabling, switches, and routers to identify potential bottlenecks that could affect your Zultys system's performance. We provide detailed recommendations for optimization, ensuring that your Dallas or Fort Worth office network is fully prepared for high-quality voice and video traffic.
                </p>
                <p>
                  By optimizing your network infrastructure, we help you eliminate common VoIP issues like dropped calls and poor audio quality. Our goal is to provide a seamless and reliable communication experience for your entire North Texas organization, backed by our expert local support and deep technical knowledge.
                </p>

                <h4 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Security Audits and Compliance for DFW Organizations</h4>
                <p>
                  In an increasingly complex digital landscape, <strong>Security Audits and Compliance</strong> are more important than ever. DFW Business Communications performs regular security reviews of your Zultys system to ensure it meets the latest industry standards and regulatory requirements. For North Texas businesses in sectors like healthcare, finance, and legal, maintaining compliance is essential. We help you implement advanced encryption, secure access controls, and regular security updates to protect your DFW enterprise's communication data.
                </p>
                <p>
                  Our local DFW experts stay up-to-date on the latest security threats and mitigation strategies, providing you with the peace of mind that your communication system is secure. Trust DFW Business Communications to help you navigate the complexities of security and compliance in the Dallas-Fort Worth area.
                </p>

                <h4 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Value of a Long-Term Support Partnership in North Texas</h4>
                <p>
                  We believe in the <strong>Value of a Long-Term Support Partnership</strong>. DFW Business Communications is dedicated to being more than just a service provider; we are a strategic partner in your North Texas organization's success. By providing consistent, high-quality support and expert guidance, we help you get the most out of your Zultys investment over the long term. Our local DFW team is committed to your growth and evolution, providing the communication solutions you need to thrive in the competitive Dallas-Fort Worth market.
                </p>
                <p>
                  Whether you are a small business in Fort Worth or a large corporation in Dallas, our personalized approach to support ensures that your unique needs are always met. Partner with DFW Business Communications for a communication experience that is reliable, secure, and fully supported by local experts who care about your North Texas business.
                </p>
              </div>

              <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Partner with DFW Business Communications for Support?</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-blue-600 mb-3">Local DFW Presence</h4>
                    <p>We are a local Fort Worth company, providing fast, on-site support and personal service that national providers cannot match. We know the DFW business landscape.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-600 mb-3">Certified Zultys Experts</h4>
                    <p>Our technicians are fully certified by Zultys, ensuring they have the deep technical knowledge required to support and maintain your complex communication system.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-600 mb-3">Fast Response Times</h4>
                    <p>We prioritize our support requests to ensure that critical issues are addressed immediately. We understand the importance of staying connected.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-600 mb-3">Personalized Service</h4>
                    <p>We build long-term relationships with our clients. When you call for support, you're talking to a team that knows your business and your system.</p>
                  </div>
                </div>
                <div className="mt-10 text-center">
                  <p className="text-2xl font-bold text-gray-900">Call Leroy today at 817-231-2962 for expert Zultys support.</p>
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
