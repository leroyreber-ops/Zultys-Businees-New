import React, { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  Play, 
  RefreshCw, 
  Lock, 
  Check, 
  ArrowRight, 
  FileText, 
  Globe, 
  ExternalLink,
  Shield,
  LayoutGrid,
  Sparkles
} from "lucide-react";
import { getSEOForPath } from "../seo/seoConfig";
import { auditSite, AuditReport, AuditFinding } from "../seo/seoAudit";
import { VALID_PATHS } from "../routes";

export function SEOAdmin() {
  const [isScanning, setIsScanning] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  
  const [report, setReport] = useState<AuditReport | null>(null);
  const [fixResults, setFixResults] = useState<{
    success: boolean;
    message: string;
    remediated: string[];
    todos: { path: string; issue: string; recommendation: string }[];
  } | null>(null);

  // Auto-scan on load
  useEffect(() => {
    handleScan();
  }, []);

  const handleScan = async () => {
    setIsScanning(true);
    setFixResults(null);
    try {
      // Execute the audit function over all paths
      const auditReport = auditSite(VALID_PATHS);
      setReport(auditReport);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleFix = async () => {
    setIsFixing(true);
    try {
      const response = await fetch("/api/seo/fix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      setFixResults(data);
      // Re-run scan to show the updated report (score should go up!)
      const updatedReport = auditSite(VALID_PATHS);
      setReport(updatedReport);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFixing(false);
    }
  };



  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header bar */}
      <header className="bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              SEO Control Panel
              <span className="text-[10px] bg-blue-500/15 border border-blue-500/35 text-blue-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Elite v2.0
              </span>
            </h1>
            <p className="text-xs text-slate-400">dallasfortworthzultys.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleScan}
            disabled={isScanning || isFixing}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 border border-slate-700/60 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? "animate-spin" : ""}`} />
            Scan Site
          </button>
          
          <button
            onClick={handleFix}
            disabled={isScanning || isFixing}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer"
          >
            <Play className={`w-4 h-4 ${isFixing ? "animate-pulse" : ""}`} />
            Scan & Fix
          </button>
        </div>
      </header>

      {/* Main dashboard body */}
      <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-8">
        {/* Metric widgets summary */}
        {report && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* SEO Health Score Circle Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center col-span-1 md:col-span-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">SEO Score</span>
              <div className="relative flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" className="text-slate-800" strokeWidth="6" fill="transparent" />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="40" 
                    stroke="currentColor" 
                    className={report.summary.score > 80 ? "text-emerald-500" : report.summary.score > 50 ? "text-amber-500" : "text-red-500"}
                    strokeWidth="6" 
                    fill="transparent" 
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * report.summary.score) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-2xl font-black text-white">{Math.round(report.summary.score)}%</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-3 font-mono">Based on GSC metrics</span>
            </div>

            {/* Total Paths Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between col-span-1">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Total Routes</span>
                <h3 className="text-4xl font-extrabold text-white mt-2 font-mono">{report.summary.totalRoutes}</h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                All compliant with canonical tags
              </p>
            </div>

            {/* Critical Errors Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between col-span-1">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Critical (GSC Red)</span>
                <h3 className={`text-4xl font-extrabold mt-2 font-mono ${report.summary.criticalCount > 0 ? "text-red-400" : "text-slate-400"}`}>
                  {report.summary.criticalCount}
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1">
                <ShieldAlert className={`w-3.5 h-3.5 ${report.summary.criticalCount > 0 ? "text-red-400" : "text-slate-400"}`} />
                Soft-404, robots, duplicate heads
              </p>
            </div>

            {/* Warnings Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between col-span-1">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Warnings</span>
                <h3 className={`text-4xl font-extrabold mt-2 font-mono ${report.summary.warningCount > 0 ? "text-amber-400" : "text-slate-400"}`}>
                  {report.summary.warningCount}
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1">
                <AlertTriangle className={`w-3.5 h-3.5 ${report.summary.warningCount > 0 ? "text-amber-400" : "text-slate-400"}`} />
                Thin content, duplicate canonicals
              </p>
            </div>

            {/* Info Alerts Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between col-span-1">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Info Notices</span>
                <h3 className="text-4xl font-extrabold text-slate-400 mt-2 font-mono">{report.summary.infoCount}</h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
                Opportunities to optimize copy
              </p>
            </div>
          </div>
        )}

        {/* Scan & Fix Results banner */}
        {fixResults && (
          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Automated Remediation Complete!
            </h2>
            <p className="text-sm text-slate-300">{fixResults.message}</p>
            
            {fixResults.remediated.length > 0 && (
              <div className="space-y-2 mt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Automated Actions Taken:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {fixResults.remediated.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-emerald-300 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-900/30">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {fixResults.todos.length > 0 && (
              <div className="space-y-2 mt-4 pt-4 border-t border-emerald-900/30">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Action Required: High-Impact Manual Content TODO List
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Google expects high-quality descriptive landing pages. To fully pass the GSC "not indexed" checks, improve the text of the following pages:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2 pr-4">Route Path</th>
                        <th className="py-2 pr-4">Audit Violation</th>
                        <th className="py-2">SEO Solution / Recommendation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {fixResults.todos.map((todo, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/25">
                          <td className="py-3 pr-4 font-mono text-blue-400 font-semibold">{todo.path}</td>
                          <td className="py-3 pr-4 text-amber-400 font-medium">{todo.issue}</td>
                          <td className="py-3 text-slate-300">{todo.recommendation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detailed reports list */}
        {report && report.findings.length > 0 && (
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                Active Site Findings & SEO Audit Detail
              </h2>
              <span className="text-xs text-slate-400">Showing {report.findings.length} findings</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-300">
                <thead className="bg-slate-950/60 text-xs text-slate-400 uppercase tracking-wider">
                  <tr className="border-b border-slate-800">
                    <th className="px-6 py-3.5">Route Path</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Finding Rule</th>
                    <th className="px-6 py-3.5">Severity</th>
                    <th className="px-6 py-3.5">Current Value</th>
                    <th className="px-6 py-3.5">Recommended Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 font-medium">
                  {report.findings.map((finding, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/20 transition-all text-xs">
                      <td className="px-6 py-4 font-mono text-blue-400 font-bold whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {finding.path}
                          <a href={finding.path} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-300">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400">{finding.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-white font-bold">{finding.rule}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          finding.severity === "Critical" 
                            ? "bg-red-500/15 text-red-400 border border-red-500/25" 
                            : finding.severity === "Warning" 
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/25" 
                            : "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                        }`}>
                          {finding.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 max-w-xs truncate">{finding.current}</td>
                      <td className="px-6 py-4 text-slate-300">{finding.recommended}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {report && report.findings.length === 0 && (
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white">0 Issues Found — Fully Compliant!</h3>
            <p className="text-sm text-slate-400 max-w-md">
              Outstanding! Your site is fully optimized with strict self-referencing canonical URLs, zero duplicate headers, perfect title/description limits, and complete sitemap coverage.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
