import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { Button } from '../components/ui/button';
import { ArrowRight, Video } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ZULTYS_FORT_WORTH_BG } from '../constants/images';
import { useQuote } from '../context/QuoteContext';

export function MXmeeting() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys MXmeeting | Team Collaboration & Video Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Collaborate effortlessly with Zultys MXmeeting. Team collaboration and video conferencing for DFW businesses. Call 817-231-2962 for a free demo.';
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
    metaKeywords.setAttribute('content', 'Zultys MXmeeting Dallas, team collaboration Fort Worth, video conferencing DFW, Zultys web meeting Dallas, business collaboration software North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-mxmeeting');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Zultys MXmeeting',
      operatingSystem: 'Windows, macOS, Web',
      applicationCategory: 'CommunicationApplication',
      description: 'Unified team collaboration and video conferencing solution for Zultys systems in DFW.',
      offers: {
        '@type': 'Offer',
        areaServed: 'Dallas-Fort Worth'
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
        <section className="relative min-h-[60vh] flex flex-col justify-center bg-slate-950">
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src={ZULTYS_FORT_WORTH_BG}
              alt="Zultys MXmeeting"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-slate-950/95"></div>
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 w-full pt-20 pb-20">
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] text-white tracking-tight">
              Zultys MXmeeting
            </h1>
            <p className="text-xl text-slate-200 mb-12 max-w-2xl">
              Collaborate effortlessly with team collaboration and video conferencing for DFW businesses.
            </p>
            <Button
              size="lg"
              onClick={openQuote}
              className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-6 shadow-2xl transition-all font-black uppercase tracking-wider rounded-xl"
            >
              Get a Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
