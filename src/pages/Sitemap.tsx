import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { SEOControlPanelWidget } from '../components/SEOControlPanelWidget';
import { useQuote } from '../context/QuoteContext';
import { HashLink as Link } from '../components/HashLink';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Map,
  ChevronRight,
  Phone,
  Server,
  Building2,
  Info,
  Mail,
  Layout,
  Shield,
  FileCode,
  RefreshCw,
  Globe,
  Check,
  Copy,
  ExternalLink,
  Key,
  Send,
  AlertTriangle,
  ArrowRight,
  FileText,
  Plus,
  List,
  ShieldAlert,
  History,
  Link2,
  XCircle,
  CheckCircle,
} from 'lucide-react';

export function Sitemap() {
  const { openQuote } = useQuote();
  const [dynamicRoutes, setDynamicRoutes] = useState<{ path: string; priority: string; changefreq: string; url: string }[]>([]);
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [viewMode, setViewMode] = useState<'standard' | 'dynamic' | 'xml' | 'seo'>('standard');
  const [copied, setCopied] = useState(false);
  const [submittingSitemap, setSubmittingSitemap] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  // Integrated Google Search Console & Indexing API States
  const [seoStatus, setSeoStatus] = useState<{ configured: boolean; clientEmail: string | null; message: string } | null>(null);
  const [seoHistory, setSeoHistory] = useState<any[]>([]);
  const [loadingSeoStatus, setLoadingSeoStatus] = useState(true);
  const [loadingSeoHistory, setLoadingSeoHistory] = useState(true);
  const [submittingSeoRecrawl, setSubmittingSeoRecrawl] = useState(false);
  const [submittingSeoSitemap, setSubmittingSeoSitemap] = useState(false);

  // Form states for the integrated console
  const [seoSiteUrl, setSeoSiteUrl] = useState('https://dallasfortworthzultys.com');
  const [seoSitemapUrl, setSeoSitemapUrl] = useState('https://dallasfortworthzultys.com/sitemap.xml');
  const [seoRecrawlUrls, setSeoRecrawlUrls] = useState('');
  const [seoRecrawlAction, setSeoRecrawlAction] = useState<'URL_UPDATED' | 'URL_DELETED'>('URL_UPDATED');

  // Load Status and History for Google Search Console API
  const loadSeoStatus = async () => {
    setLoadingSeoStatus(true);
    try {
      const res = await fetch('/api/search-console/status');
      const data = await res.json();
      if (data.success) {
        setSeoStatus({
          configured: data.configured,
          clientEmail: data.clientEmail,
          message: data.message,
        });
      }
    } catch (err) {
      console.error('Failed to load Google indexing status:', err);
    } finally {
      setLoadingSeoStatus(false);
    }
  };

  const loadSeoHistory = async () => {
    setLoadingSeoHistory(true);
    try {
      const res = await fetch('/api/search-console/history');
      const data = await res.json();
      if (data.success) {
        setSeoHistory(data.history || []);
      }
    } catch (err) {
      console.error('Failed to load indexing history:', err);
    } finally {
      setLoadingSeoHistory(false);
    }
  };

  useEffect(() => {
    if (viewMode === 'seo') {
      loadSeoStatus();
      loadSeoHistory();
    }
  }, [viewMode]);

  // Handle Sitemap registration to Search Console API
  const handleSeoSitemapSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingSeoSitemap(true);
    const toastId = toast.loading('Submitting sitemap to Google Search Console...');

    try {
      const res = await fetch('/api/search-console/submit-sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteUrl: seoSiteUrl, sitemapUrl: seoSitemapUrl }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || 'Sitemap registered with Google successfully!', { id: toastId });
        loadSeoHistory();
      } else {
        toast.error(`Sitemap registration failed: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message || 'Failed to register sitemap'}`, { id: toastId });
    } finally {
      setSubmittingSeoSitemap(false);
    }
  };

  // Handle Programmatic Re-crawl request
  const handleSeoRecrawlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const urls = seoRecrawlUrls
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    if (urls.length === 0) {
      toast.error('Please enter at least one URL to re-crawl.');
      return;
    }

    // Basic URL validation
    const invalidUrl = urls.find((u) => !u.startsWith('http://') && !u.startsWith('https://'));
    if (invalidUrl) {
      toast.error(`Invalid URL: "${invalidUrl}". Must start with http:// or https://`);
      return;
    }

    setSubmittingSeoRecrawl(true);
    const toastId = toast.loading(`Submitting ${urls.length} URL(s) to Google Indexing API...`);

    try {
      const res = await fetch('/api/search-console/request-recrawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls, action: seoRecrawlAction }),
      });
      const data = await res.json();
      if (data.success) {
        const successes = data.results.filter((r: any) => r.success).length;
        const failures = data.results.filter((r: any) => !r.success).length;

        if (failures === 0) {
          toast.success(`Successfully requested indexing for all ${successes} URL(s)!`, { id: toastId });
        } else {
          toast.warning(`Submitted: ${successes} succeeded, ${failures} failed. Check logs below.`, { id: toastId });
        }
        setSeoRecrawlUrls('');
        loadSeoHistory();
      } else {
        toast.error(`Indexing request failed: ${data.error}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message || 'Failed to submit re-crawl request'}`, { id: toastId });
    } finally {
      setSubmittingSeoRecrawl(false);
    }
  };

  useEffect(() => {
    document.title = 'Sitemap | Dallas Fort Worth Zultys | DFW Business Communications';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Sitemap for DallasFortWorthZultys.com. Find all pages related to Zultys business phone systems, products, and solutions in Dallas-Fort Worth.');
    }

    // Live scan from App.tsx routes list on server
    setLoadingRoutes(true);
    fetch('/api/search-console/routes')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDynamicRoutes(data.routes);
        }
      })
      .catch(err => console.error('Error fetching dynamic routes:', err))
      .finally(() => setLoadingRoutes(false));
  }, []);

  const handleCopyXml = (xmlText: string) => {
    navigator.clipboard.writeText(xmlText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleManualSubmitSitemap = async () => {
    setSubmittingSitemap(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('/api/search-console/submit-sitemap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          siteUrl: 'https://dallasfortworthzultys.com',
          sitemapUrl: 'https://dallasfortworthzultys.com/sitemap.xml'
        })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setSubmittingSitemap(false);
    }
  };

  const generateXmlOnTheFly = () => {
    const lastmod = new Date().toISOString().split('T')[0];
    const urlEntries = dynamicRoutes.map(route => {
      return `  <url>
    <loc>${route.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
  };

  const sitemapData = [
    {
      title: 'Main Pages',
      icon: Layout,
      links: [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Solutions', path: '/solutions' },
        { name: 'Zultys Business Phone Systems (SEO)', path: '/zultys-business-phone-systems' },
        { name: 'Dallas Zultys Phones (SEO)', path: '/dallas-zultys-phones' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
      ],
    },
    {
      title: 'Zultys Products',
      icon: Server,
      links: [
        { name: 'Zultys MX Series', path: '/fort-worth-zultys-mx-series' },
        { name: 'Zultys MX-SE', path: '/fort-worth-zultys-mx-se' },
        { name: 'Zultys ZIP 49G Phone', path: '/fort-worth-zultys-zip-49g-phone' },
        { name: 'Zultys ZIP 47G Phone', path: '/fort-worth-zultys-zip-47g-phone' },
        { name: 'Zultys ZIP 45G Phone', path: '/fort-worth-zultys-zip-45g-phone' },
        { name: 'Zultys ZIP 43G Phone', path: '/fort-worth-zultys-zip-43g-phone' },
        { name: 'Zultys Z 23GE Phone', path: '/fort-worth-zultys-z-23ge-phone' },
        { name: 'Zultys Z 22G Phone', path: '/fort-worth-zultys-z-22g-phone' },
        { name: 'Zultys Z 21i Phone', path: '/fort-worth-zultys-z-21i-phone' },
        { name: 'Zultys ZAC Software', path: '/fort-worth-zultys-zac' },
        { name: 'Zultys MXmobile', path: '/fort-worth-zultys-mxmobile' },
        { name: 'Zultys MXconference', path: '/fort-worth-zultys-mxconference' },
      ],
    },
    {
      title: 'Industry Solutions',
      icon: Building2,
      links: [
        { name: 'Healthcare Solutions', path: '/fort-worth-zultys-healthcare' },
        { name: 'Legal & Professional', path: '/fort-worth-zultys-professional-services' },
        { name: 'Real Estate Solutions', path: '/fort-worth-zultys-real-estate' },
        { name: 'Education Solutions', path: '/fort-worth-zultys-education' },
        { name: 'Retail & Automotive', path: '/fort-worth-zultys-retail-automotive' },
        { name: 'Enterprise Solutions', path: '/fort-worth-zultys-enterprise' },
        { name: 'Multi-Location', path: '/fort-worth-zultys-multi-location' },
        { name: 'Zultys for Law Firms', path: '/zultys-for-legal-firms' },
        { name: 'Zultys for Financial Services', path: '/zultys-for-financial-services' },
        { name: 'Zultys for Manufacturing', path: '/zultys-for-manufacturing-logistics' },
        { name: 'Zultys for Hospitality', path: '/zultys-for-hospitality' },
        { name: 'Zultys for Non-Profits', path: '/zultys-for-non-profits' },
        { name: 'Zultys for Education', path: '/zultys-for-education' },
        { name: 'Zultys for Real Estate', path: '/zultys-for-real-estate' },
        { name: 'Zultys for Retail', path: '/zultys-for-retail' },
      ],
    },
    {
      title: 'Service Areas',
      icon: Map,
      links: [
        { name: 'Collin County VoIP Systems (Regional Hub)', path: '/collin-county-voip-systems' },
        { name: 'Dallas Zultys Support', path: '/dallas-zultys-phones' },
        { name: 'Fort Worth Zultys Systems', path: '/fort-worth-zultys-systems' },
        { name: 'Arlington IP PBX', path: '/arlington-ip-pbx' },
        { name: 'Plano Zultys Dealer', path: '/plano-zultys-dealer' },
        { name: 'Irving Business Phones', path: '/irving-business-phone-systems' },
        { name: 'Frisco VoIP Solutions', path: '/frisco-voip-solutions' },
        { name: 'Grand Prairie Zultys', path: '/grand-prairie-zultys' },
        { name: 'Southlake IP Phones', path: '/southlake-ip-phones' },
        { name: 'Grapevine Business VoIP', path: '/grapevine-business-voip' },
        { name: 'Carrollton Zultys', path: '/carrollton-zultys' },
        { name: 'Richardson Phone Systems', path: '/richardson-phone-systems' },
        { name: 'Hurst IP PBX', path: '/hurst-ip-pbx' },
        { name: 'Zultys for Mesquite', path: '/mesquite-zultys-phone-systems' },
        { name: 'Zultys for Garland', path: '/garland-business-voip' },
        { name: 'Zultys for McKinney', path: '/mckinney-zultys-dealer' },
        { name: 'Zultys for Denton', path: '/denton-business-phone-systems' },
        { name: 'Zultys for Lewisville', path: '/lewisville-voip-solutions' },
        { name: 'Zultys for Allen', path: '/allen-tx-zultys-voip' },
        { name: 'Zultys for Mansfield', path: '/mansfield-tx-zultys-phone-systems' },
        { name: 'Zultys for Rowlett', path: '/rowlett-tx-zultys-dealer' },
        { name: 'Zultys for Cedar Hill', path: '/cedar-hill-tx-zultys-voip' },
        { name: 'Zultys for DeSoto', path: '/desoto-tx-zultys-phone-systems' },
        { name: 'Zultys for Coppell', path: '/coppell-tx-zultys-phone-systems' },
        { name: 'Zultys for Duncanville', path: '/duncanville-tx-zultys-voip' },
        { name: 'Zultys for Lancaster', path: '/lancaster-tx-zultys-dealer' },
        { name: 'Zultys for The Colony', path: '/the-colony-tx-zultys-voip' },
        { name: 'Zultys for Little Elm', path: '/little-elm-tx-zultys-phone-systems' },
        { name: 'Zultys for Wylie', path: '/wylie-tx-zultys-phone-systems' },
        { name: 'Zultys for Rockwall', path: '/rockwall-tx-zultys-phone-systems' },
        { name: 'Zultys for Forney', path: '/forney-tx-zultys-phone-systems' },
        { name: 'Zultys for Midlothian', path: '/midlothian-tx-zultys-phone-systems' },
        { name: 'Zultys for Waxahachie', path: '/waxahachie-tx-zultys-phone-systems' },
        { name: 'Zultys for Ennis', path: '/ennis-tx-zultys-phone-systems' },
        { name: 'Zultys for Cleburne', path: '/cleburne-tx-zultys-phone-systems' },
        { name: 'Zultys for Weatherford', path: '/weatherford-tx-zultys-phone-systems' },
        { name: 'Zultys for Burleson', path: '/burleson-tx-zultys-phone-systems' },
        { name: 'Zultys for Terrell', path: '/terrell-tx-zultys-phone-systems' },
        { name: 'Zultys for Prosper', path: '/prosper-tx-zultys-phone-systems' },
        { name: 'Zultys for Murphy', path: '/murphy-tx-zultys-voip' },
        { name: 'Zultys for Sachse', path: '/sachse-tx-zultys-dealer' },
        { name: 'Zultys for Seagoville', path: '/seagoville-tx-zultys-phone-systems' },
        { name: 'Zultys for Balch Springs', path: '/balch-springs-tx-zultys-voip' },
        { name: 'Zultys for Celina', path: '/celina-tx-zultys-phone-systems' },
        { name: 'Zultys for Princeton', path: '/princeton-tx-zultys-phone-systems' },
        { name: 'Zultys for Anna', path: '/anna-tx-zultys-phone-systems' },
        { name: 'Zultys for Melissa', path: '/melissa-tx-zultys-phone-systems' },
        { name: 'Zultys for Royse City', path: '/royse-city-tx-zultys-phone-systems' },
        { name: 'Zultys for Fate', path: '/fate-tx-zultys-phone-systems' },
        { name: 'Zultys for Heath', path: '/heath-tx-zultys-phone-systems' },
        { name: 'Zultys for Sunnyvale', path: '/sunnyvale-tx-zultys-phone-systems' },
        { name: 'Zultys for Crandall', path: '/crandall-tx-zultys-phone-systems' },
        { name: 'Zultys for Lavon', path: '/lavon-tx-zultys-phone-systems' },
        { name: 'Zultys for Red Oak', path: '/red-oak-tx-zultys-phone-systems' },
        { name: 'Zultys for Ovilla', path: '/ovilla-tx-zultys-phone-systems' },
        { name: 'Zultys for Glenn Heights', path: '/glenn-heights-tx-zultys-phone-systems' },
        { name: 'Zultys for Hutchins', path: '/hutchins-tx-zultys-phone-systems' },
        { name: 'Zultys for Wilmer', path: '/wilmer-tx-zultys-phone-systems' },
        { name: 'Zultys for Kaufman', path: '/kaufman-tx-zultys-phone-systems' },
        { name: 'Zultys for Pilot Point', path: '/pilot-point-tx-zultys-phone-systems' },
        { name: 'Zultys for Sanger', path: '/sanger-tx-zultys-phone-systems' },
        { name: 'Zultys for Aubrey', path: '/aubrey-tx-zultys-phone-systems' },
        { name: 'Zultys for Alvarado', path: '/alvarado-tx-zultys-phone-systems' },
        { name: 'Zultys for Decatur', path: '/decatur-tx-zultys-phone-systems' },
        { name: 'Zultys for Bridgeport', path: '/bridgeport-tx-zultys-phone-systems' },
        { name: 'Zultys for Justin', path: '/justin-tx-zultys-phone-systems' },
        { name: 'Zultys for Krum', path: '/krum-tx-zultys-phone-systems' },
        { name: 'Zultys for Ponder', path: '/ponder-tx-zultys-phone-systems' },
        { name: 'Zultys for Trophy Club', path: '/trophy-club-tx-zultys-phone-systems' },
        { name: 'Zultys for Roanoke', path: '/roanoke-tx-zultys-phone-systems' },
        { name: 'Zultys for Argyle', path: '/argyle-tx-zultys-phone-systems' },
        { name: 'Zultys for Kennedale', path: '/kennedale-tx-zultys-phone-systems' },
        { name: 'Zultys for Forest Hill', path: '/forest-hill-tx-zultys-phone-systems' },
        { name: 'Zultys for Van Alstyne', path: '/van-alstyne-tx-zultys-phone-systems' },
        { name: 'Zultys for Leonard', path: '/leonard-tx-zultys-phone-systems' },
        { name: 'Zultys for Farmersville', path: '/farmersville-tx-zultys-phone-systems' },
        { name: 'Zultys for Howe', path: '/howe-tx-zultys-phone-systems' },
        { name: 'Zultys for Whitewright', path: '/whitewright-tx-zultys-phone-systems' },
        { name: 'Zultys for Gunter', path: '/gunter-tx-zultys-phone-systems' },
        { name: 'Zultys for Collinsville', path: '/collinsville-tx-zultys-phone-systems' },
        { name: 'Zultys for Tioga', path: '/tioga-tx-zultys-phone-systems' },
        { name: 'Zultys for Tom Bean', path: '/tom-bean-tx-zultys-phone-systems' },
        { name: 'Zultys for Trenton', path: '/trenton-tx-zultys-phone-systems' },
        { name: 'Zultys for Savoy', path: '/savoy-tx-zultys-phone-systems' },
        { name: 'Zultys for Bells', path: '/bells-tx-zultys-phone-systems' },
        { name: 'Zultys for Blue Ridge', path: '/blue-ridge-tx-zultys-phone-systems' },
        { name: 'Zultys for Ector', path: '/ector-tx-zultys-phone-systems' },
        { name: 'Zultys for Ravenna', path: '/ravenna-tx-zultys-phone-systems' },
        { name: 'Zultys for Bonham', path: '/bonham-tx-zultys-phone-systems' },
        { name: 'Zultys for Honey Grove', path: '/honey-grove-tx-zultys-phone-systems' },
        { name: 'Zultys for Ladonia', path: '/ladonia-tx-zultys-phone-systems' },
        { name: 'Zultys for Windom', path: '/windom-tx-zultys-phone-systems' },
        { name: 'Zultys for Dodd City', path: '/dodd-city-tx-zultys-phone-systems' },
        { name: 'Zultys for Merit', path: '/merit-tx-zultys-phone-systems' },
        { name: 'Zultys for Celeste', path: '/celeste-tx-zultys-phone-systems' },
        { name: 'Zultys for Wolfe City', path: '/wolfe-city-tx-zultys-phone-systems' },
        { name: 'Zultys for Caddo Mills', path: '/caddo-mills-tx-zultys-phone-systems' },
        { name: 'Zultys for Nevada', path: '/nevada-tx-zultys-phone-systems' },
        { name: 'Zultys for Josephine', path: '/josephine-tx-zultys-phone-systems' },
        { name: 'Zultys for Bailey', path: '/bailey-tx-zultys-phone-systems' },
        { name: 'Zultys for Randolph', path: '/randolph-tx-zultys-phone-systems' },
        { name: 'Zultys for Telephone', path: '/telephone-tx-zultys-phone-systems' },
        { name: 'Zultys for Ivanhoe', path: '/ivanhoe-tx-zultys-phone-systems' },
        { name: 'Zultys for Gober', path: '/gober-tx-zultys-phone-systems' },
        { name: 'Zultys for Springtown', path: '/springtown-tx-zultys-phone-systems' },
        { name: 'Zultys for Granbury', path: '/granbury-tx-zultys-phone-systems' },
        { name: 'Zultys for Glen Rose', path: '/glen-rose-tx-zultys-phone-systems' },
        { name: 'Zultys for Godley', path: '/godley-tx-zultys-phone-systems' },
        { name: 'Zultys for Grandview', path: '/grandview-tx-zultys-phone-systems' },
        { name: 'Zultys for Venus', path: '/venus-tx-zultys-phone-systems' },
        { name: 'Zultys for Maypearl', path: '/maypearl-tx-zultys-phone-systems' },
        { name: 'Zultys for Italy', path: '/italy-tx-zultys-phone-systems' },
        { name: 'Zultys for Milford', path: '/milford-tx-zultys-phone-systems' },
        { name: 'Zultys for Palmer', path: '/palmer-tx-zultys-phone-systems' },
        { name: 'Zultys for Hudson Oaks', path: '/hudson-oaks-tx-zultys-phone-systems' },
        { name: 'Zultys for Willow Park', path: '/willow-park-tx-zultys-phone-systems' },
        { name: 'Zultys for Everman', path: '/everman-tx-zultys-phone-systems' },
        { name: 'Zultys for Pantego', path: '/pantego-tx-zultys-phone-systems' },
        { name: 'Zultys for Dalworthington Gardens', path: '/dalworthington-gardens-tx-zultys-phone-systems' },
        { name: 'Zultys for Westover Hills', path: '/westover-hills-tx-zultys-phone-systems' },
        { name: 'Zultys for Edgecliff Village', path: '/edgecliff-village-tx-zultys-phone-systems' },
        { name: 'Zultys for Richland Hills', path: '/richland-hills-tx-zultys-phone-systems' },
        { name: 'Zultys for Sansom Park', path: '/sansom-park-tx-zultys-phone-systems' },
        { name: 'Zultys for Reno', path: '/reno-tx-zultys-phone-systems' },
        { name: 'Zultys for Addison', path: '/addison-tx-zultys-phone-systems' },
        { name: 'Zultys for Aledo', path: '/aledo-tx-zultys-phone-systems' },
        { name: 'Zultys for Azle', path: '/azle-tx-zultys-phone-systems' },
        { name: 'Zultys for Bartonville', path: '/bartonville-tx-zultys-phone-systems' },
        { name: 'Zultys for Bedford', path: '/bedford-zultys-solutions' },
        { name: 'Zultys for Benbrook', path: '/benbrook-phone-systems' },
        { name: 'Zultys for Blue Mound', path: '/blue-mound-tx-zultys-phone-systems' },
        { name: 'Zultys for Bowie', path: '/bowie-tx-zultys-phone-systems' },
        { name: 'Zultys for Boyd', path: '/boyd-tx-zultys-phone-systems' },
        { name: 'Zultys for Brock', path: '/brock-tx-zultys-phone-systems' },
        { name: 'Zultys for Crowley', path: '/crowley-tx-zultys-phone-systems' },
        { name: 'Zultys for Haslet', path: '/haslet-tx-zultys-phone-systems' },
        { name: 'Zultys for Joshua', path: '/joshua-tx-zultys-phone-systems' },
        { name: 'Zultys for Lake Worth', path: '/lake-worth-tx-zultys-phone-systems' },
        { name: 'Zultys for Lakeside', path: '/lakeside-tx-zultys-phone-systems' },
        { name: 'Zultys for Euless', path: '/euless-business-phones' },
        { name: 'Zultys for North Richland Hills', path: '/north-richland-hills-zultys' },
        { name: 'Zultys for Flower Mound', path: '/flower-mound-business-phones' },
        { name: 'Zultys for Colleyville', path: '/colleyville-voip' },
        { name: 'Zultys for Keller', path: '/keller-zultys-dealer' },
        { name: 'Zultys for Saginaw', path: '/saginaw-business-communications' },
        { name: 'Zultys for Haltom City', path: '/haltom-city-zultys' },
        { name: 'Zultys for Watauga', path: '/watauga-voip-solutions' },
        { name: 'Zultys for Westworth Village', path: '/westworth-village-zultys' },
        { name: 'Zultys for White Settlement', path: '/white-settlement-business-phones' },
        { name: 'Zultys for River Oaks', path: '/river-oaks-zultys' },
      ],
    },
    {
      title: 'Resources & Trust',
      icon: Shield,
      links: [
        { name: 'Zultys vs RingCentral', path: '/zultys-vs-ringcentral' },
        { name: 'Zultys vs 8x8', path: '/zultys-vs-8x8' },
        { name: 'Zultys vs Microsoft Teams', path: '/zultys-vs-microsoft-teams' },
        { name: 'Zultys vs Vonage', path: '/zultys-vs-vonage' },
        { name: 'Zultys vs Avaya', path: '/zultys-vs-avaya' },
        { name: 'Zultys vs Cisco Webex', path: '/zultys-vs-cisco-webex' },
        { name: 'Zultys vs Mitel', path: '/zultys-vs-mitel' },
        { name: 'Zultys vs Zoom Phone', path: '/zultys-vs-zoom-phone' },
        { name: 'Zultys vs GoToConnect', path: '/zultys-vs-gotoconnect' },
        { name: 'Zultys vs Nextiva', path: '/zultys-vs-nextiva' },
        { name: 'Zultys vs Dialpad', path: '/zultys-vs-dialpad' },
        { name: 'Zultys vs Intermedia', path: '/zultys-vs-intermedia' },
        { name: 'Zultys vs Ooma', path: '/zultys-vs-ooma-office' },
        { name: 'Zultys vs Comcast', path: '/zultys-vs-comcast-business' },
        { name: 'Zultys vs Spectrum', path: '/zultys-vs-spectrum-business' },
        { name: 'Zultys vs AT&T', path: '/zultys-vs-att-business' },
        { name: 'Comprehensive FAQ', path: '/zultys-faq' },
        { name: 'HIPAA Compliance', path: '/hipaa-compliant-voip' },
        { name: 'Pricing & Quotes', path: '/zultys-pricing' },
        { name: 'Free VoIP Site Audit', path: '/free-voip-site-audit' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'VoIP Glossary', path: '/voip-glossary' },
        { name: 'Our Team', path: '/our-team' },
        { name: 'Certifications & Awards', path: '/certifications-awards' },
        { name: 'User Guides & Manuals', path: '/zultys-user-guides' },
        { name: 'Zultys Migration Guide', path: '/zultys-migration-guide-dfw' },
        { name: 'CRM Integration Guide', path: '/zultys-crm-integration-guide' },
        { name: 'Remote Work Solutions', path: '/remote-work-solutions' },
        { name: 'VoIP Security & Encryption', path: '/voip-security-encryption' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
      ],
    },
    {
      title: 'Zultys Insights',
      icon: Mail,
      links: [
        { name: 'Blog Home', path: '/blog' },
        { name: 'Best Choice for DFW', path: '/blog/why-zultys-is-the-best-choice-for-dfw-small-businesses' },
        { name: 'Cloud vs On-Premise', path: '/blog/on-premise-vs-cloud-which-zultys-deployment-is-right-for-you' },
        { name: 'Network Optimization', path: '/blog/how-to-optimize-your-office-network-for-voip-performance' },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Map className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Site Map</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Dallas Fort Worth Zultys Sitemap
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Find exactly what you're looking for. Use the links below to navigate through our 
              comprehensive Zultys product and solution offerings.
            </p>
          </div>

          {/* Live Indexing & Sitemap Admin Control Bar */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600 animate-pulse" />
                Live Indexing & Sitemap Admin Control
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Scan active routes in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-blue-600">App.tsx</code> on-the-fly and verify real-time search indexing status.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant={viewMode === 'standard' ? 'default' : 'outline'}
                onClick={() => setViewMode('standard')}
                size="sm"
                className="rounded-full"
              >
                Standard View
              </Button>
              <Button
                variant={viewMode === 'dynamic' ? 'default' : 'outline'}
                onClick={() => setViewMode('dynamic')}
                size="sm"
                className="rounded-full"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${loadingRoutes ? 'animate-spin' : ''}`} />
                Live Scan ({dynamicRoutes.length || '...'})
              </Button>
              <Button
                variant={viewMode === 'xml' ? 'default' : 'outline'}
                onClick={() => setViewMode('xml')}
                size="sm"
                className="rounded-full"
              >
                <FileCode className="h-4 w-4 mr-1" />
                XML Generator
              </Button>
              <Button
                variant={viewMode === 'seo' ? 'default' : 'outline'}
                onClick={() => setViewMode('seo')}
                size="sm"
                className="rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
              >
                <Globe className="h-4 w-4 mr-1 animate-pulse" />
                Google Indexing Console
              </Button>
            </div>
          </div>

          {/* Dynamic Live Scan View */}
          {viewMode === 'dynamic' && (
            <div className="mb-12">
              <Card className="p-8 border-gray-200 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Programmatic Route Index Scan</h2>
                    <p className="text-gray-500 mt-1">Parsed in real-time directly from active routes in App.tsx source code.</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setLoadingRoutes(true);
                      fetch('/api/search-console/routes')
                        .then(res => res.json())
                        .then(data => {
                          if (data.success) {
                            setDynamicRoutes(data.routes);
                          }
                        })
                        .catch(err => console.error(err))
                        .finally(() => setLoadingRoutes(false));
                    }}
                    disabled={loadingRoutes}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loadingRoutes ? 'animate-spin' : ''}`} />
                    Refresh Scan
                  </Button>
                </div>

                {loadingRoutes ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mb-4" />
                    <p className="text-gray-500">Scanning source files for active routes...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4">URL / Path</th>
                          <th className="px-6 py-4">Indexing Priority</th>
                          <th className="px-6 py-4">Change Frequency</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {dynamicRoutes.map((route, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-mono font-medium text-gray-900 truncate max-w-[280px]">
                              {route.path}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                {route.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 capitalize">{route.changefreq}</td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 text-blue-600 hover:text-blue-800 font-semibold"
                                  asChild
                                >
                                  <a href={route.path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                    Visit <ExternalLink className="h-3 w-3" />
                                  </a>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Dynamic XML Generator View */}
          {viewMode === 'xml' && (
            <div className="mb-12">
              <Card className="p-8 border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Dynamic XML Sitemap</h2>
                    <p className="text-gray-500 mt-1">Generated in real-time on-the-fly for Google and other crawler robots.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyXml(generateXmlOnTheFly())}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2 text-green-600" />
                          Copied XML!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy XML Code
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleManualSubmitSitemap}
                      disabled={submittingSitemap}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${submittingSitemap ? 'animate-spin' : ''}`} />
                      Submit Sitemap to Google
                    </Button>
                  </div>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-semibold">
                    🎉 Sitemap submitted to Google successfully! Your index queues will update soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm font-semibold">
                    ⚠️ Submission request processed. Connect your Google Service Account in Settings to enable live Google Search Console API handshakes.
                  </div>
                )}

                <div className="relative">
                  <div className="absolute right-4 top-4 bg-gray-900 text-gray-400 text-xs px-2 py-1 rounded font-mono">
                    XML Format
                  </div>
                  <pre className="bg-gray-950 text-emerald-400 p-6 rounded-2xl overflow-x-auto text-xs font-mono max-h-[500px] shadow-inner leading-relaxed">
                    {generateXmlOnTheFly()}
                  </pre>
                </div>
              </Card>
            </div>
          )}

          {/* Google Search Console & Indexing Console */}
          {viewMode === 'seo' && (
            <div className="space-y-10 mb-16">
              {/* Quick Status, Submit & Re-crawl cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Connection Status */}
                <Card className="p-6 border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                      <Key className="h-5 w-5 text-blue-600" />
                      Google Cloud API Connection
                    </h3>
                    {loadingSeoStatus ? (
                      <div className="space-y-3 py-4 animate-pulse">
                        <div className="h-4 w-2/3 bg-gray-100 rounded" />
                        <div className="h-10 w-full bg-gray-50 rounded-lg" />
                      </div>
                    ) : seoStatus?.configured ? (
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
                          <CheckCircle className="h-3.5 w-3.5" /> Google Service Account Connected
                        </div>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                          <span className="text-xs text-gray-500 font-mono block">Client Email Account</span>
                          <span className="text-xs font-semibold font-mono text-gray-800 break-all select-all">
                            {seoStatus.clientEmail}
                          </span>
                        </div>
                        <p className="text-xs text-green-600 font-medium">
                          ✔ Ready to trigger real-time Google Indexing and sitemap submissions.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
                          <AlertTriangle className="h-3.5 w-3.5" /> Missing Service Account
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Search Console and Indexing API integrations are currently dormant.
                        </p>
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2.5">
                          <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <span className="text-xs text-amber-800 leading-relaxed">
                            Provide <strong>GOOGLE_CLIENT_EMAIL</strong> &amp; <strong>GOOGLE_PRIVATE_KEY</strong>, or <strong>GOOGLE_SERVICE_ACCOUNT_JSON</strong> in settings.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-6">
                    <a
                      href="#gsc-integration-guide"
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline"
                    >
                      View Setup Guide <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </Card>

                {/* Sitemap Submission Card */}
                <Card className="p-6 border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Sitemap Register (API)
                  </h3>
                  <form onSubmit={handleSeoSitemapSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-600 block">Site Property URL</label>
                      <input
                        type="text"
                        value={seoSiteUrl}
                        onChange={(e) => setSeoSiteUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-600 block">Sitemap URL Path</label>
                      <input
                        type="text"
                        value={seoSitemapUrl}
                        onChange={(e) => setSeoSitemapUrl(e.target.value)}
                        placeholder="https://example.com/sitemap.xml"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submittingSeoSitemap || !seoStatus?.configured}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 transition text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                      {submittingSeoSitemap ? 'Submitting...' : 'Register Sitemap'}
                    </button>
                  </form>
                </Card>

                {/* Programmatic URL Re-crawl Card */}
                <Card className="p-6 border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <Plus className="h-5 w-5 text-blue-600" />
                    Programmatic Re-crawl
                  </h3>
                  <form onSubmit={handleSeoRecrawlSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-gray-600">Target URLs <span className="text-gray-400 font-normal">(one per line)</span></label>
                        <span className="text-3xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Instant API</span>
                      </div>
                      <textarea
                        value={seoRecrawlUrls}
                        onChange={(e) => setSeoRecrawlUrls(e.target.value)}
                        placeholder="https://dallasfortworthzultys.com/about&#10;https://dallasfortworthzultys.com/sitemap"
                        className="w-full h-[96px] bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 resize-none"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                        <input
                          type="radio"
                          name="seoRecrawlAction"
                          checked={seoRecrawlAction === 'URL_UPDATED'}
                          onChange={() => setSeoRecrawlAction('URL_UPDATED')}
                          className="text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                        />
                        Create or Update
                      </label>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                        <input
                          type="radio"
                          name="seoRecrawlAction"
                          checked={seoRecrawlAction === 'URL_DELETED'}
                          onChange={() => setSeoRecrawlAction('URL_DELETED')}
                          className="text-red-600 focus:ring-red-500 h-3.5 w-3.5"
                        />
                        Remove URL
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={submittingSeoRecrawl || !seoStatus?.configured}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 transition text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <RefreshCw className={`h-4 w-4 ${submittingSeoRecrawl ? 'animate-spin' : ''}`} />
                      {submittingSeoRecrawl ? 'Requesting...' : 'Submit Re-crawl Request'}
                    </button>
                  </form>
                </Card>

              </div>

              {/* History Log Table */}
              <Card className="border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <History className="h-5 w-5 text-blue-600" />
                    Google Search Indexing Logs
                  </h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { loadSeoStatus(); loadSeoHistory(); }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5"
                    >
                      <RefreshCw className={`h-3 w-3 ${loadingSeoHistory ? 'animate-spin' : ''}`} />
                      Sync Logs
                    </button>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <List className="h-3.5 w-3.5" /> {seoHistory.length} actions logged
                    </span>
                  </div>
                </div>

                {loadingSeoHistory ? (
                  <div className="p-12 text-center text-gray-500 space-y-3">
                    <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto" />
                    <p className="text-sm">Retrieving indexing history logs...</p>
                  </div>
                ) : seoHistory.length === 0 ? (
                  <div className="p-12 text-center text-gray-500 space-y-2">
                    <Info className="h-10 w-10 text-gray-300 mx-auto" />
                    <h4 className="text-sm font-semibold text-gray-700">No indexing logs found</h4>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                      Submit a sitemap or request a URL re-crawl to populate this table with live Search Console logs.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs text-gray-500">
                      <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200 text-3xs tracking-wider">
                        <tr>
                          <th className="py-3 px-6">Timestamp</th>
                          <th className="py-3 px-6">Type</th>
                          <th className="py-3 px-6">URL / Resource</th>
                          <th className="py-3 px-6 text-center">API Status</th>
                          <th className="py-3 px-6">Google API Response / Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {seoHistory.map((log, index) => (
                          <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-3.5 px-6 whitespace-nowrap text-gray-400 font-mono">
                              {new Date(log.timestamp).toLocaleString()}
                            </td>
                            <td className="py-3.5 px-6 whitespace-nowrap">
                              {log.type === 'sitemap' ? (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-bold uppercase tracking-wider text-4xs">
                                  <FileText className="h-2.5 w-2.5" /> Sitemap
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md font-bold uppercase tracking-wider text-4xs">
                                  <Link2 className="h-2.5 w-2.5" /> Indexing
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-6 font-mono text-gray-900 select-all max-w-xs truncate" title={log.url}>
                              {log.url}
                            </td>
                            <td className="py-3.5 px-6 text-center whitespace-nowrap">
                              {log.status === 'SUCCESS' ? (
                                <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded font-bold text-4xs uppercase tracking-wider">
                                  <CheckCircle className="h-2.5 w-2.5" /> Success
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-2 py-0.5 rounded font-bold text-4xs uppercase tracking-wider">
                                  <XCircle className="h-2.5 w-2.5" /> Failed
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-6 max-w-sm text-gray-500 leading-normal">
                              {log.action && (
                                <span className="inline-block bg-gray-100 text-gray-600 text-3xs font-bold px-1 py-0.2 rounded mr-1.5 font-mono">
                                  {log.action}
                                </span>
                              )}
                              {log.message}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>

              {/* Step-by-Step Google Integration Guide */}
              <section id="gsc-integration-guide" className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    How to Activate Instant Google Search Console API Indexing
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Follow these 3 simple authorization steps to establish live secure connections to Google Search indexing:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600 leading-relaxed">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold font-mono">1</span>
                      <h4 className="font-bold text-gray-900">1. Cloud Service Account</h4>
                    </div>
                    <p className="text-xs">
                      Go to the <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold hover:text-blue-800">Google Cloud Console</a>, search for and enable the <strong>Webmaster Tools / Search Console API</strong> and <strong>Google Indexing API</strong>, then create a <strong>Service Account</strong> and download a JSON Private Key.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold font-mono">2</span>
                      <h4 className="font-bold text-gray-900">2. Authorize via Search Console</h4>
                    </div>
                    <p className="text-xs">
                      Copy the generated Service Account <code>client_email</code> address (e.g. <code>my-service-account@project.iam.gserviceaccount.com</code>). 
                      Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold hover:text-blue-800">Google Search Console</a>, go to <strong>Settings &gt; Users &amp; Permissions</strong>, and add this email as a <strong>Full User</strong> or <strong>Owner</strong> of your site property.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold font-mono">3</span>
                      <h4 className="font-bold text-gray-900">3. Provide Keys to AI Studio</h4>
                    </div>
                    <p className="text-xs">
                      Define the credentials as environment variables in your workspace: <strong>GOOGLE_SERVICE_ACCOUNT_JSON</strong> or separate <strong>GOOGLE_CLIENT_EMAIL</strong> and <strong>GOOGLE_PRIVATE_KEY</strong>. Your server will instantly establish secure handshakes!
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {viewMode === 'standard' && (
            <>
              <div className="prose prose-lg text-gray-600 max-w-none mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Navigating Your Zultys Communication Journey in DFW</h2>
                <p>
                  At DFW Business Communications, we understand that choosing the right communication system is a critical decision for your North Texas organization. Our sitemap is designed to help you easily find the information you need about <strong>Zultys products and solutions in Fort Worth</strong>. Whether you're exploring the latest MX series IP PBX systems, looking for specialized industry solutions, or seeking expert technical support in Dallas, our comprehensive site structure ensures you can find the right resources quickly.
                </p>
                <p>
                  From small business phone systems to large-scale enterprise deployments, we provide the expertise and local support that DFW businesses demand. Use the categorized links below to explore our offerings and learn how Zultys technology can transform your business communications across the entire Dallas-Fort Worth metroplex.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Value of a Comprehensive Sitemap for DFW SEO</h3>
                <p>
                  A well-structured sitemap is more than just a navigation tool; it's a critical component of <strong>DFW SEO strategy</strong>. By providing search engines with a clear map of our website's content, we ensure that every page related to Zultys products and solutions in North Texas is indexed and easily discoverable. This visibility is essential for DFW Business Communications to reach organizations in Dallas and Fort Worth that are searching for reliable and professional business phone systems.
                </p>
                <p>
                  Our sitemap helps search engines understand the relationships between our various offerings, from the core Zultys MX series to specialized industry solutions for healthcare and legal professionals in North Texas. This structural clarity improves our overall search ranking, making it easier for DFW business owners to find the expert Zultys support and guidance they need.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {sitemapData.filter(section => !['Resources & Trust', 'Service Areas'].includes(section.title)).map((section, index) => (
                  <Card key={index} className="p-8 border-gray-200 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                    <ul className="space-y-4">
                      {section.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <Link 
                            to={link.path} 
                            className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>

              {/* Service Areas - Full Width Section */}
              {sitemapData.filter(section => section.title === 'Service Areas').map((section, index) => (
                <Card key={index} className="p-8 lg:p-12 border-gray-200 shadow-sm mb-12">
                  <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-6">
                    <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                      <section.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-gray-900">{section.title}</h2>
                      <p className="text-gray-500 mt-1">Expert Zultys support and installation across the entire DFW Metroplex.</p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-5">
                    {section.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link 
                          to={link.path} 
                          className="group flex items-start gap-2 text-gray-600 hover:text-blue-600 transition-all duration-200"
                        >
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-[15px] leading-tight font-medium">{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}

              {/* Resources & Trust - Full Width Section */}
              {sitemapData.filter(section => section.title === 'Resources & Trust').map((section, index) => (
                <Card key={index} className="p-8 lg:p-12 border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-6">
                    <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                      <section.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-gray-900">{section.title}</h2>
                      <p className="text-gray-500 mt-1">Comprehensive guides, competitor comparisons, and trust resources.</p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-5">
                    {section.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link 
                          to={link.path} 
                          className="group flex items-start gap-2 text-gray-600 hover:text-blue-600 transition-all duration-200"
                        >
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-[15px] leading-tight font-medium">{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}

              <div className="mt-20 prose prose-lg text-gray-600 max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Zultys Solutions for Every North Texas Business</h2>
                <p>
                  Our sitemap reflects our commitment to providing a wide range of <strong>Zultys solutions for DFW organizations</strong>. We cover everything from initial system design and professional installation to ongoing user training and 24/7 technical support. By organizing our content into logical categories, we aim to provide a seamless browsing experience for our North Texas clients, helping them discover the full potential of the Zultys unified communications platform.
                </p>
                <p>
                  Whether you're interested in cloud-based services, on-premise appliances, or flexible hybrid solutions, DFW Business Communications has the knowledge and experience to guide you. We are proud to be your local Zultys partner in Fort Worth, serving businesses of all sizes across the Dallas-Fort Worth area with the technology that keeps them connected and productive.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Finding Specialized Zultys Resources for North Texas Industries</h3>
                <p>
                  For organizations in specific sectors, our sitemap provides a direct path to <strong>Specialized Zultys Resources for North Texas Industries</strong>. We have dedicated pages for healthcare, legal, real estate, and education sectors in the DFW area, each detailing how Zultys technology meets the unique communication and compliance needs of these industries. By using our sitemap, DFW professionals can quickly find the information most relevant to their specific business environment.
                </p>
                <p>
                  Whether you're a medical clinic in Fort Worth needing secure communication or a law firm in Dallas requiring advanced call handling, our categorized links guide you to the right solution. DFW Business Communications is committed to providing industry-specific expertise that helps North Texas organizations thrive through better communication.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Navigating the Zultys Product Lifecycle in Dallas-Fort Worth</h3>
                <p>
                  Our sitemap also helps you <strong>Navigate the Zultys Product Lifecycle</strong>, from initial research and selection to professional installation and ongoing support. We provide detailed information on the latest Zultys ZIP phones, MX series appliances, and advanced software tools like ZAC and MXmobile. By following the links in our sitemap, DFW businesses can understand the full range of Zultys technology and how it can be integrated into their North Texas operations.
                </p>
                <p>
                  We also include resources for system administrators and IT teams in Dallas and Fort Worth, providing the technical information needed to manage and optimize a Zultys environment. DFW Business Communications is your partner throughout the entire lifecycle of your communication system, ensuring you get the most value from your investment in North Texas.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Roadmap to Communication Success in DFW</h3>
                <p>
                  Think of our sitemap as <strong>Your Roadmap to Communication Success in DFW</strong>. It provides a clear and organized view of the many ways DFW Business Communications can help your North Texas organization stay connected. From exploring new technologies to seeking expert local support, every link is a step toward a more efficient and productive communication environment for your Dallas or Fort Worth business.
                </p>
                <p>
                  We invite you to explore our website and discover the many Zultys solutions we offer. If you have any questions or need personalized guidance, our local Fort Worth team is always just a phone call away. Let DFW Business Communications be your guide to the future of business communications in North Texas.
                </p>
              </div>
            </>
          )}

          <div className="mt-20 p-12 bg-blue-900 rounded-3xl text-white text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Need Immediate Assistance?</h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Our Fort Worth based team is ready to help you find the perfect Zultys solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100"
                onClick={openQuote}
              >
                Contact Us Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:8172312962">Call 817-231-2962</a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
      <SEOControlPanelWidget />
    </div>
  );
}
