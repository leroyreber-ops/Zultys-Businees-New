import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Clock, 
  Building2,
  Phone,
  Mail,
  MapPin,
  Headphones
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useSEO } from '../hooks/useSEO';
import {
  HERO_BACKGROUND,
  SUPPORT_TEAM,
  OFFICE_COMMUNICATION,
  ZULTYS_FORT_WORTH_BG,
} from '../constants/images';

export function About() {
  const { openQuote } = useQuote();

  useSEO({
    title: 'About Us | DFW Business Communications | Zultys Fort Worth & Dallas',
    description: 'Learn about DFW Business Communications, your premier Zultys dealer in Fort Worth and Dallas. Over 15 years of experience in DFW business phone systems.',
    keywords: 'Zultys dealer Dallas, business phone provider Fort Worth, DFW communications company, phone system experts Texas, unified communications provider Dallas',
    canonicalUrl: 'https://dallasfortworthzultys.com/about',
    ogTitle: 'About Us | DFW Business Communications | Zultys Fort Worth & Dallas',
    ogDescription: 'Learn about DFW Business Communications, your premier Zultys dealer in Fort Worth and Dallas. Over 15 years of experience in DFW business phone systems.',
  });

  const stats = [
    { label: 'Years Experience', value: '15+', icon: Clock },
    { label: 'Satisfied Clients', value: '500+', icon: Users },
    { label: 'Zultys Certifications', value: 'All', icon: Award },
    { label: 'Local Support', value: '24/7', icon: Shield },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - SaaS Style */}
        <section className="relative bg-white pt-24 pb-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            <img 
              src={HERO_BACKGROUND}
              alt="Background Pattern"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-zultys-green/10 px-4 py-2 rounded-full mb-8 border border-zultys-green/20">
                <Users className="h-5 w-5 text-zultys-green" />
                <span className="text-sm font-bold text-zultys-green uppercase tracking-wider">Your Local Zultys Experts</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight text-charcoal tracking-tight">
                Dedicated to <br />
                <span className="text-zultys-green">Your Success.</span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-12 text-gray-600 leading-relaxed max-w-3xl mx-auto">
                DFW Business Communications provides world-class communication solutions with the personal touch of a local Fort Worth partner.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  onClick={openQuote}
                  className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-8 shadow-2xl hover:shadow-zultys-green/20 transition-all font-bold"
                >
                  Work With Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-charcoal/10 bg-white text-charcoal hover:bg-gray-50 text-xl px-10 py-8 font-bold"
                  onClick={() => {
                    const el = document.getElementById('story');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Our Story
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section - SaaS Style */}
        <section id="story" className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-block bg-zultys-gold/10 text-zultys-gold px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Our Legacy
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Over 15 Years of <br />
                  <span className="text-zultys-green">Communication Excellence.</span>
                </h2>
                <div className="prose prose-lg text-gray-600 prose-headings:text-charcoal prose-headings:font-black prose-strong:text-charcoal max-w-none">
                  <p className="text-xl leading-relaxed mb-8">
                    Founded with a vision to simplify business communications, DFW Business Communications has grown into the premier <strong>Zultys Dallas Fort Worth dealer</strong> and authorized service provider. For over 15 years, we have helped companies of all sizes—from small Fort Worth startups to large Dallas enterprises—navigate the evolving landscape of telecommunications.
                  </p>
                  <p className="leading-relaxed mb-6">
                    We believe that technology should empower people, not frustrate them. That's why we chose to partner with Zultys. Their "all-in-one" philosophy aligns perfectly with our commitment to delivering reliable, easy-to-use, and feature-rich communication platforms. As your local <strong>Zultys phone system DFW</strong> experts, we provide the deep technical knowledge and personalized service that national providers simply can't match.
                  </p>
                </div>

                <div className="mt-12 space-y-8">
                  <div className="flex gap-6 group">
                    <div className="flex-shrink-0 p-4 bg-gray-50 rounded-2xl group-hover:bg-zultys-green/10 transition-colors">
                      <Building2 className="h-8 w-8 text-charcoal group-hover:text-zultys-green transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-charcoal mb-2">Local Partnership</h3>
                      <p className="text-gray-600 leading-relaxed">We don't just see ourselves as a vendor; we are a strategic partner in your DFW business's growth.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 group">
                    <div className="flex-shrink-0 p-4 bg-gray-50 rounded-2xl group-hover:bg-zultys-green/10 transition-colors">
                      <Shield className="h-8 w-8 text-charcoal group-hover:text-zultys-green transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-charcoal mb-2">Community Commitment</h3>
                      <p className="text-gray-600 leading-relaxed">We are proud to be a part of the vibrant North Texas economy, helping local organizations thrive.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={SUPPORT_TEAM}
                    alt="DFW Business Communications Support Team"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/90 to-transparent p-10 text-white">
                    <p className="text-2xl font-black mb-2">Local Support Team</p>
                    <p className="text-gray-300 font-bold">Based right here in Fort Worth, TX.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - SaaS Style */}
        <section className="py-32 bg-charcoal text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src={ZULTYS_FORT_WORTH_BG} alt="About DFW Business Communications - Experienced Zultys dealer in Fort Worth and Dallas, Texas" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex p-5 bg-white/5 rounded-2xl mb-8 group-hover:bg-zultys-green/20 transition-all duration-500 group-hover:-translate-y-2">
                    <stat.icon className="h-10 w-10 text-zultys-green" />
                  </div>
                  <div className="text-6xl font-black mb-3 tracking-tight text-white">{stat.value}</div>
                  <div className="text-gray-300 font-black uppercase tracking-widest text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
                Our Core <span className="text-zultys-green">Values.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The principles that guide every interaction and every solution we deliver to our North Texas clients.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'Integrity',
                  description: 'We believe in honest advice and transparent pricing. We only recommend Zultys solutions that truly benefit your DFW business.',
                  icon: Shield,
                },
                {
                  title: 'Expertise',
                  description: 'Our team stays at the forefront of Zultys technology through continuous training and certification in Fort Worth.',
                  icon: Award,
                },
                {
                  title: 'Service',
                  description: 'Local support is not just a promise; it\'s our identity. We are here when you need us, 24/7, across the DFW metroplex.',
                  icon: Headphones,
                },
              ].map((value, index) => (
                <Card key={index} className="p-10 border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] transition-all duration-500 group rounded-[2rem]">
                  <div className="p-5 bg-charcoal rounded-2xl w-fit mb-8 group-hover:bg-zultys-green transition-colors duration-500">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-charcoal mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info Section - SaaS Style */}
        <section className="py-32 bg-gray-50/50 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-gold/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback alt="DFW Business Communications Office"
                    src={OFFICE_COMMUNICATION}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-12 leading-tight">
                  Visit Our <br />
                  <span className="text-zultys-gold">Fort Worth Office.</span>
                </h2>
                <div className="space-y-12">
                  <div className="flex items-start gap-8 group">
                    <div className="p-5 bg-charcoal rounded-2xl group-hover:bg-zultys-green transition-colors duration-500 shadow-lg">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-charcoal text-2xl mb-2">Address</h4>
                      <p className="text-gray-600 text-xl leading-relaxed">2203 8th Ave.<br />Fort Worth, TX 76110</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8 group">
                    <div className="p-5 bg-charcoal rounded-2xl group-hover:bg-zultys-green transition-colors duration-500 shadow-lg">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-charcoal text-2xl mb-2">Phone</h4>
                      <p className="text-gray-600 text-xl leading-relaxed">817-231-2962</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8 group">
                    <div className="p-5 bg-charcoal rounded-2xl group-hover:bg-zultys-green transition-colors duration-500 shadow-lg">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-charcoal text-2xl mb-2">Email</h4>
                      <p className="text-gray-600 text-xl leading-relaxed">info@dallasfortworthzultys.com</p>
                    </div>
                  </div>
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
