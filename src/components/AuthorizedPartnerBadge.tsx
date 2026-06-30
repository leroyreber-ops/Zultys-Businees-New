import { ImageWithFallback } from './figma/ImageWithFallback';

interface AuthorizedPartnerBadgeProps {
  className?: string;
}

export function AuthorizedPartnerBadge({ className = "h-20 w-auto" }: AuthorizedPartnerBadgeProps) {
  return (
    <div className={`bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 border-2 border-blue-200 ${className}`}>
      <ImageWithFallback 
        src="https://images.dallasfortworthzultys.com/fort-worth-zultys-logo.jpg" 
        alt="Fort Worth Zultys - Authorized Dealer & Partner" 
        className="h-12 w-auto"
      />
    </div>
  );
}
