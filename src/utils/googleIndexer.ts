import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface IndexingLogEntry {
  type: 'sitemap' | 'indexing';
  url: string;
  status: 'SUCCESS' | 'FAILED';
  action?: 'URL_UPDATED' | 'URL_DELETED';
  message: string;
  timestamp: string;
}

/**
 * Normalizes and returns Google Service Account Credentials from environment variables.
 * Supports GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and fallback GOOGLE_SERVICE_ACCOUNT_JSON.
 */
export function getGoogleCredentials() {
  let clientEmail = process.env.GOOGLE_CLIENT_EMAIL || '';
  let privateKey = process.env.GOOGLE_PRIVATE_KEY || '';

  const saJsonStr = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (saJsonStr) {
    try {
      const parsed = JSON.parse(saJsonStr);
      if (parsed.client_email) clientEmail = parsed.client_email;
      if (parsed.private_key) privateKey = parsed.private_key;
    } catch (e) {
      console.error('Error parsing GOOGLE_SERVICE_ACCOUNT_JSON environment variable:', e);
    }
  }

  return {
    clientEmail,
    privateKey: privateKey.trim()
  };
}

/**
 * Checks if Google Service Account credentials are fully configured.
 */
export function isGoogleConfigured(): boolean {
  const { clientEmail, privateKey } = getGoogleCredentials();
  return !!(clientEmail && privateKey);
}

/**
 * Converts a string or Buffer into base64url encoding.
 */
function base64url(str: string | Buffer): string {
  const buf = typeof str === 'string' ? Buffer.from(str) : str;
  return buf.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Generates an OAuth2 access token for Google API scopes using a JWT Service Account assertion.
 * Scopes typically used:
 * - https://www.googleapis.com/auth/indexing (Indexing API)
 * - https://www.googleapis.com/auth/webmasters (Search Console API)
 */
export async function getGoogleAccessToken(scopes: string[]): Promise<string> {
  const { clientEmail, privateKey } = getGoogleCredentials();

  if (!clientEmail || !privateKey) {
    throw new Error('Google Service Account credentials are not configured. Please set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY, or GOOGLE_SERVICE_ACCOUNT_JSON.');
  }

  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);

  // Replace escaped newlines if they are passed as raw \n sequences in env strings
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
 * Submits a sitemap URL to Google Search Console for a given site property.
 */
export async function submitSitemapToGoogle(siteUrl: string, sitemapUrl: string): Promise<string> {
  const accessToken = await getGoogleAccessToken([
    'https://www.googleapis.com/auth/webmasters'
  ]);

  const encodedSiteUrl = encodeURIComponent(siteUrl);
  const encodedSitemapUrl = encodeURIComponent(sitemapUrl);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodedSiteUrl}/sitemaps/${encodedSitemapUrl}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Length': '0'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Search Console API error: ${response.status} - ${errorText}`);
  }

  const statusText = response.status === 204 ? 'Sitemap successfully registered/updated.' : 'Sitemap submitted.';
  logIndexingActivity({
    type: 'sitemap',
    url: sitemapUrl,
    status: 'SUCCESS',
    message: `Submitted successfully to site property "${siteUrl}". Response status: ${response.status} - ${statusText}`,
    timestamp: new Date().toISOString()
  });

  return statusText;
}

/**
 * Programmatically notifies Google of a URL update or deletion using the Google Indexing API.
 */
export async function notifyGoogleUrlChange(targetUrl: string, action: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'): Promise<any> {
  const accessToken = await getGoogleAccessToken([
    'https://www.googleapis.com/auth/indexing'
  ]);

  const url = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: targetUrl,
      type: action
    })
  });

  const responseText = await response.text();

  if (!response.ok) {
    logIndexingActivity({
      type: 'indexing',
      url: targetUrl,
      status: 'FAILED',
      action,
      message: `Google Indexing API returned status ${response.status}: ${responseText}`,
      timestamp: new Date().toISOString()
    });
    throw new Error(`Google Indexing API error: ${response.status} - ${responseText}`);
  }

  let parsedData = {};
  try {
    parsedData = JSON.parse(responseText);
  } catch (e) {
    parsedData = { raw: responseText };
  }

  logIndexingActivity({
    type: 'indexing',
    url: targetUrl,
    status: 'SUCCESS',
    action,
    message: `Indexing request accepted by Google. Action: ${action}`,
    timestamp: new Date().toISOString()
  });

  return parsedData;
}

/**
 * Persists indexing logs in a local JSON file so users can review history in the UI.
 */
export function logIndexingActivity(entry: IndexingLogEntry) {
  try {
    const logsFile = path.join(process.cwd(), 'indexing-history.json');
    let history: IndexingLogEntry[] = [];

    if (fs.existsSync(logsFile)) {
      try {
        const content = fs.readFileSync(logsFile, 'utf8');
        history = JSON.parse(content || '[]');
      } catch (e) {
        console.error('Error reading indexing-history.json, creating new file:', e);
      }
    }

    // Add new entry at the beginning
    history.unshift(entry);

    // Trim logs to keep the latest 100 entries to save space
    if (history.length > 100) {
      history = history.slice(0, 100);
    }

    fs.writeFileSync(logsFile, JSON.stringify(history, null, 2), 'utf8');
  } catch (error) {
    console.error('Failed to log indexing activity:', error);
  }
}

/**
 * Retrieves indexing history logs.
 */
export function getIndexingHistory(): IndexingLogEntry[] {
  try {
    const logsFile = path.join(process.cwd(), 'indexing-history.json');
    if (fs.existsSync(logsFile)) {
      const content = fs.readFileSync(logsFile, 'utf8');
      return JSON.parse(content || '[]');
    }
  } catch (e) {
    console.error('Error reading indexing history:', e);
  }
  return [];
}
