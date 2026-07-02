import fs from "fs";
import path from "path";
import { buildSitemapXml, extractRoutesFromApp, watchAndGenerateSitemap, generateSitemapFiles } from "./src/utils/sitemapGenerator.js";

function run() {
  const isWatch = process.argv.includes("--watch") || process.argv.includes("-w");

  if (isWatch) {
    console.log("🚀 Starting Automatic XML Sitemap Generator in Watch Mode...");
    watchAndGenerateSitemap();
    return;
  }

  console.log("🚀 Starting Automatic XML Sitemap Generation...");

  const routes = extractRoutesFromApp();
  console.log(`🔍 Detected ${routes.length} active routes defined in App.tsx`);

  if (routes.length === 0) {
    console.error("❌ No routes found in App.tsx. Aborting sitemap generation.");
    process.exit(1);
  }

  generateSitemapFiles();
  console.log("🎉 Sitemap generation completed successfully!");
}

run();
