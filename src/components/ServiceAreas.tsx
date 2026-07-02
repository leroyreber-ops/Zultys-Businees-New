import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { HashLink as Link } from './HashLink';

const cities = [
  { name: 'Fort Worth', path: '/fort-worth-zultys-systems' },
  { name: 'Dallas', path: '/dallas-zultys-phones' },
  { name: 'Plano', path: '/plano-zultys-dealer' },
  { name: 'Arlington', path: '/arlington-ip-pbx' },
  { name: 'Frisco', path: '/frisco-voip-solutions' },
  { name: 'Irving', path: '/irving-business-phone-systems' },
  { name: 'Garland', path: '/garland-business-voip' },
  { name: 'Grand Prairie', path: '/grand-prairie-zultys' },
  { name: 'McKinney', path: '/mckinney-zultys-dealer' },
  { name: 'Mesquite', path: '/mesquite-zultys-phone-systems' },
  { name: 'Carrollton', path: '/carrollton-zultys' },
  { name: 'Denton', path: '/denton-business-phone-systems' },
];

export function ServiceAreas() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl mb-4">
            Serving the Entire Dallas-Fort Worth Metroplex
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We provide local on-site installation, training, and 24/7 support for Zultys business phone systems across North Texas.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.name}
              to={city.path}
              className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all group border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zultys-green/10 text-zultys-green group-hover:bg-zultys-green group-hover:text-white transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="font-bold text-slate-700">{city.name}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-zultys-green transition-colors" />
            </Link>
          ))}
        </div>

        <div className="mt-16 p-8 bg-zultys-green rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black mb-2">Don't see your city?</h3>
            <p className="text-zultys-green-light font-medium">
              We cover all of North Texas. Contact us to see if we service your specific location.
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-white text-zultys-green px-8 py-4 rounded-full font-black hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            Check Availability
          </Link>
        </div>
      </div>
    </section>
  );
}
