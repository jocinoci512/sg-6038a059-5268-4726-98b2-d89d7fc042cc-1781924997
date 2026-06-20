import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type PageSEO = Tables<"page_seo">;

export interface SEOInput {
  page_slug: string;
  seo_title: string;
  seo_description: string;
  seo_keywords?: string;
  og_image?: string;
  canonical_url?: string;
}

// Get all SEO settings
export async function getAllSEO() {
  const { data, error } = await supabase
    .from("page_seo")
    .select("*")
    .order("page_slug", { ascending: true });

  if (error) {
    console.error("Error fetching SEO settings:", error);
    return null;
  }

  return data;
}

// Get SEO for specific page
export async function getPageSEO(pageSlug: string) {
  const { data, error } = await supabase
    .from("page_seo")
    .select("*")
    .eq("page_slug", pageSlug)
    .single();

  if (error) {
    console.error("Error fetching page SEO:", error);
    return null;
  }

  return data;
}

// Create or update SEO settings (upsert)
export async function upsertPageSEO(seo: SEOInput) {
  const { data, error } = await supabase
    .from("page_seo")
    .upsert([{ ...seo, updated_at: new Date().toISOString() }], { onConflict: "page_slug" })
    .select()
    .single();

  if (error) {
    console.error("Error upserting SEO:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Delete SEO settings
export async function deleteSEO(pageSlug: string) {
  const { error } = await supabase
    .from("page_seo")
    .delete()
    .eq("page_slug", pageSlug);

  if (error) {
    console.error("Error deleting SEO:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}