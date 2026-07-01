import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Phone, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Building2,
  MapPin,
  Shield,
  Users,
  TrendingUp,
  Award,
  Headphones,
  Clock,
  Target,
  Smartphone,
  Cloud,
  MessageSquare
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_FORT_WORTH_BG,
  OFFICE_COMMUNICATION,
  SUPPORT_TEAM,
  ZULTYS_IP_PHONES_BG,
  ZULTYS_ZAC_MOBILE_COMBO,
  PEOPLE_ON_CALLS,
} from '../constants/images';

export function DallasZultysPhones() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Zultys Business Phones Dallas | #1 Authorized Zultys Support Dallas';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Zultys business phone system sales and support in Dallas. #1 authorized Zultys partner providing unified communications and VoIP solutions for Dallas businesses. Local DFW support.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'DFW Business Communications - Dallas Zultys Support',
      description: 'Professional Zultys business phone system services and authorized support in Dallas, TX.',
      url: 'https://dallasfortworthzultys.com/dallas-zultys-phones',
      telephone: '817-231-2962',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dallas',
        addressRegion: 'TX',
        addressCountry: 'US'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 32.7767,
        longitude: -96.7970
      },
      areaServed: ['Dallas', 'Uptown', 'Deep Ellum', 'North Dallas', 'Park Cities', 'DFW Metroplex']
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
        <section className="relative bg-slate-900 text-white py-24 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src={ZULTYS_FORT_WORTH_BG}
              alt="Zultys Business Phones Dallas Support"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-blue-500/30">
                <Award className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-bold text-blue-100 uppercase tracking-widest">#1 Authorized Zultys Partner Dallas</span>
              </div>
              <h1 className="text-5xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
                Zultys Business Phones <br />
                <span className="text-blue-500">Dallas Support</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-12 text-slate-300 leading-relaxed font-medium">
                DFW Business Communications is your premier authorized partner for <strong>Zultys business phones in Dallas</strong>. We provide expert installation, 24/7 local support, and customized unified communication solutions designed specifically for the fast-paced North Texas business environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  size="lg"
                  onClick={openQuote}
                  className="bg-zultys-gold hover:bg-zultys-gold/90 text-slate-950 text-xl px-10 py-8 shadow-2xl transition-all font-black uppercase tracking-wider rounded-xl border-none hover:scale-[1.02] active:scale-95"
                >
                  Get a Free Dallas Quote
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  asChild
                  className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-8 font-black transition-all rounded-xl shadow-2xl shadow-zultys-green/20 border-none hover:scale-[1.02] active:scale-95"
                >
                  <a href="tel:8172312962" className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-white animate-pulse" />
                    Call 817-231-2962
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                  The Gold Standard for Dallas Business Communications
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p className="text-xl font-medium text-slate-800 mb-6">
                    In the heart of the Dallas Metroplex, staying connected isn't just a convenience—it's a competitive necessity. <strong>Dallas Zultys support</strong> from DFW Business Communications ensures your organization has the most reliable, feature-rich, and scalable communication platform available today.
                  </p>
                  <p>
                    Whether you are operating a law firm in the Arts District, a healthcare facility in the Medical District, or a high-tech startup in the Silicon Prairie, our Zultys solutions are engineered to meet your specific needs. We don't just provide "phones"; we provide a unified communication fabric that ties your entire team together, regardless of where they are working in North Texas.
                  </p>
                  <p>
                    Our approach to <strong>Zultys business phones in Dallas</strong> is built on three pillars: local expertise, enterprise-grade technology, and an unwavering commitment to customer success. We understand that every missed call is a missed opportunity, which is why we prioritize system uptime and crystal-clear audio quality above all else.
                  </p>
                </div>
                
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: 'Local Dallas Technicians', icon: Users, desc: 'On-site support when you need it.' },
                    { title: 'Certified Zultys Experts', icon: Award, desc: 'Deep technical knowledge.' },
                    { title: 'Custom Call Routing', icon: Target, desc: 'Tailored to your business flow.' },
                    { title: '99.99% Uptime SLA', icon: Shield, desc: 'Reliability you can bank on.' },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col gap-2 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                      <item.icon className="h-8 w-8 text-blue-600" />
                      <span className="font-bold text-slate-900 text-lg">{item.title}</span>
                      <span className="text-sm text-slate-500">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-600/10 blur-3xl rounded-full"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white p-4">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Dallas Business Communication Solutions"
                    className="w-full h-auto object-cover rounded-[2rem]"
                  />
                </div>
                {/* Floating Stat Card */}
                <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-blue-600 rounded-2xl">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900">500+</div>
                      <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Dallas Clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Focus Section */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                Tailored Solutions for Dallas Industries
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We understand that a "one-size-fits-all" approach doesn't work in the diverse Dallas economy. Our Zultys configurations are industry-specific.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Legal & Professional',
                  icon: Building2,
                  desc: 'Secure call recording, confidential voicemail, and seamless billing integrations for Dallas law firms and consultancies.',
                  features: ['Call Recording', 'Client Billing Integration', 'Confidential VM']
                },
                {
                  title: 'Healthcare & Medical',
                  icon: Shield,
                  desc: 'HIPAA-compliant communication tools, advanced call queuing for patient scheduling, and emergency notification systems.',
                  features: ['HIPAA Compliance', 'Patient Call Queues', 'Emergency Alerts']
                },
                {
                  title: 'Real Estate & Field Services',
                  icon: Smartphone,
                  desc: 'Mobile-first solutions that keep your agents connected while they are showing properties across the DFW Metroplex.',
                  features: ['Mobile App Integration', 'Single Number Reach', 'Presence Tracking']
                }
              ].map((industry, index) => (
                <Card key={index} className="p-10 rounded-[2rem] border-none shadow-xl hover:translate-y-[-10px] transition-all duration-300">
                  <div className="mb-8 p-5 bg-blue-50 rounded-2xl inline-block">
                    <industry.icon className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{industry.title}</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">{industry.desc}</p>
                  <ul className="space-y-3">
                    {industry.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

                  {/* Technical Deep Dive */}
          <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-blue-600/5 blur-3xl rounded-full"></div>
                    <ImageWithFallback
                      src={ZULTYS_IP_PHONES_BG}
                      alt="Zultys IP Phones Dallas"
                      className="relative rounded-[2.5rem] shadow-2xl"
                    />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h2 className="text-4xl font-black text-slate-900 mb-8">
                    The Power of Zultys MX Series Technology
                  </h2>
                  <div className="prose prose-lg text-gray-600 max-w-none">
                    <p>
                      At the core of our <strong>Dallas Zultys support</strong> is the MX series IP PBX. This enterprise-grade appliance is designed to provide high-availability communications for organizations of all sizes. Unlike software-only solutions that run on generic servers, the Zultys MX is a purpose-built hardware platform that ensures maximum stability and security.
                    </p>
                    <p>
                      For Dallas businesses, this means you get a system that can handle thousands of concurrent calls without breaking a sweat. The MX series supports a wide range of connectivity options, including SIP trunks, PRI, and analog lines, allowing you to leverage your existing infrastructure while moving toward a modern VoIP future.
                    </p>
                    <p>
                      Combined with Zultys ZIP phones, you get an end-to-end solution where every component is designed to work perfectly with the others. Features like "One-Touch" call handling, integrated presence, and HD audio quality become standard, not expensive add-ons.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Software & Mobility */}
          <section className="py-24 bg-slate-900 text-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl font-black mb-8">Mobility Without Compromise: ZAC & MXmobile</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      The modern Dallas workforce is no longer tethered to a desk. Whether your team is working from a home office in Plano or meeting a client in Downtown Dallas, they need access to their full communication suite. The Zultys Advanced Communicator (ZAC) and MXmobile app provide exactly that.
                    </p>
                    <p>
                      ZAC is a powerful desktop application that turns your computer into a full-featured communication hub. You can manage calls, see the presence status of your colleagues, send instant messages, and launch video conferences with a single click. It integrates seamlessly with Outlook and other CRM tools, boosting productivity across your entire Dallas organization.
                    </p>
                    <p>
                      MXmobile brings that same power to your smartphone. It allows you to make and receive business calls using your office extension, keeping your personal cell number private. It's the ultimate tool for the mobile professional in North Texas, ensuring you never miss a critical call while you're on the move.
                    </p>
                  </div>
                  <div className="mt-12 flex flex-wrap gap-4">
                    <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-2xl border border-white/10">
                      <Smartphone className="h-6 w-6 text-blue-400" />
                      <span className="font-bold">iOS & Android Apps</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-2xl border border-white/10">
                      <Cloud className="h-6 w-6 text-blue-400" />
                      <span className="font-bold">Cloud Sync</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-2xl border border-white/10">
                      <MessageSquare className="h-6 w-6 text-blue-400" />
                      <span className="font-bold">Unified Messaging</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <ImageWithFallback
                    src={ZULTYS_ZAC_MOBILE_COMBO}
                    alt="Zultys ZAC and Mobile App Dallas"
                    className="rounded-[2.5rem] shadow-2xl border border-white/10"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Process */}
          <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                  Our Dallas Implementation Roadmap
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  We've refined our process over 20 years to ensure a seamless transition to your new Zultys system with zero downtime.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: '01', title: 'Discovery', desc: 'We analyze your current call flows and network infrastructure.' },
                  { step: '02', title: 'Design', desc: 'We create a custom Zultys configuration tailored to your goals.' },
                  { step: '03', title: 'Deployment', desc: 'Professional on-site installation by Dallas-based technicians.' },
                  { step: '04', title: 'Training', desc: 'Comprehensive staff training to ensure maximum adoption.' }
                ].map((item, index) => (
                  <div key={index} className="relative p-8 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="text-5xl font-black text-blue-600/10 absolute top-4 right-4">{item.step}</div>
                    <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Local Support & Training */}
          <section className="py-24 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 mb-8">Local Dallas Support: We're Your Neighbors</h2>
                  <div className="prose prose-lg text-gray-600 max-w-none">
                    <p>
                      One of the biggest advantages of choosing DFW Business Communications for your <strong>Dallas Zultys support</strong> is our local presence. When you have a question or an issue, you're not calling a generic support desk in another country. You're calling a team of experts right here in North Texas.
                    </p>
                    <p>
                      We offer on-site support, remote troubleshooting, and proactive system monitoring to ensure your Zultys system is always performing at its best. Our technicians are factory-certified and have deep experience with the entire Zultys product line.
                    </p>
                    <p>
                      Furthermore, we believe that a phone system is only as good as the people using it. That's why we provide comprehensive training for your entire staff. From basic call handling to advanced features like call recording and conferencing, we make sure your Dallas team is comfortable and confident with their new tools.
                    </p>
                  </div>
                  <div className="mt-12 space-y-4">
                    <div className="flex items-center gap-4">
                      <Clock className="h-6 w-6 text-blue-600" />
                      <span className="font-bold text-slate-900">Rapid Response Times for Dallas Businesses</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Headphones className="h-6 w-6 text-blue-600" />
                      <span className="font-bold text-slate-900">24/7 Technical Support Available</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Users className="h-6 w-6 text-blue-600" />
                      <span className="font-bold text-slate-900">On-Site Training & Consultation</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <ImageWithFallback
                    src={SUPPORT_TEAM}
                    alt="Local Dallas Zultys Support Team"
                    className="rounded-[2.5rem] shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Final SEO Content Block */}
          <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="prose prose-lg max-w-none text-gray-600">
                <h2 className="text-3xl font-black text-slate-900 mb-8">Future-Proofing Your Dallas Organization with Zultys</h2>
                <p>
                  The world of business communications is evolving rapidly. From the rise of remote work to the integration of AI and advanced analytics, the tools we use to stay connected are constantly changing. By choosing <strong>Zultys business phones in Dallas</strong>, you are investing in a platform that is built for the future.
                </p>
                <p>
                  Zultys is committed to continuous innovation, regularly releasing updates and new features that keep your system at the cutting edge of technology. Whether it's enhancing security protocols, improving mobile integration, or adding new collaboration tools, your Zultys system will grow and evolve alongside your Dallas business.
                </p>
                <p>
                  At DFW Business Communications, we are proud to be your partner in this journey. We help you navigate the ever-changing landscape of telecommunications, ensuring you always have the tools you need to succeed in the competitive Dallas market. From small business startups to established enterprise organizations, we provide the expertise and support that North Texas businesses demand.
                </p>
                <p>
                  Experience the difference that a truly unified, enterprise-grade communication system can make for your Dallas organization. Contact us today to schedule a free consultation and see why Zultys is the #1 choice for business phones in the Dallas-Fort Worth area.
                </p>
              </div>
            </div>
          </section>
        
        {/* Final CTA */}
        <section className="py-24 bg-blue-600 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Ready to Transform Your Dallas Communications?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto font-medium">
              Don't settle for "good enough." Get the enterprise-grade Zultys system your Dallas business deserves with local DFW support.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={openQuote}
                className="bg-zultys-gold hover:bg-zultys-gold/90 text-slate-950 font-black px-12 py-8 text-xl shadow-2xl rounded-xl border-none hover:scale-[1.02] active:scale-95 transition-all"
              >
                Request a Free Dallas Quote
              </Button>
              <Button
                asChild
                className="bg-zultys-green hover:bg-zultys-green/90 text-white font-black px-12 py-8 text-xl rounded-xl border-none shadow-2xl shadow-zultys-green/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <a href="tel:8172312962" className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-white animate-pulse" />
                  Call 817-231-2962
                </a>
              </Button>
            </div>
            <p className="mt-10 text-lg font-bold opacity-80 uppercase tracking-widest">
              Authorized Zultys Partner serving the entire Dallas Metroplex
            </p>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
