import React, { useState, useEffect, useRef } from 'react';

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  aspectRatio?: string | number;
}

const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
const TRANSPARENT_PIXEL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const { src, alt, style, className, loading = 'lazy', aspectRatio, ...rest } = props;
  const [error, setError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (loading === 'eager' || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px 0px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, loading]);

  const handleError = () => {
    console.error('Image failed to load:', src);
    setError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  let resolvedAspectRatio: string | number | undefined = aspectRatio;
  
  if (!resolvedAspectRatio) {
    if (src?.includes('logo') || src?.includes('Logo') || className?.includes('w-16') || className?.includes('w-20')) {
      resolvedAspectRatio = '1/1';
    } else if (src?.includes('bg') || src?.includes('skyline') || src?.includes('background') || className?.includes('h-full')) {
      resolvedAspectRatio = '16/9';
    } else {
      resolvedAspectRatio = '16/10';
    }
  }

  const combinedStyle: React.CSSProperties = {
    ...style,
    aspectRatio: resolvedAspectRatio ? String(resolvedAspectRatio) : undefined,
    transition: 'opacity 0.4s ease-in-out',
    opacity: isLoaded ? 1 : 0.5,
  };

  if (error) {
    return (
      <div 
        className={`inline-block bg-red-50 dark:bg-red-950/20 border border-red-200 text-center align-middle ${className ?? ''}`}
        style={{ ...style, aspectRatio: resolvedAspectRatio ? String(resolvedAspectRatio) : undefined }}
        title={`Failed to load: ${src}`}
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-4 min-h-[100px]">
          <img src={FALLBACK_IMAGE} alt="Error loading image" className="mb-2 opacity-50 w-8 h-8" />
          <p className="text-[10px] text-red-600 dark:text-red-400 break-all max-w-full">
            Failed to load image
          </p>
        </div>
      </div>
    );
  }

  const displaySrc = isIntersecting ? src : TRANSPARENT_PIXEL;
  const loadingClasses = !isLoaded 
    ? 'animate-pulse bg-slate-200 dark:bg-slate-800/40' 
    : '';

  return (
    <img 
      ref={imgRef}
      src={displaySrc} 
      alt={alt} 
      className={`${loadingClasses} ${className ?? ''}`}
      style={combinedStyle}
      onLoad={handleLoad}
      onError={handleError}
      loading={loading}
      {...rest}
    />
  );
}

