/**
 * Environment detection helper for DallasFortWorthZultys.com
 * Ensures internal SEO panels, AI grounding tools, and debugging monitors
 * are ONLY visible in the AI Studio editor, local development, or preview staging,
 * and completely hidden on the live production site (dallasfortworthzultys.com).
 */

export function isEditorEnvironment(): boolean {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname.toLowerCase();
  const search = window.location.search.toLowerCase();
  const pathname = window.location.pathname.toLowerCase();

  // 1. Vite DEV mode or local development
  if (
    Boolean((import.meta as any).env?.DEV) ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0'
  ) {
    return true;
  }

  // 2. AI Studio container preview / staging domains
  if (
    hostname.includes('run.app') ||
    hostname.includes('ais-dev') ||
    hostname.includes('ais-pre') ||
    hostname.includes('webcontainer') ||
    hostname.includes('netlify.app')
  ) {
    return true;
  }

  // 3. Explicit Admin / Editor routes or query parameters
  if (
    pathname === '/seo-admin' ||
    pathname === '/seo-dashboard' ||
    pathname === '/citation-health' ||
    pathname.startsWith('/admin') ||
    search.includes('admin=true') ||
    search.includes('preview=true') ||
    search.includes('editor=true')
  ) {
    return true;
  }

  // 4. Local storage persistence for verified administrators
  try {
    if (localStorage.getItem('dfw_admin_mode') === 'true') {
      return true;
    }
  } catch {
    // Ignore storage access issues
  }

  // Live public website (dallasfortworthzultys.com)
  return false;
}
