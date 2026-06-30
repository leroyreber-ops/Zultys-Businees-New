import { useEffect } from 'react';
import { useQuote } from '../context/QuoteContext';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const { openQuote } = useQuote();
  
  useEffect(() => {
    if (isOpen) {
      openQuote();
      onClose();
    }
  }, [isOpen, openQuote, onClose]);

  return null;
}
