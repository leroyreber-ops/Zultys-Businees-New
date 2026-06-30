import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { FileText } from 'lucide-react';

export function TermsOfService() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Terms of Service | DFW Business Communications';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full mb-8">
            <FileText className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Legal Information</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-12">Terms of Service</h1>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Welcome to DFW Business Communications. By accessing our website or using our services, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">1. Acceptance of Terms</h2>
            <p>
              By using this website, you signify your acceptance of these Terms of Service. If you do not agree to these terms, please do not use our website or services.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">2. Use of Services</h2>
            <p>
              You agree to use our website and services only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use and enjoyment of this site by any third party.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">3. Intellectual Property</h2>
            <p>
              The content on this website, including text, graphics, logos, and images, is the property of DFW Business Communications or its content suppliers and is protected by international copyright laws. Zultys and the Zultys logo are trademarks of Zultys, Inc.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">4. Limitation of Liability</h2>
            <p>
              DFW Business Communications will not be liable for any damages of any kind arising from the use of this website or from any information, content, materials, or products included on this site, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">5. Product Descriptions</h2>
            <p>
              We attempt to be as accurate as possible in our product descriptions. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the State of Texas, and you irrevocably submit to the exclusive jurisdiction of the courts in that State.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">7. Modifications to Terms</h2>
            <p>
              DFW Business Communications reserves the right to change these Terms of Service at any time. Your continued use of the site following any changes shall be deemed to be your acceptance of such change.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
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
