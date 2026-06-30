import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { Hero } from '../components/Hero';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { ArrowRight, Users, Zap } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ZULTYS_FORT_WORTH_BG } from '../constants/images';

export function SmallBusiness() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Small Business Phone Systems Fort Worth | VoIP for Small Business DFW | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Affordable, enterprise-grade VoIP phone systems for small businesses (1-20 employees) in Fort Worth and Dallas. Discover how Zultys provides big features for small teams.';
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
    metaKeywords.setAttribute('content', 'small business phone system Dallas, VoIP for small business Fort Worth, affordable office phones DFW, Zultys small business, start-up phone system North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/small-business-phone-systems');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Small Business VoIP Phone Systems',
      description: 'Affordable, enterprise-grade VoIP phone systems for small businesses (1-20 employees) in the Dallas-Fort Worth area.',
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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero
          title={<>Small Business <br /><span className="text-zultys-green">Phone Systems.</span></>}
          subtitle="Affordable, enterprise-grade VoIP phone systems for small businesses (1-20 employees) in Fort Worth and Dallas. Get the features you need at a price you can afford."
          icon={Users}
          iconLabel="Small Business Solutions"
          buttonText="Get a Free Quote"
          onButtonClick={openQuote}
        />

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-charcoal mb-8">Big Business Features for <span className="text-zultys-green">Small DFW Teams.</span></h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Don't let your size limit your capabilities. Our Zultys phone systems for small businesses in Dallas and Fort Worth provide all the high-end features of a large corporation at a fraction of the cost.
                </p>
                <ul className="space-y-4">
                  {[
                    'Auto-Attendant / Virtual Receptionist',
                    'Mobile App Integration (MXmobile)',
                    'Voicemail to Email',
                    'Call Recording and Reporting',
                    'Professional On-Hold Music',
                    'Scalable from 1 to 20+ Users'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-zultys-green" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white p-12 border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_FORT_WORTH_BG}
                    alt="Small Business Communications DFW"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-black text-charcoal mb-6">Why Small Businesses in <span className="text-zultys-green">Fort Worth</span> Choose Us.</h2>
              <p className="text-xl text-gray-600">
                We provide personalized service and expert support tailored to the needs of North Texas small businesses.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Local DFW Support',
                  desc: 'Our technicians are based right here in Fort Worth, providing fast, on-site support when you need it.',
                  icon: Users
                },
                {
                  title: 'Predictable Costs',
                  desc: 'Enjoy a flat monthly rate with no hidden fees, making it easy to manage your DFW business budget.',
                  icon: Zap
                },
                {
                  title: 'Easy Setup',
                  desc: 'We handle the entire installation and training process, so you can focus on running your North Texas business.',
                  icon: ArrowRight
                }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2rem] shadow-xl border border-gray-100">
                  <div className="p-4 bg-zultys-green/10 rounded-2xl w-fit mb-6">
                    <item.icon className="h-8 w-8 text-zultys-green" />
                  </div>
                  <h3 className="text-2xl font-black text-charcoal mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="prose prose-xl max-w-none text-gray-600">
              <h2 className="text-4xl font-black text-charcoal mb-8">Empowering Small Businesses in Dallas-Fort Worth</h2>
              <p>
                In today's competitive North Texas market, small businesses need every advantage they can get. A professional phone system is often the first impression a customer has of your company. With our <strong>Zultys VoIP solutions</strong>, your small business in Fort Worth or Dallas can sound like a Fortune 500 company.
              </p>
              <p>
                Whether you're a boutique law firm in downtown Dallas, a growing retail shop in Fort Worth, or a specialized service provider in Arlington, our phone systems are designed to grow with you. We offer flexible cloud and on-premise options that fit your specific needs and budget.
              </p>
              <p>
                DFW Business Communications is committed to the success of our local small business community. We don't just sell you a phone system; we provide a communication partnership. From initial consultation to ongoing support, we're here to ensure your North Texas business stays connected to your customers and your team.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
