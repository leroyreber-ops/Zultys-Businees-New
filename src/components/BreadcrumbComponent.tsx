import React, { useState, useEffect } from 'react';
import { HashLink as Link } from './HashLink';
import { Home, ChevronRight } from 'lucide-react';
import { getBreadcrumbs } from './Breadcrumbs';

export function BreadcrumbComponent() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const segments = getBreadcrumbs(pathname);

  // If there are no segments, we are likely on the Home page, where breadcrumbs are not displayed.
  // However, we still generate a fallback list for schema generation.
  const fullList = [{ label: 'Home', href: '/' }, ...segments];

  useEffect(() => {
    const domain = 'https://dallasfortworthzultys.com';
    
    // Construct the BreadcrumbList JSON-LD structure
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': fullList.map((item, index) => {
        // Build the absolute canonical URL
        const itemUrl = item.href 
          ? `${domain}${item.href}` 
          : `${domain}${pathname}`;
        
        return {
          '@type': 'ListItem',
          'position': index + 1,
          'name': item.label,
          'item': itemUrl
        };
      })
    };

    // Find or create script element in document head
    let scriptEl = document.getElementById('breadcrumb-jsonld-head') as HTMLScriptElement | null;
    
    if (segments.length > 0) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'breadcrumb-jsonld-head';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schemaData);
    } else {
      // If we are on the homepage or no segments, clean up the script tag if it exists
      if (scriptEl) {
        scriptEl.remove();
      }
    }

    // Cleanup on unmount or route change
    return () => {
      const el = document.getElementById('breadcrumb-jsonld-head');
      if (el) {
        el.remove();
      }
    };
  }, [pathname, segments]);

  if (segments.length === 0) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb"
      className="bg-gray-50/80 backdrop-blur-md border-b border-gray-100 py-3 text-sm"
      id="breadcrumb-component-nav"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2.5 text-xs md:text-sm text-gray-500 font-medium">
          {fullList.map((item, index) => {
            const isLast = index === fullList.length - 1;

            return (
              <li key={index} className="flex items-center gap-2.5">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" aria-hidden="true" />
                )}

                {isLast ? (
                  <span 
                    className="text-gray-900 font-semibold truncate max-w-[200px] md:max-w-md"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href || '/'}
                    className="flex items-center gap-1.5 hover:text-zultys-green transition-colors duration-200"
                  >
                    {index === 0 && (
                      <Home className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                    )}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
