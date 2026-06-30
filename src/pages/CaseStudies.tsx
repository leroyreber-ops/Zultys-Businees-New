import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Trophy, 
  CheckCircle, 
  ArrowRight, 
  Building2, 
  Stethoscope, 
  Users, 
  Zap, 
  Shield, 
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Scale
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

const successStories = [
  {
    industry: 'Healthcare',
    title: 'Multi-Location Medical Clinic in Fort Worth',
    challenge: 'Fragmented communication across 4 clinics led to missed patient calls and inefficient staff coordination.',
    solution: 'Implemented a centralized Zultys MX250 system with MXmobile for all doctors and staff.',
    result: '30% reduction in missed calls and seamless HIPAA-compliant communication between locations.',
    icon: Stethoscope
  },
  {
    industry: 'Legal',
    title: 'Prominent Dallas Law Firm',
    challenge: 'Outdated PBX system lacked remote work capabilities and professional call handling for high-profile clients.',
    solution: 'Deployed Zultys Cloud Services with ZAC (Zultys Advanced Communicator) for all attorneys.',
    result: 'Attorneys can now handle client calls from anywhere while maintaining a professional office presence.',
    icon: Scale
  },
  {
    industry: 'Manufacturing',
    title: 'Arlington Industrial Facility',
    challenge: 'Harsh environment and large campus made traditional paging and communication difficult.',
    solution: 'Hybrid Zultys deployment with ruggedized SIP endpoints and campus-wide paging integration.',
    result: 'Improved safety and coordination across the 100,000 sq. ft. facility.',
    icon: Building2
  },
  {
    industry: 'Education',
    title: 'Private School in Plano',
    challenge: 'Needed a secure, reliable communication system for campus safety and parent-teacher coordination.',
    solution: 'Zultys MX-SE system with emergency notification features and classroom paging.',
    result: 'Enhanced campus security and streamlined administrative communications.',
    icon: GraduationCap
  }
];

export function CaseStudies() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Zultys Case Studies & Success Stories | Dallas Fort Worth | DFW Business Communications';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Read how Dallas-Fort Worth businesses across healthcare, legal, and manufacturing industries have transformed their communications with Zultys solutions.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/case-studies');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys Case Studies and Success Stories',
      description: 'Real-world examples of Zultys business phone system implementations in the DFW area.',
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 opacity-20">
            <img src={HERO_BACKGROUND} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-zultys-green/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-zultys-green/30">
              <Trophy className="h-5 w-5 text-zultys-green" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Proven Results</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys Success Stories: <br />
              <span className="text-zultys-green">Real Results in DFW.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover how North Texas organizations are using Zultys to 
              improve efficiency, reduce costs, and deliver better service 
              to their customers and patients.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Start Your Success Story
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

        {/* Case Studies Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {successStories.map((story, i) => (
                <Card key={i} className="overflow-hidden border-slate-100 hover:shadow-2xl transition-all duration-500 group">
                  <div className="p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-zultys-green/10 rounded-xl">
                        <story.icon className="h-8 w-8 text-zultys-green" />
                      </div>
                      <div>
                        <span className="text-sm font-black text-zultys-green uppercase tracking-widest">{story.industry}</span>
                        <h3 className="text-2xl font-black text-slate-900">{story.title}</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">The Challenge</h4>
                        <p className="text-slate-600 leading-relaxed">{story.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">The Solution</h4>
                        <p className="text-slate-600 leading-relaxed">{story.solution}</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-sm font-black text-zultys-green uppercase tracking-widest mb-2">The Result</h4>
                        <p className="text-slate-900 font-bold leading-relaxed">{story.result}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions Links */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Explore Solutions for Your Industry</h2>
            <p className="text-xl text-slate-600 mb-12">See how we tailor Zultys for your specific business sector.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Healthcare', path: '/fort-worth-zultys-healthcare', icon: Stethoscope },
                { name: 'Real Estate', path: '/fort-worth-zultys-real-estate', icon: Briefcase },
                { name: 'Legal', path: '/fort-worth-zultys-professional-services', icon: Scale },
                { name: 'Education', path: '/fort-worth-zultys-education', icon: GraduationCap }
              ].map((item, i) => (
                <Link key={i} to={item.path} className="group">
                  <Card className="p-8 hover:bg-white hover:shadow-xl transition-all border-slate-100 h-full flex flex-col items-center">
                    <item.icon className="h-10 w-10 text-zultys-green mb-4 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-slate-900 group-hover:text-zultys-green transition-colors">{item.name}</span>
                  </Card>
                </Link>
              ))}
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
