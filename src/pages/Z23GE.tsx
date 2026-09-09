import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
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
  Star
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ZULTYS_Z23G, ZULTYS_FORT_WORTH_BG } from '../constants/images';

export function Z23GE() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys Z 23GE | Gigabit Color Business IP Phone Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'The Zultys Z 23GE is a professional Gigabit IP phone featuring a vibrant color display. High performance and modern design for Fort Worth and Dallas workspaces.';
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
    metaKeywords.setAttribute('content', 'Zultys Z 23GE, Z 23GE phone, color IP phone, Gigabit business phone, Zultys DFW, Fort Worth phone systems, Dallas VoIP');

    // Canonical URL
    const path = typeof window !== 'undefined' ? window.location.pathname : '/fort-worth-zultys-z23g-phone';
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
      name: 'Zultys Z 23GE IP Phone',
      description: 'Professional Gigabit IP phone with 2.8-inch color display and dual-port Gigabit Ethernet.',
      url: canonicalUrl,
      image: ZULTYS_Z23G,
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
          title={<>Zultys <span className="text-zultys-green">Z 23GE</span> <br />Entry Color Phone.</>}
          subtitle="Modern design meets high performance. The Z 23GE delivers a vibrant color display and Gigabit speeds for the modern DFW workspace."
          icon={Phone}
          iconLabel="Entry-Level Business Phone"
          buttonText="Request Pricing"
          onButtonClick={openQuote}
        />

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-charcoal mb-8">Professional Features for <span className="text-zultys-green">Every Desk.</span></h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  The Zultys Z 23GE is designed to provide a high-quality communication experience without the high price tag. With its 2.8" color display and dual-port Gigabit Ethernet, it's the ideal choice for businesses in Fort Worth looking to upgrade their desktop experience.
                </p>
                <ul className="space-y-4">
                  {[
                    '2.8" 320x240 Pixel Color Display',
                    'Dual-port Gigabit Ethernet',
                    '8 Programmable Line/Feature Keys',
                    'High-Definition Audio',
                    'Full Duplex Speakerphone',
                    'PoE Support (Power over Ethernet)'
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
                    src={ZULTYS_Z23G}
                    alt="Zultys Z 23GE IP Phone"
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
              <h2 className="text-4xl font-black text-charcoal mb-6">Why DFW Businesses Choose the <span className="text-zultys-green">Z 23GE.</span></h2>
              <p className="text-xl text-gray-600">
                A perfect blend of modern design and essential business functionality for the North Texas market.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Vibrant Color Display',
                  desc: 'The 2.8" color screen makes navigating menus and managing calls intuitive and efficient for your DFW staff.',
                  icon: Star
                },
                {
                  title: 'Gigabit Connectivity',
                  desc: 'Dual Gigabit ports ensure that your desktop computer maintains full network speed through the phone.',
                  icon: Zap
                },
                {
                  title: 'Crystal Clear Audio',
                  desc: 'Experience high-definition voice quality on every call, ensuring professional communication across North Texas.',
                  icon: Phone
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
              <h2 className="text-4xl font-black text-charcoal mb-8">Optimizing Your Fort Worth Office with Zultys Z 23GE</h2>
              <p>
                The <strong>Zultys Z 23GE</strong> is more than just an entry-level phone; it's a powerful communication tool designed for the modern DFW workspace. Its sleek design and professional feature set make it a favorite for businesses in Dallas and Fort Worth that want to provide their employees with a high-quality desktop experience without a massive investment.
              </p>
              <p>
                At DFW Business Communications, we understand that every desk in your North Texas office represents a critical point of contact for your customers. That's why we recommend the Z 23GE for its reliability, ease of use, and exceptional audio quality. Whether you're a small business in Arlington or a growing firm in Plano, the Z 23GE provides the performance you need to stay connected and productive.
              </p>
              <p>
                Our local DFW technicians provide expert installation and configuration for all Zultys endpoints, ensuring that your Z 23GE phones are perfectly integrated into your Zultys MX system. We also provide comprehensive training for your Fort Worth staff, so they can leverage all the features of their new color IP phones from day one.
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
