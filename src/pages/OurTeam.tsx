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
  Users, 
  CheckCircle, 
  ArrowRight, 
  Mail, 
  Linkedin, 
  Phone, 
  Award,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND } from '../constants/images';

const teamMembers = [
  {
    name: 'Leroy Reber',
    role: 'President & Senior Communications Consultant',
    bio: 'With over 20 years of experience in the telecommunications industry, Leroy leads our team in delivering world-class Zultys solutions to businesses across the Dallas-Fort Worth metroplex.',
    image: 'https://picsum.photos/seed/leroy/400/400',
    linkedin: '#'
  },
  {
    name: 'Technical Support Team',
    role: 'Certified Zultys Technicians',
    bio: 'Our local Fort Worth-based support team consists of factory-certified Zultys experts ready to assist with installation, configuration, and 24/7 emergency support.',
    image: 'https://picsum.photos/seed/techteam/400/400',
    linkedin: '#'
  }
];

export function OurTeam() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Our Team | Zultys Experts in Dallas Fort Worth | DFW Business Communications';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Meet the experts behind DFW Business Communications. Our local Fort Worth-based team of certified Zultys consultants and technicians is dedicated to your success.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/our-team');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Our Team - DFW Business Communications',
      description: 'Profiles of the leadership and technical team at DFW Business Communications.',
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
              <Users className="h-5 w-5 text-zultys-green" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Meet the Experts</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Local DFW Experts, <br />
              <span className="text-zultys-green">Global Technology.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              We aren't just a faceless national provider. We are your North Texas neighbors, 
              dedicated to providing the best Zultys support and service in the industry.
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {teamMembers.map((member, i) => (
                <Card key={i} className="overflow-hidden border-slate-100 hover:shadow-2xl transition-all duration-500 group rounded-[2.5rem]">
                  <div className="aspect-square relative overflow-hidden">
                    <ImageWithFallback 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <a href={member.linkedin} className="bg-white/20 backdrop-blur-md p-3 rounded-xl hover:bg-zultys-green transition-colors">
                        <Linkedin className="h-6 w-6 text-white" />
                      </a>
                    </div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-3xl font-black text-slate-900 mb-2">{member.name}</h3>
                    <p className="text-zultys-green font-bold uppercase tracking-widest text-sm mb-6">{member.role}</p>
                    <p className="text-slate-600 leading-relaxed text-lg">{member.bio}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Local Section */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">The Advantage of Local DFW Expertise</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    When you choose DFW Business Communications, you're partnering with a team that understands the unique challenges of the North Texas business environment.
                  </p>
                  <ul className="space-y-4 mt-8">
                    {[
                      'On-site installation and face-to-face training',
                      'Rapid response times for Dallas and Fort Worth offices',
                      'Deep knowledge of local DFW internet service providers',
                      'Factory-certified Zultys technical expertise',
                      'Personalized service from a dedicated account manager'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                        <CheckCircle className="h-6 w-6 text-zultys-green flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Award, title: 'Certified Experts', desc: 'Zultys Factory Trained' },
                  { icon: ShieldCheck, title: 'Local Support', desc: 'Based in Fort Worth' },
                  { icon: UserCheck, title: 'Proven Track Record', desc: '20+ Years Experience' },
                  { icon: Phone, title: '24/7 Response', desc: 'Emergency Support' }
                ].map((item, i) => (
                  <Card key={i} className="p-8 border-slate-100 flex flex-col items-center text-center bg-white">
                    <item.icon className="h-10 w-10 text-zultys-green mb-4" />
                    <h4 className="font-black text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </Card>
                ))}
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
