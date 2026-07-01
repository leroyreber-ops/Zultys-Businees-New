import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  BookOpen, 
  Download, 
  ArrowRight, 
  Monitor, 
  Smartphone, 
  Phone, 
  Settings, 
  Shield, 
  Zap, 
  Users, 
  Video,
  FileText
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND } from '../constants/images';

const guides = [
  {
    category: 'End User Guides',
    items: [
      { title: 'ZAC (Zultys Advanced Communicator) User Guide', type: 'PDF', size: '2.4 MB', icon: Monitor },
      { title: 'MXmobile for iPhone/Android User Guide', type: 'PDF', size: '1.8 MB', icon: Smartphone },
      { title: 'Zultys ZIP 49G IP Phone Quick Start', type: 'PDF', size: '1.2 MB', icon: Phone },
      { title: 'Zultys ZIP 47G IP Phone Quick Start', type: 'PDF', size: '1.1 MB', icon: Phone },
      { title: 'Zultys ZIP 45G IP Phone Quick Start', type: 'PDF', size: '1.1 MB', icon: Phone },
      { title: 'Zultys ZIP 43G IP Phone Quick Start', type: 'PDF', size: '1.0 MB', icon: Phone }
    ]
  },
  {
    category: 'System Administrator Guides',
    items: [
      { title: 'MX Administrator Guide (v17.x)', type: 'PDF', size: '12.5 MB', icon: Settings },
      { title: 'MX Virtual Appliance Installation Guide', type: 'PDF', size: '4.2 MB', icon: Zap },
      { title: 'Zultys Contact Center Admin Guide', type: 'PDF', size: '6.8 MB', icon: Users },
      { title: 'MXconference & MXmeeting Admin Guide', type: 'PDF', size: '3.5 MB', icon: Video }
    ]
  }
];

export function UserGuides() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Zultys User Guides & Manuals | DFW Business Communications Resources';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Download official Zultys user guides, manuals, and quick start instructions for ZIP phones, ZAC software, and MXmobile. Expert resources for DFW businesses.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dallasfortworthzultys.com/zultys-user-guides');
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Zultys User Guides and Manuals',
      description: 'A collection of downloadable user guides and manuals for Zultys products.',
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
        <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 opacity-20">
            <img src={HERO_BACKGROUND} alt="Authorized Zultys Phone Systems and Cloud VoIP Installation in User Guides, Texas" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-blue-500/30">
              <BookOpen className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Resource Center</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Zultys User Guides & Manuals: <br />
              <span className="text-blue-400">Official Resources for DFW Businesses.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Mastering your Zultys communication system is easy with the right documentation. 
              This comprehensive resource center provides official Zultys user guides, 
              technical manuals, and quick start instructions for ZIP phones, ZAC software, 
              and MXmobile applications. Whether you're an end-user in Dallas looking to 
              set up voicemail or a system administrator in Fort Worth managing a 
              complex contact center, these downloadable PDFs offer the detailed 
              information you need to maximize your organization's communication efficiency.
            </p>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {guides.map((category, catIdx) => (
              <div key={catIdx} className="mb-20 last:mb-0">
                <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
                  <div className="h-2 w-12 bg-blue-600 rounded-full"></div>
                  {category.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((guide, gIdx) => (
                    <Card key={gIdx} className="p-8 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col group">
                      <div className="p-4 bg-blue-50 rounded-2xl mb-6 w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                        <guide.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-4 flex-1">{guide.title}</h3>
                      <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{guide.type} • {guide.size}</span>
                        <Button 
                          variant="ghost" 
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-black flex items-center gap-2"
                          asChild
                        >
                          <a href="#">
                            Download <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Section */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Need Personalized Training?</h2>
            <p className="text-xl text-slate-600 mb-12">Our Fort Worth team provides on-site or remote training sessions for your entire staff.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-8 font-black rounded-xl shadow-2xl"
              >
                Schedule Training
              </Button>
              <Link to="/fort-worth-zultys-training">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-xl px-10 py-8 font-black rounded-xl"
                >
                  View Training Services
                </Button>
              </Link>
            </div>

            <div className="mt-24 max-w-4xl mx-auto prose prose-lg text-slate-700 text-left">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Deep Dive: Maximizing Your Zultys Investment with Expert Resources</h2>
              <p>
                Having access to the right manuals is just the beginning. To truly leverage the power of Zultys for your DFW business, it's important to understand the depth of features available in these guides.
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">ZAC (Zultys Advanced Communicator) Mastery</h3>
              <p>
                The ZAC user guide is your roadmap to unified communications. It covers everything from basic call handling and instant messaging to advanced features like drag-and-drop call transfers, visual voicemail, and integrated video conferencing. For Dallas-based teams, mastering ZAC means significantly reducing "communication friction" and improving daily productivity.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">MXmobile: Your Office in Your Pocket</h3>
              <p>
                Our MXmobile guides ensure that your remote or mobile workforce in Fort Worth, Arlington, or Plano stays fully connected. These manuals provide step-by-step instructions on setting up your business extension on your iPhone or Android device, managing presence status, and accessing corporate directories securely from anywhere.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Administrator Resources for IT Managers</h3>
              <p>
                For IT professionals in the DFW Metroplex, our system administrator guides provide the technical depth needed to manage a Zultys MX series appliance. From initial network configuration and security hardening to managing complex contact center workflows, these manuals are essential for maintaining a high-performance communication environment.
              </p>

              <div className="mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-3xl font-black text-slate-900 mb-8">User Guide FAQs</h2>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Are these the latest versions of the Zultys manuals?</h4>
                    <p className="text-slate-600">Yes, we regularly update our resource center with the most current documentation from Zultys to ensure you have accurate information for the latest software releases (v17.x and beyond).</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Do you have guides for older Zultys phone models?</h4>
                    <p className="text-slate-600">While we focus on current ZIP 4 series phones, we do maintain an archive of manuals for legacy ZIP 3 and ZIP 5 series devices. If you need a specific older guide, please contact our Fort Worth support team.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Can I get printed copies of these guides?</h4>
                    <p className="text-slate-600">To support sustainability, we provide these as digital PDFs. However, they are formatted for easy printing if you prefer to have a physical copy at your DFW office workstations.</p>
                  </div>
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
