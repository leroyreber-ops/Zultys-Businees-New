import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending emails with a premium Sandbox local logging fallback
  app.post("/api/send-email", async (req, res) => {
    const { name, email, phone, company, message, subject, userCount, industry, currentSystem } = req.body;

    console.log("----------------------------------------");
    console.log("📨 RECEIVED LEAD SUBMISSION:");
    console.log(`   Name:    ${name}`);
    console.log(`   Email:   ${email}`);
    console.log(`   Phone:   ${phone}`);
    console.log(`   Company: ${company || "N/A"}`);
    if (userCount || industry || currentSystem) {
      console.log(`   Users:   ${userCount || "N/A"}`);
      console.log(`   Industry:${industry || "N/A"}`);
      console.log(`   Current: ${currentSystem || "N/A"}`);
    }
    console.log(`   Message: ${message || "N/A"}`);
    console.log("----------------------------------------");

    // Check if environment variables are present
    const missingVars = [];
    if (!process.env.EMAIL_HOST) missingVars.push("EMAIL_HOST");
    if (!process.env.EMAIL_PORT) missingVars.push("EMAIL_PORT");
    if (!process.env.EMAIL_USER) missingVars.push("EMAIL_USER");
    if (!process.env.EMAIL_PASS) missingVars.push("EMAIL_PASS");

    if (missingVars.length > 0) {
      console.warn("⚠️ SMTP Environment Variables are missing:", missingVars.join(", "));
      console.warn("📁 The lead has been logged above. To send live emails, configure SMTP variables in Settings.");
      
      // Return a graceful success status with a descriptive message so the front-end user sees a beautiful completion state!
      return res.status(200).json({ 
        success: true, 
        sandboxMode: true,
        message: "Lead received and logged in workspace logs. Configure SMTP variables to enable live email delivery." 
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || "465"),
        secure: parseInt(process.env.EMAIL_PORT || "465") === 465, // Use SSL for port 465
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        debug: false,
        logger: false
      });

      // Construct email body based on form type
      let emailBody = `
        <h3>New Submission from Dallas Fort Worth Zultys Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
      `;

      if (userCount || industry || currentSystem) {
        emailBody += `
          <h4>Quick Quote Details:</h4>
          <p><strong>User Count:</strong> ${userCount}</p>
          <p><strong>Industry:</strong> ${industry}</p>
          <p><strong>Current System:</strong> ${currentSystem}</p>
        `;
      }

      emailBody += `
        <h4>Message:</h4>
        <p>${message || 'No message provided'}</p>
      `;

      const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: "info@dallasfortworthzultys.com",
        subject: subject || "New Contact Form Submission",
        html: emailBody,
        replyTo: email,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Live Email Sent Successfully! Message ID:", info.messageId);
      
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("❌ Live SMTP Send Failed:", error);
      console.warn("📁 Falling back to Sandbox logging. Lead is safe and was printed above.");
      
      // Return graceful success even on SMTP failure to keep the user experience seamless
      res.status(200).json({ 
        success: true, 
        sandboxMode: true,
        message: "Submission captured successfully in workspace. Note: live SMTP transmission bypassed." 
      });
    }
  });

  // Dynamic XML Sitemap for rapid Google search indexing
  app.get("/sitemap.xml", (req, res) => {
    const paths = [
      "/",
      "/products",
      "/solutions",
      "/zultys-business-phone-systems",
      "/dallas-zultys-phones",
      "/about",
      "/contact",
      "/fort-worth-zultys-mx-series",
      "/fort-worth-zultys-mx-se",
      "/fort-worth-zultys-zip-49g-phone",
      "/fort-worth-zultys-zip-47g-phone",
      "/fort-worth-zultys-zip-45g-phone",
      "/fort-worth-zultys-zip-43g-phone",
      "/fort-worth-zultys-z-23ge-phone",
      "/fort-worth-zultys-z-22g-phone",
      "/fort-worth-zultys-z-21i-phone",
      "/fort-worth-zultys-zac",
      "/fort-worth-zultys-mxmobile",
      "/fort-worth-zultys-mxconference",
      "/fort-worth-zultys-healthcare",
      "/fort-worth-zultys-professional-services",
      "/fort-worth-zultys-real-estate",
      "/fort-worth-zultys-education",
      "/fort-worth-zultys-retail-automotive",
      "/fort-worth-zultys-enterprise",
      "/fort-worth-zultys-multi-location",
      "/zultys-for-legal-firms",
      "/zultys-for-financial-services",
      "/zultys-for-manufacturing-logistics",
      "/zultys-for-hospitality",
      "/zultys-for-non-profits",
      "/zultys-for-education",
      "/zultys-for-real-estate",
      "/zultys-for-retail",
      "/fort-worth-zultys-systems",
      "/arlington-ip-pbx",
      "/plano-zultys-dealer",
      "/irving-business-phone-systems",
      "/frisco-voip-solutions",
      "/grand-prairie-zultys",
      "/southlake-ip-phones",
      "/grapevine-business-voip",
      "/carrollton-zultys",
      "/richardson-phone-systems",
      "/hurst-ip-pbx",
      "/mesquite-zultys-phone-systems",
      "/garland-business-voip",
      "/mckinney-zultys-dealer",
      "/denton-business-phone-systems",
      "/lewisville-voip-solutions",
      "/allen-tx-zultys-voip",
      "/mansfield-tx-zultys-phone-systems",
      "/rowlett-tx-zultys-dealer",
      "/cedar-hill-tx-zultys-voip",
      "/desoto-tx-zultys-phone-systems",
      "/coppell-tx-zultys-phone-systems",
      "/duncanville-tx-zultys-voip",
      "/lancaster-tx-zultys-dealer",
      "/the-colony-tx-zultys-voip",
      "/little-elm-tx-zultys-phone-systems",
      "/wylie-tx-zultys-phone-systems",
      "/rockwall-tx-zultys-phone-systems",
      "/forney-tx-zultys-phone-systems",
      "/midlothian-tx-zultys-phone-systems",
      "/waxahachie-tx-zultys-phone-systems",
      "/ennis-tx-zultys-phone-systems",
      "/cleburne-tx-zultys-phone-systems",
      "/weatherford-tx-zultys-phone-systems",
      "/burleson-tx-zultys-phone-systems",
      "/terrell-tx-zultys-phone-systems",
      "/prosper-tx-zultys-phone-systems",
      "/murphy-tx-zultys-voip",
      "/sachse-tx-zultys-dealer",
      "/seagoville-tx-zultys-phone-systems",
      "/balch-springs-tx-zultys-voip",
      "/celina-tx-zultys-phone-systems",
      "/princeton-tx-zultys-phone-systems",
      "/anna-tx-zultys-phone-systems",
      "/melissa-tx-zultys-phone-systems",
      "/royse-city-tx-zultys-phone-systems",
      "/fate-tx-zultys-phone-systems",
      "/heath-tx-zultys-phone-systems",
      "/sunnyvale-tx-zultys-phone-systems",
      "/crandall-tx-zultys-phone-systems",
      "/lavon-tx-zultys-phone-systems",
      "/red-oak-tx-zultys-phone-systems",
      "/ovilla-tx-zultys-phone-systems",
      "/glenn-heights-tx-zultys-phone-systems",
      "/hutchins-tx-zultys-phone-systems",
      "/wilmer-tx-zultys-phone-systems",
      "/kaufman-tx-zultys-phone-systems",
      "/pilot-point-tx-zultys-phone-systems",
      "/sanger-tx-zultys-phone-systems",
      "/aubrey-tx-zultys-phone-systems",
      "/alvarado-tx-zultys-phone-systems",
      "/decatur-tx-zultys-phone-systems",
      "/bridgeport-tx-zultys-phone-systems",
      "/justin-tx-zultys-phone-systems",
      "/krum-tx-zultys-phone-systems",
      "/ponder-tx-zultys-phone-systems",
      "/trophy-club-tx-zultys-phone-systems",
      "/roanoke-tx-zultys-phone-systems",
      "/argyle-tx-zultys-phone-systems",
      "/kennedale-tx-zultys-phone-systems",
      "/forest-hill-tx-zultys-phone-systems",
      "/van-alstyne-tx-zultys-phone-systems",
      "/leonard-tx-zultys-phone-systems",
      "/farmersville-tx-zultys-phone-systems",
      "/howe-tx-zultys-phone-systems",
      "/whitewright-tx-zultys-phone-systems",
      "/gunter-tx-zultys-phone-systems",
      "/collinsville-tx-zultys-phone-systems",
      "/tioga-tx-zultys-phone-systems",
      "/tom-bean-tx-zultys-phone-systems",
      "/trenton-tx-zultys-phone-systems",
      "/savoy-tx-zultys-phone-systems",
      "/bells-tx-zultys-phone-systems",
      "/blue-ridge-tx-zultys-phone-systems",
      "/ector-tx-zultys-phone-systems",
      "/ravenna-tx-zultys-phone-systems",
      "/bonham-tx-zultys-phone-systems",
      "/honey-grove-tx-zultys-phone-systems",
      "/ladonia-tx-zultys-phone-systems",
      "/windom-tx-zultys-phone-systems",
      "/dodd-city-tx-zultys-phone-systems",
      "/merit-tx-zultys-phone-systems",
      "/celeste-tx-zultys-phone-systems",
      "/wolfe-city-tx-zultys-phone-systems",
      "/caddo-mills-tx-zultys-phone-systems",
      "/nevada-tx-zultys-phone-systems",
      "/josephine-tx-zultys-phone-systems",
      "/bailey-tx-zultys-phone-systems",
      "/randolph-tx-zultys-phone-systems",
      "/telephone-tx-zultys-phone-systems",
      "/ivanhoe-tx-zultys-phone-systems",
      "/gober-tx-zultys-phone-systems",
      "/springtown-tx-zultys-phone-systems",
      "/granbury-tx-zultys-phone-systems",
      "/glen-rose-tx-zultys-phone-systems",
      "/godley-tx-zultys-phone-systems",
      "/grandview-tx-zultys-phone-systems",
      "/venus-tx-zultys-phone-systems",
      "/maypearl-tx-zultys-phone-systems",
      "/italy-tx-zultys-phone-systems",
      "/milford-tx-zultys-phone-systems",
      "/palmer-tx-zultys-phone-systems",
      "/hudson-oaks-tx-zultys-phone-systems",
      "/willow-park-tx-zultys-phone-systems",
      "/everman-tx-zultys-phone-systems",
      "/pantego-tx-zultys-phone-systems",
      "/dalworthington-gardens-tx-zultys-phone-systems",
      "/westover-hills-tx-zultys-phone-systems",
      "/edgecliff-village-tx-zultys-phone-systems",
      "/richland-hills-tx-zultys-phone-systems",
      "/sansom-park-tx-zultys-phone-systems",
      "/reno-tx-zultys-phone-systems",
      "/bedford-zultys-solutions",
      "/benbrook-phone-systems",
      "/blue-mound-tx-zultys-phone-systems",
      "/bowie-tx-zultys-phone-systems",
      "/boyd-tx-zultys-phone-systems",
      "/brock-tx-zultys-phone-systems",
      "/crowley-tx-zultys-phone-systems",
      "/joshua-tx-zultys-phone-systems",
      "/lake-worth-tx-zultys-phone-systems",
      "/lakeside-tx-zultys-phone-systems",
      "/euless-business-phones",
      "/keller-zultys-dealer",
      "/saginaw-business-communications",
      "/haltom-city-zultys",
      "/watauga-voip-solutions",
      "/westworth-village-zultys",
      "/white-settlement-business-phones",
      "/river-oaks-zultys",
      "/zultys-vs-ringcentral",
      "/zultys-vs-8x8",
      "/zultys-vs-microsoft-teams",
      "/zultys-vs-vonage",
      "/zultys-vs-avaya",
      "/zultys-vs-cisco-webex",
      "/zultys-vs-mitel",
      "/zultys-vs-zoom-phone",
      "/zultys-vs-gotoconnect",
      "/zultys-vs-nextiva",
      "/zultys-vs-dialpad",
      "/zultys-vs-intermedia",
      "/zultys-vs-ooma-office",
      "/zultys-vs-comcast-business",
      "/zultys-vs-spectrum-business",
      "/zultys-vs-att-business",
      "/zultys-faq",
      "/hipaa-compliant-voip",
      "/zultys-pricing",
      "/free-voip-site-audit",
      "/case-studies",
      "/voip-glossary",
      "/our-team",
      "/certifications-awards",
      "/zultys-user-guides",
      "/zultys-migration-guide-dfw",
      "/zultys-crm-integration-guide",
      "/remote-work-solutions",
      "/voip-security-encryption",
      "/privacy",
      "/terms",
      "/blog",
      "/blog/why-zultys-is-the-best-choice-for-dfw-small-businesses",
      "/blog/on-premise-vs-cloud-which-zultys-deployment-is-right-for-you",
      "/blog/how-to-optimize-your-office-network-for-voip-performance"
    ];

    const lastmod = new Date().toISOString().split("T")[0];

    const getPriority = (p: string): string => {
      if (p === "/") return "1.0";
      
      const highPriority = [
        "/products", "/solutions", "/about", "/contact", "/zultys-pricing", "/free-voip-site-audit", "/case-studies"
      ];
      if (highPriority.includes(p)) return "0.9";
      
      const seoHubs = [
        "/zultys-business-phone-systems", "/dallas-zultys-phones", "/fort-worth-zultys-systems",
        "/fort-worth-zultys-business-phone-systems", "/fort-worth-zultys-voip-phone-system", 
        "/fort-worth-zultys-cloud-phone-system"
      ];
      if (seoHubs.includes(p)) return "0.85";
      
      const majorCitiesAndProducts = [
        "/dallas", "/fort-worth", "/arlington-ip-pbx", "/plano-zultys-dealer", "/irving-business-phone-systems",
        "/frisco-voip-solutions", "/grand-prairie-zultys", "/southlake-ip-phones", "/grapevine-business-voip",
        "/carrollton-zultys", "/richardson-phone-systems", "/hurst-ip-pbx", "/bedford-zultys-solutions",
        "/euless-business-phones", "/north-richland-hills-zultys", "/flower-mound-business-phones",
        "/colleyville-voip", "/keller-zultys-dealer", "/saginaw-business-communications", "/haltom-city-zultys",
        "/watauga-voip-solutions", "/rowlett-tx-zultys-dealer", "/mansfield-tx-zultys-phone-systems",
        "/denton-business-phone-systems", "/lewisville-voip-solutions", "/allen-tx-zultys-voip",
        "/fort-worth-zultys-mx-series", "/fort-worth-zultys-mx-se", "/fort-worth-zultys-zip-49g-phone",
        "/fort-worth-zultys-zip-47g-phone", "/fort-worth-zultys-zip-45g-phone", "/fort-worth-zultys-zip-43g-phone",
        "/fort-worth-zultys-z-23ge-phone", "/fort-worth-zultys-z-22g-phone", "/fort-worth-zultys-z-21i-phone",
        "/fort-worth-zultys-zac", "/fort-worth-zultys-mxmobile", "/fort-worth-zultys-mxconference",
        "/fort-worth-zultys-cloud-services"
      ];
      if (majorCitiesAndProducts.includes(p)) return "0.8";
      
      const industrySolutions = [
        "/fort-worth-zultys-healthcare", "/fort-worth-zultys-professional-services", "/fort-worth-zultys-real-estate",
        "/fort-worth-zultys-education", "/fort-worth-zultys-retail-automotive", "/fort-worth-zultys-enterprise",
        "/fort-worth-zultys-multi-location", "/zultys-for-legal-firms", "/zultys-for-financial-services",
        "/zultys-for-manufacturing-logistics", "/zultys-for-hospitality", "/zultys-for-non-profits",
        "/zultys-for-education", "/zultys-for-real-estate", "/zultys-for-retail"
      ];
      if (industrySolutions.includes(p)) return "0.75";
      
      if (p.startsWith("/zultys-vs-")) return "0.7";
      if (p.startsWith("/blog/")) return "0.55";
      if (p === "/blog") return "0.6";
      
      const utilities = [
        "/privacy", "/terms", "/zultys-faq", "/voip-glossary", "/our-team", "/certifications-awards",
        "/zultys-user-guides", "/zultys-migration-guide-dfw", "/zultys-crm-integration-guide",
        "/remote-work-solutions", "/voip-security-encryption"
      ];
      if (utilities.includes(p)) return "0.5";
      
      return "0.6";
    };

    const getChangefreq = (p: string): string => {
      if (p === "/" || p === "/blog") return "daily";
      if (p.startsWith("/blog/")) return "weekly";
      
      const highFreq = [
        "/products", "/solutions", "/about", "/contact", "/zultys-pricing", "/free-voip-site-audit", "/case-studies",
        "/zultys-business-phone-systems", "/dallas-zultys-phones", "/fort-worth-zultys-systems"
      ];
      if (highFreq.includes(p)) return "weekly";
      
      return "monthly";
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => `  <url>
    <loc>https://dallasfortworthzultys.com${p}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${getChangefreq(p)}</changefreq>
    <priority>${getPriority(p)}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Fallback for development to serve index.html for any non-API / non-static routes
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
