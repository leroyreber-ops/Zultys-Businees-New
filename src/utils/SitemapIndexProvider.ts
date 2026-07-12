import fs from "fs";
import path from "path";

// Self-contained known cities list for Dallas-Fort Worth metroplex area to prevent circular component dependencies
export const KNOWN_CITIES = [
  'Dallas', 'Fort Worth', 'Arlington', 'Plano', 'Garland', 'Irving', 
  'Grand Prairie', 'McKinney', 'Frisco', 'Carrollton', 'Denton', 'Richardson', 
  'Lewisville', 'Allen', 'Flower Mound', 'North Richland Hills', 'Mansfield', 
  'Rowlett', 'Euless', 'Southlake', 'Grapevine', 'Bedford', 'Keller', 
  'Hurst', 'Coppell', 'Waxahachie', 'Cleburne', 'Weatherford', 'Burleson', 
  'Terrell', 'Prosper', 'The Colony', 'Little Elm', 'Wylie', 'Rockwall', 
  'Forney', 'Midlothian', 'Ennis', 'Mesquite', 'Cedar Hill', 'DeSoto', 
  'Duncanville', 'Lancaster', 'Addison', 'Aledo', 'Springtown', 'Granbury', 
  'Glen Rose', 'Godley', 'Grandview', 'Venus', 'Maypearl', 'Italy', 
  'Milford', 'Palmer', 'Murphy', 'Sachse', 'Seagoville', 'Balch Springs', 
  'Celina', 'Princeton', 'Anna', 'Melissa', 'Royse City', 'Fate', 'Heath', 
  'Sunnyvale', 'Crandall', 'Lavon', 'Red Oak', 'Ovilla', 'Glenn Heights', 
  'Hutchins', 'Wilmer', 'Kaufman', 'Pilot Point', 'Sanger', 'Aubrey', 
  'Alvarado', 'Decatur', 'Bridgeport', 'Justin', 'Krum', 'Ponder', 
  'Trophy Club', 'Roanoke', 'Argyle', 'Kennedale', 'Forest Hill', 'Blue Mound', 
  'Azle', 'Bartonville', 'Bowie', 'Boyd', 'Brock', 'Crowley', 'Haslet', 
  'Joshua', 'Lake Worth', 'Lakeside', 'Colleyville', 'Saginaw', 'Haltom City', 
  'Watauga', 'Benbrook', 'Westworth Village', 'White Settlement', 'River Oaks', 
  'Hudson Oaks', 'Willow Park', 'Everman', 'Pantego', 'Dalworthington Gardens', 
  'Westover Hills', 'Edgecliff Village', 'Richland Hills', 'Sansom Park', 'Reno', 
  'Van Alstyne', 'Leonard', 'Farmersville', 'Howe', 'Whitewright', 'Gunter', 
  'Collinsville', 'Tioga', 'Tom Bean', 'Trenton', 'Savoy', 'Bells', 
  'Blue Ridge', 'Ector', 'Ravenna', 'Bonham', 'Honey Grove', 'Ladonia', 
  'Windom', 'Dodd City', 'Merit', 'Celeste', 'Wolfe City', 'Caddo Mills', 
  'Nevada', 'Josephine', 'Bailey', 'Randolph', 'Telephone', 'Ivanhoe', 'Gober'
];

export class SitemapIndexProvider {
  /**
   * Automatically updates robots.txt file inside public/ and (if it exists) dist/
   * to ensure there is a valid Sitemap directive pointing to the generated sitemap.xml.
   */
  static updateRobotsTxt(siteUrl: string = "https://dallasfortworthzultys.com"): void {
    const sitemapUrl = `${siteUrl.replace(/\/$/, "")}/sitemap.xml`;
    const robotsLine = `Sitemap: ${sitemapUrl}`;

    const updateFile = (filePath: string) => {
      try {
        let content = "";
        if (fs.existsSync(filePath)) {
          content = fs.readFileSync(filePath, "utf8");
        } else {
          // Default robots.txt configuration
          content = `User-agent: *\nAllow: /\nDisallow: /seo-dashboard\nDisallow: /citation-health\nDisallow: /admin/\n`;
        }

        const lines = content.split("\n");
        const hasSitemapLine = lines.some(line => line.trim().toLowerCase().startsWith("sitemap:"));

        if (!hasSitemapLine) {
          if (content && !content.endsWith("\n")) {
            content += "\n";
          }
          content += `${robotsLine}\n`;
          fs.writeFileSync(filePath, content, "utf8");
          console.log(`[SitemapIndexProvider] Appended Sitemap link to ${filePath}`);
        } else {
          // Verify and replace correct sitemap location if it differs
          let updated = false;
          const newLines = lines.map(line => {
            if (line.trim().toLowerCase().startsWith("sitemap:")) {
              if (line.trim() !== robotsLine) {
                updated = true;
                return robotsLine;
              }
            }
            return line;
          });

          if (updated) {
            fs.writeFileSync(newLines.join("\n"), "utf8");
            console.log(`[SitemapIndexProvider] Corrected sitemap link in ${filePath}`);
          } else {
            console.log(`[SitemapIndexProvider] robots.txt is perfectly aligned at ${filePath}`);
          }
        }
      } catch (err: any) {
        console.error(`[SitemapIndexProvider] Error writing robots.txt at ${filePath}:`, err.message || err);
      }
    };

    // Update public/robots.txt
    const publicPath = path.join(process.cwd(), "public", "robots.txt");
    updateFile(publicPath);

    // Update dist/robots.txt if exists
    const distPath = path.join(process.cwd(), "dist", "robots.txt");
    if (fs.existsSync(path.dirname(distPath))) {
      updateFile(distPath);
    }
  }

  /**
   * Generates standard search-discovery slugs for all regional cities in the DFW metroplex.
   */
  static getDynamicCityRoutes(): string[] {
    const routes: string[] = [];

    // Custom exact paths defined for top tier cities
    const topTierCityPaths = [
      "/fort-worth-zultys-systems",
      "/dallas-zultys-phones",
      "/plano-zultys-dealer",
      "/arlington-ip-pbx",
      "/frisco-voip-solutions",
      "/irving-business-phone-systems",
      "/garland-business-voip",
      "/grand-prairie-zultys",
      "/mckinney-zultys-dealer",
      "/mesquite-zultys-phone-systems",
      "/carrollton-zultys",
      "/denton-business-phone-systems"
    ];

    topTierCityPaths.forEach(p => {
      if (!routes.includes(p)) routes.push(p);
    });

    // Populate standard patterns for every known city to guarantee Google indexed presence
    KNOWN_CITIES.forEach(city => {
      const slug = city.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      const simplePath = `/${slug}`;
      const fullPath = `/${slug}-tx-zultys-phone-systems`;

      if (!routes.includes(simplePath)) {
        routes.push(simplePath);
      }
      if (!routes.includes(fullPath)) {
        routes.push(fullPath);
      }
    });

    return routes;
  }
}
