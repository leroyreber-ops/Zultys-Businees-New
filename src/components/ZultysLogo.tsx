import { ImageWithFallback } from './figma/ImageWithFallback';

interface ZultysLogoProps {
  className?: string;
}

export function ZultysLogo({ className = "h-16" }: ZultysLogoProps) {
  return (
    <ImageWithFallback 
      src="https://images.dallasfortworthzultys.com/fort-worth-zultys-logo.jpg" 
      alt="Zultys VoIP Phone Systems and Unified Communications" 
      className={className}
    />
  );
}
