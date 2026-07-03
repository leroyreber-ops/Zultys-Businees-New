import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, Key, Send, RefreshCw, CheckCircle, XCircle, AlertTriangle, 
  ArrowRight, FileText, Plus, List, ShieldAlert, History, Link2, Info 
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

  useEffect(() => {
    loadStatus();
    loadHistory();
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
              onClick={() => { loadStatus(); loadHistory(); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 transition border border-slate-700 text-sm font-medium rounded-lg shadow-sm"
            >
              <RefreshCw className={`h-4 w-4 ${loadingStatus || loadingHistory ? 'animate-spin' : ''}`} />
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
    </div>
  );
}
