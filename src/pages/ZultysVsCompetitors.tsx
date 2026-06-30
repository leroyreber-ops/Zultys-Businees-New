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
  BarChart3, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  Phone, 
  MessageSquare, 
  Globe, 
  Cloud,
  Scale,
  Building2,
  Trophy,
  Activity
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function ZultysVsCompetitors() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys vs. The Competition | Compare Business Phone Systems DFW';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Compare Zultys against RingCentral, 8x8, Microsoft Teams, and more. Discover why DFW businesses choose Zultys for better reliability and lower total cost of ownership.';
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
    metaKeywords.setAttribute('content', 'business phone system comparison DFW, Zultys vs competitors, VoIP provider comparison Dallas, best business phone system Fort Worth, unified communications comparison North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-vs-competitors');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys vs. Competitors Comparison Hub',
      description: 'A central hub for comparing Zultys business phone systems against major competitors in the DFW area.',
      publisher: {
        '@type': 'Organization',
        name: 'DFW Business Communications'
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  const competitors = [
    { name: 'RingCentral', path: '/zultys-vs-ringcentral', icon: Cloud, desc: 'Why Zultys offers better local support and lower TCO than the cloud giant.' },
    { name: '8x8', path: '/zultys-vs-8x8', icon: BarChart3, desc: 'Comparing call quality and feature sets for DFW enterprises.' },
    { name: 'Microsoft Teams', path: '/zultys-vs-microsoft-teams', icon: MessageSquare, desc: 'Why a dedicated VoIP system beats a generic collaboration tool.' },
    { name: 'Vonage', path: '/zultys-vs-vonage', icon: Phone, desc: 'Comparing reliability and customer service for North Texas businesses.' },
    { name: 'Avaya', path: '/zultys-vs-avaya', icon: Building2, desc: 'The modern alternative to legacy Avaya hardware.' },
    { name: 'Cisco Webex', path: '/zultys-vs-cisco-webex', icon: Shield, desc: 'Why Zultys is the more agile and cost-effective choice.' },
    { name: 'Mitel', path: '/zultys-vs-mitel', icon: Zap, desc: 'Upgrade your legacy Mitel system to a modern Zultys platform.' },
    { name: 'Zoom Phone', path: '/zultys-vs-zoom-phone', icon: Activity, desc: 'Comparing enterprise-grade VoIP features against a video-first app.' },
    { name: 'GoToConnect', path: '/zultys-vs-gotoconnect', icon: Globe, desc: 'Why local DFW support makes the difference for your office.' },
    { name: 'Nextiva', path: '/zultys-vs-nextiva', icon: Trophy, desc: 'Comparing the "all-in-one" Zultys architecture against Nextiva.' },
    { name: 'Dialpad', path: '/zultys-vs-dialpad', icon: Activity, desc: 'Why Zultys offers more robust features for professional firms.' },
    { name: 'Ooma Office', path: '/zultys-vs-ooma-office', icon: Phone, desc: 'Why Zultys is the better choice for growing DFW businesses.' },
    { name: 'Comcast Business', path: '/zultys-vs-comcast-business', icon: Zap, desc: 'Why you should separate your phones from your cable provider.' },
    { name: 'Spectrum Business', path: '/zultys-vs-spectrum-business', icon: Globe, desc: 'The advantages of a dedicated VoIP partner over a generic ISP.' },
    { name: 'AT&T Business', path: '/zultys-vs-att-business', icon: Phone, desc: 'Why DFW businesses are moving away from the "Big Three" carriers.' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 opacity-10">
            <img src={HERO_BACKGROUND} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-8">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-blue-100 uppercase tracking-widest">The Ultimate Comparison Hub</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys vs. The Competition: <br />
              <span className="text-blue-500">The Ultimate DFW VoIP Comparison Guide.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Choosing the right business phone system for your Dallas-Fort Worth organization 
              requires a deep understanding of how Zultys stacks up against major competitors 
              like RingCentral, 8x8, Microsoft Teams, and legacy providers. This comprehensive 
              comparison hub provides detailed, head-to-head breakdowns to help you evaluate 
              reliability, features, local support, and total cost of ownership. Discover why 
              DFW businesses that prioritize telephony-first platforms consistently choose 
              Zultys over generic cloud or legacy hardware solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-12 py-8 font-black rounded-2xl shadow-xl transition-all hover:scale-105"
              >
                Get a Free Site Audit
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 text-xl px-12 py-8 font-black rounded-2xl border border-white/20"
                asChild
              >
                <a href="tel:817-231-2962">Call 817-231-2962</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Competitor Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Choose Your Comparison</h2>
              <p className="text-xl text-slate-600">Select a competitor to see a detailed head-to-head breakdown.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {competitors.map((comp, i) => (
                <Link key={i} to={comp.path} className="group">
                  <Card className="p-8 border-slate-100 hover:border-blue-500 hover:shadow-2xl transition-all h-full flex flex-col">
                    <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                      <comp.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Zultys vs. {comp.name}</h3>
                    <p className="text-slate-600 mb-6 flex-1">{comp.desc}</p>
                    <div className="flex items-center text-blue-600 font-bold">
                      View Comparison
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Zultys Wins Section */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why Zultys Consistently Wins in DFW</h2>
                <div className="space-y-8">
                  {[
                    { title: 'Local DFW Support', desc: 'National providers can\'t send a technician to your office in 2 hours. We can.' },
                    { title: 'Lower Total Cost', desc: 'No hidden "per-feature" fees. Most enterprise features are included in the core license.' },
                    { title: 'Deployment Choice', desc: 'Cloud, On-Premise, or Hybrid. We give you the choice that fits your business.' },
                    { title: 'Superior Reliability', desc: 'Built-in redundancy and 99.999% uptime guarantee for critical care.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                        <CheckCircle className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-600/5 rounded-[3rem] blur-3xl"></div>
                <ImageWithFallback
                  src={OFFICE_COMMUNICATION}
                  alt="Zultys vs Competitors"
                  className="relative rounded-[2.5rem] shadow-2xl border border-slate-100"
                />
              </div>
            </div>

            <div className="mt-24 max-w-4xl mx-auto prose prose-lg text-slate-700">
              <h2 className="text-3xl font-black text-slate-900 mb-8">How to Evaluate Your Next DFW Phone System</h2>
              <p>
                When comparing <strong>Zultys vs. the competition</strong>, it's important to look beyond the marketing slogans. Dallas-Fort Worth businesses have unique needs, from local survivability during North Texas storms to the requirement for on-site training and support.
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Telephony-First vs. Software-First</h3>
              <p>
                Many modern competitors (like Microsoft Teams or Zoom) are software companies that added voice as an afterthought. Zultys is a telephony company that built a modern software platform. This "telephony-first" approach means that critical features like call handling, queuing, and emergency routing are more robust and reliable in Zultys.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Importance of Deployment Flexibility</h3>
              <p>
                Most major competitors (RingCentral, 8x8, Nextiva) are "Cloud Only." If your internet fails in Plano or Arlington, your business stops. Zultys offers <strong>Cloud, On-Premise, and Hybrid</strong> options, giving you the flexibility to choose the deployment that best fits your risk profile and infrastructure.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Local DFW Support: The Ultimate Tie-Breaker</h3>
              <p>
                At <strong>DFW Business Communications</strong>, we believe that your phone system is only as good as the team supporting it. When you choose Zultys through us, you're getting a local partner who can be at your office the same day to troubleshoot issues, provide training, or assist with a complex migration.
              </p>
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
