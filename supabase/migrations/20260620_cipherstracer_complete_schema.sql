-- CIPHERSTRACER COMPLETE DATABASE SCHEMA
-- Comprehensive backend system for blockchain investigation platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PROFILES & AUTHENTICATION
-- ============================================================================

-- User profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'client')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

-- Create index for faster lookups
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);

-- ============================================================================
-- CLIENT CASE MANAGEMENT
-- ============================================================================

-- Cases table
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  case_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  case_type TEXT NOT NULL CHECK (case_type IN (
    'fraud_investigation',
    'asset_recovery',
    'wallet_tracing',
    'transaction_analysis',
    'compliance_review',
    'forensic_analysis',
    'other'
  )),
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN (
    'submitted',
    'under_review',
    'investigation_started',
    'additional_info_required',
    'analysis_in_progress',
    'report_preparation',
    'report_delivered',
    'completed',
    'closed'
  )),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  amount_involved NUMERIC(20, 2),
  currency TEXT DEFAULT 'USD',
  blockchain_network TEXT[],
  wallet_addresses TEXT[],
  transaction_ids TEXT[],
  assigned_to UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  estimated_completion_date DATE,
  notes TEXT
);

-- Create indexes
CREATE INDEX idx_cases_client_id ON cases(client_id);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_case_number ON cases(case_number);
CREATE INDEX idx_cases_created_at ON cases(created_at DESC);

-- Case timeline/activity log
CREATE TABLE case_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  activity_type TEXT NOT NULL CHECK (activity_type IN (
    'status_change',
    'note_added',
    'document_uploaded',
    'message_sent',
    'assignment_changed',
    'report_uploaded',
    'update_posted'
  )),
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_case_activities_case_id ON case_activities(case_id);
CREATE INDEX idx_case_activities_created_at ON case_activities(created_at DESC);

-- Case documents/files
CREATE TABLE case_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES profiles(id),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT,
  document_type TEXT CHECK (document_type IN (
    'evidence',
    'screenshot',
    'transaction_record',
    'communication',
    'report',
    'other'
  )),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_case_documents_case_id ON case_documents(case_id);

-- Case messages/communications
CREATE TABLE case_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id),
  recipient_id UUID REFERENCES profiles(id),
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_case_messages_case_id ON case_messages(case_id);
CREATE INDEX idx_case_messages_recipient ON case_messages(recipient_id, is_read);

-- ============================================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================================

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  subscription_source TEXT CHECK (subscription_source IN (
    'footer',
    'blog_sidebar',
    'popup',
    'landing_page',
    'other'
  )),
  is_active BOOLEAN DEFAULT true,
  confirmed BOOLEAN DEFAULT false,
  confirmation_token TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscribers(is_active);

-- ============================================================================
-- CONTACT FORM SUBMISSIONS
-- ============================================================================

CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  form_source TEXT DEFAULT 'homepage',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
  assigned_to UUID REFERENCES profiles(id),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  notes TEXT
);

CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);

-- ============================================================================
-- KNOWLEDGE CENTER / BLOG
-- ============================================================================

-- Blog categories
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog tags
CREATE TABLE blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id UUID REFERENCES profiles(id),
  category_id UUID REFERENCES blog_categories(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  reading_time INTEGER,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);

-- Blog post tags (many-to-many)
CREATE TABLE blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- ============================================================================
-- FAQ MANAGEMENT
-- ============================================================================

CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_faqs_active ON faqs(is_active, display_order);

-- ============================================================================
-- MEDIA LIBRARY
-- ============================================================================

CREATE TABLE media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  uploaded_by UUID REFERENCES profiles(id),
  alt_text TEXT,
  caption TEXT,
  folder TEXT,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_library_uploaded_by ON media_library(uploaded_by);
CREATE INDEX idx_media_library_file_type ON media_library(file_type);

-- ============================================================================
-- WEBSITE SETTINGS & CONTENT
-- ============================================================================

CREATE TABLE website_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT,
  description TEXT,
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_website_settings_key ON website_settings(key);

-- Page content management
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  template TEXT DEFAULT 'default',
  is_published BOOLEAN DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_by UUID REFERENCES profiles(id),
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_published ON pages(is_published);

-- ============================================================================
-- SECURITY & AUDIT LOGS
-- ============================================================================

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_table_name ON audit_logs(table_name);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_settings_updated_at BEFORE UPDATE ON website_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate case numbers
CREATE OR REPLACE FUNCTION generate_case_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  year_part TEXT;
  sequence_part INTEGER;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(case_number FROM 6) AS INTEGER)), 0) + 1
  INTO sequence_part
  FROM cases
  WHERE case_number LIKE year_part || '-%';
  
  new_number := year_part || '-' || LPAD(sequence_part::TEXT, 5, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Cases policies
CREATE POLICY "Clients can view their own cases"
  ON cases FOR SELECT
  USING (
    client_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Clients can create cases"
  ON cases FOR INSERT
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Admins can manage all cases"
  ON cases FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Case activities policies
CREATE POLICY "View case activities based on case access"
  ON case_activities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cases
      WHERE id = case_activities.case_id
      AND (client_id = auth.uid() OR EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
      ))
    )
  );

-- Case documents policies
CREATE POLICY "View case documents based on case access"
  ON case_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cases
      WHERE id = case_documents.case_id
      AND (client_id = auth.uid() OR EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
      ))
    )
  );

CREATE POLICY "Upload documents to own cases"
  ON case_documents FOR INSERT
  WITH CHECK (
    uploaded_by = auth.uid()
    AND EXISTS (
      SELECT 1 FROM cases
      WHERE id = case_documents.case_id
      AND (client_id = auth.uid() OR EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
      ))
    )
  );

-- Case messages policies
CREATE POLICY "View messages for accessible cases"
  ON case_messages FOR SELECT
  USING (
    sender_id = auth.uid()
    OR recipient_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Newsletter subscribers - admin only
CREATE POLICY "Admins manage newsletter subscribers"
  ON newsletter_subscribers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Contact inquiries - admin only
CREATE POLICY "Admins manage contact inquiries"
  ON contact_inquiries FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Blog categories - public read, admin write
CREATE POLICY "Anyone can view active blog categories"
  ON blog_categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins manage blog categories"
  ON blog_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Blog tags - public read, admin write
CREATE POLICY "Anyone can view blog tags"
  ON blog_tags FOR SELECT
  USING (true);

CREATE POLICY "Admins manage blog tags"
  ON blog_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Blog posts - public read published, admin write all
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published' AND published_at <= NOW());

CREATE POLICY "Admins manage all blog posts"
  ON blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- FAQs - public read active, admin write
CREATE POLICY "Anyone can view active FAQs"
  ON faqs FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins manage FAQs"
  ON faqs FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Media library - admin only
CREATE POLICY "Admins manage media library"
  ON media_library FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Website settings - admin only
CREATE POLICY "Admins manage website settings"
  ON website_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Pages - public read published, admin write
CREATE POLICY "Anyone can view published pages"
  ON pages FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins manage pages"
  ON pages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Audit logs - admin read only
CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Insert default blog categories
INSERT INTO blog_categories (name, slug, description, display_order) VALUES
  ('Blockchain Investigation', 'blockchain-investigation', 'Professional blockchain forensics and investigation techniques', 1),
  ('Cryptocurrency Security', 'cryptocurrency-security', 'Security best practices for digital assets', 2),
  ('Fraud Prevention', 'fraud-prevention', 'Preventing and detecting cryptocurrency fraud', 3),
  ('Asset Recovery Insights', 'asset-recovery-insights', 'Strategies and case studies for digital asset recovery', 4),
  ('Blockchain Analytics', 'blockchain-analytics', 'Advanced blockchain data analysis and intelligence', 5),
  ('Cybercrime Intelligence', 'cybercrime-intelligence', 'Latest trends in cryptocurrency-related cybercrime', 6),
  ('Digital Asset Protection', 'digital-asset-protection', 'Protecting your cryptocurrency investments', 7),
  ('Industry News', 'industry-news', 'Latest news in blockchain investigation and security', 8);

-- Insert default FAQs
INSERT INTO faqs (question, answer, category, display_order) VALUES
  (
    'What services does Cipherstracer provide?',
    'Cipherstracer provides comprehensive blockchain investigation and digital asset intelligence services including cryptocurrency fraud investigation, wallet tracing, transaction analysis, asset recovery assistance, forensic evidence collection, and compliance support. We serve individuals, businesses, law enforcement agencies, and financial institutions worldwide.',
    'Services',
    1
  ),
  (
    'How does blockchain transaction analysis work?',
    'Our forensic platform traces cryptocurrency movements across blockchain networks by mapping transaction flows from wallet to wallet, identifying wallet clusters controlled by the same entity, determining when funds enter or exit exchanges, and analyzing patterns even through mixers and tumblers. We combine on-chain data with KYC information from exchanges (obtained through legal channels) to link addresses to real-world identities.',
    'Process',
    2
  ),
  (
    'What information do I need to start a case review?',
    'To begin, provide: (1) A detailed description of the incident or fraud, (2) All relevant cryptocurrency wallet addresses and transaction IDs, (3) Communications with the other party (emails, messages, screenshots), (4) Dates and amounts of transactions, and (5) Any documentation from exchanges or wallets involved. The more information you provide, the more effective our investigation will be.',
    'Getting Started',
    3
  ),
  (
    'How long does an investigation take?',
    'Investigation timelines vary based on complexity. Initial case assessment typically takes 24-48 hours. Basic transaction tracing may be completed within 3-5 business days. Complex cases involving multiple blockchains, exchanges, or international actors can take 2-4 weeks. Emergency cases receive expedited processing with preliminary findings often available within 48 hours.',
    'Timeline',
    4
  ),
  (
    'Which blockchain networks do you support?',
    'We support comprehensive analysis across 50+ blockchain networks including Bitcoin, Ethereum, Binance Smart Chain, Tron, Litecoin, Bitcoin Cash, Ripple, Cardano, Polkadot, and 900+ cryptocurrencies. This includes ERC-20 tokens, stablecoins like USDT and USDC, and DeFi protocols. We also trace transactions through cross-chain bridges and decentralized exchanges.',
    'Technical',
    5
  ),
  (
    'How is my information protected?',
    'All case data is protected with AES-256 military-grade encryption both at rest and in transit. We apply attorney-client privilege protocols where applicable and never share case details without explicit consent. Our systems are SOC 2 Type II certified and comply with GDPR, CCPA, and international data protection standards. Multi-region redundant backups ensure data integrity with strict access controls and comprehensive audit logging.',
    'Security',
    6
  ),
  (
    'Do you provide investigation reports?',
    'Yes. We provide detailed forensic reports with complete transaction documentation, wallet attribution evidence, visual transaction flow diagrams, and expert analysis. Reports meet evidentiary standards for criminal and civil proceedings worldwide. We can also provide expert witness testimony and technical consultation for legal teams when required.',
    'Reports',
    7
  ),
  (
    'Can businesses use your services?',
    'Absolutely. We serve cryptocurrency exchanges, financial institutions, compliance teams, legal professionals, and businesses requiring blockchain intelligence. Our enterprise services include AML/KYC compliance support, transaction monitoring, security audits, custom intelligence solutions, and professional training programs. We work with 200+ exchanges and institutions globally.',
    'Enterprise',
    8
  ),
  (
    'What happens after I submit a contact request?',
    'After submission, you''ll receive an automated confirmation email. Within 24 hours, a case specialist will review your inquiry and contact you to discuss your situation in detail. If you qualify for our services, we''ll provide a clear proposal outlining scope, timeline, and costs. Emergency cases receive priority response within 2-4 hours.',
    'Contact',
    9
  ),
  (
    'How do I speak with a specialist?',
    'Contact us via email at support@cipherstracer.com, phone at +1 (940) 560-9662, or submit the consultation form on this page. For urgent matters requiring immediate attention, call our emergency hotline. Our team is available 24/7 to assist with critical cases. All initial consultations are confidential.',
    'Contact',
    10
  );

-- Insert default website settings
INSERT INTO website_settings (key, value, category, description) VALUES
  ('company_info', '{"name": "Cipherstracer", "email": "support@cipherstracer.com", "phone": "+1 (940) 560-9662", "address": "United States", "description": "Professional blockchain investigation and cryptocurrency recovery services"}', 'general', 'Company contact information'),
  ('social_media', '{"twitter": "https://twitter.com/Cipherstracer", "linkedin": "https://www.linkedin.com/company/cipherstracer"}', 'general', 'Social media links'),
  ('seo_defaults', '{"site_name": "Cipherstracer", "default_title": "Cipherstracer | Blockchain Investigation & Digital Asset Recovery", "default_description": "Professional blockchain investigation and cryptocurrency recovery services. Expert wallet tracing, fraud investigation, and digital asset forensics."}', 'seo', 'Default SEO settings');