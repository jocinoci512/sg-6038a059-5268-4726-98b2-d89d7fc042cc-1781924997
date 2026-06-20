import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type BlogPost = Tables<"blog_posts">;
type BlogCategory = Tables<"blog_categories">;
type BlogTag = Tables<"blog_tags">;

export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author_id: string;
  category_id?: string;
  status: "draft" | "published" | "scheduled" | "archived";
  published_at?: string;
  scheduled_for?: string;
  reading_time?: number;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

/**
 * Get all blog posts (admin view)
 */
export async function getAllBlogPosts() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        category:blog_categories(name, slug),
        author:profiles(full_name)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Get all blog posts error:", error);
    return { data: null, error };
  }
}

/**
 * Get published blog posts (public view)
 */
export async function getPublishedBlogPosts(limit?: number) {
  try {
    let query = supabase
      .from("blog_posts")
      .select(`
        *,
        category:blog_categories(name, slug),
        author:profiles(full_name)
      `)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Get published blog posts error:", error);
    return { data: null, error };
  }
}

/**
 * Get blog post by ID
 */
export async function getBlogPostById(id: string) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        category:blog_categories(name, slug),
        author:profiles(full_name)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Get blog post by ID error:", error);
    return { data: null, error };
  }
}

/**
 * Create new blog post
 */
export async function createBlogPost(postData: BlogPostInput) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(postData)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Create blog post error:", error);
    return { data: null, error };
  }
}

/**
 * Update blog post
 */
export async function updateBlogPost(id: string, updates: Partial<BlogPostInput>) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Update blog post error:", error);
    return { data: null, error };
  }
}

/**
 * Delete blog post
 */
export async function deleteBlogPost(id: string) {
  try {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Delete blog post error:", error);
    return { error };
  }
}

/**
 * Get all blog categories
 */
export async function getBlogCategories() {
  try {
    const { data, error } = await supabase
      .from("blog_categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Get blog categories error:", error);
    return { data: null, error };
  }
}

/**
 * Increment blog post view count
 */
export async function incrementViewCount(slug: string) {
  try {
    const { data: post, error: fetchError } = await supabase
      .from("blog_posts")
      .select("id, view_count")
      .eq("slug", slug)
      .single();

    if (fetchError) throw fetchError;

    const { error } = await supabase
      .from("blog_posts")
      .update({ view_count: (post.view_count || 0) + 1 })
      .eq("id", post.id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Increment view count error:", error);
    return { error };
  }
}

/**
 * Get related blog posts
 */
export async function getRelatedBlogPosts(categoryId: string, currentPostId: string, limit: number = 3) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        category:blog_categories(name, slug)
      `)
      .eq("status", "published")
      .eq("category_id", categoryId)
      .neq("id", currentPostId)
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Get related blog posts error:", error);
    return { data: null, error };
  }
}