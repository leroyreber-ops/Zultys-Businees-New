import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { injectLinksIntoChildrenRecursive } from '../utils/seoLinker';

interface ReadMoreProps {
  children: React.ReactNode;
  previewContent?: React.ReactNode;
  className?: string;
  initialHeight?: string;
}

export function ReadMore({ children, previewContent, className = "", initialHeight = "max-h-[200px]" }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Apply automatic SEO link injection to long-tail prose paragraphs
  const linkedChildren = React.useMemo(() => {
    return injectLinksIntoChildrenRecursive(children);
  }, [children]);

  const linkedPreviewContent = React.useMemo(() => {
    return previewContent ? injectLinksIntoChildrenRecursive(previewContent) : undefined;
  }, [previewContent]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[5000px]' : initialHeight}`}>
          {linkedPreviewContent ? (
            <>
              <div className={isExpanded ? 'sr-only select-none pointer-events-none' : 'block'}>
                {linkedPreviewContent}
              </div>
              <div className={isExpanded ? 'block' : 'sr-only select-none pointer-events-none'}>
                {linkedChildren}
              </div>
            </>
          ) : (
            linkedChildren
          )}
        </div>
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none z-10" />
        )}
      </div>
      
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
