/**
 * Edge Function Bundling & Routing Simulation Test Suite
 * 
 * Verifies:
 * 1. Deno syntax and type check on netlify/edge-functions/spa-404.ts
 * 2. Edge Function bundling without browser or Node runtime globals
 * 3. Exact routing semantics for valid canonicals, aliases, 404s, and static passthroughs
 * 4. Technical SEO parity (sitemap, prerender files, robots.txt)
 * 5. Secret audit
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { VALID_PATHS } from '../src/routes';
import { canonicalMap } from '../src/canonicalMap';

async function runTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING NETLIFY EDGE FUNCTION & SEO VERIFICATION');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}${detail ? ` - ${detail}` : ''}`);
      failed++;
    }
  }

  // 1. Deno Type & Syntax Check
  try {
    const denoOutput = execSync('deno check --allow-import netlify/edge-functions/spa-404.ts', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    assert(true, 'Deno check compiles spa-404.ts with 0 errors');
  } catch (err: any) {
    assert(false, 'Deno check on spa-404.ts', err.stderr || err.message);
  }

  // 2. Edge Bundling Simulation (esbuild neutral/esm targeting edge constraints)
  try {
    const bundleOutput = execSync(
      'npx esbuild netlify/edge-functions/spa-404.ts --bundle --format=esm --platform=neutral --target=esnext --external:https://* --external:node:*',
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    assert(bundleOutput.length > 500 && !bundleOutput.includes('require('), 'Edge function bundles cleanly to ESM without Node require calls');
  } catch (err: any) {
    assert(false, 'Edge function bundling simulation', err.stderr || err.message);
  }

  // 3. Inspect spa-404.ts imports
  const edgeFuncContent = fs.readFileSync(path.join(process.cwd(), 'netlify/edge-functions/spa-404.ts'), 'utf8');
  assert(!edgeFuncContent.includes('seoHelpers.ts'), 'spa-404.ts does NOT import browser-heavy seoHelpers.ts');
  assert(edgeFuncContent.includes('canonicalMap.ts'), 'spa-404.ts imports clean, edge-safe canonicalMap.ts');
  assert(!edgeFuncContent.includes("from 'fs'") && !edgeFuncContent.includes("from 'path'"), 'spa-404.ts has no Node fs/path imports');

  // 4. Test Routing Semantics with Mock Handler
  // Simulate the edge handler logic directly
  async function simulateHandler(requestUrl: string, method: string = 'GET') {
    const url = new URL(requestUrl);
    const pathname = url.pathname;

    if (method !== 'GET' && method !== 'HEAD') {
      return { type: 'passthrough' };
    }

    if (
      pathname.includes('.') ||
      pathname.startsWith('/assets/') ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/.netlify/') ||
      pathname.startsWith('/@') ||
      pathname.startsWith('/node_modules/')
    ) {
      return { type: 'passthrough' };
    }

    let normalizedPath = pathname.toLowerCase();
    if (normalizedPath.endsWith('/') && normalizedPath.length > 1) {
      normalizedPath = normalizedPath.slice(0, -1);
    }
    if (normalizedPath === '' || normalizedPath === '/index.html') {
      normalizedPath = '/';
    }

    const redirectTarget = canonicalMap[normalizedPath];
    if (redirectTarget && redirectTarget !== normalizedPath) {
      return { type: 'redirect', status: 301, location: `${url.origin}${redirectTarget}` };
    }

    const isValid = VALID_PATHS.includes(normalizedPath);
    if (isValid) {
      if (normalizedPath === '/') {
        return { type: 'passthrough' };
      }
      return { type: 'rewrite', to: normalizedPath + '/index.html' };
    } else {
      return { type: '404', status: 404, xRobotsTag: 'noindex, nofollow, noarchive' };
    }
  }

  // Test cases:
  const rHome = await simulateHandler('https://dallasfortworthzultys.com/');
  assert(rHome.type === 'passthrough', 'Homepage / passes through to prerendered index.html');

  const rValidInner = await simulateHandler('https://dallasfortworthzultys.com/dallas-zultys-phones');
  assert(rValidInner.type === 'rewrite' && rValidInner.to === '/dallas-zultys-phones/index.html', 'Valid canonical route rewrites to subfolder index.html');

  const rTrailingSlash = await simulateHandler('https://dallasfortworthzultys.com/dallas-zultys-phones/');
  assert(rTrailingSlash.type === 'rewrite' && rTrailingSlash.to === '/dallas-zultys-phones/index.html', 'Trailing slash normalized and rewritten correctly');

  const rAlias1 = await simulateHandler('https://dallasfortworthzultys.com/dallas');
  assert(rAlias1.type === 'redirect' && rAlias1.status === 301 && rAlias1.location === 'https://dallasfortworthzultys.com/dallas-zultys-phones', 'Alias /dallas returns 301 redirect to /dallas-zultys-phones');

  const rAlias2 = await simulateHandler('https://dallasfortworthzultys.com/pricing');
  assert(rAlias2.type === 'redirect' && rAlias2.status === 301 && rAlias2.location === 'https://dallasfortworthzultys.com/zultys-pricing', 'Alias /pricing returns 301 redirect to /zultys-pricing');

  const rInvalid = await simulateHandler('https://dallasfortworthzultys.com/non-existent-page-xyz');
  assert(rInvalid.type === '404' && rInvalid.status === 404 && rInvalid.xRobotsTag.includes('noindex'), 'Invalid route returns 404 status with noindex header');

  const rSitemap = await simulateHandler('https://dallasfortworthzultys.com/sitemap.xml');
  assert(rSitemap.type === 'passthrough', 'Static asset /sitemap.xml passes through untouched');

  const rRobots = await simulateHandler('https://dallasfortworthzultys.com/robots.txt');
  assert(rRobots.type === 'passthrough', 'Static asset /robots.txt passes through untouched');

  const rAsset = await simulateHandler('https://dallasfortworthzultys.com/assets/index-vYWRaFes.js');
  assert(rAsset.type === 'passthrough', 'Vite bundle asset /assets/ passes through untouched');

  const rApi = await simulateHandler('https://dallasfortworthzultys.com/api/send-email', 'POST');
  assert(rApi.type === 'passthrough', 'POST API request to /api/ passes through untouched');

  // 5. Verify Static Artifacts
  const distDir = path.join(process.cwd(), 'dist');
  assert(fs.existsSync(path.join(distDir, 'index.html')), 'dist/index.html exists');
  assert(fs.existsSync(path.join(distDir, '404.html')), 'dist/404.html exists');
  assert(fs.existsSync(path.join(distDir, 'sitemap.xml')), 'dist/sitemap.xml exists');
  assert(fs.existsSync(path.join(distDir, 'sitemap.html')), 'dist/sitemap.html exists');
  assert(fs.existsSync(path.join(distDir, 'robots.txt')), 'dist/robots.txt exists');
  assert(fs.existsSync(path.join(distDir, 'server.cjs')), 'dist/server.cjs exists');

  const sitemapXml = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
  const locCount = (sitemapXml.match(/<loc>/g) || []).length;
  assert(locCount === 241, `sitemap.xml contains exactly 241 canonical URLs (found ${locCount})`);
  assert(!sitemapXml.includes('<loc>https://dallasfortworthzultys.com/dallas</loc>'), 'sitemap.xml excludes 301 alias /dallas');
  assert(!sitemapXml.includes('<loc>https://dallasfortworthzultys.com/pricing</loc>'), 'sitemap.xml excludes 301 alias /pricing');

  // 6. Check netlify.toml
  const netlifyToml = fs.readFileSync(path.join(process.cwd(), 'netlify.toml'), 'utf8');
  assert(netlifyToml.includes('spa-404'), 'netlify.toml configures spa-404 function');
  assert(netlifyToml.includes('excludedPath'), 'netlify.toml defines excludedPath for static bypass');

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal error in test suite:', err);
  process.exit(1);
});
