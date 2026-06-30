import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending emails
  app.post("/api/send-email", async (req, res) => {
    const { name, email, phone, company, message, subject, userCount, industry, currentSystem } = req.body;

    console.log("Received email request for:", email);

    // Check if environment variables are present
    const missingVars = [];
    if (!process.env.EMAIL_HOST) missingVars.push("EMAIL_HOST");
    if (!process.env.EMAIL_PORT) missingVars.push("EMAIL_PORT");
    if (!process.env.EMAIL_USER) missingVars.push("EMAIL_USER");
    if (!process.env.EMAIL_PASS) missingVars.push("EMAIL_PASS");

    if (missingVars.length > 0) {
      console.error("Missing environment variables:", missingVars.join(", "));
      return res.status(500).json({ 
        success: false, 
        message: `System configuration error: Missing ${missingVars.join(", ")}. Please check your AI Studio environment variables.` 
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || "465"),
        secure: true, // Use SSL for port 465
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        // Helpful for troubleshooting Hostinger
        debug: true,
        logger: true
      });

      // Verify connection configuration
      try {
        await transporter.verify();
        console.log("SMTP connection verified successfully");
      } catch (verifyError) {
        console.error("SMTP verification failed:", verifyError);
        throw verifyError;
      }

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
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Set 'from' to the authenticated user email
        to: "info@dallasfortworthzultys.com",
        subject: subject || "New Contact Form Submission",
        html: emailBody,
        replyTo: email,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Detailed error sending email:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to send email. Please check your SMTP credentials." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
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
