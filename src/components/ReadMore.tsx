import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ReadMoreProps {
  children: React.ReactNode;
  previewContent?: React.ReactNode;
  className?: string;
  initialHeight?: string;
}

export function ReadMore({ children, previewContent, className = "", initialHeight = "max-h-[200px]" }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[5000px]' : initialHeight}`}>
        {previewContent && !isExpanded ? previewContent : children}
      </div>
      
      {!isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}
      
      <div className="mt-4 flex justify-center">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-zultys-green font-black hover:bg-zultys-green/5 flex items-center gap-2"
        >
          {isExpanded ? (
            <>
              Read Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
