import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Calendar, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export function HeroAIConciergeCard() {
  const [activeMode, setActiveMode] = useState<'chat' | 'book'>('chat');
  const [question, setQuestion] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: "👋 Hi! I'm your DFW Zultys AI Concierge. Ask me about cloud vs on-premise pricing, phone models, or book your free on-site survey!"
    }
  ]);

  // Booking mini-state
  const [bookData, setBookData] = useState({
    service: 'Cloud Hosted PBX ($19-$35/seat)',
    seats: '6-20',
    name: '',
    phone: '',
  });
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const quickPrompts = [
    "💰 Cost for 15 users?",
    "☁️ Cloud vs On-Prem?",
    "🔄 Keep our numbers?",
    "📅 Book free site survey"
  ];

  const handleAsk = async (userPrompt: string) => {
    if (!userPrompt.trim() || isAnswering) return;

    if (userPrompt.includes('Book free site survey')) {
      setActiveMode('book');
      return;
    }

    const currentText = userPrompt;
    setQuestion('');
    setChatHistory(prev => [...prev, { role: 'user', text: currentText }]);
    setIsAnswering(true);

    try {
      const res = await fetch('/api/ai-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentText,
          conversationHistory: chatHistory.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            text: m.text
          })),
          contextPage: '/'
        })
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setChatHistory(prev => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        throw new Error('No reply');
      }
    } catch (e) {
      setChatHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          text: "We provide Cloud Hosted PBX ($19-$35/mo) and On-Premise MX250 appliances with zero seat fees across Dallas–Fort Worth. Call 817-231-2962 or click Book Survey to reserve a demo!" 
        }
      ]);
    } finally {
      setIsAnswering(false);
    }
  };

  const handleQuickBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookData.name || !bookData.phone) {
      toast.error('Please enter your name and phone number');
      return;
    }

    setIsSubmittingBooking(true);
    try {
      const res = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: bookData.service,
          userCount: bookData.seats,
          name: bookData.name,
          phone: bookData.phone,
          consultationType: 'On-site Survey & Live Demo',
          city: 'Dallas / Fort Worth Metroplex'
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsBooked(true);
        toast.success('Consultation booked! Our DFW technician will reach out.');
      }
    } catch {
      setIsBooked(true);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg rounded-[2rem] bg-slate-900/90 backdrop-blur-2xl border border-white/20 shadow-[0_30px_90px_rgba(0,168,45,0.35)] overflow-hidden flex flex-col">
      {/* Header Bar */}
      <div className="bg-slate-950/80 px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <div className="bg-gradient-to-tr from-zultys-green to-emerald-400 p-1.5 rounded-lg text-slate-950 font-black shadow-inner">
              <Bot className="h-4 w-4 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white tracking-tight">AI Telecom Concierge</span>
              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Live AI</span>
            </div>
            <span className="text-[10px] text-slate-400 block -mt-0.5">Dallas–Fort Worth Booking & Q&A</span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            type="button"
            onClick={() => setActiveMode('chat')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              activeMode === 'chat'
                ? 'bg-zultys-green text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ask AI
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('book')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              activeMode === 'book'
                ? 'bg-zultys-gold text-slate-950 shadow-sm font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Book Free
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between min-h-[300px] max-h-[340px]">
        {activeMode === 'chat' ? (
          <div className="flex-1 flex flex-col justify-between space-y-3">
            {/* Messages box */}
            <div className="overflow-y-auto space-y-2.5 pr-1 max-h-[190px] scrollbar-thin scrollbar-thumb-slate-700">
              {chatHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    item.role === 'user'
                      ? 'bg-zultys-green text-white ml-auto max-w-[85%] font-medium rounded-tr-xs shadow-md'
                      : 'bg-slate-800/90 text-slate-200 mr-auto max-w-[90%] rounded-tl-xs border border-slate-700/80 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{item.text}</p>
                </div>
              ))}
              {isAnswering && (
                <div className="bg-slate-800/90 text-slate-300 text-xs p-3 rounded-2xl rounded-tl-xs border border-slate-700/80 mr-auto flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-400">Consulting DFW telecom database...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Pills */}
            <div className="flex gap-1.5 overflow-x-auto py-1 no-scrollbar">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAsk(prompt)}
                  disabled={isAnswering}
                  className="whitespace-nowrap text-[11px] font-semibold bg-slate-800/90 hover:bg-slate-750 text-slate-200 hover:text-white px-2.5 py-1 rounded-full border border-slate-700 transition-colors flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk(question);
              }}
              className="flex items-center gap-2 pt-1 border-t border-white/10"
            >
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about VoIP pricing, phones, Teams..."
                className="flex-1 bg-slate-800/90 text-white placeholder-slate-400 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-zultys-green"
              />
              <button
                type="submit"
                disabled={!question.trim() || isAnswering}
                className="bg-zultys-green hover:bg-emerald-600 disabled:opacity-50 text-white p-2.5 rounded-xl shadow-md transition-all flex items-center justify-center"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            {isBooked ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-base font-extrabold text-white">Survey Requested!</h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  Our DFW telecommunications engineer will contact you shortly at <span className="text-zultys-gold font-bold">{bookData.phone}</span>.
                </p>
                <button
                  onClick={() => {
                    setIsBooked(false);
                    setActiveMode('chat');
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-white underline pt-2"
                >
                  Return to AI Chat
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickBook} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Service</label>
                    <select
                      value={bookData.service}
                      onChange={(e) => setBookData(p => ({ ...p, service: e.target.value }))}
                      className="w-full bg-slate-800 text-white text-xs px-2.5 py-2 rounded-xl border border-slate-700 focus:outline-none"
                    >
                      <option>Cloud PBX ($19-$35/mo)</option>
                      <option>On-Prem MX250 IP-PBX</option>
                      <option>Microsoft Teams VoIP</option>
                      <option>Contact Center / Queues</option>
                      <option>Emergency DFW Repair</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Seats / Users</label>
                    <select
                      value={bookData.seats}
                      onChange={(e) => setBookData(p => ({ ...p, seats: e.target.value }))}
                      className="w-full bg-slate-800 text-white text-xs px-2.5 py-2 rounded-xl border border-slate-700 focus:outline-none"
                    >
                      <option>1-5 Users</option>
                      <option>6-20 Users</option>
                      <option>21-50 Users</option>
                      <option>51-100 Users</option>
                      <option>100+ Users</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Leroy R."
                      value={bookData.name}
                      onChange={(e) => setBookData(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-slate-800 text-white text-xs px-2.5 py-2 rounded-xl border border-slate-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(817) 555-0199"
                      value={bookData.phone}
                      onChange={(e) => setBookData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-slate-800 text-white text-xs px-2.5 py-2 rounded-xl border border-slate-700 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="w-full mt-2 bg-gradient-to-r from-zultys-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-black py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmittingBooking ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Reserving...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-3.5 w-3.5" /> Confirm Free Site Survey
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Footer Dispatch Pill */}
      <div className="bg-slate-950/90 px-5 py-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Authorized DFW Field Dispatch</span>
        </div>
        <a 
          href="tel:817-231-2962" 
          className="font-bold text-zultys-gold hover:underline flex items-center gap-1"
        >
          <Phone className="h-3 w-3" /> 817-231-2962
        </a>
      </div>
    </div>
  );
}
