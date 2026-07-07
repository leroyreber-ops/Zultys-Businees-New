import React, { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ZULTYS_FORT_WORTH_BG, ZULTYS_ZAC_MOBILE_COMBO, ZULTYS_ZIP_45G_EASE, OFFICE_COMMUNICATION } from '../constants/images';
import { Award, ShieldCheck, Check, Sparkles, Phone, MessageSquare, HeartPulse } from 'lucide-react';

export function CloudVoipSystemsDallas() {
  useEffect(() => {
    document.title = 'Cloud VoIP Systems Dallas | Authorized Zultys DFW Partner';
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Discover professional cloud voip systems dallas solutions for Dallas-Fort Worth businesses. Get a customized quote, free on-site installation, and 3 months free!';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Hero 
        title={<span className="text-white block font-black leading-tight">Cloud VoIP Systems Dallas</span>}
        subtitle="Transform your office communications with #1 rated Zultys IP solutions, local DFW network engineering, and premium zero-downtime VoIP migrations."
        icon={Award}
        iconLabel="Authorized DFW Zultys Partner"
        buttonText="Get Instant Free Quote"
        onButtonClick={() => {
          const btn = document.querySelector('[data-testid="quote-cta-btn"]');
          if (btn) (btn as HTMLElement).click();
        }}
      />

      <section className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-10 md:gap-16">
          <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="h-5 w-5 text-emerald-500" /> HIPAA Compliant Architecture
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
            <HeartPulse className="h-5 w-5 text-indigo-500" /> Local 24/7 Expert Support
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="h-5 w-5 text-amber-500" /> 3 Months Free Office Promotion
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Elite Cloud VoIP Systems Dallas Services
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Dallas-Fort Worth businesses require rock-solid communication channels to support team operations, customer outreach, and remote workers. Our specialized Zultys configurations bring enterprise-grade unified communications directly to your offices with maximum quality of service.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-emerald-50 rounded-full border border-emerald-200 mt-1">
                  <Check className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Unified Zultys Mobile ZAC &amp; Desktop Integrations</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-emerald-50 rounded-full border border-emerald-200 mt-1">
                  <Check className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Full HIPAA compliance and military-grade voice encryption</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-emerald-50 rounded-full border border-emerald-200 mt-1">
                  <Check className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Zero-downtime number porting and dedicated installer teams</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-500/10 rounded-[2.5rem] blur-2xl opacity-50"></div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 bg-white p-6">
              <ImageWithFallback 
                src={ZULTYS_ZAC_MOBILE_COMBO}
                alt="Zultys MX-SE and ZIP 45G VoIP office deployment"
                className="w-full h-auto object-contain max-h-[360px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center px-6 space-y-8 relative z-10">
          <h3 className="text-3xl font-black tracking-tight leading-tight">
            Ready to Elevate Your Dallas Cloud VoIP Performance?
          </h3>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Get premium hardware, secure network diagnostics, and localized DFW engineering starting today. Receive &lt;strong&gt;3 Months Free&lt;/strong&gt; with any Zultys cloud plan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => {
                const btn = document.querySelector('[data-testid="quote-cta-btn"]');
                if (btn) (btn as HTMLElement).click();
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Phone className="h-4 w-4" /> Get Free Site Audit
            </button>
            <button
              onClick={() => {
                const btn = document.querySelector('[data-testid="quote-cta-btn"]');
                if (btn) (btn as HTMLElement).click();
              }}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" /> Contact local offices
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
