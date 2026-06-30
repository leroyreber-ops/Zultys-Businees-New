import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  HeartPulse, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Clock, 
  Phone,
  Stethoscope,
  Activity,
  Smartphone
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_FORT_WORTH_BG,
  SUPPORT_TEAM,
  PEOPLE_ON_CALLS,
} from '../constants/images';

export function Healthcare() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys Healthcare Solutions | Medical Office Phone Systems Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Zultys healthcare solutions for medical offices in Fort Worth and Dallas. HIPAA compliant, reliable, and efficient communication systems for DFW healthcare providers.';
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
    metaKeywords.setAttribute('content', 'healthcare phone system Dallas, medical office VoIP Fort Worth, HIPAA compliant phone system DFW, Zultys healthcare, patient communication North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/healthcare-communications-solutions');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys Healthcare Communication Solutions',
      description: 'Specialized, HIPAA-compliant communication systems for healthcare providers in Dallas-Fort Worth.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'DFW Business Communications'
      },
      areaServed: 'Dallas-Fort Worth'
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
          title={<>Zultys Solutions for <span className="text-zultys-green">Healthcare.</span></>}
          subtitle="Reliable, HIPAA-compliant communication systems designed to improve patient care and streamline medical office operations in DFW."
          icon={HeartPulse}
          iconLabel="Healthcare Communications"
          buttonText="Request Healthcare Consultation"
          onButtonClick={openQuote}
        />

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Enhancing Patient Care & Efficiency</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Zultys provides the tools healthcare providers need to stay connected and compliant.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'HIPAA Compliant',
                  description: 'Secure, encrypted communications that help your DFW medical practice maintain HIPAA compliance.',
                  icon: Shield,
                },
                {
                  title: 'Patient Experience',
                  description: 'Improve patient satisfaction with professional auto-attendants, call queuing, and faster response times.',
                  icon: Users,
                },
                {
                  title: 'Staff Mobility',
                  description: 'Keep your medical staff connected across the clinic or hospital with Zultys mobile and wireless solutions.',
                  icon: Activity,
                },
              ].map((benefit, index) => (
                <Card key={index} className="p-8 border-slate-200 hover:border-blue-500 transition-colors">
                  <div className="p-3 bg-blue-100 rounded-xl w-fit mb-6">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section 1: Introduction */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Zultys Healthcare Solutions: Critical Communications for DFW Medical Providers
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    In the healthcare industry, communication is more than just a convenience—it's a vital component of patient care. For medical practices, clinics, and hospitals in the Dallas-Fort Worth area, the ability to connect patients with providers quickly, securely, and reliably is essential. <strong>Zultys healthcare solutions Fort Worth</strong> are designed to meet the unique and demanding requirements of the medical community, providing a robust communication platform that enhances patient care and streamlines office operations.
                  </p>
                  <p>
                    From the moment a patient calls to schedule an appointment to the follow-up care provided by clinical staff, every interaction matters. A missed call or a delayed message can have serious consequences. Zultys provides a unified communications environment that ensures no call goes unanswered and every message is delivered to the right person at the right time. Whether you are a small private practice in Fort Worth or a large, multi-location healthcare system in Dallas, Zultys delivers the enterprise-grade tools you need to succeed in the DFW market.
                  </p>
                  <p>
                    At DFW Business Communications, we have extensive experience working with healthcare providers across North Texas. We understand the regulatory environment, the operational challenges, and the critical importance of uptime in a medical setting. We are dedicated to providing <strong>HIPAA-compliant medical office phone systems</strong> that allow you to focus on what matters most—your patients. Our local presence in the DFW metroplex means we can provide rapid, on-site support and a level of personal service that national providers simply can't match.
                  </p>
                  <p>
                    Our approach to healthcare communications is holistic. We don't just provide a phone system; we provide a complete communication strategy that aligns with your practice's goals. We work closely with your clinical and administrative teams to ensure that your Zultys solution is optimized for your specific workflows, providing the maximum return on your investment and the best possible care for your DFW patients.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-100 p-4">
                  <ImageWithFallback
                    src={PEOPLE_ON_CALLS}
                    alt="Healthcare Communications Solutions DFW"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 2: HIPAA Compliance */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">HIPAA Compliance and Data Security: A Top Priority for DFW Providers</h2>
              <p className="text-xl text-gray-600">
                Protecting patient privacy is not just a best practice—it's the law. Zultys provides the security features needed to maintain compliance in North Texas.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                For any healthcare provider in the DFW area, HIPAA compliance is a constant concern. Your communication system must protect Protected Health Information (PHI) at every stage. The <strong>Zultys MX platform</strong> is built with security as a core principle, providing the encryption and access controls needed to support your compliance efforts and protect your DFW practice from costly penalties.
              </p>
              <p>
                Zultys supports encrypted voice traffic (SRTP) and signaling (TLS), ensuring that conversations cannot be intercepted. Furthermore, features like secure instant messaging allow staff to collaborate on patient care without using unencrypted, non-compliant chat apps. Voicemails and call recordings are stored securely on the Zultys appliance, with strict access controls to ensure that only authorized personnel can access them in your North Texas clinic.
              </p>
              <p>
                In addition to technical security features, Zultys also provides comprehensive auditing and reporting capabilities. This allows you to track system activity and identify potential security risks before they become a problem. You can also generate reports to demonstrate compliance with regulatory requirements, providing peace of mind for your DFW healthcare organization.
              </p>
              <p>
                Key security features for DFW healthcare providers include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">End-to-End Encryption</strong>
                  Protect voice and data transmissions from unauthorized access with industry-standard encryption. This is vital for maintaining patient confidentiality in DFW.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Secure Messaging</strong>
                  Allow staff to communicate instantly and securely about patient care within the Zultys environment, avoiding the risks of consumer-grade apps in North Texas.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Audit Trails</strong>
                  Maintain detailed logs of system access and activity to support your HIPAA auditing requirements and ensure accountability in your DFW practice.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Role-Based Access</strong>
                  Ensure that employees only have access to the communication tools and data needed for their specific roles, minimizing the risk of internal data breaches in DFW.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 3: Patient Experience */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900 p-4">
                  <ImageWithFallback
                    src={SUPPORT_TEAM}
                    alt="Improving Patient Experience with Zultys"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Improving the Patient Experience: From First Call to Follow-up in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    A patient's perception of your practice often begins with their first phone call. If they are met with a busy signal, a long hold time, or a confusing menu, their experience is already compromised. <strong>Zultys healthcare solutions</strong> provide the tools needed to ensure a professional and efficient patient interaction every time, enhancing your reputation in the North Texas medical community.
                  </p>
                  <p>
                    Advanced auto-attendants can provide patients with quick access to common information, such as office hours or directions to your DFW clinic, while professional call queuing ensures that they are handled in the order they were received. If hold times are high, the system can offer a "callback" option, allowing the patient to hang up and receive a call when an agent is available, respecting their time and reducing frustration.
                  </p>
                  <p>
                    Zultys also supports integrated patient portals and appointment scheduling tools, allowing patients to interact with your practice on their own terms. This level of convenience is a major factor in patient satisfaction and loyalty in the competitive DFW healthcare market.
                  </p>
                  <p>
                    Furthermore, Zultys' <strong>Patient Engagement</strong> tools allow for automated follow-up calls and satisfaction surveys. This proactive approach shows patients that you value their feedback and are committed to their ongoing health and well-being. In the DFW area, where patients have many choices for their healthcare, these small touches can make a significant difference in retention and word-of-mouth referrals.
                  </p>
                  <p>
                    For DFW medical offices, these features lead to:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Reduced Abandonment Rates:</strong> Keep patients in the loop and offer convenient callback options, ensuring you don't lose potential patients in DFW.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Faster Response Times:</strong> Route calls to the right department or staff member instantly, improving the efficiency of your North Texas office.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Professional Image:</strong> Project a high level of care and organization from the very first greeting, setting your DFW practice apart.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Telemedicine and Remote Consultations */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Telemedicine and Remote Consultations: Expanding Access in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    The healthcare landscape has shifted, and patients now expect the convenience of remote consultations. <strong>Zultys telemedicine solutions</strong> allow DFW providers to offer high-quality video consultations directly through their unified communications platform. This eliminates the need for expensive, standalone telemedicine software and provides a seamless experience for both patients and providers in North Texas.
                  </p>
                  <p>
                    Zultys' integrated video conferencing is secure and HIPAA-compliant, ensuring that patient privacy is protected during remote visits. Providers can easily initiate video calls from their ZAC desktop client or MXmobile app, while patients can join from any device with a web browser. This flexibility is essential for reaching patients across the vast DFW metroplex, including those in rural areas or with limited mobility.
                  </p>
                  <p>
                    Telemedicine with Zultys also supports screen sharing, allowing providers to review lab results, imaging, or educational materials with patients in real-time. This interactive approach improves patient understanding and engagement, leading to better health outcomes for your DFW practice.
                  </p>
                  <p>
                    Key benefits of Zultys telemedicine for DFW providers:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Increased Access:</strong> Reach patients across North Texas who may have difficulty traveling to your physical DFW location.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Improved Efficiency:</strong> Reduce "no-shows" and optimize provider schedules with convenient remote visits.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Enhanced Patient Satisfaction:</strong> Offer the convenience and flexibility that modern DFW patients demand.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-4 border border-slate-200">
                  <ImageWithFallback
                    src="https://picsum.photos/seed/healthcare/1200/800"
                    alt="Telemedicine Video Consultation DFW"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Emergency Notifications and Campus Safety */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Emergency Notifications and Campus Safety in DFW</h2>
              <p className="text-xl text-gray-600">
                In a healthcare setting, every second counts. Zultys provides the critical notification tools needed to ensure safety across your North Texas facility.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                Whether it's a medical emergency, a security threat, or a severe weather event in the DFW area, your staff needs to be notified instantly. <strong>Zultys emergency notification systems</strong> allow you to broadcast critical alerts across your entire facility—including desk phones, mobile devices, and overhead paging systems—with the touch of a button.
              </p>
              <p>
                Zultys integrates with third-party mass notification platforms, allowing you to reach staff and patients through multiple channels, including SMS, email, and desktop alerts. This multi-layered approach ensures that your message is received, regardless of where staff are located in your DFW clinic or hospital.
              </p>
              <p>
                For DFW healthcare providers, safety features include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Panic Buttons</strong>
                  Discreetly trigger emergency alerts from desk phones or mobile apps in your DFW office.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Overhead Paging</strong>
                  Broadcast clear, audible alerts across your entire North Texas facility instantly.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">E911 Support</strong>
                  Ensure that emergency responders are provided with the exact location of a 911 call within your DFW building.
                </li>
                <li className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Lockdown Procedures</strong>
                  Automate security protocols and notifications during a critical event in your North Texas clinic.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 4: Office Operations */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl font-bold mb-6">Streamlining Medical Office Operations in DFW</h2>
              <p className="text-xl text-white">
                Efficiency in the front office leads to better care in the exam room. Zultys automates and simplifies your daily communication tasks in North Texas.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p>
                  The administrative burden on medical office staff is significant. Managing appointments, handling insurance inquiries, and coordinating with pharmacies can be overwhelming. The <strong>Zultys MX platform</strong> includes features designed to automate many of these tasks for your DFW practice. For example, integrated appointment reminder systems can automatically call or text patients to confirm their visits, reducing "no-shows" and freeing up staff for other duties in your North Texas office.
                </p>
                <p>
                  Zultys also simplifies internal communication. Presence awareness allows front-office staff to see if a doctor or nurse is available before attempting to transfer a call or send a message. Integrated instant messaging allows for quick, silent communication between staff members, even when they are with patients in your DFW clinic. This reduces interruptions and allows for a more focused and efficient care environment.
                </p>
              </div>
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p>
                  For DFW healthcare providers, these operational efficiencies translate into a more calm and productive office environment. At DFW Business Communications, we work with your team to identify bottlenecks and implement <strong>Zultys features</strong> that streamline your specific workflows and enhance your practice's overall performance in North Texas.
                </p>
                <p>
                  We ensure that your system is configured to support your unique needs, from custom call routing for after-hours emergencies to integrated fax-to-email for secure document handling in the DFW metroplex. Our goal is to provide you with a communication platform that works as hard as you do.
                </p>
                <p>
                  We also provide ongoing support and maintenance for your DFW healthcare system, ensuring that it is always operating at peak efficiency and that your staff has the tools they need to provide the best possible care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 5: Staff Mobility */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Mobility for Doctors and Clinical Staff in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    Healthcare providers are rarely sitting at a desk. They are moving between exam rooms, visiting patients in the hospital, or managing care from home. The <strong>Zultys MXmobile app</strong> ensures that they stay connected to the office phone system wherever they are in the Dallas-Fort Worth area.
                  </p>
                  <p>
                    With MXmobile, a doctor can receive calls to their office extension directly on their smartphone. They can also make calls using the office caller ID, protecting their personal cell phone number and maintaining a professional image. The app also provides access to the corporate directory, presence information, and secure instant messaging, allowing for seamless collaboration with the rest of the medical team in North Texas.
                  </p>
                  <p>
                    Zultys also supports a variety of wireless handsets, including DECT and Wi-Fi options, providing mobility within the clinic or hospital environment. This ensures that staff can remain reachable even when they are away from their workstations, improving response times and patient care in DFW.
                  </p>
                  <p>
                    For DFW medical practices, this mobility is a game-changer:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Always Reachable:</strong> Ensure that critical calls reach the right provider, regardless of their location in the DFW metroplex.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Privacy Protection:</strong> Keep personal cell numbers private while staying fully connected to your North Texas practice.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Improved Collaboration:</strong> Consult with colleagues and access office resources from anywhere in DFW.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <Smartphone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold">MXmobile</h4>
                  <p className="text-sm text-gray-600">Full office extension on your smartphone for DFW providers.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <Activity className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">Wireless</h4>
                  <p className="text-sm text-gray-600">DECT and Wi-Fi handsets for in-clinic mobility in North Texas.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">Collaboration</h4>
                  <p className="text-sm text-gray-600">Stay connected with your entire medical team in DFW.</p>
                </div>
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold">Speed</h4>
                  <p className="text-sm text-gray-600">Instant access to critical information and people in North Texas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 6: EHR Integration */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Integration with EHR and Practice Management Systems in DFW</h2>
              <p className="text-xl text-gray-600">
                Connect your communications with your patient data for a more informed and efficient practice in North Texas.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                Information is the lifeblood of modern healthcare. The <strong>Zultys Advanced Communicator (ZAC)</strong> can be integrated with many popular Electronic Health Record (EHR) and Practice Management systems used by DFW providers. This integration allows for powerful features like "screen pop," where the patient's record is automatically displayed on the staff member's screen when they call.
              </p>
              <p>
                This allows your team to greet the patient by name, quickly review their recent history, and provide a much higher level of personalized service in your North Texas clinic. It also saves time by eliminating the need to manually search for patient records while on the phone, improving the overall efficiency of your DFW practice.
              </p>
              <p>
                Zultys also supports integration with other healthcare-specific tools, such as appointment reminder systems and patient portal software. This ensures that your communication system is a central part of your DFW practice's digital ecosystem, rather than just another isolated tool.
              </p>
              <p>
                For DFW healthcare providers, this integration means:
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Personalized Patient Care:</strong> Have all the relevant information at your fingertips before you even answer the call in your DFW office.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Improved Efficiency:</strong> Reduce call times and administrative overhead by automating record lookups in your North Texas practice.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Better Data Accuracy:</strong> Ensure that call notes and interaction history are correctly associated with the patient record in your DFW system.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 7: Reliability */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Reliability and Business Continuity for Critical Care in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    In a medical setting, downtime is not an option. Your patients must be able to reach you 24/7, especially in an emergency. The <strong>Zultys MX platform</strong> is designed for maximum reliability, with built-in redundancy and failover capabilities. Whether you choose an on-premise appliance or a cloud-based solution, Zultys ensures that your communications remain functional for your DFW practice.
                  </p>
                  <p>
                    For DFW healthcare providers, this means that even in the event of a local power outage or internet failure, your calls can be automatically rerouted to other locations or mobile devices. Your auto-attendants and voicemails continue to operate, ensuring that your patients are never left without a way to reach you in North Texas.
                  </p>
                  <p>
                    Zultys also supports geographically distributed survivability, allowing you to maintain communication continuity even during a major regional outage in the Dallas-Fort Worth area. This level of resilience is essential for mission-critical healthcare operations.
                  </p>
                  <p>
                    At DFW Business Communications, we provide proactive monitoring and support for your <strong>Zultys healthcare system</strong>, ensuring that it is always performing at its best and ready for any situation in the DFW metroplex.
                  </p>
                </div>
              </div>
              <div className="bg-blue-900 rounded-3xl p-12 text-white shadow-2xl">
                <Shield className="h-16 w-16 text-blue-400 mb-8" />
                <h3 className="text-3xl font-bold mb-6">Healthcare Reliability</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Redundant Hardware Options for DFW Practices</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Automatic Call Failover & Rerouting in North Texas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>24/7 System Monitoring & Support for DFW Providers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Disaster Recovery & Business Continuity Planning for DFW</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Proven Uptime in Critical Care Environments across North Texas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 8: Why Choose DFW Business Communications */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">Your Local Zultys Healthcare Partner in Fort Worth and Dallas</h2>
            <div className="prose prose-xl prose-invert mx-auto max-w-4xl text-white">
              <p>
                When you choose DFW Business Communications for your <strong>Zultys healthcare solution</strong>, you are choosing a partner with a deep understanding of the North Texas medical community. We've been serving the Dallas-Fort Worth area for over 20 years, and we pride ourselves on providing the highest level of local, personal service to our DFW healthcare clients.
              </p>
              <p>
                From the initial system design and HIPAA-compliance review to the final staff training and ongoing support, we are with you every step of the way. We know that in healthcare, every detail matters, and we are dedicated to ensuring that your communication system supports your mission of providing excellent patient care in the DFW metroplex.
              </p>
              <p>
                Our local presence in Fort Worth allows us to provide rapid, on-site support and a level of personal attention that national providers simply can't match. We are committed to your long-term success and work with you to continuously optimize your Zultys solution as your DFW practice grows and evolves.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <HeartPulse className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Healthcare Expertise in DFW</h4>
                <p className="text-white">We understand the unique communication and compliance needs of medical providers operating in North Texas.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Shield className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">HIPAA Compliance for DFW</h4>
                <p className="text-white">We ensure that your system is configured to meet the highest standards of patient privacy in the DFW area.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">24/7 Local DFW Support</h4>
                <p className="text-white">Our Fort Worth based team is always available to support your critical care operations across the DFW metroplex.</p>
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
