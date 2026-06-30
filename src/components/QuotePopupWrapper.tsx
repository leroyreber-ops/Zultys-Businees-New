import React from 'react';
import { useQuote } from '../context/QuoteContext';
import { QuotePopup } from './QuotePopup';

export function QuotePopupWrapper() {
  const { isQuoteOpen, closeQuote } = useQuote();
  
  return <QuotePopup isOpen={isQuoteOpen} onClose={closeQuote} />;
}
