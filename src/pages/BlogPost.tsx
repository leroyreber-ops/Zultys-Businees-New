import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Calendar, User, BookOpen, ArrowLeft } from 'lucide-react';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';

interface BlogPostProps {
  title: string;
  date: string;
  author: string;
  category: string;
  content: React.ReactNode;
  image: string;
}

export function BlogPost({ title, date, author, category, content, image }: BlogPostProps) {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = `${title} | Zultys Insights`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
              <Link to="/blog" className="inline-flex items-center text-zultys-green font-bold mb-8 hover:text-white transition-colors">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Blog
              </Link>
              <div className="max-w-4xl">
                <span className="bg-zultys-green text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-6 inline-block">
                  {category}
                </span>
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                  {title}
                </h1>
                <div className="flex items-center gap-6 text-white/80 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-zultys-green" />
                    {date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-zultys-green" />
                    By {author}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <article className="py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="prose prose-lg prose-slate max-w-none">
              {content}
            </div>
            
            <div className="mt-16 p-12 bg-slate-50 rounded-[3rem] border border-slate-100 text-center">
              <h3 className="text-2xl font-black text-slate-900 mb-4">Want to learn more?</h3>
              <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                Our team of Zultys experts is ready to help you optimize your business communications in the Dallas-Fort Worth area.
              </p>
              <Button 
                onClick={openQuote}
                className="bg-zultys-green hover:bg-zultys-green/90 text-white font-black px-10 py-6 rounded-full text-lg"
              >
                Get a Free Consultation
              </Button>
            </div>
          </div>
        </article>

        <CTASection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
