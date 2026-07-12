import React, { useState, useEffect } from 'react';
import { 
  Link2, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  FileCode, 
  ArrowRight, 
  Search, 
  Zap,
  Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export interface InternalLinkOpportunity {
  id: string;
  filePath: string;
  pageName: string;
  keyword: string;
  targetRoute: string;
  contextSnippet: string;
  lineNumber: number;
  status: 'pending' | 'applied';
}

interface InternalLinkAuditorProps {
  onClose?: () => void;
}

export function InternalLinkAuditor({ onClose }: InternalLinkAuditorProps) {
  const [opportunities, setOpportunities] = useState<InternalLinkOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'pending' | 'applied' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOpportunities = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch('/api/seo/internal-link-audit');
      const data = await res.json();
      if (data.success) {
        setOpportunities(data.opportunities);
      } else {
        toast.error('Failed to retrieve internal link audit report.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error connecting to internal link auditor API.');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleApplyLink = async (opportunity: InternalLinkOpportunity) => {
    setApplyingId(opportunity.id);
    try {
      const res = await fetch('/api/seo/apply-internal-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePath: opportunity.filePath,
          lineNumber: opportunity.lineNumber,
          keyword: opportunity.keyword,
          targetRoute: opportunity.targetRoute
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Successfully injected internal link to ${opportunity.targetRoute}!`);
        
        // Update local status
        setOpportunities(prev => 
          prev.map(opp => opp.id === opportunity.id ? { ...opp, status: 'applied' } : opp)
        );
      } else {
        toast.error(data.error || 'Failed to inject internal link.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error auto-injecting internal link.');
    } finally {
      setApplyingId(null);
    }
  };

  const handleApplyAllPending = async () => {
    const pendingOpps = filteredOpportunities.filter(o => o.status === 'pending');
    if (pendingOpps.length === 0) return;

    toast.info(`Auto-injecting ${pendingOpps.length} internal links...`);
    let successCount = 0;

    for (const opp of pendingOpps) {
      try {
        const res = await fetch('/api/seo/apply-internal-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filePath: opp.filePath,
            lineNumber: opp.lineNumber,
            keyword: opp.keyword,
            targetRoute: opp.targetRoute
          }),
        });
        const data = await res.json();
        if (data.success) {
          successCount++;
          setOpportunities(prev => 
            prev.map(item => item.id === opp.id ? { ...item, status: 'applied' } : item)
          );
        }
      } catch (e) {
        console.error("Failed to batch apply link:", e);
      }
    }

    if (successCount > 0) {
      toast.success(`Successfully batch-injected ${successCount} internal links!`);
    } else {
      toast.error('Failed to batch-inject links.');
    }
  };

  // Filter opportunities
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = 
      opp.pageName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      opp.filePath.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.targetRoute.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filter === 'pending') return opp.status === 'pending';
    if (filter === 'applied') return opp.status === 'applied';
    return true;
  });

  const pendingCount = opportunities.filter(o => o.status === 'pending').length;
  const appliedCount = opportunities.filter(o => o.status === 'applied').length;
  const totalCount = opportunities.length;
  const optimizationScore = totalCount > 0 ? Math.round((appliedCount / totalCount) * 100) : 100;

  // Highlights the keyword in the context snippet
  const highlightKeyword = (snippet: string, keyword: string) => {
    const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(${escapedKeyword})`, "gi");
    const parts = snippet.split(regex);
    return parts.map((part, idx) => 
      regex.test(part) ? (
        <span key={idx} className="bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded font-semibold border border-amber-500/30">
          {part}
        </span>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 max-w-4xl w-full mx-auto font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Link2 className="w-5 h-5 animate-pulse text-indigo-400" />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white">SEO Internal Link & Crawl Depth Auditor</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Scans text blocks in page files to find high-intent keyword references and automatically injects context-aware internal links to maximize GSC crawler depth and domain authority routing.
          </p>
        </div>
        
        {/* Real-time Link Metrics */}
        <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-2xl font-black text-indigo-400">{optimizationScore}%</div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Linked</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div className="text-center">
            <div className="text-2xl font-black text-slate-200">{pendingCount}</div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Unlinked</div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Filter Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setFilter('pending')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filter === 'pending'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Missing Links ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('applied')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filter === 'applied'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Injected Links ({appliedCount})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filter === 'all'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Opportunities ({totalCount})
          </button>
        </div>

        {/* Search, Action, & Rescan */}
        <div className="flex gap-2 w-full sm:w-auto items-center">
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search keyword/page..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          
          {filter === 'pending' && pendingCount > 0 && (
            <button
              onClick={handleApplyAllPending}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-lg text-xs font-semibold transition-all shadow-md shrink-0"
              title="Apply all filtered opportunities"
            >
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
              <span>Apply All ({pendingCount})</span>
            </button>
          )}

          <button
            onClick={() => fetchOpportunities()}
            disabled={loading}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors disabled:opacity-50 shrink-0"
            title="Rescan site for internal links"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="p-6 max-h-[500px] overflow-y-auto custom-scrollbar bg-slate-900/60">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-xs text-slate-400">Running semantic search and structural crawl-depth analysis across src/pages...</p>
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="text-center py-12 bg-slate-950/20 rounded-xl border border-dashed border-slate-800">
            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white">Crawl Architecture Perfectly Connected!</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No missing context-aware internal links detected. Your local-SEO and hardware silos are completely integrated.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredOpportunities.map(opp => {
                const isPending = opp.status === 'pending';
                return (
                  <motion.div
                    key={opp.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-4 rounded-xl border transition-all ${
                      isPending
                        ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/20'
                        : 'bg-emerald-950/10 border-emerald-900/20 hover:border-emerald-500/20'
                    }`}
                  >
                    {/* Item header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                          isPending ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          Source: {opp.pageName}
                        </span>
                        <span className="text-slate-500 text-xs flex items-center gap-1">
                          <FileCode className="w-3.5 h-3.5 text-slate-600" />
                          {opp.filePath}:{opp.lineNumber}
                        </span>
                      </div>
                      
                      {/* Connection indicator */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <span className="text-slate-400 font-medium font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {opp.keyword}
                        </span>
                        <ArrowRight className="w-3 h-3 text-indigo-400" />
                        <span className="text-indigo-300 font-semibold font-mono bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/40">
                          {opp.targetRoute}
                        </span>
                      </div>
                    </div>

                    {/* Context Snippet */}
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 mb-3 text-xs text-slate-300 leading-relaxed font-sans">
                      <span className="text-slate-500 select-none mr-2 font-mono">{opp.lineNumber} |</span>
                      {highlightKeyword(opp.contextSnippet, opp.keyword)}
                    </div>

                    {/* Actions and details */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-[10px] text-slate-500">
                        {isPending ? (
                          <span className="flex items-center gap-1 text-amber-400/80">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Unlinked keyword found inside standard text paragraph
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Successfully injected &lt;Link to="{opp.targetRoute}"&gt; code structure!
                          </span>
                        )}
                      </div>

                      {isPending ? (
                        <button
                          onClick={() => handleApplyLink(opp)}
                          disabled={applyingId === opp.id}
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                        >
                          {applyingId === opp.id ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              Injecting...
                            </>
                          ) : (
                            <>
                              <Zap className="w-3 h-3 text-indigo-200 fill-indigo-200" />
                              Auto-Inject Link
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-medium">
                          Completed
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="bg-slate-950 px-6 py-4 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span className="text-[10px] text-slate-500">
          * Links are injected cleanly via the virtual React HashLink Router layer in real-time.
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white px-4 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
          >
            Close Dashboard
          </button>
        )}
      </div>
    </div>
  );
}
