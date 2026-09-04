import fs from "fs";
import path from "path";
import { generateRobotsTxt } from "./seoHelpers.js";

import { VALID_PATHS } from "../routes.js";
import { canonicalMap } from "./seoHelpers.js";

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
   * Returns all canonical search-discovery slugs for regional cities in the DFW metroplex.
   * Only returns valid, canonical URLs that return HTTP 200 and are defined in VALID_PATHS.
   */
  static getDynamicCityRoutes(): string[] {
    const routes = VALID_PATHS.filter(p => {
      const norm = p.toLowerCase();
      // Exclude non-canonical aliases/redirects
      if (canonicalMap[norm] && canonicalMap[norm] !== norm) {
        return false;
      }
      // Return regional city routes
      return (
        norm.includes("-tx-zultys") ||
        norm.includes("-zultys-") ||
        norm.endsWith("-zultys") ||
        norm.endsWith("-voip") ||
        norm.endsWith("-phones") ||
        norm.endsWith("-systems") ||
        norm.endsWith("-solutions") ||
        norm.endsWith("-dealer") ||
        norm.endsWith("-communications")
      );
    });

    return Array.from(new Set(routes)).sort();
  }
}
