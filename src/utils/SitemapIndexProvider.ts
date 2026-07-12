import fs from "fs";
import path from "path";
import { generateRobotsTxt } from "./seoHelpers.js";

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
    const robotsTxtContent = generateRobotsTxt(siteUrl);

    const writeRobotsTxtFile = (filePath: string) => {
      try {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, robotsTxtContent, "utf8");
        console.log(`[SitemapIndexProvider] Successfully wrote robots.txt at ${filePath}`);
      } catch (err: any) {
        console.error(`[SitemapIndexProvider] Error writing robots.txt at ${filePath}:`, err.message || err);
      }
    };

    // Update public/robots.txt
    const publicPath = path.join(process.cwd(), "public", "robots.txt");
    writeRobotsTxtFile(publicPath);

    // Update dist/robots.txt if exists
    const distPath = path.join(process.cwd(), "dist", "robots.txt");
    if (fs.existsSync(path.dirname(distPath))) {
      writeRobotsTxtFile(distPath);
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
