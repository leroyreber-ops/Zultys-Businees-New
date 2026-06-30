import React, { useState, useEffect } from 'react';
import { MessageSquare, X, ArrowUpRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingTextCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show the floating button after a short delay so it transitions in elegantly
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Briefly flash a friendly tooltip after entrance to draw eye-contact
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
        // Automatically hide tooltip after 8 seconds
        setTimeout(() => setShowTooltip(false), 8000);
      }, 1500);
      return () => clearTimeout(tooltipTimer);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          id="floating-text-cta-container"
        >
          {/* Friendly Tooltip Bubble */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="bg-slate-900 text-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 max-w-xs text-sm relative"
                id="cta-tooltip-bubble"
              >
                {/* Speech Bubble Arrow */}
                <div className="absolute bottom-[-6px] right-8 w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-white/10"></div>
                
                {/* Close Button */}
                <button 
                  onClick={() => setShowTooltip(false)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Close message"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                <div className="flex gap-2.5 items-start pr-4">
                  <span className="flex h-2.5 w-2.5 translate-y-1.5 rounded-full bg-zultys-green animate-pulse flex-shrink-0" />
                  <div>
                    <p className="font-extrabold text-xs text-zultys-gold uppercase tracking-wider mb-0.5">Leroy - Direct Line</p>
                    <p className="text-slate-300 text-xs leading-relaxed font-bold">
                      Need immediate help? Text us directly at <span className="text-white font-extrabold">817-231-2962</span> for a fast quote or system support!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Pill Trigger */}
          <motion.a
            href="sms:817-231-2962"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => {
              setIsHovered(true);
              setShowTooltip(false); // Hide the standard tooltip if they hover
            }}
            onMouseLeave={() => setIsHovered(false)}
            className="flex items-center gap-3 bg-gradient-to-r from-zultys-green to-emerald-600 text-white font-black px-6 py-4 rounded-full shadow-[0_20px_50px_rgba(0,168,45,0.4)] hover:shadow-[0_25px_60px_rgba(0,168,45,0.6)] transition-all border border-emerald-500/30 group cursor-pointer"
            id="floating-text-pill"
          >
            {/* Pulsing indicator inside the icon wrapper */}
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/30 animate-ping opacity-75" />
              <div className="bg-white/15 p-2 rounded-full text-white">
                <MessageSquare className="h-5 w-5 animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-250">Text Us Now</span>
              <span className="text-sm font-black tracking-wide flex items-center gap-1.5">
                817-231-2962
                <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}
