import React from 'react';
import { Check, X, Shield, Zap, DollarSign, Headphones } from 'lucide-react';

const features = [
  { name: 'Local On-Site Support (DFW)', zultys: true, others: false },
  { name: 'On-Premise or Cloud Deployment', zultys: true, others: false },
  { name: 'All-in-One Appliance (No extra servers)', zultys: true, others: false },
  { name: 'Mobile App with Full Presence', zultys: true, others: true },
  { name: 'Integrated Contact Center', zultys: true, others: true },
  { name: 'No Hidden Per-Feature Fees', zultys: true, others: false },
  { name: 'Lifetime Hardware Warranty Options', zultys: true, others: false },
];

export function Comparison() {
  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zultys-green rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zultys-green rounded-full blur-[120px]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl mb-6">
            Zultys vs. The "Big Box" Providers
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            See why Dallas-Fort Worth businesses are switching from national VOIP providers to a local Zultys solution.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-6 px-4 text-lg font-bold text-slate-400 border-b border-slate-800">Feature</th>
                <th className="py-6 px-4 text-center border-b border-slate-800 bg-zultys-green/10 rounded-t-3xl">
                  <span className="text-2xl font-black text-zultys-green">Zultys</span>
                </th>
                <th className="py-6 px-4 text-center text-lg font-bold text-slate-400 border-b border-slate-800">National Providers</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="group">
                  <td className="py-6 px-4 border-b border-slate-800 font-medium text-slate-300 group-hover:text-white transition-colors">
                    {feature.name}
                  </td>
                  <td className="py-6 px-4 text-center border-b border-slate-800 bg-zultys-green/5">
                    <div className="flex justify-center">
                      <div className="bg-zultys-green p-1 rounded-full">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-center border-b border-slate-800">
                    <div className="flex justify-center">
                      {feature.others ? (
                        <div className="bg-slate-700 p-1 rounded-full">
                          <Check className="h-5 w-5 text-slate-400" />
                        </div>
                      ) : (
                        <div className="bg-red-500/20 p-1 rounded-full">
                          <X className="h-5 w-5 text-red-500" />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Local Accountability',
              desc: 'When you have an issue, you call a local DFW number, not a call center overseas.',
              icon: Headphones
            },
            {
              title: 'Lower TCO',
              desc: 'Zultys systems typically pay for themselves in 18-24 months compared to hosted seats.',
              icon: DollarSign
            },
            {
              title: 'Superior Reliability',
              desc: 'On-premise options mean your phones work even if your internet connection fails.',
              icon: Shield
            }
          ].map((benefit, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10 hover:border-zultys-green/50 transition-all">
              <div className="bg-zultys-green/20 p-4 rounded-2xl w-fit mb-6">
                <benefit.icon className="h-8 w-8 text-zultys-green" />
              </div>
              <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-slate-400 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
