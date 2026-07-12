import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { MapPin, Phone, Shield, Zap, Users, ArrowRight, CheckCircle, Globe } from 'lucide-react';
import { HashLink as Link } from '../components/HashLink';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function CollinCountyVoip() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Collin County Zultys Business Phone Systems | VoIP & Cloud PBX Hub';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Expert Zultys business phone systems and business VoIP solutions in Collin County, TX. Serving Plano, Frisco, McKinney, Celina, Allen, Prosper, and Wylie.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/collin-county-voip-systems');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': 'https://dallasfortworthzultys.com/collin-county-voip-systems#business',
          'name': 'DFW Business Communications - Collin County Zultys Support',
          'description': 'Authorized Zultys dealer providing enterprise business phone systems and VoIP solutions to Collin County, Texas.',
          'url': 'https://dallasfortworthzultys.com/collin-county-voip-systems',
          'telephone': '817-231-2962',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'McKinney',
            'addressRegion': 'TX',
            'addressCountry': 'US'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': '33.1972',
            'longitude': '-96.6398'
          },
          'areaServed': [
            { '@type': 'AdministrativeArea', 'name': 'Collin County, TX' },
            { '@type': 'AdministrativeArea', 'name': 'Plano, TX' },
            { '@type': 'AdministrativeArea', 'name': 'Frisco, TX' },
            { '@type': 'AdministrativeArea', 'name': 'McKinney, TX' },
            { '@type': 'AdministrativeArea', 'name': 'Celina, TX' },
            { '@type': 'AdministrativeArea', 'name': 'Allen, TX' },
            { '@type': 'AdministrativeArea', 'name': 'Prosper, TX' },
            { '@type': 'AdministrativeArea', 'name': 'Wylie, TX' }
          ]
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://dallasfortworthzultys.com/collin-county-voip-systems#breadcrumb',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://dallasfortworthzultys.com'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Service Areas',
              'item': 'https://dallasfortworthzultys.com/sitemap'
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': 'Collin County VoIP Systems',
              'item': 'https://dallasfortworthzultys.com/collin-county-voip-systems'
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  const collinCities = [
    { name: 'Plano', path: '/plano-tx-zultys-phone-systems', desc: 'Enterprise business phone systems and cloud solutions for corporate Plano headquarters.' },
    { name: 'Frisco', path: '/frisco-tx-zultys-phone-systems', desc: 'Unified communications and scaling local business VoIP for Frisco high-growth tech firms.' },
    { name: 'McKinney', path: '/mckinney-tx-zultys-phone-systems', desc: 'Certified Zultys support, installation, and sales for historic and growing McKinney offices.' },
    { name: 'Celina', path: '/celina-tx-zultys-phone-systems', desc: 'HIPAA and secure local PBX deployments for the Celina business and medical districts.' },
    { name: 'Allen', path: '/allen-tx-zultys-phone-systems', desc: 'VoIP, phone hardware installation, and on-site support for the Allen business corridor.' },
    { name: 'Prosper', path: '/prosper-tx-zultys-phone-systems', desc: 'Professional VoIP phone services customized for Prosper medical, dental, and corporate offices.' },
    { name: 'Wylie', path: '/wylie-tx-zultys-phone-systems', desc: 'Affordable, enterprise-level communication systems designed for Wylie light industrial sites.' },
    { name: 'Anna', path: '/anna-tx-zultys-phone-systems', desc: 'Robust unified office communications supporting the rapid expansion of Anna enterprises.' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative pt-32 pb-24 bg-slate-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img src={HERO_BACKGROUND} alt="Collin County Texas Business VoIP Systems Background" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-zultys-green/25 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-zultys-green/35">
              <MapPin className="h-5 w-5 text-zultys-green" />
              <span className="text-xs font-black uppercase tracking-widest text-white">Collin County regional Hub</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Collin County VoIP <br />
              <span className="text-zultys-green">Business Phone Systems.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Consolidating communications across North Texas. DFW Business Communications delivers enterprise-grade Zultys unified platforms, local cloud solutions, and rapid on-site support for businesses throughout Collin County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-zultys-green hover:bg-zultys-green/90 text-white text-lg px-8 py-6 font-bold rounded-xl"
              >
                Schedule Regional Site Survey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 font-bold rounded-xl"
                asChild
              >
                <a href="tel:817-231-2962">Call 817-231-2962</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Directory Silo Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Collin County Local Service Directory</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Explore our dedicated, hyper-local service-area landing pages to find specialized, certified on-site Zultys phone system support near your specific Collin County location.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collinCities.map((city, idx) => (
                <Link key={idx} to={city.path} className="group">
                  <Card className="p-8 hover:shadow-2xl hover:border-zultys-green/30 transition-all border-slate-150 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Local Service Page</span>
                        <MapPin className="h-5 w-5 text-zultys-green group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-zultys-green transition-colors mb-3">{city.name}, TX</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{city.desc}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-zultys-green font-bold text-sm">
                      <span>View Local Page</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Local Copy Section */}
        <section className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-5xl px-6 lg:px-8 prose prose-lg text-slate-700">
            <h2 className="text-3xl font-black text-slate-900 mb-6">Regional VoIP Infrastructure for Collin County</h2>
            <p>
              Collin County is one of the fastest-growing economic centers in the United States. From corporate headquarters in legacy corridors like legacy park in Plano and Frisco to expanding logistics facilities and service networks in McKinney and Celina, companies need robust communication systems to match their fast-paced operations.
            </p>
            <p>
              DFW Business Communications provides a logical, highly stable regional network strategy. By grouping smaller local clinical, corporate, and warehouse facilities onto a cohesive <strong>Zultys MX Series private VoIP trunk</strong>, organizations can make unlimited internal calls, coordinate between team members using real-time ZAC presence, and centralize admin desks with 100% cloud backup.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Advantage of a Regional DFW Integrator</h3>
            <p>
              National VoIP brokers cannot coordinate direct on-site physical support when your internal ethernet cables, switches, or phone devices require troubleshooting. Based in the heart of the Metroplex, DFW Business Communications keeps a dedicated fleet of certified local technical field engineers equipped to respond to your on-site needs.
            </p>

            <div className="mt-12 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">Collin County Local NAP Information</h3>
              <div className="grid md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Service Hours & Reach</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li><strong>Service Locations:</strong> All Collin County municipalities</li>
                    <li><strong>Support Availability:</strong> 24/7/365 Emergency Dispatch</li>
                    <li><strong>Consultation Hours:</strong> Monday – Friday: 8:00 AM – 5:00 PM</li>
                    <li><strong>Local DFW Line:</strong> 817-231-2962</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">NAP Quality Signals</h4>
                  <p className="text-slate-600 leading-relaxed">
                    DFW Business Communications provides factory-certified sales, custom installations, and 24/7 proactive monitoring. We maintain absolute compliance with federal regulatory voice-encryption protocols to provide a premier level of reliability across North Texas.
                  </p>
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
