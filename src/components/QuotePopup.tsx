import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Users, Building2, PhoneCall, Send, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface QuotePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;

export function QuotePopup({ isOpen, onClose }: QuotePopupProps) {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userCount: '',
    industry: '',
    currentSystem: '',
    name: '',
    company: '',
    email: '',
    phone: '',
  });

  const nextStep = () => setStep((s) => (s < 4 ? (s + 1) as Step : s));
  const prevStep = () => setStep((s) => (s > 1 ? (s - 1) as Step : s));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          userCount: formData.userCount,
          industry: formData.industry,
          currentSystem: formData.currentSystem,
          subject: `QUICK QUOTE REQUEST: ${formData.company} (${formData.userCount} users)`
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Quote Request Sent!', {
          description: "We'll prepare your custom Zultys quote and contact you shortly."
        });
        
        // Reset and close
        setTimeout(() => {
          onClose();
          setStep(1);
          setFormData({
            userCount: '',
            industry: '',
            currentSystem: '',
            name: '',
            company: '',
            email: '',
            phone: '',
          });
        }, 2000);
      } else {
        toast.error('Submission Failed', {
          description: data.message || 'Please call us at 817-231-2962 for an immediate quote.'
        });
      }
    } catch (error) {
      toast.error('Submission Failed', {
        description: 'Please call us at 817-231-2962 for an immediate quote.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const progress = (step / 4) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-20"
          aria-label="Close"
        >
          <X className="h-6 w-6 text-slate-400" />
        </button>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 z-20">
          <motion.div 
            className="h-full bg-zultys-green"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-8 md:p-12">
          <div className="mb-8">
            <span className="text-zultys-green font-black text-sm uppercase tracking-widest mb-2 block">
              Step {step} of 4
            </span>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              {step === 1 && "How many users need phones?"}
              {step === 2 && "What is your industry?"}
              {step === 3 && "Your current setup?"}
              {step === 4 && "Where should we send the quote?"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {['1-5', '6-20', '21-50', '51-100', '100+'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, userCount: option });
                        nextStep();
                      }}
                      className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${
                        formData.userCount === option 
                        ? 'border-zultys-green bg-zultys-green/5' 
                        : 'border-slate-100 hover:border-zultys-green/30 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="font-black text-xl text-slate-900">{option}</div>
                        <div className="text-sm text-slate-500">Users/Extensions</div>
                      </div>
                      <Users className={`h-6 w-6 ${formData.userCount === option ? 'text-zultys-green' : 'text-slate-200 group-hover:text-zultys-green/50'}`} />
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {['Healthcare', 'Legal', 'Financial', 'Manufacturing', 'Retail', 'Other'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, industry: option });
                        nextStep();
                      }}
                      className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${
                        formData.industry === option 
                        ? 'border-zultys-green bg-zultys-green/5' 
                        : 'border-slate-100 hover:border-zultys-green/30 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-black text-lg text-slate-900">{option}</div>
                      <Building2 className={`h-6 w-6 ${formData.industry === option ? 'text-zultys-green' : 'text-slate-200 group-hover:text-zultys-green/50'}`} />
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {[
                    { id: 'analog', label: 'Analog / Traditional Landlines', icon: PhoneCall },
                    { id: 'voip', label: 'Current VoIP Provider (Cloud)', icon: Send },
                    { id: 'none', label: 'No System / New Business', icon: Info },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, currentSystem: option.label });
                        nextStep();
                      }}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-6 group ${
                        formData.currentSystem === option.label 
                        ? 'border-zultys-green bg-zultys-green/5' 
                        : 'border-slate-100 hover:border-zultys-green/30 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${formData.currentSystem === option.label ? 'bg-zultys-green text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-zultys-green/10 group-hover:text-zultys-green'}`}>
                        <option.icon className="h-6 w-6" />
                      </div>
                      <div className="font-black text-lg text-slate-900">{option.label}</div>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quote-name" className="font-bold text-slate-700">Your Name</Label>
                      <Input
                        id="quote-name"
                        required
                        className="rounded-xl border-slate-200 h-12"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-company" className="font-bold text-slate-700">Company</Label>
                      <Input
                        id="quote-company"
                        required
                        className="rounded-xl border-slate-200 h-12"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote-email" className="font-bold text-slate-700">Work Email</Label>
                    <Input
                      id="quote-email"
                      type="email"
                      required
                      className="rounded-xl border-slate-200 h-12"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote-phone" className="font-bold text-slate-700">Phone Number</Label>
                    <Input
                      id="quote-phone"
                      type="tel"
                      required
                      className="rounded-xl border-slate-200 h-12"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="817-555-0123"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step === 4 ? (
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-zultys-green hover:bg-zultys-green/90 text-white font-black px-10 py-6 rounded-2xl shadow-xl shadow-zultys-green/20 transition-all"
                >
                  {isSubmitting ? 'Sending...' : 'Get My Quote'}
                  {!isSubmitting && <Check className="ml-2 h-5 w-5" />}
                </Button>
              ) : (
                <Button 
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !formData.userCount) ||
                    (step === 2 && !formData.industry) ||
                    (step === 3 && !formData.currentSystem)
                  }
                  className="bg-slate-900 hover:bg-slate-800 text-white font-black px-10 py-6 rounded-2xl transition-all"
                >
                  Continue
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500">
              Need immediate help? Call Leroy at <a href="tel:817-231-2962" className="text-zultys-green font-black hover:underline">817-231-2962</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
