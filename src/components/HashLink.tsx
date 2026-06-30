import React, { AnchorHTMLAttributes } from 'react';

interface HashLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children: React.ReactNode;
}

export function HashLink({ to, children, className, ...props }: HashLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };

  // Filter out Figma-specific props that shouldn't be passed to DOM elements
  const {
    _fgT,
    _fgt,
    _fgS,
    _fgs,
    _fgB,
    _fgb,
    _fgI,
    _fgi,
    _fgC,
    _fgc,
    ...filteredProps
  } = props as any;

  return (
    <a href={to} onClick={handleClick} className={className} {...filteredProps}>
      {children}
    </a>
  );
}

// Hook replacements
export function useLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: null,
    key: 'default',
  };
}

export function useNavigate() {
  return (to: string | number) => {
    if (typeof to === 'number') {
      window.history.go(to);
    } else {
      window.history.pushState({}, '', to);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo(0, 0);
    }
  };
}
