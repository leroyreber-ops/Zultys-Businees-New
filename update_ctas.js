const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.tsx'));

console.log(`Found ${files.length} pages to check.`);

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Regex to find the CTA button group wrapper
  // Typically: <div className="flex flex-col sm:flex-row gap-... justify-center">
  const ctaGroupRegex = /(<div className="flex flex-col sm:flex-row gap-\d+ justify-center">)([\s\S]*?)(<\/div>)/g;

  content = content.replace(ctaGroupRegex, (match, openDiv, innerContent, closeDiv) => {
    // Check if there is a phone link in this CTA group
    if (innerContent.includes('tel:817-231-2962') || innerContent.includes('tel:8172312962')) {
      // Find the individual Buttons inside
      // Let's parse buttons
      const buttons = [];
      const buttonRegex = /<Button[\s\S]*?<\/Button>/g;
      let btnMatch;
      while ((btnMatch = buttonRegex.exec(innerContent)) !== null) {
        buttons.push(btnMatch[0]);
      }

      if (buttons.length === 2) {
        let quoteBtn = buttons[0];
        let phoneBtn = buttons[1];

        // If the first button is actually the phone button, swap them
        if (quoteBtn.includes('tel:817')) {
          const temp = quoteBtn;
          quoteBtn = phoneBtn;
          phoneBtn = temp;
        }

        // 1. Extract the text/onClick/asChild properties of the quote button
        const quoteTextMatch = quoteBtn.match(/>([\s\S]*?)<\/Button>/);
        const quoteText = quoteTextMatch ? quoteTextMatch[1].trim() : 'Request a Quote';
        const onClickMatch = quoteBtn.match(/onClick=\{([^}]+)\}/);
        const onClickStr = onClickMatch ? `onClick={${onClickMatch[1]}}` : 'onClick={openQuote}';

        // 2. Extract the text and link of the phone button
        const telLinkMatch = phoneBtn.match(/href="tel:([^"]+)"/);
        const telLink = telLinkMatch ? telLinkMatch[1] : '817-231-2962';
        
        const phoneTextMatch = phoneBtn.match(/<a[^>]*>([\s\S]*?)<\/a>/);
        const phoneText = phoneTextMatch ? phoneTextMatch[1].trim() : 'Call 817-231-2962';

        // Reconstruct Quote Button with premium Zultys Gold
        const newQuoteBtn = `              <Button
                size="lg"
                ${onClickStr}
                className="bg-zultys-gold hover:bg-zultys-gold/90 text-slate-950 text-xl px-10 py-8 font-black rounded-xl border-none shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                ${quoteText}
              </Button>`;

        // Reconstruct Phone Button with high-contrast Zultys Green as requested
        const newPhoneBtn = `              <Button
                size="lg"
                asChild
                className="bg-zultys-green hover:bg-zultys-green/90 text-white text-xl px-10 py-8 font-black rounded-xl border-none shadow-2xl shadow-zultys-green/20 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                <a href="tel:${telLink}" className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-white animate-pulse" />
                  ${phoneText}
                </a>
              </Button>`;

        modified = true;
        return `${openDiv}\n${newQuoteBtn}\n${newPhoneBtn}\n            ${closeDiv}`;
      }
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated CTA buttons in ${file}`);
  }
});
