import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { ServiceAreas } from '../components/ServiceAreas';
import { FAQ } from '../components/FAQ';
import { Comparison } from '../components/Comparison';
import { LocalBusinessSchema } from '../components/LocalBusinessSchema';
import { useSEO } from '../hooks/useSEO';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ZultysLogo } from '../components/ZultysLogo';
import { AuthorizedPartnerBadge } from '../components/AuthorizedPartnerBadge';
import { ROICalculator } from '../components/ROICalculator';
import {
  OFFICE_COMMUNICATION,
  SUPPORT_TEAM,
  PEOPLE_ON_CALLS,
  ZULTYS_MX250,
  ZULTYS_ZIP_45G,
  ZULTYS_ZIP_49G,
  ZULTYS_IP_PHONES_BG,
  ZULTYS_ZAC_MOBILE_COMBO,
  ZULTYS_MX_MOBILE,
  ZULTYS_FORT_WORTH_BG,
} from '../constants/images';
import {
  Phone,
  Cloud,
  MessageSquare,
  Video,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Star,
  Building2,
  Headphones,
  Clock,
  DollarSign,
  Target,
  Handshake,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Home() {
  const { openQuote } = useQuote();

  useSEO({
    title: 'Fort Worth Zultys Dealer | #1 Zultys Partner Dallas-Fort Worth',
    description: "Fort Worth's #1 authorized Zultys dealer. Expert phone system installation, support & sales in Dallas-Fort Worth. Local DFW support. Call 817-231-2962.",
    keywords: 'Fort Worth Zultys, Dallas Zultys dealer, Zultys partner Fort Worth, Zultys phone system Dallas, Zultys MX250 Fort Worth, Zultys dealer DFW, Fort Worth VoIP, Dallas business phone systems, Zultys authorized partner, DFW Zultys installation',
    canonicalUrl: 'https://dallasfortworthzultys.com/',
    ogTitle: 'Fort Worth Zultys Dealer | #1 Zultys Partner Dallas-Fort Worth',
    ogDescription: "Fort Worth's #1 Zultys dealer & authorized partner. Expert installation, support & sales. Best pricing on Zultys MX250, MX30, MX-SE. Local DFW support.",
    twitterTitle: 'Fort Worth Zultys Dealer | #1 Zultys Partner Dallas-Fort Worth',
    twitterDescription: "Fort Worth's #1 Zultys dealer & authorized partner. Expert installation, support & sales. Best pricing on Zultys MX250, MX30, MX-SE.",
  });

  const benefits = [
    'Reduce telecommunication costs by up to 60%',
    'Scale instantly as your business grows',
    '99.99% uptime SLA guarantee',
    '24/7 local Fort Worth support',
    'Mobile apps for iOS and Android',
    'Easy integration with existing tools',
    'Advanced call analytics and reporting',
    'Voicemail-to-email transcription',
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Fort Worth Businesses Served' },
    { icon: TrendingUp, value: '99.99%', label: 'System Uptime' },
    { icon: Award, value: '15+', label: 'Years of Experience' },
    { icon: Phone, value: '10,000+', label: 'Active Lines Managed' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <LocalBusinessSchema path="/" />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Compact & Unified Layout */}
        <section className="relative bg-slate-950 overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
          {/* Background Image with vivid, colorful professional gradients & grid */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <ImageWithFallback
              src={ZULTYS_FORT_WORTH_BG}
              alt="Dallas Fort Worth Skyline"
              className="w-full h-full object-cover opacity-65"
            />
            {/* Soft, professional gradient overlay using Zultys Green & Gold brand tones */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-emerald-950/40"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,168,45,0.15),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,160,23,0.12),transparent_50%)]"></div>
            {/* Tech dot grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 w-full">
            {/* Main Row: Left content column and Right interactive artwork column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              <div className="lg:col-span-7">
                {/* Authorized Partner Badge */}
                <Link to="/about" className="inline-flex items-center gap-2 bg-zultys-green/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-zultys-green/30 hover:bg-zultys-green/30 transition-all group">
                  <Award className="h-5 w-5 text-zultys-green group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-white uppercase tracking-widest">Authorized Zultys Partner DFW</span>
                </Link>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.15] text-white tracking-tight drop-shadow-2xl">
                  Zultys Business Phone Systems in Dallas–Fort Worth
                </h1>
                
                <p className="text-lg md:text-xl lg:text-2xl mb-8 text-slate-200/95 leading-relaxed max-w-xl font-medium">
                  Enterprise‑grade VoIP, cloud calling, and unified communications built for North Texas organizations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <Button
                    size="lg"
                    onClick={openQuote}
                    className="bg-zultys-gold hover:bg-zultys-gold/90 text-slate-950 text-xl px-10 py-7 shadow-[0_20px_50px_rgba(212,160,23,0.3)] transition-all font-black uppercase tracking-wider rounded-xl border-none hover:scale-[1.03] active:scale-95 animate-[pulse_3s_ease-in-out_infinite]"
                  >
                    Request a Free Quote
                  </Button>
                  <a 
                    href="tel:817-231-2962" 
                    className="text-center inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-lg px-8 py-4 font-bold transition-all rounded-xl hover:scale-[1.02] active:scale-95"
                  >
                    <Phone className="h-5 w-5 text-zultys-green animate-pulse" />
                    Call 817-231-2962
                  </a>
                </div>
              </div>

              {/* Right Column: Connected Cloud Telecommunications Interactive Artwork Card */}
              <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
                <div className="relative w-full max-w-lg p-6 rounded-[2rem] bg-slate-900/85 backdrop-blur-xl border border-white/15 shadow-[0_50px_100px_-20px_rgba(0,168,45,0.3)] overflow-hidden">
                  {/* Neon Glow Effects */}
                  <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-zultys-green/20 blur-[80px]"></div>
                  <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-zultys-gold/20 blur-[80px]"></div>
                  
                  {/* Tech grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

                  <div className="relative space-y-6">
                    {/* Title & Pulse Indicator */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zultys-green opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-zultys-green"></span>
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">Zultys Cloud Core Active</span>
                      </div>
                      <span className="text-[10px] font-mono text-zultys-gold bg-zultys-gold/10 px-2.5 py-1 rounded-full border border-zultys-gold/20">DFW Cluster</span>
                    </div>

                    {/* SVG Network Cloud Telephony Diagram */}
                    <div className="relative h-44 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 220">
                        <defs>
                          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00A82D" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#D4A017" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>
                        
                        {/* Connection Lines with Pulsing Dash Array */}
                        <path d="M 60 60 L 200 110" stroke="url(#lineGrad)" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_20s_linear_infinite]" />
                        <path d="M 60 160 L 200 110" stroke="url(#lineGrad)" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_25s_linear_infinite]" />
                        <path d="M 340 60 L 200 110" stroke="url(#lineGrad)" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_18s_linear_infinite]" />
                        <path d="M 340 160 L 200 110" stroke="url(#lineGrad)" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_22s_linear_infinite]" />
                        
                        {/* Central Cloud Orbit */}
                        <circle cx="200" cy="110" r="44" fill="#000000" fillOpacity="0.3" stroke="#00A82D" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_40s_linear_infinite]" />

                        {/* Endpoint Nodes */}
                        <g className="translate-x-[40px] translate-y-[40px] cursor-pointer">
                          <circle cx="20" cy="20" r="16" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
                          <path d="M 14 17 L 14 23 M 17 20 L 23 20" stroke="#00A82D" strokeWidth="2" />
                        </g>
                        <g className="translate-x-[40px] translate-y-[140px] cursor-pointer">
                          <circle cx="20" cy="20" r="16" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
                          <rect x="15" y="14" width="10" height="12" rx="1.5" stroke="#D4A017" strokeWidth="1.5" fill="none" />
                        </g>
                        <g className="translate-x-[320px] translate-y-[40px] cursor-pointer">
                          <circle cx="20" cy="20" r="16" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
                          <path d="M 15 25 L 15 17 L 20 13 L 25 17 L 25 25 Z" stroke="#00A82D" strokeWidth="1.5" fill="none" />
                        </g>
                        <g className="translate-x-[320px] translate-y-[140px] cursor-pointer">
                          <circle cx="20" cy="20" r="16" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
                          <path d="M 14 20 A 6 6 0 0 1 26 20 M 26 20 L 26 24" stroke="#D4A017" strokeWidth="1.5" fill="none" />
                        </g>
                      </svg>
                      
                      <div className="relative z-10 p-4 bg-slate-950/90 rounded-full border border-zultys-green shadow-[0_0_40px_rgba(0,168,45,0.4)] animate-[pulse_3s_ease-in-out_infinite]">
                        <Cloud className="h-10 w-10 text-zultys-green" />
                      </div>
                    </div>

                    {/* Equalizer Feed */}
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">SIP Jitter Feed</span>
                        <span className="text-[9px] font-mono text-zultys-green font-bold">12ms (Excellent)</span>
                      </div>
                      <div className="flex items-end justify-center gap-1.5 h-8 px-2">
                        {[30, 60, 45, 90, 75, 40, 80, 55, 95, 65, 35, 70, 50, 85, 40, 60].map((h, i) => (
                          <div 
                            key={i} 
                            className="w-1 bg-zultys-green rounded-full transition-all duration-300"
                            style={{ 
                              height: `${h}%`,
                              animation: `bounceEqualizer ${1 + (i % 3) * 0.3}s ease-in-out infinite alternate`,
                              animationDelay: `${i * 0.05}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Active Features Badges */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-black text-white">99.999%</span>
                        <span className="text-[8px] font-black uppercase text-slate-400 mt-0.5">Uptime SLA</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-black text-zultys-green">AES-256</span>
                        <span className="text-[8px] font-black uppercase text-slate-400 mt-0.5">Encrypted</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-black text-zultys-gold">QoS VoIP</span>
                        <span className="text-[8px] font-black uppercase text-slate-400 mt-0.5">Priority</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Redesigned smaller, eye-catching, glowing circles with crisp titles underneath */}
            <div className="mt-16 md:mt-20 pt-10 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-items-center">
                {[
                  { 
                    title: 'Zultys Phone Systems', 
                    icon: Phone, 
                    link: '/fort-worth-zultys-business-phone-systems',
                    gradient: 'from-emerald-400 to-green-600',
                    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_35px_rgba(16,185,129,0.75)]',
                    textColor: 'group-hover:text-emerald-400',
                  },
                  { 
                    title: 'Cloud Phone Systems', 
                    icon: Cloud, 
                    link: '/fort-worth-zultys-cloud-services',
                    gradient: 'from-sky-400 to-blue-600',
                    glow: 'shadow-[0_0_20px_rgba(56,189,248,0.4)] group-hover:shadow-[0_0_35px_rgba(56,189,248,0.75)]',
                    textColor: 'group-hover:text-sky-400',
                  },
                  { 
                    title: 'VOIP Solutions', 
                    icon: MessageSquare, 
                    link: '/fort-worth-zultys-voip-phone-system',
                    gradient: 'from-amber-400 to-zultys-gold',
                    glow: 'shadow-[0_0_20px_rgba(212,160,23,0.4)] group-hover:shadow-[0_0_35px_rgba(212,160,23,0.75)]',
                    textColor: 'group-hover:text-zultys-gold',
                  },
                  { 
                    title: 'Business Connectivity', 
                    icon: Zap, 
                    link: '/solutions',
                    gradient: 'from-rose-400 to-red-600',
                    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)] group-hover:shadow-[0_0_35px_rgba(239,68,68,0.75)]',
                    textColor: 'group-hover:text-rose-400',
                  },
                ].map((service, index) => (
                  <Link key={index} to={service.link} className="block group">
                    <div className="flex flex-col items-center text-center">
                      {/* Interactive Colored Circle */}
                      <div className="relative mb-4">
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 12 }}
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${service.gradient} ${service.glow} text-white flex items-center justify-center relative z-10 border border-white/20 transition-all duration-300`}
                        >
                          <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" strokeWidth={2} />
                        </motion.div>
                        
                        {/* Outer Pulse Ring */}
                        <div className="absolute inset-0 rounded-full bg-white/5 scale-110 -z-0 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none"></div>
                      </div>
                      
                      {/* Clear Readable Label Directly Underneath */}
                      <h3 className={`text-xs sm:text-sm font-extrabold text-slate-100 tracking-wide uppercase leading-tight max-w-[140px] sm:max-w-[160px] transition-colors duration-300 ${service.textColor}`}>
                        {service.title}
                      </h3>
                      
                      {/* Short helper/guide line */}
                      <span className="text-[10px] text-slate-400 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        View Details &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section - Logos */}
        <section className="py-12 border-y border-gray-100 bg-gray-50/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
              Trusted by 500+ North Texas Organizations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholder for client logos - using descriptive text for now as per instructions */}
              <div className="text-xl font-black text-charcoal">HEALTHCARE</div>
              <div className="text-xl font-black text-charcoal">LEGAL</div>
              <div className="text-xl font-black text-charcoal">EDUCATION</div>
              <div className="text-xl font-black text-charcoal">RETAIL</div>
              <div className="text-xl font-black text-charcoal">GOVERNMENT</div>
            </div>
          </div>
        </section>

        {/* Why Choose Zultys Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="py-24 bg-white"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
                Why choose Zultys in Dallas–Fort Worth
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  Zultys gives DFW businesses an enterprise‑grade phone system without the complexity and cost of old PBX hardware. You get a single unified communications platform for voice, video, messaging, and contact center, all tied to your business numbers and extensions. As your local Zultys partner in Dallas–Fort Worth, we help you match the right Zultys solution to the way your team actually works, whether they’re in one office, spread across the Metroplex, or working remotely. Our focus is simple: dependable call quality, easy day‑to‑day management, and features that directly support sales, service, and operations.
                </p>
                <p>
                  In the competitive North Texas market, having a reliable communication backbone is essential. Whether you are a small startup in Frisco or a large healthcare provider in Fort Worth, Zultys provides the scalability and flexibility required to stay ahead. Our team ensures that your transition to Zultys is smooth, with minimal disruption to your daily activities. We handle the technical heavy lifting so you can focus on what you do best—running your business.
                </p>
                <p>
                  With Zultys, you're not just getting a phone system; you're getting a comprehensive toolset designed to enhance collaboration and productivity. From advanced call routing to seamless mobile integration, every feature is built with the user in mind. Experience the difference that a truly unified platform can make for your DFW organization. We understand that every call could be a potential new client or a critical support request, which is why we prioritize reliability above all else.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-zultys-green/10 blur-3xl rounded-full"></div>
                <ImageWithFallback 
                  src={ZULTYS_IP_PHONES_BG} 
                  alt="Zultys Business Phone Systems Dallas Fort Worth" 
                  className="relative w-full h-auto rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ROI Calculator Section */}
        <ROICalculator
          productName="Zultys Cloud Business Phones"
          zultysPrice={250}
          competitorPrice={380}
          zultysMonthly={35}
          competitorMonthly={55}
          productType="phone"
          onOpenContactForm={openQuote}
        />

        {/* Features Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="py-24 bg-gray-50"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
                Features DFW companies actually use every day
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-zultys-gold/10 blur-3xl rounded-full"></div>
                <ImageWithFallback 
                  src={ZULTYS_ZAC_MOBILE_COMBO} 
                  alt="Zultys VoIP phone systems DFW features" 
                  className="relative w-full h-auto rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
              <div className="order-1 lg:order-2 prose prose-lg text-gray-600 max-w-none">
                <p>
                  Most businesses don’t need complicated telecom jargon—they need features that make daily work easier. With a Zultys business phone system, Dallas–Fort Worth companies get powerful but practical tools: automated attendants to route calls quickly, call queues for busy departments, voicemail‑to‑email so nothing gets missed, mobile apps for on‑the‑go staff, and detailed call reporting for management.
                </p>
                <p>
                  Unified communications tools like presence, instant messaging, and conferencing are built into the same Zultys platform, so your team can move from a chat to a call to a screen share without switching systems. We configure these features around your current call flows so your customers experience faster, more professional service from day one. Imagine a scenario where a client calls your main office in Dallas, and the call is seamlessly routed to a technician in the field in Arlington, all without the client ever knowing they were transferred.
                </p>
                <p>
                  This level of professionalism is what Zultys brings to the table. Our call reporting tools provide valuable insights into peak call times and agent performance, allowing you to make data-driven decisions to improve your customer service. The Zultys mobile app ensures that your team is always reachable, whether they are at a client site, traveling between DFW locations, or working from home. By unifying all your communication channels, Zultys eliminates the silos that often hinder efficiency and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

                  {/* Cloud vs On-Premise Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="py-24 bg-white"
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
                  Cloud and on‑premise Zultys phone systems for DFW
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    Every business in Dallas–Fort Worth is at a different stage of its technology journey, so there’s no one‑size‑fits‑all phone deployment. Zultys supports both cloud‑hosted and on‑premise business phone systems, and we help you pick the model that fits your budget, risk tolerance, and IT environment. A Zultys cloud phone system is ideal if you want minimal hardware, predictable monthly costs, and easy support for remote work.
                  </p>
                  <p>
                    On‑premise Zultys systems make sense when you need tighter control, specific integrations, or have existing infrastructure you want to leverage. Our team walks you through the pros and cons for your specific DFW business and designs a Zultys deployment that can grow with you. For many DFW companies, the cloud offers a path to modernization without the need for significant capital expenditure. It provides the agility to scale up or down as business needs change, which is particularly valuable in the dynamic North Texas economy.
                  </p>
                  <p>
                    On the other hand, some organizations prefer the security and control of an on-premise solution, especially those in highly regulated industries like finance or healthcare. Regardless of the deployment model you choose, Zultys delivers the same high-quality features and reliable performance. We ensure that your system is configured for maximum uptime and security, providing you with peace of mind. Our local experts are here to support you every step of the way, from initial design to ongoing maintenance and upgrades.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-zultys-green/5 blur-3xl rounded-full"></div>
                  <ImageWithFallback 
                    src={ZULTYS_MX_MOBILE} 
                    alt="Cloud and on-premise Zultys deployments in Dallas Fort Worth" 
                    className="relative w-full h-auto rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.section>

        {/* Industries Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="py-24 bg-charcoal text-white"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Zultys solutions for DFW industries
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-zultys-green/10 blur-3xl rounded-full"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Healthcare', icon: Shield },
                    { name: 'Legal', icon: Award },
                    { name: 'Retail', icon: Target },
                    { name: 'Service', icon: Headphones },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                      <item.icon className="h-8 w-8 text-zultys-green mx-auto mb-4" />
                      <span className="font-bold text-white">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 prose prose-lg prose-invert text-white max-w-none prose-headings:text-white prose-strong:text-white">
                <p>
                  Zultys business phone systems are flexible enough to support a wide range of industries across Dallas–Fort Worth. Professional offices and service firms use Zultys for clear call handling and reliable voicemail. Multi‑location retailers and franchises rely on Zultys to centralize communications across several sites. Healthcare practices and clinics use call queues, auto‑attendants, and secure messaging to keep patient communication organized.
                </p>
                <p>
                  Contractors, logistics companies, and field service teams use the Zultys mobile apps to stay reachable on the road without exposing personal cell numbers. Whatever your industry, we design your Zultys configuration around the way your staff and customers actually communicate day to day. In the legal sector, features like call recording and confidential voicemail are essential for maintaining client trust and meeting compliance requirements.
                </p>
                <p>
                  For DFW real estate agencies, the ability to seamlessly transfer calls to agents in the field can be the difference between closing a deal and losing a lead. Educational institutions in North Texas use Zultys to improve communication between staff, parents, and students, with features like mass notification and easy-to-use directories. Our deep understanding of the DFW business landscape allows us to provide tailored solutions that address the specific challenges of your industry.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Implementation Process Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="py-24 bg-white"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
                Our local Zultys implementation process
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  As a dedicated Zultys partner in Dallas–Fort Worth, we handle the full lifecycle of your business phone project. We start with a discovery call to understand how your phones work today, which numbers and locations you have, and what’s not working. Then we design a Zultys call flow and extension plan that matches your departments, hours, and escalation paths.
                </p>
                <p>
                  Our team manages porting your existing phone numbers, installing phones and network gear as needed, and configuring your Zultys system for go‑live. After launch, we provide local training for your staff and ongoing support so you’re never stuck waiting on a distant call center when something needs to be adjusted. Our implementation process is designed to be as non-disruptive as possible. We understand that your business can't afford downtime, so we plan every step carefully.
                </p>
                <p>
                  From the initial site survey to the final user training, our goal is to ensure a smooth and successful transition. We take pride in our local presence, which allows us to provide on-site support and personalized service that national providers simply can't match. When you have a question or need an adjustment, you can call us directly and speak with someone who knows your system and your business. This commitment to local service is why so many DFW companies trust us with their communication needs.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-zultys-gold/10 blur-3xl rounded-full"></div>
                <ImageWithFallback 
                  src={SUPPORT_TEAM} 
                  alt="Our local Zultys implementation process in DFW" 
                  className="relative w-full h-auto rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Service Areas Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="py-24 bg-gray-50"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
                Service areas across Dallas–Fort Worth
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-zultys-green/10 blur-3xl rounded-full"></div>
                <ImageWithFallback 
                  src={OFFICE_COMMUNICATION} 
                  alt="Zultys service areas across Dallas Fort Worth" 
                  className="relative w-full h-auto rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
              <div className="order-1 lg:order-2 prose prose-lg text-gray-600 max-w-none">
                <p>
                  We provide Zultys business phone systems and unified communications support to companies across the Dallas–Fort Worth Metroplex. Our service area includes Dallas, Fort Worth, Arlington, Plano, Irving, Grand Prairie, Frisco, Lewisville, Denton, and surrounding North Texas communities. Whether you have a single office in Fort Worth or multiple locations spread across DFW, we can design one integrated Zultys platform that ties everything together.
                </p>
                <p>
                  If you’re expanding into new offices, opening branches, or consolidating older phone systems, we’ll build a plan that keeps your numbers and call handling consistent across every location. Our local expertise means we understand the specific networking and telecommunications challenges in the DFW area. We work with local carriers to ensure your number porting is handled correctly and your voice traffic is prioritized for maximum quality.
                </p>
                <p>
                  As your business grows and expands into new parts of the Metroplex, we are here to support you with scalable solutions that grow with you. Whether you are moving into a new high-rise in downtown Dallas or opening a warehouse in South Fort Worth, we have the experience and resources to ensure your communications are seamless. Trust the local Zultys experts to keep your DFW business connected and productive in every corner of North Texas.
                </p>
              </div>
            </div>
          </div>
        </motion.section>


        
        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
                Frequently asked questions about Zultys in DFW
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-8">
              {[
                {
                  q: "How is a Zultys system different from my old phone system?",
                  a: "Unlike legacy PBX systems, Zultys is a true unified communications platform. It combines voice, video, chat, and mobile apps into one system. This eliminates the need for separate vendors and ensures your team can collaborate seamlessly from any device, whether in a Dallas office or working remotely in Fort Worth."
                },
                {
                  q: "Can I keep my existing business phone numbers?",
                  a: "Yes! We handle the entire number porting process for you. We work with your current Dallas or Fort Worth carriers to move your existing business numbers over to the Zultys platform with zero downtime during the transition."
                },
                {
                  q: "Is Zultys a good fit for small businesses, or just larger companies?",
                  a: "Zultys is highly scalable. We have successfully deployed Zultys systems for small DFW startups with 5 users and large enterprise organizations with over 500 users. You only pay for what you need, and you can easily add lines as your business grows."
                },
                {
                  q: "What kind of internet connection do I need for Zultys VoIP in DFW?",
                  a: "Zultys works with most business-grade internet connections (Fiber, Coax, etc.) available in the DFW area. During our discovery phase, we test your current connection to ensure it has the bandwidth and stability to support high-quality voice traffic."
                },
                {
                  q: "How does Zultys handle remote workers and mobile staff?",
                  a: "Remote work is where Zultys shines. The MXmobile app and ZAC desktop software allow your team to use their business extension from anywhere. They can make calls, join conferences, and chat with colleagues just as if they were sitting at their desk in your main DFW office."
                },
                {
                  q: "What happens if my internet goes down in Dallas or Fort Worth?",
                  a: "We design redundancy into every Zultys deployment. If your primary internet fails, calls can automatically failover to mobile devices or a backup location. For cloud-hosted systems, your auto-attendants and voicemail keep working in the cloud even if your physical office is offline."
                },
                {
                  q: "How long does the installation process typically take for a DFW business?",
                  a: "A typical Zultys implementation in Dallas-Fort Worth takes 2-4 weeks from the initial design to go-live. This timeline includes the time required for number porting, hardware delivery, and system configuration. We manage the entire schedule to ensure a smooth launch."
                }
              ].map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-8">
                  <h3 className="text-xl font-black text-charcoal mb-4 flex items-start gap-3">
                    <span className="text-zultys-green">Q:</span> {faq.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-8">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceAreas />
        <Comparison />
        <FAQ />

        {/* Final CTA Section */}
        <section className="py-24 bg-zultys-green text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Ready to Upgrade Your DFW Business Communications?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-white max-w-3xl mx-auto">
              Don't wait for your old phone system to fail. Schedule a free Zultys consultation today and see how we can help your Dallas–Fort Worth business stay connected.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={openQuote}
                className="bg-white text-slate-950 hover:bg-gray-100 font-black px-12 py-8 text-xl shadow-2xl border-none hover:scale-[1.02] active:scale-95"
              >
                Request a Quote
              </Button>
              <Button
                asChild
                className="bg-zultys-gold hover:bg-zultys-gold/90 text-slate-950 font-black px-12 py-8 text-xl border-none shadow-2xl hover:scale-[1.02] active:scale-95"
              >
                <a href="tel:817-231-2962" className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-slate-950 animate-pulse" />
                  Call 817-231-2962
                </a>
              </Button>
            </div>
            <p className="mt-8 text-lg font-bold opacity-80">
              Talk to a local Zultys communications specialist in DFW.
            </p>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
