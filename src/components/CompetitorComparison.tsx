import { CheckCircle, X, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

interface ComparisonFeature {
  feature: string;
  zultys: boolean | string;
  competitor: boolean | string;
  zultysDetail?: string;
  competitorDetail?: string;
}

interface CompetitorComparisonProps {
  productName: string;
  competitorName?: string;
  zultysAdvantages: string[];
  competitorDisadvantages: string[];
  features: ComparisonFeature[];
}

export function CompetitorComparison({
  productName,
  competitorName = 'Leading Competitors',
  zultysAdvantages,
  competitorDisadvantages,
  features
}: CompetitorComparisonProps) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full mb-4">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">Competitive Comparison</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Fort Worth Businesses Choose Zultys {productName}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Zultys outperforms {competitorName} across features, pricing, and total value
          </p>
        </div>

        {/* Pros and Cons Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Zultys Advantages */}
          <Card className="p-8 border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-600 rounded-xl">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Zultys {productName} Advantages
              </h3>
            </div>
            <ul className="space-y-4">
              {zultysAdvantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">{advantage}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Competitor Disadvantages */}
          <Card className="p-8 border-2 border-red-300 bg-gradient-to-br from-red-50 to-orange-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-600 rounded-xl">
                <X className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {competitorName} Limitations
              </h3>
            </div>
            <ul className="space-y-4">
              {competitorDisadvantages.map((disadvantage, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">{disadvantage}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <th className="px-6 py-4 text-left text-lg font-bold">Feature</th>
                  <th className="px-6 py-4 text-center text-lg font-bold">
                    Zultys {productName}
                  </th>
                  <th className="px-6 py-4 text-center text-lg font-bold">
                    {competitorName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {feature.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.zultys === 'boolean' ? (
                        feature.zultys ? (
                          <div className="flex flex-col items-center gap-2">
                            <CheckCircle className="h-7 w-7 text-green-600" />
                            {feature.zultysDetail && (
                              <span className="text-sm text-gray-600">{feature.zultysDetail}</span>
                            )}
                          </div>
                        ) : (
                          <X className="h-7 w-7 text-red-600 mx-auto" />
                        )
                      ) : (
                        <div className="font-semibold text-green-700">{feature.zultys}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.competitor === 'boolean' ? (
                        feature.competitor ? (
                          <div className="flex flex-col items-center gap-2">
                            <CheckCircle className="h-7 w-7 text-green-600" />
                            {feature.competitorDetail && (
                              <span className="text-sm text-gray-600">{feature.competitorDetail}</span>
                            )}
                          </div>
                        ) : (
                          <X className="h-7 w-7 text-red-600 mx-auto" />
                        )
                      ) : (
                        <div className="font-semibold text-gray-700">{feature.competitor}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Don't Buy Direct—Partner With Fort Worth's Zultys Experts
          </h3>
          <p className="text-xl text-purple-100 mb-6 max-w-3xl mx-auto">
            DFW Business Communications gets you better Zultys pricing than going direct, plus expert installation, training, and lifetime Fort Worth support. We negotiate on your behalf to ensure maximum value and minimal headaches.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">✓ Better Pricing</div>
              <div className="text-sm text-purple-100">Partner discounts</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">✓ Expert Service</div>
              <div className="text-sm text-purple-100">Local installation</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">✓ Lifetime Support</div>
              <div className="text-sm text-purple-100">We're always here</div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-lg font-bold">
              📞 <a href="tel:817-231-2962" className="hover:underline">Call Leroy: 817-231-2962</a> | ✉️ <a href="mailto:info@dallasfortworthzultys.com" className="hover:underline">info@dallasfortworthzultys.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
