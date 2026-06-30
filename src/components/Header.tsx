import React, { useState, useRef } from 'react';
import { HashLink as Link, useLocation, useNavigate } from './HashLink';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { QuotePopup } from './QuotePopup';
import { useQuote } from '../context/QuoteContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const { openQuote } = useQuote();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use refs to store timers so they persist across renders
  const productsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const solutionsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (href: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(href);
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    setSolutionsDropdownOpen(false);
  };
  
  // Handle products dropdown with delay
  const handleProductsMouseEnter = () => {
    if (productsTimerRef.current) {
      clearTimeout(productsTimerRef.current);
    }
    setProductsDropdownOpen(true);
  };
  
  const handleProductsMouseLeave = () => {
    productsTimerRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 300); // 300ms delay before closing
  };
  
  // Handle solutions dropdown with delay
  const handleSolutionsMouseEnter = () => {
    if (solutionsTimerRef.current) {
      clearTimeout(solutionsTimerRef.current);
    }
    setSolutionsDropdownOpen(true);
  };
  
  const handleSolutionsMouseLeave = () => {
    solutionsTimerRef.current = setTimeout(() => {
      setSolutionsDropdownOpen(false);
    }, 300); // 300ms delay before closing
  };

  const productCategories = [
    {
      title: 'Unified Communications',
      items: [
        { name: 'ZAC - Zultys Advanced Communicator', href: '/fort-worth-zultys-zac' },
        { name: 'Mobile ZAC', href: '/fort-worth-zultys-mxmobile' },
        { name: 'Integrated Contact Center', href: '/fort-worth-zultys-contact-center' },
      ],
    },
    {
      title: 'Business Phone Systems',
      items: [
        { name: 'Zultys Business Phone Systems', href: '/fort-worth-zultys-business-phone-systems' },
        { name: 'Zultys MX Series', href: '/fort-worth-zultys-mx-series' },
        { name: 'Zultys MX-SE', href: '/fort-worth-zultys-mx-se' },
        { name: 'Cloud Services', href: '/fort-worth-zultys-cloud-services' },
        { name: 'MXmobile', href: '/fort-worth-zultys-mxmobile' },
      ],
    },
    {
      title: 'Collaboration & Meeting Tools',
      items: [
        { name: 'MXconference - Video Conferencing', href: '/fort-worth-zultys-mxconference' },
        { name: 'MXmeeting - Team Collaboration', href: '/fort-worth-zultys-mxconference' },
        { name: 'MXie - Desktop Softphone', href: '/fort-worth-zultys-mx-series' },
      ],
    },
    {
      title: 'Hardware',
      items: [
        { name: 'Zultys IP Phones', href: '/dallas-zultys-phones', hasSubmenu: true },
      ],
      submenu: [
        { name: 'ZIP 49GA - Executive Phone', href: '/fort-worth-zultys-zip-49g-phone' },
        { name: 'ZIP 47GE - Professional Phone', href: '/fort-worth-zultys-zip-47g-phone' },
        { name: 'ZIP 45G - Standard Phone', href: '/fort-worth-zultys-zip-45g-phone' },
        { name: 'ZIP 43G - Value Phone', href: '/fort-worth-zultys-zip-43g-phone' },
        { name: 'Z 23GE - Entry Color Phone', href: '/fort-worth-zultys-z-23ge-phone' },
        { name: 'Z 22G - Basic Gigabit Phone', href: '/fort-worth-zultys-z-22g-phone' },
        { name: 'Z 21i - Value Entry Phone', href: '/fort-worth-zultys-z-21i-phone' },
      ],
    },
  ];

  const solutionCategories = [
    {
      title: 'Industry Solutions',
      items: [
        { name: 'Healthcare', href: '/fort-worth-zultys-healthcare' },
        { name: 'Education', href: '/fort-worth-zultys-education' },
        { name: 'Professional Services', href: '/fort-worth-zultys-professional-services' },
        { name: 'Real Estate', href: '/fort-worth-zultys-real-estate' },
        { name: 'Retail & Automotive', href: '/fort-worth-zultys-retail-automotive' },
      ],
    },
    {
      title: 'Business Type',
      items: [
        { name: 'Small Business (1-20)', href: '/fort-worth-zultys-phone-system-small-business' },
        { name: 'Multi-Location', href: '/fort-worth-zultys-multi-location' },
        { name: 'Enterprise (100+)', href: '/fort-worth-zultys-enterprise' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-charcoal/10 bg-charcoal text-white shadow-lg">
      {/* Top Bar with Contact Info */}
      <div className="bg-zultys-green text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:817-231-2962" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">817-231-2962</span>
              </a>
              <span className="hidden md:inline text-white/90">Fort Worth's Premier Zultys Dealer</span>
            </div>
            <div className="text-xs text-white/80">
              Serving Dallas-Fort Worth & Beyond
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <button onClick={() => handleNavigation('/')} className="group -m-1.5 p-1.5 cursor-pointer">
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-black text-white group-hover:text-zultys-green transition-all duration-300">
                  Dallas Fort Worth <span className="text-zultys-green">Zultys</span>
                </span>
                <span className="text-xs text-zultys-gold font-medium tracking-wide">Business Communication Solutions</span>
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-1 items-center">
            <button
              onClick={() => handleNavigation('/')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-white/10 text-zultys-green' 
                  : 'text-white/90 hover:bg-white/5 hover:text-white'
              }`}
            >
              Home
            </button>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleProductsMouseEnter}
              onMouseLeave={handleProductsMouseLeave}
            >
              <button
                onClick={() => handleNavigation('/products')}
                className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-white/90 hover:bg-white/5 hover:text-white transition-all duration-200"
              >
                Products
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {productsDropdownOpen && (
                <div className="dropdown-scrollable absolute left-0 top-full mt-2 w-[800px] bg-white rounded-xl shadow-2xl border border-gray-100 p-8 grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-200px)] overflow-y-auto overscroll-contain" style={{ scrollbarWidth: 'thin', scrollbarColor: '#00A82D #e5e7eb' }}>
                  {productCategories.map((category, idx) => (
                    <div key={idx}>
                      <h3 className="font-bold text-charcoal mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                        <div className="h-1 w-8 bg-zultys-green rounded-full"></div>
                        {category.title}
                      </h3>
                      <div className="space-y-1">
                        {category.items.map((item, itemIdx) => (
                          <button
                            key={itemIdx}
                            onClick={() => handleNavigation(item.href)}
                            className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-zultys-green/5 hover:text-zultys-green rounded-lg transition-all duration-200 font-medium"
                          >
                            {item.name}
                          </button>
                        ))}
                        {category.submenu && (
                          <div className="pl-4 mt-2 space-y-1 border-l-2 border-zultys-green/20">
                            {category.submenu.map((submenuItem, submenuIdx) => (
                              <button
                                key={submenuIdx}
                                onClick={() => handleNavigation(submenuItem.href)}
                                className="block w-full text-left px-3 py-2 text-xs text-gray-500 hover:bg-zultys-green/5 hover:text-zultys-green rounded-md transition-all duration-200"
                              >
                                {submenuItem.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleSolutionsMouseEnter}
              onMouseLeave={handleSolutionsMouseLeave}
            >
              <button
                onClick={() => handleNavigation('/solutions')}
                className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-white/90 hover:bg-white/5 hover:text-white transition-all duration-200"
              >
                Solutions
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {solutionsDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-[550px] bg-white rounded-xl shadow-2xl border border-gray-100 p-8 grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2 duration-200">
                  {solutionCategories.map((category, idx) => (
                    <div key={idx}>
                      <h3 className="font-bold text-charcoal mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                        <div className="h-1 w-8 bg-zultys-green rounded-full"></div>
                        {category.title}
                      </h3>
                      <div className="space-y-1">
                        {category.items.map((item, itemIdx) => (
                          <button
                            key={itemIdx}
                            onClick={() => handleNavigation(item.href)}
                            className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-zultys-green/5 hover:text-zultys-green rounded-lg transition-all duration-200 font-medium"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigation('/about')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/about') 
                  ? 'bg-white/10 text-zultys-green' 
                  : 'text-white/90 hover:bg-white/5 hover:text-white'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavigation('/blog')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/blog') 
                  ? 'bg-white/10 text-zultys-green' 
                  : 'text-white/90 hover:bg-white/5 hover:text-white'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => handleNavigation('/contact')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/contact') 
                  ? 'bg-white/10 text-zultys-green' 
                  : 'text-white/90 hover:bg-white/5 hover:text-white'
              }`}
            >
              Contact
            </button>
          </div>

          {/* CTA button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button 
              onClick={openQuote}
              className="bg-zultys-green hover:bg-zultys-green/90 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-charcoal max-h-[calc(100vh-120px)] overflow-y-auto overscroll-contain">
          <div className="space-y-2 px-6 pb-6 pt-6">
            <button
              onClick={openQuote}
              className="flex items-center justify-center w-full rounded-lg bg-zultys-green px-3 py-3 text-white font-black mb-4 shadow-lg"
            >
              GET A FREE QUOTE
            </button>
            <button
              onClick={() => handleNavigation('/')}
              className={`block w-full text-left rounded-lg px-3 py-2 transition-colors ${
                isActive('/') ? 'bg-white/10 text-zultys-green font-semibold' : 'text-white/80 hover:bg-white/5'
              }`}
            >
              Home
            </button>

            {/* Mobile Products Section */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="flex items-center justify-between w-full text-left rounded-lg px-3 py-2 font-semibold text-white hover:bg-white/5"
              >
                Products
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileProductsOpen && (
                <div className="pl-4 space-y-2">
                  {productCategories.map((category, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xs font-semibold text-white/50 uppercase tracking-wide px-3 py-1">
                        {category.title}
                      </div>
                      {category.items.map((item, itemIdx) => (
                        <button
                          key={itemIdx}
                          onClick={() => handleNavigation(item.href)}
                          className="block w-full text-left rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-zultys-green"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Solutions Section */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="flex items-center justify-between w-full text-left rounded-lg px-3 py-2 font-semibold text-white hover:bg-white/5"
              >
                Solutions
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileSolutionsOpen && (
                <div className="pl-4 space-y-2">
                  {solutionCategories.map((category, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xs font-semibold text-white/50 uppercase tracking-wide px-3 py-1">
                        {category.title}
                      </div>
                      {category.items.map((item, itemIdx) => (
                        <button
                          key={itemIdx}
                          onClick={() => handleNavigation(item.href)}
                          className="block w-full text-left rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-zultys-green"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigation('/about')}
              className={`block w-full text-left rounded-lg px-3 py-2 transition-colors ${
                isActive('/about') ? 'bg-white/10 text-zultys-green font-semibold' : 'text-white/80 hover:bg-white/5'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavigation('/blog')}
              className={`block w-full text-left rounded-lg px-3 py-2 transition-colors ${
                isActive('/blog') ? 'bg-white/10 text-zultys-green font-semibold' : 'text-white/80 hover:bg-white/5'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => handleNavigation('/contact')}
              className={`block w-full text-left rounded-lg px-3 py-2 transition-colors ${
                isActive('/contact') ? 'bg-white/10 text-zultys-green font-semibold' : 'text-white/80 hover:bg-white/5'
              }`}
            >
              Contact
            </button>

            <div className="pt-4 mt-4 border-t border-white/10">
              <a
                href="tel:817-231-2962"
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-zultys-green px-3 py-2 text-white hover:bg-zultys-green/90 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="font-semibold">817-231-2962</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
