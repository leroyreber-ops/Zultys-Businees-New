import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { 
  MapPin, Phone, Globe, Clock, ShieldAlert, CheckCircle, AlertTriangle, AlertCircle, 
  RefreshCw, Send, Lock, UserCheck, Eye, Sparkles, Database, PlusCircle, Wrench, Check, 
  History, ArrowRight, ExternalLink, HelpCircle, HelpCircle as HelpIcon, Building2, Facebook, Linkedin, Twitter, Info
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import CitationDistributionMap from '../components/CitationDistributionMap';
import { CitationsTable } from '../components/CitationsTable';

interface BusinessProfile {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  hours: Record<string, string>;
  category: string;
  serviceArea: string;
  socials: {
    facebook: string;
    linkedin: string;
    twitter: string;
  };
}

interface DirectoryOpportunity {
  key: string;
  name: string;
  domain: string;
  authority: number;
  relevance: number;
  likelihood: number;
  integrationType: 'API' | 'Form Automation' | 'Manual Task';
  listingUrl: string | null;
  audit: {
    status: 'consistent' | 'mismatch' | 'missing' | 'duplicate_conflict';
    foundName: string | null;
    foundAddress: string | null;
    foundPhone: string | null;
    foundWebsite: string | null;
    mismatchFields: string[];
    consistencyScore: number;
  };
}

interface CitationSubmission {
  id: string;
  directoryKey: string;
  directoryName: string;
  status: 'SUBMITTED' | 'PENDING_VERIFICATION' | 'VERIFIED' | 'FAILED' | 'DUPLICATE';
  integrationUsed: string;
  timestamp: string;
  resultCode: string;
  screenshot: string | null;
  verificationMethod: string;
  verificationStatus: string;
  retrySchedule: { nextAttempt: string; attempts: number } | null;
  errorLog: string | null;
}

interface VerificationQueueItem {
  id: string;
  directoryKey: string;
  directoryName: string;
  status: string;
  timestamp: string;
  otpSent: string;
  codeRequired: boolean;
  message: string;
}

interface HistoryLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
}

interface SubmissionAttempt {
  id: string;
  directoryKey: string;
  directoryName: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING_VERIFICATION' | 'PENDING';
  errorCode: string | null;
  timestamp: string;
  isRetry: boolean;
  retryNumber: number;
  message: string;
  scheduledRetryTime: string | null;
}

export default function CitationHealth() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [directories, setDirectories] = useState<DirectoryOpportunity[]>([]);
  const [submissions, setSubmissions] = useState<CitationSubmission[]>([]);
  const [verificationQueue, setVerificationQueue] = useState<VerificationQueueItem[]>([]);
  const [history, setHistory] = useState<HistoryLog[]>([]);
  const [attempts, setAttempts] = useState<SubmissionAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UI states
  const [editingProfile, setEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [verificationCodes, setVerificationCodes] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'all' | 'mismatch' | 'missing' | 'consistent'>('all');
  const [logTab, setLogTab] = useState<'receipts' | 'attempts'>('receipts');
  const [submittingKey, setSubmittingKey] = useState<string | null>(null);
  const [fixingKey, setFixingKey] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [inspectingScreenshot, setInspectingScreenshot] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Master Auto-Fix Automation states
  const [masterAutoFixActive, setMasterAutoFixActive] = useState(false);
  const [masterAutoFixStep, setMasterAutoFixStep] = useState<number>(0);
  const [masterAutoFixTotal, setMasterAutoFixTotal] = useState<number>(0);
  const [masterAutoFixCurrentKey, setMasterAutoFixCurrentKey] = useState<string | null>(null);
  const [masterAutoFixLog, setMasterAutoFixLog] = useState<string[]>([]);
  const [masterAutoFixProgress, setMasterAutoFixProgress] = useState<number>(0);
  const [masterAutoFixFinishedKeys, setMasterAutoFixFinishedKeys] = useState<Record<string, 'success' | 'warning' | 'info' | 'error'>>({});

  useEffect(() => {
    document.title = 'Local Citation Health & NAP Consistency Automation | DFW Zultys Partner';
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Monitor and automate Local Business NAP consistency across Yelp, YellowPages, Google Business Profile, and niche directory networks to boost local ranking authority.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    loadAllCitationData();
  }, []);

  const loadAllCitationData = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch('/api/citations/all');
      const json = await res.json();
      if (json.success && json.data) {
        setProfile(json.data.profile);
        setDirectories(json.data.directories);
        setSubmissions(json.data.submissions);
        setVerificationQueue(json.data.verificationQueue);
        setHistory(json.data.history);
        setAttempts(json.data.attempts || []);
        setEditForm(json.data.profile);
      } else {
        toast.error('Failed to parse citations data from API.');
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Error connecting to Local Citation Service.');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Syncing updated canonical business profile and re-evaluating NAP scores...');
    try {
      const res = await fetch('/api/citations/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      const json = await res.json();
      if (json.success) {
        setProfile(json.data.profile);
        setDirectories(json.data.directories);
        setHistory(json.data.history);
        setEditingProfile(false);
        toast.success('Canonical profile saved! Crawling crawlers and recalculating scores.', { id: toastId });
      } else {
        toast.error(json.error || 'Failed to update profile.', { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: toastId });
    }
  };

  const handleAutoFix = async (dirKey: string) => {
    setFixingKey(dirKey);
    const toastId = toast.loading(`[NAP Auto-Fix] Initializing API/Form payload override for "${dirKey}"...`);
    try {
      const res = await fetch('/api/citations/auto-fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directoryKey: dirKey })
      });
      const json = await res.json();
      if (json.success) {
        setDirectories(json.data.directories);
        setSubmissions(json.data.submissions);
        setHistory(json.data.history);
        setAttempts(json.data.attempts || []);
        toast.success(`[NAP Corrected] Instantly synchronized unified business information to ${dirKey}!`, { id: toastId });
      } else {
        toast.error(json.error || 'Failed to align NAP.', { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: toastId });
    } finally {
      setFixingKey(null);
    }
  };

  const handleTriggerSubmission = async (dirKey: string) => {
    setSubmittingKey(dirKey);
    const toastId = toast.loading(`Initiating Citation Build strategy (API first -> Form Auto) for "${dirKey}"...`);
    try {
      const res = await fetch('/api/citations/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directoryKey: dirKey })
      });
      const json = await res.json();
      if (json.success) {
        setDirectories(json.data.directories);
        setSubmissions(json.data.submissions);
        setVerificationQueue(json.data.verificationQueue);
        setHistory(json.data.history);
        setAttempts(json.data.attempts || []);

        if (json.status === "VERIFICATION_REQUIRED") {
          toast.warning(`[Verification Prompt] ${dirKey} automation paused. Code dispatched to contact email.`, { id: toastId });
        } else if (json.status === "MANUAL_QUEUED") {
          toast.info(`[Security Blocked] CAPTCHA detected on ${dirKey}. Sent ticket to manual queue.`, { id: toastId });
        } else {
          toast.success(`[Directory Published] Master profile successfully pushed and indexed on ${dirKey}!`, { id: toastId });
        }
      } else {
        toast.error(json.error || 'Deduplication or pipeline submission block.', { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: toastId });
    } finally {
      setSubmittingKey(null);
    }
  };

  const handleVerifyOTP = async (vId: string) => {
    const code = verificationCodes[vId];
    if (!code || code.trim().length < 4) {
      toast.error('Please enter a valid verification code.');
      return;
    }
    const toastId = toast.loading('Transmitting verification PIN to directory portal, verifying, and indexing...');
    try {
      const res = await fetch('/api/citations/approve-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationId: vId, otpCode: code })
      });
      const json = await res.json();
      if (json.success) {
        setDirectories(json.data.directories);
        setSubmissions(json.data.submissions);
        setVerificationQueue(json.data.verificationQueue);
        setHistory(json.data.history);
        setAttempts(json.data.attempts || []);
        toast.success('Successfully authenticated! Local citation successfully verified and launched.', { id: toastId });
        // Clear input state
        setVerificationCodes(prev => {
          const next = { ...prev };
          delete next[vId];
          return next;
        });
      } else {
        toast.error(json.error || 'Invalid confirmation code.', { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: toastId });
    }
  };

  const startMasterAutoFix = () => {
    const targets = directories.filter(d => d.audit.status !== 'consistent');
    if (targets.length === 0) {
      toast.info('All local directories are already 100% consistent! No action needed.');
      setMasterAutoFixActive(false);
      return;
    }
    setMasterAutoFixActive(true);
    setMasterAutoFixTotal(targets.length);
    setMasterAutoFixStep(0);
    setMasterAutoFixProgress(0);
    setMasterAutoFixCurrentKey(targets[0].key);
    setMasterAutoFixFinishedKeys({});
    setMasterAutoFixLog([`[SYSTEM] Master Auto-Fix worker started. ${targets.length} discrepancies found.`]);
  };

  const stopMasterAutoFix = () => {
    setMasterAutoFixActive(false);
    setMasterAutoFixCurrentKey(null);
    setMasterAutoFixLog(prev => [...prev, '[SYSTEM] Master Auto-Fix worker paused by user toggle.']);
    toast.warning('Master Auto-Fix background automation paused.');
  };

  useEffect(() => {
    if (!masterAutoFixActive) return;

    const targets = directories.filter(d => d.audit.status !== 'consistent');
    
    if (targets.length === 0 || masterAutoFixStep >= masterAutoFixTotal) {
      setMasterAutoFixActive(false);
      setMasterAutoFixCurrentKey(null);
      setMasterAutoFixProgress(100);
      setMasterAutoFixLog(prev => [...prev, '[SYSTEM] Master Auto-Fix pipeline completed successfully! All directories synchronized.']);
      toast.success('Master Auto-Fix automation completed! Local SEO presence is fully healthy.');
      return;
    }

    const currentTarget = targets[0];
    setMasterAutoFixCurrentKey(currentTarget.key);
    
    const timer = setTimeout(async () => {
      setMasterAutoFixLog(prev => [
        ...prev, 
        `[${currentTarget.name.toUpperCase()}] Initiating sync via ${currentTarget.integrationType}...`
      ]);

      try {
        let res;
        if (currentTarget.audit.status === 'missing') {
          res = await fetch('/api/citations/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ directoryKey: currentTarget.key })
          });
        } else {
          res = await fetch('/api/citations/auto-fix', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ directoryKey: currentTarget.key })
          });
        }

        const json = await res.json();
        if (json.success) {
          setProfile(json.data.profile);
          setDirectories(json.data.directories);
          setSubmissions(json.data.submissions);
          setVerificationQueue(json.data.verificationQueue);
          setHistory(json.data.history);
          setAttempts(json.data.attempts || []);

          let statusType: 'success' | 'warning' | 'info' | 'error' = 'success';
          let msg = `[${currentTarget.name.toUpperCase()}] Successfully synchronized!`;

          if (json.status === "VERIFICATION_REQUIRED") {
            statusType = 'warning';
            msg = `[${currentTarget.name.toUpperCase()}] Paused pending human action: Email PIN required.`;
          } else if (json.status === "MANUAL_QUEUED") {
            statusType = 'info';
            msg = `[${currentTarget.name.toUpperCase()}] CAPTCHA blocked. Automated ticket enqueued for manual agent.`;
          }

          setMasterAutoFixLog(prev => [...prev, msg]);
          setMasterAutoFixFinishedKeys(prev => ({ ...prev, [currentTarget.key]: statusType }));
        } else {
          setMasterAutoFixLog(prev => [...prev, `[${currentTarget.name.toUpperCase()}] Error: ${json.error || 'Pipeline execution failed.'}`]);
          setMasterAutoFixFinishedKeys(prev => ({ ...prev, [currentTarget.key]: 'error' }));
        }
      } catch (err: any) {
        setMasterAutoFixLog(prev => [...prev, `[${currentTarget.name.toUpperCase()}] Network error: ${err.message}`]);
        setMasterAutoFixFinishedKeys(prev => ({ ...prev, [currentTarget.key]: 'error' }));
      }

      const nextStep = masterAutoFixStep + 1;
      setMasterAutoFixStep(nextStep);
      setMasterAutoFixProgress(Math.round((nextStep / masterAutoFixTotal) * 100));

    }, 2000);

    return () => clearTimeout(timer);

  }, [masterAutoFixActive, masterAutoFixStep, directories, masterAutoFixTotal]);

  const handleResetData = async () => {
    setResetting(true);
    // Reset Master Auto-Fix worker state
    setMasterAutoFixActive(false);
    setMasterAutoFixStep(0);
    setMasterAutoFixTotal(0);
    setMasterAutoFixCurrentKey(null);
    setMasterAutoFixLog([]);
    setMasterAutoFixProgress(0);
    setMasterAutoFixFinishedKeys({});

    const toastId = toast.loading('Re-building original local citation audit data and seeding discrepancies...');
    try {
      const res = await fetch('/api/citations/reset', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        setProfile(json.data.profile);
        setDirectories(json.data.directories);
        setSubmissions(json.data.submissions);
        setVerificationQueue(json.data.verificationQueue);
        setHistory(json.data.history);
        setAttempts(json.data.attempts || []);
        setEditForm(json.data.profile);
        toast.success('Local citations and audit database successfully re-seeded!', { id: toastId });
      }
    } catch (err: any) {
      toast.error('Failed to reset citation database.', { id: toastId });
    } finally {
      setResetting(false);
    }
  };

  const handleSelectDirectory = (dirKey: string) => {
    const dir = directories.find(d => d.key === dirKey);
    if (!dir) return;
    
    if (activeTab === 'mismatch' && dir.audit.status !== 'mismatch' && dir.audit.status !== 'duplicate_conflict') {
      setActiveTab('all');
    } else if (activeTab === 'missing' && dir.audit.status !== 'missing') {
      setActiveTab('all');
    } else if (activeTab === 'consistent' && dir.audit.status !== 'consistent') {
      setActiveTab('all');
    }

    setTimeout(() => {
      const element = document.getElementById(`directory-card-${dirKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-blue-500/50', 'scale-[1.01]', 'duration-300');
        setTimeout(() => {
          element.classList.remove('ring-4', 'ring-blue-500/50', 'scale-[1.01]');
        }, 1500);
      }
    }, 150);
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col justify-center items-center py-24 space-y-4">
          <RefreshCw className="h-10 w-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 text-sm font-semibold">Analyzing local listing directories and verifying NAP compatibility...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate consistency stats
  const totalChecked = directories.filter(d => d.audit.status !== "missing").length;
  const consistentCount = directories.filter(d => d.audit.status === "consistent").length;
  const mismatchCount = directories.filter(d => d.audit.status === "mismatch").length;
  const missingCount = directories.filter(d => d.audit.status === "missing").length;
  const duplicateConflictCount = directories.filter(d => d.audit.status === "duplicate_conflict").length;

  const averageConsistencyScore = Math.round(
    directories.reduce((acc, curr) => acc + (curr.audit.consistencyScore || 0), 0) / directories.length
  );

  const filteredDirectories = directories.filter(d => {
    if (activeTab === 'all') return true;
    if (activeTab === 'mismatch') return d.audit.status === 'mismatch' || d.audit.status === 'duplicate_conflict';
    if (activeTab === 'missing') return d.audit.status === 'missing';
    if (activeTab === 'consistent') return d.audit.status === 'consistent';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Toaster position="top-right" richColors />
      <Header />

      {/* Main Container */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 py-10 space-y-10">
        
        {/* Breadcrumb / Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
              <Database className="h-4 w-4" /> Citation Management System
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Local NAP Directory Consistency Dashboard
            </h1>
            <p className="text-slate-500 text-xs">
              Align, automate, and verify Name, Address, and Phone (NAP) records across leading local local search directories to boost search authority and ranking.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetData}
              disabled={resetting}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 transition text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-300 cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${resetting ? 'animate-spin' : ''}`} />
              Reset Demo Seed
            </button>
            <a
              href="/seo-dashboard"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm cursor-pointer flex items-center gap-1 active:scale-95"
            >
              Back to SEO Dashboard <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Master Auto-Fix Automation Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider rounded border border-blue-100 flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${masterAutoFixActive ? 'bg-emerald-400' : 'bg-slate-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${masterAutoFixActive ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
                  </span>
                  System Automation Worker
                </span>
                {masterAutoFixActive && (
                  <span className="text-[10px] text-emerald-600 font-bold animate-pulse font-mono">
                    EXECUTING DISCREPANCY HEAL PIPELINE...
                  </span>
                )}
              </div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                Master NAP Auto-Fix Automation Controller
              </h2>
              <p className="text-slate-500 text-xs">
                Activate the background agent to automatically cycle through all directories with NAP mismatches or missing citations. Pushes unified profiles and resolves errors in real time.
              </p>
            </div>

            {/* Toggle Switch Container */}
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/60 rounded-xl p-4 self-start lg:self-auto">
              <div className="space-y-0.5 text-right hidden sm:block">
                <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Automation Status</span>
                <span className={`text-xs font-extrabold ${masterAutoFixActive ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {masterAutoFixActive ? 'Background Worker Active' : 'Idle / Standby Mode'}
                </span>
              </div>
              
              {/* Actual Switch */}
              <button
                onClick={() => masterAutoFixActive ? stopMasterAutoFix() : startMasterAutoFix()}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none ${
                  masterAutoFixActive ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
                aria-label="Toggle Master Auto-Fix Automation"
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    masterAutoFixActive ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Progress Indicator and Live Status Ticker */}
          {(masterAutoFixActive || masterAutoFixProgress > 0) && (
            <div className="border-t border-slate-100 pt-5 space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-xs font-bold text-slate-700">
                    {masterAutoFixProgress === 100 
                      ? 'Automation Completed' 
                      : `Syncing Local Directory Discrepancies: Step ${masterAutoFixStep} of ${masterAutoFixTotal}`}
                  </span>
                </div>
                <div className="text-xs font-mono font-black text-slate-800">
                  {masterAutoFixProgress}% Complete
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/40">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500 rounded-full"
                  style={{ width: `${masterAutoFixProgress}%` }}
                />
              </div>

              {/* Status pills for each directory */}
              <div className="flex flex-wrap gap-2 pt-2">
                {directories.map(d => {
                  const wasTarget = d.audit.status !== 'consistent';
                  const status = masterAutoFixFinishedKeys[d.key];
                  
                  if (!wasTarget && !status) return null; // Only show directories that had discrepancy or are processed
                  
                  let bgClass = 'bg-slate-100 text-slate-500 border-slate-200';
                  let icon = <Clock className="h-3 w-3" />;
                  
                  if (status === 'success' || d.audit.status === 'consistent') {
                    bgClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                    icon = <Check className="h-3 w-3" />;
                  } else if (status === 'warning') {
                    bgClass = 'bg-amber-50 text-amber-700 border-amber-200';
                    icon = <ShieldAlert className="h-3 w-3 animate-pulse" />;
                  } else if (status === 'info') {
                    bgClass = 'bg-blue-50 text-blue-700 border-blue-200';
                    icon = <Info className="h-3 w-3" />;
                  } else if (status === 'error') {
                    bgClass = 'bg-rose-50 text-rose-700 border-rose-200';
                    icon = <AlertCircle className="h-3 w-3" />;
                  } else if (masterAutoFixCurrentKey === d.key) {
                    bgClass = 'bg-blue-50 text-blue-700 border-blue-300 animate-pulse';
                    icon = <RefreshCw className="h-3 w-3 animate-spin" />;
                  }

                  return (
                    <div key={d.key} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${bgClass}`}>
                      {icon}
                      <span>{d.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Real-time Ticker Logging lines */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-[10px] text-slate-300 space-y-1.5 max-h-[150px] overflow-y-auto">
                <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-1.5 mb-1.5">
                  <span className="flex items-center gap-1 font-bold text-blue-400">
                    <Database className="h-3.5 w-3.5" /> local-worker-stream.stdout
                  </span>
                  <span className="text-[9px]">REAL-TIME LOG</span>
                </div>
                {masterAutoFixLog.slice(-5).map((logLine, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                    <span className={
                      logLine.includes('Error') || logLine.includes('failed') ? 'text-rose-400' :
                      logLine.includes('Successfully') || logLine.includes('completed') ? 'text-emerald-400' :
                      logLine.includes('Paused') || logLine.includes('PIN') ? 'text-amber-400' :
                      'text-slate-300'
                    }>{logLine}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Citation Distribution Map Widget */}
        {!loading && directories.length > 0 && (
          <CitationDistributionMap 
            directories={directories}
            onSelectDirectory={handleSelectDirectory}
          />
        )}

        {/* 1. System Overview Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* Circular Consistency Score Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Overall Consistency</span>
              <span className="text-3xl font-black text-slate-900 font-mono">{averageConsistencyScore}%</span>
            </div>
            <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  averageConsistencyScore >= 90 ? 'bg-emerald-500' : averageConsistencyScore >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${averageConsistencyScore}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Target: <strong className="text-slate-700">100% NAP alignment</strong> to maximize local algorithm confidence score.
            </p>
          </div>

          {/* Verified Listings Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Consistent Profiles</span>
              <span className="text-3xl font-black text-slate-900 font-mono">{consistentCount} <span className="text-slate-400 text-sm font-normal">/ {directories.length}</span></span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Fully Synced
              </span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-500">
              <Check className="h-6 w-6" />
            </div>
          </div>

          {/* Mismatch Alert Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">NAP Mismatches</span>
              <span className="text-3xl font-black text-rose-600 font-mono">{mismatchCount}</span>
              <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Action Required
              </span>
            </div>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-rose-500">
              <Wrench className="h-6 w-6 animate-pulse" />
            </div>
          </div>

          {/* Duplicate Conflict Listings Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Conflicts Found</span>
              <span className="text-3xl font-black text-amber-600 font-mono">{duplicateConflictCount}</span>
              <span className="text-[10px] text-amber-500 font-semibold flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" /> Duplicate Risk
              </span>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-600">
              <ShieldAlert className="h-6 w-6" />
            </div>
          </div>

          {/* Pending Listings Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Pending indexing</span>
              <span className="text-3xl font-black text-blue-600 font-mono">
                {submissions.filter(s => s.status === 'SUBMITTED' || s.status === 'PENDING_VERIFICATION').length + verificationQueue.length}
              </span>
              <span className="text-[10px] text-blue-500 font-semibold flex items-center gap-1">
                <Clock className="h-3 w-3" /> Queued / Paused
              </span>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-blue-500">
              <History className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* 2. OTP Code Alert Notice Bar */}
        {verificationQueue.length > 0 && (
          <div className="bg-amber-950/10 border border-amber-800/25 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600 mt-1 md:mt-0 flex-shrink-0 border border-amber-500/10">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                  Human Action Required (Submission Paused)
                </h4>
                <p className="text-xs text-amber-800 font-medium max-w-2xl leading-relaxed">
                  The automated form automation pipeline for <strong className="font-bold">{verificationQueue[0].directoryName}</strong> has completed the payload delivery but is currently paused. Foursquare requires a 6-digit confirmation PIN.
                </p>
                <span className="text-4xs uppercase font-mono font-bold tracking-wider text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10">
                  {verificationQueue[0].otpSent}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                maxLength={6}
                placeholder="6-digit PIN"
                value={verificationCodes[verificationQueue[0].id] || ''}
                onChange={(e) => setVerificationCodes({ ...verificationCodes, [verificationQueue[0].id]: e.target.value })}
                className="px-3 py-2 bg-white border border-amber-300 rounded-lg text-xs font-mono font-bold text-center w-28 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={() => handleVerifyOTP(verificationQueue[0].id)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-95 transition"
              >
                Submit &amp; Resume
              </button>
            </div>
          </div>
        )}

        {/* 3. Columns: Master Profile vs. Directories Source Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: MASTER PROFILE */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Canonical Master Profile</h2>
                </div>
                {!editingProfile ? (
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-bold uppercase tracking-wider border border-blue-200 hover:bg-blue-50 px-2.5 py-1 rounded-md transition cursor-pointer"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={() => { setEditingProfile(false); setEditForm(profile); }}
                    className="text-xs text-slate-500 hover:text-slate-700 font-bold uppercase tracking-wider border border-slate-200 px-2.5 py-1 rounded-md transition cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {!editingProfile ? (
                <div className="space-y-4 text-xs">
                  <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3.5 space-y-1">
                    <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Business Name</span>
                    <p className="font-bold text-slate-800 text-sm leading-tight">{profile.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3.5 space-y-1">
                      <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Phone Number</span>
                      <p className="font-bold text-slate-800 font-mono">{profile.phone}</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3.5 space-y-1">
                      <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Website</span>
                      <p className="font-bold text-blue-600 font-mono truncate">{profile.website}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3.5 space-y-1">
                    <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Full Address</span>
                    <p className="font-bold text-slate-700 leading-relaxed flex items-start gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span>{profile.street}, {profile.city}, {profile.state} {profile.zip}</span>
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3.5 space-y-2">
                    <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Operational Hours</span>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px] text-slate-600">
                      {Object.entries(profile.hours).map(([day, val]) => (
                        <div key={day} className="flex justify-between border-b border-slate-100/60 pb-0.5">
                          <span className="font-semibold text-slate-500">{day.substring(0, 3)}:</span>
                          <span className="text-slate-700">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px]">
                    <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3 space-y-0.5">
                      <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Category</span>
                      <p className="font-semibold text-slate-700 truncate">{profile.category}</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3 space-y-0.5">
                      <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Social Profiles</span>
                      <div className="flex gap-2 pt-1 text-slate-500">
                        {profile.socials.facebook && <Facebook className="h-3.5 w-3.5 hover:text-blue-600" />}
                        {profile.socials.linkedin && <Linkedin className="h-3.5 w-3.5 hover:text-blue-700" />}
                        {profile.socials.twitter && <Twitter className="h-3.5 w-3.5 hover:text-sky-500" />}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3.5 space-y-1">
                    <span className="text-4xs uppercase tracking-widest text-slate-400 font-black block">Service Area</span>
                    <p className="font-semibold text-slate-600 leading-relaxed text-[10px]">{profile.serviceArea}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Business Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Street Address</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                      value={editForm.street}
                      onChange={(e) => setEditForm({ ...editForm, street: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">City</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                        value={editForm.city}
                        onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">State</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                        value={editForm.state}
                        onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Zip Code</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                        value={editForm.zip}
                        onChange={(e) => setEditForm({ ...editForm, zip: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Phone</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Website</label>
                      <input
                        type="url"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                        value={editForm.website}
                        onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Category</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Service Area Description</label>
                    <textarea
                      rows={2}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 text-[10px]"
                      value={editForm.serviceArea}
                      onChange={(e) => setEditForm({ ...editForm, serviceArea: e.target.value })}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-bold uppercase tracking-wider rounded-lg shadow-sm cursor-pointer"
                  >
                    Save &amp; Re-audit Listings
                  </button>
                </form>
              )}
            </div>

            {/* Quick Informative Info */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
              <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-1">
                <Info className="h-4 w-4 text-blue-400" /> NAP Ranking Blueprint
              </h4>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Consistency is Google's trust standard. A single letter difference (like "Suite A" vs "Ste 100") or a different phone number confuses local mapping algorithms, reducing search position by as much as 42%.
              </p>
              <div className="border-t border-slate-800 pt-3 space-y-2 text-[9px] text-slate-300">
                <div className="flex justify-between">
                  <span>API Priority sync:</span>
                  <span className="text-blue-400 font-mono font-bold">1st Pipeline</span>
                </div>
                <div className="flex justify-between">
                  <span>Form automation sync:</span>
                  <span className="text-emerald-400 font-mono font-bold">2nd Pipeline</span>
                </div>
                <div className="flex justify-between">
                  <span>Manual review queue:</span>
                  <span className="text-amber-400 font-mono font-bold">3rd (Fallback)</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DIRECTORY SOURCE ENGINE & LOCAL AUDITS */}
          <div className="lg:col-span-2 space-y-6">
            {/* View Mode Toolbar */}
            <div className="flex items-center justify-between bg-slate-100 border border-slate-200 p-1.5 rounded-xl">
              <span className="text-[10px] font-black uppercase text-slate-500 pl-2 tracking-wider">Citations Display Engine</span>
              <div className="flex gap-1 bg-white border border-slate-200/50 p-0.5 rounded-lg shadow-3xs">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md transition cursor-pointer flex items-center gap-1 ${
                    viewMode === 'table' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Database Table View
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md transition cursor-pointer flex items-center gap-1 ${
                    viewMode === 'cards' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Interactive Cards View
                </button>
              </div>
            </div>

            {viewMode === 'table' ? (
              <CitationsTable 
                directories={directories}
                onAutoFix={handleAutoFix}
                onTriggerSubmission={handleTriggerSubmission}
                fixingKey={fixingKey}
                submittingKey={submittingKey}
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-5">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-blue-500" /> Directory Source Engine &amp; Live Audits
                    </h2>
                    <p className="text-[10px] text-slate-500">
                      Opportunities ordered by Domain Authority, Relevance, and Acceptability.
                    </p>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                    {(['all', 'mismatch', 'missing', 'consistent'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md transition cursor-pointer ${
                          activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {tab === 'mismatch' ? 'Issues' : tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Opportunities List */}
                <div className="space-y-4">
                  {filteredDirectories.map((dir) => {
                    const hasMismatch = dir.audit.status === 'mismatch';
                    const isMissing = dir.audit.status === 'missing';
                    const isConflict = dir.audit.status === 'duplicate_conflict';
                    const isConsistent = dir.audit.status === 'consistent';

                    return (
                      <div 
                        key={dir.key}
                        id={`directory-card-${dir.key}`}
                        className={`border rounded-xl p-4 transition-all duration-300 ${
                          hasMismatch ? 'bg-rose-50/20 border-rose-200' :
                          isConflict ? 'bg-amber-50/20 border-amber-200' :
                          isMissing ? 'bg-slate-50/50 border-slate-200' :
                          'bg-white border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        {/* Directory Header Row */}
                        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-slate-800 text-sm">{dir.name}</h3>
                              <span className="text-[10px] text-slate-500 font-mono">({dir.domain})</span>
                              <span className="text-4xs uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded border bg-slate-100 border-slate-200 text-slate-500">
                                {dir.integrationType}
                              </span>
                            </div>
                            
                            {/* Metrics Row */}
                            <div className="flex items-center gap-4 text-[10px] text-slate-400 font-semibold">
                              <span className="flex items-center gap-1">Domain Authority: <strong className="text-slate-600 font-mono">{dir.authority}</strong></span>
                              <span className="flex items-center gap-1">Relevance: <strong className="text-slate-600 font-mono">{dir.relevance}%</strong></span>
                              <span className="flex items-center gap-1">Likelihood: <strong className="text-slate-600 font-mono">{dir.likelihood}%</strong></span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-1.5">
                            {isConsistent && (
                              <span className="bg-emerald-100 border border-emerald-200 text-emerald-700 text-4xs font-black uppercase tracking-wider px-2 py-1 rounded-md flex items-center gap-1">
                                <CheckCircle className="h-3.5 w-3.5" /> Fully Consistent
                              </span>
                            )}
                            {hasMismatch && (
                              <span className="bg-rose-100 border border-rose-200 text-rose-700 text-4xs font-black uppercase tracking-wider px-2 py-1 rounded-md flex items-center gap-1">
                                <AlertTriangle className="h-3.5 w-3.5" /> NAP Discrepancy
                              </span>
                            )}
                            {isConflict && (
                              <span className="bg-amber-100 border border-amber-200 text-amber-700 text-4xs font-black uppercase tracking-wider px-2 py-1 rounded-md flex items-center gap-1">
                                <ShieldAlert className="h-3.5 w-3.5" /> Duplicate Conflict
                              </span>
                            )}
                            {isMissing && (
                              <span className="bg-slate-200 border border-slate-300 text-slate-600 text-4xs font-black uppercase tracking-wider px-2 py-1 rounded-md flex items-center gap-1">
                                <PlusCircle className="h-3.5 w-3.5" /> Not Found
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Directory Audit Comparison */}
                        {!isMissing && (
                          <div className="py-3 text-[11px] grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-600 border-b border-slate-100">
                            <div className="space-y-1">
                              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Listing Data found online</span>
                              <div className="bg-slate-100/60 p-2.5 rounded-lg space-y-1 border border-slate-200/40">
                                <p className={`truncate ${dir.audit.mismatchFields.includes('name') ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                                  <strong className="font-semibold text-slate-500">Name:</strong> {dir.audit.foundName}
                                </p>
                                <p className={`truncate ${dir.audit.mismatchFields.includes('street') ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                                  <strong className="font-semibold text-slate-500">Add:</strong> {dir.audit.foundAddress}
                                </p>
                                <p className={`truncate ${dir.audit.mismatchFields.includes('phone') ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                                  <strong className="font-semibold text-slate-500">Phone:</strong> {dir.audit.foundPhone}
                                </p>
                                <p className={`truncate ${dir.audit.mismatchFields.includes('website') ? 'line-through text-slate-400' : 'text-slate-700 font-mono text-[10px]'}`}>
                                  <strong className="font-semibold text-slate-500">Web:</strong> {dir.audit.foundWebsite}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-1 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Conflict / Issue Analysis</span>
                                <div className="p-1 space-y-1 text-slate-500 mt-1">
                                  {isConsistent ? (
                                    <p className="text-emerald-600 font-semibold flex items-center gap-1 text-[10px]">
                                      <Check className="h-3.5 w-3.5" /> Ready for Local Maps indexing.
                                    </p>
                                  ) : isConflict ? (
                                    <p className="text-amber-700 text-[10px] leading-tight flex items-start gap-1">
                                      <ShieldAlert className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                                      <span>Another office registered with this phone. Suppress to prevent indexing collision.</span>
                                    </p>
                                  ) : (
                                    <div className="space-y-1 text-[10px]">
                                      <p className="text-rose-700 font-bold">Mismatches: {dir.audit.mismatchFields.join(', ')}</p>
                                      <p className="leading-tight text-slate-500">We detected conflicting contact elements that will decrease Google's Local SEO confidence score.</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {dir.listingUrl && (
                                <a 
                                  href={dir.listingUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="text-slate-500 hover:text-slate-800 text-[10px] font-semibold flex items-center gap-1 mt-2 self-start"
                                >
                                  <ExternalLink className="h-3 w-3" /> View original listing
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Interactive Submission Controls */}
                        <div className="pt-3 flex items-center justify-between gap-4 flex-wrap">
                          <div className="text-[10px] text-slate-400 font-mono">
                            {!isMissing && (
                              <span>Listing Consistency Match Rate: <strong className="text-slate-700">{dir.audit.consistencyScore}%</strong></span>
                            )}
                            {isMissing && (
                              <span>New local SEO citation build opportunity.</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {(hasMismatch || isConflict) && (
                              <button
                                onClick={() => handleAutoFix(dir.key)}
                                disabled={fixingKey === dir.key}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition flex items-center gap-1 disabled:opacity-50"
                              >
                                <Wrench className={`h-3 w-3 ${fixingKey === dir.key ? 'animate-spin' : ''}`} />
                                {fixingKey === dir.key ? 'Aligning...' : 'Auto-Fix NAP Mismatch'}
                              </button>
                            )}
                            {isMissing && (
                              <button
                                onClick={() => handleTriggerSubmission(dir.key)}
                                disabled={submittingKey === dir.key}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition flex items-center gap-1 disabled:opacity-50"
                              >
                                <PlusCircle className="h-3 w-3" />
                                {submittingKey === dir.key ? 'Submitting...' : 'Pave & Submit Citation'}
                              </button>
                            )}
                            {isConsistent && (
                              <button
                                disabled
                                className="px-3 py-1.5 bg-slate-100 text-slate-400 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                              >
                                <Check className="h-3 w-3 text-emerald-500" /> Synced
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            )}
          </div>

        </div>

        {/* 4. Active Submissions Audit Log with Screenshots / Retries */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <History className="h-5 w-5 text-indigo-500" /> Automated Pipeline Submissions &amp; Status Logs
            </h2>
            <p className="text-xs text-slate-500">
              Active tracking of every API transaction, automated form submission, screenshots, and custom retry schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Submissions List with Images / Action History Attempts */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {logTab === 'receipts' ? `Submission Receipts (${submissions.length})` : `Automated Pipeline Attempts (${attempts.length})`}
                </h3>

                <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
                  <button
                    onClick={() => setLogTab('receipts')}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition cursor-pointer ${
                      logTab === 'receipts' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Receipts
                  </button>
                  <button
                    onClick={() => setLogTab('attempts')}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition cursor-pointer ${
                      logTab === 'attempts' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Action History
                  </button>
                </div>
              </div>
              
              {logTab === 'receipts' ? (
                <div className="space-y-3">
                  {submissions.map((sub) => {
                    const isVerified = sub.status === 'VERIFIED';
                    const isPending = sub.status === 'SUBMITTED' || sub.status === 'PENDING_VERIFICATION';
                    const isFailed = sub.status === 'FAILED';

                    return (
                      <div key={sub.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex items-start gap-3 flex-grow max-w-xl">
                          {/* Simulated screenshot thumbnail if verified/submitted */}
                          {sub.screenshot ? (
                            <div 
                              onClick={() => setInspectingScreenshot(sub.screenshot)}
                              className="w-16 h-12 bg-slate-200 rounded-lg overflow-hidden border border-slate-300 flex-shrink-0 cursor-zoom-in group relative"
                            >
                              <img src={sub.screenshot} alt="Receipt Screenshot" className="w-full h-full object-cover group-hover:opacity-85 transition" />
                              <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                <Eye className="h-3 w-3 text-white" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-16 h-12 bg-slate-100 rounded-lg border border-slate-200 flex-shrink-0 flex items-center justify-center text-slate-400 text-4xs uppercase font-mono font-bold">
                              No Image
                            </div>
                          )}

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-800 text-xs">{sub.directoryName}</h4>
                              <span className="text-[10px] text-slate-400 font-mono">{new Date(sub.timestamp).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500 font-semibold">
                              <span>Channel: <strong className="text-slate-600 font-mono">{sub.integrationUsed}</strong></span>
                              <span>Code: <strong className="text-blue-500 font-mono">{sub.resultCode}</strong></span>
                              <span>Verify Hook: <strong className="text-slate-600">{sub.verificationMethod}</strong></span>
                            </div>

                            {sub.errorLog && (
                              <p className="text-[9px] text-amber-700 bg-amber-50 border border-amber-100 rounded p-1.5 mt-1 font-medium leading-relaxed">
                                {sub.errorLog}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 text-right">
                          {isVerified ? (
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-4xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-0.5">
                              <Check className="h-3 w-3" /> Live &amp; Indexed
                            </span>
                          ) : isPending ? (
                            <span className="bg-blue-100 text-blue-800 border border-blue-200 text-4xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-0.5">
                              <Clock className="h-3 w-3 animate-pulse" /> Pending Sync
                            </span>
                          ) : (
                            <span className="bg-rose-100 text-rose-800 border border-rose-200 text-4xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-0.5">
                              <AlertCircle className="h-3 w-3" /> Failed
                            </span>
                          )}

                          {sub.retrySchedule && (
                            <div className="text-[9px] text-slate-400 font-mono">
                              Retry: <strong className="text-slate-600">{new Date(sub.retrySchedule.nextAttempt).toLocaleTimeString()}</strong> (Try #{sub.retrySchedule.attempts})
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {attempts.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                      No automated attempts logged yet. Submit a listing to trigger logs.
                    </div>
                  ) : (
                    attempts.map((att) => {
                      const isSuccess = att.status === 'SUCCESS';
                      const isPending = att.status === 'PENDING_VERIFICATION' || att.status === 'PENDING';
                      const isFailed = att.status === 'FAILED';

                      return (
                        <div key={att.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-800 text-xs">{att.directoryName}</h4>
                              {att.isRetry && (
                                <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[9px] font-black uppercase px-2 py-0.5 rounded">
                                  Retry #{att.retryNumber}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-400 font-mono">
                                {new Date(att.timestamp).toLocaleString()}
                              </span>
                              {isSuccess ? (
                                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-4xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                  <CheckCircle className="h-3 w-3" /> Success
                                </span>
                              ) : isPending ? (
                                <span className="bg-amber-100 text-amber-800 border border-amber-200 text-4xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                  <Clock className="h-3 w-3 animate-pulse" /> Pending
                                </span>
                              ) : (
                                <span className="bg-rose-100 text-rose-800 border border-rose-200 text-4xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                  <AlertCircle className="h-3 w-3" /> Failed
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            {att.message}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-500 pt-1 font-semibold">
                            <div className="flex items-center gap-1">
                              <span>API Response Code:</span>
                              {att.errorCode ? (
                                <code className={`px-1.5 py-0.5 rounded font-mono text-[9px] font-bold ${
                                  isFailed ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                }`}>
                                  {att.errorCode}
                                </code>
                              ) : (
                                <span className="text-slate-400 italic">None (Direct Sync)</span>
                              )}
                            </div>

                            {att.scheduledRetryTime && (
                              <div className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-1 rounded text-[9px] font-mono flex items-center gap-1">
                                <RefreshCw className="h-3 w-3 animate-spin text-indigo-500" />
                                <span>Retry Scheduled: <strong>{new Date(att.scheduledRetryTime).toLocaleString()}</strong></span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Live Pipeline Audit Trails */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Live System History Audit Trails</h3>
              
              <div className="bg-slate-900 text-white rounded-xl p-4 font-mono text-[10px] space-y-4 max-h-[350px] overflow-y-auto border border-slate-800">
                <div className="flex items-center gap-1 text-[10px] font-bold text-blue-400 border-b border-slate-800 pb-2">
                  <Database className="h-3.5 w-3.5" /> pipeline-execution.log
                </div>
                
                <div className="space-y-3.5 relative pl-4 border-l border-slate-800">
                  {history.map((log) => (
                    <div key={log.id} className="space-y-0.5 relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[20.5px] top-1 h-2 w-2 rounded-full bg-blue-500 border border-slate-950" />
                      
                      <div className="flex justify-between text-[9px] text-slate-500 font-semibold">
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                        <span className="text-emerald-400 uppercase tracking-widest">{log.action}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[9px]">
                        {log.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Screenshot Viewer Modal Overlay */}
      {inspectingScreenshot && (
        <div 
          className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs cursor-zoom-out"
          onClick={() => setInspectingScreenshot(null)}
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-2 overflow-hidden shadow-2xl relative">
            <img src={inspectingScreenshot} alt="Submission Receipt Big" className="w-full h-auto rounded-lg" />
            <div className="p-3 text-center text-xs text-slate-400 font-semibold">
              Live Submission Proof Screenshot Receipt
            </div>
          </div>
        </div>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  );
}
