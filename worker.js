/**
 * other-privacy-policies: Cloudflare Worker for Vikaranet app privacy policies.
 *
 * The HTML pages live in /docs. They are the single source for BOTH:
 *   - this Worker (primary), deployed by Cloudflare Workers Builds on every push to main
 *   - GitHub Pages (backup mirror), served from the /docs folder
 *
 * Routes:
 *   /                    -> docs/index.html (list of policies)
 *   /audit-and-order/    -> docs/audit-and-order/index.html
 *   /app-ads.txt         -> docs/app-ads.txt
 *
 * To add an app: create docs/<slug>/index.html, link it in docs/index.html,
 * then add one import line and one entry in PAGES below.
 */
import indexHtml from "./docs/index.html";
import appAdsTxt from "./docs/app-ads.txt";
import auditAndOrder from "./docs/audit-and-order/index.html";

const PAGES = {
  "audit-and-order": auditAndOrder,
};

const HTML_HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "public, max-age=3600",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (path === "/") return new Response(indexHtml, { headers: HTML_HEADERS });

    if (path === "/app-ads.txt") {
      return new Response(appAdsTxt, {
        headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
      });
    }

    const slug = path.slice(1).toLowerCase();
    if (PAGES[slug]) {
      // Keep a trailing slash so relative links behave the same as on GitHub Pages
      if (!url.pathname.endsWith("/")) return Response.redirect(url.origin + "/" + slug + "/", 301);
      return new Response(PAGES[slug], { headers: HTML_HEADERS });
    }

    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  },
};
