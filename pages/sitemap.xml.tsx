import { GetServerSideProps } from 'next';
import * as fs from 'fs';

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const BASE_URL = `https://meucarrinho.vercel.app/`;

  const staticPaths = fs
    .readdirSync(`pages`)
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

  const allPaths = [...staticPaths]; // if in the future has dinamic pages, it will goes here check this link: https://enlear.academy/how-to-create-sitemaps-with-nextjs-668da9601a03

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

    </urlset>
  `;

  res.setHeader(`Content-Type`, `text/xml`);
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
