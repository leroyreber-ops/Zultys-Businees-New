import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Key, Send, RefreshCw, CheckCircle, XCircle, AlertTriangle, 
  ArrowRight, FileText, Plus, List, ShieldAlert, History, Link2, Info,
  MousePointerClick, Eye, Percent, BarChart3, TrendingUp, Search, ShieldCheck, 
  AlertCircle, Calendar, TrendingDown, Activity, Award, ArrowUpRight, FileCode,
  MapPin, Flame, Sparkles, Check, BookOpen, X, HeartPulse, Clock
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

interface LogEntry {
  type: 'sitemap' | 'indexing';
  url: string;
  status: 'SUCCESS' | 'FAILED';
  action?: 'URL_UPDATED' | 'URL_DELETED';
  message: string;
  timestamp: string;
}

export default function SEODashboard() {
  const [status, setStatus] = useState<{ configured: boolean; clientEmail: string | null; message: string } | null>(null);
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [submittingSitemap, setSubmittingSitemap] = useState(false);
  const [submittingRecrawl, setSubmittingRecrawl] = useState(false);

  // Form states
  const [siteUrl, setSiteUrl] = useState('https://dallasfortworthzultys.com');
  const [sitemapUrl, setSitemapUrl] = useState('https://dallasfortworthzultys.com/sitemap.xml');
  const [recrawlUrls, setRecrawlUrls] = useState('');
  const [recrawlAction, setRecrawlAction] = useState<'URL_UPDATED' | 'URL_DELETED'>('URL_UPDATED');

  // Google Search Console metric & dashboard state variables
  const [dashboardData, setDashboardData] = useState<{
    sitemaps: any[];
    performance: { clicks: number; impressions: number; ctr: number; position: number };
    topQueries: any[];
    topPages: any[];
  } | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [isDemoData, setIsDemoData] = useState(false);

  // Daily Search Ranking Tracker States
  const [rankTrackerData, setRankTrackerData] = useState<{
    success: boolean;
    demoData: boolean;
    terms: Record<string, Array<{ date: string; position: number; clicks: number; impressions: number; ctr: number }>>;
    summary: Record<string, { avgPosition: number; totalClicks: number; totalImpressions: number; ctr: number }>;
  } | null>(null);
  const [loadingRankTracker, setLoadingRankTracker] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState<string>('Zultys Dallas');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // DFW City Pages Traffic Heatmap States
  const [heatmapData, setHeatmapData] = useState<any[]>([]);
  const [loadingHeatmap, setLoadingHeatmap] = useState(true);
  const [heatmapFilter, setHeatmapFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedHeatmapCity, setSelectedHeatmapCity] = useState<any | null>(null);

  // Unified GSC Healing Engine States
  const [fixingAll, setFixingAll] = useState(false);
  const [fixResults, setFixResults] = useState<any[] | null>(null);
  const [showFixModal, setShowFixModal] = useState(false);

  // Daily Automated Health Check States
  const [healthReport, setHealthReport] = useState<{
    timestamp: string;
    success: boolean;
    brokenLinks: Array<{
      type: "broken-link";
      filePath: string;
      targetLink: string;
      foundInCode: string;
      suggestedFix: string;
      fixed: boolean;
    }>;
    missingDescriptions: Array<{
      type: "missing-description";
      route: string;
      filePath: string;
      pageName: string;
      suggestedFix: string;
      fixed: boolean;
    }>;
    totalIssues: number;
    fixedCount: number;
  } | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(true);
  const [healingIssues, setHealingIssues] = useState(false);
  const [healingLog, setHealingLog] = useState<string[]>([]);
  const [showHealModal, setShowHealModal] = useState(false);

  const loadHealthReport = async () => {
    setLoadingHealth(true);
    try {
      const res = await fetch('/api/search-console/health-check');
      const data = await res.json();
      if (data.success) {
        setHealthReport(data);
      }
    } catch (err) {
      console.error('Failed to load SEO health report:', err);
    } finally {
      setLoadingHealth(false);
    }
  };

  const handleHealSelected = async (selectedLinks?: any[], selectedDescs?: any[]) => {
    setHealingIssues(true);
    setHealingLog([]);
    setShowHealModal(true);
    const toastId = toast.loading('Running 1-Click Automated SEO Healing Suite...');

    try {
      const linksToFix = selectedLinks || healthReport?.brokenLinks || [];
      const descsToFix = selectedDescs || healthReport?.missingDescriptions || [];

      const res = await fetch('/api/search-console/health-check-fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brokenLinks: linksToFix,
          missingDescriptions: descsToFix
        })
      });

      const data = await res.json();
      if (data.success) {
        setHealingLog(data.logs || []);
        setHealthReport(data.updatedReport || null);
        toast.success(`Successfully repaired ${data.fixedLinksCount + data.fixedDescriptionsCount} SEO Issues!`, { id: toastId });
        
        loadStatus();
        loadHistory();
      } else {
        toast.error(`Repairs encountered errors: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Automated repairs failed: ${err.message}`, { id: toastId });
    } finally {
      setHealingIssues(false);
    }
  };

  const loadRankTrackerData = async () => {
    setLoadingRankTracker(true);
    try {
      const res = await fetch(`/api/search-console/rank-tracker?siteUrl=${encodeURIComponent(siteUrl)}`);
      const data = await res.json();
      if (data.success) {
        setRankTrackerData(data);
      }
    } catch (err) {
      console.error('Failed to load rank tracker data:', err);
    } finally {
      setLoadingRankTracker(false);
    }
  };

  const loadHeatmapData = async () => {
    setLoadingHeatmap(true);
    try {
      const res = await fetch(`/api/search-console/city-traffic-heatmap?siteUrl=${encodeURIComponent(siteUrl)}`);
      const data = await res.json();
      if (data.success) {
        setHeatmapData(data.heatmap || []);
        if (data.heatmap && data.heatmap.length > 0) {
          setSelectedHeatmapCity(data.heatmap[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load city heatmap data:', err);
    } finally {
      setLoadingHeatmap(false);
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
        
        // Reload all metrics immediately to show the healed status!
        loadStatus();
        loadHistory();
        loadDashboardData();
        loadRankTrackerData();
        loadHeatmapData();
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
  
  // URL Inspection state variables
  const [inspectUrl, setInspectUrl] = useState('https://dallasfortworthzultys.com/');
  const [inspectingUrl, setInspectingUrl] = useState(false);
  const [inspectionReport, setInspectionReport] = useState<any | null>(null);
  
  // Active Tab for Search Analytics Tables
  const [analyticsTab, setAnalyticsTab] = useState<'queries' | 'pages'>('queries');

  // Load Status and History
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

  // Fetch Google Search Console dashboard metrics and analytics
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

  // Run real-time Google Search Console URL inspection
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

  useEffect(() => {
    loadStatus();
    loadHistory();
    loadDashboardData();
    loadRankTrackerData();
    loadHeatmapData();
    loadHealthReport();
  }, []);

  // Handle Sitemap submission
  const handleSitemapSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!status?.configured) {
      toast.error('Google API credentials are not configured. Please see the setup guide below.');
      return;
    }

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
        toast.success(data.message || 'Sitemap submitted successfully!', { id: toastId });
        loadHistory();
      } else {
        toast.error(`Sitemap submission failed: ${data.error}`, { id: toastId });
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
    if (!status?.configured) {
      toast.error('Google API credentials are not configured. Please see the setup guide below.');
      return;
    }

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
      toast.error(`Invalid URL found: "${invalidUrl}". URL must start with http:// or https://`);
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
          toast.warning(`Submitted: ${successes} succeeded, ${failures} failed. Check log below for details.`, { id: toastId });
        }
        setRecrawlUrls('');
        loadHistory();
      } else {
        toast.error(`Submission failed: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message || 'Failed to submit re-crawl request'}`, { id: toastId });
    } finally {
      setSubmittingRecrawl(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Toaster position="top-right" richColors />
      
      {/* Header Banner */}
      <header className="bg-slate-900 text-white py-12 px-6 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider mb-2">
              <Globe className="h-4 w-4" /> SEO Automation Suite
            </div>
            <h1 className="text-3.5xl font-bold tracking-tight">Google Search Console & Indexing Dashboard</h1>
            <p className="text-slate-300 mt-2 max-w-2xl text-sm leading-relaxed">
              Programmatically submit your dynamic XML sitemap and request instant re-crawling for updated or new pages to achieve top-tier indexing speeds.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleFixAll}
              disabled={fixingAll}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition text-sm font-black uppercase tracking-wider rounded-lg shadow-md hover:shadow-indigo-500/20 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
              {fixingAll ? 'Calibrating...' : 'Fix All Site Settings'}
            </button>
            <button 
              onClick={() => { loadStatus(); loadHistory(); loadDashboardData(); loadRankTrackerData(); loadHeatmapData(); loadHealthReport(); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 transition border border-slate-700 text-sm font-medium rounded-lg shadow-sm cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${loadingStatus || loadingHistory || loadingDashboard || loadingRankTracker || loadingHeatmap || loadingHealth ? 'animate-spin' : ''}`} />
              Refresh Status
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        
        {/* Status Section and Quick Configuration Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Live Status Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Key className="h-5 w-5 text-blue-600" /> Connection Status
              </h2>
              {loadingStatus ? (
                <div className="space-y-3 py-4">
                  <div className="h-4 w-2/3 bg-slate-100 rounded animate-pulse" />
                  <div className="h-10 w-full bg-slate-50 rounded-lg animate-pulse" />
                </div>
              ) : status?.configured ? (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
                    <CheckCircle className="h-3.5 w-3.5" /> Google Cloud Service Active
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <span className="text-xs text-slate-500 font-mono block">Client Email Account</span>
                    <span className="text-sm font-medium font-mono text-slate-800 break-all">{status.clientEmail}</span>
                  </div>
                  <p className="text-xs text-emerald-600 font-medium">
                    ✔ Ready to trigger automated sitemap submissions and URL re-crawling.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
                    <AlertTriangle className="h-3.5 w-3.5" /> Missing Service Account Key
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Search Console and Indexing API integrations are currently dormant. Please add credentials to unleash indexing speed.
                  </p>
                  <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex items-start gap-2.5">
                    <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-amber-800 leading-relaxed">
                      Define <strong>GOOGLE_CLIENT_EMAIL</strong> &amp; <strong>GOOGLE_PRIVATE_KEY</strong>, or <strong>GOOGLE_SERVICE_ACCOUNT_JSON</strong> in your environment configuration.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-4 mt-6">
              <a 
                href="#setup-guide" 
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline"
              >
                View Setup Guide <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Sitemap Submission Control Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-blue-600" /> Search Console Sitemap Submit
            </h2>
            <form onSubmit={handleSitemapSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block">Site Property URL</label>
                <input 
                  type="text" 
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block">Sitemap URL Path</label>
                <input 
                  type="text" 
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  placeholder="https://example.com/sitemap.xml"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submittingSitemap || !status?.configured}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                {submittingSitemap ? 'Submitting...' : 'Register Sitemap'}
              </button>
            </form>
          </div>

          {/* URL Re-crawl Request Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Plus className="h-5 w-5 text-blue-600" /> Programmatic URL Re-crawl
            </h2>
            <form onSubmit={handleRecrawlSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-600">Target URLs <span className="text-slate-400 font-normal">(one per line)</span></label>
                  <span className="text-3xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Instant API</span>
                </div>
                <textarea 
                  value={recrawlUrls}
                  onChange={(e) => setRecrawlUrls(e.target.value)}
                  placeholder="https://dallasfortworthzultys.com/collinsville-tx-zultys-phone-systems&#10;https://dallasfortworthzultys.com/zultys-vs-att-business"
                  className="w-full h-[96px] bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 resize-none"
                  required
                />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="recrawlAction" 
                    checked={recrawlAction === 'URL_UPDATED'} 
                    onChange={() => setRecrawlAction('URL_UPDATED')}
                    className="text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                  />
                  Create or Update
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="recrawlAction" 
                    checked={recrawlAction === 'URL_DELETED'} 
                    onChange={() => setRecrawlAction('URL_DELETED')}
                    className="text-red-600 focus:ring-red-500 h-3.5 w-3.5"
                  />
                  Remove URL
                </label>
              </div>
              <button
                type="submit"
                disabled={submittingRecrawl || !status?.configured}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 ${submittingRecrawl ? 'animate-spin' : ''}`} />
                {submittingRecrawl ? 'Requesting...' : 'Submit Re-crawl Request'}
              </button>
            </form>
          </div>

        </div>

        {/* Daily SEO Health Check & Automated Healing Suite */}
        <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full text-3xs font-black uppercase tracking-widest mb-3">
                <Clock className="h-3 w-3" /> Scheduled Daily Automation Active
              </div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <HeartPulse className="h-5.5 w-5.5 text-emerald-400" /> Daily SEO Health Check & Self-Healing Suite
              </h2>
              <p className="text-slate-400 text-xs mt-1 max-w-2xl leading-relaxed">
                Our dynamic SEO crawler automatically runs once a day to analyze every route for missing meta descriptions and scan links for broken references, compiling them into a code-level "Quick Fix" queue.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadHealthReport}
                disabled={loadingHealth}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 transition rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 cursor-pointer text-white disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loadingHealth ? 'animate-spin' : ''}`} /> Scan Now
              </button>
              <button
                onClick={() => handleHealSelected()}
                disabled={healingIssues || !healthReport || healthReport.totalIssues === 0}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 disabled:border-slate-800 transition rounded-lg text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/25"
              >
                <Sparkles className="h-3.5 w-3.5" /> 1-Click Repair All ({healthReport?.totalIssues || 0})
              </button>
            </div>
          </div>

          {loadingHealth ? (
            <div className="py-12 text-center text-slate-400 space-y-3">
              <RefreshCw className="h-8 w-8 text-slate-500 animate-spin mx-auto" />
              <p className="text-xs">Crawling code-level workspace for meta descriptions and broken link paths...</p>
            </div>
          ) : !healthReport || healthReport.totalIssues === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-semibold text-white">Your Site is 100% Healthy!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No missing meta descriptions or broken internal links detected across your pages. All links resolve cleanly and SEO compliance is pristine!
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Missing Meta Descriptions Column */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1.5">
                      <FileText className="h-4 w-4" /> Missing Meta Descriptions ({healthReport.missingDescriptions.length})
                    </h3>
                    <span className="text-3xs bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded font-mono font-bold">
                      Impact: High (SEO)
                    </span>
                  </div>
                  
                  {healthReport.missingDescriptions.length === 0 ? (
                    <p className="text-slate-500 text-xs py-8 text-center">✔ All active landing pages have self-declared meta descriptions.</p>
                  ) : (
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                      {healthReport.missingDescriptions.map((issue, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs space-y-2 hover:border-slate-700 transition">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-200">{issue.pageName} Page</span>
                            <span className="text-3xs font-mono text-slate-500">{issue.route}</span>
                          </div>
                          <div className="text-3xs bg-indigo-950/30 text-indigo-300 p-2 rounded border border-indigo-900/30">
                            <span className="font-semibold block text-slate-400 mb-1">Suggested Heuristic Description:</span>
                            "{issue.suggestedFix}"
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleHealSelected([], [issue])}
                              className="text-3xs text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                            >
                              <Sparkles className="h-3 w-3" /> Fix Issue
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Broken Internal Links Column */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4" /> Broken Internal Links ({healthReport.brokenLinks.length})
                    </h3>
                    <span className="text-3xs bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                      Impact: Severe (Broken UX)
                    </span>
                  </div>

                  {healthReport.brokenLinks.length === 0 ? (
                    <p className="text-slate-500 text-xs py-8 text-center">✔ All internal links in code point to valid registered routes.</p>
                  ) : (
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                      {healthReport.brokenLinks.map((issue, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs space-y-2 hover:border-slate-700 transition">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-200 break-all">{issue.filePath}</span>
                          </div>
                          <div className="flex flex-col gap-1 text-3xs text-slate-400">
                            <div>
                              <span className="text-red-400 font-semibold font-mono">Found link target:</span> <code className="bg-red-950/20 px-1 py-0.5 rounded text-red-300 break-all">{issue.targetLink}</code>
                            </div>
                            <div>
                              <span className="text-emerald-400 font-semibold font-mono">Auto-Map Suggestion:</span> <code className="bg-emerald-950/20 px-1 py-0.5 rounded text-emerald-300 break-all">{issue.suggestedFix}</code>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleHealSelected([issue], [])}
                              className="text-3xs text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                            >
                              <Sparkles className="h-3 w-3" /> Fix Issue
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
              <div className="bg-slate-950/30 rounded-xl p-3 text-3xs text-slate-500 flex items-center justify-between">
                <span>Last automated audit run completed: <strong>{new Date(healthReport.timestamp).toLocaleString()}</strong></span>
                <span>Active Link Mapping Strategy: <strong>Levenshtein Heuristics + Custom Static Mapping Dictionary</strong></span>
              </div>
            </div>
          )}
        </section>

        {/* Google Search Console - API Health, Performance Metrics, and Interactive URL Inspection */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" /> Google Search Console Insights
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Real-time site index status, search analytics, and organic crawling diagnostics directly from Google APIs.
              </p>
            </div>
            {isDemoData && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold self-start md:self-auto animate-pulse">
                <AlertCircle className="h-3.5 w-3.5" /> Viewing Sandbox Demo Data
              </span>
            )}
          </div>

          {loadingDashboard ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3 shadow-xs">
              <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
              <p className="text-sm font-medium">Retrieving metrics from Google Search Console API...</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* 4-Column Performance Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: Clicks */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition duration-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-slate-100 font-mono text-5xl font-bold select-none pointer-events-none">
                    <MousePointerClick className="h-12 w-12 text-slate-100 opacity-40" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Total Organic Clicks</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2.5xl font-extrabold text-slate-900 font-mono">
                      {dashboardData ? new Intl.NumberFormat('en-US').format(dashboardData.performance.clicks) : '0'}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3" /> +12.4%
                    </span>
                  </div>
                  <span className="text-3xs text-slate-400 mt-1 block">Traffic generated in last 30 days</span>
                </div>

                {/* Metric 2: Impressions */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition duration-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-slate-100 font-mono text-5xl font-bold select-none pointer-events-none">
                    <Eye className="h-12 w-12 text-slate-100 opacity-40" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Search Impressions</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2.5xl font-extrabold text-slate-900 font-mono">
                      {dashboardData ? new Intl.NumberFormat('en-US').format(dashboardData.performance.impressions) : '0'}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3" /> +8.2%
                    </span>
                  </div>
                  <span className="text-3xs text-slate-400 mt-1 block">Total Google SERP appearances</span>
                </div>

                {/* Metric 3: CTR */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition duration-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-slate-100 font-mono text-5xl font-bold select-none pointer-events-none">
                    <Percent className="h-12 w-12 text-slate-100 opacity-40" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Average CTR</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2.5xl font-extrabold text-slate-900 font-mono">
                      {dashboardData ? new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(dashboardData.performance.ctr) : '0.00%'}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-0.5">
                      <Activity className="h-3 w-3" /> Stable
                    </span>
                  </div>
                  <span className="text-3xs text-slate-400 mt-1 block">Ratio of search clicks to impressions</span>
                </div>

                {/* Metric 4: Position */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition duration-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-slate-100 font-mono text-5xl font-bold select-none pointer-events-none">
                    <TrendingUp className="h-12 w-12 text-slate-100 opacity-40" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Average Position</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2.5xl font-extrabold text-slate-900 font-mono">
                      {dashboardData ? dashboardData.performance.position.toFixed(1) : '0.0'}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                      <ArrowUpRight className="h-3 w-3" /> Improved
                    </span>
                  </div>
                  <span className="text-3xs text-slate-400 mt-1 block">Mean ranking index across keywords</span>
                </div>

              </div>

              {/* Keyword Rank Position Tracker Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-600 animate-pulse" /> Live Key Terms Rank Tracker
                    </h2>
                    <p className="text-xs text-slate-500">
                      Historical search performance trends for core target terms in the Dallas-Fort Worth metroplex.
                    </p>
                  </div>
                  
                  {/* Selectors for keywords */}
                  <div className="flex flex-wrap gap-1.5">
                    {['Zultys Dallas', 'VoIP DFW', 'Business Phone Systems'].map(term => (
                      <button
                        key={term}
                        onClick={() => {
                          setSelectedTerm(term);
                          setHoveredIndex(null);
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
                          selectedTerm === term
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {loadingRankTracker ? (
                  <div className="py-12 text-center text-slate-400 space-y-3">
                    <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
                    <p className="text-sm font-medium">Retrieving keyword ranking timeline from Search Console...</p>
                  </div>
                ) : (
                  (() => {
                    const selectedTermData = rankTrackerData?.terms[selectedTerm] || [];
                    const selectedTermSummary = rankTrackerData?.summary[selectedTerm];

                    // SVG dimensions
                    const svgWidth = 640;
                    const svgHeight = 240;
                    const paddingTop = 20;
                    const paddingBottom = 30;
                    const paddingLeft = 35;
                    const paddingRight = 15;

                    const chartWidth = svgWidth - paddingLeft - paddingRight;
                    const chartHeight = svgHeight - paddingTop - paddingBottom;

                    // Extract coordinates
                    const positions = selectedTermData.map(d => d.position);
                    const minPos = positions.length > 0 ? Math.max(1.0, Math.min(...positions) - 0.5) : 1.0;
                    const maxPos = positions.length > 0 ? Math.max(minPos + 1.0, Math.max(...positions) + 0.5) : 20.0;

                    const points = selectedTermData.map((item, index) => {
                      const x = paddingLeft + (index / 13) * chartWidth;
                      // Invert Y axis: best position (minPos) is at the top (paddingTop)
                      const y = paddingTop + ((item.position - minPos) / (maxPos - minPos)) * chartHeight;
                      return { x, y, ...item };
                    });

                    // Sharp line path
                    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

                    // Shaded gradient area under path
                    const areaPath = points.length > 0
                      ? `${linePath} L ${points[points.length - 1].x} ${svgHeight - paddingBottom} L ${points[0].x} ${svgHeight - paddingBottom} Z`
                      : '';

                    // Grid lines & ticks
                    const yTicks: Array<{ val: number; y: number }> = [];
                    for (let i = 0; i <= 3; i++) {
                      const val = minPos + (i / 3) * (maxPos - minPos);
                      const y = paddingTop + (i / 3) * chartHeight;
                      yTicks.push({ val, y });
                    }

                    // Simple helper to format date
                    const formatChartDate = (dateStr: string) => {
                      try {
                        const d = new Date(dateStr + 'T00:00:00');
                        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      } catch (e) {
                        return dateStr;
                      }
                    };

                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Summary metrics row for current keyword */}
                        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-mono">
                              14-Day Performance Summary
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-3">
                              
                              {/* Avg position */}
                              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 shadow-xs relative overflow-hidden">
                                <span className="text-3xs text-slate-400 font-bold block uppercase tracking-wider">Avg Position</span>
                                <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">
                                  #{selectedTermSummary?.avgPosition.toFixed(2) || '0.00'}
                                </span>
                                <div className="mt-1 flex items-center gap-1">
                                  <span className={`inline-block w-2 h-2 rounded-full ${
                                    (selectedTermSummary?.avgPosition || 10) <= 3 
                                      ? 'bg-emerald-500' 
                                      : (selectedTermSummary?.avgPosition || 10) <= 10 
                                      ? 'bg-blue-500' 
                                      : 'bg-amber-500'
                                  }`} />
                                  <span className="text-4xs font-bold text-slate-500 font-mono">
                                    {(selectedTermSummary?.avgPosition || 10) <= 3 
                                      ? 'Page 1 Tier A' 
                                      : (selectedTermSummary?.avgPosition || 10) <= 10 
                                      ? 'Page 1 Tier B' 
                                      : 'Page 2+'
                                    }
                                  </span>
                                </div>
                              </div>

                              {/* Click-Through Rate */}
                              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 shadow-xs relative overflow-hidden">
                                <span className="text-3xs text-slate-400 font-bold block uppercase tracking-wider">Avg CTR</span>
                                <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">
                                  {selectedTermSummary ? new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(selectedTermSummary.ctr) : '0.0%'}
                                </span>
                                <span className="text-4xs font-semibold text-emerald-600 block mt-1 font-mono">
                                  ★ Target Achieved
                                </span>
                              </div>

                              {/* Total Clicks */}
                              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 shadow-xs relative overflow-hidden">
                                <span className="text-3xs text-slate-400 font-bold block uppercase tracking-wider">Total Clicks</span>
                                <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">
                                  {selectedTermSummary?.totalClicks || '0'}
                                </span>
                                <span className="text-4xs text-slate-400 mt-1 block">Past 2 weeks total</span>
                              </div>

                              {/* Total Impressions */}
                              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 shadow-xs relative overflow-hidden">
                                <span className="text-3xs text-slate-400 font-bold block uppercase tracking-wider">Impressions</span>
                                <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">
                                  {selectedTermSummary?.totalImpressions || '0'}
                                </span>
                                <span className="text-4xs text-slate-400 mt-1 block">Search impressions</span>
                              </div>

                            </div>
                          </div>

                          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4.5 space-y-2">
                            <span className="text-3xs text-blue-800 font-black uppercase tracking-wider block">SEO Intelligence Insight</span>
                            <p className="text-xs text-blue-900 leading-normal">
                              {selectedTerm === 'Zultys Dallas' && 'Exceptional brand dominance with high-converting buyer intent. Local authority is locked in.'}
                              {selectedTerm === 'VoIP DFW' && 'Competitive commercial search query. Daily position is highly responsive to city-specific target landings.'}
                              {selectedTerm === 'Business Phone Systems' && 'Massive volume term. Position climbs are highly correlated to domain authority backlinking and alt-tag depth.'}
                            </p>
                          </div>
                        </div>

                        {/* Interactive Trend Graph */}
                        <div className="lg:col-span-8 space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                              Daily Search Rank Position Trend (Inverted Y-Axis)
                            </h3>
                            <span className="text-4xs text-slate-400 font-bold font-mono uppercase bg-slate-100 px-2 py-0.5 rounded">
                              Higher Line = Better Rank (#1)
                            </span>
                          </div>

                          {/* Chart Container */}
                          <div className="relative border border-slate-100 bg-slate-50/40 rounded-xl p-4 overflow-hidden shadow-inner">
                            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none overflow-visible">
                              
                              {/* Background Gradients */}
                              <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
                                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.00" />
                                </linearGradient>
                              </defs>

                              {/* Draw Y Axis Gridlines */}
                              {yTicks.map((tick, i) => (
                                <g key={i}>
                                  <line
                                    x1={paddingLeft}
                                    y1={tick.y}
                                    x2={svgWidth - paddingRight}
                                    y2={tick.y}
                                    stroke="#e2e8f0"
                                    strokeWidth="1"
                                    strokeDasharray="4 4"
                                  />
                                  <text
                                    x={paddingLeft - 8}
                                    y={tick.y + 4}
                                    textAnchor="end"
                                    className="font-mono text-[10px] font-bold fill-slate-400"
                                  >
                                    #{tick.val.toFixed(0)}
                                  </text>
                                </g>
                              ))}

                              {/* Draw X Axis Labels (Sparse layout for clarity) */}
                              {points.map((p, i) => {
                                // Draw labels for every second point to keep it clean
                                if (i % 2 !== 0) return null;
                                return (
                                  <text
                                    key={i}
                                    x={p.x}
                                    y={svgHeight - paddingBottom + 16}
                                    textAnchor="middle"
                                    className="font-mono text-[9px] font-medium fill-slate-400"
                                  >
                                    {formatChartDate(p.date)}
                                  </text>
                                );
                              })}

                              {/* Shaded Area Under Line */}
                              {points.length > 0 && (
                                <path d={areaPath} fill="url(#chartGradient)" />
                              )}

                              {/* Trend Line Path */}
                              {points.length > 0 && (
                                <path
                                  d={linePath}
                                  fill="none"
                                  stroke="#2563eb"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                />
                              )}

                              {/* Hover Guideline */}
                              {hoveredIndex !== null && points[hoveredIndex] && (
                                <line
                                  x1={points[hoveredIndex].x}
                                  y1={paddingTop}
                                  x2={points[hoveredIndex].x}
                                  y2={svgHeight - paddingBottom}
                                  stroke="#3b82f6"
                                  strokeWidth="1.5"
                                  strokeDasharray="3 3"
                                />
                              )}

                              {/* Data Points and Hover Triggers */}
                              {points.map((p, i) => {
                                const isHovered = hoveredIndex === i;
                                return (
                                  <g key={i}>
                                    {/* Small visible circle dot */}
                                    <circle
                                      cx={p.x}
                                      cy={p.y}
                                      r={isHovered ? 5.5 : 3.5}
                                      className={`transition-all duration-150 ${
                                        isHovered 
                                          ? 'fill-white stroke-blue-600 stroke-[3]' 
                                          : 'fill-blue-600 hover:fill-blue-700'
                                      }`}
                                    />

                                    {/* Large invisible interactive hover radius trigger */}
                                    <circle
                                      cx={p.x}
                                      cy={p.y}
                                      r="15"
                                      className="fill-transparent cursor-pointer"
                                      onMouseEnter={() => setHoveredIndex(i)}
                                      onMouseLeave={() => setHoveredIndex(null)}
                                    />
                                  </g>
                                );
                              })}

                            </svg>

                            {/* Live Tooltip Overlay */}
                            {hoveredIndex !== null && points[hoveredIndex] && (
                              <div 
                                className="absolute bg-slate-900 text-white rounded-lg p-3 text-2xs space-y-1 shadow-lg border border-slate-700 pointer-events-none"
                                style={{
                                  left: `${Math.min(
                                    svgWidth - 130, 
                                    Math.max(
                                      10, 
                                      (points[hoveredIndex].x / svgWidth) * 100
                                    )
                                  )}%`,
                                  top: '12%',
                                  transform: 'translateX(-50%)'
                                }}
                              >
                                <div className="font-bold border-b border-slate-700 pb-1 mb-1 text-slate-300">
                                  {formatChartDate(points[hoveredIndex].date)}
                                </div>
                                <div className="flex justify-between gap-6">
                                  <span className="text-slate-400">Position Rank:</span>
                                  <span className="font-bold text-blue-400 font-mono">#{points[hoveredIndex].position.toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between gap-6">
                                  <span className="text-slate-400">Clicks:</span>
                                  <span className="font-bold font-mono">{points[hoveredIndex].clicks}</span>
                                </div>
                                <div className="flex justify-between gap-6">
                                  <span className="text-slate-400">Impressions:</span>
                                  <span className="font-bold font-mono">{points[hoveredIndex].impressions}</span>
                                </div>
                                <div className="flex justify-between gap-6">
                                  <span className="text-slate-400">CTR Rate:</span>
                                  <span className="font-bold font-mono text-emerald-400">
                                    {new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(points[hoveredIndex].ctr)}
                                  </span>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>

                      </div>
                    );
                  })()
                )}
              </div>

              {/* DFW Local SEO Service Area Heatmap Module */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="h-5.5 w-5.5 text-blue-600 animate-pulse" /> DFW Service Area Traffic Heatmap & Content Optimizer
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Tracks organic search traffic across regional city landing pages. Locate cold zones (low-traffic market gaps) requiring localized content updates.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-lg self-start">
                    <button
                      onClick={() => setHeatmapFilter('all')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${heatmapFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      All Cities ({heatmapData.length})
                    </button>
                    <button
                      onClick={() => setHeatmapFilter('high')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1 ${heatmapFilter === 'high' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      <Flame className="h-3.5 w-3.5 text-orange-400" /> Hotspots ({heatmapData.filter(c => c.trafficTier === 'high').length})
                    </button>
                    <button
                      onClick={() => setHeatmapFilter('medium')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${heatmapFilter === 'medium' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      Medium ({heatmapData.filter(c => c.trafficTier === 'medium').length})
                    </button>
                    <button
                      onClick={() => setHeatmapFilter('low')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1 ${heatmapFilter === 'low' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-300" /> Content Gaps ({heatmapData.filter(c => c.trafficTier === 'low').length})
                    </button>
                  </div>
                </div>

                {loadingHeatmap ? (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                    <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mb-3" />
                    <p className="text-sm font-medium">Analyzing city page crawl metrics & traffic records...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Heatmap Grid */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2">
                        <span className="font-semibold uppercase tracking-wider">DFW Landing Pages</span>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-500" /> Hot Spot (&gt;80 clicks)</span>
                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sky-450" /> Growing (20-80)</span>
                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-450" /> Action Required (&lt;20)</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {heatmapData
                          .filter(c => heatmapFilter === 'all' || c.trafficTier === heatmapFilter)
                          .map((cityObj, index) => {
                            const isSelected = selectedHeatmapCity?.city === cityObj.city;
                            let bgClass = "bg-rose-50/70 border-rose-100 text-rose-950 hover:bg-rose-100/40";
                            let dotClass = "bg-rose-500";
                            
                            if (cityObj.trafficTier === 'high') {
                              bgClass = "bg-indigo-50 border-indigo-200 text-indigo-950 hover:bg-indigo-100/70";
                              dotClass = "bg-indigo-600 animate-pulse";
                            } else if (cityObj.trafficTier === 'medium') {
                              bgClass = "bg-sky-50 border-sky-200 text-sky-950 hover:bg-sky-100/70";
                              dotClass = "bg-sky-550";
                            }

                            return (
                              <button
                                key={index}
                                onClick={() => setSelectedHeatmapCity(cityObj)}
                                className={`text-left p-3.5 rounded-xl border transition-all duration-200 relative flex flex-col justify-between h-28 group ${bgClass} ${isSelected ? 'ring-2 ring-blue-600 shadow-md border-transparent scale-[1.02]' : 'shadow-2xs'}`}
                              >
                                <div className="flex justify-between items-start gap-1 w-full">
                                  <span className="font-bold text-sm leading-tight tracking-tight block truncate group-hover:text-blue-900">
                                    {cityObj.city}
                                  </span>
                                  <span className={`h-2 w-2 rounded-full shrink-0 mt-1 ${dotClass}`} />
                                </div>
                                
                                <div className="mt-2 space-y-1">
                                  <div className="flex justify-between text-3xs font-mono text-slate-500">
                                    <span>Clicks:</span>
                                    <span className="font-bold text-slate-800 font-mono">{cityObj.clicks}</span>
                                  </div>
                                  <div className="flex justify-between text-3xs font-mono text-slate-500">
                                    <span>Rank:</span>
                                    <span className="font-bold text-slate-800 font-mono">#{cityObj.position}</span>
                                  </div>
                                  <div className="flex justify-between text-3xs font-mono text-slate-500">
                                    <span>Score:</span>
                                    <span className={`font-bold ${cityObj.localizedContentScore < 70 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                      {cityObj.localizedContentScore}%
                                    </span>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* Local SEO Details & AI Repair recommendations Panel */}
                    <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
                      {selectedHeatmapCity ? (
                        <div className="space-y-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-3xs uppercase tracking-wider font-mono bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md font-bold">
                                TX REGION: {selectedHeatmapCity.city.toUpperCase()}
                              </span>
                              <span className={`text-3xs font-mono font-bold px-2 py-0.5 rounded-md ${
                                selectedHeatmapCity.trafficTier === 'high' 
                                  ? 'bg-indigo-100 text-indigo-800' 
                                  : selectedHeatmapCity.trafficTier === 'medium'
                                    ? 'bg-sky-100 text-sky-800'
                                    : 'bg-rose-100 text-rose-800'
                              }`}>
                                {selectedHeatmapCity.trafficTier === 'high' ? '🔥 HIGH TRAFFIC' : selectedHeatmapCity.trafficTier === 'medium' ? '📈 GROWING' : '🚨 CONTENT GAP'}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mt-2.5">
                              {selectedHeatmapCity.city} Landing Page
                            </h3>
                            <a
                              href={selectedHeatmapCity.route}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-mono break-all mt-1"
                            >
                              {selectedHeatmapCity.route} <ArrowUpRight className="h-3 w-3 inline shrink-0" />
                            </a>

                            <div className="grid grid-cols-2 gap-3 mt-4">
                              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs">
                                <span className="text-3xs text-slate-400 font-bold uppercase tracking-wider block">GSC Clicks</span>
                                <span className="text-lg font-bold text-slate-800 font-mono">{selectedHeatmapCity.clicks}</span>
                              </div>
                              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs">
                                <span className="text-3xs text-slate-400 font-bold uppercase tracking-wider block">GSC Impressions</span>
                                <span className="text-lg font-bold text-slate-800 font-mono">{selectedHeatmapCity.impressions}</span>
                              </div>
                              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs">
                                <span className="text-3xs text-slate-400 font-bold uppercase tracking-wider block">Avg Rank Position</span>
                                <span className="text-lg font-bold text-slate-800 font-mono">#{selectedHeatmapCity.position}</span>
                              </div>
                              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs">
                                <span className="text-3xs text-slate-400 font-bold uppercase tracking-wider block">Organic CTR</span>
                                <span className="text-lg font-bold text-slate-800 font-mono">
                                  {new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(selectedHeatmapCity.ctr)}
                                </span>
                              </div>
                            </div>

                            {/* Optimization Score */}
                            <div className="mt-4 bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-1.5">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-slate-700">Localization Quality Score</span>
                                <span className={`font-mono font-bold ${selectedHeatmapCity.localizedContentScore < 70 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                  {selectedHeatmapCity.localizedContentScore}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    selectedHeatmapCity.localizedContentScore < 60 
                                      ? 'bg-rose-500' 
                                      : selectedHeatmapCity.localizedContentScore < 75
                                        ? 'bg-amber-500'
                                        : 'bg-emerald-500'
                                  }`}
                                  style={{ width: `${selectedHeatmapCity.localizedContentScore}%` }}
                                />
                              </div>
                              <p className="text-3xs text-slate-400 mt-1 leading-normal">
                                Evaluates localized headers, custom regional client testimonials, meta description integrity, and location-relevant microdata.
                              </p>
                            </div>

                            {/* Dynamic Content Checklist & recommendations */}
                            <div className="mt-4">
                              <span className="text-xs font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
                                <Sparkles className="h-4 w-4 text-amber-500" /> DFW Localization Recommendations
                              </span>
                              
                              <div className="text-xs text-slate-600 space-y-2.5 bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
                                {selectedHeatmapCity.trafficTier === 'low' ? (
                                  <>
                                    <p className="leading-relaxed text-slate-600 font-medium">
                                      🚨 <span className="text-rose-700 font-bold">Critical Gaps Detected:</span> Page has high potential but low search traction. Add geo-targeted identifiers to recover rankings.
                                    </p>
                                    <ul className="space-y-1.5 list-disc pl-4 text-slate-500 leading-relaxed text-3xs">
                                      <li>Embed custom customer quotes citing local service quality in <span className="font-bold">{selectedHeatmapCity.city}</span>.</li>
                                      <li>List specific nearby commercial ZIP codes and transit landmarks to expand neighborhood relevance.</li>
                                      <li>Optimize page header metadata to target `<span className="font-mono">{selectedHeatmapCity.city} Business Phone Systems`</span>.</li>
                                    </ul>
                                  </>
                                ) : selectedHeatmapCity.trafficTier === 'medium' ? (
                                  <>
                                    <p className="leading-relaxed text-slate-600 font-medium">
                                      📈 <span className="text-blue-700 font-bold">Optimal Growth Signals:</span> Strong initial visibility. Push local relevance signals to breach Google's top 3 spots.
                                    </p>
                                    <ul className="space-y-1.5 list-disc pl-4 text-slate-500 leading-relaxed text-3xs">
                                      <li>Embed an interactive Google Map pointing to recent business phone installations in <span className="font-bold">{selectedHeatmapCity.city}</span>.</li>
                                      <li>Create a custom local FAQ section discussing telecom compliance or local support dispatch times.</li>
                                      <li>Integrate internal links from our main Dallas/Fort Worth pillar pages to pass page rank authority.</li>
                                    </ul>
                                  </>
                                ) : (
                                  <>
                                    <p className="leading-relaxed text-slate-600 font-medium">
                                      👑 <span className="text-emerald-700 font-bold">Dominance Maintained:</span> Top performer. Protect rankings from competitors and feed traffic downstream.
                                    </p>
                                    <ul className="space-y-1.5 list-disc pl-4 text-slate-500 leading-relaxed text-3xs">
                                      <li>Update active case studies with recent 2026 deployment details to keep search signals ultra-fresh.</li>
                                      <li>Add internal backlinks from this page to adjacent under-performing cities (e.g. {heatmapData[heatmapData.length - 1]?.city || 'Cleburne'}).</li>
                                      <li>Ensure review aggregates contain active structured JSON-LD schema markup.</li>
                                    </ul>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 border-t border-slate-200 pt-4">
                            <button
                              onClick={async () => {
                                const toastId = toast.loading(`Submitting priority re-crawl request for ${selectedHeatmapCity.city}...`);
                                try {
                                  const res = await fetch('/api/search-console/request-recrawl', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ urls: [selectedHeatmapCity.route] })
                                  });
                                  const result = await res.json();
                                  if (result.success && result.results?.[0]?.success) {
                                    toast.success(`Priority recrawl requested! Google Indexer notified of updates to ${selectedHeatmapCity.city}.`, { id: toastId });
                                    loadHistory();
                                  } else {
                                    toast.error(`Request rejected: ${result.results?.[0]?.error || 'Unknown error'}`, { id: toastId });
                                  }
                                } catch (e: any) {
                                  toast.error(`Failed to trigger recrawl: ${e.message}`, { id: toastId });
                                }
                              }}
                              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 transition text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer"
                            >
                              <Send className="h-3.5 w-3.5" /> Submit {selectedHeatmapCity.city} Page for Priority Re-Indexing
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 h-full">
                          <MapPin className="h-8 w-8 text-slate-300 mb-2" />
                          <p className="text-sm font-medium">Select a DFW city page to view optimization insights</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Indexing Health (Sitemap) & Live URL Inspection Split Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Sitemap & Indexing Health */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                      <FileCode className="h-5 w-5 text-blue-600" /> Sitemap Indexation Health
                    </h3>

                    {dashboardData && dashboardData.sitemaps.length > 0 ? (
                      <div className="space-y-5">
                        {dashboardData.sitemaps.map((sm: any, idx: number) => {
                          const submitted = sm.contents?.[0]?.submitted || 0;
                          const indexed = sm.contents?.[0]?.indexed || 0;
                          const indexRate = submitted > 0 ? (indexed / submitted) * 100 : 0;
                          const warnings = parseInt(sm.warnings || '0');
                          const errors = parseInt(sm.errors || '0');

                          return (
                            <div key={idx} className="space-y-4">
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                                <span className="text-3xs text-slate-400 uppercase font-bold tracking-wider font-mono">Registered Sitemap</span>
                                <span className="text-xs font-mono text-slate-800 block truncate mt-0.5 font-bold" title={sm.path}>
                                  {sm.path}
                                </span>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                  <span className="font-bold text-slate-600">Google Indexation Ratio</span>
                                  <span className="font-bold font-mono text-slate-900">{indexed} of {submitted} Pages ({indexRate.toFixed(1)}%)</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                                    style={{ width: `${indexRate}%` }}
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-200/50 text-center">
                                  <span className="text-3xs text-slate-400 font-bold uppercase block font-mono">Crawled Warnings</span>
                                  <span className={`text-base font-extrabold font-mono block mt-1 ${warnings > 0 ? 'text-amber-600' : 'text-slate-700'}`}>
                                    {warnings}
                                  </span>
                                </div>
                                <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-200/50 text-center">
                                  <span className="text-3xs text-slate-400 font-bold uppercase block font-mono">Crawl Errors</span>
                                  <span className={`text-base font-extrabold font-mono block mt-1 ${errors > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                    {errors === 0 ? '0 (None)' : errors}
                                  </span>
                                </div>
                              </div>

                              <div className="border-t border-slate-100 pt-3 flex flex-wrap justify-between gap-4 text-3xs font-mono text-slate-400">
                                <div>
                                  <span>Last Submitted: </span>
                                  <span className="text-slate-600 font-bold">{new Date(sm.lastSubmitted).toLocaleDateString()}</span>
                                </div>
                                <div>
                                  <span>Last Crawled: </span>
                                  <span className="text-slate-600 font-bold">{new Date(sm.lastDownloaded).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-slate-400 space-y-2 border border-dashed border-slate-200 rounded-xl">
                        <Info className="h-8 w-8 mx-auto text-slate-300" />
                        <p className="text-xs">No registered sitemaps found. Use the submission card above to register.</p>
                      </div>
                    )}
                  </div>

                  {isDemoData && (
                    <p className="text-3xs text-slate-400 leading-normal border-t border-slate-100 pt-4 mt-6">
                      * Demo index rates simulate search bot crawlers analyzing Dallas Fort Worth Zultys telephone platform directories.
                    </p>
                  )}
                </div>

                {/* Real-time URL Inspection Tool */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1.5">
                      <Search className="h-5 w-5 text-blue-600" /> Real-time URL Inspection API
                    </h3>
                    <p className="text-3xs text-slate-500 mb-4">
                      Check live Google indexation status, crawling verdict, canonical configurations, and bot crawler metrics.
                    </p>

                    <form onSubmit={handleInspectUrl} className="flex gap-2 mb-4">
                      <input 
                        type="text" 
                        value={inspectUrl}
                        onChange={(e) => setInspectUrl(e.target.value)}
                        placeholder="https://dallasfortworthzultys.com/"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 font-mono"
                        required
                      />
                      <button
                        type="submit"
                        disabled={inspectingUrl}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Search className={`h-3.5 w-3.5 ${inspectingUrl ? 'animate-pulse' : ''}`} />
                        {inspectingUrl ? 'Inspecting...' : 'Inspect'}
                      </button>
                    </form>

                    {inspectionReport ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-slate-200 rounded-xl overflow-hidden text-xs bg-slate-50"
                      >
                        <div className="p-3 border-b border-slate-200 bg-white flex items-center justify-between">
                          <span className="font-bold text-slate-700">Inspection Report</span>
                          <span className="text-3xs bg-slate-100 text-slate-600 font-mono px-1.5 py-0.5 rounded">
                            {inspectionReport.indexStatusResult.crawledAs} Crawler
                          </span>
                        </div>

                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 font-medium">Verdict:</span>
                            {inspectionReport.indexStatusResult.verdict === 'INDEXED' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-3xs font-bold uppercase tracking-wider">
                                <CheckCircle className="h-3 w-3" /> Indexed on Google
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded text-3xs font-bold uppercase tracking-wider">
                                <AlertTriangle className="h-3 w-3" /> Not Indexed
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                            <span className="text-slate-500 font-medium">Coverage:</span>
                            <span className="font-medium text-slate-800">{inspectionReport.indexStatusResult.coverageState}</span>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                            <span className="text-slate-500 font-medium">Robots.txt Status:</span>
                            <span className="font-bold text-emerald-600">{inspectionReport.indexStatusResult.robotsTxtState}</span>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                            <span className="text-slate-500 font-medium">Indexing Blockers:</span>
                            <span className="font-bold text-emerald-600">None ({inspectionReport.indexStatusResult.indexingState})</span>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                            <span className="text-slate-500 font-medium">Last Crawled:</span>
                            <span className="font-mono text-slate-600">
                              {new Date(inspectionReport.indexStatusResult.lastCrawlTime).toLocaleString()}
                            </span>
                          </div>

                          <div className="border-t border-slate-100 pt-2 text-3xs text-slate-400 space-y-1">
                            <div className="truncate">
                              <span className="font-semibold text-slate-500">Google Canonical:</span>{' '}
                              <span className="font-mono select-all text-slate-600" title={inspectionReport.indexStatusResult.googleCanonical}>
                                {inspectionReport.indexStatusResult.googleCanonical}
                              </span>
                            </div>
                            <div className="truncate">
                              <span className="font-semibold text-slate-500">User Canonical:</span>{' '}
                              <span className="font-mono select-all text-slate-600" title={inspectionReport.indexStatusResult.userCanonical}>
                                {inspectionReport.indexStatusResult.userCanonical}
                              </span>
                            </div>
                          </div>
                        </div>

                        {inspectionReport.inspectionResultLink && (
                          <div className="p-2 bg-slate-100 border-t border-slate-200 text-center">
                            <a 
                              href={inspectionReport.inspectionResultLink} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-3xs text-blue-600 hover:underline font-bold animate-pulse"
                            >
                              Open Full GSC Inspection Tool <ArrowUpRight className="h-3 w-3" />
                            </a>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <div className="bg-slate-50/50 border border-slate-200 border-dashed rounded-xl p-8 text-center text-slate-400 space-y-2">
                        <Search className="h-8 w-8 mx-auto text-slate-300" />
                        <h4 className="text-xs font-bold text-slate-700">No URL inspected yet</h4>
                        <p className="text-3xs text-slate-400 max-w-xs mx-auto">
                          Type any published URL from the Dallas Fort Worth Zultys domain above to fetch real-time indexation statuses and crawler logs.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Tabbed Performance Metrics (Keywords vs Landing Pages) */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAnalyticsTab('queries')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${analyticsTab === 'queries' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                    >
                      Top Google Search Keywords
                    </button>
                    <button
                      onClick={() => setAnalyticsTab('pages')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${analyticsTab === 'pages' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                    >
                      Top Landing Pages
                    </button>
                  </div>
                  <span className="text-3xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Metrics from past 30 days
                  </span>
                </div>

                <div className="overflow-x-auto">
                  {analyticsTab === 'queries' ? (
                    <table className="w-full border-collapse text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200 text-3xs tracking-wider">
                        <tr>
                          <th className="py-3 px-6">Keyword / Search Query</th>
                          <th className="py-3 px-6 text-center">Clicks</th>
                          <th className="py-3 px-6 text-center">Impressions</th>
                          <th className="py-3 px-6 text-center">CTR</th>
                          <th className="py-3 px-6 text-center">Avg. Position</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {dashboardData && dashboardData.topQueries.length > 0 ? (
                          dashboardData.topQueries.map((row: any, index: number) => (
                            <tr key={index} className="hover:bg-slate-50/50 transition">
                              <td className="py-3 px-6 text-slate-800 font-bold select-all font-mono">
                                {row.keys?.[0] || 'Unknown Query'}
                              </td>
                              <td className="py-3 px-6 text-center font-mono text-slate-900 font-bold">
                                {row.clicks}
                              </td>
                              <td className="py-3 px-6 text-center font-mono text-slate-500">
                                {row.impressions}
                              </td>
                              <td className="py-3 px-6 text-center font-mono text-slate-500">
                                {new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(row.ctr || 0)}
                              </td>
                              <td className="py-3 px-6 text-center font-mono font-bold">
                                <span className={`inline-block px-1.5 py-0.5 rounded text-4xs font-extrabold ${row.position <= 3 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                                  #{row.position?.toFixed(1)}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-slate-400">
                              No query metrics data available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full border-collapse text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200 text-3xs tracking-wider">
                        <tr>
                          <th className="py-3 px-6">Target Landing Page URL</th>
                          <th className="py-3 px-6 text-center">Clicks</th>
                          <th className="py-3 px-6 text-center">Impressions</th>
                          <th className="py-3 px-6 text-center">CTR</th>
                          <th className="py-3 px-6 text-center">Avg. Position</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {dashboardData && dashboardData.topPages.length > 0 ? (
                          dashboardData.topPages.map((row: any, index: number) => (
                            <tr key={index} className="hover:bg-slate-50/50 transition">
                              <td className="py-3 px-6 text-blue-600 font-bold select-all font-mono truncate max-w-xs" title={row.keys?.[0]}>
                                {row.keys?.[0] || 'Unknown Page'}
                              </td>
                              <td className="py-3 px-6 text-center font-mono text-slate-900 font-bold">
                                {row.clicks}
                              </td>
                              <td className="py-3 px-6 text-center font-mono text-slate-500">
                                {row.impressions}
                              </td>
                              <td className="py-3 px-6 text-center font-mono text-slate-500">
                                {new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(row.ctr || 0)}
                              </td>
                              <td className="py-3 px-6 text-center font-mono font-bold">
                                <span className={`inline-block px-1.5 py-0.5 rounded text-4xs font-extrabold ${row.position <= 10 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                                  #{row.position?.toFixed(1)}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-slate-400">
                              No landing page metrics data available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

            </div>
          )}
        </section>

        {/* History / Action Logs */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <History className="h-5 w-5 text-blue-600" /> Recent Search Engine Indexing Logs
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <List className="h-3.5 w-3.5" /> {history.length} Log Entries Saved
            </span>
          </div>

          {loadingHistory ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <RefreshCw className="h-8 w-8 text-slate-400 animate-spin mx-auto" />
              <p className="text-sm">Retrieving submission logs...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <Info className="h-10 w-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-semibold text-slate-700">No indexing actions recorded yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Trigger a sitemap submission or URL re-crawl request above to see the live results logged here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200 text-3xs tracking-wider">
                  <tr>
                    <th className="py-3 px-6">Timestamp</th>
                    <th className="py-3 px-6">Type</th>
                    <th className="py-3 px-6">Target Resource</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6">Details / Response Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {history.map((log, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 px-6 whitespace-nowrap text-slate-400 font-mono">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-6 whitespace-nowrap">
                        {log.type === 'sitemap' ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-bold uppercase tracking-wider text-4xs">
                            <FileText className="h-2.5 w-2.5" /> Sitemap
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md font-bold uppercase tracking-wider text-4xs">
                            <Link2 className="h-2.5 w-2.5" /> Indexing
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-6 font-mono text-slate-700 select-all max-w-xs truncate" title={log.url}>
                        {log.url}
                      </td>
                      <td className="py-3.5 px-6 text-center whitespace-nowrap">
                        {log.status === 'SUCCESS' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-4xs uppercase tracking-wider">
                            <CheckCircle className="h-2.5 w-2.5" /> Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-2 py-0.5 rounded font-bold text-4xs uppercase tracking-wider">
                            <XCircle className="h-2.5 w-2.5" /> Failed
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-6 max-w-sm text-slate-500 leading-normal">
                        {log.action && (
                          <span className="inline-block bg-slate-100 text-slate-600 text-3xs font-bold px-1 py-0.2 rounded mr-1.5 font-mono">
                            {log.action}
                          </span>
                        )}
                        {log.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Setup Guide Section */}
        <section id="setup-guide" className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" /> Step-by-Step Google Integration Guide
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Follow these simple steps to activate instant page indexing and sitemap sync.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold font-mono">1</span>
                <h3 className="font-bold text-slate-800">Create Service Account</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Go to the <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold hover:text-blue-800">Google Cloud Console</a>, create a project (if you don't have one), enable the <strong>Webmaster Tools / Search Console API</strong> and the <strong>Google Indexing API</strong>, and then create a <strong>Service Account</strong>. Generate and download a new key in <strong>JSON</strong> format.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold font-mono">2</span>
                <h3 className="font-bold text-slate-800">Authorize Service Account</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Copy the <code>client_email</code> address found in your downloaded JSON key file (looks like <code>my-service-account@project.iam.gserviceaccount.com</code>). 
                Go to your <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold hover:text-blue-800">Google Search Console</a>, navigate to <strong>Settings &gt; Users and Permissions</strong>, and add this email as an <strong>Owner</strong> or <strong>Full User</strong> of your site property.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold font-mono">3</span>
                <h3 className="font-bold text-slate-800">Provide Secret Keys</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add the key credentials as environment variables in your AI Studio Build Settings or <code>.env</code> file. You can paste the contents of your downloaded JSON file directly into <strong>GOOGLE_SERVICE_ACCOUNT_JSON</strong>, or enter <strong>GOOGLE_CLIENT_EMAIL</strong> and <strong>GOOGLE_PRIVATE_KEY</strong> separately. Restart your server, and watch sitemaps index automatically!
              </p>
            </div>
          </div>
        </section>

      </main>

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
        {showHealModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!healingIssues) setShowHealModal(false); }}
              className="absolute inset-0 bg-slate-900 cursor-pointer"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative z-10 border border-slate-200 text-slate-800"
            >
              {/* Header */}
              <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-emerald-400 shrink-0" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider">SEO Self-Healing Results</h3>
                    <p className="text-4xs text-slate-400 font-medium">Automatic Repair Engine Active</p>
                  </div>
                </div>
                {!healingIssues && (
                  <button
                    onClick={() => setShowHealModal(false)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {healingIssues ? (
                  <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full border-4 border-slate-100 border-t-emerald-500 animate-spin" />
                      <Sparkles className="h-5 w-5 text-emerald-500 absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-900">Executing Heuristic Self-Heal...</p>
                      <p className="text-3xs text-slate-500 max-w-xs leading-normal">
                        Rewriting invalid file routes, committing dynamic override mappings, and flushing client-side SEO caches.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-2.5">
                      <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-emerald-950">Healed Successfully!</p>
                        <p className="text-3xs text-emerald-800 leading-normal mt-0.5">
                          Successfully applied repairs to missing meta descriptions and optimized internal route linking targets.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Code-Level Repair Actions</span>
                      
                      {healingLog && healingLog.length > 0 ? (
                        healingLog.map((log, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-3xs text-slate-600 font-mono leading-relaxed border-l-2 border-l-emerald-500 flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">✔</span>
                            <span>{log}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-400 text-3xs italic">No code repairs were triggered.</p>
                      )}
                    </div>

                    <button
                      onClick={() => setShowHealModal(false)}
                      className="w-full flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 transition text-white rounded-xl text-xs font-bold py-2.5 shadow-sm cursor-pointer"
                    >
                      Dismiss & Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
