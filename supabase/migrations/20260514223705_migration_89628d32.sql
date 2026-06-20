-- Table 1: Website Content Sections (editable text across all pages)
CREATE TABLE IF NOT EXISTS website_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_name TEXT NOT NULL,
  section_key TEXT NOT NULL,
  section_type TEXT NOT NULL CHECK (section_type IN ('heading', 'description', 'cta_text', 'cta_link', 'list_item', 'paragraph', 'footer_text', 'contact_info')),
  content_text TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_name, section_key)
);

-- Table 2: Blog Posts (complete blog management)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  featured_image TEXT,
  category TEXT DEFAULT 'General',
  author_name TEXT DEFAULT 'CipherTrace Team',
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  content TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'unpublished')) DEFAULT 'draft',
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 3: Media Library (image and file management)
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL UNIQUE,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  alt_text TEXT,
  usage_context TEXT,
  uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 4: Page SEO Settings (SEO control for all pages)
CREATE TABLE IF NOT EXISTS page_seo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug TEXT NOT NULL UNIQUE,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  seo_keywords TEXT,
  og_image TEXT,
  canonical_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 5: Admin Users (secure authentication)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'editor', 'viewer')) DEFAULT 'editor',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_website_content_page ON website_content(page_name);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_media_library_type ON media_library(file_type);
CREATE INDEX IF NOT EXISTS idx_page_seo_slug ON page_seo(page_slug);

-- Enable RLS on all tables
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read access, authenticated write access
CREATE POLICY "Public can read published content" ON website_content FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can manage content" ON website_content FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Public can view media" ON media_library FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage media" ON media_library FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Public can read SEO settings" ON page_seo FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage SEO" ON page_seo FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Only super admins can manage admin users" ON admin_users FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
  )
);
CREATE POLICY "Admins can view other admins" ON admin_users FOR SELECT USING (auth.uid() IS NOT NULL);