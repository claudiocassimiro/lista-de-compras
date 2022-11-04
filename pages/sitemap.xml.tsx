import { GetServerSideProps } from 'next';

const glob = require(`glob`);

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pagesDir = `pages/**/*.tsx`;
  let pagesPaths = await glob.sync(pagesDir);

  pagesPaths = pagesPaths
    .filter((path: string) => !path.includes(`[`))
    .filter((path: string) => !path.includes(`/_`))
    .filter((path: string) => !path.includes(`404`));

  const allPaths = [...pagesPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  ${allPaths
    .map(
      (url) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      `,
    )
    .join(``)}
  
  </urlset>`;

  res.setHeader(`Content-Type`, `text/xml`);
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
