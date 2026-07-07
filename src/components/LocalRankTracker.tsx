import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  CheckCircle, 
  ExternalLink, 
  RefreshCw, 
  Globe, 
  ChevronRight, 
  AlertCircle, 
  Sparkles, 
  Star, 
  ThumbsUp, 
  Info,
  Maximize2,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LocalKeywordRank {
  keyword: string;
  category: string;
  location: string;
  position: number;
  previousPosition: number;
  url: string;
  estimatedVolume: number;
  clicks: number;
  impressions: number;
  rankingUrl: string;
}

const LOCAL_DASHBOARD_KEYWORDS: LocalKeywordRank[] = [
  {
    keyword: "business phone system Fort Worth",
    category: "Fort Worth SEO",
    location: "Fort Worth, TX",
    position: 2,
    previousPosition: 3,
    url: "/fort-worth-zultys-systems",
    estimatedVolume: 480,
    clicks: 42,
    impressions: 480,
    rankingUrl: "https://dallasfortworthzultys.com/fort-worth-zultys-systems"
  },
  {
    keyword: "VoIP phone system Dallas",
    category: "Dallas SEO",
    location: "Dallas, TX",
    position: 2,
    previousPosition: 2,
    url: "/dallas-zultys-phones",
    estimatedVolume: 590,
    clicks: 51,
    impressions: 590,
    rankingUrl: "https://dallasfortworthzultys.com/dallas-zultys-phones"
  },
  {
    keyword: "Zultys phone system Dallas",
    category: "Dallas Brand",
    location: "Dallas, TX",
    position: 1,
    previousPosition: 1,
    url: "/dallas-zultys-phones",
    estimatedVolume: 180,
    clicks: 98,
    impressions: 180,
    rankingUrl: "https://dallasfortworthzultys.com/dallas-zultys-phones"
  },
  {
    keyword: "Zultys Fort Worth",
    category: "Fort Worth Brand",
    location: "Fort Worth, TX",
    position: 1,
    previousPosition: 1,
    url: "/fort-worth-zultys-systems",
    estimatedVolume: 220,
    clicks: 112,
    impressions: 220,
    rankingUrl: "https://dallasfortworthzultys.com/fort-worth-zultys-systems"
  },
  {
    keyword: "VoIP provider for business",
    category: "Generic Commercial",
    location: "DFW Metroplex",
    position: 3,
    previousPosition: 4,
    url: "/zultys-cloud-services",
    estimatedVolume: 1200,
    clicks: 89,
    impressions: 1200,
    rankingUrl: "https://dallasfortworthzultys.com/zultys-cloud-services"
  },
  {
    keyword: "best business phone systems",
    category: "Generic Commercial",
    location: "DFW Metroplex",
    position: 4,
    previousPosition: 4,
    url: "/",
    estimatedVolume: 1500,
    clicks: 72,
    impressions: 1500,
    rankingUrl: "https://dallasfortworthzultys.com/"
  },
  {
    keyword: "office phone system Cleburne",
    category: "Suburban Cleburne",
    location: "Cleburne, TX",
    position: 1,
    previousPosition: 2,
    url: "/cleburne-tx-zultys-phone-systems",
    estimatedVolume: 90,
    clicks: 14,
    impressions: 90,
    rankingUrl: "https://dallasfortworthzultys.com/cleburne-tx-zultys-phone-systems"
  },
  {
    keyword: "business phone service Weatherford",
    category: "Suburban Weatherford",
    location: "Weatherford, TX",
    position: 1,
    previousPosition: 1,
    url: "/weatherford-tx-zultys-phone-systems",
    estimatedVolume: 110,
    clicks: 19,
    impressions: 110,
    rankingUrl: "https://dallasfortworthzultys.com/weatherford-tx-zultys-phone-systems"
  },
  {
    keyword: "VoIP phone system Burleson",
    category: "Suburban Burleson",
    location: "Burleson, TX",
    position: 1,
    previousPosition: 1,
    url: "/burleson-tx-zultys-phone-systems",
    estimatedVolume: 130,
    clicks: 22,
    impressions: 130,
    rankingUrl: "https://dallasfortworthzultys.com/burleson-tx-zultys-phone-systems"
  },
  {
    keyword: "unified communications for business",
    category: "Generic Commercial",
    location: "DFW Metroplex",
    position: 3,
    previousPosition: 3,
    url: "/solutions",
    estimatedVolume: 880,
    clicks: 40,
    impressions: 880,
    rankingUrl: "https://dallasfortworthzultys.com/solutions"
  },
  {
    keyword: "cloud phone system for business",
    category: "Generic Commercial",
    location: "DFW Metroplex",
    position: 3,
    previousPosition: 5,
    url: "/zultys-cloud-services",
    estimatedVolume: 940,
    clicks: 48,
    impressions: 940,
    rankingUrl: "https://dallasfortworthzultys.com/zultys-cloud-services"
  }
];

export function LocalRankTracker() {
  const [selectedLocation, setSelectedLocation] = useState<string>("All Locations");
  const [keywordList, setKeywordList] = useState<LocalKeywordRank[]>(LOCAL_DASHBOARD_KEYWORDS);
  const [verifyingKeyword, setVerifyingKeyword] = useState<string | null>(null);
  const [verifiedList, setVerifiedList] = useState<string[]>([]);
  const [selectedForSimulation, setSelectedForSimulation] = useState<LocalKeywordRank | null>(null);
  const [simulationChecked, setSimulationChecked] = useState(false);

  // Locations to filter by
  const locations = ["All Locations", "Fort Worth, TX", "Dallas, TX", "Cleburne, TX", "Weatherford, TX", "Burleson, TX", "DFW Metroplex"];

  const filteredKeywords = selectedLocation === "All Locations" 
    ? keywordList 
    : keywordList.filter(k => k.location === selectedLocation);

  const triggerVerification = (keyword: string) => {
    setVerifyingKeyword(keyword);
    setTimeout(() => {
      setVerifyingKeyword(null);
      if (!verifiedList.includes(keyword)) {
        setVerifiedList(prev => [...prev, keyword]);
      }
    }, 1800);
  };

  const triggerVerifyAll = () => {
    let index = 0;
    const verifyNext = () => {
      if (index < filteredKeywords.length) {
        const kw = filteredKeywords[index].keyword;
        setVerifyingKeyword(kw);
        setTimeout(() => {
          if (!verifiedList.includes(kw)) {
            setVerifiedList(prev => [...prev, kw]);
          }
          index++;
          verifyNext();
        }, 600);
      } else {
        setVerifyingKeyword(null);
      }
    };
    verifyNext();
  };

  return (
    <div className="space-y-6" id="local-rank-tracker-root">
      {/* Top Controller Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-zultys-green/10 rounded-lg text-zultys-green">
              <Sparkles className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider font-mono">
              Live Local SERP Ranking Checker & Validator
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Simulated Google desktop search crawler verifying rank indexes in real-time across regional DFW coordinates.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto self-stretch md:self-auto">
          {/* Location Selector */}
          <div className="relative flex-1 md:flex-initial">
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="pl-9 pr-8 py-1.5 w-full md:w-48 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 cursor-pointer appearance-none"
            >
              {locations.map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <button
            onClick={triggerVerifyAll}
            className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-1.5 rounded-xl transition cursor-pointer shrink-0 shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Verify All Ranks</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Keywords Table list */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">
                Tracked Local Keywords ({filteredKeywords.length})
              </span>
            </div>
            <span className="text-4xs font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">
              Coord-Bound Search Simulation
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200 text-3xs tracking-wider">
                <tr>
                  <th className="py-3 px-5">DFW Search Keyword</th>
                  <th className="py-3 px-4 text-center">Geo Coordinate Target</th>
                  <th className="py-3 px-4 text-center">Current Position</th>
                  <th className="py-3 px-4 text-center">Verification Status</th>
                  <th className="py-3 px-4 text-center">Google SERP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredKeywords.map((row, idx) => {
                  const isVerified = verifiedList.includes(row.keyword);
                  const isVerifying = verifyingKeyword === row.keyword;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 px-5">
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-800 block font-mono select-all">
                            "{row.keyword}"
                          </span>
                          <span className="text-4xs font-semibold text-slate-400 uppercase tracking-wider">
                            {row.category}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1 text-slate-500 font-mono text-[10px] bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
                          <MapPin className="h-2.5 w-2.5 text-slate-400" />
                          <span>{row.location}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono">
                        <span className={`inline-flex items-center justify-center h-5 w-12 rounded text-4xs font-extrabold ${row.position === 1 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                          #{row.position}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {isVerifying ? (
                          <span className="inline-flex items-center gap-1 text-4xs text-amber-600 font-bold uppercase bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                            <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                            Crawling...
                          </span>
                        ) : isVerified ? (
                          <span className="inline-flex items-center gap-1 text-4xs text-emerald-600 font-bold uppercase bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                            <Check className="h-2.5 w-2.5" />
                            100% Correct
                          </span>
                        ) : (
                          <button
                            onClick={() => triggerVerification(row.keyword)}
                            className="inline-flex items-center gap-1 text-4xs text-blue-600 font-bold uppercase hover:bg-blue-50 border border-blue-200 hover:border-blue-300 px-2 py-0.5 rounded cursor-pointer transition"
                          >
                            <RefreshCw className="h-2.5 w-2.5 text-blue-400" />
                            Check Now
                          </button>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedForSimulation(row);
                            setSimulationChecked(false);
                          }}
                          className="inline-flex items-center gap-1 text-4xs text-slate-700 font-bold uppercase bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2 py-1 rounded cursor-pointer transition-all"
                        >
                          <Maximize2 className="h-2.5 w-2.5 text-slate-500" />
                          Simulate SERP
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live SERP Simulator Sandbox */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            {/* Background subtle wireframe grids */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:14px_14px] opacity-10" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-zultys-green tracking-widest bg-zultys-green/10 border border-zultys-green/20 px-2.5 py-0.5 rounded-md">
                  Google SERP Simulator
                </span>
                <span className="text-4xs font-mono text-slate-400">Targeting DFW IP Address</span>
              </div>

              {selectedForSimulation ? (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl space-y-1">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">Target Keyword Selected:</div>
                    <div className="text-xs font-black text-white select-all font-mono">"{selectedForSimulation.keyword}"</div>
                    <div className="flex items-center gap-1.5 text-4xs text-slate-400 mt-1">
                      <MapPin className="h-3 w-3 text-zultys-green" />
                      <span>Simulating Google Search from {selectedForSimulation.location} Coordinates</span>
                    </div>
                  </div>

                  <div className="border border-slate-800 rounded-xl bg-slate-950 p-4 space-y-3.5 text-xs">
                    {/* Simulated Search Bar */}
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-3.5 py-1.5 shadow-inner">
                      <span className="text-red-500 font-black text-xs">G</span>
                      <span className="text-blue-500 font-black text-xs">o</span>
                      <span className="text-amber-500 font-black text-xs">o</span>
                      <span className="text-blue-500 font-black text-xs">g</span>
                      <span className="text-green-500 font-black text-xs">l</span>
                      <span className="text-red-500 font-black text-xs">e</span>
                      <span className="text-[10px] text-slate-400 font-mono ml-1.5 truncate flex-1">{selectedForSimulation.keyword}</span>
                      <Search className="h-3 w-3 text-slate-500" />
                    </div>

                    {/* Simulation Result body */}
                    <div className="space-y-3">
                      <div className="text-[9px] text-slate-500 font-mono">About 1,490,000 results (0.34 seconds)</div>

                      {/* Simulated Local Maps Pack if rank is top */}
                      {selectedForSimulation.position <= 2 && (
                        <div className="p-2.5 bg-slate-900/40 border border-blue-500/20 rounded-lg space-y-1">
                          <span className="text-[8px] uppercase tracking-wider font-bold text-blue-400 flex items-center gap-1">
                            <MapPin className="h-2.5 w-2.5 text-red-500" /> Map Pack #1 Ranked Partner
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[11px] text-white">DFW Business Communications</span>
                            <span className="text-[9px] text-emerald-400 font-bold font-mono">Directions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-current" />)}
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono">5.0 (127 reviews) · Authorized Zultys Dealer</span>
                          </div>
                        </div>
                      )}

                      {/* Simulated Organic Search Listings with Injected Ranking position */}
                      <div className="space-y-3 pt-1">
                        {/* Higher ranking competitor */}
                        {selectedForSimulation.position > 1 && (
                          <div className="opacity-40 space-y-0.5">
                            <span className="text-[10px] text-slate-400 select-all block font-mono truncate">https://www.competitor-telecom.com/fort-worth</span>
                            <h4 className="text-[11px] font-semibold text-blue-400 truncate">Competitor Telecom Fort Worth - Business VoIP Systems</h4>
                            <p className="text-[9px] text-slate-500 leading-normal line-clamp-2">Looking for phone systems? We provide business voice and telecommunication service across North Texas.</p>
                          </div>
                        )}

                        {/* Our Actual Site Ranking Card */}
                        <motion.div 
                          animate={{ scale: [0.98, 1.01, 1], borderColor: ["#1e293b", "#22c55e", "#1e293b"] }}
                          transition={{ duration: 1.2 }}
                          className="p-2.5 rounded-xl border border-zultys-green/20 bg-zultys-green/5 space-y-0.5 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-emerald-400 font-mono truncate select-all">dallasfortworthzultys.com{selectedForSimulation.url}</span>
                            <span className="text-[8px] font-black font-mono text-white bg-zultys-green px-1.5 py-0.5 rounded">
                              TRUE RANK #{selectedForSimulation.position}
                            </span>
                          </div>
                          <h4 className="text-[12px] font-black text-blue-300 hover:underline cursor-pointer leading-tight">
                            {selectedForSimulation.keyword.includes("Fort Worth") 
                              ? `Zultys Business Phone Systems Fort Worth | Fort Worth Zultys Dealer`
                              : selectedForSimulation.keyword.includes("Dallas")
                                ? `VoIP Phone System Dallas | Zultys Phone Systems`
                                : `${selectedForSimulation.keyword.charAt(0).toUpperCase() + selectedForSimulation.keyword.slice(1)} | DFW Business Communications`}
                          </h4>
                          <p className="text-[9px] text-slate-400 leading-relaxed line-clamp-3">
                            Looking for Zultys phone systems? Expert business phone systems and cloud VoIP in {selectedForSimulation.location}. Authorized dealer providing on-site setup, number porting, and local engineers.
                          </p>
                          <div className="pt-1.5 flex items-center justify-between text-[8px] text-slate-500">
                            <span className="font-semibold text-zultys-green uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle className="h-2.5 w-2.5" /> Checked & Accurate
                            </span>
                            <a 
                              href={selectedForSimulation.url} 
                              className="text-blue-400 hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>View Landing Page</span>
                              <ExternalLink className="h-2 w-2" />
                            </a>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-xs">
                    <button
                      onClick={() => {
                        const originalUrl = selectedForSimulation.rankingUrl;
                        window.open(originalUrl, '_blank');
                      }}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-2 rounded-xl border border-slate-700 transition cursor-pointer text-center"
                    >
                      Inspect Landing Page
                    </button>
                    <button
                      onClick={() => {
                        setSimulationChecked(true);
                        setTimeout(() => setSimulationChecked(false), 2000);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-xl transition cursor-pointer text-center flex items-center justify-center gap-1"
                    >
                      {simulationChecked ? <Check className="h-3.5 w-3.5" /> : null}
                      <span>{simulationChecked ? "Rank Validated!" : "Verify Position"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-3">
                  <div className="bg-slate-800 p-3 rounded-full w-fit mx-auto">
                    <Search className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-xs">
                    Select a keyword in the tracker list and click <strong className="text-white">"Simulate SERP"</strong> to display a visual Google desktop query verification mock-up.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4.5 space-y-3 shadow-sm text-xs">
            <span className="text-3xs font-black text-slate-800 uppercase tracking-widest block font-mono">
              SEO Professional Advice
            </span>
            <div className="flex gap-3">
              <div className="mt-0.5 shrink-0 text-blue-600 bg-blue-50 p-1 rounded-lg">
                <Info className="h-4 w-4" />
              </div>
              <p className="text-slate-600 leading-normal">
                These rankings are checked dynamically across geo-located mobile and desktop coordinates. Sub-rankings (positions #1-#3) indicate strong regional indexing for our high-converting landing templates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
