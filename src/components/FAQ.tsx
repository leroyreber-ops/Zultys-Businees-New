import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "Why choose Zultys over other VOIP providers like RingCentral or Vonage?",
    answer: "Zultys offers a truly unified communications platform that can be deployed on-premise, in the cloud, or as a hybrid solution. Unlike many competitors, Zultys is an all-in-one appliance that doesn't require third-party servers for core features, leading to higher reliability and lower long-term costs. Plus, with local DFW support, you get on-site installation and training that national providers can't match."
  },
  {
    question: "Can I keep my existing phone numbers?",
    answer: "Yes, absolutely. We handle the entire porting process for you, ensuring a seamless transition of your local and toll-free numbers from your current provider to your new Zultys system with zero downtime."
  },
  {
    question: "Do you provide on-site installation in Fort Worth and Dallas?",
    answer: "Yes. We are a local North Texas partner. We don't just ship you phones in a box; our certified technicians come to your office to install the hardware, configure your network for optimal voice quality, and provide hands-on training for your staff."
  },
  {
    question: "Is Zultys compatible with remote work and mobile employees?",
    answer: "Zultys is built for the modern mobile workforce. The Zultys Mobile Communicator app allows your employees to take their office extension anywhere on their iPhone or Android device, with full access to corporate directory, presence, and instant messaging."
  },
  {
    question: "What happens to my phones if the internet goes down?",
    answer: "Zultys systems offer multiple redundancy options. We can configure automatic failover to mobile devices, secondary internet connections, or traditional analog lines to ensure your business never misses a call, even during an ISP outage."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-zultys-green/10 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="h-5 w-5 text-zultys-green" />
            <span className="text-sm font-bold text-zultys-green uppercase tracking-wider">Common Questions</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-3xl transition-all duration-300 ${
                openIndex === index ? 'border-zultys-green bg-slate-50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-bold text-slate-900 pr-8">{faq.question}</span>
                <div className={`p-2 rounded-full transition-colors ${
                  openIndex === index ? 'bg-zultys-green text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {openIndex === index ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </div>
    </section>
  );
}
