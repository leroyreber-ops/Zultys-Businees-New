import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Phone, 
  Zap, 
  CheckCircle, 
  Shield, 
  Cpu,
  Smartphone,
  Users,
  DollarSign,
  Headphones
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ZULTYS_Z21I } from '../constants/images';
import { useQuote } from '../context/QuoteContext';

export function Z21i() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys Z 21i | Value-Driven IP Business Phone Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'The Zultys Z 21i is a cost-effective, value-driven business IP phone. Perfect for entry-level requirements and common areas in Dallas-Fort Worth businesses.';
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
    metaKeywords.setAttribute('content', 'Zultys Z 21i, Z 21i phone, value IP phone, entry level business phone, Zultys dealer Dallas, Zultys support Fort Worth, business VoIP North Texas');

    // Canonical URL
    const path = typeof window !== 'undefined' ? window.location.pathname : '/fort-worth-zultys-z-21i-phone';
    const canonicalUrl = `https://dallasfortworthzultys.com${path.startsWith('/') ? path : `/${path}`}`;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // JSON-LD Schema - Truthful Product schema without unverified offers
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${canonicalUrl}#product`,
      name: 'Zultys Z 21i IP Phone',
      description: 'Cost-effective business IP phone with 2.3-inch display and 2 programmable keys.',
      url: canonicalUrl,
      image: ZULTYS_Z21I,
      brand: {
        '@type': 'Brand',
        name: 'Zultys'
      }
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
        <Hero
          title={<>Zultys <span className="text-zultys-green">Z 21i</span> <br />Value Entry Phone.</>}
          subtitle="Exceptional value without compromise. The Z 21i delivers reliable business communications for every desk in your DFW office."
          icon={Phone}
          iconLabel="Value Business Phone"
          buttonText="Get a Quote"
          onButtonClick={openQuote}
        />

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-charcoal mb-8">Reliable Communication for <span className="text-zultys-green">Every Workspace.</span></h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  The Zultys Z 21i is designed for users who need a reliable, easy-to-use phone for their daily business needs. It's an excellent choice for common areas, break rooms, or as a standard desk phone for businesses in North Texas looking for a cost-effective solution.
                </p>
                <ul className="space-y-4">
                  {[
                    '2.3" 132x64 Pixel Backlit Display',
                    'Dual 10/100 Mbps Ethernet Ports',
                    '2 Programmable Line Keys',
                    'HD Audio Quality',
                    'Plug-and-Play Deployment',
                    'PoE Support'
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
                    src={ZULTYS_Z21I}
                    alt="Zultys Z 21i IP Phone"
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
              <h2 className="text-4xl font-black text-charcoal mb-6">Value-Driven Communication for <span className="text-zultys-green">DFW Businesses.</span></h2>
              <p className="text-xl text-gray-600">
                The Z 21i provides the essential tools your team needs at an exceptional price point.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Cost-Effective',
                  desc: 'The ideal choice for large-scale deployments in DFW where value and reliability are top priorities.',
                  icon: DollarSign
                },
                {
                  title: 'HD Audio',
                  desc: 'High-definition voice quality ensures that every call in your North Texas office is clear.',
                  icon: Headphones
                },
                {
                  title: 'Easy to Use',
                  desc: 'A simple, intuitive interface that requires minimal training for your Fort Worth staff.',
                  icon: Users
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
              <h2 className="text-4xl font-black text-charcoal mb-8">Zultys Z 21i: Practicality and Performance in North Texas</h2>
              <p>
                The <strong>Zultys Z 21i</strong> is the entry-point into the Zultys ecosystem, but it doesn't skimp on quality. For businesses in Dallas and Fort Worth that need a reliable phone for high-traffic areas or for employees with basic communication needs, the Z 21i is an outstanding choice. Its compact footprint and wall-mountable design make it versatile for any DFW office layout.
              </p>
              <p>
                DFW Business Communications recommends the Z 21i for its straightforward functionality and robust build quality. It's a phone that "just works," providing the essential features like call hold, transfer, and conference without a steep learning curve.
              </p>
              <p>
                Our local Fort Worth team provides full support for the Z 21i, from initial provisioning to ongoing technical assistance. We ensure that your value-driven deployment is as successful as our high-end executive solutions, providing the same level of local, personal service to every DFW client.
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
