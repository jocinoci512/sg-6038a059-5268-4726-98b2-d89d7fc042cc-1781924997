-- Apply the complete Cipherstracer schema migration
-- First drop the old incomplete profiles table and recreate with all fields

DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS pages CASCADE;
DROP TABLE IF EXISTS website_settings CASCADE;
DROP TABLE IF EXISTS media_library CASCADE;
DROP TABLE IF EXISTS blog_post_tags CASCADE;
DROP TABLE IF EXISTS blog_tags CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;
DROP TABLE IF EXISTS case_messages CASCADE;
DROP TABLE IF EXISTS case_documents CASCADE;
DROP TABLE IF EXISTS case_activities CASCADE;
DROP TABLE IF EXISTS cases CASCADE;
DROP TABLE IF EXISTS contact_inquiries CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;

-- Drop old profiles and recreate with all required fields
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Now recreate all other tables with the complete schema
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  case_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  case_type TEXT NOT NULL,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'investigation_started', 'additional_info_required', 'analysis_in_progress', 'report_preparation', 'report_delivered', 'completed', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  amount_involved DECIMAL(20, 2),
  currency TEXT DEFAULT 'USD',
  blockchain_network TEXT[],
  wallet_addresses TEXT[],
  transaction_ids TEXT[],
  assigned_to UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  estimated_completion_date TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

CREATE INDEX idx_cases_client_id ON cases(client_id);
CREATE INDEX idx_cases_status ON cases(status);

ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients can view own cases" ON cases FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Clients can create cases" ON cases FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  subscription_source TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  confirmed BOOLEAN DEFAULT FALSE,
  confirmation_token TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  user_agent TEXT
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Contact inquiries
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  form_source TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
  assigned_to UUID REFERENCES profiles(id),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit inquiry" ON contact_inquiries FOR INSERT WITH CHECK (true);

-- Blog categories
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id UUID NOT NULL REFERENCES profiles(id),
  category_id UUID REFERENCES blog_categories(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  reading_time INTEGER,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published posts" ON blog_posts FOR SELECT USING (status = 'published' AND published_at <= NOW());

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- FAQs
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active FAQs" ON faqs FOR SELECT USING (is_active = TRUE);

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Case activities
CREATE TABLE case_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('status_change', 'note_added', 'document_uploaded', 'message_sent', 'assigned', 'completed')),
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_case_activities_case_id ON case_activities(case_id);

ALTER TABLE case_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view case activities" ON case_activities FOR SELECT 
  USING (EXISTS (SELECT 1 FROM cases WHERE cases.id = case_activities.case_id AND cases.client_id = auth.uid()));

-- Helper function to generate case numbers
CREATE OR REPLACE FUNCTION generate_case_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
BEGIN
  new_number := 'CASE-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Seed blog categories
INSERT INTO blog_categories (name, slug, description, display_order) VALUES
('Blockchain Investigation', 'blockchain-investigation', 'In-depth analysis and techniques for blockchain forensics', 1),
('Cryptocurrency Security', 'cryptocurrency-security', 'Best practices for securing digital assets', 2),
('Fraud Prevention', 'fraud-prevention', 'Tips and strategies to avoid crypto scams', 3),
('Asset Recovery Insights', 'asset-recovery-insights', 'Case studies and methodologies for asset recovery', 4),
('Blockchain Analytics', 'blockchain-analytics', 'Advanced analytics and intelligence gathering', 5),
('Cybercrime Intelligence', 'cybercrime-intelligence', 'Latest trends in cryptocurrency-related cybercrime', 6),
('Digital Asset Protection', 'digital-asset-protection', 'Strategies for protecting your cryptocurrency holdings', 7),
('Industry News', 'industry-news', 'Latest developments in blockchain and cryptocurrency', 8)
ON CONFLICT (slug) DO NOTHING;

-- Seed FAQs
INSERT INTO faqs (question, answer, category, display_order) VALUES
('What services does Cipherstracer provide?', 'Cipherstracer provides comprehensive blockchain investigation and digital asset intelligence services including cryptocurrency fraud investigation, wallet tracing, transaction analysis, asset recovery assistance, forensic evidence collection, and compliance support. We serve individuals, businesses, law enforcement agencies, and financial institutions worldwide.', 'services', 1),
('How does blockchain transaction analysis work?', 'Our forensic platform traces cryptocurrency movements across blockchain networks by mapping transaction flows from wallet to wallet, identifying wallet clusters controlled by the same entity, determining when funds enter or exit exchanges, and analyzing patterns even through mixers and tumblers.', 'services', 2),
('What information do I need to start a case review?', 'To begin, provide: (1) A detailed description of the incident or fraud, (2) All relevant cryptocurrency wallet addresses and transaction IDs, (3) Communications with the other party, (4) Dates and amounts of transactions, and (5) Any documentation from exchanges or wallets involved.', 'process', 3)
ON CONFLICT DO NOTHING;