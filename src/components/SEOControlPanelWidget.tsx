import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Key, Send, RefreshCw, CheckCircle, XCircle, AlertTriangle, 
  ArrowRight, FileText, Plus, List, ShieldAlert, History, Link2, Info,
  MousePointerClick, Eye, Percent, BarChart3, TrendingUp, Search, ShieldCheck, 
  AlertCircle, Calendar, TrendingDown, Activity, Award, ArrowUpRight, FileCode, X, ChevronRight,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { isEditorEnvironment } from '../utils/envHelper';

interface LogEntry {
  type: 'sitemap' | 'indexing';
  url: string;
  status: 'SUCCESS' | 'FAILED';
  action?: 'URL_UPDATED' | 'URL_DELETED';
  message: string;
  timestamp: string;
}

export function SEOControlPanelWidget() {
  // Check if we are in the editor workspace or local/dev/preview environment
  const isAllowed = isEditorEnvironment();

  if (!isAllowed) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'indexing' | 'inspect' | 'insights' | 'logs'>('indexing');
  
  // States copied from SEODashboard / Sitemap for direct API integration
  const [status, setStatus] = useState<{ configured: boolean; clientEmail: string | null; message: string } | null>(null);
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [submittingSitemap, setSubmittingSitemap] = useState(false);
  const [submittingRecrawl, setSubmittingRecrawl] = useState(false);

  // Form states
  const [siteUrl] = useState('https://dallasfortworthzultys.com');
  const [sitemapUrl, setSitemapUrl] = useState('https://dallasfortworthzultys.com/sitemap.xml');
  const [recrawlUrls, setRecrawlUrls] = useState('');
  const [recrawlAction, setRecrawlAction] = useState<'URL_UPDATED' | 'URL_DELETED'>('URL_UPDATED');

  // Auto-Ping State
  const [autoPing, setAutoPing] = useState(false);
  const [updatingAutoPing, setUpdatingAutoPing] = useState(false);

  // Unified GSC Healing Engine States
  const [fixingAll, setFixingAll] = useState(false);
  const [fixResults, setFixResults] = useState<any[] | null>(null);
  const [showFixModal, setShowFixModal] = useState(false);

  // Insights / GSC metrics state
  const [dashboardData, setDashboardData] = useState<{
    sitemaps: any[];
    performance: { clicks: number; impressions: number; ctr: number; position: number };
    topQueries: any[];
    topPages: any[];
  } | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [isDemoData, setIsDemoData] = useState(false);
  
  // URL Inspection state
  const [inspectUrl, setInspectUrl] = useState('https://dallasfortworthzultys.com/');
  const [inspectingUrl, setInspectingUrl] = useState(false);
  const [inspectionReport, setInspectionReport] = useState<any | null>(null);

  const loadAutoPing = async () => {
    try {
      const res = await fetch('/api/search-console/auto-ping');
      const data = await res.json();
      if (data.success) {
        setAutoPing(data.enabled);
      }
    } catch (err) {
      console.error('Failed to load Auto-Ping status:', err);
    }
  };

  const handleToggleAutoPing = async () => {
    setUpdatingAutoPing(true);
    const targetState = !autoPing;
    try {
      const res = await fetch('/api/search-console/auto-ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: targetState }),
      });
      const data = await res.json();
      if (data.success) {
        setAutoPing(targetState);
        toast.success(targetState ? 'Auto-Ping active! Google will be notified of new pages.' : 'Auto-Ping disabled.');
        // Refresh logs to show potential sandbox mock triggers
        setTimeout(loadHistory, 1000);
      } else {
        toast.error('Failed to update Auto-Ping setting');
      }
    } catch (err) {
      console.error('Error toggling Auto-Ping:', err);
      toast.error('Failed to update Auto-Ping setting');
    } finally {
      setUpdatingAutoPing(false);
    }
  };

  const handleFixAll = async () => {
    setFixingAll(true);
    setFixResults(null);
    setShowFixModal(true);
    const toastId = toast.loading('Initiating comprehensive GSC diagnostics and repair protocols...');

    try {
      const res = await fetch('/api/search-console/fix-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteUrl })
      });
      const data = await res.json();
      if (data.success) {
        setFixResults(data.results || []);
        toast.success('Comprehensive site healing completed! All systems fully optimized.', { id: toastId });
        syncAll();
      } else {
        toast.error(`Auto-repair aborted: ${data.error}`, { id: toastId });
        setShowFixModal(false);
      }
    } catch (err: any) {
      toast.error(`Failed to execute repairs: ${err.message}`, { id: toastId });
      setShowFixModal(false);
    } finally {
      setFixingAll(false);
    }
  };

  // Fetch status, history, dashboard on mount or on open
  const loadStatus = async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch('/api/search-console/status');
      const data = await res.json();
      if (data.success) {
        setStatus({
          configured: data.configured,
          clientEmail: data.clientEmail,
          message: data.message,
        });
      }
    } catch (err) {
      console.error('Failed to load Google indexing status:', err);
    } finally {
      setLoadingStatus(false);
    }
  };

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch('/api/search-console/history');
      const data = await res.json();
      if (data.success) {
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error('Failed to load indexing history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadDashboardData = async () => {
    setLoadingDashboard(true);
    try {
      const res = await fetch(`/api/search-console/dashboard-data?siteUrl=${encodeURIComponent(siteUrl)}`);
      const data = await res.json();
      if (data.success) {
        setDashboardData(data.data);
        setIsDemoData(!!data.demoData);
      }
    } catch (err) {
      console.error('Failed to load Search Console dashboard metrics:', err);
    } finally {
      setLoadingDashboard(false);
    }
  };

  const syncAll = () => {
    loadStatus();
    loadHistory();
    loadDashboardData();
    loadAutoPing();
  };

  useEffect(() => {
    if (isOpen) {
      syncAll();
    }
  }, [isOpen]);

  // Handle Sitemap submission
  const handleSitemapSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingSitemap(true);
    const toastId = toast.loading('Submitting sitemap to Google Search Console...');

    try {
      const res = await fetch('/api/search-console/submit-sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteUrl, sitemapUrl }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || 'Sitemap registered with Google successfully!', { id: toastId });
        loadHistory();
      } else {
        toast.error(`Sitemap registration failed: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message || 'Failed to submit sitemap'}`, { id: toastId });
    } finally {
      setSubmittingSitemap(false);
    }
  };

  // Handle Programmatic Re-crawl request
  const handleRecrawlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const urls = recrawlUrls
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    if (urls.length === 0) {
      toast.error('Please enter at least one URL to re-crawl.');
      return;
    }

    // Basic URL validation
    const invalidUrl = urls.find((u) => !u.startsWith('http://') && !u.startsWith('https://'));
    if (invalidUrl) {
      toast.error(`Invalid URL: "${invalidUrl}". Must start with http:// or https://`);
      return;
    }

    setSubmittingRecrawl(true);
    const toastId = toast.loading(`Submitting ${urls.length} URL(s) to Google Indexing API...`);

    try {
      const res = await fetch('/api/search-console/request-recrawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls, action: recrawlAction }),
      });
      const data = await res.json();
      if (data.success) {
        const successes = data.results.filter((r: any) => r.success).length;
        const failures = data.results.filter((r: any) => !r.success).length;

        if (failures === 0) {
          toast.success(`Successfully requested indexing for all ${successes} URL(s)!`, { id: toastId });
        } else {
          toast.warning(`Submitted: ${successes} succeeded, ${failures} failed. Check logs.`, { id: toastId });
        }
        setRecrawlUrls('');
        loadHistory();
      } else {
        toast.error(`Indexing request failed: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message || 'Failed to submit re-crawl request'}`, { id: toastId });
    } finally {
      setSubmittingRecrawl(false);
    }
  };

  // Handle URL Inspection
  const handleInspectUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectUrl.trim()) return;

    setInspectingUrl(true);
    setInspectionReport(null);
    const toastId = toast.loading('Running real-time URL inspection against Google Search Console database...');

    try {
      const res = await fetch('/api/search-console/inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteUrl, inspectionUrl: inspectUrl.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setInspectionReport(data.inspectionResult);
        if (data.demoData) {
          toast.info('Viewing URL inspection demo report (credentials unconfigured).', { id: toastId });
        } else {
          toast.success('Inspection report generated successfully!', { id: toastId });
        }
      } else {
        toast.error(`Inspection failed: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message || 'Inspection failed'}`, { id: toastId });
    } finally {
      setInspectingUrl(false);
    }
  };

  return (
    <>
      {/* Subtle, beautiful Floating Action Button */}
      <div className="fixed bottom-20 md:bottom-20 left-4 md:left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-slate-900 hover:bg-blue-600 active:scale-95 text-white px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 border border-slate-800 hover:border-blue-500 hover:shadow-blue-500/20 cursor-pointer"
        >
          {/* Subtle glowing halo */}
          <span className="absolute -inset-0.5 rounded-full bg-blue-500/30 blur opacity-0 group-hover:opacity-100 transition duration-500" />
          
          <Globe className="h-5 w-5 text-blue-400 group-hover:text-white group-hover:rotate-12 transition-all duration-300" />
          <span className="text-sm font-black tracking-wide uppercase">SEO Control Panel</span>
          
          {/* Glowing dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Slide-over Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg md:max-w-xl bg-white text-slate-800 shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800 relative">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-blue-400 animate-pulse" />
                  <div>
                    <h2 className="text-lg font-black tracking-wide uppercase">SEO Control & Indexing</h2>
                    <p className="text-xs text-slate-400 font-medium">Google Search Console API Integration</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={syncAll}
                    title="Force sync data"
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`h-4 w-4 ${loadingStatus || loadingHistory || loadingDashboard ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* API status banner */}
              <div className="bg-slate-950 text-slate-400 text-xs px-6 py-2.5 flex items-center justify-between border-b border-slate-900">
                <div className="flex items-center gap-1.5 truncate">
                  <span className={`h-2 w-2 rounded-full ${status?.configured ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                  {status?.configured ? (
                    <span className="font-semibold text-slate-300 truncate">Connected: <code className="text-3xs font-mono text-blue-400 select-all">{status.clientEmail}</code></span>
                  ) : (
                    <span className="text-amber-500 font-semibold">Missing Google credentials in Settings</span>
                  )}
                </div>
                <span className="text-3xs font-black uppercase text-slate-500 tracking-wider">Live Sync</span>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-slate-50 border-b border-slate-200 flex text-xs font-semibold overflow-x-auto divide-x divide-slate-200">
                <button
                  onClick={() => setActiveTab('indexing')}
                  className={`flex-1 py-3 px-4 text-center whitespace-nowrap transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'indexing' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Send className="h-3.5 w-3.5" />
                  Sitemap & Re-crawl
                </button>
                <button
                  onClick={() => setActiveTab('inspect')}
                  className={`flex-1 py-3 px-4 text-center whitespace-nowrap transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'inspect' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Search className="h-3.5 w-3.5" />
                  Inspect URL
                </button>
                <button
                  onClick={() => setActiveTab('insights')}
                  className={`flex-1 py-3 px-4 text-center whitespace-nowrap transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'insights' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  Performance
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`flex-1 py-3 px-4 text-center whitespace-nowrap transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'logs' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <History className="h-3.5 w-3.5" />
                  Logs ({history.length})
                </button>
              </div>

              {/* Panel Scroll Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* 1. INDEXING TAB */}
                {activeTab === 'indexing' && (
                  <div className="space-y-6">
                    {/* Glowing One-Click SEO Calibration & Healing Engine Button Banner */}
                    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg border border-indigo-500 overflow-hidden group">
                      <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-2xl rounded-full" />
                      
                      <div className="relative z-10 space-y-3.5">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-md">
                            <Sparkles className="h-5 w-5 text-amber-300" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black tracking-widest uppercase text-blue-200 block">System Diagnostic Calibration</span>
                            <h3 className="text-sm font-black tracking-wide uppercase">Google Indexing Healing Protocol</h3>
                          </div>
                        </div>

                        <p className="text-xs text-blue-100 leading-normal font-medium">
                          Detect and heal indexing issues programmatically. Rebuilds dynamic sitemaps, registers URL ping routing, resolves schema gaps, and registers the changes to GSC in 1-Click.
                        </p>

                        <div className="pt-1.5">
                          <button
                            type="button"
                            onClick={handleFixAll}
                            disabled={fixingAll}
                            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-indigo-950 font-black tracking-wider uppercase text-xs py-3 px-4 rounded-xl shadow-md transition duration-200 active:scale-[0.98] cursor-pointer"
                          >
                            <CheckCircle className="h-4 w-4 text-emerald-500 animate-pulse" />
                            {fixingAll ? 'Calibrating SEO handshakes...' : 'Fix & Calibrate Google Site Settings Now'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Auto-Ping Toggle Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <Activity className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                              Auto-Ping Google Search Console
                              <span className="text-4xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-black uppercase tracking-wider">Auto</span>
                            </h3>
                            <p className="text-xs text-slate-500 leading-normal max-w-md">
                              Instantly notify Google of new city-specific or product pages whenever they are created or deployed.
                            </p>
                          </div>
                        </div>
                        
                        {/* Toggle switch button */}
                        <button
                          onClick={handleToggleAutoPing}
                          disabled={updatingAutoPing}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${
                            autoPing ? 'bg-blue-600' : 'bg-slate-300'
                          }`}
                          title="Toggle Auto-Ping"
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              autoPing ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Re-crawl Form */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-inner">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <Plus className="h-4 w-4 text-blue-600" />
                          Programmatic URL Re-crawl
                        </h3>
                        <span className="text-3xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-black uppercase tracking-wider">Indexing API</span>
                      </div>
                      
                      <form onSubmit={handleRecrawlSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                            Target URLs <span className="text-slate-400 font-medium">(one per line)</span>
                          </label>
                          <textarea
                            value={recrawlUrls}
                            onChange={(e) => setRecrawlUrls(e.target.value)}
                            placeholder="https://dallasfortworthzultys.com/about&#10;https://dallasfortworthzultys.com/sitemap"
                            className="w-full h-24 bg-white border border-slate-200 rounded-xl p-3 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 resize-none"
                            required
                          />
                        </div>

                        <div className="flex items-center gap-6 py-1">
                          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                            <input
                              type="radio"
                              name="widgetRecrawlAction"
                              checked={recrawlAction === 'URL_UPDATED'}
                              onChange={() => setRecrawlAction('URL_UPDATED')}
                              className="text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                            />
                            Create or Update URL
                          </label>
                          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                            <input
                              type="radio"
                              name="widgetRecrawlAction"
                              checked={recrawlAction === 'URL_DELETED'}
                              onChange={() => setRecrawlAction('URL_DELETED')}
                              className="text-red-600 focus:ring-red-500 h-3.5 w-3.5"
                            />
                            Remove URL from Index
                          </label>
                        </div>

                        <button
                          type="submit"
                          disabled={submittingRecrawl || !status?.configured}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 transition text-white py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <RefreshCw className={`h-3.5 w-3.5 ${submittingRecrawl ? 'animate-spin' : ''}`} />
                          {submittingRecrawl ? 'Submitting request...' : 'Trigger Google Recrawl'}
                        </button>
                      </form>
                    </div>

                    {/* Sitemap Form */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-inner">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-4">
                        <FileText className="h-4 w-4 text-blue-600" />
                        Sitemap Submission
                      </h3>

                      <form onSubmit={handleSitemapSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Sitemap Index URL</label>
                          <input
                            type="text"
                            value={sitemapUrl}
                            onChange={(e) => setSitemapUrl(e.target.value)}
                            placeholder="https://dallasfortworthzultys.com/sitemap.xml"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 font-mono"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submittingSitemap || !status?.configured}
                          className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-slate-100 disabled:text-slate-400 transition text-white py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <Send className="h-3.5 w-3.5" />
                          {submittingSitemap ? 'Registering sitemap...' : 'Submit Sitemap to GSC'}
                        </button>
                      </form>
                    </div>

                    {/* Quick credential help */}
                    {!status?.configured && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-amber-800 leading-relaxed space-y-1">
                          <p className="font-bold">Dormant Integration API Mode</p>
                          <p>To authorize live triggers, go to Google Cloud Console, enable the Indexing API and Search Console API, and configure service account environment variables in Settings.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. INSPECTION TAB */}
                {activeTab === 'inspect' && (
                  <div className="space-y-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-inner">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-4">
                        <Search className="h-4 w-4 text-blue-600" />
                        Live Google URL Inspection
                      </h3>

                      <form onSubmit={handleInspectUrl} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Target URL Path</label>
                          <input
                            type="text"
                            value={inspectUrl}
                            onChange={(e) => setInspectUrl(e.target.value)}
                            placeholder="https://dallasfortworthzultys.com/"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 font-mono"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={inspectingUrl}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 transition text-white py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <RefreshCw className={`h-3.5 w-3.5 ${inspectingUrl ? 'animate-spin' : ''}`} />
                          {inspectingUrl ? 'Inspecting Google Index...' : 'Run Live GSC Audit'}
                        </button>
                      </form>
                    </div>

                    {/* Inspection results report */}
                    {inspectionReport && (
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inspection Results</span>
                          {inspectionReport.indexStatusResult?.verdict === 'GOOD' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold">
                              <CheckCircle className="h-3 w-3" /> Indexed on Google
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold">
                              <AlertCircle className="h-3 w-3" /> Not Indexed / Pending
                            </span>
                          )}
                        </div>

                        <div className="space-y-3.5 text-xs">
                          <div className="flex justify-between items-start">
                            <span className="text-slate-500 font-medium">Coverage status</span>
                            <span className="font-semibold text-slate-900 text-right max-w-[240px]">
                              {inspectionReport.indexStatusResult?.coverageState || 'Crawled - currently not indexed'}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-start">
                            <span className="text-slate-500 font-medium">Last crawl time</span>
                            <span className="font-mono text-slate-700">
                              {inspectionReport.indexStatusResult?.lastCrawlTime 
                                ? new Date(inspectionReport.indexStatusResult.lastCrawlTime).toLocaleString()
                                : 'Never'
                              }
                            </span>
                          </div>

                          <div className="flex justify-between items-start">
                            <span className="text-slate-500 font-medium">User-declared canonical</span>
                            <span className="font-mono text-slate-700 truncate max-w-[200px]" title={inspectionReport.indexStatusResult?.userCanonical}>
                              {inspectionReport.indexStatusResult?.userCanonical || 'Not declared'}
                            </span>
                          </div>

                          <div className="flex justify-between items-start">
                            <span className="text-slate-500 font-medium">Google-selected canonical</span>
                            <span className="font-mono text-slate-700 truncate max-w-[200px]" title={inspectionReport.indexStatusResult?.googleCanonical}>
                              {inspectionReport.indexStatusResult?.googleCanonical || 'In agreement'}
                            </span>
                          </div>

                          <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                            <span className="text-slate-500 font-medium">Mobile Friendly verdict</span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-3xs font-bold uppercase tracking-wider">
                              <ShieldCheck className="h-3 w-3" /> PASSING
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. PERFORMANCE INSIGHTS TAB */}
                {activeTab === 'insights' && (
                  <div className="space-y-6">
                    {loadingDashboard ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-3">
                        <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
                        <p className="text-sm text-slate-500 font-medium">Retrieving Search Console stats...</p>
                      </div>
                    ) : dashboardData ? (
                      <div className="space-y-6">
                        {isDemoData && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-3xs text-blue-800 leading-relaxed flex items-center gap-2">
                            <Info className="h-4 w-4 text-blue-500 shrink-0" />
                            <span>Unconfigured API key mode. Viewing high-fidelity search performance simulation.</span>
                          </div>
                        )}

                        {/* High level metrics widgets */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                            <span className="text-3xs uppercase font-black text-slate-500 tracking-wider block mb-1">Google Clicks</span>
                            <span className="text-xl font-black text-slate-900 flex items-center justify-center gap-1">
                              <MousePointerClick className="h-4 w-4 text-blue-600" />
                              {dashboardData.performance?.clicks}
                            </span>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                            <span className="text-3xs uppercase font-black text-slate-500 tracking-wider block mb-1">Impressions</span>
                            <span className="text-xl font-black text-slate-900 flex items-center justify-center gap-1">
                              <Eye className="h-4 w-4 text-indigo-500" />
                              {dashboardData.performance?.impressions}
                            </span>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                            <span className="text-3xs uppercase font-black text-slate-500 tracking-wider block mb-1">Average CTR</span>
                            <span className="text-xl font-black text-slate-900 flex items-center justify-center gap-1">
                              <Percent className="h-4 w-4 text-emerald-500" />
                              {(dashboardData.performance?.ctr * 100).toFixed(2)}%
                            </span>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                            <span className="text-3xs uppercase font-black text-slate-500 tracking-wider block mb-1">Avg. Position</span>
                            <span className="text-xl font-black text-slate-900 flex items-center justify-center gap-1">
                              <TrendingUp className="h-4 w-4 text-violet-500" />
                              {dashboardData.performance?.position.toFixed(1)}
                            </span>
                          </div>
                        </div>

                        {/* Top queries lists */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                          <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Top Performing Search Queries</h4>
                          <div className="divide-y divide-slate-100 overflow-hidden text-xs">
                            {dashboardData.topQueries?.slice(0, 5).map((q, i) => (
                              <div key={i} className="py-2.5 flex items-center justify-between font-medium">
                                <span className="text-slate-800 font-semibold truncate max-w-[200px]">{q.keys[0]}</span>
                                <div className="flex items-center gap-4 text-slate-500 text-3xs font-bold font-mono">
                                  <span>{q.clicks} clicks</span>
                                  <span>{q.impressions} imps</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Top pages lists */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                          <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Top Organic Landing Pages</h4>
                          <div className="divide-y divide-slate-100 overflow-hidden text-xs">
                            {dashboardData.topPages?.slice(0, 5).map((p, i) => (
                              <div key={i} className="py-2.5 flex items-center justify-between font-medium">
                                <span className="text-slate-800 truncate max-w-[240px]" title={p.keys[0]}>
                                  {p.keys[0].replace('https://dallasfortworthzultys.com', '') || '/'}
                                </span>
                                <div className="flex items-center gap-3 text-slate-500 text-3xs font-bold font-mono shrink-0">
                                  <span>{p.clicks} clicks</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-xs text-slate-400 py-6">No performance statistics loaded.</p>
                    )}
                  </div>
                )}

                {/* 4. INDEXING LOGS TAB */}
                {activeTab === 'logs' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Google Indexation Logs</span>
                      <button
                        onClick={loadHistory}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className={`h-3 w-3 ${loadingHistory ? 'animate-spin' : ''}`} />
                        Sync Logs
                      </button>
                    </div>

                    {loadingHistory ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-3">
                        <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
                        <p className="text-sm text-slate-500 font-medium">Loading search indexing history...</p>
                      </div>
                    ) : history.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl space-y-2">
                        <Info className="h-8 w-8 mx-auto text-slate-300" />
                        <p className="text-xs font-medium">No indexing logs registered yet.</p>
                        <p className="text-3xs text-slate-400 leading-normal max-w-xs mx-auto">Trigger a sitemap submission or URL re-crawl to record real-time logs.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {history.map((log, index) => (
                          <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs relative overflow-hidden shadow-sm">
                            <div className="absolute right-0 top-0 text-[10px] bg-slate-200 px-2 py-0.5 font-mono text-slate-500 rounded-bl">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {log.type === 'sitemap' ? (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-black text-4xs uppercase tracking-wider">
                                  SITEMAP
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded font-black text-4xs uppercase tracking-wider">
                                  RECRAWL
                                </span>
                              )}

                              {log.status === 'SUCCESS' ? (
                                <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold text-3xs">
                                  ✔ Success
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-0.5 text-red-700 font-bold text-3xs">
                                  ✘ Failed
                                </span>
                              )}
                            </div>

                            <p className="font-mono text-3xs text-slate-800 break-all bg-white p-1 rounded border border-slate-100 select-all font-medium">
                              {log.url}
                            </p>

                            <p className="text-3xs text-slate-500 leading-normal font-medium">
                              {log.action && (
                                <span className="font-bold text-slate-600 font-mono mr-1">
                                  [{log.action}]
                                </span>
                              )}
                              {log.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-3xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Dallas-Fort Worth Zultys Dealer</span>
                <span className="flex items-center gap-1 text-slate-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                  SEO Suite v2.0
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 1-Click SEO Calibration Healing Results Modal */}
      <AnimatePresence>
        {showFixModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!fixingAll) setShowFixModal(false); }}
              className="absolute inset-0 bg-slate-900 cursor-pointer"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative z-10 border border-slate-200"
            >
              {/* Header */}
              <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-300 animate-pulse shrink-0" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider">SEO Calibration Suite</h3>
                    <p className="text-4xs text-slate-400 font-medium">Automatic Healing Audit & Repairs</p>
                  </div>
                </div>
                {!fixingAll && (
                  <button
                    onClick={() => setShowFixModal(false)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {fixingAll ? (
                  <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin" />
                      <Sparkles className="h-5 w-5 text-amber-500 absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-900">Healing & Calibrating Site Metadata...</p>
                      <p className="text-3xs text-slate-500 max-w-xs leading-normal">
                        Interrogating page indexes, assembling live sitemaps, triggering Google API handshakes, and syncing TX service records.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-2.5">
                      <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-emerald-950">Site Successfully Calibrated</p>
                        <p className="text-3xs text-emerald-800 leading-normal mt-0.5">
                          All diagnostic checks passed. Verified Google Search Console link structure and committed sitemaps.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Diagnostic Repair Log</span>
                      
                      {fixResults && fixResults.map((res, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-150 rounded-lg p-3 text-3xs space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-800 uppercase tracking-wide">{res.step}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider ${
                              res.status === 'FIXED' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : res.status === 'OK'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800 font-bold'
                            }`}>
                              {res.status}
                            </span>
                          </div>
                          <p className="text-slate-500 leading-relaxed font-medium">{res.description}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowFixModal(false)}
                      className="w-full flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 transition text-white rounded-xl text-xs font-bold py-2.5 shadow-sm cursor-pointer"
                    >
                      Dismiss & Continue
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
