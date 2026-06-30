import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Building2,
  CheckCircle
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_FORT_WORTH_BG,
  SUPPORT_TEAM,
  HERO_BACKGROUND,
} from '../constants/images';
import { toast } from 'sonner';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  useEffect(() => {
    document.title = 'Contact Us | DFW Business Communications | Zultys Fort Worth';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Contact DFW Business Communications for Zultys phone systems in Fort Worth. Get a free quote, request support, or schedule a consultation.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const loadingToast = toast.loading('Sending message...');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.name}`
        })
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Message sent! We will contact you shortly.', { id: loadingToast });
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        toast.error(result.message || 'Something went wrong. Please try again.', { id: loadingToast, duration: 5000 });
      }
    } catch (error) {
      toast.error('Failed to send message. Please check your connection.', { id: loadingToast });
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - SaaS Style */}
        <section className="relative bg-white pt-24 pb-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            <img
              src={HERO_BACKGROUND}
              alt="Background Pattern"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-zultys-green/10 px-4 py-2 rounded-full mb-8 border border-zultys-green/20">
              <MessageSquare className="h-5 w-5 text-zultys-green" />
              <span className="text-sm font-bold text-zultys-green uppercase tracking-wider">Get in Touch</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight text-charcoal tracking-tight">
              Ready to <span className="text-zultys-green">Grow?</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to upgrade your business communications? Our Fort Worth team is 
              standing by to help you find the perfect Zultys solution.
            </p>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20">
              {/* Contact Form */}
              <div>
                <Card className="p-10 border border-gray-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[2rem] bg-white">
                  <h2 className="text-3xl font-black text-charcoal mb-8">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-charcoal uppercase tracking-wider">Full Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-zultys-green focus:border-transparent outline-none transition-all bg-gray-50/50 text-charcoal font-medium"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-charcoal uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-zultys-green focus:border-transparent outline-none transition-all bg-gray-50/50 text-charcoal font-medium"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-charcoal uppercase tracking-wider">Phone Number</label>
                        <input
                          type="tel"
                          required
                          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-zultys-green focus:border-transparent outline-none transition-all bg-gray-50/50 text-charcoal font-medium"
                          placeholder="817-555-0123"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-charcoal uppercase tracking-wider">Company Name</label>
                        <input
                          type="text"
                          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-zultys-green focus:border-transparent outline-none transition-all bg-gray-50/50 text-charcoal font-medium"
                          placeholder="Your Business"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-charcoal uppercase tracking-wider">How can we help?</label>
                      <textarea
                        rows={5}
                        required
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-zultys-green focus:border-transparent outline-none transition-all resize-none bg-gray-50/50 text-charcoal font-medium"
                        placeholder="Tell us about your communication needs..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full bg-zultys-green hover:bg-zultys-green/90 text-white py-8 text-xl font-black shadow-xl hover:shadow-zultys-green/20 transition-all rounded-xl">
                      Send Message
                      <Send className="ml-3 h-6 w-6" />
                    </Button>
                  </form>
                </Card>
              </div>

              {/* Contact Info & Map */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-black text-charcoal mb-10">Contact Information</h2>
                  <div className="grid sm:grid-cols-2 gap-10">
                    <div className="flex items-start gap-6 group">
                      <div className="flex-shrink-0 p-4 bg-charcoal rounded-2xl group-hover:bg-zultys-green transition-colors duration-500 shadow-lg">
                        <Phone className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-black text-charcoal text-xl mb-1">Call Us</h4>
                        <p className="text-gray-600 font-bold">817-231-2962</p>
                        <p className="text-xs text-zultys-green font-black uppercase tracking-wider mt-2">Mon-Fri, 8am-5pm</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 group">
                      <div className="flex-shrink-0 p-4 bg-charcoal rounded-2xl group-hover:bg-zultys-green transition-colors duration-500 shadow-lg">
                        <Mail className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-black text-charcoal text-xl mb-1">Email Us</h4>
                        <p className="text-gray-600 font-bold">info@dallasfortworthzultys.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 group">
                      <div className="flex-shrink-0 p-4 bg-charcoal rounded-2xl group-hover:bg-zultys-green transition-colors duration-500 shadow-lg">
                        <MapPin className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-black text-charcoal text-xl mb-1">Visit Us</h4>
                        <p className="text-gray-600 font-bold">2203 8th Ave.<br />Fort Worth, TX 76110</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 group">
                      <div className="flex-shrink-0 p-4 bg-charcoal rounded-2xl group-hover:bg-zultys-green transition-colors duration-500 shadow-lg">
                        <Clock className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-black text-charcoal text-xl mb-1">Support</h4>
                        <p className="text-gray-600 font-bold">24/7 Emergency Support<br />Available for Clients</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-4 bg-zultys-green/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 aspect-video">
                    <ImageWithFallback
                      src={SUPPORT_TEAM}
                      alt="Our Support Team"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-zultys-green/10"></div>
                  </div>
                </div>

                <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100">
                  <h3 className="text-2xl font-black text-charcoal mb-6 flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-zultys-green" />
                    Why Contact Us?
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Free, no-obligation site surveys and consultations.',
                      'Customized Zultys solutions tailored to your DFW business.',
                      'Direct access to certified Zultys technicians.',
                      'Competitive pricing and flexible deployment options.'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 font-medium text-lg">
                        <div className="mt-2 h-2 w-2 bg-zultys-green rounded-full flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-32 prose prose-lg text-gray-600 max-w-none prose-headings:text-charcoal prose-headings:font-black prose-strong:text-charcoal">
              <h3 className="text-4xl mb-8">What to Expect During Your Zultys Consultation in DFW</h3>
              <p className="text-xl leading-relaxed mb-8">
                When you contact DFW Business Communications for a <strong>Zultys consultation in Fort Worth</strong>, you're not just getting a sales pitch. Our process begins with a deep dive into your current communication infrastructure and business workflows. We take the time to understand the unique challenges your North Texas organization faces, whether it's managing a distributed workforce in Dallas or improving patient communication in a Fort Worth medical practice.
              </p>
              <p className="leading-relaxed mb-12">
                Our expert consultants will walk you through the various Zultys options, from on-premise appliances to cloud-based services, explaining the benefits and trade-offs of each for your DFW enterprise. We'll provide a clear, transparent quote that includes everything from hardware and licensing to professional installation and staff training. Our goal is to empower you with the information you need to make the best decision for your North Texas business.
              </p>

              <div className="grid md:grid-cols-2 gap-16 items-start">
                <div>
                  <h4 className="text-3xl mb-6">Preparing for Your DFW Business Communication Audit</h4>
                  <p className="leading-relaxed mb-6">
                    To get the most out of your <strong>DFW Business Communication Audit</strong>, it's helpful to have a few pieces of information ready. Our local Fort Worth experts will want to understand your current monthly communication costs, the number of users in your Dallas or Fort Worth office, and any specific pain points you're experiencing with your existing system. By being prepared, we can provide a more accurate and valuable assessment for your North Texas organization.
                  </p>
                  <p className="leading-relaxed">
                    We'll also look at your current network infrastructure to ensure it's ready for high-quality voice and video traffic. DFW Business Communications is committed to providing a comprehensive audit that covers every aspect of your communication environment, ensuring that your transition to Zultys is smooth and successful in the Dallas-Fort Worth area.
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl mb-6">Our Local DFW Support Commitment</h4>
                  <p className="leading-relaxed mb-6">
                    At DFW Business Communications, <strong>Our Local DFW Support Commitment</strong> is what defines us. We know that in the fast-paced North Texas business environment, communication downtime is not an option. That's why we provide 24/7 emergency support for our Zultys clients across the Dallas-Fort Worth metroplex. When you call for assistance, you're talking to a local Fort Worth expert who understands your system and is dedicated to getting you back online quickly.
                  </p>
                  <p className="leading-relaxed">
                    We pride ourselves on our fast response times and personal service. Whether you need a simple configuration change or a complex system repair, our North Texas team has the knowledge and experience to handle it professionally. We are your neighbors, and we are committed to your success in the DFW business community.
                  </p>
                </div>
              </div>

              <div className="mt-20 bg-charcoal text-white p-16 rounded-[3rem] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img src={ZULTYS_FORT_WORTH_BG} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-4xl mb-8 text-white">Serving the Entire Dallas-Fort Worth Metroplex</h3>
                  <p className="text-xl text-white leading-relaxed mb-8">
                    From our headquarters in Fort Worth, we proudly serve businesses throughout the entire <strong>Dallas-Fort Worth Metroplex</strong>. Our service area includes Dallas, Arlington, Plano, Irving, Garland, Grand Prairie, McKinney, Frisco, and all surrounding North Texas communities. No matter where your DFW organization is located, DFW Business Communications is ready to provide the expert Zultys solutions and local support you need.
                  </p>
                  <p className="text-xl text-white leading-relaxed">
                    We have extensive experience working with businesses of all sizes across North Texas, from small local shops to large multi-location enterprises. Our deep understanding of the DFW business landscape allows us to provide communication solutions that are perfectly suited to the unique needs of our region.
                  </p>
                </div>
              </div>

              <div className="mt-20 grid md:grid-cols-2 gap-16">
                <div>
                  <h4 className="text-3xl mb-6">Request a Free Site Survey</h4>
                  <p className="leading-relaxed mb-6">
                    Ready to take the first step toward better business communications? <strong>Request a Free Site Survey and Communication Audit</strong> from DFW Business Communications today. We'll visit your DFW facility, evaluate your current network and phone system, and provide a detailed report on how Zultys technology can improve your efficiency and reduce your costs in North Texas.
                  </p>
                  <p className="leading-relaxed">
                    This no-obligation audit is the best way to discover the full potential of unified communications for your DFW enterprise. Contact us today at <strong>817-231-2962</strong> or fill out the form on this page to schedule your free site survey and start your journey toward a more connected and productive future in Dallas-Fort Worth.
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl mb-6">The Benefits of a Local Partner</h4>
                  <p className="leading-relaxed mb-6">
                    Choosing a <strong>Local Zultys Partner in North Texas</strong> provides numerous benefits for your DFW business. DFW Business Communications offers the kind of personal, on-site service that national providers simply cannot match. We understand the unique business environment of Dallas and Fort Worth, and we are dedicated to providing the highest level of support to our North Texas neighbors.
                  </p>
                  <p className="leading-relaxed">
                    From faster response times to personalized training, our local presence ensures that your DFW organization always has the expert guidance it needs. Trust DFW Business Communications to be your dedicated communication partner, providing the world-class Zultys technology and local support that will drive your success in the Dallas-Fort Worth area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
