import Head from "next/head";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import AdminLayout from "@/components/admin/AdminLayout";
import AnalyticsSection from "@/components/admin/AnalyticsSection";
import { Shield, FileText, Image as ImageIcon, Search, BarChart3, Settings, Plus, Edit, Trash2, Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as cmsContentService from "@/services/cmsContentService";
import * as cmsBlogService from "@/services/cmsBlogService";
import * as cmsMediaService from "@/services/cmsMediaService";
import * as cmsSeoService from "@/services/cmsSeoService";
import type { Tables } from "@/integrations/supabase/types";

type WebsiteContent = Tables<"website_content">;
type BlogPost = Tables<"blog_posts">;
type MediaItem = Tables<"media_library">;
type PageSEO = Tables<"page_seo">;

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const { toast } = useToast();

  // Content Management State
  const [contentSections, setContentSections] = useState<WebsiteContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<WebsiteContent | null>(null);
  const [contentLoading, setContentLoading] = useState(true);

  // Blog Management State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    slug: "",
    content: "",
    featured_image: "",
    category: "",
    author_name: "CipherTrace Team",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    status: "draft" as "draft" | "published" | "unpublished"
  });
  const [blogLoading, setBlogLoading] = useState(true);

  // Media Library State
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(true);

  // SEO Settings State
  const [seoPages, setSeoPages] = useState<PageSEO[]>([]);
  const [selectedSeo, setSelectedSeo] = useState<PageSEO | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "cipheradmin2024") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the CMS dashboard",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  // Load Content Sections
  useEffect(() => {
    if (isAuthenticated) {
      loadContentSections();
      loadBlogPosts();
      loadMediaItems();
      loadSeoPages();
    }
  }, [isAuthenticated]);

  const loadContentSections = async () => {
    setContentLoading(true);
    const result = await cmsContentService.getAllContent();
    if (result) {
      setContentSections(result);
    }
    setContentLoading(false);
  };

  const loadBlogPosts = async () => {
    setBlogLoading(true);
    const result = await cmsBlogService.getAllBlogPosts();
    if (result) {
      setBlogPosts(result);
    }
    setBlogLoading(false);
  };

  const loadMediaItems = async () => {
    setMediaLoading(true);
    const result = await cmsMediaService.getAllMedia();
    if (result) {
      setMediaItems(result);
    }
    setMediaLoading(false);
  };

  const loadSeoPages = async () => {
    setSeoLoading(true);
    const result = await cmsSeoService.getAllSEO();
    if (result) {
      setSeoPages(result);
    }
    setSeoLoading(false);
  };

  // Content Management Functions
  const handleUpdateContent = async (content: WebsiteContent) => {
    const result = await cmsContentService.updateContentSection(content.id, {
      content_text: content.content_text
    });
    
    if (result.success) {
      toast({
        title: "Content Updated",
        description: "Website content saved successfully",
      });
      loadContentSections();
      setSelectedContent(null);
    } else {
      toast({
        title: "Update Failed",
        description: result.error || "Failed to update content",
        variant: "destructive",
      });
    }
  };

  // Blog Management Functions
  const handleCreateBlogPost = async () => {
    const result = await cmsBlogService.createBlogPost(blogFormData);
    
    if (result.success) {
      toast({
        title: "Blog Post Created",
        description: "Your blog post has been created successfully",
      });
      loadBlogPosts();
      resetBlogForm();
    } else {
      toast({
        title: "Creation Failed",
        description: result.error || "Failed to create blog post",
        variant: "destructive",
      });
    }
  };

  const handleUpdateBlogPost = async () => {
    if (!selectedBlogPost) return;
    
    const result = await cmsBlogService.updateBlogPost(selectedBlogPost.id, blogFormData);
    
    if (result.success) {
      toast({
        title: "Blog Post Updated",
        description: "Changes saved successfully",
      });
      loadBlogPosts();
      setSelectedBlogPost(null);
      resetBlogForm();
    } else {
      toast({
        title: "Update Failed",
        description: result.error || "Failed to update blog post",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    
    const result = await cmsBlogService.deleteBlogPost(id);
    
    if (result.success) {
      toast({
        title: "Blog Post Deleted",
        description: "Post removed successfully",
      });
      loadBlogPosts();
    } else {
      toast({
        title: "Deletion Failed",
        description: result.error || "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  const handlePublishToggle = async (post: BlogPost) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    const result = await cmsBlogService.updateBlogPost(post.id, { status: newStatus });
    
    if (result.success) {
      toast({
        title: newStatus === "published" ? "Post Published" : "Post Unpublished",
        description: `Blog post is now ${newStatus}`,
      });
      loadBlogPosts();
    }
  };

  const resetBlogForm = () => {
    setBlogFormData({
      title: "",
      slug: "",
      content: "",
      featured_image: "",
      category: "",
      author_name: "CipherTrace Team",
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
      status: "draft"
    });
  };

  const selectBlogPostForEdit = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setBlogFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      featured_image: post.featured_image || "",
      category: post.category || "",
      author_name: post.author_name || "CipherTrace Team",
      seo_title: post.seo_title || "",
      seo_description: post.seo_description || "",
      seo_keywords: post.seo_keywords || "",
      status: (post.status as "draft" | "published" | "unpublished") || "draft"
    });
  };

  // Media Management Functions
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMedia(true);
    const result = await cmsMediaService.uploadMedia(file, file.name.replace(/\.[^/.]+$/, ""));
    
    if (result.success && result.data) {
      toast({
        title: "Upload Successful",
        description: "Image uploaded to media library",
      });
      loadMediaItems();
    } else {
      toast({
        title: "Upload Failed",
        description: result.error || "Failed to upload image",
        variant: "destructive",
      });
    }
    setUploadingMedia(false);
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm("Delete this image from media library?")) return;
    
    const result = await cmsMediaService.deleteMedia(id);
    
    if (result.success) {
      toast({
        title: "Media Deleted",
        description: "Image removed from library",
      });
      loadMediaItems();
    } else {
      toast({
        title: "Deletion Failed",
        description: result.error || "Failed to delete media",
        variant: "destructive",
      });
    }
  };

  // SEO Management Functions
  const handleUpdateSeo = async (seo: PageSEO) => {
    const result = await cmsSeoService.upsertPageSEO({
      page_slug: seo.page_slug,
      seo_title: seo.seo_title,
      seo_description: seo.seo_description,
      seo_keywords: seo.seo_keywords || undefined,
      og_image: seo.og_image || undefined
    });
    
    if (result.success) {
      toast({
        title: "SEO Updated",
        description: "Page SEO settings saved successfully",
      });
      loadSeoPages();
      setSelectedSeo(null);
    } else {
      toast({
        title: "Update Failed",
        description: result.error || "Failed to update SEO",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login - CipherTracers</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Admin Access</CardTitle>
              <CardDescription>
                Secure login to CipherTracers CMS dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>CMS Dashboard - CipherTracers</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminLayout onLogout={() => setIsAuthenticated(false)}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Content Management System</h1>
            <p className="text-slate-600 mt-2">Manage all website content, blog posts, media, and SEO settings</p>
          </div>

          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Blog
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Media
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                SEO
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Content Management Tab */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Website Content Editor</CardTitle>
                  <CardDescription>
                    Edit text content across all website pages. Changes will appear on the live site immediately.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {contentLoading ? (
                    <div className="text-center py-8">Loading content sections...</div>
                  ) : contentSections.length === 0 ? (
                    <div className="text-center py-8 text-slate-600">
                      No content sections found. Content sections will be created automatically when pages are loaded.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {contentSections.map((section) => (
                        <div key={section.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-slate-900">{section.section_key}</h3>
                              <p className="text-sm text-slate-600">Page: {section.page_name}</p>
                            </div>
                            <Badge variant="secondary">{section.section_type}</Badge>
                          </div>
                          
                          {selectedContent?.id === section.id ? (
                            <div className="space-y-3">
                              <Textarea
                                value={selectedContent.content_text || ""}
                                onChange={(e) => setSelectedContent({ ...selectedContent, content_text: e.target.value })}
                                rows={4}
                                className="w-full"
                              />
                              <div className="flex gap-2">
                                <Button 
                                  onClick={() => handleUpdateContent(selectedContent)}
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <Save className="h-4 w-4 mr-2" />
                                  Save Changes
                                </Button>
                                <Button 
                                  onClick={() => setSelectedContent(null)}
                                  size="sm"
                                  variant="outline"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className="text-sm text-slate-700">{section.content_text}</p>
                              <Button 
                                onClick={() => setSelectedContent(section)}
                                size="sm"
                                variant="outline"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Management Tab */}
            <TabsContent value="blog">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedBlogPost ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
                    <CardDescription>
                      {selectedBlogPost ? "Update your blog post details" : "Add a new article to your blog"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="blog-title">Post Title *</Label>
                          <Input
                            id="blog-title"
                            value={blogFormData.title}
                            onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                            placeholder="Enter post title"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="blog-slug">URL Slug *</Label>
                          <Input
                            id="blog-slug"
                            value={blogFormData.slug}
                            onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                            placeholder="url-friendly-slug"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="blog-content">Main Content (HTML/Markdown) *</Label>
                        <Textarea
                          id="blog-content"
                          value={blogFormData.content}
                          onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                          placeholder="Write your blog post content here..."
                          rows={8}
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="blog-category">Category</Label>
                          <Input
                            id="blog-category"
                            value={blogFormData.category}
                            onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                            placeholder="Security, Blockchain, etc."
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="blog-author">Author</Label>
                          <Input
                            id="blog-author"
                            value={blogFormData.author_name}
                            onChange={(e) => setBlogFormData({ ...blogFormData, author_name: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="blog-image">Featured Image URL</Label>
                        <Input
                          id="blog-image"
                          value={blogFormData.featured_image}
                          onChange={(e) => setBlogFormData({ ...blogFormData, featured_image: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="seo-title">SEO Title</Label>
                          <Input
                            id="seo-title"
                            value={blogFormData.seo_title}
                            onChange={(e) => setBlogFormData({ ...blogFormData, seo_title: e.target.value })}
                            placeholder="SEO-optimized title"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="seo-desc">SEO Description</Label>
                          <Input
                            id="seo-desc"
                            value={blogFormData.seo_description}
                            onChange={(e) => setBlogFormData({ ...blogFormData, seo_description: e.target.value })}
                            placeholder="Meta description for search engines"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="seo-keywords">SEO Keywords</Label>
                        <Input
                          id="seo-keywords"
                          value={blogFormData.seo_keywords}
                          onChange={(e) => setBlogFormData({ ...blogFormData, seo_keywords: e.target.value })}
                          placeholder="crypto, scams, recovery (comma separated)"
                          className="mt-1"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Label htmlFor="blog-status">Status:</Label>
                        <Select 
                          value={blogFormData.status} 
                          onValueChange={(value: "draft" | "published" | "unpublished") => setBlogFormData({ ...blogFormData, status: value })}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="unpublished">Unpublished</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2 pt-4">
                        {selectedBlogPost ? (
                          <>
                            <Button 
                              onClick={handleUpdateBlogPost}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Update Post
                            </Button>
                            <Button 
                              onClick={() => {
                                setSelectedBlogPost(null);
                                resetBlogForm();
                              }}
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button 
                            onClick={handleCreateBlogPost}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Post
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>All Blog Posts</CardTitle>
                    <CardDescription>Manage your published and draft posts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {blogLoading ? (
                      <div className="text-center py-8">Loading blog posts...</div>
                    ) : blogPosts.length === 0 ? (
                      <div className="text-center py-8 text-slate-600">
                        No blog posts yet. Create your first post above!
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {blogPosts.map((post) => (
                          <div key={post.id} className="border rounded-lg p-4 flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-slate-900">{post.title}</h3>
                              <p className="text-sm text-slate-600 mt-1">/{post.slug}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant={post.status === "published" ? "default" : "secondary"}>
                                  {post.status}
                                </Badge>
                                {post.category && <Badge variant="outline">{post.category}</Badge>}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={post.status === "published"}
                                onCheckedChange={() => handlePublishToggle(post)}
                              />
                              <Button 
                                onClick={() => selectBlogPostForEdit(post)}
                                size="sm"
                                variant="outline"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                onClick={() => handleDeleteBlogPost(post.id)}
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Media Library Tab */}
            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Media Library</CardTitle>
                  <CardDescription>
                    Upload and manage images for your website and blog posts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                      <Label htmlFor="media-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-medium">
                          Click to upload
                        </span>
                        <span className="text-slate-600"> or drag and drop</span>
                      </Label>
                      <p className="text-sm text-slate-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                      <Input
                        id="media-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleMediaUpload}
                        className="hidden"
                        disabled={uploadingMedia}
                      />
                    </div>

                    {mediaLoading ? (
                      <div className="text-center py-8">Loading media library...</div>
                    ) : mediaItems.length === 0 ? (
                      <div className="text-center py-8 text-slate-600">
                        No images uploaded yet. Upload your first image above!
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {mediaItems.map((item) => (
                          <div key={item.id} className="border rounded-lg overflow-hidden">
                            <div className="aspect-square bg-slate-100 flex items-center justify-center">
                              <img 
                                src={item.file_url} 
                                alt={item.alt_text || item.file_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3 space-y-2">
                              <p className="text-sm font-medium text-slate-900 truncate">{item.file_name}</p>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 text-xs"
                                  onClick={() => {
                                    navigator.clipboard.writeText(item.file_url);
                                    toast({
                                      title: "URL Copied",
                                      description: "Image URL copied to clipboard",
                                    });
                                  }}
                                >
                                  Copy URL
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleDeleteMedia(item.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Settings Tab */}
            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>
                    Manage meta tags and SEO settings for all pages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {seoLoading ? (
                    <div className="text-center py-8">Loading SEO settings...</div>
                  ) : seoPages.length === 0 ? (
                    <div className="text-center py-8 text-slate-600">
                      No SEO settings found. Settings will be created automatically for new pages.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {seoPages.map((seo) => (
                        <div key={seo.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-slate-900">/{seo.page_slug}</h3>
                            </div>
                          </div>
                          
                          {selectedSeo?.id === seo.id ? (
                            <div className="space-y-3">
                              <div>
                                <Label>Meta Title</Label>
                                <Input
                                  value={selectedSeo.seo_title || ""}
                                  onChange={(e) => setSelectedSeo({ ...selectedSeo, seo_title: e.target.value })}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Meta Description</Label>
                                <Textarea
                                  value={selectedSeo.seo_description || ""}
                                  onChange={(e) => setSelectedSeo({ ...selectedSeo, seo_description: e.target.value })}
                                  rows={2}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Keywords (comma-separated)</Label>
                                <Input
                                  value={selectedSeo.seo_keywords || ""}
                                  onChange={(e) => setSelectedSeo({ ...selectedSeo, seo_keywords: e.target.value })}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>OG Image URL</Label>
                                <Input
                                  value={selectedSeo.og_image || ""}
                                  onChange={(e) => setSelectedSeo({ ...selectedSeo, og_image: e.target.value })}
                                  className="mt-1"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  onClick={() => handleUpdateSeo(selectedSeo)}
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <Save className="h-4 w-4 mr-2" />
                                  Save SEO
                                </Button>
                                <Button 
                                  onClick={() => setSelectedSeo(null)}
                                  size="sm"
                                  variant="outline"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-sm text-slate-700"><strong>Title:</strong> {seo.seo_title}</p>
                              <p className="text-sm text-slate-700"><strong>Description:</strong> {seo.seo_description}</p>
                              {seo.seo_keywords && (
                                <p className="text-sm text-slate-700"><strong>Keywords:</strong> {seo.seo_keywords}</p>
                              )}
                              <Button 
                                onClick={() => setSelectedSeo(seo)}
                                size="sm"
                                variant="outline"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit SEO
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <AnalyticsSection />
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
}