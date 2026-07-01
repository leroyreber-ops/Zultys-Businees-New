import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Activity, AlertTriangle, CheckCircle, ChevronDown, Clock, Gauge, Layout, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Scoring configuration parameters (p100 = perfect, p90 = threshold for score 90, p50 = threshold for score 50)
const METRIC_CONFIGS = {
  FCP: { p100: 800, p90: 1800, p50: 3000, label: 'First Contentful Paint', weight: 0.10 },
  LCP: { p100: 1000, p90: 2500, p50: 4000, label: 'Largest Contentful Paint', weight: 0.35 },
  FID: { p100: 10, p90: 100, p50: 300, label: 'First Input Delay', weight: 0.20 },
  CLS: { p100: 0, p90: 0.10, p50: 0.25, label: 'Cumulative Layout Shift', weight: 0.35 }
};

interface MetricState {
  value: number | null;
  score: number;
}

export function PerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false);
  const [fcp, setFcp] = useState<MetricState>({ value: null, score: 100 });
  const [lcp, setLcp] = useState<MetricState>({ value: null, score: 100 });
  const [fid, setFid] = useState<MetricState>({ value: null, score: 100 });
  const [cls, setCls] = useState<MetricState>({ value: null, score: 100 });
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasAlerted, setHasAlerted] = useState(false);
  const [isReadyForAlert, setIsReadyForAlert] = useState(false);

  // Refs to keep track of current values for non-reactive observer callbacks
  const metricsRef = useRef({
    FCP: { value: null as number | null, score: 100 },
    LCP: { value: null as number | null, score: 100 },
    FID: { value: null as number | null, score: 100 },
    CLS: { value: 0 as number, score: 100 }
  });

  // Check visibility / owner permissions on mount
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    let hasPerfParam = false;
    let storedPerf = false;

    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.has('perf')) {
          const val = params.get('perf');
          if (val === 'true') {
            hasPerfParam = true;
            localStorage.setItem('perf-monitor-enabled', 'true');
          } else if (val === 'false') {
            localStorage.removeItem('perf-monitor-enabled');
          }
        }
        storedPerf = localStorage.getItem('perf-monitor-enabled') === 'true';
      }
    } catch (e) {
      // Fail-safe
    }

    if (isDev || hasPerfParam || storedPerf) {
      setIsVisible(true);
    }
  }, []);

  // Calculate score between 0 and 100 based on standard targets
  const computeMetricScore = (value: number, p100: number, p90: number, p50: number): number => {
    if (value <= p100) return 100;
    if (value <= p90) {
      // Interpolate between 90 and 100
      return Math.round(100 - ((value - p100) / (p90 - p100)) * 10);
    }
    if (value <= p50) {
      // Interpolate between 50 and 90
      return Math.round(90 - ((value - p90) / (p50 - p90)) * 40);
    }
    // Interpolate below 50
    const maxVal = p50 * 2;
    if (value >= maxVal) return 0;
    return Math.max(0, Math.round(50 - ((value - p50) / (maxVal - p50)) * 50));
  };

  // Compute the estimated overall performance score based on weights of available metrics
  const getOverallPerformanceScore = () => {
    const activeMetrics = [];
    let totalWeight = 0;
    let weightedScoreSum = 0;

    const m = metricsRef.current;

    if (m.FCP.value !== null) {
      activeMetrics.push({ score: m.FCP.score, weight: METRIC_CONFIGS.FCP.weight });
    }
    if (m.LCP.value !== null) {
      activeMetrics.push({ score: m.LCP.score, weight: METRIC_CONFIGS.LCP.weight });
    }
    if (m.FID.value !== null) {
      activeMetrics.push({ score: m.FID.score, weight: METRIC_CONFIGS.FID.weight });
    } else {
      // If FID is pending (waiting for interaction), assign it a nominal 100 score or exclude it.
      activeMetrics.push({ score: 100, weight: METRIC_CONFIGS.FID.weight });
    }
    
    // CLS is always active
    activeMetrics.push({ score: m.CLS.score, weight: METRIC_CONFIGS.CLS.weight });

    activeMetrics.forEach(metric => {
      totalWeight += metric.weight;
      weightedScoreSum += (metric.score * metric.weight);
    });

    return totalWeight > 0 ? Math.round(weightedScoreSum / totalWeight) : 100;
  };

  // Styled console logging with full Web Vitals telemetry
  const logTelemetry = (updatedMetric: string) => {
    const score = getOverallPerformanceScore();
    const m = metricsRef.current;
    
    const getStatusText = (s: number) => {
      if (s >= 90) return '🟩 GOOD';
      if (s >= 50) return '🟨 NEEDS IMPROVEMENT';
      return '🟥 POOR';
    };

    console.groupCollapsed(
      `%c⚡ Web Vitals Update: [${updatedMetric}] | Estimated Lighthouse Score: ${score}/100`,
      `color: ${score >= 90 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'}; font-weight: bold; font-family: system-ui;`
    );
    console.log(
      `%cEstimated Lighthouse Performance: ${score}/100 (%c${score >= 90 ? 'COMPLIANT' : 'NON-COMPLIANT'}%c)`,
      'font-weight: bold; font-size: 1.1em;',
      `color: ${score >= 90 ? '#10b981' : '#ef4444'}; font-weight: bold;`,
      'color: inherit;'
    );
    console.log(`-----------------------------------------------`);
    console.log(`FCP: ${m.FCP.value !== null ? `${m.FCP.value.toFixed(0)} ms` : 'Pending...'} | Score: ${m.FCP.score}/100 (${getStatusText(m.FCP.score)})`);
    console.log(`LCP: ${m.LCP.value !== null ? `${m.LCP.value.toFixed(0)} ms` : 'Pending...'} | Score: ${m.LCP.score}/100 (${getStatusText(m.LCP.score)})`);
    console.log(`FID: ${m.FID.value !== null ? `${m.FID.value.toFixed(1)} ms` : 'Pending interaction'} | Score: ${m.FID.score}/100 (${getStatusText(m.FID.score)})`);
    console.log(`CLS: ${m.CLS.value !== null ? m.CLS.value.toFixed(4) : '0.0000'} | Score: ${m.CLS.score}/100 (${getStatusText(m.CLS.score)})`);
    console.log(`===============================================`);
    console.groupEnd();
  };

  useEffect(() => {
    // Grace period timer before checking/alerting on performance scores to let layout settle and hot reloading finish
    const timer = setTimeout(() => {
      setIsReadyForAlert(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const isSupported = typeof window !== 'undefined' && 'PerformanceObserver' in window;
    if (!isSupported) {
      console.warn('PerformanceObserver is not supported in this browser.');
      return;
    }

    const observers: PerformanceObserver[] = [];

    // 1. Monitor First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          const value = fcpEntry.startTime;
          const score = computeMetricScore(value, METRIC_CONFIGS.FCP.p100, METRIC_CONFIGS.FCP.p90, METRIC_CONFIGS.FCP.p50);
          metricsRef.current.FCP = { value, score };
          setFcp({ value, score });
          logTelemetry('FCP');
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
      observers.push(fcpObserver);
    } catch (e) {
      console.error('Error observing paint metrics:', e);
    }

    // 2. Monitor Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const value = lastEntry.startTime;
          const score = computeMetricScore(value, METRIC_CONFIGS.LCP.p100, METRIC_CONFIGS.LCP.p90, METRIC_CONFIGS.LCP.p50);
          metricsRef.current.LCP = { value, score };
          setLcp({ value, score });
          logTelemetry('LCP');
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(lcpObserver);
    } catch (e) {
      console.error('Error observing LCP metrics:', e);
    }

    // 3. Monitor First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const firstEntry = entries[0] as any;
        if (firstEntry) {
          const value = firstEntry.processingStart - firstEntry.startTime;
          const score = computeMetricScore(value, METRIC_CONFIGS.FID.p100, METRIC_CONFIGS.FID.p90, METRIC_CONFIGS.FID.p50);
          metricsRef.current.FID = { value, score };
          setFid({ value, score });
          logTelemetry('FID');
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      observers.push(fidObserver);
    } catch (e) {
      console.error('Error observing FID metrics:', e);
    }

    // 4. Monitor Cumulative Layout Shift (CLS)
    try {
      let clsAccumulator = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsAccumulator += entry.value;
            const score = computeMetricScore(clsAccumulator, METRIC_CONFIGS.CLS.p100, METRIC_CONFIGS.CLS.p90, METRIC_CONFIGS.CLS.p50);
            metricsRef.current.CLS = { value: clsAccumulator, score };
            setCls({ value: clsAccumulator, score });
            logTelemetry('CLS');
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      observers.push(clsObserver);
    } catch (e) {
      console.error('Error observing CLS metrics:', e);
    }

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  // Alert and compliance check side effect
  useEffect(() => {
    if (!isReadyForAlert) return;

    const overallScore = getOverallPerformanceScore();
    
    // Alert conditions check: dip below 90 & not alerted yet
    if (overallScore < 90 && !hasAlerted) {
      setHasAlerted(true);
      
      const alertMsg = `⚠️ Web Performance Alert: Page Lighthouse score dropped to ${overallScore}/100! (LCP: ${lcp.value?.toFixed(0) || 'Pending'}ms, CLS: ${cls.value?.toFixed(3) || '0.000'}). Take immediate action to optimize.`;
      
      // Console warning instead of error to avoid breaking test environments
      console.warn(
        `%c PERFORMANCE WARNING %c ${alertMsg}`,
        'background: #f59e0b; color: black; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        'color: #f59e0b; font-weight: bold;'
      );

      // Gorgeous visual slide-in toast
      toast.error('Lighthouse Score Alert', {
        description: alertMsg,
        duration: 10000,
        id: 'performance-alert-toast',
      });
    } else if (overallScore >= 90 && hasAlerted) {
      setHasAlerted(false);
    }
  }, [fcp, lcp, fid, cls, hasAlerted, isReadyForAlert]);

  const score = getOverallPerformanceScore();
  const getScoreColorClass = (s: number) => {
    if (s >= 90) return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10';
    if (s >= 50) return 'text-amber-500 border-amber-500/20 bg-amber-500/10';
    return 'text-rose-500 border-rose-500/20 bg-rose-500/10';
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 font-sans"
      id="performance-monitor-hud"
    >
      <AnimatePresence>
        {!isExpanded ? (
          <motion.button
            onClick={() => setIsExpanded(true)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-full border shadow-lg backdrop-blur-md cursor-pointer transition-colors duration-300 ${
              score >= 90 
                ? 'bg-slate-900/90 text-emerald-400 border-emerald-500/30 hover:bg-slate-900' 
                : 'bg-slate-900/90 text-amber-400 border-amber-500/30 hover:bg-slate-900'
            }`}
          >
            <Gauge className="h-4.5 w-4.5 animate-pulse" />
            <span className="text-xs font-black tracking-wider font-mono">{score}/100</span>
            <span className={`w-2 h-2 rounded-full ${score >= 90 ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'}`} />
          </motion.button>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="w-80 bg-slate-950/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden text-slate-200"
          >
            <div className="flex items-center justify-between px-4.5 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <Gauge className="h-4.5 w-4.5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Web Vitals Live HUD</span>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4.5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-slate-400 font-medium">Estimated Score</div>
                  <div className="text-3xl font-black font-mono mt-0.5 tracking-tight">{score} <span className="text-xs text-slate-500 font-bold">/ 100</span></div>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-extrabold tracking-wide ${getScoreColorClass(score)}`}>
                  {score >= 90 ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>COMPLIANT</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>WARNING &lt; 90</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/2 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Zap className="h-4 w-4 text-sky-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">LCP</div>
                      <div className="text-[10px] text-slate-400 leading-none">Largest Paint</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold font-mono text-slate-100">{lcp.value !== null ? `${lcp.value.toFixed(0)}ms` : 'Pending...'}</div>
                    <div className={`text-[10px] font-black font-mono ${lcp.score >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{lcp.score}/100</div>
                  </div>
                </div>

                <div className="bg-white/2 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Layout className="h-4 w-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">CLS</div>
                      <div className="text-[10px] text-slate-400 leading-none">Layout Shift</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold font-mono text-slate-100">{cls.value !== null ? cls.value.toFixed(4) : '0.0000'}</div>
                    <div className={`text-[10px] font-black font-mono ${cls.score >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{cls.score}/100</div>
                  </div>
                </div>

                <div className="bg-white/2 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Activity className="h-4 w-4 text-purple-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">FID</div>
                      <div className="text-[10px] text-slate-400 leading-none">Input Delay</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold font-mono text-slate-100">{fid.value !== null ? `${fid.value.toFixed(0)}ms` : 'Click screen'}</div>
                    <div className={`text-[10px] font-black font-mono ${fid.score >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{fid.score}/100</div>
                  </div>
                </div>

                <div className="bg-white/2 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">FCP</div>
                      <div className="text-[10px] text-slate-400 leading-none">First Paint</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold font-mono text-slate-100">{fcp.value !== null ? `${fcp.value.toFixed(0)}ms` : 'Pending...'}</div>
                    <div className={`text-[10px] font-black font-mono ${fcp.score >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{fcp.score}/100</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-[10px] text-slate-500 font-medium leading-normal text-center">
                Maintains our strict SLA standard of 100% SEO compliance and optimal rendering speed in DFW.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
