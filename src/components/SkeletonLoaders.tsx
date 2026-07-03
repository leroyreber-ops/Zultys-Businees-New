import { motion } from 'motion/react';
import { Shield, Zap, Phone, Info, HelpCircle, MapPin, Grid, Layers, Smartphone, Settings } from 'lucide-react';

/**
 * Standard Header Navigation Skeleton
 */
export function HeaderSkeleton() {
  return (
    <div className="w-full bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo block */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-200 animate-pulse flex items-center justify-center">
            <Zap className="h-4 w-4 text-slate-300" />
          </div>
          <div className="h-5 w-36 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-6">
          <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-12 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* CTA Button Block */}
        <div className="h-9 w-32 bg-slate-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

/**
 * High-Fidelity City Page Skeleton Loader
 */
export function CityPageSkeleton() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col bg-white"
    >
      <HeaderSkeleton />

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-850 text-white py-20 px-6 relative overflow-hidden">
        {/* Background decorative shapes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full">
              <div className="w-3 h-3 rounded-full bg-slate-700 animate-pulse" />
              <div className="h-3 w-40 bg-slate-700 rounded animate-pulse" />
            </div>

            {/* Title line 1 & 2 */}
            <div className="space-y-3">
              <div className="h-10 w-3/4 bg-slate-850 rounded-lg animate-pulse border border-slate-800" />
              <div className="h-10 w-1/2 bg-slate-850 rounded-lg animate-pulse border border-slate-800" />
            </div>

            {/* Subtitle / Paragraph */}
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-slate-850 rounded animate-pulse" />
              <div className="h-4 w-11/12 bg-slate-850 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-slate-850 rounded animate-pulse" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="h-12 w-48 bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-12 w-40 bg-slate-850 rounded-lg animate-pulse border border-slate-800" />
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* Hero Image / Map Card skeleton */}
            <div className="bg-slate-850/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-2xl h-[320px] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-28 bg-slate-800 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-slate-800 rounded animate-pulse" />
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-800 animate-pulse" />
              </div>
              <div className="flex-1 flex flex-col justify-center gap-3 py-4">
                <div className="h-3 w-full bg-slate-800 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-slate-800 rounded animate-pulse" />
                <div className="h-3 w-4/5 bg-slate-800 rounded animate-pulse" />
              </div>
              <div className="h-10 w-full bg-slate-850 border border-slate-800 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Benefits Grid Skeleton */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-2/3 bg-slate-200 rounded animate-pulse" />
                  <div className="h-3.5 w-full bg-slate-100 rounded animate-pulse" />
                  <div className="h-3.5 w-5/6 bg-slate-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections Skeleton */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main article / description */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <div className="h-8 w-2/3 bg-slate-200 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                <div className="h-4 w-11/12 bg-slate-100 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-slate-100 rounded animate-pulse" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-7 w-1/2 bg-slate-200 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                <div className="h-4 w-11/12 bg-slate-100 rounded animate-pulse" />
              </div>
            </div>

            {/* Dummy feature checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-300">
                    <Shield className="h-3 w-3" />
                  </div>
                  <div className="h-4 w-44 bg-slate-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Sidebar Form Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white border border-slate-200 p-8 rounded-2xl shadow-lg space-y-6">
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              </div>

              {/* Form Input Skeletons */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                  <div className="h-10 w-full bg-slate-50 border border-slate-200 rounded-lg animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                  <div className="h-10 w-full bg-slate-50 border border-slate-200 rounded-lg animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                  <div className="h-20 w-full bg-slate-50 border border-slate-200 rounded-lg animate-pulse" />
                </div>
              </div>

              <div className="h-12 w-full bg-slate-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

/**
 * High-Fidelity Product Page Skeleton Loader
 */
export function ProductPageSkeleton() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col bg-white"
    >
      <HeaderSkeleton />

      {/* Hero Banner Skeleton */}
      <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-slate-900 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/50 border border-blue-900 rounded-full">
              <Smartphone className="h-3.5 w-3.5 text-blue-400" />
              <div className="h-3.5 w-28 bg-blue-900 rounded animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="h-10 w-5/6 bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-10 w-3/5 bg-slate-800 rounded-lg animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-11/12 bg-slate-800 rounded animate-pulse" />
            </div>
            <div className="flex gap-4 pt-2">
              <div className="h-11 w-44 bg-blue-600/50 rounded-lg animate-pulse" />
              <div className="h-11 w-32 bg-slate-800 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            {/* Product Hardware Silhouette Card */}
            <div className="w-72 h-80 bg-slate-800 rounded-2xl animate-pulse relative flex items-center justify-center shadow-2xl border border-slate-700">
              <div className="w-48 h-60 bg-slate-850 rounded-xl flex flex-col justify-between p-4">
                <div className="w-full h-32 bg-slate-800 rounded" />
                <div className="space-y-2">
                  <div className="h-3 w-1/2 bg-slate-800 rounded" />
                  <div className="h-3 w-3/4 bg-slate-800 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Specifications Strip */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                  <Settings className="h-6 w-6 text-slate-300" />
                </div>
                <div className="space-y-2">
                  <div className="h-3.5 w-16 bg-slate-200 rounded animate-pulse" />
                  <div className="h-5 w-24 bg-slate-300 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of details */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="h-8 w-2/3 bg-slate-200 rounded-lg animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
            </div>

            <div className="space-y-4 pt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Shield className="h-4 w-4 text-slate-300" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-1/3 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-5/6 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-10 rounded-2xl space-y-6">
            <div className="h-6 w-1/3 bg-slate-200 rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border-b border-slate-200 pb-4">
                  <div className="h-3 w-16 bg-slate-200 rounded animate-pulse mb-2" />
                  <div className="h-4.5 w-24 bg-slate-300 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

/**
 * Standard General Page Fallback Skeleton
 */
export function GeneralPageSkeleton() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen flex flex-col bg-slate-50"
    >
      <HeaderSkeleton />
      <div className="max-w-4xl mx-auto w-full px-6 py-16 space-y-12 flex-1">
        <div className="space-y-4">
          <div className="h-10 w-2/3 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-4 w-1/3 bg-slate-150 rounded animate-pulse" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="h-48 w-full bg-slate-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
