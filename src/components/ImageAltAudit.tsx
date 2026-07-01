import React, { useState, useEffect } from 'react';
import { 
  Image, 
  Sparkles, 
  Save, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  FileCode, 
  ArrowRight, 
  Search, 
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export interface ImageAuditItem {
  id: string;
  filePath: string;
  lineNumber: number;
  tagName: string;
  rawLine: string;
  src: string;
  alt: string | null;
  status: 'missing' | 'empty' | 'valid';
  pageName: string;
}

interface ImageAltAuditProps {
  onClose?: () => void;
}

export function ImageAltAudit({ onClose }: ImageAltAuditProps) {
  const [items, setItems] = useState<ImageAuditItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fixingId, setFixingId] = useState<string | null>(null);
  const [suggestingId, setSuggestingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'needs_opt' | 'optimized'>('needs_opt');
  const [searchQuery, setSearchQuery] = useState('');
  const [customAlts, setCustomAlts] = useState<Record<string, string>>({});

  const fetchItems = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch('/api/scan-images');
      const data = await res.json();
      if (data.success) {
        setItems(data.items);
        
        // Initialize custom inputs with current alt text
        const initialAlts: Record<string, string> = {};
        data.items.forEach((item: ImageAuditItem) => {
          initialAlts[item.id] = item.alt || '';
        });
        setCustomAlts(initialAlts);
      } else {
        toast.error('Failed to retrieve image audit report.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error connecting to image scanner API.');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSuggest = async (id: string, pageName: string, src: string) => {
    setSuggestingId(id);
    try {
      const res = await fetch('/api/suggest-alt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageName, src }),
      });
      const data = await res.json();
      if (data.success) {
        setCustomAlts(prev => ({
          ...prev,
          [id]: data.suggestion
        }));
        toast.success('Generated descriptive SEO recommendation!');
      } else {
        toast.error('Could not auto-generate suggestion.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error calling suggest API.');
    } finally {
      setSuggestingId(null);
    }
  };

  const handleApplyFix = async (item: ImageAuditItem) => {
    const newAlt = customAlts[item.id]?.trim();
    if (!newAlt) {
      toast.error('Please enter a descriptive alt tag before saving.');
      return;
    }

    setFixingId(item.id);
    try {
      const res = await fetch('/api/update-alt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePath: item.filePath,
          lineNumber: item.lineNumber,
          newAlt
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Successfully updated ${item.pageName} alt tag in code!`);
        // Silently refresh list to capture update
        await fetchItems(true);
      } else {
        toast.error(data.message || 'Failed to update file.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error writing alt tag to code.');
    } finally {
      setFixingId(null);
    }
  };

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.pageName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.filePath.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.src.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filter === 'needs_opt') {
      return item.status === 'missing' || item.status === 'empty';
    }
    if (filter === 'optimized') {
      return item.status === 'valid';
    }
    return true;
  });

  const needsOptCount = items.filter(i => i.status === 'missing' || i.status === 'empty').length;
  const optimizedCount = items.filter(i => i.status === 'valid').length;
  const totalCount = items.length;
  const healthScore = totalCount > 0 ? Math.round((optimizedCount / totalCount) * 100) : 100;

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 max-w-4xl w-full mx-auto font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Sparkle className="w-5 h-5 animate-pulse" />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white">Owner SEO Image Indexing & Alt Tag Auditor</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Scans source files dynamically to locate raw image tags, auto-suggest premium descriptive keywords, and write corrections directly into the code base.
          </p>
        </div>
        
        {/* Real-time Health Metrics */}
        <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-2xl font-black text-emerald-400">{healthScore}%</div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">SEO Score</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div className="text-center">
            <div className="text-2xl font-black text-slate-200">{needsOptCount}</div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Fix Pending</div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Filter Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setFilter('needs_opt')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filter === 'needs_opt'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Needs Alt Tag ({needsOptCount})
          </button>
          <button
            onClick={() => setFilter('optimized')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filter === 'optimized'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Fully Optimized ({optimizedCount})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filter === 'all'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Images ({totalCount})
          </button>
        </div>

        {/* Search & Refresh */}
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search page or file..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            onClick={() => fetchItems()}
            disabled={loading}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            title="Rescan project"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="p-6 max-h-[500px] overflow-y-auto custom-scrollbar bg-slate-900/60">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
            <p className="text-xs text-slate-400">Analyzing src directory for JSX image elements...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-slate-950/20 rounded-xl border border-dashed border-slate-800">
            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white">All Clear in this Section!</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No images matched your filter. Images are properly indexed with search-friendly descriptors.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => {
                const isNeedsOpt = item.status === 'missing' || item.status === 'empty';
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-4 rounded-xl border transition-all ${
                      isNeedsOpt
                        ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/20'
                        : 'bg-emerald-950/10 border-emerald-900/20 hover:border-emerald-500/20'
                    }`}
                  >
                    {/* Item header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                          isNeedsOpt ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {item.pageName} Page
                        </span>
                        <span className="text-slate-500 text-xs flex items-center gap-1">
                          <FileCode className="w-3.5 h-3.5 text-slate-600" />
                          {item.filePath}:{item.lineNumber}
                        </span>
                      </div>
                      
                      <div className="text-[11px] font-mono text-slate-400 truncate max-w-xs" title={item.src}>
                        Src: <span className="text-slate-300 font-medium">{item.src.substring(0, 40)}{item.src.length > 40 ? '...' : ''}</span>
                      </div>
                    </div>

                    {/* Original Tag Preview */}
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 mb-3 text-xs font-mono text-slate-300 overflow-x-auto">
                      <span className="text-slate-500 select-none mr-2">{item.lineNumber} |</span>
                      {item.rawLine}
                    </div>

                    {/* Edit controls */}
                    <div className="flex flex-col md:flex-row gap-3 items-end md:items-center">
                      <div className="flex-1 w-full">
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                          Descriptive Alt Attribute (SEO Google Index Keyword)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. Authorized Fort Worth Zultys Phone Partner and local support team"
                            value={customAlts[item.id] || ''}
                            onChange={e => setCustomAlts(prev => ({ ...prev, [item.id]: e.target.value }))}
                            className={`w-full bg-slate-950 border rounded-lg pl-3 pr-10 py-2 text-xs text-white focus:outline-none focus:ring-1 ${
                              isNeedsOpt 
                                ? 'border-slate-800 focus:border-amber-500 focus:ring-amber-500/20' 
                                : 'border-emerald-800/40 focus:border-emerald-500 focus:ring-emerald-500/20'
                            }`}
                          />
                          <button
                            onClick={() => handleSuggest(item.id, item.pageName, item.src)}
                            disabled={suggestingId === item.id}
                            className="absolute right-2 top-1.5 p-1 text-slate-400 hover:text-amber-400 transition-colors disabled:opacity-50"
                            title="Auto-generate optimized SEO suggestion"
                          >
                            <Sparkles className={`w-4 h-4 ${suggestingId === item.id ? 'animate-spin text-amber-400' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 w-full md:w-auto shrink-0">
                        <button
                          onClick={() => handleApplyFix(item)}
                          disabled={fixingId === item.id}
                          className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                            isNeedsOpt
                              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                              : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                          } disabled:opacity-50`}
                        >
                          {fixingId === item.id ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              Writing...
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" />
                              Apply Fix
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Pre-filled advice if lacking Alt */}
                    {isNeedsOpt && !customAlts[item.id] && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-amber-400/80">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Highly recommended to click the Sparkles icon on the right to auto-generate a custom local-SEO optimized Alt tag!</span>
                      </div>
                    )}
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
          * Code changes are committed directly to active TypeScript source files in real-time.
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
