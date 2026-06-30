import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Home, Phone, ArrowLeft } from 'lucide-react';
import { HashLink as Link } from '../components/HashLink';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-zultys-green/10 rounded-full mb-8">
            <span className="text-5xl font-black text-zultys-green">404</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Oops! It looks like the page you're looking for has moved or doesn't exist. Let's get you back on track with your business communications.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/">
              <Button className="bg-zultys-green hover:bg-zultys-green/90 text-white font-black px-10 py-8 text-xl rounded-full shadow-xl w-full sm:w-auto">
                <Home className="mr-2 h-6 w-6" />
                Back to Home
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-2 border-slate-200 text-slate-600 font-black px-10 py-8 text-xl rounded-full hover:bg-slate-50 w-full sm:w-auto">
                <Phone className="mr-2 h-6 w-6" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
