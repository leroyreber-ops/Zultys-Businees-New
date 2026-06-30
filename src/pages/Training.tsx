import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  BookOpen, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Clock, 
  Phone,
  Monitor,
  Smartphone,
  GraduationCap,
  Headphones
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_FORT_WORTH_BG,
  SUPPORT_TEAM,
  ZULTYS_ZAC_MOBILE_COMBO,
} from '../constants/images';

export function Training() {
  const { openQuote } = useQuote();

  useEffect(() => {
    // Page Title
    document.title = 'Zultys User & Admin Training | Business Phone Training Fort Worth & Dallas';
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Professional Zultys training services in Fort Worth and Dallas. Empower your team with expert user and administrator training for DFW business phone systems.';
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
    metaKeywords.setAttribute('content', 'Zultys training Dallas, business phone user training Fort Worth, VoIP admin training DFW, Zultys ZAC training North Texas, corporate phone training Dallas');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://dallasfortworthzultys.com/training-services');

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys User & Administrator Training',
      description: 'Comprehensive training services for Zultys communication systems for users and IT admins in Dallas-Fort Worth.',
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
        {/* Hero Section */}
        <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src={ZULTYS_FORT_WORTH_BG}
              alt="Zultys Training Fort Worth"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-500/30">
                <GraduationCap className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-100 uppercase tracking-wider">Professional Training Services</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Zultys User & Admin Training for DFW Businesses
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-slate-100 leading-relaxed">
                Maximize the value of your business phone system with expert Zultys training 
                services in Dallas-Fort Worth. We provide comprehensive, hands-on instruction 
                for end-users and system administrators, ensuring your North Texas team 
                is fully equipped to leverage the advanced features of the Zultys 
                unified communications platform.
              </p>
              <Button
                size="lg"
                onClick={openQuote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
              >
                Schedule Your Training Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Training Options Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Training for Every Role</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our training programs are designed to ensure everyone in your organization is comfortable and productive with Zultys.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'User Training',
                  description: 'Hands-on training for employees on how to use their ZIP phones, ZAC desktop client, and MXmobile app.',
                  icon: Users,
                },
                {
                  title: 'Admin Training',
                  description: 'In-depth training for your IT team on how to manage users, call flows, and system settings.',
                  icon: Monitor,
                },
                {
                  title: 'Contact Center Training',
                  description: 'Specialized training for agents and supervisors on how to use Zultys ICC tools effectively.',
                  icon: Headphones,
                },
              ].map((option, index) => (
                <Card key={index} className="p-8 border-slate-200 hover:border-blue-500 transition-colors">
                  <div className="p-3 bg-blue-100 rounded-xl w-fit mb-6">
                    <option.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{option.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{option.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-200 p-4">
                  <ImageWithFallback
                    src={ZULTYS_ZAC_MOBILE_COMBO}
                    alt="Zultys training session"
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                  Maximize Productivity in Your DFW Office
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    A new phone system is only as good as the people who use it. <strong>Zultys training Fort Worth</strong> by DFW Business Communications ensures that your team is fully equipped to leverage the powerful features of the Zultys platform. We provide engaging, hands-on training that is tailored to your specific business environment.
                  </p>
                  <p>
                    Our training sessions cover everything from basic call handling to advanced features like integrated conferencing and mobile collaboration. We also provide comprehensive training for your system administrators, empowering them to make changes and manage the system with confidence.
                  </p>
                  <p>
                    When you invest in Zultys training, you're investing in the productivity and efficiency of your entire DFW organization.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The ROI of Effective Zultys Training for DFW Businesses</h3>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    Understanding the <strong>ROI of Effective Zultys Training</strong> is essential for any DFW business owner. When your team in Dallas or Fort Worth is fully trained on their communication tools, they work more efficiently, provide better customer service, and experience less frustration. DFW Business Communications helps you quantify the value of your training investment by showing how improved communication workflows lead to tangible business results in the North Texas market.
                  </p>
                  <p>
                    By reducing the time spent on basic call handling and increasing the use of advanced collaboration features, your DFW organization can achieve significant productivity gains. Our local DFW training experts focus on the features that drive the most value for your specific industry, ensuring that your North Texas business sees a rapid and lasting return on its Zultys investment.
                  </p>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Customized Training Curriculums for DFW Businesses</h3>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    Every business in the Dallas-Fort Worth area has unique communication workflows. That's why we offer <strong>Customized Training Curriculums</strong> that are specifically designed for your North Texas organization. We don't just provide a generic overview; we focus on the tools and features that your team will use every day to serve your DFW customers.
                  </p>
                  <p>
                    Whether your team needs to master the ZAC desktop client for high-volume call handling in a Dallas office or requires in-depth training on MXmobile for a mobile sales force in Fort Worth, we tailor our instruction to meet your specific goals. This customized approach ensures that your DFW employees are comfortable and productive with their new Zultys system from day one.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">On-Site vs. Remote Training Options for North Texas Organizations</h3>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    We understand that DFW businesses have different preferences and requirements for training delivery. DFW Business Communications offers both <strong>On-Site and Remote Training Options</strong> to accommodate your North Texas team. Our on-site training provides a hands-on, interactive experience at your DFW facility, allowing for immediate feedback and personalized instruction.
                  </p>
                  <p>
                    For organizations with distributed teams or those who prefer a more flexible approach, our remote training sessions provide the same high-quality instruction through interactive web meetings. Regardless of the delivery method, we ensure that your DFW team receives the expert Zultys training they need to succeed in the Dallas-Fort Worth business environment.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Administrator-Level Technical Training for DFW IT Teams</h3>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    Empowering your internal IT team is a key part of our training philosophy. We provide <strong>Administrator-Level Technical Training</strong> for DFW organizations that prefer to manage their own Zultys system. This in-depth instruction covers everything from user management and call routing configuration to system monitoring and troubleshooting for your North Texas enterprise.
                  </p>
                  <p>
                    Our expert trainers guide your DFW IT staff through the Zultys MX Administrator interface, providing the knowledge and confidence they need to maintain your communication infrastructure. This training ensures that your Dallas or Fort Worth business can respond quickly to changing needs and maintain peak system performance without relying on external support for every minor change.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Ongoing Support and Refresher Sessions for Long-Term Success</h3>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    Training is not a one-time event; it's an ongoing process. DFW Business Communications provides <strong>Ongoing Support and Refresher Sessions</strong> to ensure the long-term success of your Zultys system in North Texas. As you hire new employees or as Zultys releases new features, we are here to provide the additional training your DFW team needs to stay current.
                  </p>
                  <p>
                    We also offer advanced training sessions for DFW businesses looking to leverage more complex features, such as integrated contact center tools or custom API integrations. By providing continuous learning opportunities, we help your North Texas organization maximize the value of your Zultys investment and maintain a competitive edge in the Dallas-Fort Worth market.
                  </p>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Specialized Training for DFW Healthcare and Legal Professionals</h4>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    For <strong>DFW Healthcare and Legal Professionals</strong>, communication is not just about productivity; it's about compliance and confidentiality. DFW Business Communications offers specialized training that focuses on the secure use of Zultys features in these sensitive North Texas industries. We ensure that your Dallas or Fort Worth staff understands how to handle patient or client data securely while using their Zultys phones and software.
                  </p>
                  <p>
                    Our local DFW trainers are familiar with the specific regulatory requirements of the healthcare and legal sectors in North Texas. We provide practical guidance on using features like encrypted call recording and secure messaging, helping your DFW organization maintain the highest standards of professional conduct and data protection.
                  </p>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Creating a Culture of Communication Excellence in North Texas</h4>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    Our goal is to help you <strong>Create a Culture of Communication Excellence</strong> within your North Texas organization. Effective training is the foundation of this culture, empowering your DFW employees to communicate more clearly, collaborate more effectively, and serve your customers more professionally. DFW Business Communications is your partner in this journey, providing the expert Zultys training and ongoing support needed to transform your Dallas or Fort Worth business.
                  </p>
                  <p>
                    By fostering a deep understanding of your communication tools, we help your DFW team build stronger relationships with each other and with your customers. Trust DFW Business Communications to help you build a more connected and successful North Texas organization through the power of expert Zultys training.
                  </p>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Advanced Feature Training for DFW Power Users</h4>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    For your <strong>DFW Power Users</strong>, we offer advanced feature training that goes beyond the basics. This includes in-depth instruction on complex call routing, advanced ZAC integrations, and the use of Zultys reporting tools for your North Texas business. We help your most tech-savvy DFW employees become internal experts, providing them with the skills needed to drive communication efficiency across your entire Dallas or Fort Worth organization.
                  </p>
                  <p>
                    By empowering your DFW power users, you create a more resilient and self-sufficient communication environment. Trust DFW Business Communications to provide the high-level Zultys training needed to unlock the full potential of your North Texas team and your communication investment.
                  </p>
                </div>
                
                <div className="mt-12 space-y-4">
                  {[
                    'Customized training for your specific setup',
                    'On-site & remote training options',
                    'User guides & quick reference materials',
                    'Administrator-level technical training',
                    'Ongoing support & refresher sessions'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      {feature}
                    </div>
                  ))}
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
