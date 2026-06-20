import { GetServerSideProps } from "next";
import fs from "fs";
import path from "path";

const SITE_URL = "https://ciphertracers.com";

interface SitemapPage {
  url: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

const generateSiteMap = (pages: SitemapPage[]): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map((page) => {
    return `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;
};

// Function to get all blog posts from the blog directory
const getBlogPosts = (): SitemapPage[] => {
  const blogDirectory = path.join(process.cwd(), "public", "blog");
  
  // Check if blog directory exists
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  try {
    const files = fs.readdirSync(blogDirectory);
    
    return files
      .filter((file) => file.endsWith(".html") || file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(blogDirectory, file);
        const stats = fs.statSync(filePath);
        const slug = file.replace(/\.(html|md)$/, "");

        return {
          url: `${SITE_URL}/blog/${slug}`,
          lastmod: stats.mtime.toISOString(),
          changefreq: "monthly" as const,
          priority: 0.7,
        };
      });
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Get current date in ISO format
  const currentDate = new Date().toISOString();

  // Define static pages with their SEO metadata
  const staticPages: SitemapPage[] = [
    {
      url: `${SITE_URL}/`,
      lastmod: currentDate,
      changefreq: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/how-we-help-individuals`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/resources`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/report-scam`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/reviews`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: 0.8,
    },
  ];

  // Get dynamic blog posts
  const blogPosts = getBlogPosts();

  // Combine static pages and blog posts
  const allPages = [...staticPages, ...blogPosts];

  // Generate the XML sitemap
  const sitemap = generateSiteMap(allPages);

  // Set response headers
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");

  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function SitemapXML() {
  // This component is never rendered as we return XML in getServerSideProps
  return null;
}