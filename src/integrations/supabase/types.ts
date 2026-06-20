export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'admin' | 'client'
          avatar_url: string | null
          created_at: string
          updated_at: string
          last_login: string | null
          is_active: boolean
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          role: 'admin' | 'client'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: 'admin' | 'client'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_active?: boolean
        }
      }
      cases: {
        Row: {
          id: string
          client_id: string
          case_number: string
          title: string
          description: string
          case_type: string
          status: string
          priority: string
          amount_involved: number | null
          currency: string | null
          blockchain_network: string[] | null
          wallet_addresses: string[] | null
          transaction_ids: string[] | null
          assigned_to: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
          estimated_completion_date: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          client_id: string
          case_number: string
          title: string
          description: string
          case_type: string
          status?: string
          priority?: string
          amount_involved?: number | null
          currency?: string | null
          blockchain_network?: string[] | null
          wallet_addresses?: string[] | null
          transaction_ids?: string[] | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
          estimated_completion_date?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          case_number?: string
          title?: string
          description?: string
          case_type?: string
          status?: string
          priority?: string
          amount_involved?: number | null
          currency?: string | null
          blockchain_network?: string[] | null
          wallet_addresses?: string[] | null
          transaction_ids?: string[] | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
          estimated_completion_date?: string | null
          notes?: string | null
        }
      }
      case_activities: {
        Row: {
          id: string
          case_id: string
          user_id: string
          activity_type: string
          title: string
          description: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          case_id: string
          user_id: string
          activity_type: string
          title: string
          description?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          user_id?: string
          activity_type?: string
          title?: string
          description?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
      case_documents: {
        Row: {
          id: string
          case_id: string
          uploaded_by: string
          file_name: string
          file_path: string
          file_type: string
          file_size: number | null
          document_type: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          case_id: string
          uploaded_by: string
          file_name: string
          file_path: string
          file_type: string
          file_size?: number | null
          document_type?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          uploaded_by?: string
          file_name?: string
          file_path?: string
          file_type?: string
          file_size?: number | null
          document_type?: string | null
          description?: string | null
          created_at?: string
        }
      }
      case_messages: {
        Row: {
          id: string
          case_id: string
          sender_id: string
          recipient_id: string
          subject: string | null
          message: string
          is_read: boolean
          is_internal: boolean
          created_at: string
        }
        Insert: {
          id?: string
          case_id: string
          sender_id: string
          recipient_id: string
          subject?: string | null
          message: string
          is_read?: boolean
          is_internal?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          sender_id?: string
          recipient_id?: string
          subject?: string | null
          message?: string
          is_read?: boolean
          is_internal?: boolean
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          full_name: string | null
          subscription_source: string | null
          is_active: boolean
          confirmed: boolean
          confirmation_token: string | null
          subscribed_at: string
          unsubscribed_at: string | null
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          subscription_source?: string | null
          is_active?: boolean
          confirmed?: boolean
          confirmation_token?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          subscription_source?: string | null
          is_active?: boolean
          confirmed?: boolean
          confirmation_token?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      contact_inquiries: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          form_source: string | null
          status: string
          assigned_to: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
          resolved_at: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          form_source?: string | null
          status?: string
          assigned_to?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          resolved_at?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          form_source?: string | null
          status?: string
          assigned_to?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          resolved_at?: string | null
          notes?: string | null
        }
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      blog_tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          author_id: string
          category_id: string | null
          status: string
          published_at: string | null
          scheduled_for: string | null
          view_count: number
          reading_time: number | null
          seo_title: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          author_id: string
          category_id?: string | null
          status?: string
          published_at?: string | null
          scheduled_for?: string | null
          view_count?: number
          reading_time?: number | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          author_id?: string
          category_id?: string | null
          status?: string
          published_at?: string | null
          scheduled_for?: string | null
          view_count?: number
          reading_time?: number | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      media_library: {
        Row: {
          id: string
          file_name: string
          file_path: string
          file_type: string
          file_size: number | null
          mime_type: string | null
          uploaded_by: string
          alt_text: string | null
          caption: string | null
          folder: string | null
          width: number | null
          height: number | null
          created_at: string
        }
        Insert: {
          id?: string
          file_name: string
          file_path: string
          file_type: string
          file_size?: number | null
          mime_type?: string | null
          uploaded_by: string
          alt_text?: string | null
          caption?: string | null
          folder?: string | null
          width?: number | null
          height?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          file_name?: string
          file_path?: string
          file_type?: string
          file_size?: number | null
          mime_type?: string | null
          uploaded_by?: string
          alt_text?: string | null
          caption?: string | null
          folder?: string | null
          width?: number | null
          height?: number | null
          created_at?: string
        }
      }
      website_settings: {
        Row: {
          id: string
          key: string
          value: Json
          category: string | null
          description: string | null
          updated_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          category?: string | null
          description?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          category?: string | null
          description?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pages: {
        Row: {
          id: string
          title: string
          slug: string
          content: Json
          template: string
          is_published: boolean
          seo_title: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          created_by: string
          updated_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: Json
          template?: string
          is_published?: boolean
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          created_by: string
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: Json
          template?: string
          is_published?: boolean
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          created_by?: string
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          table_name: string | null
          record_id: string | null
          old_data: Json | null
          new_data: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          table_name?: string | null
          record_id?: string | null
          old_data?: Json | null
          new_data?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          table_name?: string | null
          record_id?: string | null
          old_data?: Json | null
          new_data?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_case_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never