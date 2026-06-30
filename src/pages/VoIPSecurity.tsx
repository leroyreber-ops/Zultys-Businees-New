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
  Lock, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  ShieldCheck, 
  Key, 
  Globe, 
  Server,
  Eye,
  FileCheck
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HERO_BACKGROUND } from '../constants/images';

export function VoIPSecurity() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'VoIP Security & Encryption | Secure Business Phones DFW | DFW Business Communications';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Protect your business communications with Zultys. Discover our advanced VoIP security, encryption, and compliance features for Dallas-Fort Worth organizations.';
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
    metaKeywords.setAttribute('content', 'VoIP security Dallas, encrypted phone system Fort Worth, HIPAA compliant VoIP DFW, Zultys security features Dallas, secure business communication North Texas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/voip-security-encryption');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'VoIP Security and Encryption Guide',
      description: 'A guide to the security features and encryption protocols used in Zultys VoIP systems for DFW businesses.',
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
            <img src={HERO_BACKGROUND} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-blue-500/30">
              <Lock className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">Enterprise Security</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              VoIP Security & Encryption: <br />
              <span className="text-blue-400">Protecting Your DFW Business Communications.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              In an era of increasing cyber threats and sophisticated data breaches, the security 
              of your business phone system is more critical than ever. For Dallas-Fort Worth 
              organizations, VoIP security and enterprise-grade encryption are not just 
              features—they are essential requirements. This comprehensive guide explores how 
              Zultys delivers a hardened communication platform with built-in security 
              protocols, ensuring your voice data, team chat, and customer information 
              remain protected against unauthorized access and malicious attacks.
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

        {/* Security Layers Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Multi-Layered Security Architecture</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">Zultys protects your data at every level, from the device to the server and across the network.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: 'SRTP & TLS Encryption', desc: 'Secure Real-time Transport Protocol and Transport Layer Security ensure your voice and data are encrypted in transit.', icon: Key },
                { title: 'Hardened Linux OS', desc: 'The Zultys MX series runs on a custom-hardened Linux operating system, minimizing the attack surface.', icon: ShieldCheck },
                { title: 'Built-in Firewall', desc: 'Integrated firewall and intrusion prevention systems protect your communication server from unauthorized access.', icon: Shield },
                { title: 'Secure Remote Access', desc: 'Connect remote employees securely without the need for complex and vulnerable VPNs.', icon: Globe },
                { title: 'Role-Based Access', desc: 'Granular administrative controls ensure that only authorized personnel can access sensitive system settings.', icon: Users },
                { title: 'Audit Logging', desc: 'Comprehensive logging of all system activities for compliance and security monitoring.', icon: FileCheck }
              ].map((item, i) => (
                <Card key={i} className="p-10 border-slate-100 hover:shadow-xl transition-all h-full flex flex-col items-center text-center group">
                  <div className="p-4 bg-blue-50 rounded-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    <item.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Meeting Your Industry Compliance Standards</h2>
                <div className="prose prose-lg text-slate-700 max-w-none">
                  <p>
                    Whether you're in healthcare, finance, or legal services, Zultys provides the tools you need to meet strict regulatory requirements.
                  </p>
                  <ul className="space-y-4 mt-8">
                    {[
                      'HIPAA compliance for healthcare providers',
                      'PCI-DSS support for secure payment handling',
                      'SOX compliance for financial reporting',
                      'GDPR readiness for data privacy',
                      'CJIS compliance for law enforcement agencies'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-slate-900">
                        <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 bg-white p-12 flex flex-col items-center justify-center text-center">
                  <ShieldCheck className="h-24 w-24 text-blue-600 mb-8" />
                  <h3 className="text-3xl font-black text-slate-900 mb-4">Secure by Design</h3>
                  <p className="text-slate-500 font-bold uppercase tracking-widest">Trusted by DFW's Most Security-Conscious Organizations</p>
                </div>
              </div>
            </div>

            <div className="mt-24 max-w-4xl mx-auto prose prose-lg text-slate-700">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Deep Dive: How Zultys Hardens Your Communications</h2>
              <p>
                Security is woven into the very fabric of the Zultys platform. For DFW businesses, this means peace of mind knowing that every call, message, and file transfer is protected by industry-leading protocols.
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Power of SRTP and TLS</h3>
              <p>
                Zultys uses <strong>Secure Real-time Transport Protocol (SRTP)</strong> to encrypt voice traffic, preventing eavesdropping and "man-in-the-middle" attacks. Simultaneously, <strong>Transport Layer Security (TLS)</strong> is used to secure the signaling between devices and the server. This dual-layer approach ensures that both the content of your conversations and the metadata are kept private.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Hardened Linux Architecture</h3>
              <p>
                Unlike many competitors that run on general-purpose Windows servers, the Zultys MX series appliances run on a custom-hardened Linux operating system. This significantly reduces the attack surface and eliminates many of the vulnerabilities associated with traditional server environments. Our local DFW team regularly applies security patches and updates to ensure your system remains resilient against new threats.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Secure Remote Work Without VPNs</h3>
              <p>
                For remote workers in Plano, Arlington, or anywhere in the world, Zultys provides secure access through its proprietary <strong>MXconnect</strong> technology. This allows the ZAC app and IP phones to connect securely to the office PBX without the need for complex and often slow VPN connections, maintaining high security without sacrificing performance.
              </p>

              <div className="mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-3xl font-black text-slate-900 mb-8">VoIP Security FAQs</h2>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Is VoIP more secure than traditional phone lines?</h4>
                    <p className="text-slate-600">When properly configured with encryption like SRTP and TLS, VoIP is significantly more secure than traditional analog lines, which are susceptible to physical wiretapping and lack built-in encryption.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Does Zultys protect against toll fraud?</h4>
                    <p className="text-slate-600">Yes! Zultys includes advanced toll fraud protection features, including international call blocking, failed login alerts, and granular permissions to prevent unauthorized use of your DFW business's phone system.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">How do you handle security updates?</h4>
                    <p className="text-slate-600">As your local DFW partner, we manage the security update process for you. We monitor for new threats and apply necessary patches to your Zultys system to ensure it remains protected against the latest vulnerabilities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Linking Section */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Security Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/hipaa-compliant-voip" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <FileCheck className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">HIPAA Compliance</h3>
                  <p className="text-slate-600">Deep dive into how Zultys protects patient data.</p>
                </Card>
              </Link>
              <Link to="/fort-worth-zultys-mx-series" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Server className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">MX Series Appliances</h3>
                  <p className="text-slate-600">The hardened hardware that powers secure communications.</p>
                </Card>
              </Link>
              <Link to="/zultys-faq" className="group">
                <Card className="p-8 hover:shadow-xl transition-all border-slate-100 h-full">
                  <Eye className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Security FAQ</h3>
                  <p className="text-slate-600">Get answers to common questions about VoIP security.</p>
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
