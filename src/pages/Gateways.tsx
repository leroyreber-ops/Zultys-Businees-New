import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Server, 
  Zap, 
  CheckCircle, 
  Shield, 
  Cpu,
  Smartphone,
  Users,
  Network
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ZULTYS_GATEWAYS } from '../constants/images';
import { useQuote } from '../context/QuoteContext';

export function Gateways() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Zultys Gateways FXS/FXO | DFW Business Communications';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Zultys Gateways provide seamless integration between legacy analog lines and your modern VoIP system. FXS and FXO solutions for DFW businesses.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Zultys <span className="text-zultys-green">Gateways</span> <br />FXS/FXO Solutions.</>}
          subtitle="Bridge the gap between analog and digital. Zultys Gateways ensure your legacy equipment works perfectly with your modern DFW VoIP system."
          icon={Network}
          iconLabel="Voice Gateways"
          buttonText="Request a Quote"
          onButtonClick={openQuote}
        />

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-charcoal mb-8">Seamless <span className="text-zultys-green">Analog Integration.</span></h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Zultys Gateways are the perfect solution for businesses in the Dallas-Fort Worth area that need to connect analog phones, fax machines, or legacy PSTN lines to their Zultys IP phone system. Our FXS and FXO gateways provide the reliability and performance you expect from Zultys.
                </p>
                <ul className="space-y-4">
                  {[
                    'Connect Analog Phones and Fax Machines',
                    'Integrate Legacy PSTN Lines',
                    'High-Density FXS and FXO Options',
                    'Seamless Integration with Zultys MX Platform',
                    'Enterprise-Grade Reliability',
                    'Easy Configuration and Management'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-zultys-green" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white p-12 border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_GATEWAYS}
                    alt="Zultys FXS/FXO Gateways"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-black text-charcoal mb-6">Bridging the Gap for <span className="text-zultys-green">North Texas Business.</span></h2>
              <p className="text-xl text-gray-600">
                Zultys Gateways provide the essential link between your legacy equipment and modern VoIP technology.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Legacy Support',
                  desc: 'Keep your existing analog phones and fax machines working perfectly with your new DFW VoIP system.',
                  icon: Server
                },
                {
                  title: 'PSTN Connectivity',
                  desc: 'Integrate traditional analog lines for backup or specific business requirements in North Texas.',
                  icon: Network
                },
                {
                  title: 'Proven Reliability',
                  desc: 'Zultys gateways are built to the same high standards as their MX series appliances for DFW businesses.',
                  icon: Shield
                }
              ].map((item, i) => (
                <Card key={i} className="p-8 border-none shadow-xl rounded-[2rem] bg-white">
                  <div className="p-4 bg-zultys-green/10 rounded-2xl w-fit mb-6">
                    <item.icon className="h-8 w-8 text-zultys-green" />
                  </div>
                  <h3 className="text-2xl font-black text-charcoal mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="prose prose-xl max-w-none text-gray-600">
              <h2 className="text-4xl font-black text-charcoal mb-8">Zultys Gateways: Essential Infrastructure for DFW Organizations</h2>
              <p>
                While the world is moving to VoIP, many businesses in Dallas and Fort Worth still have critical analog infrastructure. Whether it's a legacy paging system, a specialized fax machine, or the need for analog trunking, <strong>Zultys FXS and FXO Gateways</strong> provide the necessary bridge. These gateways are designed to be "set and forget," providing reliable performance year after year.
              </p>
              <p>
                DFW Business Communications specializes in complex integrations. We help North Texas organizations design a communication infrastructure that leverages the best of modern VoIP while maintaining support for essential legacy equipment. Our local technicians ensure that your gateways are correctly configured and optimized for your specific DFW office environment.
              </p>
              <p>
                By choosing Zultys gateways, you are ensuring that your entire communication ecosystem is unified and manageable. Our Fort Worth based team provides the local expertise needed to implement these solutions effectively, providing your North Texas business with a robust and flexible communication foundation.
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
