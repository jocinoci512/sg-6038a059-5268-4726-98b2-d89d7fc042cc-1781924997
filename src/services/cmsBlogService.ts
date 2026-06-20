import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type BlogPost = Tables<"blog_posts">;

export interface BlogPostInput {
  title: string;
  slug: string;
  featured_image?: string;
  category?: string;
  author_name?: string;
  publish_date?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  content: string;
  status?: "draft" | "published" | "unpublished";
}

// Get all blog posts (admin view)
export async function getAllBlogPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }

  return data;
}

// Get published blog posts only (public view)
export async function getPublishedBlogPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("publish_date", { ascending: false });

  if (error) {
    console.error("Error fetching published blog posts:", error);
    return null;
  }

  return data;
}

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data;
}

// Get single blog post by ID
export async function getBlogPostById(id: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data;
}

// Create new blog post
export async function createBlogPost(post: BlogPostInput) {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Update blog post
export async function updateBlogPost(id: string, updates: Partial<BlogPostInput>) {
  const { data, error } = await supabase
    .from("blog_posts")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Delete blog post
export async function deleteBlogPost(id: string) {
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Publish blog post
export async function publishBlogPost(id: string) {
  return updateBlogPost(id, { 
    status: "published",
    publish_date: new Date().toISOString()
  });
}

// Unpublish blog post
export async function unpublishBlogPost(id: string) {
  return updateBlogPost(id, { status: "unpublished" });
}

// Increment view count
export async function incrementViewCount(id: string) {
  const { data: post } = await supabase
    .from("blog_posts")
    .select("view_count")
    .eq("id", id)
    .single();

  if (!post) return { success: false };

  const { error } = await supabase
    .from("blog_posts")
    .update({ view_count: (post.view_count || 0) + 1 })
    .eq("id", id);

  if (error) {
    console.error("Error incrementing view count:", error);
    return { success: false };
  }

  return { success: true };
}

// Get blog categories
export async function getBlogCategories() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("category")
    .not("category", "is", null);

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  const categories = [...new Set(data.map((post) => post.category))];
  return categories.filter((cat): cat is string => cat !== null);
}