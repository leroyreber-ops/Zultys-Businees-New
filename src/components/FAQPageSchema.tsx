import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Eye, 
  Terminal, 
  Sparkles,
  RefreshCw,
  Search,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export interface ExtractedFAQ {
  question: string;
  answer: string;
  sourceElement: string; // "H2" | "H3" | "H4" etc
  confidence: 'high' | 'medium';
}

interface FAQPageSchemaProps {
  path?: string;
  headless?: boolean; // If true, only injects schema. If false, renders dashboard visualizer.
}

/**
 * Checks if a heading text resembles a FAQ question.
 */
function isQuestion(text: string): boolean {
  const clean = text.trim().toLowerCase();
  if (clean.endsWith('?')) return true;
  if (clean.startsWith('q:') || clean.startsWith('q.') || clean.startsWith('question:')) return true;
  
  const questionWords = [
    'what', 'how', 'why', 'can', 'is', 'are', 'does', 'do', 'should', 
    'who', 'where', 'which', 'when', 'has', 'have', 'will', 'could', 'would'
  ];
  
  return questionWords.some(word => clean.startsWith(word + ' ') || clean.startsWith(word + "'"));
}

/**
 * Trims and cleans Q: / A: prefixes from questions/answers
 */
function cleanQAString(text: string): string {
  return text
    .replace(/^[qQaA]\s*[:.-]\s*/, '') // Remove "Q:", "A:", "Q.", "A." etc.
    .replace(/\s+/g, ' ')
    .trim();
}

export function FAQPageSchema({ path, headless = true }: FAQPageSchemaProps) {
  const [faqs, setFaqs] = useState<ExtractedFAQ[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [scanToggle, setScanToggle] = useState(false);

  // Perform client-side DOM extraction
  const performDOMExtraction = () => {
    if (typeof window === 'undefined') return;

    try {
      const extractedList: ExtractedFAQ[] = [];
      const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, h5'));

      headingElements.forEach((el) => {
        const rawText = el.textContent || '';
        const text = rawText.trim();

        if (isQuestion(text)) {
          // Found a question heading! Now let's extract the subsequent paragraphs/divs as the answer.
          let sibling = el.nextElementSibling;
          let answerText = '';
          const collectedTags: string[] = [];

          // Keep scanning subsequent siblings until we hit another heading or a new section
          while (sibling) {
            const tagName = sibling.tagName.toLowerCase();
            
            // Stop if we hit another heading
            if (/^h[1-6]$/.test(tagName)) {
              break;
            }

            // If we hit another element containing Q: or a question, stop
            const siblingText = sibling.textContent || '';
            if (isQuestion(siblingText)) {
              break;
            }

            // Collect text content from paragraphs, list items, or general divs
            if (tagName === 'p' || tagName === 'li' || tagName === 'div') {
              const cleanedText = siblingText.trim().replace(/\s+/g, ' ');
              if (cleanedText) {
                // If the sibling element starts with "A:" or "Answer:", clean it up
                const cleanText = cleanQAString(cleanedText);
                if (cleanText) {
                  answerText += (answerText ? ' ' : '') + cleanText;
                  collectedTags.push(tagName);
                }
              }
            }

            // Stop if we already have a long enough answer, to prevent leaking into unrelated sections
            if (answerText.length > 500) {
              break;
            }

            sibling = sibling.nextElementSibling;
          }

          const finalQuestion = cleanQAString(text);
          const finalAnswer = answerText.trim();

          // Validation: Ensure question has characters, and answer has minimum length
          if (finalQuestion.length > 10 && finalAnswer.length > 20) {
            extractedList.push({
              question: finalQuestion,
              answer: finalAnswer,
              sourceElement: el.tagName.toUpperCase(),
              confidence: text.endsWith('?') || text.toLowerCase().startsWith('q:') ? 'high' : 'medium'
            });
          }
        }
      });

      // De-duplicate extracted questions to prevent schema errors
      const uniqueFaqs: ExtractedFAQ[] = [];
      const seenQuestions = new Set<string>();

      extractedList.forEach(faq => {
        const normalizedQ = faq.question.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!seenQuestions.has(normalizedQ)) {
          seenQuestions.add(normalizedQ);
          uniqueFaqs.push(faq);
        }
      });

      setFaqs(uniqueFaqs);
    } catch (err) {
      console.error('Error during FAQ extraction:', err);
    }
  };

  // Run extraction whenever path changes, or after DOM settled
  useEffect(() => {
    // Run after a short delay to allow page hydration/component rendering to complete
    const timer = setTimeout(() => {
      performDOMExtraction();
    }, 500);

    return () => clearTimeout(timer);
  }, [path, scanToggle]);

  // Inject or update JSON-LD FAQ schema in document head
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let scriptEl = document.getElementById('faqpage-jsonld-schema') as HTMLScriptElement | null;

    if (faqs.length > 0) {
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      };

      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'faqpage-jsonld-schema';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schemaData);
    } else {
      // Clean up script tag if no FAQs found
      if (scriptEl) {
        scriptEl.remove();
      }
    }

    return () => {
      // Cleanup script on unmount
      const el = document.getElementById('faqpage-jsonld-schema');
      if (el) {
        el.remove();
      }
    };
  }, [faqs]);

  // Copy Schema to Clipboard
  const copyToClipboard = () => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };

    navigator.clipboard.writeText(JSON.stringify(schemaData, null, 2));
    setIsCopied(true);
    toast.success('FAQPage JSON-LD copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  // If headless mode, we only handle head injection and render nothing in the DOM
  if (headless) {
    return null;
  }

  const generatedSchemaText = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  }, null, 2);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl font-sans" id="faqpage-schema-component">
      
      {/* Visual Header */}
      <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/20 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/15">
              <HelpCircle className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black tracking-tight text-white">FAQPage Structured Schema Auto-Generator</h3>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Scans the currently active page layout to dynamically match questions (H2/H3/H4 headings) with subsequent answers (paragraphs) and builds a valid Google Rich Result schema block.
          </p>
        </div>

        <button
          onClick={() => {
            setScanToggle(!scanToggle);
            toast.info('Re-scanning active DOM for FAQs...');
          }}
          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 transition rounded-xl text-xs font-bold text-emerald-400 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Force Scan
        </button>
      </div>

      {/* Main Content Pane */}
      <div className="p-6">
        {faqs.length === 0 ? (
          <div className="bg-slate-950/40 rounded-2xl border border-slate-800/80 p-8 text-center max-w-lg mx-auto flex flex-col items-center justify-center">
            <AlertCircle className="h-10 w-10 text-slate-600 mb-3" />
            <h4 className="text-sm font-bold text-slate-300">No Eligible FAQ Blocks Extracted</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              We couldn't detect clear heading questions paired with response paragraphs on this specific view. This is normal for administrative dashboards or contact/pricing pages. Navigate to a city or service page in the preview iframe to watch it scan in real-time!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left side: List of Extracted FAQs */}
            <div className="lg:col-span-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" /> Extracted Q&A Nodes ({faqs.length})
              </h4>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl border transition-all ${
                      activeQuestion === index 
                        ? 'bg-slate-850/80 border-emerald-500/40 text-white' 
                        : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                      className="w-full text-left font-bold text-xs flex items-start gap-2.5 cursor-pointer"
                    >
                      <span className="text-[10px] bg-slate-800 text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-emerald-500/10 uppercase shrink-0 mt-0.5">
                        {faq.sourceElement}
                      </span>
                      <span className="flex-1 text-slate-100 pr-2 leading-relaxed">{faq.question}</span>
                      <span className="text-[10px] text-slate-500 font-mono self-center">
                        {activeQuestion === index ? 'Hide' : 'Inspect'}
                      </span>
                    </button>

                    <AnimatePresence>
                      {activeQuestion === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden mt-3 pt-3 border-t border-slate-800/80"
                        >
                          <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-850">
                            {faq.answer}
                          </p>

                          <div className="flex items-center justify-between mt-3 text-3xs text-slate-500 font-mono">
                            <span>Status: Verified Mapping</span>
                            <span className="text-emerald-400 font-bold uppercase">Confidence: {faq.confidence}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Real-time Validation Rules Status */}
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-4 space-y-2">
                <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Google Snippet Compliance Checklist
                </h5>
                <div className="grid grid-cols-2 gap-2 text-3xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Unique Question Mapping
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Dynamic Sibling Splicing
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Strict Head Cleanup (A: / Q:)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Automatic Path Syncing
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Generated Schema JSON-LD Code block & search engine preview */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code className="h-4.5 w-4.5 text-emerald-400" /> Generated JSON-LD Markup
                </h4>

                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 text-emerald-400 hover:text-emerald-300 transition rounded-xl text-3xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {isCopied ? 'Copied!' : 'Copy Schema'}
                </button>
              </div>

              {/* Code Box */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 font-mono text-3xs text-slate-400 max-h-[180px] overflow-auto select-all">
                <pre>{generatedSchemaText}</pre>
              </div>

              {/* Google Rich Snippet Search Result Preview */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-3xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-sky-400" /> Google Search SERP Rich Result Preview
                  </h4>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed">
                    Estimated appearance in Google Search results when schema is indexed.
                  </p>
                </div>

                <div className="bg-white text-slate-900 p-4 rounded-xl border border-gray-200/60 shadow-sm mt-1">
                  <div className="text-[11px] text-gray-500 font-sans truncate">https://dallasfortworthzultys.com › ...</div>
                  <div className="text-sm text-blue-800 font-medium hover:underline cursor-pointer leading-tight mt-0.5 truncate">
                    Zultys Business VoIP Systems & Unified Communications Support
                  </div>
                  <div className="text-xs text-gray-600 leading-normal mt-1 limit-2-lines">
                    Looking for robust business communications in Dallas-Fort Worth? Local certified engineers, on-site setup, and Zultys MX Series solutions.
                  </div>

                  {/* Rich FAQ snippet preview */}
                  <div className="border-t border-gray-100 mt-3 pt-2 space-y-2">
                    {faqs.slice(0, 2).map((faq, idx) => (
                      <div key={idx} className="text-xs font-sans text-gray-800 flex flex-col gap-0.5 pb-1 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="flex items-start gap-1 font-medium text-gray-900">
                          <span className="text-gray-400 shrink-0">▼</span>
                          <span className="leading-relaxed">{faq.question}</span>
                        </div>
                        <div className="text-gray-500 pl-4 leading-relaxed limit-1-line text-3xs">
                          {faq.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}
      </div>

    </div>
  );
}
