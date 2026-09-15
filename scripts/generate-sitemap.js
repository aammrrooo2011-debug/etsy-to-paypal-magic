import fs from 'fs';
import path from 'path';

// Change this to your actual production domain
const DOMAIN = 'https://quranset.co.uk';

const productsPath = path.resolve(process.cwd(), 'src/data/products.json');
const publicPath = path.resolve(process.cwd(), 'public');

const sitemapPath = path.join(publicPath, 'sitemap.xml');
const robotsPath = path.join(publicPath, 'robots.txt');

try {
  // Read products
  const productsData = fs.readFileSync(productsPath, 'utf8');
  const products = JSON.parse(productsData);

  // Generate XML
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static pages
  const staticPages = ['', '/shop', '/contact', '/privacy', '/terms', '/shipping'];
  
  staticPages.forEach(page => {
    sitemapContent += `  <url>\n`;
    sitemapContent += `    <loc>${DOMAIN}${page}</loc>\n`;
    sitemapContent += `    <changefreq>weekly</changefreq>\n`;
    sitemapContent += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
    sitemapContent += `  </url>\n`;
  });

  // Product pages
  products.forEach(product => {
    sitemapContent += `  <url>\n`;
    sitemapContent += `    <loc>${DOMAIN}/product/${product.id}</loc>\n`;
    sitemapContent += `    <changefreq>weekly</changefreq>\n`;
    sitemapContent += `    <priority>0.9</priority>\n`;
    sitemapContent += `  </url>\n`;
  });

  sitemapContent += `</urlset>`;

  // Write sitemap
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log(`✅ Sitemap successfully generated at ${sitemapPath}`);

  // Write robots.txt
  const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`;
  fs.writeFileSync(robotsPath, robotsContent);
  console.log(`✅ robots.txt successfully generated at ${robotsPath}`);

} catch (error) {
  console.error('❌ Error generating sitemap:', error);
}
