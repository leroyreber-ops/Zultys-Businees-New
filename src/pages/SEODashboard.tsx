import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Key, Send, RefreshCw, CheckCircle, XCircle, AlertTriangle, 
  ArrowRight, FileText, Plus, List, ShieldAlert, History, Link2, Info,
  MousePointerClick, Eye, Percent, BarChart3, TrendingUp, Search, ShieldCheck, 
  AlertCircle, Calendar, TrendingDown, Activity, Award, ArrowUpRight, FileCode,
  MapPin, Flame, Sparkles, Check, BookOpen, X, HeartPulse, Clock, Mail, Wrench
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import D3RankDistributionChart from '../components/D3RankDistributionChart';
import { LocalRankTracker } from '../components/LocalRankTracker';
import { InternalLinkAuditor } from '../components/InternalLinkAuditor';
import { AccessibilityAndSEOAuditor } from '../components/AccessibilityAndSEOAuditor';
import { FAQPageSchema } from '../components/FAQPageSchema';
import { useRankPolling } from '../hooks/useRankPolling';
import { generateSeoSuggestion } from '../utils/imageScanner';

interface LogEntry {
  type: 'sitemap' | 'indexing';
  url: string;
  status: 'SUCCESS' | 'FAILED';
  action?: 'URL_UPDATED' | 'URL_DELETED';
  message: string;
  timestamp: string;
}

export default function SEODashboard() {
  const { rankings: polledRankings, notifications, lastUpdated: rankingsLastUpdated } = useRankPolling();

  const [status, setStatus] = useState<{ configured: boolean; isAuthorized?: boolean; clientEmail: string | null; message: string } | null>(null);
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [submittingSitemap, setSubmittingSitemap] = useState(false);
  const [submittingRecrawl, setSubmittingRecrawl] = useState(false);

  // AI Auto-Repair states
  const [autoRepairEnabled, setAutoRepairEnabled] = useState(true);
  const [autoRepairHistory, setAutoRepairHistory] = useState<any[]>([]);
  const [loadingAutoRepairHistory, setLoadingAutoRepairHistory] = useState(true);
  const [repairingKeyword, setRepairingKeyword] = useState<string | null>(null);

  // GSC ranking issues states
  const [rankingIssues, setRankingIssues] = useState<any[] | null>(null);
  const [loadingRankingIssues, setLoadingRankingIssues] = useState(true);
  const [fixingRankingIssueId, setFixingRankingIssueId] = useState<string | null>(null);
  const [fixingAllRankingIssues, setFixingAllRankingIssues] = useState(false);

  // Image alt tag auditor states
  const [auditImages, setAuditImages] = useState<any[] | null>(null);
  const [loadingAuditImages, setLoadingAuditImages] = useState(true);
  const [fixingAltId, setFixingAltId] = useState<string | null>(null);
  const [fixingAllAlts, setFixingAllAlts] = useState(false);

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
    headingViolations?: Array<{
      filePath: string;
      pageName: string;
      route: string;
      score: number;
      issues: Array<{
        type: string;
        severity: string;
        message: string;
        suggestedFix: string;
      }>;
    }>;
    totalIssues: number;
    fixedCount: number;
  } | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(true);
  const [healingIssues, setHealingIssues] = useState(false);
  const [healingLog, setHealingLog] = useState<string[]>([]);
  const [showHealModal, setShowHealModal] = useState(false);

  // Low-Hanging Fruit Keyword Opportunity States
  const [lowHangingFruit, setLowHangingFruit] = useState<any[] | null>(null);
  const [loadingFruit, setLoadingFruit] = useState(true);
  const [selectedFruit, setSelectedFruit] = useState<any | null>(null);
  const [optimizedCopy, setOptimizedCopy] = useState<string | null>(null);
  const [generatingCopy, setGeneratingCopy] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);

  // Bulk Action States
  const [selectedBulkKeywords, setSelectedBulkKeywords] = useState<string[]>([]);
  const [bulkBriefText, setBulkBriefText] = useState<string | null>(null);
  const [generatingBulkBrief, setGeneratingBulkBrief] = useState(false);
  const [showBulkBriefModal, setShowBulkBriefModal] = useState(false);

  // Competitor Comparison States
  const [competitorDomain, setCompetitorDomain] = useState('');
  const [comparingCompetitor, setComparingCompetitor] = useState(false);
  const [competitorResult, setCompetitorResult] = useState<{
    success: boolean;
    demoData: boolean;
    competitorDomain: string;
    comparisonList: Array<{
      keyword: string;
      ourPosition: number;
      competitorPosition: number;
      ourEstClicks: number;
      competitorEstClicks: number;
      winner: 'us' | 'competitor' | 'tie';
      opportunity: string;
    }>;
    executiveSummary: string;
  } | null>(null);

  // Low-Hanging Fruit Filter and Sort States
  const [fruitSortBy, setFruitSortBy] = useState<'volume' | 'ranking' | 'clicks' | 'ctr'>('volume');
  const [fruitSearchQuery, setFruitSearchQuery] = useState('');
  const [fruitRouteFilter, setFruitRouteFilter] = useState('all');
  const [fruitPageTier, setFruitPageTier] = useState<'page2' | 'page3' | 'all'>('page2');

  // AI Ranking Forecast States
  const [forecastReport, setForecastReport] = useState<{
    predictedPosition: number;
    predictedCtr: number;
    predictedClicks: number;
    difficulty: string;
    confidence: number;
    explanation: string;
  } | null>(null);
  const [loadingForecast, setLoadingForecast] = useState(false);

  // Automated Weekly Email Reports Configuration States
  const [reportConfig, setReportConfig] = useState<{
    enabled: boolean;
    email: string;
    trackedKeywords: string[];
    allKeywords: boolean;
    threshold: number;
    dayOfWeek: string;
  }>({
    enabled: false,
    email: '',
    trackedKeywords: [],
    allKeywords: true,
    threshold: 1.0,
    dayOfWeek: 'Monday'
  });
  const [loadingReportConfig, setLoadingReportConfig] = useState(true);
  const [savingReportConfig, setSavingReportConfig] = useState(false);
  const [testingReport, setTestingReport] = useState(false);
  const [reportTestResult, setReportTestResult] = useState<any | null>(null);
  const [showReportPreviewModal, setShowReportPreviewModal] = useState(false);

  // Ranking Heatmap States
  const [heatmapKeywordFilter, setHeatmapKeywordFilter] = useState<'all' | 'top3' | 'top4_10' | 'top11_plus'>('all');
  const [heatmapSearch, setHeatmapSearch] = useState('');
  const [selectedHeatmapKeyword, setSelectedHeatmapKeyword] = useState<any | null>(null);

  // --- Auto-Inject Keyword Density Optimizer States ---
  const [originalDensityText, setOriginalDensityText] = useState<string>(
    "We provide premium office systems in Fort Worth. If you are looking for unified communications setup or expert technicians to install telephones, contact our office. Our services are tailored to maximize business voice connectivity and support modern VoIP setups across Dallas-Fort Worth."
  );
  const [targetDensityKeyword, setTargetDensityKeyword] = useState<string>("business phone system");
  const [targetDensityLocation, setTargetDensityLocation] = useState<string>("Fort Worth");
  const [analyzedParagraphs, setAnalyzedParagraphs] = useState<any[]>([]);
  const [isDensityAnalyzing, setIsDensityAnalyzing] = useState<boolean>(false);

  const calculateKeywordDensity = (pText: string, keyword: string) => {
    const cleanP = pText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const cleanKw = keyword.toLowerCase().trim();
    if (!cleanP || !cleanKw) return 0;
    
    const words = cleanP.split(/\s+/).filter(Boolean);
    if (words.length === 0) return 0;

    let occurrences = 0;
    const kwWords = cleanKw.split(/\s+/);
    
    for (let i = 0; i <= words.length - kwWords.length; i++) {
      let match = true;
      for (let j = 0; j < kwWords.length; j++) {
        if (words[i + j] !== kwWords[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        occurrences++;
        i += kwWords.length - 1;
      }
    }
    
    return (occurrences / words.length) * 100;
  };

  const analyzeDensity = () => {
    setIsDensityAnalyzing(true);
    setTimeout(() => {
      const paragraphs = originalDensityText
        .split(/\n\n+/)
        .map(p => p.trim())
        .filter(Boolean);

      const analyzed = paragraphs.map((p, idx) => {
        const density = calculateKeywordDensity(p, targetDensityKeyword);
        const wordCount = p.split(/\s+/).filter(Boolean).length;
        return {
          id: idx,
          original: p,
          wordCount,
          density,
          status: density < 1 ? 'low' : 'optimized',
          optimized: null,
          isOptimizing: false
        };
      });

      setAnalyzedParagraphs(analyzed);
      setIsDensityAnalyzing(false);
      toast.success(`Successfully analyzed ${analyzed.length} content blocks!`);
    }, 600);
  };

  const optimizeDensityParagraph = async (idx: number) => {
    setAnalyzedParagraphs(prev => prev.map(p => p.id === idx ? { ...p, isOptimizing: true } : p));
    const targetPara = analyzedParagraphs.find(p => p.id === idx);
    if (!targetPara) return;

    try {
      const res = await fetch("/api/seo/auto-inject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paragraph: targetPara.original,
          keyword: targetDensityKeyword,
          location: targetDensityLocation
        })
      });
      const data = await res.json();
      if (data.success) {
        const newDensity = calculateKeywordDensity(data.optimizedText, targetDensityKeyword);
        setAnalyzedParagraphs(prev => prev.map(p => p.id === idx ? {
          ...p,
          optimized: data.optimizedText,
          density: newDensity,
          status: 'optimized',
          isOptimizing: false
        } : p));
        toast.success("Successfully injected local keywords!");
      } else {
        toast.error(`Auto-inject failed: ${data.error}`);
        setAnalyzedParagraphs(prev => prev.map(p => p.id === idx ? { ...p, isOptimizing: false } : p));
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
      setAnalyzedParagraphs(prev => prev.map(p => p.id === idx ? { ...p, isOptimizing: false } : p));
    }
  };

  const optimizeAllLowDensityParagraphs = async () => {
    const lowDensityParas = analyzedParagraphs.filter(p => p.status === 'low');
    if (lowDensityParas.length === 0) {
      toast.error("No low-density paragraphs found to optimize!");
      return;
    }

    const toastId = toast.loading(`Optimizing ${lowDensityParas.length} low-density content blocks...`);
    let completedCount = 0;

    for (const p of lowDensityParas) {
      setAnalyzedParagraphs(prev => prev.map(item => item.id === p.id ? { ...item, isOptimizing: true } : item));
      try {
        const res = await fetch("/api/seo/auto-inject", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paragraph: p.original,
            keyword: targetDensityKeyword,
            location: targetDensityLocation
          })
        });
        const data = await res.json();
        if (data.success) {
          const newDensity = calculateKeywordDensity(data.optimizedText, targetDensityKeyword);
          setAnalyzedParagraphs(prev => prev.map(item => item.id === p.id ? {
            ...item,
            optimized: data.optimizedText,
            density: newDensity,
            status: 'optimized',
            isOptimizing: false
          } : item));
          completedCount++;
        } else {
          setAnalyzedParagraphs(prev => prev.map(item => item.id === p.id ? { ...item, isOptimizing: false } : item));
        }
      } catch (err) {
        setAnalyzedParagraphs(prev => prev.map(item => item.id === p.id ? { ...item, isOptimizing: false } : item));
      }
    }

    toast.success(`Successfully optimized ${completedCount} content blocks!`, { id: toastId });
  };

  useEffect(() => {
    setForecastReport(null);
    setLoadingForecast(false);
  }, [selectedFruit]);

  const filteredAndSortedFruit = useMemo(() => {
    if (!lowHangingFruit) return [];
    
    let result = [...lowHangingFruit];

    // Filter by Page tier (Page 2: positions 10.0 to 20.0; Page 3: positions 20.1 to 30.0)
    if (fruitPageTier === 'page2') {
      result = result.filter(item => item.position >= 10.0 && item.position <= 20.0);
    } else if (fruitPageTier === 'page3') {
      result = result.filter(item => item.position > 20.0 && item.position <= 30.0);
    }

    // Filter by search query (keyword, page title or route match)
    if (fruitSearchQuery.trim()) {
      const q = fruitSearchQuery.toLowerCase();
      result = result.filter(item => 
        (item.keyword || '').toLowerCase().includes(q) ||
        (item.pageTitle || '').toLowerCase().includes(q) ||
        (item.matchedRoute || '').toLowerCase().includes(q)
      );
    }

    // Filter by route category
    if (fruitRouteFilter !== 'all') {
      result = result.filter(item => {
        const route = item.matchedRoute || '';
        if (fruitRouteFilter === 'home') return route === '/';
        if (fruitRouteFilter === 'competitor') return route.includes('/zultys-vs-');
        if (fruitRouteFilter === 'local') return route.includes('-dealer') || route.includes('-voip') || route === '/mesquite' || route === '/denton' || route.includes('garland');
        if (fruitRouteFilter === 'industries') return route.includes('/zultys-for-');
        if (fruitRouteFilter === 'guides') return route.includes('-guide');
        return true;
      });
    }

    // Sort by criteria
    if (fruitSortBy === 'volume') {
      // Estimated Search Volume (represented by Impressions descending)
      result.sort((a, b) => (b.impressions || 0) - (a.impressions || 0));
    } else if (fruitSortBy === 'ranking') {
      // Current Ranking (position ascending, i.e. closest to Page 1: positions 10.0–22.0)
      result.sort((a, b) => (a.position || 0) - (b.position || 0));
    } else if (fruitSortBy === 'clicks') {
      // Clicks descending
      result.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    } else if (fruitSortBy === 'ctr') {
      // CTR descending
      result.sort((a, b) => (b.ctr || 0) - (a.ctr || 0));
    }

    return result;
  }, [lowHangingFruit, fruitSortBy, fruitSearchQuery, fruitRouteFilter, fruitPageTier]);

  // Unified List of All Tracked Keywords for Ranking Heatmap
  const heatmapKeywords = useMemo(() => {
    const list: Array<{
      keyword: string;
      position: number;
      clicks: number;
      impressions: number;
      ctr: number;
      source: 'rank-tracker' | 'low-hanging-fruit' | 'top-query';
      route?: string;
    }> = [];

    const added = new Set<string>();

    // 1. Add rank tracker summary items
    if (rankTrackerData?.summary) {
      Object.entries(rankTrackerData.summary).forEach(([term, summ]: [string, any]) => {
        list.push({
          keyword: term,
          position: summ.avgPosition,
          clicks: summ.totalClicks,
          impressions: summ.totalImpressions,
          ctr: summ.ctr,
          source: 'rank-tracker'
        });
        added.add(term.toLowerCase());
      });
    }

    // 2. Add low hanging fruit items
    if (lowHangingFruit) {
      lowHangingFruit.forEach(item => {
        const kwLower = (item.keyword || '').toLowerCase();
        if (kwLower && !added.has(kwLower)) {
          list.push({
            keyword: item.keyword,
            position: item.position || 15.0,
            clicks: item.clicks || 0,
            impressions: item.impressions || 100,
            ctr: item.ctr || 0,
            source: 'low-hanging-fruit',
            route: item.matchedRoute
          });
          added.add(kwLower);
        }
      });
    }

    // 3. Add top queries
    if (dashboardData?.topQueries) {
      dashboardData.topQueries.forEach((row: any) => {
        const keyword = row.keys?.[0] || row.query || '';
        if (!keyword) return;
        const kwLower = keyword.toLowerCase();
        if (!added.has(kwLower)) {
          list.push({
            keyword,
            position: row.position || 0,
            clicks: row.clicks || 0,
            impressions: row.impressions || 0,
            ctr: row.ctr || 0,
            source: 'top-query'
          });
          added.add(kwLower);
        }
      });
    }

    // Sort by position ascending so top rankings are first
    return list.sort((a, b) => a.position - b.position);
  }, [rankTrackerData, lowHangingFruit, dashboardData]);

  // Filtered list for the Ranking Heatmap visualizer
  const filteredHeatmapKeywords = useMemo(() => {
    let result = [...heatmapKeywords];

    // Filter by search text
    if (heatmapSearch.trim()) {
      const q = heatmapSearch.toLowerCase();
      result = result.filter(item => item.keyword.toLowerCase().includes(q));
    }

    // Filter by tier
    if (heatmapKeywordFilter === 'top3') {
      result = result.filter(item => item.position <= 3.0);
    } else if (heatmapKeywordFilter === 'top4_10') {
      result = result.filter(item => item.position > 3.0 && item.position <= 10.0);
    } else if (heatmapKeywordFilter === 'top11_plus') {
      result = result.filter(item => item.position > 10.0);
    }

    return result;
  }, [heatmapKeywords, heatmapSearch, heatmapKeywordFilter]);

  const loadLowHangingFruit = async () => {
    setLoadingFruit(true);
    try {
      const res = await fetch(`/api/search-console/low-hanging-fruit?siteUrl=${encodeURIComponent(siteUrl)}`);
      const data = await res.json();
      if (data.success) {
        setLowHangingFruit(data.items || []);
      }
    } catch (err) {
      console.error('Failed to load low-hanging fruit keywords:', err);
    } finally {
      setLoadingFruit(false);
    }
  };

  const loadRankingIssues = async () => {
    setLoadingRankingIssues(true);
    try {
      const res = await fetch('/api/seo/ranking-issues');
      const data = await res.json();
      if (data.success) {
        setRankingIssues(data.issues || []);
      }
    } catch (err) {
      console.error('Failed to load ranking issues:', err);
    } finally {
      setLoadingRankingIssues(false);
    }
  };

  const loadAutoRepairSettings = async () => {
    try {
      const res = await fetch('/api/seo/auto-repair-settings');
      const data = await res.json();
      if (data && typeof data.enabled === 'boolean') {
        setAutoRepairEnabled(data.enabled);
      }
    } catch (err) {
      console.error('Failed to load auto-repair settings:', err);
    }
  };

  const loadAutoRepairHistory = async () => {
    setLoadingAutoRepairHistory(true);
    try {
      const res = await fetch('/api/seo/auto-repair-history');
      const data = await res.json();
      if (Array.isArray(data)) {
        setAutoRepairHistory(data);
      }
    } catch (err) {
      console.error('Failed to load auto-repair history:', err);
    } finally {
      setLoadingAutoRepairHistory(false);
    }
  };

  const handleToggleAutoRepair = async () => {
    const nextVal = !autoRepairEnabled;
    const toastId = toast.loading(`${nextVal ? 'Enabling' : 'Disabling'} AI Auto-Repair Engine...`);
    try {
      const res = await fetch('/api/seo/auto-repair-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: nextVal })
      });
      const data = await res.json();
      if (data.success) {
        setAutoRepairEnabled(nextVal);
        toast.success(`AI Auto-Repair Engine ${nextVal ? 'Activated & Monitoring' : 'Paused'}!`, { id: toastId });
      } else {
        toast.error(`Failed to update auto-repair settings: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: toastId });
    }
  };

  const triggerAutoRepair = async (keyword: string, notifId?: string) => {
    setRepairingKeyword(keyword);
    const toastId = toast.loading(`[AI Auto-Repair] Rank slip alert detected! Auto-repairing page content for "${keyword}"...`);
    try {
      const res = await fetch('/api/seo/auto-repair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, notifId })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`[AI Auto-Repair Success] Content for "${keyword}" refreshed & density re-calibrated!`, { id: toastId });
        await loadAutoRepairHistory();
        await loadRankingIssues();
      } else {
        toast.error(`[AI Auto-Repair Failed] ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`[AI Auto-Repair Error] ${err.message}`, { id: toastId });
    } finally {
      setRepairingKeyword(null);
    }
  };

  const handleFixRankingIssue = async (issue: any) => {
    setFixingRankingIssueId(issue.id);
    const toastId = toast.loading(`Programmatically applying SEO optimization for "${issue.keyword}"...`);
    try {
      const res = await fetch('/api/seo/fix-ranking-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: issue.id,
          keyword: issue.keyword,
          issueType: issue.issueType,
          route: issue.route
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Success: ${data.message}`, { id: toastId });
        await loadRankingIssues();
        await loadRankTrackerData();
        await loadDashboardData();
      } else {
        toast.error(`Failed to apply fix: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: toastId });
    } finally {
      setFixingRankingIssueId(null);
    }
  };

  const handleFixAllRankingIssues = async () => {
    if (!rankingIssues || rankingIssues.filter(i => !i.fixed).length === 0) return;
    setFixingAllRankingIssues(true);
    const unfixedIssues = rankingIssues.filter(i => !i.fixed);
    const toastId = toast.loading(`Executing batch auto-repair protocol on ${unfixedIssues.length} ranking issues...`);
    
    let successCount = 0;
    try {
      for (const issue of unfixedIssues) {
        const res = await fetch('/api/seo/fix-ranking-issue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: issue.id,
            keyword: issue.keyword,
            issueType: issue.issueType,
            route: issue.route
          })
        });
        const data = await res.json();
        if (data.success) {
          successCount++;
        }
      }
      toast.success(`Unified SEO Booster: Successfully healed & optimized ${successCount} ranking nodes!`, { id: toastId });
      await loadRankingIssues();
      await loadRankTrackerData();
      await loadDashboardData();
    } catch (err: any) {
      toast.error(`Batch fix completed with errors: ${err.message}`, { id: toastId });
    } finally {
      setFixingAllRankingIssues(false);
    }
  };

  const loadAuditImages = async () => {
    setLoadingAuditImages(true);
    try {
      const res = await fetch('/api/scan-images');
      const data = await res.json();
      if (data.success) {
        setAuditImages(data.items || []);
      }
    } catch (err) {
      console.error('Failed to load image audit items:', err);
    } finally {
      setLoadingAuditImages(false);
    }
  };

  const handleFixAltTag = async (item: any) => {
    setFixingAltId(item.id);
    const toastId = toast.loading(`Generating & applying premium alt tag for "${item.src}"...`);
    try {
      // Fetch suggested alt tag from API
      const suggestRes = await fetch('/api/suggest-alt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageName: item.pageName, src: item.src })
      });
      const suggestData = await suggestRes.json();
      if (!suggestData.success) {
        throw new Error(suggestData.message || 'Failed to suggest alt tag');
      }
      
      const newAlt = suggestData.suggestion;
      
      // Submit updated alt tag to API
      const updateRes = await fetch('/api/update-alt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePath: item.filePath,
          lineNumber: item.lineNumber,
          newAlt
        })
      });
      const updateData = await updateRes.json();
      if (updateData.success) {
        toast.success(`Healed: Applied alt="${newAlt}" on line ${item.lineNumber}`, { id: toastId });
        await loadAuditImages();
      } else {
        toast.error(`Failed to apply fix: ${updateData.message}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: toastId });
    } finally {
      setFixingAltId(null);
    }
  };

  const handleFixAllAltTags = async () => {
    setFixingAllAlts(true);
    const toastId = toast.loading('Running batch Image Alt Tag Audit & programmatically writing premium tags...');
    try {
      const res = await fetch('/api/fix-all-alts', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        toast.success(`Successfully repaired & injected ${data.count} image alt-tag assets directly into codebase!`, { id: toastId });
        await loadAuditImages();
      } else {
        toast.error(`Batch fix failed: ${data.message}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: toastId });
    } finally {
      setFixingAllAlts(false);
    }
  };

  const loadReportConfig = async () => {
    setLoadingReportConfig(true);
    try {
      const res = await fetch('/api/search-console/weekly-reports');
      const data = await res.json();
      if (data.success && data.config) {
        setReportConfig(data.config);
      }
    } catch (err) {
      console.error('Failed to load weekly report config:', err);
    } finally {
      setLoadingReportConfig(false);
    }
  };

  const handleSaveReportConfig = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!reportConfig.email.trim()) {
      toast.error('Please enter a recipient email address.');
      return;
    }
    
    setSavingReportConfig(true);
    const toastId = toast.loading('Saving automated weekly report configurations...');
    try {
      const res = await fetch('/api/search-console/weekly-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportConfig)
      });
      const data = await res.json();
      if (data.success) {
        setReportConfig(data.config);
        toast.success('Weekly report preferences saved successfully!', { id: toastId });
      } else {
        toast.error(`Failed to save weekly report preferences: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error saving preferences: ${err.message}`, { id: toastId });
    } finally {
      setSavingReportConfig(false);
    }
  };

  const handleTestReport = async () => {
    if (!reportConfig.email.trim()) {
      toast.error('Please enter a recipient email address first.');
      return;
    }
    
    setTestingReport(true);
    const toastId = toast.loading('Compiling and generating real-time weekly SEO digest preview...');
    try {
      const res = await fetch('/api/search-console/weekly-reports/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportConfig)
      });
      const data = await res.json();
      if (data.success) {
        setReportTestResult(data);
        setShowReportPreviewModal(true);
        if (data.sandboxMode) {
          toast.info('Digest compiled successfully in Sandbox Mode. Fallback preview logged in server console.', { id: toastId, duration: 8000 });
        } else {
          toast.success(`Digest compiled and live email sent to ${reportConfig.email}!`, { id: toastId });
        }
      } else {
        toast.error(`Failed to generate report preview: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error compiling digest: ${err.message}`, { id: toastId });
    } finally {
      setTestingReport(false);
    }
  };

  const generateAIOptimization = async (fruit: any) => {
    setSelectedFruit(fruit);
    setOptimizedCopy(null);
    setGeneratingCopy(true);
    setShowCopyModal(true);
    const toastId = toast.loading(`Generating AI-optimized copywriting for "${fruit.keyword}"...`);

    try {
      const res = await fetch('/api/search-console/generate-optimization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: fruit.keyword,
          matchedRoute: fruit.matchedRoute,
          pageTitle: fruit.pageTitle
        })
      });

      const data = await res.json();
      if (data.success) {
        setOptimizedCopy(data.optimizedText);
        toast.success(`Successfully generated search-optimized block for ${fruit.pageTitle}!`, { id: toastId });
      } else {
        toast.error(`Optimization generation failed: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: toastId });
    } finally {
      setGeneratingCopy(false);
    }
  };

  const runLiveForecastAgent = async () => {
    if (!selectedFruit) return;
    setLoadingForecast(true);
    const toastId = toast.loading(`Invoking AI forecasting agent for "${selectedFruit.keyword}"...`);
    try {
      const response = await fetch("/api/search-console/ranking-forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: selectedFruit.keyword,
          position: selectedFruit.position,
          clicks: selectedFruit.clicks,
          impressions: selectedFruit.impressions,
          ctr: selectedFruit.ctr,
          matchedRoute: selectedFruit.matchedRoute,
          pageTitle: selectedFruit.pageTitle,
          sitemaps: dashboardData?.sitemaps || [],
          healthReport: healthReport
        })
      });
      const data = await response.json();
      if (data.success) {
        setForecastReport(data);
        toast.success(`Predicted ranking forecast compiled for "${selectedFruit.keyword}"!`, { id: toastId });
      } else {
        toast.error("AI Forecasting agent encountered an error: " + data.error, { id: toastId });
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Network communication error with the forecasting agent.", { id: toastId });
    } finally {
      setLoadingForecast(false);
    }
  };

  const generateBulkBrief = async () => {
    if (!lowHangingFruit || selectedBulkKeywords.length === 0) {
      toast.error("Please select at least one keyword using the checkboxes first!");
      return;
    }

    const selectedItems = lowHangingFruit.filter(item => selectedBulkKeywords.includes(item.keyword));
    
    setBulkBriefText(null);
    setGeneratingBulkBrief(true);
    setShowBulkBriefModal(true);
    const toastId = toast.loading(`Compiling AI Content Brief for ${selectedItems.length} selected keywords...`);

    try {
      const res = await fetch('/api/search-console/generate-bulk-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedItems })
      });

      const data = await res.json();
      if (data.success) {
        setBulkBriefText(data.briefText);
        toast.success(`Successfully compiled content brief for ${selectedItems.length} keywords!`, { id: toastId });
      } else {
        toast.error(`Brief compilation failed: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: toastId });
    } finally {
      setGeneratingBulkBrief(false);
    }
  };

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
  const [gscSearchQuery, setGscSearchQuery] = useState('');

  const filteredTopQueries = useMemo(() => {
    if (!dashboardData?.topQueries) return [];
    if (!gscSearchQuery.trim()) return dashboardData.topQueries;
    const q = gscSearchQuery.toLowerCase();
    return dashboardData.topQueries.filter((row: any) => 
      (row.keys?.[0] || '').toLowerCase().includes(q)
    );
  }, [dashboardData?.topQueries, gscSearchQuery]);

  const filteredTopPages = useMemo(() => {
    if (!dashboardData?.topPages) return [];
    if (!gscSearchQuery.trim()) return dashboardData.topPages;
    const q = gscSearchQuery.toLowerCase();
    return dashboardData.topPages.filter((row: any) => 
      (row.keys?.[0] || '').toLowerCase().includes(q)
    );
  }, [dashboardData?.topPages, gscSearchQuery]);

  // Load Status and History
  const loadStatus = async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch('/api/search-console/status');
      const data = await res.json();
      if (data.success) {
        setStatus({
          configured: data.configured,
          isAuthorized: data.isAuthorized,
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
    loadLowHangingFruit();
    loadReportConfig();
    loadRankingIssues();
    loadAuditImages();
    loadAutoRepairSettings();
    loadAutoRepairHistory();
  }, []);

  useEffect(() => {
    // Whenever the background polling hook receives a fresh update, automatically refresh the dashboard widgets
    if (rankingsLastUpdated) {
      loadRankTrackerData();
      loadRankingIssues();
      loadAutoRepairHistory();
    }
  }, [rankingsLastUpdated]);

  // Monitor rank alert notifications and automatically trigger repair on dropped keywords
  useEffect(() => {
    if (!autoRepairEnabled || !notifications || notifications.length === 0) return;
    
    const unreadDrops = notifications.filter(n => n.type === 'RANK_DROPPED' && !n.read);
    if (unreadDrops.length > 0) {
      unreadDrops.forEach(notif => {
        triggerAutoRepair(notif.keyword, notif.id);
      });
    }
  }, [notifications, autoRepairEnabled]);

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

  const handleCompetitorCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitorDomain.trim()) {
      toast.error('Please enter a competitor domain.');
      return;
    }

    setComparingCompetitor(true);
    const toastId = toast.loading(`Analyzing search metrics against ${competitorDomain}...`);

    try {
      // Build keyword array from heatmapKeywords or defaults
      const kwList = heatmapKeywords.length > 0 
        ? heatmapKeywords.slice(0, 15).map(k => ({
            keyword: k.keyword,
            position: k.position,
            clicks: k.clicks,
            impressions: k.impressions,
            ctr: k.ctr
          }))
        : [
            { keyword: 'Zultys Dallas', position: 1.4, clicks: 3, impressions: 30, ctr: 0.1 },
            { keyword: 'VoIP DFW', position: 5.4, clicks: 2, impressions: 48, ctr: 0.0417 },
            { keyword: 'Business Phone Systems', position: 14.2, clicks: 1, impressions: 120, ctr: 0.0083 }
          ];

      const res = await fetch('/api/search-console/competitor-comparison', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitorDomain: competitorDomain.trim().replace(/^(https?:\/\/)?(www\.)?/, ''),
          siteUrl,
          keywords: kwList
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCompetitorResult(data);
        toast.success(`Analysis for ${competitorDomain} completed successfully!`, { id: toastId });
      } else {
        toast.error(`Analysis failed: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message || 'Competitor analysis failed'}`, { id: toastId });
    } finally {
      setComparingCompetitor(false);
    }
  };

  const renderComparisonMarkdown = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-sm font-bold text-slate-800 mt-4 mb-2 first:mt-0">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={idx} className="text-xs font-bold text-slate-700 mt-3 mb-1">{line.replace('#### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-base font-bold text-slate-800 mt-5 mb-2 first:mt-0">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const cleanLine = line.substring(2);
        const parts = cleanLine.split('**');
        return (
          <li key={idx} className="list-disc ml-4 text-xs text-slate-600 mb-1 leading-relaxed">
            {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-slate-800">{part}</strong> : part)}
          </li>
        );
      }
      if (line.trim() === '') return <div key={idx} className="h-2" />;
      
      const parts = line.split('**');
      return (
        <p key={idx} className="text-xs text-slate-600 mb-2 leading-relaxed">
          {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-slate-800">{part}</strong> : part)}
        </p>
      );
    });
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
            <a
              href="/citation-health"
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white transition text-sm font-black uppercase tracking-wider rounded-lg shadow-md hover:shadow-indigo-500/20 cursor-pointer active:scale-95"
            >
              <MapPin className="h-4 w-4 text-indigo-200" />
              Local Citation Health
            </a>
            <button
              onClick={handleFixAll}
              disabled={fixingAll}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition text-sm font-black uppercase tracking-wider rounded-lg shadow-md hover:shadow-indigo-500/20 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
              {fixingAll ? 'Calibrating...' : 'Fix All Site Settings'}
            </button>
            <button 
              onClick={() => { loadStatus(); loadHistory(); loadDashboardData(); loadRankTrackerData(); loadHeatmapData(); loadHealthReport(); loadLowHangingFruit(); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 transition border border-slate-700 text-sm font-medium rounded-lg shadow-sm cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${loadingStatus || loadingHistory || loadingDashboard || loadingRankTracker || loadingHeatmap || loadingHealth || loadingFruit ? 'animate-spin' : ''}`} />
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
                  <div className={`inline-flex items-center gap-2 px-3 py-1 ${status.isAuthorized ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'} border rounded-full text-xs font-semibold`}>
                    <CheckCircle className="h-3.5 w-3.5" /> {status.isAuthorized ? 'Google Search Console Verified' : 'Service Account Connected'}
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <span className="text-xs text-slate-500 font-mono block">Service Account Email</span>
                    <span className="text-sm font-medium font-mono text-slate-800 break-all">{status.clientEmail}</span>
                  </div>
                  {status.isAuthorized ? (
                    <p className="text-xs text-emerald-600 font-medium">
                      ✔ Property is verified in Google Search Console. Ready for automated sitemap submissions and URL re-crawling.
                    </p>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
                      <p className="font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        Awaiting Search Console Delegation
                      </p>
                      <p className="text-slate-700">
                        To enable live Search Console sync, open <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">Google Search Console</a> &rarr; <strong>Settings</strong> &rarr; <strong>Users and permissions</strong>, and add <span className="font-mono font-semibold">{status.clientEmail}</span> as a user for <span className="font-mono font-semibold">{siteUrl}</span>.
                      </p>
                    </div>
                  )}
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

        {/* Owner SEO Image Indexing & Alt Tag Auditor */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-3xs font-black uppercase tracking-widest mb-3 border border-emerald-100">
                <ShieldCheck className="h-3 w-3 text-emerald-600" /> Source-Code Accessibility Shield
              </div>
              <h2 id="image-tag-auditor" className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileCode className="h-5.5 w-5.5 text-blue-600" /> Owner SEO Image Indexing & Alt Tag Auditor
              </h2>
              <p className="text-slate-500 text-xs mt-1 max-w-2xl leading-relaxed">
                Scans source files dynamically to locate raw image tags, auto-suggest premium descriptive keywords, and write corrections directly into the code base.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={loadAuditImages}
                disabled={loadingAuditImages}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 transition rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-200 cursor-pointer text-slate-700 disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loadingAuditImages ? 'animate-spin' : ''}`} /> Re-Scan Source Code
              </button>
              <button
                onClick={handleFixAllAltTags}
                disabled={fixingAllAlts || !auditImages || auditImages.filter(i => i.status === 'missing' || i.status === 'empty').length === 0}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-100 transition rounded-lg text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5" /> 1-Click Fix All Image Alts ({auditImages ? auditImages.filter(i => i.status === 'missing' || i.status === 'empty').length : 0})
              </button>
            </div>
          </div>

          {/* Quick Metrics & Score Ring */}
          {auditImages && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-3xs text-slate-400 uppercase tracking-wider font-bold block">Total Images Found</span>
                  <span className="text-xl font-bold text-slate-800">{auditImages.length} tags</span>
                </div>
              </div>

              <div className="flex items-center gap-4 border-y md:border-y-0 md:border-x border-slate-200 py-4 md:py-0 md:px-6">
                <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-3xs text-slate-400 uppercase tracking-wider font-bold block">Fix Pending</span>
                  <span className="text-xl font-bold text-slate-800">
                    {auditImages.filter(i => i.status === 'missing' || i.status === 'empty').length} assets
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center">
                  {/* Custom CSS/SVG Score Ring */}
                  <svg className="w-14 h-14 shrink-0">
                    <circle cx="28" cy="28" r="24" className="stroke-slate-200 fill-none" strokeWidth="4" />
                    <circle 
                      cx="28" 
                      cy="28" 
                      r="24" 
                      className="stroke-emerald-500 fill-none transition-all duration-500" 
                      strokeWidth="4" 
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      strokeDashoffset={`${2 * Math.PI * 24 * (1 - (auditImages.length > 0 ? (auditImages.filter(i => i.status === 'valid').length / auditImages.length) : 1))}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-slate-800">
                    {auditImages.length > 0 ? Math.round((auditImages.filter(i => i.status === 'valid').length / auditImages.length) * 100) : 100}%
                  </span>
                </div>
                <div>
                  <span className="text-3xs text-slate-400 uppercase tracking-wider font-bold block">SEO Score</span>
                  <span className="text-sm font-extrabold text-emerald-600 uppercase tracking-wide">
                    {auditImages.filter(i => i.status === 'missing' || i.status === 'empty').length === 0 ? 'Optimal Accessibility' : 'Warning: Action Required'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {loadingAuditImages ? (
            <div className="py-12 text-center text-slate-400 space-y-3">
              <RefreshCw className="h-8 w-8 text-slate-400 animate-spin mx-auto" />
              <p className="text-xs">Crawling through local .tsx templates in src/pages and src/components to analyze alt tags...</p>
            </div>
          ) : !auditImages || auditImages.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No images detected in source code. All assets pristine!
            </div>
          ) : (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 grid grid-cols-12 gap-4 text-3xs font-black uppercase text-slate-400 tracking-wider">
                <span className="col-span-3">Source &amp; Line</span>
                <span className="col-span-3">Image Path / Src</span>
                <span className="col-span-3">Current Alt Tag</span>
                <span className="col-span-3 text-right">Action</span>
              </div>

              <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                {auditImages.map((item, idx) => (
                  <div key={idx} className="px-4 py-3.5 grid grid-cols-12 gap-4 items-center text-xs hover:bg-slate-50/50 transition">
                    <div className="col-span-3 space-y-1">
                      <span className="font-bold text-slate-800 block truncate">{item.pageName}.tsx</span>
                      <span className="text-3xs font-mono text-slate-400">Line {item.lineNumber} &bull; {item.filePath}</span>
                    </div>

                    <div className="col-span-3 truncate text-3xs font-mono text-slate-500" title={item.src}>
                      {item.src}
                    </div>

                    <div className="col-span-3">
                      {item.status === 'valid' ? (
                        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-3xs font-medium w-fit">
                          <Check className="h-3 w-3 shrink-0" /> {item.alt}
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded text-3xs font-medium w-fit">
                            <AlertTriangle className="h-3 w-3 shrink-0" /> {item.status === 'missing' ? 'Missing alt tag' : 'Empty alt tag'}
                          </div>
                          <span className="text-3xs text-blue-600 block leading-relaxed font-medium bg-blue-50/50 border border-blue-100/40 p-1.5 rounded">
                            Suggested: "{generateSeoSuggestion(item.pageName, item.src)}"
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="col-span-3 text-right">
                      {item.status !== 'valid' ? (
                        <button
                          onClick={() => handleFixAltTag(item)}
                          disabled={fixingAltId !== null}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-3xs font-black uppercase tracking-wider cursor-pointer disabled:opacity-50 inline-flex items-center gap-1"
                        >
                          {fixingAltId === item.id ? (
                            <RefreshCw className="h-3 w-3 animate-spin" />
                          ) : (
                            <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
                          )}
                          Auto-Fix Tag
                        </button>
                      ) : (
                        <span className="text-emerald-600 text-3xs font-black uppercase tracking-wider flex items-center justify-end gap-1">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Fully Indexed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
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

                {/* Heading Structure Violations Column */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="h-4 w-4" /> Heading Violations ({healthReport.headingViolations?.length || 0})
                    </h3>
                    <span className="text-3xs bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded font-mono font-bold">
                      Impact: Medium-High (SEO)
                    </span>
                  </div>

                  {!healthReport.headingViolations || healthReport.headingViolations.length === 0 ? (
                    <p className="text-slate-500 text-xs py-8 text-center">✔ All active pages follow a strict heading hierarchy.</p>
                  ) : (
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                      {healthReport.headingViolations.map((item, idx) => {
                        const isMissingH1 = item.issues.some((issue: any) => issue.type === "missing-h1" || issue.type === "missing_h1" || issue.message.toLowerCase().includes("missing primary header") || issue.message.toLowerCase().includes("missing h1"));
                        return (
                          <div 
                            key={idx} 
                            className={`bg-slate-900 border rounded-lg p-3 text-xs space-y-2 hover:border-slate-700 transition animate-fade-in ${
                              isMissingH1 
                                ? "border-rose-500/60 shadow-lg shadow-rose-950/20 ring-1 ring-rose-500/20" 
                                : "border-slate-800"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-200">{item.pageName} Page</span>
                              <div className="flex items-center gap-1.5">
                                {isMissingH1 && (
                                  <span className="text-3xs bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded uppercase font-black tracking-wider animate-pulse">
                                    Missing H1
                                  </span>
                                )}
                                <span className="text-3xs font-mono text-slate-500">{item.route}</span>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              {item.issues.map((issue: any, issueIdx: number) => (
                                <div key={issueIdx} className="text-3xs bg-rose-950/20 border border-rose-900/30 p-2 rounded">
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <span className={`px-1 rounded text-3xs font-bold uppercase ${
                                      issue.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-300'
                                    }`}>
                                      {issue.severity}
                                    </span>
                                    <span className="text-slate-300 font-medium">{issue.message}</span>
                                  </div>
                                  <div className="text-slate-400 mt-1 pl-1 border-l border-rose-500/25">
                                    <strong className="text-slate-300 font-mono">Fix Suggestion:</strong> {issue.suggestedFix}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
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

        {/* Internal Link Auditor Section */}
        <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
          <InternalLinkAuditor />
        </section>

        {/* Accessibility & Heading Hierarchy Auditor Section */}
        <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
          <AccessibilityAndSEOAuditor />
        </section>

        {/* Dynamic FAQPage JSON-LD Schema Auditor Section */}
        <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
          <FAQPageSchema headless={false} />
        </section>

        {/* Live GSC Ranking Issues & SERP Booster */}
        <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden space-y-6">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-500/20 text-rose-300 rounded-full text-3xs font-black uppercase tracking-widest mb-3">
                <TrendingUp className="h-3 w-3 text-rose-400" /> SERP Grounding Intelligence
              </div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Award className="h-5.5 w-5.5 text-rose-400" /> GSC Ranking Issues & SERP Booster
              </h2>
              <p className="text-slate-400 text-xs mt-1 max-w-2xl leading-relaxed">
                Our live SERP grounding tracker evaluates keywords for Search Console position decay, sub-optimal click-through-rates (CTR), and competitor outranking, providing one-click AI meta-overrides and localized content calibration.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadRankingIssues}
                disabled={loadingRankingIssues}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 transition rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 cursor-pointer text-white disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loadingRankingIssues ? 'animate-spin' : ''}`} /> Scan Ranking Issues
              </button>
              <button
                onClick={handleFixAllRankingIssues}
                disabled={fixingAllRankingIssues || !rankingIssues || rankingIssues.filter(i => !i.fixed).length === 0}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-400 disabled:bg-slate-800 disabled:text-slate-500 disabled:border-slate-800 transition rounded-lg text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md shadow-rose-500/10 hover:shadow-rose-500/25"
              >
                <Sparkles className="h-3.5 w-3.5" /> 1-Click Repair All Rankings ({rankingIssues ? rankingIssues.filter(i => !i.fixed).length : 0})
              </button>
            </div>
          </div>

          {/* Automated SEO Auto-Repair Control Center */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${autoRepairEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                    <Wrench className="h-4 w-4 text-emerald-400" /> AI Auto-Repair Engine
                  </h3>
                </div>
                <p className="text-slate-400 text-3xs">
                  Real-time rank slippage monitoring. Automatically initiates Gemini content-refresh & keyword-density re-calibration on dropped queries.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xs text-slate-400 font-mono">
                  Auto-Healing Status: <strong className={autoRepairEnabled ? "text-emerald-400" : "text-rose-400"}>{autoRepairEnabled ? "ACTIVE" : "PAUSED"}</strong>
                </span>
                <button
                  onClick={handleToggleAutoRepair}
                  className={`px-3 py-1.5 rounded-lg text-3xs font-bold uppercase tracking-wider cursor-pointer border transition ${
                    autoRepairEnabled 
                      ? "bg-slate-900 border-rose-800/60 hover:bg-rose-950/20 text-rose-400" 
                      : "bg-emerald-600 border-emerald-500 hover:bg-emerald-500 text-slate-950"
                  }`}
                >
                  {autoRepairEnabled ? "Pause Engine" : "Activate Engine"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Status / Telemetry Cards */}
              <div className="lg:col-span-1 space-y-3">
                <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-4xs uppercase tracking-wider text-slate-500 font-bold block">Keywords Restored</span>
                    <span className="text-2xl font-black text-slate-100 font-mono">{autoRepairHistory.length}</span>
                  </div>
                  <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-4xs uppercase tracking-wider text-slate-500 font-bold block">Last Repaired Route</span>
                    <span className="text-xs font-black text-slate-300 font-mono truncate max-w-[150px] block">
                      {autoRepairHistory[0] ? autoRepairHistory[0].route : "N/A"}
                    </span>
                  </div>
                  <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400">
                    <FileText className="h-5 w-5" />
                  </div>
                </div>

                {repairingKeyword && (
                  <div className="bg-emerald-950/10 border border-emerald-800/30 rounded-xl p-4 flex items-center gap-3 animate-pulse">
                    <RefreshCw className="h-5 w-5 text-emerald-400 animate-spin flex-shrink-0" />
                    <div className="space-y-0.5">
                      <span className="text-4xs uppercase tracking-wider text-emerald-400 font-bold block">Active Auto-Repair</span>
                      <span className="text-3xs text-slate-300 font-medium font-mono">Re-engineering content for "{repairingKeyword}"...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Auto-Healing Logs and Audits list */}
              <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 space-y-3">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1 border-b border-slate-800 pb-2">
                  <FileText className="h-3.5 w-3.5 text-slate-400" /> Automated Healed Pages Logs ({autoRepairHistory.length})
                </h4>

                {loadingAutoRepairHistory ? (
                  <div className="py-6 text-center text-slate-500 text-3xs flex items-center justify-center gap-1.5">
                    <RefreshCw className="h-3 w-3 animate-spin" /> Fetching healing history...
                  </div>
                ) : autoRepairHistory.length === 0 ? (
                  <div className="py-10 text-center text-slate-500 text-3xs italic">
                    No automated healing tasks executed yet. Real-time rank drops will trigger healings here.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {autoRepairHistory.map((item, index) => (
                      <div key={item.id || index} className="bg-slate-950/40 border border-slate-800 rounded-lg p-3 text-3xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-slate-500">{new Date(item.timestamp).toLocaleString()}</span>
                          <span className="font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase text-[8px]">
                            {item.densityIncrease}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-slate-400">Healed keyword:</span>
                          <span className="bg-slate-800 text-slate-100 font-bold px-2 py-0.5 rounded-md">{item.keyword}</span>
                          <span className="text-slate-400">on route:</span>
                          <span className="font-mono font-bold text-blue-400">{item.route} ({item.fileName})</span>
                        </div>
                        <div className="border-t border-slate-800/40 pt-2 grid grid-cols-2 gap-3 text-[9px] text-slate-300">
                          <div>
                            <strong className="text-slate-400 text-[8px] block uppercase tracking-wider">Before Title:</strong>
                            <span className="line-through text-slate-500 truncate block">{item.oldTitle}</span>
                            <strong className="text-emerald-400 text-[8px] block uppercase tracking-wider mt-1">After Title:</strong>
                            <span className="truncate block font-semibold">{item.newTitle}</span>
                          </div>
                          <div>
                            <strong className="text-slate-400 text-[8px] block uppercase tracking-wider">Before Description:</strong>
                            <span className="line-through text-slate-500 truncate block">{item.oldDescription}</span>
                            <strong className="text-emerald-400 text-[8px] block uppercase tracking-wider mt-1">After Description:</strong>
                            <span className="truncate block font-semibold">{item.newDescription}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {loadingRankingIssues ? (
            <div className="py-12 text-center text-slate-400 space-y-3">
              <RefreshCw className="h-8 w-8 text-slate-500 animate-spin mx-auto" />
              <p className="text-xs">Analyzing monitored keywords against CTR benchmarks, competitor search volumes, and page-level keyword density...</p>
            </div>
          ) : !rankingIssues || rankingIssues.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-semibold text-white">All Rankings Pristine!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No keyword position slippage, competitor overreaches, or low CTR snippet anomalies detected. All search engine results page metrics are fully optimized!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {/* Active Issues Column */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <h3 className="text-xs font-black uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" /> Detected Search Performance Gaps ({rankingIssues.filter(i => !i.fixed).length})
                  </h3>
                  <span className="text-3xs bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded font-mono font-bold">
                    Target: Position Boosting
                  </span>
                </div>

                {rankingIssues.filter(i => !i.fixed).length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    ✔ All active ranking issues have been programmatically resolved!
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {rankingIssues.filter(i => !i.fixed).map((issue, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-3 hover:border-slate-700/80 transition relative">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200 bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-700/30">
                            {issue.keyword}
                          </span>
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            issue.severity === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {issue.severity} RISK
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-300 text-xs mb-1">{issue.title}</h4>
                          <p className="text-slate-400 text-3xs leading-relaxed">{issue.description}</p>
                        </div>

                        <div className="bg-rose-950/10 text-rose-300 p-2.5 rounded-lg border border-rose-900/20 text-3xs space-y-1">
                          <span className="font-bold text-rose-400 block uppercase tracking-wider text-[9px]">Booster Recommendation:</span>
                          <p>{issue.recommendation}</p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-4xs font-mono text-slate-500">Route: {issue.route}</span>
                          <button
                            onClick={() => handleFixRankingIssue(issue)}
                            disabled={fixingRankingIssueId !== null}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-3xs font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition disabled:opacity-50"
                          >
                            {fixingRankingIssueId === issue.id ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
                            )}
                            Fix Ranking Issue
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Resolved / Optimized Log Column */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <h3 className="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4" /> Calibrated & Optimized Nodes ({rankingIssues.filter(i => i.fixed).length})
                  </h3>
                  <span className="text-3xs bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                    GSC Calibration Sync: Live
                  </span>
                </div>

                {rankingIssues.filter(i => i.fixed).length === 0 ? (
                  <div className="py-16 text-center text-slate-500 text-xs space-y-2">
                    <Award className="h-8 w-8 text-slate-700 mx-auto" />
                    <p>No ranking nodes have been calibrated yet. Run auto-boosters on the left column to immediately seed dynamic overrides.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {rankingIssues.filter(i => i.fixed).map((issue, idx) => (
                      <div key={idx} className="bg-slate-900/50 border border-emerald-900/30 rounded-xl p-4 text-xs space-y-3 hover:border-emerald-800/40 transition">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-300 bg-emerald-950/20 px-2.5 py-1 rounded-lg border border-emerald-900/20">
                            {issue.keyword}
                          </span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                            <Check className="h-3 w-3" /> CALIBRATED
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-300 text-xs">{issue.title}</h4>
                          <p className="text-slate-400 text-3xs mt-1 font-semibold leading-normal">AI optimization meta tags and Schema entities successfully generated and written into your local overrides configuration file.</p>
                        </div>

                        <div className="bg-emerald-950/10 text-emerald-300 p-2.5 rounded-lg border border-emerald-900/20 text-3xs leading-normal">
                          <span className="font-bold text-emerald-400 block uppercase tracking-wider text-[9px] mb-1 font-black">Applied Override Solution:</span>
                          <p>Localized semantic copy density expanded, and custom Google Search crawler routing hooks established. Indexing priority accelerated.</p>
                        </div>
                        
                        <div className="text-4xs font-mono text-slate-500">Route Match: {issue.route}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Page-2 "Low-Hanging Fruit" Optimization Suite */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg">
                  <Flame className="h-5 w-5 animate-pulse" />
                </span>
                <h2 className="text-lg font-extrabold tracking-tight">
                  Page-2 "Low-Hanging Fruit" Optimization Suite
                </h2>
              </div>
              <p className="text-xs text-slate-400 max-w-3xl">
                We scanned your search performance to locate high-impression keywords ranking on Page 2 (positions 10.0–22.0).
                Adjusting the matched target pages with on-page SEO modifications and internal links can elevate these onto Page 1 for major traffic increases.
              </p>
            </div>
            {lowHangingFruit && lowHangingFruit.length > 0 && (
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400 self-start md:self-auto font-mono">
                {lowHangingFruit.length} High-Potential Terms Isolated
              </span>
            )}
          </div>

          {loadingFruit ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <RefreshCw className="h-8 w-8 text-amber-500 animate-spin mx-auto" />
              <p className="text-xs font-medium">Scanning organic keyword listings for high-potential terms...</p>
            </div>
          ) : !lowHangingFruit || lowHangingFruit.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <AlertTriangle className="h-8 w-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-400">No Page-2 high-impression terms found yet.</p>
              <p className="text-3xs text-slate-500 max-w-sm mx-auto mt-1">Check back once your site has indexed and gained search traffic impressions across more keyword lists.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Quick Insights Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Page 2 Keywords Card */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between transition-all hover:border-slate-700/80">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Page 2 Keywords</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-amber-500 font-mono">
                        {lowHangingFruit.filter(item => item.position >= 10.0 && item.position <= 20.0).length}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Rank 11-20</span>
                    </div>
                    <p className="text-3xs text-slate-400">High potential to push to Page 1</p>
                  </div>
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 shrink-0">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>

                {/* Page 3 Keywords Card */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between transition-all hover:border-slate-700/80">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Page 3 Keywords</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-blue-400 font-mono">
                        {lowHangingFruit.filter(item => item.position > 20.0 && item.position <= 31.0).length}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Rank 21-30</span>
                    </div>
                    <p className="text-3xs text-slate-400">Steady search footprint builder</p>
                  </div>
                  <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 shrink-0">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                </div>

                {/* Optimization Score Card */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between transition-all hover:border-slate-700/80">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Optimization Score</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-emerald-400 font-mono">
                        {(() => {
                          const totalVol = lowHangingFruit.reduce((acc, item) => acc + item.impressions, 0);
                          if (totalVol === 0) return '100%';
                          const weightedPos = lowHangingFruit.reduce((acc, item) => acc + (item.position * item.impressions), 0) / totalVol;
                          const raw = 100 - ((weightedPos - 10) / 20) * 50;
                          return `${Math.min(100, Math.max(0, Math.round(raw)))}%`;
                        })()}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Weighted potential</span>
                    </div>
                    <p className="text-3xs text-slate-400">Position depth vs search impressions</p>
                  </div>
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Filter and Sorting Control Panel */}
              <div className="bg-slate-950/45 border border-slate-800/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search query input */}
                <div className="relative flex-1 max-w-md w-full">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={fruitSearchQuery}
                    onChange={(e) => setFruitSearchQuery(e.target.value)}
                    placeholder="Search keywords, routes, or target pages..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition"
                  />
                  {fruitSearchQuery && (
                    <button
                      onClick={() => setFruitSearchQuery('')}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter and Sorting choices */}
                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                  {/* Category Filter */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider whitespace-nowrap">Page Sector:</span>
                    <select
                      value={fruitRouteFilter}
                      onChange={(e) => setFruitRouteFilter(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer w-full sm:w-auto"
                    >
                      <option value="all">All Pages (All Sectors)</option>
                      <option value="home">Home Page (Core Brand)</option>
                      <option value="competitor">Competitor Comparisons</option>
                      <option value="local">Local DFW Cities SEO</option>
                      <option value="industries">Industry Vertical Pages</option>
                      <option value="guides">Resource & Upgrade Guides</option>
                    </select>
                  </div>

                  {/* Tier Filter Toggle Switch */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider whitespace-nowrap">Ranking Tier:</span>
                    <div className="flex bg-slate-900 border border-slate-800 p-0.5 rounded-lg w-full sm:w-auto">
                      <button
                        onClick={() => setFruitPageTier('page2')}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition whitespace-nowrap cursor-pointer ${
                          fruitPageTier === 'page2'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="Show Page 2 keywords (Rank 11-20)"
                      >
                        Page 2 (Rank 11-20)
                      </button>
                      <button
                        onClick={() => setFruitPageTier('page3')}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition whitespace-nowrap cursor-pointer ${
                          fruitPageTier === 'page3'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="Show Page 3 keywords (Rank 21-30)"
                      >
                        Page 3 (Rank 21-30)
                      </button>
                      <button
                        onClick={() => setFruitPageTier('all')}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition whitespace-nowrap cursor-pointer ${
                          fruitPageTier === 'all'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="Show All Low-Hanging Fruit"
                      >
                        All
                      </button>
                    </div>
                  </div>

                  {/* Sorting Control */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider whitespace-nowrap">Sort By:</span>
                    <div className="flex bg-slate-900 border border-slate-800 p-0.5 rounded-lg w-full sm:w-auto overflow-x-auto">
                      <button
                        onClick={() => setFruitSortBy('volume')}
                        className={`flex-1 sm:flex-none px-2.5 py-1 rounded-md text-[10px] font-bold transition whitespace-nowrap cursor-pointer ${
                          fruitSortBy === 'volume'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="Sort by search volume (impressions)"
                      >
                        Est. Volume
                      </button>
                      <button
                        onClick={() => setFruitSortBy('ranking')}
                        className={`flex-1 sm:flex-none px-2.5 py-1 rounded-md text-[10px] font-bold transition whitespace-nowrap cursor-pointer ${
                          fruitSortBy === 'ranking'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="Sort by search console position"
                      >
                        Current Ranking
                      </button>
                      <button
                        onClick={() => setFruitSortBy('clicks')}
                        className={`flex-1 sm:flex-none px-2.5 py-1 rounded-md text-[10px] font-bold transition whitespace-nowrap cursor-pointer ${
                          fruitSortBy === 'clicks'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="Sort by recorded clicks"
                      >
                        Clicks
                      </button>
                      <button
                        onClick={() => setFruitSortBy('ctr')}
                        className={`flex-1 sm:flex-none px-2.5 py-1 rounded-md text-[10px] font-bold transition whitespace-nowrap cursor-pointer ${
                          fruitSortBy === 'ctr'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="Sort by click-through rate"
                      >
                        CTR
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {filteredAndSortedFruit.length === 0 ? (
                <div className="bg-slate-950/30 border border-slate-800/80 rounded-2xl py-16 text-center text-slate-500 space-y-3">
                  <AlertCircle className="h-8 w-8 text-amber-500/80 mx-auto" />
                  <div>
                    <p className="text-xs font-bold text-slate-300">No Keywords Match Selected Filters</p>
                    <p className="text-3xs text-slate-500 max-w-sm mx-auto mt-1">Try clearing your search query or choosing a different page sector option.</p>
                  </div>
                  <button
                    onClick={() => { setFruitSearchQuery(''); setFruitRouteFilter('all'); setFruitSortBy('volume'); setFruitPageTier('page2'); }}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-3xs font-bold transition cursor-pointer"
                  >
                    Reset Active Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Keywords Sidebar list */}
                  <div className="lg:col-span-5 space-y-3 max-h-[480px] overflow-y-auto pr-1">
                    <div className="flex items-center justify-between mb-2 bg-slate-950/20 px-2.5 py-1.5 rounded-lg border border-slate-900/30">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={filteredAndSortedFruit.length > 0 && filteredAndSortedFruit.every(item => selectedBulkKeywords.includes(item.keyword))}
                          onChange={() => {
                            const isAllSelected = filteredAndSortedFruit.length > 0 && filteredAndSortedFruit.every(item => selectedBulkKeywords.includes(item.keyword));
                            if (isAllSelected) {
                              const shownKeywords = filteredAndSortedFruit.map(item => item.keyword);
                              setSelectedBulkKeywords(prev => prev.filter(kw => !shownKeywords.includes(kw)));
                            } else {
                              const shownKeywords = filteredAndSortedFruit.map(item => item.keyword);
                              setSelectedBulkKeywords(prev => Array.from(new Set([...prev, ...shownKeywords])));
                            }
                          }}
                          className="rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500/50 h-3.5 w-3.5"
                        />
                        <span className="text-3xs font-bold uppercase text-slate-400 tracking-wider">
                          Select All ({filteredAndSortedFruit.length})
                        </span>
                      </label>
                      <span className="text-[9px] font-mono text-slate-400 text-right">
                        Tier: {fruitPageTier === 'page2' ? 'Page 2' : fruitPageTier === 'page3' ? 'Page 3' : 'All'}
                      </span>
                    </div>

                    {/* Bulk Actions Compiler Bar */}
                    {selectedBulkKeywords.length > 0 && (
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                            <span className="text-3xs text-amber-200 font-bold">
                              {selectedBulkKeywords.length} Keyword{selectedBulkKeywords.length > 1 ? 's' : ''} Selected
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedBulkKeywords([])}
                            className="text-[9px] font-bold text-slate-400 hover:text-slate-200 uppercase tracking-wider cursor-pointer"
                          >
                            Clear All
                          </button>
                        </div>
                        <button
                          onClick={generateBulkBrief}
                          className="w-full px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-3xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer animate-pulse"
                        >
                          <Sparkles className="h-3.5 w-3.5 shrink-0" />
                          Generate Bulk Content Brief ({selectedBulkKeywords.length})
                        </button>
                      </div>
                    )}

                    {/* Ranking Forecast Column Headers */}
                    <div className="hidden sm:grid grid-cols-12 gap-2 px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-900/40 pb-2 mb-1.5">
                      <div className="col-span-6 flex items-center gap-1.5">
                        Keyword Opportunity
                      </div>
                      <div className="col-span-3 text-right">
                        Current Rank
                      </div>
                      <div className="col-span-3 text-right text-emerald-400">
                        Ranking Forecast
                      </div>
                    </div>

                    {filteredAndSortedFruit.map((item, idx) => {
                      const isSelected = selectedFruit?.keyword === item.keyword;
                      const isChecked = selectedBulkKeywords.includes(item.keyword);

                      // Calculate the live predictive metrics
                      const currentPos = item.position || 15.0;
                      const totalImpressions = item.impressions || 100;
                      const volumeLog = Math.min(3.5, Math.log10(totalImpressions || 1) * 0.9);

                      let activityBoost = 0;
                      if (dashboardData?.sitemaps && dashboardData.sitemaps.length > 0) {
                        activityBoost += 1.2;
                      }
                      if (healthReport) {
                        const issues = (healthReport.brokenLinks?.length || 0) + (healthReport.missingDescriptions?.length || 0);
                        if (issues === 0) {
                          activityBoost += 1.8;
                        } else if (issues < 3) {
                          activityBoost += 0.8;
                        }
                      }
                      const predictedImprovement = 1.5 + volumeLog + activityBoost;
                      const predictedPosition = Math.max(1.0, Math.round((currentPos - predictedImprovement) * 10) / 10);
                      const delta = Math.round((currentPos - predictedPosition) * 10) / 10;
                      const isPage2 = currentPos <= 20.0;
                      const difficulty = isPage2 ? (totalImpressions > 1000 ? "Medium" : "Low") : (totalImpressions > 1000 ? "High" : "Medium");

                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedFruit(item)}
                          className={`p-3 rounded-xl border transition cursor-pointer text-left relative ${
                            isSelected
                              ? 'bg-slate-800/80 border-amber-500/50 shadow-md shadow-amber-500/5'
                              : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                          }`}
                        >
                          <div className="sm:grid sm:grid-cols-12 sm:gap-2 items-center space-y-2 sm:space-y-0">
                            {/* Column 1: Keyword, Checkbox, URL */}
                            <div className="sm:col-span-6 space-y-1">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    setSelectedBulkKeywords(prev => {
                                      if (prev.includes(item.keyword)) {
                                        return prev.filter(kw => kw !== item.keyword);
                                      } else {
                                        return [...prev, item.keyword];
                                      }
                                    });
                                  }}
                                  className="rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500/50 h-3.5 w-3.5 shrink-0 cursor-pointer"
                                />
                                <span className="font-bold text-xs text-slate-100 select-all font-mono tracking-tight break-all">
                                  {item.keyword}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-500 truncate bg-slate-950/30 px-1.5 py-0.5 rounded flex items-center gap-1 max-w-[200px] sm:max-w-none">
                                <span className="shrink-0 text-[8px] bg-blue-500/20 text-blue-400 px-1 rounded uppercase tracking-wider font-bold">URL</span>
                                <span className="truncate">{item.matchedRoute}</span>
                              </div>
                            </div>

                            {/* Column 2: Current position + metrics */}
                            <div className="sm:col-span-3 text-left sm:text-right space-y-1">
                              <span className="inline-block px-1.5 py-0.5 bg-amber-500/10 text-amber-400 rounded-md text-[10px] font-extrabold font-mono">
                                Pos #{item.position.toFixed(1)}
                              </span>
                              <div className="text-[9px] text-slate-400 font-mono flex sm:flex-col gap-2 sm:gap-0 justify-start sm:justify-end">
                                <span>Vol: <strong>{item.impressions}</strong></span>
                                <span>CTR: <strong>{(item.ctr * 100).toFixed(1)}%</strong></span>
                              </div>
                            </div>

                            {/* Column 3: Ranking Forecast Column */}
                            <div className="sm:col-span-3 text-left sm:text-right space-y-1">
                              <div className="flex items-center sm:justify-end gap-1">
                                <TrendingUp className="h-3 w-3 text-emerald-400 shrink-0" />
                                <span className="font-mono text-xs font-black text-emerald-400">
                                  #{predictedPosition.toFixed(1)}
                                </span>
                              </div>
                              <div className="text-[9px] text-slate-400 font-mono flex sm:flex-col gap-2 sm:gap-0 justify-start sm:justify-end">
                                <span className="text-emerald-400 font-bold">▲ +{delta.toFixed(1)} ranks</span>
                                <span className={`text-[8px] font-black uppercase tracking-wider px-1 py-0.2 rounded inline-block self-start sm:self-end ${
                                  difficulty === 'Low' ? 'bg-emerald-500/10 text-emerald-400' :
                                  difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                                }`}>
                                  {difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Analysis & Optimization Panel */}
                  <div className="lg:col-span-7 bg-slate-950/50 border border-slate-800/80 rounded-xl p-5 space-y-5">
                    {selectedFruit ? (
                      <div className="space-y-5">
                        {/* Header: Selected details */}
                        <div className="border-b border-slate-800 pb-4 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-3xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                              Target Page
                            </span>
                            <span className="text-3xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                              {selectedFruit.matchedRoute}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-200">
                            {selectedFruit.pageTitle}
                          </h3>
                          <p className="text-3xs text-slate-400">
                            Analyzing ranking potential for: <strong className="text-amber-400 font-mono select-all font-bold">"{selectedFruit.keyword}"</strong> (Page 2)
                          </p>
                        </div>

                        {/* SEO Checklist Recipe */}
                        <div className="space-y-3">
                          <h4 className="text-3xs font-black uppercase tracking-widest text-slate-500">
                            Specific Page Update Checklist
                          </h4>
                          
                          <div className="space-y-2 text-xs">
                            {/* Heading */}
                            <div className="flex gap-2.5 bg-slate-900/60 p-3 rounded-lg border border-slate-800/50">
                              <span className="text-amber-500 font-mono font-bold">H#</span>
                              <div className="space-y-1">
                                <span className="font-bold text-slate-300 block text-3xs">Heading Structure</span>
                                <p className="text-slate-400 text-3xs leading-relaxed">{selectedFruit.recommendations.headingSuggestion}</p>
                              </div>
                            </div>

                            {/* Density */}
                            <div className="flex gap-2.5 bg-slate-900/60 p-3 rounded-lg border border-slate-800/50">
                              <span className="text-blue-400 font-mono font-bold">W#</span>
                              <div className="space-y-1">
                                <span className="font-bold text-slate-300 block text-3xs">Keyword Density & Placement</span>
                                <p className="text-slate-400 text-3xs leading-relaxed">{selectedFruit.recommendations.contentAdjustment}</p>
                              </div>
                            </div>

                            {/* Internal Link */}
                            <div className="flex gap-2.5 bg-slate-900/60 p-3 rounded-lg border border-slate-800/50">
                              <span className="text-indigo-400 font-mono font-bold">L#</span>
                              <div className="space-y-1">
                                <span className="font-bold text-slate-300 block text-3xs">Internal Linking Signal</span>
                                <p className="text-slate-400 text-3xs leading-relaxed">{selectedFruit.recommendations.internalLinkOpportunity}</p>
                              </div>
                            </div>

                            {/* Call to action */}
                            <div className="flex gap-2.5 bg-slate-900/60 p-3 rounded-lg border border-slate-800/50">
                              <span className="text-emerald-400 font-mono font-bold">C#</span>
                              <div className="space-y-1">
                                <span className="font-bold text-slate-300 block text-3xs">CTA Alignment</span>
                                <p className="text-slate-400 text-3xs leading-relaxed">{selectedFruit.recommendations.ctaOptimization}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* AI Ranking Forecast Agent Section */}
                        <div className="bg-slate-900/60 border border-amber-500/20 rounded-xl p-4 space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-amber-400 shrink-0 animate-pulse" />
                              <h4 className="text-3xs font-black uppercase tracking-wider text-slate-200">
                                AI Predictive Ranking Forecast
                              </h4>
                            </div>
                            <span className="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">
                              Agent Powered
                            </span>
                          </div>

                          {loadingForecast ? (
                            <div className="py-8 flex flex-col items-center justify-center space-y-3 text-center">
                              <RefreshCw className="h-6 w-6 text-amber-500 animate-spin" />
                              <div className="space-y-1">
                                <p className="text-3xs font-bold text-slate-300">Consulting AI forecasting agent...</p>
                                <p className="text-[9px] text-slate-500 max-w-xs leading-normal">
                                  Running regression against sitemaps history, page crawl speed, health check indicators, and impressions volume trends.
                                </p>
                              </div>
                            </div>
                          ) : forecastReport ? (
                            <div className="space-y-3">
                              {/* Summary of forecast */}
                              <div className="grid grid-cols-3 gap-2.5 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800 text-center">
                                <div>
                                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">Predicted Rank</span>
                                  <strong className="text-xs text-emerald-400 font-mono font-black">
                                    #{forecastReport.predictedPosition.toFixed(1)}
                                  </strong>
                                </div>
                                <div>
                                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">Expected CTR</span>
                                  <strong className="text-xs text-slate-200 font-mono font-black">
                                    {(forecastReport.predictedCtr * 100).toFixed(2)}%
                                  </strong>
                                </div>
                                <div>
                                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">Confidence</span>
                                  <strong className="text-xs text-amber-400 font-mono font-black">
                                    {forecastReport.confidence}%
                                  </strong>
                                </div>
                              </div>

                              <div className="text-3xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800/50 max-h-[180px] overflow-y-auto whitespace-pre-wrap font-mono select-all">
                                {forecastReport.explanation}
                              </div>

                              <button
                                onClick={runLiveForecastAgent}
                                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <RefreshCw className="h-3 w-3" /> Re-Analyze Ranking Forecast
                              </button>
                            </div>
                          ) : (
                            <div className="py-4 text-center space-y-2">
                              <p className="text-[10px] text-slate-400 leading-normal">
                                Predict the ranking progression and traffic lift for <strong className="text-amber-400">"{selectedFruit.keyword}"</strong> based on local site signals and search console trends.
                              </p>
                              <button
                                onClick={runLiveForecastAgent}
                                className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 rounded-lg text-3xs font-extrabold uppercase tracking-widest transition-all inline-flex items-center gap-1.5 cursor-pointer"
                                id="predict-ranking-btn"
                              >
                                <Sparkles className="h-3.5 w-3.5" /> Predict Ranking Forecast with AI
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Gemini AI Optimization section */}
                        <div className="pt-2">
                          <button
                            onClick={() => generateAIOptimization(selectedFruit)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold uppercase tracking-widest text-3xs rounded-lg transition shadow-lg shadow-amber-500/10 cursor-pointer active:scale-[0.99]"
                          >
                            <Sparkles className="h-4 w-4" />
                            Generate AI Optimized Copy block (Gemini)
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-16 text-center text-slate-500 space-y-2">
                        <BookOpen className="h-8 w-8 text-slate-700 mx-auto" />
                        <p className="text-xs font-bold text-slate-400">No Keyword Selected</p>
                        <p className="text-3xs text-slate-500 max-w-xs mx-auto">Click on any page-2 keyword from the list on the left to reveal its specific SEO optimization recipe and generate tailored copywriting content blocks.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Auto-Inject Keyword Density Optimizer Suite */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6" id="auto-inject-optimizer-suite">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </span>
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                  AI Auto-Inject Keyword Density Optimizer
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Identify paragraphs with low focus-keyword density (&lt; 1%) and use Gemini AI to intelligently rewrite them with integrated location-based modifiers.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl font-mono">
              <span>Threshold Standard:</span>
              <span className="font-bold text-slate-700 bg-slate-200/60 px-1.5 py-0.5 rounded">&gt;= 1.0% Density</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Left panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <label className="text-3xs font-black uppercase text-slate-400 tracking-wider">Paste Original Copywriting</label>
                <textarea
                  value={originalDensityText}
                  onChange={(e) => setOriginalDensityText(e.target.value)}
                  placeholder="Paste your page's paragraphs or copywriting blocks here..."
                  className="w-full h-44 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-slate-700 font-medium placeholder-slate-400 resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-3xs font-black uppercase text-slate-400 tracking-wider">Target Focus Keyword</label>
                  <input
                    type="text"
                    value={targetDensityKeyword}
                    onChange={(e) => setTargetDensityKeyword(e.target.value)}
                    placeholder="e.g., business phone system"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-slate-700 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-3xs font-black uppercase text-slate-400 tracking-wider">Target DFW Location</label>
                  <input
                    type="text"
                    value={targetDensityLocation}
                    onChange={(e) => setTargetDensityLocation(e.target.value)}
                    placeholder="e.g., Fort Worth"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-slate-700 font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={analyzeDensity}
                  disabled={isDensityAnalyzing || !originalDensityText}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase py-3 cursor-pointer select-none shadow-sm"
                >
                  {isDensityAnalyzing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <BarChart3 className="h-4 w-4" />}
                  <span>Analyze Keyword Density</span>
                </button>
                {analyzedParagraphs.length > 0 && (
                  <button
                    onClick={optimizeAllLowDensityParagraphs}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 transition text-white rounded-xl text-xs font-black uppercase py-3 cursor-pointer select-none shadow-sm"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Optimize Low Density ({analyzedParagraphs.filter(p => p.status === 'low').length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Results Right panel */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-2xl p-5 min-h-[320px] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-3xs font-black uppercase text-slate-400 tracking-wider">Analyzed Content Blocks ({analyzedParagraphs.length})</span>
                  {analyzedParagraphs.length > 0 && (
                    <span className="text-4xs font-mono font-bold bg-slate-200/80 px-2 py-0.5 rounded text-slate-600">
                      Overall Density Health: {((analyzedParagraphs.filter(p => p.status === 'optimized').length / analyzedParagraphs.length) * 100).toFixed(0)}% Good
                    </span>
                  )}
                </div>

                {analyzedParagraphs.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 space-y-3">
                    <div className="bg-slate-200/50 p-3 rounded-full w-fit mx-auto">
                      <Sparkles className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="text-xs leading-normal max-w-sm mx-auto">
                      Paste your current text or paragraphs into the editor on the left and click <strong className="text-slate-700">"Analyze Keyword Density"</strong> to discover low-performing paragraphs and optimize them instantly.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 divide-y divide-slate-200/60">
                    {analyzedParagraphs.map((p, idx) => (
                      <div key={p.id} className={`pt-4 ${idx === 0 ? 'pt-0' : ''} space-y-2.5`}>
                        <div className="flex flex-wrap items-center justify-between gap-2 text-3xs font-semibold">
                          <span className="text-slate-400 uppercase font-bold font-mono">Paragraph Block #{idx + 1}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 font-mono bg-slate-200/50 px-2 py-0.5 rounded">
                              {p.wordCount} words
                            </span>
                            <span className={`px-2 py-0.5 rounded font-mono ${p.status === 'low' ? 'bg-amber-50 border border-amber-200 text-amber-700' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'}`}>
                              Density: {p.density.toFixed(1)}% ({p.status === 'low' ? 'Low' : 'Good'})
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-700">
                          {/* Original Text */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Original Text:</span>
                            <div className="bg-white border border-slate-100 p-3 rounded-xl leading-relaxed select-all">
                              {p.original}
                            </div>
                          </div>

                          {/* Optimized Text */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-blue-500 uppercase flex items-center gap-1">
                              <Sparkles className="h-3 w-3" /> AI Optimized Text (Injected Keywords):
                            </span>
                            {p.isOptimizing ? (
                              <div className="bg-blue-50/50 border border-blue-100 p-8 rounded-xl flex flex-col items-center justify-center text-center space-y-2">
                                <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                                <span className="text-3xs text-blue-600 font-bold uppercase tracking-wider">Injecting & Rewriting...</span>
                              </div>
                            ) : p.optimized ? (
                              <div className="bg-emerald-50/30 border border-emerald-100 p-3 rounded-xl leading-relaxed text-slate-800 font-bold select-all relative group transition-all">
                                <span>{p.optimized}</span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(p.optimized || '');
                                    toast.success("Optimized paragraph copied!");
                                  }}
                                  className="absolute top-2 right-2 bg-white/90 border border-slate-200 p-1 rounded-md shadow-sm opacity-0 group-hover:opacity-100 hover:bg-slate-50 transition cursor-pointer"
                                  title="Copy optimized paragraph"
                                >
                                  <Check className="h-3.5 w-3.5 text-slate-600" />
                                </button>
                              </div>
                            ) : p.status === 'low' ? (
                              <button
                                onClick={() => optimizeDensityParagraph(p.id)}
                                className="w-full py-6 bg-amber-50 hover:bg-amber-100 border border-dashed border-amber-300 rounded-xl text-amber-800 font-bold uppercase transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                              >
                                <Sparkles className="h-4 w-4 text-amber-500 animate-bounce" />
                                <span className="text-3xs tracking-wider">Auto-Inject Keyword Now</span>
                              </button>
                            ) : (
                              <div className="bg-slate-100 border border-slate-200 p-3 rounded-xl leading-relaxed text-slate-400 italic text-3xs flex items-center justify-center py-6">
                                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mr-1.5" />
                                No optimization needed. Focus keyword is already well-represented.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {analyzedParagraphs.length > 0 && (
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-3xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1 text-blue-600">
                    <Info className="h-3.5 w-3.5" /> Paragraphs with density &lt; 1% are automatically highlighted in amber.
                  </span>
                  <button
                    onClick={() => {
                      const allText = analyzedParagraphs.map(p => p.optimized || p.original).join("\n\n");
                      navigator.clipboard.writeText(allText);
                      toast.success("All optimized copy blocks copied to clipboard!");
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                  >
                    Copy Entire Optimized Copy
                  </button>
                </div>
              )}
            </div>
          </div>
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
                      <div className="space-y-8">
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

                        {/* D3 Historical Rank Distribution & Trends Section */}
                        <div className="border-t border-slate-200/65 pt-6">
                          <D3RankDistributionChart rankTrackerData={rankTrackerData} />
                        </div>

                      </div>
                    </div>
                  );
                  })()
                )}
              </div>

              {/* INTERACTIVE RANKING HEATMAP WIDGET */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6" id="ranking-heatmap-widget">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Award className="h-5.5 w-5.5 text-blue-600 animate-pulse" /> Interactive Ranking Heatmap & SERP Tiers
                    </h2>
                    <p className="text-sm text-slate-500">
                      Color-coded density visualizer for all tracked keywords. Select keywords to run predictive optimization simulations.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center">
                    {/* Search Field */}
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search heatmap..."
                        value={heatmapSearch}
                        onChange={(e) => setHeatmapSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 w-44"
                        id="heatmap-search-input"
                      />
                      {heatmapSearch && (
                        <button
                          onClick={() => setHeatmapSearch('')}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Heatmap Metrics and Tiers Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Total tracked terms */}
                  <div 
                    onClick={() => setHeatmapKeywordFilter('all')}
                    className={`p-4 rounded-xl border transition cursor-pointer text-left ${heatmapKeywordFilter === 'all' ? 'bg-slate-50 border-blue-500 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
                    id="heatmap-stat-all"
                  >
                    <span className="text-3xs font-black uppercase tracking-wider text-slate-400">Total Tracked</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-black text-slate-900 font-mono">{heatmapKeywords.length}</span>
                      <span className="text-[10px] text-slate-500 font-medium">Keywords</span>
                    </div>
                  </div>

                  {/* Top 3 (Green) */}
                  <div 
                    onClick={() => setHeatmapKeywordFilter('top3')}
                    className={`p-4 rounded-xl border transition cursor-pointer text-left ${heatmapKeywordFilter === 'top3' ? 'bg-emerald-50/50 border-emerald-500 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
                    id="heatmap-stat-top3"
                  >
                    <span className="text-3xs font-black uppercase tracking-wider text-emerald-600">Top 3 (Green)</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-black text-emerald-600 font-mono">
                        {heatmapKeywords.filter(item => item.position <= 3.0).length}
                      </span>
                      <span className="text-[10px] text-emerald-500 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                        {heatmapKeywords.length ? Math.round((heatmapKeywords.filter(item => item.position <= 3.0).length / heatmapKeywords.length) * 100) : 0}%
                      </span>
                    </div>
                  </div>

                  {/* 4-10 (Yellow) */}
                  <div 
                    onClick={() => setHeatmapKeywordFilter('top4_10')}
                    className={`p-4 rounded-xl border transition cursor-pointer text-left ${heatmapKeywordFilter === 'top4_10' ? 'bg-amber-50/50 border-amber-500 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
                    id="heatmap-stat-top4-10"
                  >
                    <span className="text-3xs font-black uppercase tracking-wider text-amber-650">Tier 4-10 (Yellow)</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-black text-amber-500 font-mono">
                        {heatmapKeywords.filter(item => item.position > 3.0 && item.position <= 10.0).length}
                      </span>
                      <span className="text-[10px] text-amber-550 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                        {heatmapKeywords.length ? Math.round((heatmapKeywords.filter(item => item.position > 3.0 && item.position <= 10.0).length / heatmapKeywords.length) * 100) : 0}%
                      </span>
                    </div>
                  </div>

                  {/* 11+ (Red) */}
                  <div 
                    onClick={() => setHeatmapKeywordFilter('top11_plus')}
                    className={`p-4 rounded-xl border transition cursor-pointer text-left ${heatmapKeywordFilter === 'top11_plus' ? 'bg-rose-50/50 border-rose-500 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
                    id="heatmap-stat-top11-plus"
                  >
                    <span className="text-3xs font-black uppercase tracking-wider text-rose-600">11+ Opportunity (Red)</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-black text-rose-600 font-mono">
                        {heatmapKeywords.filter(item => item.position > 10.0).length}
                      </span>
                      <span className="text-[10px] text-rose-500 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">
                        {heatmapKeywords.length ? Math.round((heatmapKeywords.filter(item => item.position > 10.0).length / heatmapKeywords.length) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Horizontal Distribution Ratio Bar */}
                <div className="space-y-1.5" id="heatmap-distribution-bar-container">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <span>SERP Share Distribution</span>
                    <div className="flex gap-4">
                      <span className="text-emerald-600">Top 3 ({heatmapKeywords.filter(item => item.position <= 3.0).length})</span>
                      <span className="text-amber-500">4-10 ({heatmapKeywords.filter(item => item.position > 3.0 && item.position <= 10.0).length})</span>
                      <span className="text-rose-550">11+ ({heatmapKeywords.filter(item => item.position > 10.0).length})</span>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex cursor-pointer">
                    {/* Top 3 segment */}
                    <div 
                      onClick={() => setHeatmapKeywordFilter('top3')}
                      style={{ width: `${heatmapKeywords.length ? (heatmapKeywords.filter(item => item.position <= 3.0).length / heatmapKeywords.length) * 100 : 0}%` }}
                      className="bg-emerald-500 h-full transition-all duration-300 hover:opacity-90"
                      title="Filter Top 3 Keywords"
                    />
                    {/* 4-10 segment */}
                    <div 
                      onClick={() => setHeatmapKeywordFilter('top4_10')}
                      style={{ width: `${heatmapKeywords.length ? (heatmapKeywords.filter(item => item.position > 3.0 && item.position <= 10.0).length / heatmapKeywords.length) * 100 : 0}%` }}
                      className="bg-amber-400 h-full transition-all duration-300 hover:opacity-90"
                      title="Filter Tier 4-10 Keywords"
                    />
                    {/* 11+ segment */}
                    <div 
                      onClick={() => setHeatmapKeywordFilter('top11_plus')}
                      style={{ width: `${heatmapKeywords.length ? (heatmapKeywords.filter(item => item.position > 10.0).length / heatmapKeywords.length) * 100 : 0}%` }}
                      className="bg-rose-450 h-full transition-all duration-300 hover:opacity-90"
                      title="Filter Tier 11+ Keywords"
                    />
                  </div>
                </div>

                {/* Heatmap Grid & Panel Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                  
                  {/* Heatmap Grid blocks (8 columns) */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2">
                      <span className="font-semibold uppercase tracking-wider">Color-Coded Keyword Matrix</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Top 3</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> Tier 4-10</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-450" /> Tier 11+</span>
                      </div>
                    </div>

                    {filteredHeatmapKeywords.length === 0 ? (
                      <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <Search className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs font-semibold">No keywords found matching the active filters.</p>
                        <p className="text-3xs text-slate-500 mt-0.5">Try clearing your search query or selecting a different tier.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredHeatmapKeywords.map((item, idx) => {
                          const isSelected = selectedHeatmapKeyword?.keyword === item.keyword;
                          const pos = item.position;
                          
                          // Determine background gradient, text colors, and borders based on position
                          let tileClasses = "";
                          let badgeClasses = "";
                          
                          if (pos <= 3.0) {
                            tileClasses = isSelected 
                              ? "bg-emerald-500/15 border-emerald-500 shadow-md shadow-emerald-500/10 text-emerald-950" 
                              : "bg-emerald-50 hover:bg-emerald-100/70 border-emerald-200/60 text-emerald-900";
                            badgeClasses = "bg-emerald-500 text-white";
                          } else if (pos > 3.0 && pos <= 10.0) {
                            tileClasses = isSelected 
                              ? "bg-amber-400/15 border-amber-500 shadow-md shadow-amber-500/10 text-amber-950" 
                              : "bg-amber-50/50 hover:bg-amber-100/50 border-amber-200/60 text-amber-900";
                            badgeClasses = "bg-amber-500 text-slate-900";
                          } else {
                            tileClasses = isSelected 
                              ? "bg-rose-500/15 border-rose-500 shadow-md shadow-rose-500/10 text-rose-950" 
                              : "bg-rose-50/50 hover:bg-rose-100/50 border-rose-200/60 text-rose-900";
                            badgeClasses = "bg-rose-500 text-white";
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => setSelectedHeatmapKeyword(item)}
                              className={`p-3 rounded-xl border text-left transition duration-150 relative flex flex-col justify-between h-24 cursor-pointer focus:outline-none ${tileClasses}`}
                              id={`heatmap-tile-${item.keyword.replace(/\s+/g, '-').toLowerCase()}`}
                            >
                              <div className="space-y-0.5 w-full">
                                <span className="font-mono text-[9px] font-bold text-slate-400 block uppercase tracking-wider">
                                  {item.source === 'rank-tracker' ? 'Core Tracker' : item.source === 'low-hanging-fruit' ? 'Page-2 Fruit' : 'Query Index'}
                                </span>
                                <span className="text-xs font-black tracking-tight line-clamp-2 leading-tight">
                                  {item.keyword}
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between w-full mt-2 pt-1 border-t border-slate-900/5">
                                <span className="text-[9px] text-slate-500 font-mono">
                                  Vol: <strong>{item.impressions}</strong>
                                </span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-black font-mono ${badgeClasses}`}>
                                  #{pos.toFixed(1)}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Keyword Simulator Detail Panel (4 columns) */}
                  <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                    {selectedHeatmapKeyword ? (
                      (() => {
                        const item = selectedHeatmapKeyword;
                        const pos = item.position;
                        
                        let tierName = "";
                        let tierColor = "";
                        let tierDesc = "";
                        
                        if (pos <= 3.0) {
                          tierName = "Top 3 Ranking (Elite)";
                          tierColor = "text-emerald-600 bg-emerald-50 border-emerald-100";
                          tierDesc = "Pristine visibility. Users click this keyword immediately. Maintain current density and monitor competitor backlinks.";
                        } else if (pos > 3.0 && pos <= 10.0) {
                          tierName = "Page 1 Tier (4-10)";
                          tierColor = "text-amber-600 bg-amber-50 border-amber-100";
                          tierDesc = "Visible on page 1, but subject to scroll-drop. Boosting rank by +2 positions will scale clicks by ~180%.";
                        } else {
                          tierName = "Page 2+ Opportunity (11+)";
                          tierColor = "text-rose-600 bg-rose-50 border-rose-100";
                          tierDesc = "Buried on page 2 or 3. High organic search volume represents immense cold-zone opportunity with on-page updates.";
                        }

                        // Calculate mock simulator values
                        const potentialClicksAtRank1 = Math.round(item.impressions * 0.35);
                        const addedTrafficValue = Math.max(0, potentialClicksAtRank1 - item.clicks);

                        return (
                          <div className="space-y-4 animate-fade-in" id="heatmap-detail-card">
                            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                              <div className="space-y-1">
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Keyword Analytics</span>
                                <h3 className="text-sm font-black text-slate-800">{item.keyword}</h3>
                              </div>
                              <button 
                                onClick={() => setSelectedHeatmapKeyword(null)}
                                className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Ranking status flag */}
                            <div className={`p-2.5 rounded-lg border text-xs font-semibold leading-relaxed ${tierColor}`}>
                              <span className="font-extrabold uppercase tracking-wider block text-[9px] mb-0.5">{tierName}</span>
                              {tierDesc}
                            </div>

                            {/* Detailed performance index */}
                            <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-slate-100 text-center">
                              <div>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Position</span>
                                <strong className="text-sm text-slate-800 font-mono">#{pos.toFixed(1)}</strong>
                              </div>
                              <div>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">30-day Volume</span>
                                <strong className="text-sm text-slate-800 font-mono">{item.impressions}</strong>
                              </div>
                              <div className="mt-2 pt-2 border-t border-slate-100">
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Clicks</span>
                                <strong className="text-sm text-slate-800 font-mono">{item.clicks}</strong>
                              </div>
                              <div className="mt-2 pt-2 border-t border-slate-100">
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Current CTR</span>
                                <strong className="text-sm text-slate-800 font-mono">{(item.ctr * 100).toFixed(1)}%</strong>
                              </div>
                            </div>

                            {/* Simulated climb projection widget */}
                            <div className="bg-slate-900 text-white rounded-lg p-3 space-y-3.5">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">SERP Target Simulator</span>
                                <span className="text-[8px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded uppercase font-bold tracking-wider">Predictive</span>
                              </div>
                              <p className="text-[10px] text-slate-300 leading-normal">
                                What if we improve this position to <strong className="text-emerald-400 font-bold">#1.0</strong> through localized copy tuning?
                              </p>
                              
                              <div className="space-y-1 bg-slate-950/40 p-2 rounded border border-slate-800/40 text-[10px]">
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Target Rank:</span>
                                  <span className="font-bold text-emerald-400">#1.0 (Top Spot)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Potential CTR:</span>
                                  <span className="font-bold font-mono">35.0%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Est. Monthly Clicks:</span>
                                  <span className="font-bold font-mono text-emerald-400">{potentialClicksAtRank1} clicks</span>
                                </div>
                                <div className="flex justify-between border-t border-slate-800/80 pt-1 mt-1 text-[11px]">
                                  <span className="text-slate-300 font-medium">Traffic Boost:</span>
                                  <span className="font-black text-emerald-400">+{addedTrafficValue} Clicks/mo</span>
                                </div>
                              </div>

                              <button
                                onClick={async () => {
                                  // Trigger the AI Ranking Forecast generator for this keyword!
                                  const toastId = toast.loading(`Initiating prediction algorithm for "${item.keyword}"...`);
                                  try {
                                    const response = await fetch("/api/search-console/ranking-forecast", {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({
                                        keyword: item.keyword,
                                        position: item.position,
                                        clicks: item.clicks,
                                        impressions: item.impressions,
                                        ctr: item.ctr,
                                        matchedRoute: item.route || "/api/search-console",
                                        pageTitle: item.keyword,
                                        sitemaps: dashboardData?.sitemaps || [],
                                        healthReport: healthReport
                                      })
                                    });
                                    const data = await response.json();
                                    if (data.success) {
                                      toast.success(`Simulation completed! Target Forecast predicted: #${data.predictedPosition.toFixed(1)} with ${data.confidence}% confidence.`, { id: toastId });
                                      toast.info(data.explanation.substring(0, 160) + "...", { duration: 8000 });
                                    } else {
                                      toast.error("Simulation failed: " + data.error, { id: toastId });
                                    }
                                  } catch (err) {
                                    toast.error("Network communication error with AI agent.", { id: toastId });
                                  }
                                }}
                                className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm shadow-blue-600/20"
                                id="heatmap-simulate-climb-btn"
                              >
                                <Sparkles className="h-3 w-3 text-amber-300 shrink-0" /> Run Climb Projection
                              </button>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="py-16 text-center text-slate-400 space-y-2" id="heatmap-empty-detail">
                        <Info className="h-8 w-8 text-slate-300 mx-auto animate-bounce" />
                        <p className="text-xs font-semibold">Select a Keyword</p>
                        <p className="text-3xs text-slate-500 max-w-[200px] mx-auto leading-normal">
                          Click on any color-coded keyword in the matrix to run advanced ranking analytics and traffic climb projections.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* COMPETITOR COMPARISON WIDGET */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6" id="competitor-comparison-widget">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="h-5.5 w-5.5 text-blue-600" /> Head-to-Head Competitor Comparison
                    </h2>
                    <p className="text-sm text-slate-500">
                      Compare search engine keyword rankings side-by-side with any competitor domain using GSC performance models.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleCompetitorCompare} className="bg-slate-50 border border-slate-100 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-end gap-4">
                  <div className="flex-1 space-y-1.5 w-full">
                    <label className="text-xs font-bold text-slate-600 block flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5 text-slate-400" /> Competitor Domain
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={competitorDomain}
                        onChange={(e) => setCompetitorDomain(e.target.value)}
                        placeholder="e.g. nextiva.com"
                        className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-semibold"
                        required
                      />
                      {competitorDomain && (
                        <button
                          type="button"
                          onClick={() => setCompetitorDomain('')}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={comparingCompetitor}
                    className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 transition text-white font-black uppercase tracking-wider py-2.5 px-6 rounded-lg text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer h-[42px]"
                  >
                    {comparingCompetitor ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        Run Competitive SEO Audit
                      </>
                    )}
                  </button>
                </form>

                {competitorResult ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                  >
                    {/* Comparison Keywords Table */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="py-3 px-4 text-xs font-bold text-slate-600">Keyword Path</th>
                              <th className="py-3 px-4 text-xs font-bold text-slate-600 text-center">Us (Rank)</th>
                              <th className="py-3 px-4 text-xs font-bold text-slate-600 text-center">Competitor</th>
                              <th className="py-3 px-4 text-xs font-bold text-slate-600 text-center">Outcome</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-xs">
                            {competitorResult.comparisonList.map((item, idx) => {
                              const rankDiff = item.competitorPosition - item.ourPosition;
                              const weWin = item.winner === 'us';
                              const tie = item.winner === 'tie';

                              return (
                                <tr key={idx} className="hover:bg-slate-50/50 transition">
                                  <td className="py-3.5 px-4">
                                    <span className="font-semibold text-slate-800 block">{item.keyword}</span>
                                    <span className="text-[10px] text-slate-400 block mt-0.5 max-w-[250px] truncate leading-normal">
                                      Opportunity: {item.opportunity}
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-4 text-center font-mono font-bold">
                                    <span className={`px-2 py-1 rounded ${weWin ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-700'}`}>
                                      #{item.ourPosition.toFixed(1)}
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-4 text-center font-mono font-bold">
                                    <span className={`px-2 py-1 rounded ${!weWin && !tie ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-slate-100 text-slate-700'}`}>
                                      #{item.competitorPosition.toFixed(1)}
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-4 text-center">
                                    {weWin ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                        <CheckCircle className="h-3 w-3 shrink-0" /> Us +{rankDiff.toFixed(1)}
                                      </span>
                                    ) : tie ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                                        Tie
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                                        <XCircle className="h-3 w-3 shrink-0" /> Competitor +{(-rankDiff).toFixed(1)}
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Executive Review Markdown Block */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                          <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                            <FileText className="h-4 w-4 text-blue-600" /> Executive Competitor Summary
                          </h3>
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${competitorResult.demoData ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                            {competitorResult.demoData ? 'Predicted Model' : 'GSC Grounded AI'}
                          </span>
                        </div>
                        <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
                          {renderComparisonMarkdown(competitorResult.executiveSummary)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="py-16 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                    <TrendingUp className="h-10 w-10 text-slate-300 mx-auto" />
                    <h3 className="text-sm font-semibold text-slate-700">No Domain Analyzed Yet</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Enter a competitor's domain name above to compare rankings, calculate click share gaps, and unlock actionable SEO blueprints to win search engine territory.
                    </p>
                  </div>
                )}
              </div>

              {/* AUTOMATED WEEKLY EMAIL REPORTS WIDGET */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6" id="weekly-reports-widget">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Mail className="h-5.5 w-5.5 text-blue-600 animate-pulse" /> Automated Weekly Email Digest
                    </h2>
                    <p className="text-sm text-slate-500">
                      Configure automated weekly email summaries detailing ranking gains or significant drops for monitored low-hanging fruit keywords.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${reportConfig.enabled ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      <span className={`h-2 w-2 rounded-full ${reportConfig.enabled ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                      {reportConfig.enabled ? 'Active Scheduler' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Configuration Controls */}
                  <div className="lg:col-span-7 space-y-5">
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveReportConfig(); }} className="space-y-4">
                      
                      {/* Subscription Toggle */}
                      <div className="flex items-center justify-between bg-slate-50 border border-slate-150 rounded-xl p-4">
                        <div className="space-y-0.5">
                          <label className="text-sm font-bold text-slate-800 block">Enable Automated Reports</label>
                          <span className="text-xs text-slate-500">When active, reports are compiled and sent on your preferred day.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setReportConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${reportConfig.enabled ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${reportConfig.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {/* Recipient Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 block">Recipient Email Address</label>
                          <div className="relative">
                            <input
                              type="email"
                              value={reportConfig.email}
                              onChange={(e) => setReportConfig(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="e.g. leroyrichardreber@gmail.com"
                              className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-semibold"
                              required
                            />
                            <Mail className="absolute right-3 top-3 h-4 w-4 text-slate-400" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 block">Weekly Send Day</label>
                          <div className="relative">
                            <select
                              value={reportConfig.dayOfWeek}
                              onChange={(e) => setReportConfig(prev => ({ ...prev, dayOfWeek: e.target.value }))}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-semibold cursor-pointer"
                            >
                              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <option key={day} value={day}>{day}s</option>
                              ))}
                            </select>
                            <Calendar className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Alert Threshold & Tracking Scope */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 block">Alert Threshold Sensitivity</label>
                          <select
                            value={reportConfig.threshold}
                            onChange={(e) => setReportConfig(prev => ({ ...prev, threshold: parseFloat(e.target.value) }))}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-semibold cursor-pointer"
                          >
                            <option value="0.0">All Rank Movements (Highly Sensitive)</option>
                            <option value="1.0">Position Shift &gt;= 1.0 (Recommended)</option>
                            <option value="2.0">Position Shift &gt;= 2.0</option>
                            <option value="3.0">Position Shift &gt;= 3.0 (Only Major Drops/Gains)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 block">Keyword Tracking Scope</label>
                          <div className="flex gap-4 pt-2">
                            <label className="flex items-center gap-2 text-xs text-slate-700 font-semibold cursor-pointer">
                              <input
                                type="radio"
                                name="keywordScope"
                                checked={reportConfig.allKeywords}
                                onChange={() => setReportConfig(prev => ({ ...prev, allKeywords: true }))}
                                className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                              />
                              All Low-Hanging Fruit
                            </label>
                            <label className="flex items-center gap-2 text-xs text-slate-700 font-semibold cursor-pointer">
                              <input
                                type="radio"
                                name="keywordScope"
                                checked={!reportConfig.allKeywords}
                                onChange={() => setReportConfig(prev => ({ ...prev, allKeywords: false }))}
                                className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                              />
                              Custom Selection
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Custom Selected Keywords Checkbox List */}
                      {!reportConfig.allKeywords && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2 border border-slate-200 rounded-xl p-4 bg-slate-50 overflow-hidden"
                        >
                          <label className="text-xs font-bold text-slate-700 block flex items-center justify-between">
                            <span>Select Tracked Keywords:</span>
                            <span className="text-slate-400 font-normal">{reportConfig.trackedKeywords.length} chosen</span>
                          </label>
                          <div className="max-h-[160px] overflow-y-auto divide-y divide-slate-100 pr-2">
                            {lowHangingFruit && lowHangingFruit.length > 0 ? (
                              lowHangingFruit.map((item, idx) => {
                                const isChecked = reportConfig.trackedKeywords.includes(item.keyword);
                                return (
                                  <label key={idx} className="flex items-center justify-between py-2 cursor-pointer hover:bg-slate-100/50 px-1 transition text-xs">
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {
                                          setReportConfig(prev => {
                                            const list = [...prev.trackedKeywords];
                                            if (isChecked) {
                                              return { ...prev, trackedKeywords: list.filter(k => k !== item.keyword) };
                                            } else {
                                              return { ...prev, trackedKeywords: [...list, item.keyword] };
                                            }
                                          });
                                        }}
                                        className="rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                                      />
                                      <span className="font-semibold text-slate-700">{item.keyword}</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-slate-400 font-bold bg-white border border-slate-100 px-1.5 py-0.5 rounded">
                                      #{item.position.toFixed(1)}
                                    </span>
                                  </label>
                                );
                              })
                            ) : (
                              <div className="text-center text-xs py-4 text-slate-400">
                                No low-hanging fruit keywords loaded yet.
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={savingReportConfig}
                          className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 transition text-white font-black uppercase tracking-wider py-3 px-6 rounded-lg text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {savingReportConfig ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              Saving Configuration...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Save Report Preferences
                            </>
                          )}
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleTestReport}
                          disabled={testingReport}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition text-white font-black uppercase tracking-wider py-3 px-6 rounded-lg text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {testingReport ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              Compiling digest...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send Test Report Now
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Visual Report Insights Panel */}
                  <div className="lg:col-span-5 space-y-4">
                    {reportTestResult ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                            <Activity className="h-4 w-4 text-blue-600" /> Compiled Weekly Report Summary
                          </h3>
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${reportTestResult.sandboxMode ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                            {reportTestResult.sandboxMode ? 'Sandbox Mode' : 'Live SMTP Digest'}
                          </span>
                        </div>

                        {/* Summary Metrics */}
                        <div className="grid grid-cols-3 gap-2.5">
                          <div className="bg-white border border-slate-100 rounded-lg p-2.5 text-center">
                            <div className="text-lg font-black text-slate-800 font-mono">
                              {reportTestResult.stats.evaluated}
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 uppercase">Evaluated</div>
                          </div>
                          <div className="bg-white border border-slate-100 rounded-lg p-2.5 text-center">
                            <div className="text-lg font-black text-emerald-600 font-mono">
                              +{reportTestResult.stats.improvements}
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 uppercase">Gains</div>
                          </div>
                          <div className="bg-white border border-slate-100 rounded-lg p-2.5 text-center">
                            <div className="text-lg font-black text-rose-600 font-mono">
                              -{reportTestResult.stats.drops}
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 uppercase">Drops</div>
                          </div>
                        </div>

                        {/* Status detail box */}
                        <div className="bg-white border border-slate-150 rounded-lg p-3 text-xs text-slate-600 space-y-2 leading-relaxed shadow-sm">
                          <p className="flex items-center gap-1.5 font-semibold text-slate-800">
                            <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                            {reportTestResult.sendResult.message}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            The digest evaluated custom thresholds against the historical position metrics for your {reportConfig.allKeywords ? 'entire low-hanging fruit list' : `${reportConfig.trackedKeywords.length} chosen terms`}.
                          </p>
                        </div>

                        {/* View Visual Email layout Button */}
                        <button
                          type="button"
                          onClick={() => setShowReportPreviewModal(true)}
                          className="w-full bg-white hover:bg-slate-100 border border-slate-200 transition text-slate-700 font-black uppercase tracking-wider py-2 px-4 rounded-lg text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer h-[40px]"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                          Preview HTML Email Layout
                        </button>
                      </motion.div>
                    ) : (
                      <div className="h-full py-16 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col justify-center items-center p-6 space-y-3">
                        <Mail className="h-10 w-10 text-slate-300" />
                        <h3 className="text-sm font-semibold text-slate-700">No Compiled Digest Yet</h3>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                          Fill out the configuration preferences on the left and click <strong>"Send Test Report Now"</strong> to compile, dry-run, and visually preview the weekly digest email instantly.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
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
                <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        onClick={() => setAnalyticsTab('queries')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${analyticsTab === 'queries' ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-200 text-slate-700'}`}
                      >
                        Top Google Search Keywords
                      </button>
                      <button
                        onClick={() => setAnalyticsTab('pages')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${analyticsTab === 'pages' ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-200 text-slate-700'}`}
                      >
                        Top Landing Pages
                      </button>
                    </div>
                  </div>

                  {/* Search Input Filter for Metrics */}
                  <div className="relative flex-1 max-w-xs w-full sm:self-end md:self-auto">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={gscSearchQuery}
                      onChange={(e) => setGscSearchQuery(e.target.value)}
                      placeholder={analyticsTab === 'queries' ? "Search search terms..." : "Search landing page URLs..."}
                      className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg pl-9 pr-8 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none transition font-medium"
                    />
                    {gscSearchQuery && (
                      <button
                        onClick={() => setGscSearchQuery('')}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                        title="Clear Search"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <span className="text-3xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Metrics from past 30 days
                  </span>
                </div>

                <div className="overflow-x-auto">
                  {analyticsTab === 'queries' ? (
                    <div className="p-4 bg-slate-50/30">
                      <LocalRankTracker />
                    </div>
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
                        {filteredTopPages.length > 0 ? (
                          filteredTopPages.map((row: any, index: number) => (
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
                              {gscSearchQuery ? `No matching landing pages found for "${gscSearchQuery}"` : "No landing page metrics data available."}
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
        {showCopyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!generatingCopy) setShowCopyModal(false); }}
              className="absolute inset-0 bg-slate-900 cursor-pointer"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative z-10 border border-slate-200 text-slate-800"
            >
              {/* Header */}
              <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400 shrink-0 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider">AI Search Copywriting Generator</h3>
                    <p className="text-4xs text-slate-400 font-medium">Powered by Gemini 3.5 Flash</p>
                  </div>
                </div>
                {!generatingCopy && (
                  <button
                    onClick={() => setShowCopyModal(false)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {generatingCopy ? (
                  <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full border-4 border-slate-100 border-t-amber-500 animate-spin" />
                      <Sparkles className="h-5 w-5 text-amber-500 absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-900">Generating Copywriting Block...</p>
                      <p className="text-3xs text-slate-500 max-w-xs leading-normal">
                        Analyzing Zultys brand specifications, local DFW location factors, and search intent weights to write pristine copy.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-3 flex flex-col gap-1 text-3xs text-amber-800">
                      <div><strong>Target Keyword:</strong> <span className="font-mono bg-amber-100 px-1 py-0.5 rounded select-all font-bold">"{selectedFruit?.keyword}"</span></div>
                      <div><strong>Associated Page:</strong> {selectedFruit?.pageTitle} ({selectedFruit?.matchedRoute})</div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Generated Copywriting (Markdown Supported)</span>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed max-h-[220px] overflow-y-auto font-medium select-all whitespace-pre-wrap">
                        {optimizedCopy}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2 text-3xs text-blue-800 leading-normal">
                      <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-blue-900 mb-0.5">Where to place this copy?</strong>
                        Copy and append this block into the React page component for this route (e.g., in <code>src/pages/</code>). Embedding it as an introductory paragraph or in an accordion section immediately signals to Google's crawler that this URL is highly rich for <strong>"{selectedFruit?.keyword}"</strong>.
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          if (optimizedCopy) {
                            navigator.clipboard.writeText(optimizedCopy);
                            toast.success("Copywriting block copied to clipboard!");
                          }
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 transition text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider py-2.5 shadow-md shadow-amber-500/10 cursor-pointer"
                      >
                        <Check className="h-4 w-4" /> Copy to Clipboard
                      </button>
                      <button
                        onClick={() => setShowCopyModal(false)}
                        className="flex-1 flex items-center justify-center bg-slate-900 hover:bg-slate-800 transition text-white rounded-xl text-xs font-bold py-2.5 shadow-sm cursor-pointer"
                      >
                        Close Panel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
        {showBulkBriefModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!generatingBulkBrief) setShowBulkBriefModal(false); }}
              className="absolute inset-0 bg-slate-900 cursor-pointer"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative z-10 border border-slate-200 text-slate-800"
            >
              {/* Header */}
              <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400 shrink-0 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider">Bulk SEO Content Brief</h3>
                    <p className="text-4xs text-slate-400 font-medium">Powered by Gemini 3.5 Flash</p>
                  </div>
                </div>
                {!generatingBulkBrief && (
                  <button
                    onClick={() => setShowBulkBriefModal(false)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {generatingBulkBrief ? (
                  <div className="py-16 flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full border-4 border-slate-100 border-t-amber-500 animate-spin" />
                      <Sparkles className="h-5 w-5 text-amber-500 absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-900">Compiling Combined Brief...</p>
                      <p className="text-3xs text-slate-500 max-w-sm leading-normal">
                        Analyzing {selectedBulkKeywords.length} selected keywords. Formulating structural heading advice, copywriting snippets, and CTR enhancement goals.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap gap-1.5 text-3xs text-slate-600 max-h-[80px] overflow-y-auto">
                      <span className="font-bold text-slate-800">Selected Keywords ({selectedBulkKeywords.length}):</span>
                      {selectedBulkKeywords.map(kw => (
                        <span key={kw} className="font-mono bg-slate-200 px-1.5 py-0.5 rounded font-semibold text-slate-700">
                          {kw}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Compiled Actionable Recommendations</span>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed max-h-[320px] overflow-y-auto font-medium select-all whitespace-pre-wrap font-mono">
                        {bulkBriefText}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2 text-3xs text-blue-800 leading-normal">
                      <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-blue-900 mb-0.5">Execution Advice</strong>
                        Use these targeted recommendations to update your landing pages. Submit updated pages to Google for indexing using the <strong>Real-time URL Inspector</strong>.
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          if (bulkBriefText) {
                            navigator.clipboard.writeText(bulkBriefText);
                            toast.success("SEO Content Brief copied to clipboard!");
                          }
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 transition text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider py-2.5 shadow-md shadow-amber-500/10 cursor-pointer"
                      >
                        <Check className="h-4 w-4" /> Copy Brief to Clipboard
                      </button>
                      <button
                        onClick={() => setShowBulkBriefModal(false)}
                        className="flex-1 flex items-center justify-center bg-slate-900 hover:bg-slate-800 transition text-white rounded-xl text-xs font-bold py-2.5 shadow-sm cursor-pointer"
                      >
                        Dismiss Brief
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WEEKLY REPORT PREVIEW MODAL */}
      <AnimatePresence>
        {showReportPreviewModal && reportTestResult && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-100 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
            >
              <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="font-bold text-slate-800 text-sm">Visual Email Digest Preview</span>
                </div>
                <button
                  onClick={() => setShowReportPreviewModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-100 flex justify-center">
                <div 
                  className="w-full bg-white rounded-xl shadow-md border border-slate-200/50 overflow-hidden"
                  style={{ maxWidth: '600px' }}
                  dangerouslySetInnerHTML={{ __html: reportTestResult.emailBody }}
                />
              </div>

              <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setShowReportPreviewModal(false)}
                  className="bg-slate-900 hover:bg-slate-800 transition text-white font-black uppercase tracking-wider py-2 px-5 rounded-lg text-xs cursor-pointer shadow"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
