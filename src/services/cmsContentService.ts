import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type WebsiteContent = Tables<"website_content">;

export interface ContentSection {
  page_name: string;
  section_key: string;
  section_type: "heading" | "description" | "cta_text" | "cta_link" | "list_item" | "paragraph" | "footer_text" | "contact_info";
  content_text: string;
  display_order?: number;
  is_active?: boolean;
}

// Fetch all content for a specific page
export async function getPageContent(pageName: string) {
  const { data, error } = await supabase
    .from("website_content")
    .select("*")
    .eq("page_name", pageName)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching page content:", error);
    return null;
  }

  return data;
}

// Fetch specific content section
export async function getContentSection(pageName: string, sectionKey: string) {
  const { data, error } = await supabase
    .from("website_content")
    .select("*")
    .eq("page_name", pageName)
    .eq("section_key", sectionKey)
    .single();

  if (error) {
    console.error("Error fetching content section:", error);
    return null;
  }

  return data;
}

// Get all content grouped by page
export async function getAllContent() {
  const { data, error } = await supabase
    .from("website_content")
    .select("*")
    .order("page_name", { ascending: true })
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching all content:", error);
    return null;
  }

  return data;
}

// Create new content section
export async function createContentSection(content: ContentSection) {
  const { data, error } = await supabase
    .from("website_content")
    .insert([content])
    .select()
    .single();

  if (error) {
    console.error("Error creating content section:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Update existing content section
export async function updateContentSection(id: string, updates: Partial<ContentSection>) {
  const { data, error } = await supabase
    .from("website_content")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating content section:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Update content by page and section key
export async function updateContentByKey(
  pageName: string,
  sectionKey: string,
  contentText: string
) {
  const { data, error } = await supabase
    .from("website_content")
    .update({ content_text: contentText, updated_at: new Date().toISOString() })
    .eq("page_name", pageName)
    .eq("section_key", sectionKey)
    .select()
    .single();

  if (error) {
    console.error("Error updating content:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Delete content section
export async function deleteContentSection(id: string) {
  const { error } = await supabase
    .from("website_content")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting content section:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Bulk upsert content sections
export async function bulkUpsertContent(sections: ContentSection[]) {
  const { data, error } = await supabase
    .from("website_content")
    .upsert(sections, { onConflict: "page_name,section_key" })
    .select();

  if (error) {
    console.error("Error bulk upserting content:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}