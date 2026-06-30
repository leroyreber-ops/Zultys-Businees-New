import { useState } from 'react';
import { Calculator, TrendingDown, CheckCircle, DollarSign, Phone, Mail } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ROICalculatorProps {
  productName: string;
  zultysPrice?: number;
  competitorPrice?: number;
  zultysMonthly?: number;
  competitorMonthly?: number;
  productType?: 'phone' | 'system';
  onOpenContactForm?: () => void;
}

export function ROICalculator({
  productName,
  zultysPrice = 0,
  competitorPrice = 0,
  zultysMonthly = 0,
  competitorMonthly = 0,
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
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full mb-4">
            <Calculator className="h-5 w-5" />
            <span className="font-semibold">ROI Calculator</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See How Much DFW Business Communications Saves You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            As Fort Worth's premier Zultys partner, we negotiate the best pricing for your business. Calculate your real savings when you work with us—we handle everything from pricing to installation to ongoing support.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Inputs */}
          <Card className="p-8 bg-white shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Deployment Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of {productType === 'phone' ? 'Phones' : 'Systems'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-semibold focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Timeframe (Years)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 3, 5].map((years) => (
                    <button
                      key={years}
                      onClick={() => setTimeframe(years)}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        timeframe === years
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {years} {years === 1 ? 'Year' : 'Years'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="bg-green-50 border-2 border-green-600 rounded-lg p-4 mb-4">
                  <div className="font-bold text-green-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    DFW Business Communications Negotiated Price
                  </div>
                  <div className="text-3xl font-bold text-green-600">${zultysPrice.toLocaleString()}</div>
                  <div className="text-sm text-green-700 mt-1">Per unit with our partner pricing</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Competitor Direct Price:</span>
                    <span className="font-bold text-gray-900">${competitorPrice.toLocaleString()}</span>
                  </div>
                  {zultysMonthly > 0 && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Our Monthly/Unit:</span>
                        <span className="font-bold text-green-700">${zultysMonthly.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Competitor Monthly/Unit:</span>
                        <span className="font-bold text-gray-900">${competitorMonthly.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="h-10 w-10" />
                <h3 className="text-3xl font-bold">Your Total Savings</h3>
              </div>
              <div className="text-6xl font-bold mb-2">
                ${Math.abs(savings.totalSavings).toLocaleString()}
              </div>
              <p className="text-green-100 text-lg">
                Over {timeframe} {timeframe === 1 ? 'year' : 'years'} with {quantity} {productType === 'phone' ? 'phones' : 'systems'}
              </p>
              {savings.savingsPercentage > 0 && (
                <div className="mt-4 pt-4 border-t border-green-400">
                  <p className="text-2xl font-bold">
                    {savings.savingsPercentage.toFixed(1)}% Lower TCO
                  </p>
                  <p className="text-green-100">vs. going direct to competitors</p>
                </div>
              )}
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <h4 className="font-bold text-gray-900 mb-4 text-xl">Why Work With Us?</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Partner Volume Pricing</div>
                    <div className="text-sm text-gray-600">
                      We negotiate bulk rates you can't get on your own
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Fort Worth Local Support</div>
                    <div className="text-sm text-gray-600">
                      We're here when you need us—not a distant call center
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Expert Installation & Training</div>
                    <div className="text-sm text-gray-600">
                      Professional deployment included in your package
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Lifetime Technical Support</div>
                    <div className="text-sm text-gray-600">
                      We stand behind everything we sell
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-2 border-blue-200">
              <div className="flex items-start gap-3">
                <DollarSign className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Total Cost Comparison</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">With DFW Business Comms ({timeframe}-Year):</span>
                      <span className="font-bold text-green-600">${savings.zultysTotalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Going Direct to Competitors ({timeframe}-Year):</span>
                      <span className="font-bold text-gray-900">${savings.competitorTotalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Let Us Negotiate Your Best Deal
          </h3>
          <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
            As Fort Worth's authorized Zultys partner with 15+ years of experience, we leverage our relationships to get you pricing and support that competitors simply can't match. Call Leroy today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => window.location.href = 'tel:817-231-2962'}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call 817-231-2962
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-bold"
              onClick={onOpenContactForm}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
