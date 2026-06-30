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
  Award, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  Trophy, 
  Star,
  BadgeCheck,
  Medal
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, ZULTYS_LOGO } from '../constants/images';

export function CertificationsAwards() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Certifications & Awards | Authorized Zultys Partner DFW | DFW Business Communications';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'DFW Business Communications is an authorized, factory-certified Zultys partner. Explore our certifications and commitment to excellence in business communications.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/certifications-awards');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Certifications and Awards - DFW Business Communications',
      description: 'A list of professional certifications and industry awards held by DFW Business Communications.',
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
              <span className="text-sm font-bold text-white uppercase tracking-widest">Excellence in Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Certified Expertise. <br />
              <span className="text-zultys-green">Proven Excellence.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              As an Authorized Zultys Partner, we maintain the highest standards of technical 
              proficiency and customer service in the Dallas-Fort Worth area.
            </p>
          </div>
        </section>

        {/* Certifications Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Our Professional Certifications</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">We invest heavily in ongoing training to ensure our DFW team is always at the forefront of Zultys technology.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'Authorized Zultys Partner',
                  desc: 'Directly authorized by Zultys to sell, install, and support their entire product line in North Texas.',
                  icon: BadgeCheck
                },
                {
                  title: 'Factory Certified Technicians',
                  desc: 'Our technical team has completed rigorous training at Zultys headquarters on all MX series and cloud platforms.',
                  icon: ShieldCheck
                },
                {
                  title: 'Unified Communications Expert',
                  desc: 'Specialized certification in integrating voice, video, and chat into complex business workflows.',
                  icon: Zap
                },
                {
                  title: 'Advanced Contact Center Certified',
                  desc: 'Expertise in deploying and optimizing high-volume Zultys contact center solutions.',
                  icon: Users
                },
                {
                  title: 'Network Infrastructure Specialist',
                  desc: 'Certified in optimizing local networks and firewalls for high-performance VoIP traffic.',
                  icon: Award
                },
                {
                  title: 'Zultys Cloud Specialist',
                  desc: 'Advanced training in deploying and managing Zultys hosted and hybrid cloud environments.',
                  icon: Star
                }
              ].map((cert, i) => (
                <Card key={i} className="p-10 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col items-center text-center">
                  <div className="p-4 bg-zultys-green/10 rounded-2xl mb-6">
                    <cert.icon className="h-10 w-10 text-zultys-green" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{cert.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{cert.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment to Quality */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why Our Certifications Matter to Your DFW Business</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    Choosing a certified partner isn't just about a badge on a website; it's about the security and reliability of your business communications.
                  </p>
                  <ul className="space-y-4 mt-8">
                    {[
                      'Direct access to Zultys tier-3 engineering support',
                      'Guaranteed genuine Zultys hardware and software',
                      'Expert installation that follows factory best practices',
                      'Ongoing system optimization and security updates',
                      'Peace of mind knowing your system is in expert hands'
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
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 bg-white p-12 flex flex-col items-center justify-center text-center">
                  <Medal className="h-24 w-24 text-zultys-green mb-8" />
                  <h3 className="text-3xl font-black text-slate-900 mb-4">Authorized Zultys Partner</h3>
                  <p className="text-slate-500 font-bold uppercase tracking-widest">Serving Dallas-Fort Worth Since 2004</p>
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
