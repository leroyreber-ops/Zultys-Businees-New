import { Button } from './ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useQuote } from '../context/QuoteContext';

interface CTASectionProps {
  onOpenContactForm?: () => void;
}

export function CTASection({}: CTASectionProps) {
  const { openQuote } = useQuote();
  
  return (
    <section className="relative py-24 overflow-hidden bg-charcoal">
      <div className="absolute inset-0 z-0 opacity-20">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1641084697408-041fff393f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGb3J0JTIwV29ydGglMjBkb3dudG93biUyMHNreWxpbmV8ZW58MXx8fHwxNzcxMDg4MzE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Fort Worth Downtown Skyline - DFW Business Communications Zultys Dealer"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 to-charcoal z-0"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Ready to Transform Your <span className="text-zultys-green">Business Communications?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join hundreds of Fort Worth businesses that trust us for their communication infrastructure. 
            Get a free consultation and discover how we can help your team communicate better.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={openQuote}
              className="bg-zultys-gold hover:bg-zultys-gold/90 text-slate-950 text-lg px-10 py-7 shadow-xl hover:shadow-zultys-gold/20 transition-all font-black border-none hover:scale-[1.02] active:scale-95"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button
              size="lg"
              asChild
              className="bg-zultys-green hover:bg-zultys-green/90 text-white font-black border-none text-lg px-10 py-7 transition-all shadow-xl shadow-zultys-green/20 hover:scale-[1.02] active:scale-95"
            >
              <a href="tel:817-231-2962">
                <Phone className="mr-2 h-6 w-6 text-white animate-pulse" />
                Call 817-231-2962
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
