import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const rootDir = process.cwd();
const publicDir = resolve(rootDir, 'public');

mkdirSync(publicDir, { recursive: true });

const baseUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL || 'http://localhost:8080')
  .trim()
  .replace(/\/+$/, '');

const routes = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/projects', changefreq: 'monthly', priority: '0.8' },
  { loc: '/resume/Minimalist White and Grey Professional Resume.pdf', changefreq: 'yearly', priority: '0.4' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.loc}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

const llms = `# Darshil Nathwani Portfolio

This site is a personal portfolio focused on AI/ML, full-stack development, hackathons, research, and technical leadership.

## Best Starting Points
- / - Home page with the full portfolio narrative and sectioned content
- /projects - Project gallery and detailed project modals
- /resume/Minimalist White and Grey Professional Resume.pdf - Public resume PDF

## Topics Covered
- AI and machine learning systems
- Text-to-SQL and natural language interfaces
- Full-stack web development
- Computer vision and multi-modal AI
- Hackathons, competitions, and club work

## Crawlability Notes
- Sitemap: /sitemap.xml
- Robots: /robots.txt
- The site is intended to be indexable by search engines and AI crawlers
`;

writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(resolve(publicDir, 'robots.txt'), robots, 'utf8');
writeFileSync(resolve(publicDir, 'llms.txt'), llms, 'utf8');

console.log(`SEO files generated for ${baseUrl}`);