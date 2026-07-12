import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle, Shield, Phone, Activity, Clock, Stethoscope, ArrowLeft } from 'lucide-react';
import { HashLink as Link } from '../components/HashLink';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND, OFFICE_COMMUNICATION } from '../constants/images';

export function CaseStudyHealthcare() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Dallas Healthcare Zultys Migration Case Study | HIPAA VoIP Metrics';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Explore how a multi-location North Texas medical group migrated to Zultys, achieving a 91% reduction in missed patient calls, secure HIPAA-compliant mobile routing, and 100% voice survivability.';
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
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/case-studies/healthcare-zultys-migration-dallas');

    // JSON-LD Schema (WebPage + BreadcrumbList)
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://dallasfortworthzultys.com/case-studies/healthcare-zultys-migration-dallas',
          'url': 'https://dallasfortworthzultys.com/case-studies/healthcare-zultys-migration-dallas',
          'name': 'Healthcare Zultys Migration Case Study',
          'description': 'How a multi-location North Texas medical group migrated to Zultys, achieving HIPAA compliance and exceptional uptime.',
          'publisher': {
            '@type': 'Organization',
            'name': 'DFW Business Communications',
            'url': 'https://dallasfortworthzultys.com'
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://dallasfortworthzultys.com/case-studies/healthcare-zultys-migration-dallas#breadcrumb',
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
              'name': 'Case Studies',
              'item': 'https://dallasfortworthzultys.com/case-studies'
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': 'Healthcare Migration Case Study',
              'item': 'https://dallasfortworthzultys.com/case-studies/healthcare-zultys-migration-dallas'
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Back navigation & Header */}
        <section className="bg-slate-900 pt-32 pb-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img src={HERO_BACKGROUND} alt="Dallas Healthcare Zultys Migration Background" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-zultys-green hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-wider">
              <ArrowLeft className="h-4 w-4" /> Back to Case Studies
            </Link>
            
            <div className="inline-flex items-center gap-2 bg-zultys-green/20 backdrop-blur-md px-3 py-1.5 rounded-full mb-6 border border-zultys-green/30">
              <Stethoscope className="h-4 w-4 text-zultys-green" />
              <span className="text-xs font-black text-white uppercase tracking-wider">Healthcare Success Portfolio</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              HIPAA-Compliant VoIP Migration: <br />
              <span className="text-zultys-green">91% Missed Call Reduction for DFW Medical Group.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mb-10 leading-relaxed">
              How a multi-clinic North Texas cardiovascular group consolidated 4 separate clinical sites, established secure mobile routing for medical practitioners, and solved a crippling missed call issue with a unified Zultys VoIP platform.
            </p>
          </div>
        </section>

        {/* Executive Summary Metrics Grid */}
        <section className="bg-slate-100 py-12 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="sr-only">Performance Metrics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Missed Call Rate', value: '1.8%', sub: 'Reduced from 22%', icon: Phone },
                { label: 'Patient Hold Times', value: '-64%', sub: 'Under 45 seconds avg', icon: Clock },
                { label: 'Staff Coordination', value: 'Instant', sub: 'Unified clinical presence', icon: Activity },
                { label: 'Security & Compliance', value: '100%', sub: 'Fully encrypted PHI', icon: Shield }
              ].map((metric, i) => (
                <Card key={i} className="p-6 bg-white border-slate-200 hover:shadow-lg transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{metric.label}</span>
                      <metric.icon className="h-5 w-5 text-zultys-green" />
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1">{metric.value}</div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 mt-2 block">{metric.sub}</span>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Content */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-16">
              {/* Detailed Narrative */}
              <div className="lg:col-span-2 space-y-12 text-slate-700 leading-relaxed text-base md:text-lg">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6">The Client Profile</h2>
                  <p className="mb-4">
                    The client is a leading independent cardiovascular medical group based in the Dallas-Fort Worth metroplex. Across <strong>four major physical clinic locations</strong> (Dallas, Fort Worth, Arlington, and Plano) and a dedicated cardiac rehabilitation lab, their 38 medical providers and 110 supporting clinical staff serve over 25,000 patients annually.
                  </p>
                  <p>
                    With patient communications being the primary gateway to critical cardiovascular care, their incoming call infrastructure requires absolute, non-negotiable reliability, 24/7/365 survivability, and compliance with federal HIPAA privacy regulations.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6">The Challenge: Lost Patient Dials & Fragile Call Handling</h2>
                  <p className="mb-4">
                    Prior to their migration, the group operated a legacy on-premise analog key-system at two sites, alongside two different cloud-only providers at their newer locations. This fragmented setup created immense friction:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 mb-6">
                    <li>
                      <strong>High Call Abandonment:</strong> Due to a lack of multi-site trunk pooling and poor queue reporting, patient calls frequently went unanswered during peak morning booking hours. Audits showed an average <strong>22% missed call rate</strong>.
                    </li>
                    <li>
                      <strong>HIPAA Compliance Risks:</strong> Doctors frequently needed to communicate patient updates on the go, but their remote communications occurred via personal mobile phones without encrypted logging or official business number masking.
                    </li>
                    <li>
                      <strong>Single-Point-of-Failure:</strong> The cloud-only sites regularly experienced call drops when local internet service suffered latency spikes or outages, cutting off patients from reaching emergency advice.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6">The Solution: Centralized Zultys MX Architecture</h2>
                  <p className="mb-4">
                    DFW Business Communications designed and deployed a cohesive enterprise-grade communication system based on <strong>Zultys MX Series hardware appliances</strong>.
                  </p>
                  <p className="mb-6">
                    By installing a central Zultys MX250 system paired with virtualized local survivability at each individual clinic, we achieved:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="p-6 bg-slate-50 border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-2">HIPAA-Compliant MXmobile Apps</h4>
                      <p className="text-sm">Enabled secure, fully encrypted mobile voice communication and internal secure instant messaging for clinicians, routing call metadata through the Zultys secure controller.</p>
                    </Card>
                    <Card className="p-6 bg-slate-50 border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-2">Multi-Site Smart Queues</h4>
                      <p className="text-sm">Pooled all inbound trunk capacity across North Texas, routing overflow patients to administrative queues dynamically across sites to slash answer delay.</p>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6">VoIP Performance Metrics & Outcomes</h2>
                  <p className="mb-4">
                    Following the complete migration to Zultys, the medical group reported exceptional, verifiable results:
                  </p>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-800">
                          <th className="p-4">Operational Metric</th>
                          <th className="p-4">Legacy Setup</th>
                          <th className="p-4 bg-zultys-green/10 text-slate-950">Zultys Platform</th>
                          <th className="p-4">Improvement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-100">
                          <td className="p-4 font-bold">Patient Call Miss/Abandonment Rate</td>
                          <td className="p-4">22.4%</td>
                          <td className="p-4 font-bold bg-zultys-green/5">1.8%</td>
                          <td className="p-4 text-zultys-green font-bold">91.9% Reduction</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="p-4 font-bold">Average Patient Hold Time</td>
                          <td className="p-4">2m 14s</td>
                          <td className="p-4 font-bold bg-zultys-green/5">41 seconds</td>
                          <td className="p-4 text-zultys-green font-bold">69.4% Faster</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="p-4 font-bold">Inter-Clinic Call Transfer Cost</td>
                          <td className="p-4">Metered/Incurred</td>
                          <td className="p-4 font-bold bg-zultys-green/5">$0.00 (On-Net)</td>
                          <td className="p-4 text-zultys-green font-bold">100% Free</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-bold">System Voice Survivability (Local Outages)</td>
                          <td className="p-4">0% (Outage = Dead lines)</td>
                          <td className="p-4 font-bold bg-zultys-green/5">100% (Instant failover)</td>
                          <td className="p-4 text-zultys-green font-bold">Absolute Uptime</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Sidebar Info Card */}
              <div className="space-y-8">
                <Card className="p-8 border-slate-200 bg-slate-50 sticky top-28">
                  <h3 className="text-xl font-black text-slate-900 mb-6 border-b border-slate-200 pb-4">Project Overview</h3>
                  <div className="space-y-6 text-sm">
                    <div>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Industry Sector</span>
                      <strong className="text-slate-800 text-base flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-zultys-green" /> Healthcare / Medical Clinics
                      </strong>
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Scale of Deployment</span>
                      <strong className="text-slate-800 text-base">4 Physical Sites | 148 Connected Endpoints</strong>
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Deployment Mode</span>
                      <strong className="text-slate-800 text-base">Hybrid Zultys MX250 with Active-Active Failover</strong>
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Compliance Target</span>
                      <strong className="text-slate-800 text-base text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle className="h-4 w-4" /> HIPAA Certified Voice Routing
                      </strong>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-4">Ready to consolidate your medical offices securely?</h4>
                    <Button
                      onClick={openQuote}
                      className="w-full bg-zultys-green hover:bg-zultys-green/90 text-white font-bold py-6 rounded-xl"
                    >
                      Request Healthcare Quote
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Industry QA FAQ Accordion Section */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 text-center mb-12">Healthcare VoIP Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Are Zultys VoIP phone systems fully HIPAA compliant?',
                  a: 'Yes. Zultys systems support secure TLS/SRTP voice encryption to safeguard call data, administrative control logs, secure visual voicemail routing, and dynamic PIN restrictions to meet standard HIPAA requirements for protecting health information (PHI).'
                },
                {
                  q: 'What happens to our patient phone lines if our local office internet goes offline?',
                  a: 'By using a hybrid deployment with local MX Series survivability, your system continues to process internal intercom, transfer to cellular masked mobile apps, and auto-route external calls via cellular backup or alternative fiber channels instantly. Patients never receive a busy tone.'
                },
                {
                  q: 'Can we integrate our Electronic Health Record (EHR) database with the phone system?',
                  a: 'Yes, Zultys supports robust CRM and database API integrations, allowing caller-ID screen-pop records so staff can instantly view incoming patient records, appointment times, and medical chart flags before even picking up the handset.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="font-black text-slate-900 mb-2">Q: {faq.q}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">A: {faq.a}</p>
                </div>
              ))}
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
