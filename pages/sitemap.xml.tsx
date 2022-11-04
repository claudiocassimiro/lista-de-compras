import { GetServerSideProps } from 'next';
import * as fs from 'fs';

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const BASE_URL = `https://meucarrinho.vercel.app/`;
  const BASE_DIR = process.env.NODE_ENV === `production` ? `./pages` : `pages`;

  const staticPaths = fs
    .readdirSync(BASE_DIR)
    .filter(
      (staticPage) =>
        ![
          `api`,
          `_app.tsx`,
          `_document.tsx`,
          `404.tsx`,
          `sitemap.xml.tsx`,
        ].includes(staticPage),
    )
    .map((staticPagePath) => `${BASE_URL}/${staticPagePath}`);

  const allPaths = [...staticPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
