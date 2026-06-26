import { GetServerSideProps } from "next";
import { supabase } from "@/integrations/supabase/client";

function generateSiteMap(blogPosts: any[]) {
  const baseUrl = "https://cipherstracer.com";
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" }, // Homepage
    { url: "/about", priority: "0.9", changefreq: "monthly" },
    { url: "/services", priority: "0.9", changefreq: "monthly" },
    { url: "/contact", priority: "0.8", changefreq: "monthly" },
    { url: "/how-we-help", priority: "0.8", changefreq: "monthly" },
    { url: "/how-we-help-individuals", priority: "0.8", changefreq: "monthly" },
    { url: "/case-studies", priority: "0.8", changefreq: "weekly" },
    { url: "/reviews", priority: "0.8", changefreq: "weekly" },
    { url: "/report-scam", priority: "0.9", changefreq: "monthly" },
    { url: "/resources", priority: "0.7", changefreq: "weekly" }
  ];

  // Blog categories
  const blogCategories = [
    "blockchain-investigation",
    "cryptocurrency-security",
    "fraud-prevention",
    "asset-recovery-insights",
    "blockchain-analytics",
    "cybercrime-intelligence",
    "digital-asset-protection",
    "industry-news"
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${staticPages
    .map((page) => {
      return `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join("")}
  ${blogPosts
    .map((post) => {
      return `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at || post.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("")}
  ${blogCategories
    .map((category) => {
      return `
  <url>
    <loc>${baseUrl}/blog/category/${category}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    })
    .join("")}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    // Fetch all published blog posts
    const { data: blogPosts, error } = await supabase
      .from("blog_posts")
      .select("slug, created_at, updated_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts for sitemap:", error);
    }

    // Generate the XML sitemap
    const sitemap = generateSiteMap(blogPosts || []);

    res.setHeader("Content-Type", "text/xml");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate");
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error("Sitemap generation error:", error);
    
    // Return a basic sitemap on error
    const basicSitemap = generateSiteMap([]);
    res.setHeader("Content-Type", "text/xml");
    res.write(basicSitemap);
    res.end();

    return {
      props: {},
    };
  }
};

export default function Sitemap() {
  return null;
}