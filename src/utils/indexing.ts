import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface IndexingHistoryEntry {
  type: 'sitemap' | 'indexing';
  url: string;
  status: 'SUCCESS' | 'FAILED';
  action?: 'URL_UPDATED' | 'URL_DELETED';
  message: string;
  timestamp: string;
}

/**
 * Parses the Google Cloud Service Account credentials from GOOGLE_SERVICE_ACCOUNT_JSON
 * or from separate GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY environment variables.
 */
export function getServiceAccountCredentials() {
  const saJsonStr = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!saJsonStr) {
    // Fall back to individual credentials
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || '';
    const privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
    if (clientEmail && privateKey) {
      return { clientEmail, privateKey: privateKey.trim() };
    }
    return null;
  }
  
  try {
    const parsed = JSON.parse(saJsonStr);
    return {
      clientEmail: parsed.client_email || '',
      privateKey: parsed.private_key || ''
    };
  } catch (e) {
    console.error('❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON:', e);
    return null;
  }
}

/**
 * Checks if Google Cloud credentials are valid and present.
 */
export function isGoogleIndexingConfigured(): boolean {
  const creds = getServiceAccountCredentials();
  return !!(creds && creds.clientEmail && creds.privateKey);
}

/**
 * Base64url encoder helper.
 */
function base64url(str: string | Buffer): string {
  const buf = typeof str === 'string' ? Buffer.from(str) : str;
  return buf.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Requests an OAuth2 access token for the Google Indexing scope using a JWT service account assertion.
 */
export async function getIndexingAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);

  // Parse raw escaped newlines if present
  const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
  const signature = signer.sign(formattedPrivateKey);
  const encodedSignature = base64url(signature);

  const jwt = `${signatureInput}.${encodedSignature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google OAuth error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Sends a programmatic URL notification to Google's Indexing API.
 */
export async function triggerGoogleIndexing(targetUrl: string, action: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'): Promise<any> {
  const creds = getServiceAccountCredentials();
  if (!creds || !creds.clientEmail || !creds.privateKey) {
    throw new Error('Google Service Account credentials are missing or invalid.');
  }

  const token = await getIndexingAccessToken(creds.clientEmail, creds.privateKey);

  const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: targetUrl,
      type: action
    })
  });

  const text = await response.text();

  if (!response.ok) {
    logActivity({
      type: 'indexing',
      url: targetUrl,
      status: 'FAILED',
      action,
      message: `Google Indexing API error: ${response.status} - ${text}`,
      timestamp: new Date().toISOString()
    });
    throw new Error(`Google Indexing API returned ${response.status}: ${text}`);
  }

  let data = {};
  try {
    data = JSON.parse(text);
  } catch (e) {
    data = { raw: text };
  }

  logActivity({
    type: 'indexing',
    url: targetUrl,
    status: 'SUCCESS',
    action,
    message: 'Programmatic re-crawl accepted by Google Indexing API.',
    timestamp: new Date().toISOString()
  });

  return data;
}

/**
 * Maps a `.tsx` file path to its URL route in App.tsx so changes to file content trigger correct crawls.
 */
export function mapFilePathToRoute(filePath: string): string | null {
  try {
    const filename = path.basename(filePath, '.tsx');
    const appPath = path.join(process.cwd(), 'src', 'App.tsx');
    if (fs.existsSync(appPath)) {
      const content = fs.readFileSync(appPath, 'utf8');
      
      // Match case: normalizedPath === "/my-route" return <MyComponent />;
      const regex = new RegExp(`normalizedPath\\s*===\\s*['"]([^'"]+)['"]\\s*return\\s*<${filename}\\s*\\/?>`, 'i');
      const match = content.match(regex);
      if (match && match[1]) {
        return match[1];
      }
    }

    // Default manual fallbacks
    const lower = filename.toLowerCase();
    if (lower === 'home') return '/';
    if (lower === 'about') return '/about';
    if (lower === 'contact') return '/contact';
    if (lower === 'sitemap') return '/sitemap.html';
    if (lower === 'products') return '/products';
    if (lower === 'solutions') return '/solutions';
    if (lower === 'blog') return '/blog';
  } catch (err) {
    console.error('Error in mapFilePathToRoute:', err);
  }
  return null;
}

/**
 * Saves activity log entries to a local JSON database.
 */
export function logActivity(entry: IndexingHistoryEntry) {
  try {
    const logFile = path.join(process.cwd(), 'indexing-history.json');
    let history: IndexingHistoryEntry[] = [];
    if (fs.existsSync(logFile)) {
      try {
        history = JSON.parse(fs.readFileSync(logFile, 'utf8') || '[]');
      } catch (e) {}
    }
    history.unshift(entry);
    if (history.length > 100) {
      history = history.slice(0, 100);
    }
    fs.writeFileSync(logFile, JSON.stringify(history, null, 2), 'utf8');
  } catch (err) {
    console.error('Error logging activity:', err);
  }
}
