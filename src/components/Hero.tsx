import React from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ZULTYS_FORT_WORTH_BG } from '../constants/images';

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  icon: React.ElementType;
  iconLabel: string;
  buttonText: string;
  onButtonClick: () => void;
  imageSrc?: string;
  imageAlt?: string;
}

export function Hero({ title, subtitle, icon: Icon, iconLabel, buttonText, onButtonClick }: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src={ZULTYS_FORT_WORTH_BG}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Subtle dark tint to ensure white text is legible on any background */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 w-full pt-20 pb-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-zultys-green/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-zultys-green/30">
            <Icon className="h-5 w-5 text-zultys-green" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">{iconLabel}</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight text-white tracking-tight drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-xl lg:text-2xl mb-12 text-white leading-relaxed max-w-3xl drop-shadow-xl font-medium">
            {subtitle}
          </p>
          <Button
            size="lg"
            onClick={onButtonClick}
            className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-8 shadow-2xl transition-all font-bold"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
