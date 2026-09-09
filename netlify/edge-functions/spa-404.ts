import type { Context } from "https://edge.netlify.com";
import { VALID_PATHS } from "../../src/routes.ts";
import { canonicalMap } from "../../src/canonicalMap.ts";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Only handle GET and HEAD requests
  if (request.method !== "GET" && request.method !== "HEAD") {
    return;
  }

  // Let static assets, API paths, and Netlify internal/system paths pass through untouched
  if (
    pathname.includes(".") || 
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/api/") || 
    pathname.startsWith("/.netlify/") ||
    pathname.startsWith("/@") ||
    pathname.startsWith("/node_modules/")
  ) {
    return;
  }

  // Normalize path: lowercase and strip trailing slash
  let normalizedPath = pathname.toLowerCase();
  if (normalizedPath.endsWith("/") && normalizedPath.length > 1) {
    normalizedPath = normalizedPath.slice(0, -1);
  }
  if (normalizedPath === "" || normalizedPath === "/index.html") {
    normalizedPath = "/";
  }

  // 1. Check if normalized path requires a 301 Permanent Redirect
  const redirectTarget = canonicalMap[normalizedPath];
  if (redirectTarget && redirectTarget !== normalizedPath) {
    return Response.redirect(`${url.origin}${redirectTarget}`, 301);
  }

  // 2. Check if normalized path is in the valid routes array
  const isValid = VALID_PATHS.includes(normalizedPath);

  if (isValid) {
    // For the homepage, let Netlify serve the default pre-rendered /index.html
    if (normalizedPath === "/") {
      return;
    }
    // For valid inner pages, rewrite to their statically pre-rendered subfolder index.html
    // E.g., /fort-worth-zultys-business-phone-systems -> /fort-worth-zultys-business-phone-systems/index.html
    const rewritePath = normalizedPath + "/index.html";
    return context.rewrite(rewritePath);
  } else {
    // Invalid route: serve the custom 404.html with status 404 and X-Robots-Tag: noindex
    try {
      const response404 = await fetch(`${url.origin}/404.html`);
      if (response404.ok) {
        const body = await response404.text();
        return new Response(body, {
          status: 404,
          headers: {
            "content-type": "text/html; charset=utf-8",
            "X-Robots-Tag": "noindex, nofollow, noarchive"
          }
        });
      }
    } catch (err) {
      console.error("[SPA-404 Edge Function] Error fetching 404.html:", err);
    }

    // High-quality fallback if 404.html cannot be fetched
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>404 - Page Not Found</title>
  <meta name="robots" content="noindex, follow">
  <style>
    body { background-color: #020617; color: #f1f5f9; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    h1 { color: #f43f5e; font-size: 3rem; margin: 0 0 1rem; }
    p { color: #94a3b8; margin: 0 0 2rem; }
    a { color: #3b82f6; text-decoration: none; font-weight: bold; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>404</h1>
  <p>The requested page does not exist.</p>
  <a href="/">Return to Homepage</a>
</body>
</html>`,
      {
        status: 404,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow, noarchive"
        }
      }
    );
  }
};
