import React, { useState } from 'react';

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  const handleError = () => {
    console.error('Image failed to load:', props.src);
    setError(true);
  };

  const { src, alt, style, className, ...rest } = props;

  if (error) {
    return (
      <div 
        className={`inline-block bg-red-50 border-2 border-red-300 text-center align-middle ${className ?? ''}`}
        style={style}
        title={`Failed to load: ${src}`}
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
          <img src={FALLBACK_IMAGE} alt="Error loading image" className="mb-2" />
          <p className="text-xs text-red-600 break-all max-w-full">
            Failed to load:<br />{src}
          </p>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      style={style}
      {...rest}
      onError={handleError}
    />
  );
}
