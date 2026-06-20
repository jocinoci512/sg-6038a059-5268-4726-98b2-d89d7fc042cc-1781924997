import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

/**
 * Helper functions for common Supabase operations
 */

// ============================================================================
// CASE MANAGEMENT HELPERS
// ============================================================================

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
      .from('cases')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get cases error:', error);
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

export async function logCaseActivity(
  caseId: string,
  userId: string,
  activityType: string,
  title: string,
  description?: string,
  metadata?: any
) {
  try {
    const { data, error } = await supabase
      .from('case_activities')
      .insert({
        case_id: caseId,
        user_id: userId,
        activity_type: activityType,
        title,
        description,
        metadata
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Log case activity error:', error);
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

// ============================================================================
// BLOG MANAGEMENT HELPERS
// ============================================================================

export async function getPublishedBlogPosts(limit?: number) {
  try {
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(name, slug),
        author:profiles(full_name)
      `)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get blog posts error:', error);
    return { data: null, error };
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(name, slug),
        author:profiles(full_name)
      `)
      .eq('slug', slug)
      .single();

    if (error) throw error;

    // Increment view count
    if (data) {
      await supabase
        .from('blog_posts')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id);
    }

    return { data, error: null };
  } catch (error) {
    console.error('Get blog post error:', error);
    return { data: null, error };
  }
}

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

// ============================================================================
// NEWSLETTER HELPERS
// ============================================================================

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

// ============================================================================
// CONTACT INQUIRY HELPERS
// ============================================================================

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

// ============================================================================
// FAQ HELPERS
// ============================================================================

export async function getActiveFAQs() {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get FAQs error:', error);
    return { data: null, error };
  }
}

// ============================================================================
// WEBSITE SETTINGS HELPERS
// ============================================================================

export async function getWebsiteSetting(key: string) {
  try {
    const { data, error } = await supabase
      .from("website_settings")
      .select("value")
      .eq("key", key)
      .single();

    if (error) throw error;
    if (!data) return { data: null, error: null };

    return { data: data.value, error: null };
  } catch (error) {
    console.error('Get website setting error:', error);
    return { data: null, error };
  }
}

export async function updateWebsiteSetting(key: string, value: any, userId?: string) {
  try {
    const updateData: TablesUpdate<"website_settings"> = {
      value,
      updated_by: userId || null,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("website_settings")
      .update(updateData)
      .eq("key", key)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Update website setting error:', error);
    return { data: null, error };
  }
}