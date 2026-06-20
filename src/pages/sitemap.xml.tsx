import { GetServerSideProps } from "next";
import { supabase } from "@/integrations/supabase/client";

const DOMAIN = "https://cipherstracer.com";

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

function generateSiteMap(entries: SitemapEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries
  .map((entry) => {
    return `  <url>
    <loc>${entry.loc}</loc>${entry.lastmod ? `
    <lastmod>${entry.lastmod}</lastmod>` : ""}${entry.changefreq ? `
    <changefreq>${entry.changefreq}</changefreq>` : ""}${entry.priority ? `
    <priority>${entry.priority}</priority>` : ""}
  </url>`;
  })
  .join("\n")}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const entries: SitemapEntry[] = [];

    // Static pages with high priority
    const staticPages = [
      { path: "", priority: "1.0", changefreq: "daily" },
      { path: "/about", priority: "0.9", changefreq: "monthly" },
      { path: "/services", priority: "0.9", changefreq: "monthly" },
      { path: "/contact", priority: "0.8", changefreq: "monthly" },
      { path: "/how-we-help", priority: "0.8", changefreq: "monthly" },
      { path: "/how-we-help-individuals", priority: "0.8", changefreq: "monthly" },
      { path: "/case-studies", priority: "0.8", changefreq: "weekly" },
      { path: "/reviews", priority: "0.7", changefreq: "weekly" },
      { path: "/report-scam", priority: "0.9", changefreq: "monthly" },
      { path: "/resources", priority: "0.7", changefreq: "weekly" },
    ];

    staticPages.forEach((page) => {
      entries.push({
        loc: `${DOMAIN}${page.path}`,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: page.changefreq,
        priority: page.priority,
      });
    });

    // Fetch published blog posts
    const { data: blogPosts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });

    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach((post) => {
        entries.push({
          loc: `${DOMAIN}/blog/${post.slug}`,
          lastmod: post.updated_at || post.published_at,
          changefreq: "weekly",
          priority: "0.7",
        });
      });
    }

    // Fetch blog categories
    const { data: categories } = await supabase
      .from("blog_categories")
      .select("slug")
      .eq("is_active", true);

    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        entries.push({
          loc: `${DOMAIN}/blog/category/${category.slug}`,
          lastmod: new Date().toISOString().split("T")[0],
          changefreq: "weekly",
          priority: "0.6",
        });
      });
    }

    const sitemap = generateSiteMap(entries);

    res.setHeader("Content-Type", "text/xml");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error("Error generating sitemap:", error);
    
    // Return minimal sitemap on error
    const fallbackSitemap = generateSiteMap([
      {
        loc: DOMAIN,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "daily",
        priority: "1.0",
      },
    ]);

    res.setHeader("Content-Type", "text/xml");
    res.write(fallbackSitemap);
    res.end();

    return {
      props: {},
    };
  }
};

export default function Sitemap() {
  return null;
}