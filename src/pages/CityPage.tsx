import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { ArrowRight, Zap, MapPin, CheckCircle, Shield, Headphones, Clock } from 'lucide-react';
import { Hero } from '../components/Hero';
import { CTASection } from '../components/CTASection';
import { ServiceAreas } from '../components/ServiceAreas';
import { Comparison } from '../components/Comparison';
import { useQuote } from '../context/QuoteContext';
import { generateEliteMetadata } from '../utils/seoHelpers';

interface CityPageProps {
  city: string;
}

export function CityPage({ city }: CityPageProps) {
  const { openQuote } = useQuote();

  useEffect(() => {
    const meta = generateEliteMetadata(window.location.pathname);
    document.title = meta.title;
    window.scrollTo(0, 0);
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', meta.description);
    }
  }, [city]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero
          title={<>Zultys Business Phone Systems in <span className="text-zultys-green">{city}.</span></>}
          subtitle={`Expert Zultys VoIP solutions, cloud phone systems, and unified communications tailored for businesses in ${city}, Texas.`}
          icon={MapPin}
          iconLabel={`${city} Business Communications`}
          buttonText="Get a Free Quote"
          onButtonClick={openQuote}
        />

        {/* Local Benefits Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">
                  The Preferred Zultys Partner for <span className="text-zultys-green">{city}</span> Businesses
                </h2>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  In {city}, business moves fast. You need a communication system that is reliable, scalable, and backed by local experts who can be on-site when you need them.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Local DFW Support', desc: 'We are just a short drive from your office, providing on-site installation and training.' },
                    { title: 'Customized for North Texas', desc: 'Our solutions are designed to handle the specific needs of the DFW business climate.' },
                    { title: 'Zero Downtime Migration', desc: 'We handle the porting of your existing numbers with precision and care.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 bg-zultys-green/10 p-1 rounded-full h-fit">
                        <CheckCircle className="h-6 w-6 text-zultys-green" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { icon: Shield, title: 'Secure', label: 'Enterprise Grade' },
                    { icon: Zap, title: 'Fast', label: 'Gigabit Ready' },
                    { icon: Headphones, title: 'Support', label: '24/7 Local' },
                    { icon: Clock, title: 'Uptime', label: '99.99% SLA' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="bg-white p-4 rounded-2xl shadow-sm w-fit mx-auto mb-4">
                        <stat.icon className="h-8 w-8 text-zultys-green" />
                      </div>
                      <div className="text-2xl font-black text-slate-900">{stat.title}</div>
                      <div className="text-sm font-bold text-zultys-green uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Comparison />
        
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-12">Comprehensive Communications for {city}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-4">Cloud Solutions</h3>
                <p className="text-slate-600 mb-6">Perfect for remote teams and multi-location businesses in {city}.</p>
                <Button variant="link" className="text-zultys-green font-bold p-0">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-4">On-Premise Systems</h3>
                <p className="text-slate-600 mb-6">Maximum control and security with a dedicated Zultys appliance.</p>
                <Button variant="link" className="text-zultys-green font-bold p-0">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-4">Unified Apps</h3>
                <p className="text-slate-600 mb-6">ZAC and MXmobile keep your {city} team connected anywhere.</p>
                <Button variant="link" className="text-zultys-green font-bold p-0">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </section>

        <ServiceAreas />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
