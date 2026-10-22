/**
 * Post-build prerender script for SEO.
 *
 * Phase 1 (meta): writes a route-specific HTML file for every sitemap route
 * with its own title, description, canonical and OG tags via string
 * replacement on dist/index.html.
 *
 * Phase 2 (snapshot): renders each route in headless Chromium against the
 * built output and writes the real DOM into each HTML file, plus the exact
 * head tags react-helmet produced (title, meta, canonical, JSON-LD). Crawlers
 * that don't run JavaScript then see the full page. External requests are
 * blocked so third-party scripts never end up in the captured DOM. If
 * Chromium is unavailable, phase 2 is skipped with a warning and the build
 * still succeeds with phase-1 output, so a deploy can never break here.
 *
 * Run after `vite build`: node scripts/prerender.js
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { createServer } from 'http';
import { execSync } from 'child_process';
import { createRequire } from 'module';
import { dirname, join, extname, normalize } from 'path';
import { fileURLToPath } from 'url';
import { cities, SITE_URL } from '../src/data/site.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const BRAND = 'Seattle Christmas Lights';

// Keep these in sync with the <Helmet> blocks in src/pages. Phase 2 replaces
// them with whatever Helmet actually renders, so these only matter for the
// meta-only fallback.
const routes = [
  {
    path: '/',
    title: `Christmas Light Installation in Seattle | ${BRAND}`,
    description: "We hang professional Christmas lights on homes across Seattle and the Eastside, then take them down and store them when the season's over. Installs start at $800.",
    ogTitle: 'Christmas Light Installation in Seattle',
  },
  ...cities.map((c) => ({
    path: `/service-areas/${c.path}`,
    title: `Christmas Light Installation in ${c.name}, WA | ${BRAND}`,
    description: `Christmas light installation in ${c.name}, WA. We hang professional Christmas lights, then take them down and store them when the season's over. Installs start at $800.`,
    ogTitle: `Christmas Light Installation in ${c.name}, WA`,
  })),
  {
    path: '/privacy',
    title: `Privacy Policy | ${BRAND}`,
    description: 'Privacy policy for Seattle Christmas Lights. How we collect, use, and protect your personal information.',
  },
  // Not in the sitemap (noindex), but prerendered so these pages don't get
  // the homepage HTML and hydrate against the wrong markup.
  { path: '/thank-you', title: `Thanks | ${BRAND}`, noindex: true },
  // Written to dist/404.html. Cloudflare Pages serves it with a real 404
  // status for unknown URLs instead of a soft 404 of the homepage.
  { path: '/404', title: `Page not found | ${BRAND}`, noindex: true, file: '404.html' },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function outFileFor(route) {
  if (route.file) return join(DIST, route.file);
  // Flat files (dist/privacy.html), NOT directories with index.html:
  // Cloudflare Pages serves /privacy from privacy.html directly, while a
  // directory triggers a 308 to the trailing-slash URL.
  return route.path === '/' ? join(DIST, 'index.html') : join(DIST, `${route.path}.html`);
}

// Tags carry data-react-helmet so Helmet takes them over on load instead of
// adding duplicates next to them.
function generateHead(route) {
  const H = 'data-react-helmet="true"';
  const url = `${SITE_URL}${route.path}`;
  const tags = [`<title>${esc(route.title)}</title>`];
  if (route.noindex) {
    tags.push(`<meta ${H} name="robots" content="noindex" />`);
  } else {
    tags.push(
      `<meta ${H} name="description" content="${esc(route.description)}" />`,
      `<link ${H} rel="canonical" href="${url}" />`,
      `<meta ${H} property="og:title" content="${esc(route.ogTitle || route.title)}" />`,
      `<meta ${H} property="og:description" content="${esc(route.description)}" />`,
      `<meta ${H} property="og:url" content="${url}" />`,
      `<meta ${H} property="og:image" content="${SITE_URL}/images/og-image.jpg" />`
    );
  }
  return tags.map((t) => `    ${t}`).join('\n');
}

const HEAD_START = '<!-- prerender:head -->';
const HEAD_END = '<!-- /prerender:head -->';
const headBlock = (inner) => `${HEAD_START}\n${inner}\n    ${HEAD_END}`;

function prerenderMeta() {
  const templatePath = join(DIST, 'index.html');
  if (!existsSync(templatePath)) {
    console.error('dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  // Strip the homepage tags that every route would otherwise inherit.
  const template = readFileSync(templatePath, 'utf-8')
    .replace(/\s*<title>[^<]*<\/title>/, '')
    .replace(/\s*<meta name="description" content="[^"]*" \/>/, '')
    .replace(/\s*<meta property="og:image" content="[^"]*" \/>/, '');

  for (const route of routes) {
    const html = template.replace('</head>', `  ${headBlock(generateHead(route))}\n  </head>`);
    const outFile = outFileFor(route);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html);
  }
  console.log(`✓ Pre-rendered ${routes.length} routes with static SEO meta tags`);
}

// ---------------------------------------------------------------------------
// Phase 2: snapshot rendered DOM into the phase-1 HTML files
// ---------------------------------------------------------------------------

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
};

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      const safePath = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
      const candidates = [
        join(DIST, safePath),
        join(DIST, `${safePath}.html`),
        join(DIST, 'index.html'), // SPA fallback
      ];
      for (const file of candidates) {
        if (existsSync(file) && extname(file)) {
          res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
          res.end(readFileSync(file));
          return;
        }
      }
      res.writeHead(404);
      res.end();
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function launchChromium() {
  // playwright-core ships no browsers (keeps `npm install` fast on Cloudflare
  // Pages). Download just headless Chromium on demand, at the same version as
  // the installed driver so the browser revision matches.
  const { chromium } = await import('playwright-core');
  try {
    return await chromium.launch();
  } catch {
    const { version } = createRequire(import.meta.url)('playwright-core/package.json');
    console.log(`Chromium not found, downloading via playwright@${version}...`);
    execSync(`npx -y playwright@${version} install chromium --only-shell`, { stdio: 'inherit', timeout: 240000 });
    return await chromium.launch();
  }
}

async function snapshotRoutes() {
  let server;
  let browser;
  try {
    server = await startStaticServer();
    browser = await launchChromium();
    await snapshotWithBrowser(browser, server.address().port);
  } finally {
    // A leaked HTTP server keeps node alive and hangs the CI build.
    if (browser) await browser.close().catch(() => {});
    if (server) server.close();
  }
}

async function snapshotWithBrowser(browser, port) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 2000 } });
  await context.route('**/*', (route) =>
    route.request().url().startsWith(`http://127.0.0.1:${port}`) ? route.continue() : route.abort()
  );

  const page = await context.newPage();
  let ok = 0;
  const failed = [];

  for (const route of routes) {
    const outFile = outFileFor(route);
    try {
      await page.goto(`http://127.0.0.1:${port}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForFunction(
        (expected) =>
          (document.getElementById('root')?.innerHTML.length ?? 0) > 500 && document.title === expected,
        route.title,
        { timeout: 15000 }
      );
      // Let Helmet flush its tags and the form's entrance animation finish.
      await page.waitForTimeout(400);

      const { rootHtml, title, headTags } = await page.evaluate(() => {
        const root = document.getElementById('root');
        // JSX like `<Phone /> {PHONE_DISPLAY}` leaves adjacent text nodes that
        // the HTML parser would merge into one, which breaks hydration. Split
        // them with an empty comment, the same way React's own SSR does.
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const texts = [];
        while (walker.nextNode()) texts.push(walker.currentNode);
        for (const t of texts) {
          if (t.previousSibling?.nodeType === Node.TEXT_NODE) t.before(document.createComment(' '));
        }
        return {
          rootHtml: root.innerHTML,
          title: document.title,
          headTags: [...document.head.querySelectorAll('[data-react-helmet]')]
            .filter((el) => el.tagName !== 'TITLE')
            .map((el) => el.outerHTML),
        };
      });

      let html = readFileSync(outFile, 'utf-8');
      const head = [`<title>${esc(title)}</title>`, ...headTags].map((t) => `    ${t}`).join('\n');
      html = html.replace(new RegExp(`${HEAD_START}[\\s\\S]*?${HEAD_END}`), headBlock(head));
      // main.jsx only hydrates when this matches the current URL.
      html = html.replace(
        '<div id="root"></div>',
        () => `<div id="root" data-prerendered="${route.path}">${rootHtml}</div>`
      );
      writeFileSync(outFile, html);
      ok++;
    } catch (err) {
      failed.push(`${route.path} (${err.message.split('\n')[0]})`);
    }
  }

  console.log(`✓ Snapshotted rendered DOM for ${ok}/${routes.length} routes`);
  if (failed.length) {
    console.warn(`⚠ Snapshot failed for ${failed.length} route(s), those stay meta-only:\n  ${failed.join('\n  ')}`);
  }
}

prerenderMeta();

try {
  await snapshotRoutes();
} catch (err) {
  console.warn(`⚠ DOM snapshot phase skipped (${err.message.split('\n')[0]}). Pages ship with meta tags only.`);
}

// Never let a lingering handle (server socket, browser process) hang the build.
process.exit(0);
