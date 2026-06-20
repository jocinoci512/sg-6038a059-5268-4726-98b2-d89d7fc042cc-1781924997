import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

/**
 * Case Management Helpers
 */

export async function createCase(caseData: Omit<TablesInsert<"cases">, "case_number">) {
  try {
    // Generate case number using database function
    const { data: caseNumber } = await supabase.rpc('generate_case_number');

    const insertData: TablesInsert<"cases"> = {
      ...caseData,
      case_number: caseNumber || `CASE-${Date.now()}`
    };

    const { data, error } = await supabase
      .from("cases")
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create case');

    return { data, error: null };
  } catch (error) {
    console.error('Create case error:', error);
    return { data: null, error };
  }
}

export async function getCasesByClient(clientId: string) {
  try {
    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get cases by client error:', error);
    return { data: null, error };
  }
}

export async function getCaseById(caseId: string) {
  try {
    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .eq("id", caseId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get case by ID error:', error);
    return { data: null, error };
  }
}

export async function updateCaseStatus(caseId: string, status: string) {
  try {
    const updateData: TablesUpdate<"cases"> = { status };

    const { data, error } = await supabase
      .from("cases")
      .update(updateData)
      .eq("id", caseId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Update case status error:', error);
    return { data: null, error };
  }
}

export async function addCaseActivity(activityData: TablesInsert<"case_activities">) {
  try {
    const { data, error } = await supabase
      .from("case_activities")
      .insert(activityData)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Add case activity error:', error);
    return { data: null, error };
  }
}

export async function getCaseActivities(caseId: string) {
  try {
    const { data, error } = await supabase
      .from("case_activities")
      .select("*")
      .eq("case_id", caseId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get case activities error:', error);
    return { data: null, error };
  }
}

/**
 * Blog Management Helpers
 */

export async function incrementBlogViewCount(slug: string) {
  try {
    const { data: post, error: fetchError } = await supabase
      .from("blog_posts")
      .select("id, view_count")
      .eq("slug", slug)
      .single();

    if (fetchError) throw fetchError;
    if (!post) throw new Error('Blog post not found');

    const updateData: TablesUpdate<"blog_posts"> = {
      view_count: (post.view_count || 0) + 1
    };

    const { error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", post.id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Increment blog view count error:', error);
    return { error };
  }
}

/**
 * Newsletter Management Helpers
 */

export async function subscribeNewsletter(email: string, fullName?: string, source?: string) {
  try {
    const insertData: TablesInsert<"newsletter_subscribers"> = {
      email,
      full_name: fullName || null,
      subscription_source: source || 'website'
    };

    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return { data: null, error: new Error('Email already subscribed') };
      }
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return { data: null, error };
  }
}

export async function unsubscribeNewsletter(email: string) {
  try {
    const updateData: TablesUpdate<"newsletter_subscribers"> = {
      is_active: false,
      unsubscribed_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .update(updateData)
      .eq("email", email)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Unsubscribe newsletter error:', error);
    return { data: null, error };
  }
}

/**
 * Contact Form Helpers
 */

export async function createContactInquiry(inquiryData: Omit<TablesInsert<"contact_inquiries">, "id" | "created_at">) {
  try {
    const insertData: TablesInsert<"contact_inquiries"> = {
      ...inquiryData,
      status: 'new'
    };

    const { data, error } = await supabase
      .from("contact_inquiries")
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Create contact inquiry error:', error);
    return { data: null, error };
  }
}

export async function updateInquiryStatus(inquiryId: string, status: string) {
  try {
    const updateData: TablesUpdate<"contact_inquiries"> = { status };

    const { data, error } = await supabase
      .from("contact_inquiries")
      .update(updateData)
      .eq("id", inquiryId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Update inquiry status error:', error);
    return { data: null, error };
  }
}