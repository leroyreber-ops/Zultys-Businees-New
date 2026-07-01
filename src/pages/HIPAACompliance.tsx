import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Building2, 
  Stethoscope, 
  Users, 
  Zap,
  Shield
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function HIPAACompliance() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'HIPAA Compliant VoIP Dallas Fort Worth | Zultys Healthcare Solutions';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Secure, HIPAA-compliant VoIP and business phone systems for DFW medical practices. Zultys healthcare communication solutions with local North Texas support.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/hipaa-compliant-voip');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'HIPAA Compliant VoIP Solutions',
      description: 'Detailed information on HIPAA-compliant business phone systems for healthcare providers in DFW.',
      publisher: {
        '@type': 'Organization',
        name: 'DFW Business Communications'
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
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 opacity-20">
            <img src={HERO_BACKGROUND} alt="Authorized Zultys Phone Systems and Cloud VoIP Installation in HIPAA Compliance, Texas" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-blue-500/30">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Secure Healthcare Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              HIPAA Compliant VoIP: <br />
              <span className="text-blue-400">Secure Communication for DFW Healthcare.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              For healthcare providers in Dallas, Fort Worth, and the surrounding North Texas 
              communities, maintaining patient privacy is not just a best practice—it's a 
              legal mandate. HIPAA compliant VoIP solutions from Zultys provide the 
              enterprise-grade security, encryption, and administrative controls necessary 
              to protect Protected Health Information (PHI) while empowering your medical 
              staff with modern communication tools. This guide explores how Zultys 
              healthcare solutions meet the strict requirements of the Health Insurance 
              Portability and Accountability Act (HIPAA) and why local DFW support is 
              critical for your practice's compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Request a Security Audit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 text-xl px-10 py-8 font-black rounded-xl backdrop-blur-md"
                asChild
              >
                <a href="tel:817-231-2962">Call 817-231-2962</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Core Compliance Pillars */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Security That Meets the Standard</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">Zultys business phone systems are designed with the strict requirements of the Health Insurance Portability and Accountability Act (HIPAA) in mind.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'End-to-End Encryption',
                  desc: 'All voice calls, video conferences, and instant messages are encrypted using industry-standard protocols (SRTP/TLS) to prevent unauthorized interception.',
                  icon: Lock
                },
                {
                  title: 'Access Controls',
                  desc: 'Robust user authentication and role-based permissions ensure that only authorized personnel can access sensitive call recordings or patient data.',
                  icon: Users
                },
                {
                  title: 'Audit Logging',
                  desc: 'Comprehensive logging of all system activity allows for detailed auditing of who accessed what information and when, a key HIPAA requirement.',
                  icon: FileText
                }
              ].map((pillar, i) => (
                <Card key={i} className="p-10 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-50 rounded-2xl mb-6">
                    <pillar.icon className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{pillar.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{pillar.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Dive Content */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Why HIPAA Compliance Matters for Your DFW Office</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    For medical practices in Dallas, Fort Worth, and Arlington, patient trust is everything. A single data breach or non-compliant communication tool can lead to massive fines and irreparable damage to your reputation.
                  </p>
                  <p>
                    <strong>HIPAA compliant VoIP</strong> is not just about having a secure connection; it's about the entire ecosystem of how patient information is handled. Zultys provides the tools to ensure your staff can communicate effectively while staying within the legal boundaries of patient privacy.
                  </p>
                  <ul className="space-y-4 mt-8">
                    {[
                      'Secure Call Recording with Encrypted Storage',
                      'HIPAA-Ready Video Conferencing for Telehealth',
                      'Secure Instant Messaging for Staff Coordination',
                      'Business Associate Agreement (BAA) Support',
                      'Local DFW Support for Security Configuration'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="HIPAA Compliant Healthcare Communication"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl max-w-xs">
                    <div className="flex items-center gap-3 mb-2">
                      <Stethoscope className="h-6 w-6 text-blue-600" />
                      <span className="font-black text-slate-900 uppercase tracking-widest text-sm">Healthcare Ready</span>
                    </div>
                    <p className="text-slate-600 text-sm font-bold">Trusted by medical clinics across the DFW Metroplex.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24 max-w-4xl mx-auto prose prose-lg text-slate-700">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Deep Dive: Zultys Security Features for Healthcare</h2>
              <p>
                Zultys understands the unique challenges faced by healthcare providers in Dallas and Fort Worth. Our platform is built with a "security-first" mindset to ensure that every patient interaction is protected.
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Encrypted Voice and Data Transmission</h3>
              <p>
                All voice traffic on the Zultys system is encrypted using <strong>Secure Real-time Transport Protocol (SRTP)</strong>, while signaling is protected by <strong>Transport Layer Security (TLS)</strong>. This ensures that patient conversations and sensitive data are unreadable to anyone attempting to intercept the signal over your DFW office's network or the public internet.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Secure Telehealth and Video Conferencing</h3>
              <p>
                Zultys' integrated video conferencing tools are HIPAA-ready, allowing your North Texas medical practice to conduct secure telehealth visits. With end-to-end encryption and robust access controls, you can provide remote care to patients in Plano, Arlington, or anywhere in the DFW area with confidence.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Administrative Controls and Audit Trails</h3>
              <p>
                HIPAA requires strict control over who can access patient data. Zultys provides granular, role-based access controls for system administrators and end-users. Additionally, comprehensive audit logs track every system interaction, providing the documentation needed for compliance reviews and security monitoring in your DFW healthcare facility.
              </p>

              <div className="mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-3xl font-black text-slate-900 mb-8">HIPAA VoIP FAQs</h2>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Does Zultys sign Business Associate Agreements (BAAs)?</h4>
                    <p className="text-slate-600">Yes! As your local DFW partner, we work with Zultys to provide the necessary Business Associate Agreements to ensure your practice remains fully compliant with HIPAA regulations.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Can we use Zultys for secure internal messaging?</h4>
                    <p className="text-slate-600">Absolutely. The ZAC app provides secure, encrypted instant messaging for your staff, allowing for rapid coordination without compromising patient privacy or violating HIPAA standards.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">How do you secure call recordings?</h4>
                    <p className="text-slate-600">Zultys call recordings are stored in an encrypted format with strict access controls. Only authorized personnel in your DFW medical office can listen to or export recordings, ensuring full compliance with PHI protection rules.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Linking Section */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Specialized Healthcare Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/fort-worth-zultys-healthcare" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Building2 className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Healthcare Solutions</h3>
                  <p className="text-slate-600">See how Zultys improves patient care and clinic efficiency.</p>
                </Card>
              </Link>
              <Link to="/fort-worth-zultys-mxmobile" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Zap className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">MXmobile App</h3>
                  <p className="text-slate-600">Secure communication for doctors and staff on the move.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Shield className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Security FAQ</h3>
                  <p className="text-slate-600">Answers to common questions about Zultys security and compliance.</p>
                </Card>
              </Link>
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
