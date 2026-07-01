<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Dallas Fort Worth Zultys</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            background-color: #f8fafc;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(148, 163, 184, 0.08);
            border: 1px solid #e2e8f0;
          }
          h1 {
            font-size: 24px;
            color: #0f172a;
            margin-top: 0;
            margin-bottom: 10px;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          p {
            color: #64748b;
            font-size: 14px;
            margin-bottom: 30px;
            line-height: 1.5;
          }
          .stats {
            background-color: #f1f5f9;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            font-size: 13px;
            color: #475569;
            font-weight: 600;
          }
          .stats span {
            color: #00A82D;
            font-weight: 800;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background-color: #f8fafc;
            color: #475569;
            text-align: left;
            padding: 12px 16px;
            font-weight: 700;
            border-bottom: 2px solid #e2e8f0;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
          }
          td {
            padding: 12px 16px;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          a {
            color: #00A82D;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 11px;
            text-align: center;
          }
          .priority-high { background-color: #dcfce7; color: #166534; }
          .priority-med { background-color: #fef9c3; color: #854d0e; }
          .priority-low { background-color: #f1f5f9; color: #475569; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A82D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Dallas Fort Worth Zultys XML Sitemap
          </h1>
          <p>
            This XML Sitemap is generated dynamically to help search engines like Google, Bing, and Yahoo crawl and index dallasfortworthzultys.com pages efficiently.
          </p>
          <div class="stats">
            Total Crawlable URLs in Sitemap: <span><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 60%;">URL</th>
                <th style="width: 13%; text-align: center;">Priority</th>
                <th style="width: 13%;">Change Freq</th>
                <th style="width: 14%;">Last Mod</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" data-type="number" order="descending"/>
                <tr>
                  <td>
                    <xsl:variable name="itemURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <a href="{$itemURL}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td style="text-align: center;">
                    <xsl:variable name="p" select="sitemap:priority"/>
                    <span>
                      <xsl:attribute name="class">
                        <xsl:choose>
                          <xsl:when test="$p &gt;= 0.8">priority-badge priority-high</xsl:when>
                          <xsl:when test="$p &gt;= 0.6">priority-badge priority-med</xsl:when>
                          <xsl:otherwise>priority-badge priority-low</xsl:otherwise>
                        </xsl:choose>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td style="text-transform: capitalize;">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
