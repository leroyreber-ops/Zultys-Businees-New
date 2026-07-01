import React, { useState, ReactNode } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ReadMoreTextProps {
  children: ReactNode;
  maxLength?: number;
}

export function ReadMoreText({ children, maxLength = 250 }: ReadMoreTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // If children is not a string (e.g., it's JSX/React elements), just show with expand/collapse
  const isStringContent = typeof children === 'string';
  
  if (!isStringContent) {
    // For React elements, always show expand/collapse button
    return (
      <div>
        <div 
          className="leading-relaxed overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isExpanded ? 'none' : '300px',
            position: 'relative'
          }}
        >
          {children}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>
        <Button
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold"
        >
          {isExpanded ? (
            <>
              Read Less <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    );
  }
  
  // For string content, use the original logic
  const text = children as string;
  
  // If text is shorter than maxLength, show it all
  if (text.length <= maxLength) {
    return <div className="leading-relaxed whitespace-pre-wrap">{text}</div>;
  }
  
  // Find a good break point (end of sentence near maxLength)
  const findBreakPoint = (str: string, targetLength: number) => {
    const afterTarget = str.substring(targetLength);
    const nextPeriod = afterTarget.indexOf('. ');
    const nextExclamation = afterTarget.indexOf('! ');
    const nextQuestion = afterTarget.indexOf('? ');
    
    const breakPoints = [nextPeriod, nextExclamation, nextQuestion]
      .filter(bp => bp !== -1)
      .map(bp => targetLength + bp + 1);
    
    if (breakPoints.length > 0) {
      return Math.min(...breakPoints);
    }
    
    return targetLength;
  };
  
  const breakPoint = findBreakPoint(text, maxLength);
  const preview = text.substring(0, breakPoint).trim();
  
  return (
    <div>
      <div className="leading-relaxed whitespace-pre-wrap">
        <span className={isExpanded ? 'hidden' : 'inline'}>
          {preview}...
        </span>
        <span className={isExpanded ? 'inline' : 'sr-only select-none pointer-events-none'}>
          {text}
        </span>
      </div>
      <Button
        variant="link"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold"
      >
        {isExpanded ? (
          <>
            Read Less <ChevronUp className="ml-1 h-4 w-4" />
          </>
        ) : (
          <>
            Read More <ChevronDown className="ml-1 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
