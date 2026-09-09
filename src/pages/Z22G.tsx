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
  Headphones,
  Building2
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ZULTYS_Z22G } from '../constants/images';
import { useQuote } from '../context/QuoteContext';

export function Z22G() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys Z 22G | Reliable Gigabit IP Phone Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'The Zultys Z 22G is a reliable, basic business IP phone with Gigabit Ethernet connectivity. Ideal for common areas and standard office use in Dallas-Fort Worth.';
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
    metaKeywords.setAttribute('content', 'Zultys Z 22G, Z 22G phone, basic IP phone, Gigabit Ethernet phone, Zultys dealer Dallas, Zultys support Fort Worth, business VoIP DFW');

    // Canonical URL
    const path = typeof window !== 'undefined' ? window.location.pathname : '/fort-worth-zultys-z-22g-phone';
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
      name: 'Zultys Z 22G IP Phone',
      description: 'Reliable Gigabit IP phone with 2.3-inch display and dual-port Gigabit Ethernet.',
      url: canonicalUrl,
      image: ZULTYS_Z22G,
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
          title={<>Zultys <span className="text-zultys-green">Z 22G</span> <br />Basic Gigabit Phone.</>}
          subtitle="Reliability meets speed. The Z 22G provides essential business features with Gigabit connectivity for seamless North Texas communications."
          icon={Phone}
          iconLabel="Basic Business Phone"
          buttonText="Request a Quote"
          onButtonClick={openQuote}
        />

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-charcoal mb-8">Essential Performance for <span className="text-zultys-green">Modern Business.</span></h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  The Zultys Z 22G is the perfect balance of functionality and value. Designed for the DFW business environment, it offers Gigabit Ethernet to ensure your network speed is never compromised while providing crystal-clear HD audio.
                </p>
                <ul className="space-y-4">
                  {[
                    '2.3" 132x64 Pixel Backlit Display',
                    'Dual-port Gigabit Ethernet',
                    '2 Programmable Line Keys',
                    'HD Audio for Handset and Speaker',
                    'Wall Mountable Design',
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
                    src={ZULTYS_Z22G}
                    alt="Zultys Z 22G IP Phone"
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
              <h2 className="text-4xl font-black text-charcoal mb-6">Reliable Desktop Communications for <span className="text-zultys-green">DFW Offices.</span></h2>
              <p className="text-xl text-gray-600">
                The Z 22G delivers the essential features your North Texas team needs for daily productivity.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Gigabit Speed',
                  desc: 'Ensure your DFW office network remains fast with integrated Gigabit Ethernet pass-through.',
                  icon: Zap
                },
                {
                  title: 'HD Voice Quality',
                  desc: 'Crystal-clear audio ensures that every business conversation in Fort Worth is professional.',
                  icon: Headphones
                },
                {
                  title: 'Compact Design',
                  desc: 'A space-saving design that fits perfectly on any North Texas desk or can be wall-mounted.',
                  icon: Building2
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
              <h2 className="text-4xl font-black text-charcoal mb-8">The Zultys Z 22G: A Workhorse for North Texas Businesses</h2>
              <p>
                In the busy offices of Dallas and Fort Worth, reliability is paramount. The <strong>Zultys Z 22G</strong> is built to be a dependable workhorse, providing the core features needed for effective business communication without unnecessary complexity. Its backlit display ensures that caller ID and menu options are always visible, even in low-light environments.
              </p>
              <p>
                DFW Business Communications recommends the Z 22G for organizations that need a high-quality, Gigabit-capable phone for general office use, common areas, or as a cost-effective solution for large-scale deployments. Its full-duplex speakerphone and HD audio quality make it a pleasure to use for every call.
              </p>
              <p>
                Our local DFW support team is here to ensure your Z 22G deployment is a success. We provide expert installation across the North Texas region, ensuring that your new phones are correctly provisioned and integrated with your Zultys MX system for maximum performance and reliability.
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
