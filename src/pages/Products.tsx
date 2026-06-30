import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ZultysLogo } from '../components/ZultysLogo';
import { AuthorizedPartnerBadge } from '../components/AuthorizedPartnerBadge';
import { ROICalculator } from '../components/ROICalculator';
import { CompetitorComparison } from '../components/CompetitorComparison';
import {
  Phone,
  Server,
  Smartphone,
  Video,
  Monitor,
  Headphones,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Layers,
  Cpu,
  Globe,
  MessageSquare,
  Users,
  BarChart3,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  HERO_BACKGROUND,
  OFFICE_COMMUNICATION,
  SUPPORT_TEAM,
  PEOPLE_ON_CALLS,
  ZULTYS_MX250,
  ZULTYS_MXSE,
  ZULTYS_ZIP_49G,
  ZULTYS_ZIP_47G,
  ZULTYS_ZIP_45G,
  ZULTYS_MXIE,
  ZULTYS_MXMEETING,
  ZULTYS_MX_MOBILE_ZAC,
  ZULTYS_GATEWAYS,
  ZULTYS_Z21I,
  ZULTYS_Z22G,
  ZULTYS_Z23G,
} from '../constants/images';

export function Products() {
  const { openQuote } = useQuote();
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    // Page Title
    document.title = 'Zultys Products Fort Worth | Zultys MX250 MX30 MX-SE Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Explore Zultys MX series in Fort Worth. Authorized dealer for Zultys MX250, MX30, MX-SE, IP phones, and software. Best pricing in Dallas-Fort Worth.';
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
    metaKeywords.setAttribute('content', 'Zultys MX250 Fort Worth, Zultys MX30 Dallas, Zultys MX-SE DFW, Zultys IP phones Fort Worth, Zultys software Dallas, Zultys MXmobile Fort Worth, Zultys MXconference Dallas, Zultys MXmeeting DFW');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/products');

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: 'Zultys Products Fort Worth | Zultys MX250 MX30 MX-SE Dallas' },
      { property: 'og:description', content: 'Explore the complete Zultys MX product line in Fort Worth. Authorized dealer for Zultys MX250, MX30, MX-SE, IP phones, and unified communications software.' },
      { property: 'og:url', content: 'https://dallasfortworthzultys.com/products' },
      { property: 'og:type', content: 'website' },
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // JSON-LD Schema - Product Collection
    const productCollectionSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Zultys Business Communication Products',
      description: 'Complete line of Zultys MX series IP PBX systems, IP phones, and unified communications software.',
      url: 'https://dallasfortworthzultys.com/products',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Zultys MX250',
            url: 'https://dallasfortworthzultys.com/fort-worth-zultys-mx-series',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Zultys MX30',
            url: 'https://dallasfortworthzultys.com/fort-worth-zultys-mx-series',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Zultys MX-SE',
            url: 'https://dallasfortworthzultys.com/fort-worth-zultys-mx-se',
          },
        ],
      },
    };

    // Remove existing schemas
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(script => script.remove());

    // Add schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(productCollectionSchema);
    document.head.appendChild(script);
  }, []);

  const productCategories = [
    {
      id: 'systems',
      title: 'Zultys MX Series IP PBX Systems',
      description: 'Enterprise-grade communication servers for businesses of all sizes.',
      icon: Server,
      products: [
        {
          name: 'Zultys MX250',
          description: 'The flagship enterprise IP PBX supporting up to 500 users per chassis. Perfect for large Fort Worth businesses and multi-location enterprises.',
          features: ['Up to 500 users', 'Redundant power supplies', 'Hot-swappable drives', 'Integrated gateway'],
          image: ZULTYS_MX250,
          link: '/fort-worth-zultys-mx-series',
        },
        {
          name: 'Zultys MX30',
          description: 'High-performance communication server for mid-sized businesses with 50-150 employees. Robust features in a compact 1U chassis.',
          features: ['Up to 150 users', 'Compact 1U design', 'Full feature set', 'Energy efficient'],
          image: ZULTYS_MX250,
          link: '/fort-worth-zultys-mx-series',
        },
        {
          name: 'Zultys MX-SE',
          description: 'Cost-effective solution for small businesses and branch offices. Delivers the same enterprise features as larger systems.',
          features: ['Up to 50 users', 'Affordable entry point', 'Silent operation', 'Wall-mountable'],
          image: ZULTYS_MXSE,
          link: '/fort-worth-zultys-mx-se',
        },
      ],
    },
    {
      id: 'software',
      title: 'Unified Communications Software',
      description: 'Empower your team with tools that work where they do.',
      icon: Monitor,
      products: [
        {
          name: 'ZAC - Zultys Advanced Communicator',
          description: 'The ultimate desktop interface for managing all your communications—voice, video, chat, and presence—in one window.',
          features: ['Unified interface', 'Real-time presence', 'Drag-and-drop transfers', 'Integrated chat'],
          image: ZULTYS_MXIE,
          link: '/fort-worth-zultys-zac',
        },
        {
          name: 'MXmobile',
          description: 'Bring your business extension to your smartphone. Make and receive calls using your company number from anywhere in DFW.',
          features: ['iOS & Android apps', 'Company number caller ID', 'Secure messaging', 'Visual voicemail'],
          image: ZULTYS_MX_MOBILE_ZAC,
          link: '/fort-worth-zultys-mxmobile',
        },
        {
          name: 'MXconference',
          description: 'HD video conferencing and screen sharing for up to 500 participants. Perfect for remote collaboration and client meetings.',
          features: ['HD video & audio', 'Screen sharing', 'No software download', 'Record meetings'],
          image: ZULTYS_MXMEETING,
          link: '/fort-worth-zultys-mxconference',
        },
      ],
    },
    {
      id: 'phones',
      title: 'Zultys IP Phones',
      description: 'Premium hardware designed for crystal-clear communication.',
      icon: Phone,
      products: [
        {
          name: 'ZIP 49GA Executive Phone',
          description: 'Premium executive phone with large color touchscreen and integrated video camera for high-level communication.',
          features: ['8" color touchscreen', 'HD video camera', 'Bluetooth & Wi-Fi', '20 programmable keys'],
          image: ZULTYS_ZIP_49G,
          link: '/fort-worth-zultys-zip-49g-phone',
        },
        {
          name: 'ZIP 47GE Professional Phone',
          description: 'The workhorse for professional environments. Features a large color display and dual Gigabit Ethernet ports.',
          features: ['4.3" color display', 'Gigabit Ethernet', 'USB port for headsets', '27 programmable keys'],
          image: ZULTYS_ZIP_47G,
          link: '/fort-worth-zultys-zip-47g-phone',
        },
        {
          name: 'ZIP 45G Standard Phone',
          description: 'Exceptional value for general office use. High-quality audio and a clear backlit display for everyday productivity.',
          features: ['3.7" backlit display', 'HD audio quality', 'Gigabit Ethernet', '21 programmable keys'],
          image: ZULTYS_ZIP_45G,
          link: '/fort-worth-zultys-zip-45g-phone',
        },
        {
          name: 'ZIP 43G Value Phone',
          description: 'Cost-effective Gigabit IP phone with a backlit display. Perfect for DFW businesses looking for value and performance.',
          features: ['2.8" backlit display', 'HD audio quality', 'Gigabit Ethernet', '3 line keys'],
          image: ZULTYS_ZIP_45G, // Using 45G as placeholder
          link: '/fort-worth-zultys-zip-43g-phone',
        },
        {
          name: 'Z 23GE Entry Color Phone',
          description: 'Modern design meets high performance. The Z 23GE delivers a vibrant color display and Gigabit speeds.',
          features: ['2.8" color display', 'Gigabit Ethernet', '8 programmable keys', 'HD audio'],
          image: ZULTYS_Z23G,
          link: '/fort-worth-zultys-z-23ge-phone',
        },
        {
          name: 'Z 22G Basic Gigabit Phone',
          description: 'Reliability meets speed. The Z 22G provides essential business features with Gigabit connectivity.',
          features: ['2.3" backlit display', 'Gigabit Ethernet', '2 line keys', 'HD audio'],
          image: ZULTYS_Z22G,
          link: '/fort-worth-zultys-z-22g-phone',
        },
        {
          name: 'Z 21i Value Entry Phone',
          description: 'Exceptional value without compromise. Reliable business communications for every desk.',
          features: ['2.3" backlit display', 'Dual 10/100 Mbps ports', '2 line keys', 'HD audio'],
          image: ZULTYS_Z21I,
          link: '/fort-worth-zultys-z-21i-phone',
        },
      ],
    },
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
                <Layers className="h-5 w-5 text-zultys-green" />
                <span className="text-sm font-bold text-zultys-green uppercase tracking-wider">Complete Product Ecosystem</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight text-charcoal tracking-tight">
                Enterprise Tech for <br />
                <span className="text-zultys-green">Modern DFW Teams.</span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-12 text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Explore the complete Zultys MX series product line—from powerful IP PBX servers to 
                premium IP phones and unified communications software. Delivered with local Fort Worth expertise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  onClick={openQuote}
                  className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-8 shadow-2xl hover:shadow-zultys-green/20 transition-all font-bold"
                >
                  Get Product Pricing
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-charcoal/10 bg-white text-charcoal hover:bg-gray-50 text-xl px-10 py-8 font-bold"
                  onClick={() => {
                    const el = document.getElementById('systems');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Systems
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Navigation - SaaS Style */}
        <section className="sticky top-[104px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 hidden md:block">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex justify-center gap-12 py-6">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    const el = document.getElementById(category.id);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="flex items-center gap-2 text-gray-500 hover:text-zultys-green font-bold transition-all group"
                >
                  <div className="p-1.5 rounded-lg bg-gray-50 group-hover:bg-zultys-green/10 transition-colors">
                    <category.icon className="h-5 w-5" />
                  </div>
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories - SaaS Style */}
        {productCategories.map((category, catIdx) => (
          <section
            key={category.id}
            id={category.id}
            className={`py-32 scroll-mt-32 ${catIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-20">
                <div className="inline-flex items-center justify-center p-4 bg-charcoal text-white rounded-2xl mb-6 shadow-xl">
                  <category.icon className="h-10 w-10" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-charcoal mb-6">{category.title}</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {category.products.map((product, prodIdx) => (
                  <Card key={prodIdx} className="flex flex-col overflow-hidden hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] transition-all duration-500 border-gray-100 group bg-white">
                    <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden p-8">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-10 flex-1 flex flex-col">
                      <h3 className="text-2xl font-black text-charcoal mb-4 group-hover:text-zultys-green transition-colors">{product.name}</h3>
                      <p className="text-gray-600 mb-8 flex-1 leading-relaxed">{product.description}</p>
                      <div className="space-y-4 mb-10">
                        {product.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-3 text-sm font-bold text-charcoal">
                            <div className="h-5 w-5 rounded-full bg-zultys-green/10 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-zultys-green" />
                            </div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button asChild className="w-full bg-charcoal hover:bg-zultys-green text-white font-bold py-6 transition-all">
                        <Link to={product.link}>
                          View Details
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Specialized Hardware - SaaS Style */}
        <section className="py-32 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-block bg-zultys-gold/10 text-zultys-gold px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Specialized Hardware
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">Gateways & Endpoints</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Complete your communication ecosystem with specialized Zultys hardware designed for specific business needs in North Texas.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Zultys Gateways', desc: 'Integrate analog lines and devices seamlessly.', img: ZULTYS_GATEWAYS },
                { name: 'Z-21i IP Phone', desc: 'Compact IP phone for common areas.', img: ZULTYS_Z21I },
                { name: 'Z-22G IP Phone', desc: 'Professional Gigabit IP phone with HD audio.', img: ZULTYS_Z22G },
                { name: 'Z-23GE IP Phone', desc: 'Advanced Gigabit IP phone with programmable keys.', img: ZULTYS_Z23G },
              ].map((item, i) => (
                <Card key={i} className="p-8 flex flex-col items-center text-center hover:shadow-xl transition-all border-gray-100 group">
                  <div className="aspect-square w-full mb-8 bg-gray-50 rounded-2xl overflow-hidden p-6">
                    <ImageWithFallback src={item.img} alt={item.name} className="w-full h-full object-contain transition-transform group-hover:scale-110 duration-500" loading="lazy" />
                  </div>
                  <h3 className="text-xl font-black text-charcoal mb-3">{item.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <CompetitorComparison
          productName="MX Series"
          zultysAdvantages={[
            'Single-chassis all-in-one solution (no separate servers for voicemail, conferencing, etc.)',
            'Industry-leading 99.99% uptime with redundant hardware options',
            'Seamless scalability from 5 to 10,000 users across locations',
            'Native mobile apps that work exactly like your desk phone',
            'Open-standard SIP support for maximum hardware flexibility',
            'Integrated contact center and call recording at no extra license cost',
          ]}
          competitorDisadvantages={[
            'Complex multi-server architectures that increase failure points',
            'Hidden licensing fees for basic features like call recording',
            'Poor mobile app integration with frequent dropped calls',
            'Proprietary hardware lock-in that increases long-term costs',
            'Distant support centers with long response times',
          ]}
          features={[
            { feature: 'All-in-One Architecture', zultys: true, competitor: false, zultysDetail: 'Single server for all apps', competitorDetail: 'Multiple servers required' },
            { feature: 'Mobile Integration', zultys: 'Superior', competitor: 'Basic', zultysDetail: 'Full feature parity', competitorDetail: 'Limited functionality' },
            { feature: 'Uptime Guarantee', zultys: '99.99%', competitor: '99.9%', zultysDetail: 'Enterprise SLA', competitorDetail: 'Standard SLA' },
            { feature: 'Scalability', zultys: true, competitor: true, zultysDetail: 'Up to 10k users', competitorDetail: 'Often requires rip-and-replace' },
            { feature: 'Local Support', zultys: true, competitor: false, zultysDetail: 'Fort Worth based', competitorDetail: 'National call center' },
          ]}
        />

        {/* ROI Calculator Section */}
        <ROICalculator
          productName="Zultys MX250 System"
          zultysPrice={4500}
          competitorPrice={7200}
          zultysMonthly={150}
          competitorMonthly={280}
          productType="system"
          onOpenContactForm={openQuote}
        />

        {/* Added Supporting Images Section */}
        <section className="py-20 bg-gray-50 border-t">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
                <ImageWithFallback
                  src={OFFICE_COMMUNICATION}
                  alt="Modern Office Communication Setup"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2 text-white">Modern Office Integration</h3>
                    <p className="text-white">Zultys hardware fits perfectly into any modern workspace.</p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
                <ImageWithFallback
                  src={PEOPLE_ON_CALLS}
                  alt="Business Team Collaborating with Zultys"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2 text-white">Team Collaboration</h3>
                    <p className="text-white">Empower your team with crystal-clear communication tools.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive SEO Content Section - SaaS Style */}
        <section className="py-32 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none prose-headings:text-charcoal prose-headings:font-black prose-p:text-gray-600 prose-strong:text-charcoal prose-a:text-zultys-green prose-a:no-underline hover:prose-a:underline">
                <h2 className="text-4xl mb-8">
                  Zultys Products Fort Worth: Complete Unified Communications Hardware and Software
                </h2>
                
                <p className="text-xl leading-relaxed mb-8">
                  As the premier <strong>Zultys products Fort Worth</strong> dealer, DFW Business Communications provides the complete line of Zultys MX series IP PBX systems, premium IP phones, and powerful unified communications software. Our expertise in Zultys technology ensures that Dallas-Fort Worth businesses receive the right equipment tailored to their specific operational needs, backed by professional installation and local support.
                </p>

                <h2 className="text-3xl mb-6 mt-12">
                  Zultys MX Series IP PBX: The Heart of Your Business Communications
                </h2>
                
                <p className="leading-relaxed mb-6">
                  The <strong>Zultys MX series Fort Worth</strong> businesses rely on represents the pinnacle of IP PBX technology. Unlike traditional phone systems that require separate servers for different functions, Zultys MX systems feature an "all-in-one" architecture. A single Zultys MX server handles voice, video, chat, presence, conferencing, and contact center functions, dramatically reducing complexity and improving reliability.
                </p>

                <p className="leading-relaxed mb-8">
                  The flagship <strong>Zultys MX250 Fort Worth</strong> solution is designed for enterprises requiring maximum performance and scalability. Supporting up to 500 users per chassis and featuring redundant power supplies and hot-swappable drives, the MX250 delivers the 99.99% uptime that mission-critical business environments demand. For mid-sized organizations, the <strong>Zultys MX30 Dallas</strong> provides robust features in a compact 1U design, while the <strong>Zultys MX-SE DFW</strong> offers an affordable entry point for small businesses without sacrificing enterprise-grade capabilities.
                </p>

                {/* Collapsible Content */}
                {showFullContent && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <h3 className="text-2xl mb-4 mt-10">
                      Zultys IP Phones: Premium Hardware for Every Desk
                    </h3>

                    <p className="leading-relaxed mb-6">
                      Our selection of <strong>Zultys IP phones Fort Worth</strong> includes hardware designed for every role in your organization. The <strong>ZIP 49GA executive phone</strong> features a massive 8" color touchscreen and integrated video camera, making it the perfect choice for high-level executives and managers who require visual communication. The <strong>ZIP 47GE professional phone</strong> serves as the workhorse for busy office environments, offering a clear color display and dual Gigabit Ethernet ports for high-speed connectivity.
                    </p>

                    <p className="leading-relaxed mb-6">
                      For general office use, the <strong>ZIP 45G standard phone</strong> delivers exceptional audio quality and a clear backlit display at a competitive price point. We also provide specialized hardware like the <strong>Z 23GE</strong> and <strong>Z 21i</strong> for entry-level requirements, as well as <strong>Zultys gateways</strong> for integrating legacy analog devices with your modern IP PBX. Every Zultys phone we install in Dallas-Fort Worth is configured for plug-and-play simplicity and crystal-clear HD audio.
                    </p>

                    <h3 className="text-2xl mb-4 mt-10">
                      Zultys Gateways and Analog Integration for DFW Enterprises
                    </h3>

                    <p className="leading-relaxed mb-6">
                      Many DFW businesses still rely on legacy analog equipment, such as fax machines, overhead paging systems, and door entry controllers. <strong>Zultys Gateways</strong> provide a seamless bridge between these analog devices and your modern Zultys IP PBX. These gateways ensure that your North Texas organization can leverage the benefits of VoIP while maintaining the functionality of your existing analog assets across the DFW metroplex.
                    </p>

                    <p className="leading-relaxed mb-6">
                      Whether you need to connect a few analog lines in a small Fort Worth office or integrate a complex paging system in a large Dallas warehouse, Zultys Gateways offer the reliability and flexibility you need. Our team at DFW Business Communications specializes in configuring these gateways to ensure perfect integration with your Zultys system and your local North Texas infrastructure.
                    </p>

                    <h3 className="text-2xl mb-4 mt-10">
                      Specialized Endpoint Solutions for North Texas Businesses
                    </h3>

                    <p className="leading-relaxed mb-6">
                      Beyond standard desk phones, we offer a variety of <strong>Specialized Endpoint Solutions</strong> for DFW businesses. This includes cordless DECT phones for employees who need to stay connected while moving around a large Fort Worth facility, as well as ruggedized phones for industrial environments in Dallas. We also provide high-quality conference phones designed to deliver crystal-clear audio in DFW meeting rooms of all sizes.
                    </p>

                    <p className="leading-relaxed mb-6">
                      These specialized endpoints ensure that every member of your North Texas team has the right tool for their specific job. By providing a diverse range of hardware options, we help DFW organizations improve productivity and communication efficiency across their entire enterprise.
                    </p>

                    <h3 className="text-2xl mb-4 mt-10">
                      Zultys Software: Unified Communications Anywhere
                    </h3>

                    <p className="leading-relaxed mb-6">
                      The power of Zultys technology extends beyond the desk phone with a suite of <strong>Zultys software Dallas</strong> businesses use to stay connected. <strong>ZAC (Zultys Advanced Communicator)</strong> provides a unified desktop interface for managing all communications. From a single window, your team can handle calls, see colleague presence, engage in real-time chat, and manage voicemails.
                    </p>

                    <p className="leading-relaxed mb-6">
                      For mobile workers, <strong>Zultys MXmobile Fort Worth</strong> apps transform smartphones into business extensions. Your team can make and receive business calls using their company number, ensuring professional identity and protecting personal privacy. <strong>Zultys MXconference Dallas</strong> delivers HD video conferencing for up to 500 participants, while <strong>Zultys MXmeeting DFW</strong> provides team collaboration tools that keep projects moving forward regardless of where team members are located.
                    </p>

                    <h3 className="text-2xl mb-4 mt-10">
                      Future-Proofing Your DFW Business with Zultys Technology
                    </h3>

                    <p className="leading-relaxed mb-6">
                      Investing in a communication system is a long-term decision, and <strong>Future-Proofing Your DFW Business</strong> is a key consideration. Zultys is committed to continuous innovation, regularly releasing software updates and new features that ensure your system remains at the cutting edge of communication technology. This commitment to future-proofing protects your investment and ensures that your North Texas organization can always leverage the latest tools and capabilities.
                    </p>

                    <p className="leading-relaxed mb-6">
                      Whether it's integrating with new AI-driven tools, enhancing mobile capabilities, or improving security protocols, Zultys ensures that your DFW communication system is ready for whatever the future holds. At DFW Business Communications, we help you navigate these technological advancements and ensure that your Zultys system continues to support your business growth across the entire Dallas-Fort Worth metroplex.
                    </p>

                    <h2 className="text-3xl mb-6 mt-12">
                      Why Buy Zultys Products from DFW Business Communications?
                    </h2>

                    <p className="leading-relaxed mb-6">
                      Choosing the right <strong>Zultys products Fort Worth</strong> is only half the battle—professional installation and support are equally critical. As an authorized Zultys partner, DFW Business Communications provides expert guidance to ensure you select the right equipment for your needs. We don't just ship boxes; we provide complete system design, professional installation, comprehensive user training, and ongoing local support throughout the Dallas-Fort Worth metroplex.
                    </p>

                    <p className="leading-relaxed mb-6">
                      Our deep understanding of <strong>Zultys MX series Fort Worth</strong> technology allows us to configure systems for maximum efficiency. We optimize call routing, integrate with your CRM platforms, set up secure remote access, and ensure your network is properly configured for high-quality VoIP traffic. When you buy Zultys products from us, you're getting a partner invested in your long-term communication success.
                    </p>

                    <h3 className="text-2xl mb-4 mt-10">
                      Zultys Products for Every Industry in DFW
                    </h3>

                    <p className="leading-relaxed mb-6">
                      We've deployed <strong>Zultys products Fort Worth</strong> solutions across every major industry in the Dallas-Fort Worth area. Healthcare providers rely on Zultys for HIPAA-compliant secure messaging and patient communication. Legal firms appreciate the robust call recording and documentation features. Real estate agencies leverage MXmobile to keep agents connected in the field, while retail businesses use Zultys to coordinate across multiple store locations. Whatever your industry, we have the Zultys products and expertise to address your specific challenges.
                    </p>

                    <div className="mt-12 p-10 bg-gray-50 rounded-3xl border border-gray-100">
                      <h2 className="text-3xl font-black text-charcoal mb-4">
                        Ready to Upgrade Your Business Technology?
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        Explore how the complete line of <strong>Zultys products Fort Worth</strong> can transform your business communications. From powerful MX series servers to premium IP phones and mobile software, we provide the technology that drives business growth in Dallas-Fort Worth.
                      </p>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Contact DFW Business Communications today at <strong className="text-zultys-green">817-231-2962</strong> for a free product consultation and customized quote. Let us help you build a communication infrastructure that works as hard as you do.
                      </p>
                    </div>
                  </div>
                )}

                {/* Read More / Read Less Button */}
                <div className="mt-8 text-center">
                  <Button
                    onClick={() => setShowFullContent(!showFullContent)}
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
                  >
                    {showFullContent ? 'Read Less' : 'Read More'} 
                    <ArrowRight className={`ml-2 h-5 w-5 transition-transform ${showFullContent ? 'rotate-90' : ''}`} />
                  </Button>
                </div>
              </article>
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
