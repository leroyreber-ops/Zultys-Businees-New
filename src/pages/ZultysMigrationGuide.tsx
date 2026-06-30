import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  RefreshCw, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Phone, 
  ClipboardCheck,
  Network,
  Settings,
  Search
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function ZultysMigrationGuide() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Zultys Migration Guide | Moving to Modern VoIP in DFW | DFW Business Communications';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Our comprehensive guide to migrating from a legacy PBX to a modern Zultys VoIP system. Learn our step-by-step process for a seamless transition for your DFW business.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-migration-guide-dfw');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Migrate to Zultys VoIP',
      description: 'A step-by-step guide for businesses migrating from legacy phone systems to Zultys.',
      step: [
        { '@type': 'HowToStep', name: 'Site Audit', text: 'Assess current infrastructure and network readiness.' },
        { '@type': 'HowToStep', name: 'System Design', text: 'Create a custom communication workflow.' },
        { '@type': 'HowToStep', name: 'Configuration', text: 'Pre-configure hardware and software for a smooth cutover.' },
        { '@type': 'HowToStep', name: 'Installation', text: 'On-site deployment and testing.' },
        { '@type': 'HowToStep', name: 'Training', text: 'Comprehensive staff and admin training.' }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 opacity-20">
            <img src={HERO_BACKGROUND} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-zultys-green/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-zultys-green/30">
              <RefreshCw className="h-5 w-5 text-zultys-green" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Migration Strategy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              The Zultys Migration Guide: <br />
              <span className="text-zultys-green">A Seamless Path to Modern VoIP for DFW Businesses.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Migrating to a new business phone system can be a daunting task, but with the right 
              strategy, it's a powerful opportunity to modernize your Dallas-Fort Worth 
              organization. This comprehensive Zultys migration guide outlines our proven, 
              step-by-step process for transitioning from legacy PBX hardware to a modern 
              unified communications platform. Learn how we ensure zero downtime, preserve 
              your existing phone numbers, and empower your DFW team with advanced 
              collaboration tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Schedule Your Migration Audit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 text-xl px-10 py-8 font-black rounded-xl backdrop-blur-md"
                asChild
              >
                <a href="tel:817-231-2962">Call 817-231-2962</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Migration Steps Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Our 5-Step Migration Process</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">We've refined our process over 20 years to ensure that your DFW business stays connected throughout the entire transition.</p>
            </div>
            <div className="grid md:grid-cols-5 gap-8">
              {[
                { step: '01', title: 'Site Audit', desc: 'We assess your current network, wiring, and internet bandwidth to ensure it can handle high-quality VoIP traffic.', icon: Search },
                { step: '02', title: 'System Design', desc: 'We map your current call flows and design a custom Zultys workflow that improves efficiency and customer experience.', icon: Settings },
                { step: '03', title: 'Pre-Config', desc: 'We pre-configure all hardware and software in our lab, ensuring that everything is ready for a "plug-and-play" installation.', icon: Zap },
                { step: '04', title: 'Installation', desc: 'Our factory-certified technicians perform the on-site installation, testing every extension and feature for perfection.', icon: Network },
                { step: '05', title: 'Training', desc: 'We provide comprehensive on-site training for your staff and administrators, ensuring everyone is comfortable with the new system.', icon: Users }
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-4xl font-black text-slate-100 group-hover:text-zultys-green/20 transition-colors">{item.step}</span>
                    <div className="p-3 bg-zultys-green/10 rounded-xl group-hover:bg-zultys-green group-hover:text-white transition-colors duration-500">
                      <item.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Local Section */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">The Advantage of a Local Migration Partner</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    National hosted providers often ship you a box of phones and leave the installation and network configuration to you. This is where most VoIP migrations fail.
                  </p>
                  <p>
                    By choosing <strong>DFW Business Communications</strong>, you have a local partner who is on-site for the entire process. We handle the technical heavy lifting, coordinate with your ISP, and ensure that your new Zultys system is optimized for your local network environment.
                  </p>
                  <ul className="space-y-4 mt-8">
                    {[
                      'On-site installation and testing',
                      'Direct coordination with local DFW ISPs',
                      'Face-to-face training for your entire staff',
                      'Rapid on-site response for post-migration support',
                      'Customized call flows designed for your business'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                        <CheckCircle className="h-6 w-6 text-zultys-green flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="Zultys VoIP Migration Process"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="mt-24 max-w-4xl mx-auto prose prose-lg text-slate-700">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Deep Dive: Ensuring a Successful VoIP Migration</h2>
              <p>
                A successful migration to Zultys involves more than just plugging in new phones. It requires a holistic approach to your DFW business's communication infrastructure.
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Network Readiness and Optimization</h3>
              <p>
                The foundation of high-quality VoIP is a robust network. During our site audit, we look for potential bottlenecks in your local area network (LAN) and evaluate your wide area network (WAN) connections. We often implement Quality of Service (QoS) protocols to prioritize voice traffic over data, ensuring crystal-clear calls even during peak usage hours in your Dallas or Fort Worth office.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Number Porting and Continuity</h3>
              <p>
                One of the biggest concerns for DFW businesses is losing their established phone numbers. We manage the entire number porting process, coordinating with your current carrier to ensure a seamless transition. We also set up temporary call forwarding during the cutover period to guarantee that you never miss a customer call.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Custom Workflow Design</h3>
              <p>
                A migration is the perfect time to re-evaluate how your business handles calls. We work with your team to design custom auto-attendants, ring groups, and call queues that reflect your current business needs. Whether you need a complex multi-level IVR or a simple hunt group for your Plano office, we ensure the system is built to your exact specifications.
              </p>

              <div className="mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-3xl font-black text-slate-900 mb-8">Zultys Migration FAQs</h2>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Will my business experience downtime during the migration?</h4>
                    <p className="text-slate-600">Our goal is zero downtime. We pre-configure and test the new system alongside your existing one, performing the final cutover during off-peak hours to ensure a seamless transition for your DFW business.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Can I keep my existing analog devices (fax machines, paging)?</h4>
                    <p className="text-slate-600">Yes! Zultys supports a variety of analog adapters (ATAs) and gateways that allow you to integrate legacy devices into your new VoIP environment without expensive hardware replacements.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Do you provide training for my staff?</h4>
                    <p className="text-slate-600">Absolutely. We provide comprehensive on-site training for both end-users and system administrators in Dallas and Fort Worth, ensuring everyone is comfortable and productive with the new Zultys system from day one.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Linking Section */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Prepare for Your Migration</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/free-voip-site-audit" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <ClipboardCheck className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">Free Site Audit</h3>
                  <p className="text-slate-600">The first step in any successful migration is a thorough network audit.</p>
                </Card>
              </Link>
              <Link to="/zultys-vs-avaya" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <RefreshCw className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">Zultys vs. Avaya</h3>
                  <p className="text-slate-600">See why migrating from Avaya to Zultys is a smart business move.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Search className="h-10 w-10 text-zultys-green mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-zultys-green transition-colors">Migration FAQ</h3>
                  <p className="text-slate-600">Get answers to common questions about the migration process.</p>
                </Card>
              </Link>
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
