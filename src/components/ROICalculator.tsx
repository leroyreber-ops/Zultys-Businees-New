import { useState } from 'react';
import { Calculator, TrendingDown, CheckCircle, DollarSign, Phone, Mail, Award, Headphones, Shield, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ROICalculatorProps {
  productName?: string;
  zultysPrice?: number;
  competitorPrice?: number;
  zultysMonthly?: number;
  competitorMonthly?: number;
  productType?: 'phone' | 'system';
  onOpenContactForm?: () => void;
}

export function ROICalculator({
  productName = "Zultys Cloud Business Phones",
  zultysPrice = 250,
  competitorPrice = 380,
  zultysMonthly = 35,
  competitorMonthly = 55,
  productType = 'phone',
  onOpenContactForm
}: ROICalculatorProps) {
  const [quantity, setQuantity] = useState(productType === 'phone' ? 20 : 1);
  const [timeframe, setTimeframe] = useState(3);

  const calculateSavings = () => {
    const upfrontDiff = (competitorPrice - zultysPrice) * quantity;
    const monthlySavings = (competitorMonthly - zultysMonthly) * quantity;
    const totalMonthlySavings = monthlySavings * (timeframe * 12);
    const totalSavings = upfrontDiff + totalMonthlySavings;
    
    const zultysTotalCost = (zultysPrice * quantity) + (zultysMonthly * quantity * timeframe * 12);
    const competitorTotalCost = (competitorPrice * quantity) + (competitorMonthly * quantity * timeframe * 12);

    return {
      upfrontSavings: upfrontDiff,
      monthlySavings: monthlySavings,
      totalSavings: totalSavings,
      zultysTotalCost: zultysTotalCost,
      competitorTotalCost: competitorTotalCost,
      savingsPercentage: competitorTotalCost > 0 ? ((totalSavings / competitorTotalCost) * 100) : 0
    };
  };

  const savings = calculateSavings();

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-zultys-green/10 text-zultys-green border border-zultys-green/20 px-4 py-2 rounded-full mb-6 shadow-sm">
            <Calculator className="h-4 w-4" />
            <span className="text-xs font-black uppercase tracking-widest">ROI Savings Estimator</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            See How Much DFW Business Communications Saves You
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            As Fort Worth's premier Zultys partner, we negotiate the best pricing for your business. Calculate your real savings when you work with us—we handle everything from pricing to installation to ongoing support.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Calculator Inputs - 5 Cols */}
          <Card className="lg:col-span-5 p-8 bg-white border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] rounded-[2rem] flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight flex items-center gap-2">
                <span className="h-5 w-1.5 bg-zultys-green rounded-full"></span>
                Your Deployment Details
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">
                      Number of {productType === 'phone' ? 'Phones' : 'Systems'}
                    </label>
                    <span className="text-xs text-slate-400 font-mono">Min 1 - Max 1000</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-5 py-4 border-2 border-slate-100 rounded-2xl text-xl font-black text-slate-900 focus:border-zultys-green focus:outline-none transition-all shadow-inner bg-slate-50/50"
                  />
                  {productType === 'phone' && (
                    <div className="mt-4">
                      <input
                        type="range"
                        min="5"
                        max="200"
                        step="5"
                        value={quantity > 200 ? 200 : quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full accent-zultys-green h-2 bg-slate-100 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                        <span>5 Phones</span>
                        <span>100 Phones</span>
                        <span>200+ Phones</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-2">
                    Timeframe (Years)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 3, 5].map((years) => (
                      <button
                        key={years}
                        onClick={() => setTimeframe(years)}
                        className={`px-4 py-3.5 rounded-xl font-black tracking-wide text-sm transition-all duration-200 hover:scale-[1.02] ${
                          timeframe === years
                            ? 'bg-zultys-green text-white shadow-lg shadow-zultys-green/20 border-none'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'
                        }`}
                      >
                        {years} {years === 1 ? 'Year' : 'Years'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
              <div className="bg-emerald-50/50 border border-zultys-green/20 rounded-2xl p-4">
                <div className="font-black text-emerald-950 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <CheckCircle className="h-4.5 w-4.5 text-zultys-green" />
                  DFW Business Comms Price
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">${zultysPrice.toLocaleString()}</span>
                  <span className="text-xs font-bold text-slate-500">one-time unit cost</span>
                </div>
                <div className="text-xs text-emerald-800 font-bold mt-1.5 bg-emerald-50 px-2.5 py-1 rounded-md inline-block border border-zultys-green/10">
                  Per unit with our partner pricing
                </div>
              </div>
              
              <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/80">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-bold">Competitor Direct Price:</span>
                  <span className="font-extrabold text-slate-800">${competitorPrice.toLocaleString()}</span>
                </div>
                {zultysMonthly > 0 && (
                  <div className="pt-2.5 border-t border-slate-200/50 space-y-2.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-bold">Our Monthly/Unit:</span>
                      <span className="font-extrabold text-zultys-green bg-zultys-green/5 px-2 py-0.5 rounded-md border border-zultys-green/10">${zultysMonthly.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-bold">Competitor Monthly/Unit:</span>
                      <span className="font-extrabold text-slate-800">${competitorMonthly.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Results Columns - 7 Cols */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Top Savings Card */}
            <Card className="p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white border border-zultys-green/20 shadow-[0_30px_60px_-15px_rgba(0,168,45,0.2)] rounded-[2rem] relative overflow-hidden flex-1 flex flex-col justify-center">
              {/* Subtle background glow effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-zultys-green/10 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingDown className="h-8 w-8 text-zultys-green" />
                  <h4 className="text-lg font-black uppercase tracking-wider text-slate-300">Your Total Savings</h4>
                </div>
                
                <div className="flex flex-wrap items-baseline gap-4 mb-4">
                  <span className="text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-md">
                    ${Math.abs(savings.totalSavings).toLocaleString()}
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-zultys-green bg-zultys-green/10 px-3 py-1.5 rounded-full border border-zultys-green/20 animate-pulse">
                    Instant Benefit
                  </span>
                </div>

                <p className="text-slate-300 text-base font-bold leading-relaxed mb-6">
                  Over <span className="text-white font-black">{timeframe} {timeframe === 1 ? 'year' : 'years'}</span> with <span className="text-white font-black">{quantity} {productType === 'phone' ? 'phones' : 'systems'}</span> compared to standard direct market rates.
                </p>

                {savings.savingsPercentage > 0 && (
                  <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-2xl font-black text-zultys-gold">
                        {savings.savingsPercentage.toFixed(1)}% Lower TCO
                      </p>
                      <p className="text-xs text-slate-400 font-bold mt-0.5">vs. going direct to competitors</p>
                    </div>
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zultys-gold bg-zultys-gold/10 px-3 py-1.5 rounded-md border border-zultys-gold/20">
                      Best Value DFW Guaranteed
                    </span>
                  </div>
                )}
              </div>
            </Card>

            {/* Why Work With Us & Total Cost Split Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Why Work With Us */}
              <Card className="p-6 bg-white border-none shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] rounded-2xl">
                <h4 className="font-black text-slate-900 mb-4 text-base uppercase tracking-wider flex items-center gap-2">
                  <Award className="h-4.5 w-4.5 text-zultys-green" />
                  Why Work With Us?
                </h4>
                <div className="space-y-4">
                  {[
                    { title: "Partner Volume Pricing", desc: "We negotiate bulk rates you can't get on your own" },
                    { title: "Fort Worth Local Support", desc: "We're here when you need us—not a distant call center" },
                    { title: "Expert Installation", desc: "Professional deployment included in your package" },
                    { title: "Lifetime Tech Support", desc: "We stand behind everything we sell" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4.5 w-4.5 text-zultys-green flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-extrabold text-xs text-slate-900 leading-tight">{item.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Total Cost Comparison */}
              <Card className="p-6 bg-slate-900 text-white border-none shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-slate-300 mb-4 text-base uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="h-4.5 w-4.5 text-zultys-gold" />
                    Total Cost Comparison
                  </h4>
                  <div className="space-y-3.5 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-400 font-bold">
                        <span>With DFW Comms ({timeframe}-Yr):</span>
                        <span className="font-black text-zultys-green">${savings.zultysTotalCost.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-zultys-green h-full rounded-full transition-all duration-500"
                          style={{ width: `${(savings.zultysTotalCost / savings.competitorTotalCost) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-slate-400 font-bold">
                        <span>Going Direct ({timeframe}-Yr):</span>
                        <span className="font-black text-white">${savings.competitorTotalCost.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-slate-500 h-full rounded-full w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-bold text-zultys-gold mt-4 bg-zultys-gold/10 p-2.5 rounded-lg border border-zultys-gold/10 text-center leading-snug">
                  Saving you ${(savings.competitorTotalCost - savings.zultysTotalCost).toLocaleString()} total!
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Dynamic Consultation Callout */}
        <div className="text-center mt-12 bg-slate-950 border border-white/5 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,168,45,0.15),transparent_60%)]"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
              Let Us Negotiate Your Best Deal
            </h3>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed font-medium">
              As Fort Worth's authorized Zultys partner with 15+ years of experience, we leverage our relationships to get you pricing and support that competitors simply can't match. Call Leroy today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => window.location.href = 'tel:817-231-2962'}
                className="bg-zultys-green hover:bg-zultys-green/90 text-white font-black px-10 py-7 text-lg rounded-2xl border-none shadow-xl shadow-zultys-green/25 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5 animate-pulse" />
                Call 817-231-2962
              </Button>
              <Button 
                size="lg" 
                className="bg-zultys-gold hover:bg-zultys-gold/90 text-slate-950 font-black px-10 py-7 text-lg rounded-2xl border-none shadow-xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2"
                onClick={onOpenContactForm}
              >
                <Mail className="h-5 w-5" />
                Get Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
