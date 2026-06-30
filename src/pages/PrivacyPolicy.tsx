import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Shield } from 'lucide-react';

export function PrivacyPolicy() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Privacy Policy | DFW Business Communications';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full mb-8">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Legal Information</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-12">Privacy Policy</h1>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              At DFW Business Communications, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">1. Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Request a quote or consultation via our contact forms.</li>
              <li>Sign up for our newsletter or blog updates.</li>
              <li>Contact us directly via phone or email.</li>
            </ul>
            <p>
              This information may include your name, company name, email address, phone number, and any other details you provide regarding your business communication needs.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide you with the information, quotes, or services you request.</li>
              <li>Communicate with you about our Zultys products and solutions.</li>
              <li>Improve our website and customer service.</li>
              <li>Comply with legal and regulatory requirements.</li>
            </ul>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">3. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">4. Disclosure to Third Parties</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">5. HIPAA Compliance</h2>
            <p>
              For our healthcare clients, we handle Protected Health Information (PHI) in strict accordance with HIPAA regulations. Please refer to our <a href="/hipaa-compliant-voip" className="text-blue-600 hover:underline">HIPAA Compliance page</a> for more details on how Zultys systems protect patient data.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">6. Changes to Our Privacy Policy</h2>
            <p>
              DFW Business Communications reserves the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">7. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, you may contact us using the information below:
            </p>
            <p className="font-bold">
              DFW Business Communications<br />
              Fort Worth, Texas<br />
              Email: info@dallasfortworthzultys.com<br />
              Phone: 817-231-2962
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
