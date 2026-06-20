import { supabase } from "@/integrations/supabase/client";

/**
 * Helper functions for common Supabase operations
 */

// ============================================================================
// CASE MANAGEMENT HELPERS
// ============================================================================

export async function createCase(caseData: {
  client_id: string;
  title: string;
  description: string;
  case_type: string;
  amount_involved?: number;
  currency?: string;
  blockchain_network?: string[];
  wallet_addresses?: string[];
  transaction_ids?: string[];
}) {
  try {
    // Generate case number
    const { data: caseNumberData } = await supabase.rpc('generate_case_number');
    
    const { data, error } = await supabase
      .from('cases')
      .insert({
        ...caseData,
        case_number: caseNumberData,
        status: 'submitted'
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logCaseActivity(data.id, caseData.client_id, 'status_change', 'Case Submitted', 'New case submitted for review');

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

export async function updateCaseStatus(caseId: string, status: string, userId: string, notes?: string) {
  try {
    const { data, error } = await supabase
      .from('cases')
      .update({ status })
      .eq('id', caseId)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logCaseActivity(caseId, userId, 'status_change', `Status Updated to ${status}`, notes || `Case status changed to ${status}`);

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

// ============================================================================
// NEWSLETTER HELPERS
// ============================================================================

export async function subscribeToNewsletter(email: string, fullName?: string, source?: string) {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        full_name: fullName,
        subscription_source: source || 'footer',
        is_active: true
      })
      .select()
      .single();

    if (error) {
      // Check if already subscribed
      if (error.code === '23505') {
        return { data: null, error: { message: 'Email already subscribed' } };
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

export async function createContactInquiry(inquiryData: {
  full_name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  form_source?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert({
        ...inquiryData,
        status: 'new'
      })
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
      .from('website_settings')
      .select('value')
      .eq('key', key)
      .single();

    if (error) throw error;
    return { data: data?.value, error: null };
  } catch (error) {
    console.error('Get website setting error:', error);
    return { data: null, error };
  }
}

export async function updateWebsiteSetting(key: string, value: any, userId: string) {
  try {
    const { data, error } = await supabase
      .from('website_settings')
      .upsert({
        key,
        value,
        updated_by: userId
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Update website setting error:', error);
    return { data: null, error };
  }
}