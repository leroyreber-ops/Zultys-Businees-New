import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { HashLink as Link } from '../components/HashLink';
import { useQuote } from '../context/QuoteContext';

const posts = [
  {
    id: 1,
    title: "Why Zultys is the Best Choice for DFW Small Businesses in 2026",
    excerpt: "Discover why local businesses in Fort Worth and Dallas are moving away from national hosted providers to Zultys unified communications.",
    date: "April 10, 2026",
    author: "Leroy Reber",
    category: "Industry Insights",
    image: "https://picsum.photos/seed/business/800/600",
    slug: "why-zultys-is-the-best-choice-for-dfw-small-businesses"
  },
  {
    id: 2,
    title: "On-Premise vs. Cloud: Which Zultys Deployment is Right for You?",
    excerpt: "We break down the pros and cons of cloud-based vs. on-site phone systems to help you make the best decision for your office.",
    date: "March 28, 2026",
    author: "Leroy Reber",
    category: "Technical Guide",
    image: "https://picsum.photos/seed/tech/800/600",
    slug: "on-premise-vs-cloud-which-zultys-deployment-is-right-for-you"
  },
  {
    id: 3,
    title: "How to Optimize Your Office Network for VOIP Performance",
    excerpt: "Don't let dropped calls ruin your business. Learn the essential network configurations needed for crystal-clear Zultys voice quality.",
    date: "March 15, 2026",
    author: "Leroy Reber",
    category: "Best Practices",
    image: "https://picsum.photos/seed/network/800/600",
    slug: "how-to-optimize-your-office-network-for-voip-performance"
  }
];

export function Blog() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Zultys Insights & News | Dallas Fort Worth Zultys';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Stay updated with the latest Zultys news, VOIP guides, and unified communications insights for Dallas-Fort Worth businesses.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <Hero
          title="Zultys Insights & News"
          subtitle="Expert advice on business communications, VOIP technology, and unified communications for the Dallas-Fort Worth metroplex."
          icon={BookOpen}
          iconLabel="Resource Center"
          buttonText="Get a Free Consultation"
          onButtonClick={openQuote}
        />

        <section className="py-12 bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-zultys-green rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900">Quick Blog Index</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-4 px-4 text-sm font-black text-slate-900 uppercase tracking-wider">Post</th>
                    <th className="py-4 px-4 text-sm font-black text-slate-900 uppercase tracking-wider">Category</th>
                    <th className="py-4 px-4 text-sm font-black text-slate-900 uppercase tracking-wider">Date</th>
                    <th className="py-4 px-4 text-sm font-black text-slate-900 uppercase tracking-wider">Author</th>
                    <th className="py-4 px-4 text-sm font-black text-slate-900 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-slate-200 hover:bg-white transition-colors group">
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={post.image} 
                            alt="" 
                            className="h-12 w-12 rounded-lg object-cover shadow-sm"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-zultys-green transition-colors">{post.title}</div>
                            <div className="text-sm text-slate-500 line-clamp-1">{post.excerpt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-6 px-4 text-sm text-slate-600 whitespace-nowrap">{post.date}</td>
                      <td className="py-6 px-4 text-sm text-slate-600">{post.author}</td>
                      <td className="py-6 px-4">
                        <Link to={`/blog/${post.slug}`} className="text-zultys-green hover:text-zultys-green/80 font-bold text-sm flex items-center gap-1">
                          Read <ArrowRight className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post) => (
                <Card key={post.id} className="flex flex-col overflow-hidden border-none shadow-xl rounded-[2.5rem] group hover:translate-y-[-10px] transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-zultys-green text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-zultys-green transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <Button 
                        variant="ghost" 
                        className="w-fit p-0 text-zultys-green font-black hover:bg-transparent hover:text-zultys-green/80 group/btn"
                      >
                        Read Full Article
                        <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
