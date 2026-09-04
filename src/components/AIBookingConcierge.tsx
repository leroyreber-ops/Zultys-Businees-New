import React, { useState, useEffect, useRef } from 'react';
import { HashLink as Link, useNavigate } from './HashLink';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Calendar, 
  X, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Building2, 
  Users, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight,
  Maximize2,
  Minimize2,
  RefreshCw,
  Zap,
  MapPin,
  Compass,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { CONCIERGE_EXPLORE_LINKS } from '../data/conciergeDestinations';
import { routeConciergeIntent, ConciergeAction } from '../utils/conciergeRouter';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedAction?: 'book' | 'call' | 'pricing';
  actions?: ConciergeAction[];
  fallback?: { label: string; phone: string; url: string };
  disclosure?: string;
}

const SERVICE_OPTIONS = [
  { id: 'cloud-voip', label: 'Cloud PBX / Hosted VoIP', icon: '☁️', desc: 'Fully managed, 99.999% SLA, $19-$35/seat' },
  { id: 'on-premise', label: 'On-Premise IP-PBX (MX250/SE)', icon: '🏢', desc: 'Capital ownership, zero seat fees, on-site control' },
  { id: 'hybrid', label: 'Hybrid Business Phone System', icon: '🔄', desc: 'On-site server + cloud failover disaster recovery' },
  { id: 'contact-center', label: 'Contact Center & IVR Queues', icon: '🎧', desc: 'Omnichannel routing, supervisor dashboards, recordings' },
  { id: 'teams-integration', label: 'Microsoft Teams Phone Integration', icon: '💼', desc: 'Direct routing without clunky add-on software' },
  { id: 'cabling-network', label: 'Structured Cabling & Network QoS', icon: '🔌', desc: 'Cat6/Fiber cabling, PoE switches, SD-WAN optimization' },
  { id: 'support-repair', label: 'Zultys Maintenance & Repair', icon: '🛠️', desc: 'Certified local DFW emergency technician dispatch' },
  { id: 'free-audit', label: 'Free Telecom & Bill Assessment', icon: '📊', desc: 'On-site carrier audit & network readiness check' },
];

const PROMPT_SUGGESTIONS = [
  "💰 What is the cost for a 15-person VoIP system?",
  "☁️ What is the difference between Cloud vs On-Premise?",
  "📱 How does the ZAC mobile softphone work?",
  "📞 Can we connect Zultys to Microsoft Teams?",
  "🔄 Can we keep our existing phone & fax numbers?",
  "🏢 How fast can a technician visit our DFW office?",
  "🗓️ Book a free on-site telecom consultation"
];

export function AIBookingConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'book'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "👋 **Hello! I'm your DFW Zultys AI Concierge & Booking Agent.**\n\nI can answer questions about Zultys business phone systems, compare cloud vs on-premise pricing, explain Microsoft Teams integration, or help you schedule a free on-site survey anywhere in Dallas–Fort Worth.\n\nHow can I help you today?",
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    serviceType: 'Cloud PBX / Hosted VoIP',
    userCount: '6-20',
    city: 'Dallas / Fort Worth',
    consultationType: 'On-Site Survey & Live Phone Demo',
    preferredTime: 'As soon as possible',
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab, isLoading]);

  // Listen for global open triggers
  useEffect(() => {
    const handleGlobalOpen = (e: any) => {
      setIsOpen(true);
      if (e?.detail?.tab) {
        setActiveTab(e.detail.tab);
      }
    };
    window.addEventListener('open-ai-booking' as any, handleGlobalOpen);
    return () => window.removeEventListener('open-ai-booking' as any, handleGlobalOpen);
  }, []);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          conversationHistory: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          })),
          contextPage: typeof window !== 'undefined' ? window.location.pathname : ''
        })
      });

      const data = await res.json();

      if (data.success && data.reply) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: data.reply.toLowerCase().includes('book') || data.reply.toLowerCase().includes('consult') ? 'book' : undefined,
          actions: data.actions || [],
          fallback: data.fallback,
          disclosure: data.disclosure
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'No reply received');
      }
    } catch (err) {
      // Deterministic offline fallback routing
      const fallbackRouting = routeConciergeIntent(userText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: fallbackRouting.verifiedAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: 'book',
        actions: fallbackRouting.actions,
        fallback: fallbackRouting.fallback,
        disclosure: fallbackRouting.disclosure
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      toast.error('Please provide your name and phone number so we can confirm your booking.');
      return;
    }

    setIsBookingSubmitting(true);
    try {
      const res = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingForm)
      });

      const data = await res.json();
      if (data.success) {
        setBookingCompleted(true);
        setBookingRefId(data.bookingId || `DFW-${Math.floor(100000 + Math.random() * 900000)}`);
        toast.success('Consultation Booked!', {
          description: data.message || 'Our DFW Zultys telecom specialist will contact you shortly to confirm.'
        });
      } else {
        toast.error('Booking Request Could Not Be Delivered', {
          description: data.error || 'Please call or text Leroy directly at 817-231-2962 to book immediately.'
        });
      }
    } catch (err: any) {
      toast.error('Network Issue', {
        description: 'Unable to reach booking service online. Please call or text Leroy directly at 817-231-2962 for instant confirmation.'
      });
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Concierge Badge & Action Pill */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
        <motion.button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-3 bg-slate-900/95 hover:bg-slate-900 text-white px-4 py-3 rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.35)] border border-slate-700/80 backdrop-blur-md transition-all group"
          id="ai-booking-trigger-btn"
          aria-label="Open AI Booking Concierge & Telecom Assistant"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-zultys-green/40 animate-ping opacity-75" />
            <div className="bg-gradient-to-tr from-zultys-green to-emerald-400 p-2 rounded-full text-slate-950 font-black shadow-inner">
              <Bot className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="flex flex-col items-start text-left leading-tight pr-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-zultys-gold flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> AI Concierge & Booking
            </span>
            <span className="text-xs font-black text-slate-100 flex items-center gap-1.5">
              Ask AI or Book Quote
              <ChevronRight className="h-3.5 w-3.5 text-zultys-green group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </motion.button>
      </div>

      {/* Main Full-Featured AI Concierge & Booking Modal */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm pointer-events-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[94vh] h-[700px] rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
              id="ai-booking-concierge-modal"
            >
              {/* Header Titlebar */}
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-tr from-zultys-green to-emerald-400 p-2.5 rounded-xl shadow-lg">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base tracking-tight text-white">
                        Dallas–Fort Worth Zultys AI Concierge
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Grounded AI telecom answers, service selection, and instant DFW consultation booking.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:817-231-2962"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-zultys-gold px-3 py-1.5 rounded-lg transition-colors border border-slate-700"
                  >
                    <Phone className="h-3.5 w-3.5 text-zultys-green" />
                    <span>817-231-2962</span>
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                    aria-label="Close Concierge"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-slate-100 dark:bg-slate-850 px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      activeTab === 'chat'
                        ? 'bg-white dark:bg-slate-800 text-zultys-green shadow-sm border border-slate-200/80 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Ask AI Telecom Agent
                  </button>
                  <button
                    onClick={() => setActiveTab('book')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      activeTab === 'book'
                        ? 'bg-zultys-green text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Book Consultation & Quote
                  </button>
                </div>

                <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline-flex items-center gap-1 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Authorized Zultys DFW Partner
                </span>
              </div>

              {/* Tab 1: AI Chat Assistant */}
              {activeTab === 'chat' && (
                <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
                  {/* Service Explorer & Quick Page Guide Chips */}
                  <div className="px-6 py-2.5 bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-750 flex items-center gap-2 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1 flex-shrink-0">
                      <Compass className="h-3 w-3 text-zultys-green" /> Explore:
                    </span>
                    {CONCIERGE_EXPLORE_LINKS.map((nav) => (
                      <Link
                        key={nav.id}
                        to={nav.href}
                        onClick={() => setIsOpen(false)}
                        className="whitespace-nowrap text-[11px] font-bold bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-zultys-green px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors flex-shrink-0 flex items-center gap-1 shadow-2xs"
                      >
                        {nav.label}
                        <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                      </Link>
                    ))}
                  </div>

                  {/* Messages Scroll Area */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 max-w-3xl ${
                          msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                        }`}
                      >
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black shadow-sm ${
                            msg.sender === 'user'
                              ? 'bg-zultys-green text-white'
                              : 'bg-slate-900 text-zultys-gold border border-slate-700'
                          }`}
                        >
                          {msg.sender === 'user' ? 'YOU' : <Bot className="h-4 w-4 text-emerald-400" />}
                        </div>

                        <div
                          className={`p-4 rounded-2xl text-sm leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-zultys-green text-white rounded-tr-xs font-medium shadow-md'
                              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200 dark:border-slate-700 shadow-sm'
                          }`}
                        >
                          <div className="whitespace-pre-wrap font-normal">
                            {msg.text.split('\n').map((line, idx) => {
                              // Basic markdown bold parsing
                              const parts = line.split(/(\*\*.*?\*\*)/g);
                              return (
                                <p key={idx} className={line === '' ? 'h-2' : 'mb-1 last:mb-0'}>
                                  {parts.map((part, pIdx) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                      return <strong key={pIdx} className="font-extrabold text-slate-950 dark:text-white">{part.slice(2, -2)}</strong>;
                                    }
                                    return part;
                                  })}
                                </p>
                              );
                            })}
                          </div>

                          {/* Verified Allowlist Action Buttons */}
                          {msg.actions && msg.actions.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700 flex flex-wrap gap-2">
                              {msg.actions.map((act) => (
                                <Link
                                  key={act.id}
                                  to={act.url}
                                  onClick={() => setIsOpen(false)}
                                  className="inline-flex items-center gap-1.5 bg-zultys-green hover:bg-emerald-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-sm transition-all"
                                >
                                  <span>{act.label}</span>
                                  <ArrowRight className="h-3 w-3" />
                                </Link>
                              ))}
                              {msg.fallback && (
                                <a
                                  href={`tel:${msg.fallback.phone}`}
                                  className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-white font-extrabold text-xs px-3 py-1.5 rounded-lg transition-all"
                                >
                                  <Phone className="h-3.5 w-3.5 text-emerald-500" />
                                  <span>{msg.fallback.label}</span>
                                </a>
                              )}
                            </div>
                          )}

                          {msg.suggestedAction === 'book' && (!msg.actions || msg.actions.length === 0) && (
                            <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700 flex flex-wrap gap-2">
                              <button
                                onClick={() => setActiveTab('book')}
                                className="flex items-center gap-1.5 bg-zultys-green hover:bg-emerald-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-sm transition-all"
                              >
                                <Calendar className="h-3.5 w-3.5" /> Book Consultation Now
                              </button>
                              <a
                                href="tel:817-231-2962"
                                className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-white font-extrabold text-xs px-3 py-1.5 rounded-lg transition-all"
                              >
                                <Phone className="h-3.5 w-3.5 text-emerald-500" /> Call 817-231-2962
                              </a>
                            </div>
                          )}

                          {msg.disclosure && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 italic border-l-2 border-slate-300 dark:border-slate-700 pl-2">
                              {msg.disclosure}
                            </p>
                          )}

                          <span className="text-[10px] opacity-60 block mt-2 text-right">
                            {msg.timestamp}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3 max-w-xl mr-auto">
                        <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-black text-emerald-400">
                          <Bot className="h-4 w-4 animate-spin" />
                        </div>
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-zultys-green animate-bounce" />
                          <span className="h-2 w-2 rounded-full bg-zultys-green animate-bounce [animation-delay:0.2s]" />
                          <span className="h-2 w-2 rounded-full bg-zultys-green animate-bounce [animation-delay:0.4s]" />
                          <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 font-medium">
                            Synthesizing DFW telecommunications answer...
                          </span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Prompt Suggestions Bar */}
                  <div className="px-6 py-2 bg-white/70 dark:bg-slate-850/70 border-t border-slate-200/80 dark:border-slate-800 overflow-x-auto flex gap-2 no-scrollbar">
                    {PROMPT_SUGGESTIONS.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        disabled={isLoading}
                        className="whitespace-nowrap text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full border border-slate-250 dark:border-slate-700 transition-colors flex-shrink-0 font-medium"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  {/* Input Form */}
                  <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage(inputValue);
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about Zultys VoIP, pricing, Teams integration, phones, or DFW support..."
                        className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-2xl border border-slate-250 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-zultys-green text-sm font-medium"
                        disabled={isLoading}
                      />
                      <button
                        type="submit"
                        disabled={!inputValue.trim() || isLoading}
                        className="bg-zultys-green hover:bg-emerald-600 disabled:opacity-50 text-white p-3 rounded-2xl shadow-md transition-all flex items-center justify-center"
                        aria-label="Send Message"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Tab 2: Service Selection & Booking Wizard */}
              {activeTab === 'book' && (
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
                  {bookingCompleted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="max-w-xl mx-auto py-12 text-center space-y-6"
                    >
                      <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        Consultation Successfully Booked!
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                        Thank you, <strong className="text-slate-900 dark:text-white">{bookingForm.name}</strong>. Your consultation request for <strong className="text-slate-900 dark:text-white">{bookingForm.serviceType}</strong> has been assigned reference <span className="font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-zultys-green">#{bookingRefId}</span>.
                      </p>

                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-left space-y-3 shadow-sm max-w-md mx-auto text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Service:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{bookingForm.serviceType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Estimated Seats:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{bookingForm.userCount} Users</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Format:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{bookingForm.consultationType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Direct Contact:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{bookingForm.phone}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                        <a
                          href="tel:817-231-2962"
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zultys-green hover:bg-emerald-600 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all"
                        >
                          <Phone className="h-4 w-4" /> Call Dispatch Desk (817-231-2962)
                        </a>
                        <button
                          onClick={() => {
                            setBookingCompleted(false);
                            setActiveTab('chat');
                          }}
                          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 transition-colors text-xs"
                        >
                          Return to AI Chat
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="max-w-3xl mx-auto space-y-8">
                      {/* Section 1: Choose Service */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-zultys-green mb-3">
                          1. Select Zultys Solution or Service Needed
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {SERVICE_OPTIONS.map((service) => {
                            const isSelected = bookingForm.serviceType === service.label;
                            return (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => setBookingForm(prev => ({ ...prev, serviceType: service.label }))}
                                className={`p-3.5 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                                  isSelected
                                    ? 'bg-zultys-green/10 border-zultys-green text-slate-900 dark:text-white shadow-sm ring-1 ring-zultys-green'
                                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                                }`}
                              >
                                <span className="text-2xl flex-shrink-0">{service.icon}</span>
                                <div>
                                  <div className="font-extrabold text-xs text-slate-900 dark:text-white">
                                    {service.label}
                                  </div>
                                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                    {service.desc}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Section 2: Seat Count & Format */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-zultys-green mb-2">
                            2. Approximate Number of Phone Extensions / Users
                          </label>
                          <div className="grid grid-cols-5 gap-2">
                            {['1-5', '6-20', '21-50', '51-100', '100+'].map((seats) => (
                              <button
                                key={seats}
                                type="button"
                                onClick={() => setBookingForm(prev => ({ ...prev, userCount: seats }))}
                                className={`py-2.5 text-xs font-extrabold rounded-xl border text-center transition-all ${
                                  bookingForm.userCount === seats
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                                }`}
                              >
                                {seats}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-zultys-green mb-2">
                            3. Preferred Consultation Format
                          </label>
                          <select
                            value={bookingForm.consultationType}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, consultationType: e.target.value }))}
                            className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-zultys-green focus:outline-none"
                          >
                            <option value="On-Site Survey & Live Phone Demo">📍 Free On-Site Site Survey & Phone Demo (DFW Office)</option>
                            <option value="Virtual Video Demo">💻 Live Interactive Video Demo & Software Walkthrough</option>
                            <option value="Phone Consultation & Instant Quote">📞 Direct Phone Review & Fast Budget Quote</option>
                          </select>
                        </div>
                      </div>

                      {/* Section 3: Contact & City Details */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-zultys-green mb-3">
                          4. Your Contact & Office Details
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Your Full Name *</span>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Sarah Jenkins"
                              value={bookingForm.name}
                              onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-700 text-xs focus:ring-2 focus:ring-zultys-green focus:outline-none"
                            />
                          </div>

                          <div>
                            <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Company / Organization</span>
                            <input
                              type="text"
                              placeholder="e.g. Apex Logistics DFW"
                              value={bookingForm.company}
                              onChange={(e) => setBookingForm(prev => ({ ...prev, company: e.target.value }))}
                              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-700 text-xs focus:ring-2 focus:ring-zultys-green focus:outline-none"
                            />
                          </div>

                          <div>
                            <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Direct Phone Number *</span>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. (817) 555-0199"
                              value={bookingForm.phone}
                              onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-700 text-xs focus:ring-2 focus:ring-zultys-green focus:outline-none"
                            />
                          </div>

                          <div>
                            <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Business Email *</span>
                            <input
                              type="email"
                              required
                              placeholder="e.g. sjenkins@company.com"
                              value={bookingForm.email}
                              onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-700 text-xs focus:ring-2 focus:ring-zultys-green focus:outline-none"
                            />
                          </div>

                          <div>
                            <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">DFW City / Location</span>
                            <input
                              type="text"
                              placeholder="e.g. Fort Worth, Dallas, Plano, Arlington"
                              value={bookingForm.city}
                              onChange={(e) => setBookingForm(prev => ({ ...prev, city: e.target.value }))}
                              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-700 text-xs focus:ring-2 focus:ring-zultys-green focus:outline-none"
                            />
                          </div>

                          <div>
                            <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Preferred Timing / Day</span>
                            <input
                              type="text"
                              placeholder="e.g. Tuesday morning, or ASAP"
                              value={bookingForm.preferredTime}
                              onChange={(e) => setBookingForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-700 text-xs focus:ring-2 focus:ring-zultys-green focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit Bar */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <ShieldCheck className="h-4 w-4 text-emerald-500" />
                          <span>100% Free Consultation. No Obligation. Zero Pressure.</span>
                        </div>

                        <button
                          type="submit"
                          disabled={isBookingSubmitting}
                          className="w-full sm:w-auto bg-gradient-to-r from-zultys-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                        >
                          {isBookingSubmitting ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" /> Submitting Booking...
                            </>
                          ) : (
                            <>
                              <Calendar className="h-4 w-4" /> Confirm Free Consultation
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
