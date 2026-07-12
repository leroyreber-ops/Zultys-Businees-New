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
import {
  Building2,
  Stethoscope,
  Scale,
  GraduationCap,
  Home as HomeIcon,
  ShoppingCart,
  Factory,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Users,
  Smartphone,
  Cloud,
  PhoneCall,
  MessageSquare,
  Video,
  BarChart3,
  Server,
  Headphones,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  HERO_BACKGROUND,
  OFFICE_COMMUNICATION,
  SUPPORT_TEAM,
  PEOPLE_ON_CALLS,
  ZULTYS_ZAC_MOBILE_COMBO,
  ZULTYS_CLOUD_SERVICES,
  ZULTYS_MX_MOBILE,
} from '../constants/images';

export function Solutions() {
  const { openQuote } = useQuote();
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    // Page Title
    document.title = 'Zultys Solutions Fort Worth | VoIP Phone Systems Dallas DFW | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Tailored Zultys communication solutions for Fort Worth businesses. Industry-specific VoIP, unified communications, and cloud phone systems for healthcare, legal, real estate, and more in Dallas-Fort Worth.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Tailored Zultys communication solutions for Fort Worth businesses. Industry-specific VoIP, unified communications, and cloud phone systems for healthcare, legal, real estate, and more in Dallas-Fort Worth.';
      document.head.appendChild(meta);
    }

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'Zultys healthcare Fort Worth, Zultys legal Dallas, Zultys real estate DFW, Zultys education Fort Worth, Zultys retail Dallas, Zultys enterprise DFW, business phone solutions Fort Worth, VoIP solutions Dallas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/solutions');

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: 'Zultys Solutions Fort Worth | VoIP Phone Systems Dallas DFW' },
      { property: 'og:description', content: 'Tailored Zultys communication solutions for Fort Worth businesses. Industry-specific VoIP, unified communications, and cloud phone systems.' },
      { property: 'og:url', content: 'https://dallasfortworthzultys.com/solutions' },
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

    // JSON-LD Schema - Service Collection
    const serviceCollectionSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys Business Communication Solutions',
      description: 'Industry-specific unified communications and VoIP solutions for Dallas-Fort Worth businesses.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'DFW Business Communications',
        url: 'https://dallasfortworthzultys.com',
      },
      areaServed: ['Fort Worth', 'Dallas', 'Arlington', 'Irving', 'Plano', 'Frisco', 'DFW Metroplex'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Communication Solutions',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Healthcare Communication Solutions',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Legal Service Communication Solutions',
            },
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
    script.text = JSON.stringify(serviceCollectionSchema);
    document.head.appendChild(script);
  }, []);

  const industrySolutions = [
    {
      title: 'Healthcare',
      icon: Stethoscope,
      description: 'HIPAA-compliant secure communications designed for medical practices, clinics, and hospitals. Features include patient appointment reminders, secure messaging, and integration with EMR systems.',
      features: ['HIPAA-compliant security', 'Patient reminders', 'Secure messaging', 'EMR integration'],
      link: '/fort-worth-zultys-healthcare',
      image: 'https://picsum.photos/seed/healthcare/1200/800',
    },
    {
      title: 'Legal Services',
      icon: Scale,
      description: 'Confidential client communications with robust call recording, documentation, and billing integration. Perfect for law firms requiring strict compliance and detailed record-keeping.',
      features: ['Call recording', 'Billing integration', 'Confidential voicemail', 'Client ID tracking'],
      link: '/fort-worth-zultys-professional-services',
      image: 'https://picsum.photos/seed/legal/1200/800',
    },
    {
      title: 'Real Estate',
      icon: HomeIcon,
      description: 'Mobile-first solutions that keep agents connected while showing properties. Features include MXmobile integration, virtual receptionists, and seamless call routing to personal devices.',
      features: ['MXmobile integration', 'Virtual receptionist', 'Call routing', 'Professional identity'],
      link: '/fort-worth-zultys-real-estate',
      image: 'https://picsum.photos/seed/realestate/1200/800',
    },
    {
      title: 'Education',
      icon: GraduationCap,
      description: 'Unified communications for schools and universities. Features include emergency notification systems, campus-wide paging, and parent-teacher communication portals.',
      features: ['Emergency notifications', 'Campus paging', 'Parent portals', 'Scalable architecture'],
      link: '/fort-worth-zultys-education',
      image: 'https://picsum.photos/seed/education/1200/800',
    },
    {
      title: 'Retail & Automotive',
      icon: ShoppingCart,
      description: 'Coordinate across multiple store locations or dealership departments. Features include overhead paging, multi-site directories, and customer service call queues.',
      features: ['Multi-site coordination', 'Overhead paging', 'Call queues', 'Customer service tools'],
      link: '/fort-worth-zultys-retail-automotive',
      image: 'https://picsum.photos/seed/retail/1200/800',
    },
    {
      title: 'Enterprise',
      icon: Factory,
      description: 'Robust solutions for large-scale operations and manufacturing. Features include redundant hardware, high-capacity call handling, and integration with industrial paging systems.',
      features: ['Redundant hardware', 'High capacity', 'Industrial paging', 'Enterprise security'],
      link: '/fort-worth-zultys-enterprise',
      image: 'https://picsum.photos/seed/enterprise/1200/800',
    },
  ];

  const technologySolutions = [
    {
      title: 'Cloud PBX Solutions',
      icon: Cloud,
      description: 'Eliminate on-site hardware with our secure cloud-hosted Zultys platform. Perfect for businesses valuing simplicity and minimal upfront investment.',
      link: '/fort-worth-zultys-cloud-services',
    },
    {
      title: 'On-Premise Systems',
      icon: Server,
      description: 'Complete control over your communication infrastructure with on-site Zultys MX servers. Ideal for businesses with strict compliance or security needs.',
      link: '/fort-worth-zultys-on-premise',
    },
    {
      title: 'Hybrid Deployments',
      icon: Zap,
      description: 'The best of both worlds—combine on-premise reliability with cloud flexibility for multi-location businesses.',
      link: '/fort-worth-zultys-hybrid',
    },
    {
      title: 'Contact Center',
      icon: Headphones,
      description: 'Advanced call routing, real-time monitoring, and detailed analytics for customer service and sales teams.',
      link: '/fort-worth-zultys-contact-center',
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
                <Zap className="h-5 w-5 text-zultys-green" />
                <span className="text-sm font-bold text-zultys-green uppercase tracking-wider">Tailored Business Solutions</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight text-charcoal tracking-tight">
                Communication for <br />
                <span className="text-zultys-green">Your Industry.</span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-12 text-gray-600 leading-relaxed max-w-3xl mx-auto">
                We don't believe in one-size-fits-all. Our expert team designs and deploys Zultys 
                communication solutions tailored to the specific needs of your industry throughout the DFW metroplex.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  onClick={openQuote}
                  className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-8 shadow-2xl hover:shadow-zultys-green/20 transition-all font-bold"
                >
                  Get Custom Solution
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-charcoal/10 bg-white text-charcoal hover:bg-gray-50 text-xl px-10 py-8 font-bold"
                  onClick={() => {
                    const el = document.getElementById('industries');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Industries
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Solutions Grid - SaaS Style */}
        <section id="industries" className="py-32 bg-white scroll-mt-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-black text-charcoal mb-6">
                Industry-Specific Expertise
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover how we've helped businesses in your industry overcome communication 
                challenges and improve operational efficiency with Zultys technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {industrySolutions.map((solution, index) => (
                <Card key={index} className="flex flex-col overflow-hidden hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] transition-all duration-500 border-gray-100 group bg-white">
                  <div className="aspect-video relative overflow-hidden">
                    <ImageWithFallback
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                      <div className="p-2 bg-zultys-green rounded-lg shadow-lg">
                        <solution.icon className="h-6 w-6" />
                      </div>
                      <span className="text-2xl font-black">{solution.title}</span>
                    </div>
                  </div>
                  <div className="p-10 flex-1 flex flex-col">
                    <p className="text-gray-600 mb-8 flex-1 leading-relaxed">{solution.description}</p>
                    <div className="space-y-4 mb-10">
                      {solution.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3 text-sm font-bold text-charcoal">
                          <div className="h-5 w-5 rounded-full bg-zultys-green/10 flex items-center justify-center">
                            <CheckCircle className="h-3.5 w-3.5 text-zultys-green" />
                          </div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full border-2 border-charcoal/10 text-charcoal hover:bg-zultys-green hover:text-white hover:border-zultys-green font-bold py-6 transition-all">
                      <Link to={solution.link}>
                        Learn More
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Solutions Section - SaaS Style */}
        <section className="py-32 bg-gray-50/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-black text-charcoal mb-6">
                Technology That Works for You
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Whether you need the flexibility of the cloud or the control of an on-premise system, 
                we have the technology and expertise to deliver.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {technologySolutions.map((solution, index) => (
                <div key={index} className="text-center p-10 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-center mb-8">
                      <div className="p-5 bg-gray-50 rounded-2xl group-hover:bg-zultys-green/10 transition-colors duration-500">
                        <solution.icon className="h-10 w-10 text-charcoal group-hover:text-zultys-green transition-colors duration-500" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-charcoal mb-4">{solution.title}</h3>
                    <p className="text-gray-500 leading-relaxed mb-6">{solution.description}</p>
                  </div>
                  <Link to={solution.link} className="inline-flex items-center justify-center text-sm font-black text-zultys-green hover:text-zultys-green/80 transition-colors mt-auto gap-1">
                    Explore Solution
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlights Section - SaaS Style */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
              <div className="relative group">
                <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_ZAC_MOBILE_COMBO}
                    alt="Zultys ZAC and Mobile Integration"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div>
                <div className="inline-block bg-zultys-green/10 text-zultys-green px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Unified Communications
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-charcoal mb-8 leading-tight">
                  One Platform, <br />
                  <span className="text-zultys-green">Infinite Possibilities.</span>
                </h2>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                  Zultys unified communications (UC) integrates all your business communication tools 
                  into a single, easy-to-use platform. No more switching between apps for calls, 
                  video, and chat.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    { title: 'Voice & Video', description: 'Crystal-clear HD audio and video conferencing.', icon: Video },
                    { title: 'Presence & Chat', description: 'Real-time availability and secure messaging.', icon: MessageSquare },
                    { title: 'Mobile Integration', description: 'Take your extension anywhere with mobile apps.', icon: Smartphone },
                    { title: 'Call Analytics', description: 'Gain insights with detailed reporting.', icon: BarChart3 },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-zultys-green/10 transition-colors">
                        <feature.icon className="h-6 w-6 text-charcoal" />
                      </div>
                      <div>
                        <h4 className="font-black text-charcoal mb-1">{feature.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block bg-zultys-gold/10 text-zultys-gold px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Deployment Flexibility
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-charcoal mb-8 leading-tight">
                  Cloud or On-Premise: <br />
                  <span className="text-zultys-gold">Your Choice.</span>
                </h2>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                  Whether you prefer the flexibility of a <strong>hosted Zultys business phone system</strong> or the control of an on-site <strong>Zultys MX series business communications solution</strong>, we have the expertise to deliver.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-zultys-green/30 transition-colors group">
                    <Cloud className="h-10 w-10 text-charcoal mb-6 group-hover:text-zultys-green transition-colors" />
                    <h4 className="text-xl font-black text-charcoal mb-2">Cloud Hosted</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Secure, scalable, and managed by experts.</p>
                  </div>
                  <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-zultys-green/30 transition-colors group">
                    <Server className="h-10 w-10 text-charcoal mb-6 group-hover:text-zultys-green transition-colors" />
                    <h4 className="text-xl font-black text-charcoal mb-2">On-Premise</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Maximum control and data sovereignty.</p>
                  </div>
                </div>
              </div>
              <div className="relative order-1 lg:order-2 group">
                <div className="absolute -inset-4 bg-zultys-gold/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <ImageWithFallback
                    src={ZULTYS_CLOUD_SERVICES}
                    alt="Zultys Cloud Services"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-xs animate-float">
                  <div className="flex items-center gap-3 text-zultys-green font-black mb-3">
                    <Shield className="h-6 w-6" />
                    <span className="text-lg">Secure & Reliable</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Enterprise-grade encryption and 99.99% uptime guarantee for your peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supporting Images Section - SaaS Style */}
        <section className="py-32 bg-gray-50/50 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[16/9] group">
                <ImageWithFallback
                  src={SUPPORT_TEAM}
                  alt="Customer Support Team"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent flex items-end p-10">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-3">Expert Local Support</h3>
                    <p className="text-gray-300 text-lg">Our team is always here to help you optimize your Zultys solution.</p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[16/9] group">
                <ImageWithFallback
                  src={PEOPLE_ON_CALLS}
                  alt="Business Professionals Collaborating"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent flex items-end p-10">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-3">Seamless Collaboration</h3>
                    <p className="text-gray-300 text-lg">Connect your workforce across Dallas-Fort Worth effortlessly.</p>
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
                  Zultys Solutions Fort Worth: Tailored Communication for Dallas-Fort Worth Businesses
                </h2>
                
                <p className="text-xl leading-relaxed mb-8">
                  At DFW Business Communications, we provide comprehensive <strong>Zultys solutions Fort Worth</strong> businesses trust to power their daily operations. Our expertise in designing and deploying industry-specific unified communications platforms has made us the #1 choice for VoIP and PBX solutions across the Dallas-Fort Worth metroplex. We understand that a law firm in Dallas has different communication needs than a medical practice in Fort Worth, which is why we specialize in tailored Zultys configurations that address your specific challenges.
                </p>

                <h3 className="text-2xl mb-4 mt-10">
                  The Strategic Advantage of Unified Communications in North Texas
                </h3>
                <p className="leading-relaxed mb-6">
                  In the competitive <strong>North Texas business environment</strong>, having a unified communication strategy is a significant strategic advantage. DFW Business Communications helps Dallas and Fort Worth organizations move beyond fragmented communication tools and embrace a single, cohesive platform. By integrating voice, video, messaging, and collaboration into one Zultys system, your DFW enterprise can achieve higher levels of efficiency and responsiveness.
                </p>
                <p className="leading-relaxed mb-8">
                  Our local Fort Worth experts understand that communication is the lifeblood of your business. We design Zultys solutions that not only connect your team but also empower them to serve your DFW customers better. From improved call handling to seamless remote collaboration, the strategic benefits of Zultys unified communications are clear for any North Texas organization looking to grow and succeed.
                </p>

                <h2 className="text-3xl mb-6 mt-12">
                  Industry-Specific VoIP Solutions in Dallas-Fort Worth
                </h2>
                
                <p className="leading-relaxed mb-6">
                  Our <strong>VoIP phone systems Dallas DFW</strong> expertise extends across diverse business sectors. For healthcare providers, we deploy HIPAA-compliant Zultys solutions that ensure secure patient communication and seamless integration with medical practice management software. Our <strong>Zultys healthcare Fort Worth</strong> installations include features like secure messaging and automated patient reminders that improve clinic efficiency and patient satisfaction.
                </p>

                <p className="leading-relaxed mb-8">
                  For legal professionals, our <strong>Zultys legal Dallas</strong> solutions provide the confidentiality and documentation capabilities law firms require. Features like robust call recording, detailed call logging for billing, and secure voicemail ensure that every client interaction is professionally handled and properly documented. We also specialize in <strong>Zultys real estate DFW</strong> deployments, keeping agents connected in the field with MXmobile integration and intelligent call routing that ensures no lead is ever missed.
                </p>

                {/* Collapsible Content */}
                {showFullContent && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <h3 className="text-2xl mb-4 mt-10">
                      Enterprise-Grade Technology for Every Business Size
                    </h3>

                    <p className="leading-relaxed mb-6">
                      Whether you're a small startup or a large corporation, our <strong>business phone solutions Fort Worth</strong> scale to meet your needs. We provide <strong>Zultys enterprise DFW</strong> solutions that support thousands of users across multiple locations, as well as cost-effective packages for small businesses with 5-20 employees. Our "all-in-one" Zultys architecture means even small businesses can enjoy enterprise features like auto-attendants, call queues, and video conferencing without the enterprise price tag.
                    </p>

                    <p className="leading-relaxed mb-6">
                      For educational institutions, our <strong>Zultys education Fort Worth</strong> solutions provide campus-wide paging, emergency notification systems, and parent-teacher communication portals. Retail and automotive businesses throughout Dallas-Fort Worth rely on our <strong>Zultys retail Dallas</strong> configurations to coordinate across multiple store locations and manage customer service inquiries efficiently.
                    </p>

                    <h3 className="text-2xl mb-4 mt-10">
                      Cloud, On-Premise, and Hybrid Deployment Options
                    </h3>

                    <p className="leading-relaxed mb-6">
                      We offer flexible deployment models for our <strong>VoIP solutions Dallas</strong>. Our cloud-hosted Zultys platform provides maximum flexibility and minimal upfront investment, making it ideal for modern, agile businesses. For organizations requiring complete control and data sovereignty, our on-premise Zultys MX servers deliver unmatched reliability and security. We also specialize in hybrid deployments that combine the best of both worlds for multi-location businesses throughout the DFW metroplex.
                    </p>

                    <h3 className="text-2xl mb-4 mt-10">
                      Optimizing Your DFW Business Workflows with Zultys Integrations
                    </h3>
                    <p className="leading-relaxed mb-6">
                      One of the most powerful aspects of our <strong>Zultys solutions in Fort Worth</strong> is their ability to integrate with your existing business applications. DFW Business Communications specializes in optimizing your North Texas workflows by connecting Zultys with CRM systems, ERP platforms, and other critical software. This integration ensures that your Dallas or Fort Worth team has the information they need at their fingertips during every client interaction.
                    </p>
                    <p className="leading-relaxed mb-6">
                      By automating data exchange and streamlining communication processes, we help your DFW organization eliminate manual tasks and reduce errors. Our local experts work closely with your IT team to ensure a seamless integration that drives productivity and improves the overall customer experience for your North Texas business.
                    </p>

                    <h3 className="text-2xl mb-4 mt-10">
                      The Future of Business Communication in the Dallas-Fort Worth Metroplex
                    </h3>
                    <p className="leading-relaxed mb-6">
                      As we look toward the <strong>future of business communication in DFW</strong>, we see a continued shift toward more intelligent and integrated solutions. DFW Business Communications is committed to helping North Texas organizations stay ahead of these trends by providing the latest Zultys innovations. From AI-enhanced call routing to advanced mobile collaboration tools, we ensure that your Dallas or Fort Worth business is always equipped with the best technology available.
                    </p>
                    <p className="leading-relaxed mb-6">
                      We believe that the future of communication is about more than just technology; it's about creating more meaningful connections. Our goal is to provide the tools and support needed to help your DFW enterprise build stronger relationships with its customers and its team. Trust DFW Business Communications to be your guide to the future of communication in North Texas.
                    </p>

                    <h3 className="text-2xl mb-4 mt-10">
                      Why Local Expertise is Critical for Your DFW Communication Strategy
                    </h3>
                    <p className="leading-relaxed mb-6">
                      When it comes to your <strong>DFW communication strategy</strong>, local expertise is critical. DFW Business Communications brings a deep understanding of the North Texas business landscape to every project. We know the challenges faced by organizations in Dallas and Fort Worth, and we have the experience to design solutions that deliver real results in our region.
                    </p>
                    <p className="leading-relaxed mb-6">
                      Our local Fort Worth presence means we are always there when you need us, providing the kind of hands-on support and personalized attention that national providers simply cannot match. Trust our team of certified Zultys experts to help you build a more connected and successful North Texas organization through the power of world-class technology and local service.
                    </p>

                    <h2 className="text-3xl mb-6 mt-12">
                      Why DFW Businesses Choose Our Zultys Solutions
                    </h2>

                    <p className="leading-relaxed mb-6">
                      What sets our <strong>Zultys solutions Fort Worth</strong> apart is our commitment to local expertise and support. We don't just sell technology; we solve business problems. Our certified technicians handle every aspect of your solution—from initial design and network optimization to professional installation and comprehensive user training. When you partner with DFW Business Communications, you're getting a local Fort Worth partner invested in your long-term success.
                    </p>

                    <div className="mt-12 p-10 bg-gray-50 rounded-3xl border border-gray-100">
                      <h2 className="text-3xl font-black text-charcoal mb-4">
                        Ready for a Communication Solution That Works?
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        Discover how our tailored <strong>Zultys solutions Fort Worth</strong> can improve your business efficiency, reduce costs, and enhance customer service. From industry-specific VoIP to complete unified communications, we have the expertise to deliver.
                      </p>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Contact DFW Business Communications today at <strong className="text-zultys-green">817-231-2962</strong> for a free solution design consultation. Let us build the perfect communication platform for your Dallas-Fort Worth business.
                      </p>
                    </div>
                  </div>
                )}

                {/* Read More / Read Less Button */}
                <div className="mt-12 text-center">
                  <Button
                    onClick={() => setShowFullContent(!showFullContent)}
                    variant="outline"
                    size="lg"
                    className="border-2 border-charcoal/10 text-charcoal hover:bg-zultys-green hover:text-white hover:border-zultys-green px-10 py-6 font-black transition-all"
                  >
                    {showFullContent ? 'Read Less' : 'Read More'} 
                    <ArrowRight className={`ml-2 h-6 w-6 transition-transform duration-500 ${showFullContent ? 'rotate-90' : ''}`} />
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
