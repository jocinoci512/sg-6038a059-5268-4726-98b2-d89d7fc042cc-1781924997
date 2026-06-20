import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FolderKanban, 
  FileText, 
  Mail, 
  MessageSquare, 
  TrendingUp, 
  Users,
  Loader2,
  AlertCircle
} from "lucide-react";
import { authService } from "@/services/authService";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  totalCases: number;
  activeCases: number;
  blogPosts: number;
  newsletterSubscribers: number;
  contactInquiries: number;
  newInquiries: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalCases: 0,
    activeCases: 0,
    blogPosts: 0,
    newsletterSubscribers: 0,
    contactInquiries: 0,
    newInquiries: 0
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await authService.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      const isAdmin = await authService.isAdmin(user.id);

      if (!isAdmin) {
        router.push("/admin/login");
        return;
      }

      setAuthorized(true);
      await loadDashboardStats();
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/admin/login");
    }
  };

  const loadDashboardStats = async () => {
    try {
      // Get total cases
      const { count: totalCases } = await supabase
        .from("cases")
        .select("*", { count: "exact", head: true });

      // Get active cases (not completed or closed)
      const { count: activeCases } = await supabase
        .from("cases")
        .select("*", { count: "exact", head: true })
        .not("status", "in", "('completed', 'closed')");

      // Get blog posts
      const { count: blogPosts } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });

      // Get newsletter subscribers
      const { count: newsletterSubscribers } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Get total contact inquiries
      const { count: contactInquiries } = await supabase
        .from("contact_inquiries")
        .select("*", { count: "exact", head: true });

      // Get new inquiries
      const { count: newInquiries } = await supabase
        .from("contact_inquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");

      setStats({
        totalCases: totalCases || 0,
        activeCases: activeCases || 0,
        blogPosts: blogPosts || 0,
        newsletterSubscribers: newsletterSubscribers || 0,
        contactInquiries: contactInquiries || 0,
        newInquiries: newInquiries || 0
      });

      setLoading(false);
    } catch (error) {
      console.error("Error loading stats:", error);
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | Cipherstracer</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-2">
              Welcome back! Here's an overview of your blockchain investigation platform.
            </p>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Cases */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
                  <FolderKanban className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCases}</div>
                  <p className="text-xs text-slate-600 mt-1">
                    {stats.activeCases} active cases
                  </p>
                  <Button variant="link" className="px-0 mt-2" onClick={() => router.push("/admin/cases")}>
                    View all cases →
                  </Button>
                </CardContent>
              </Card>

              {/* Blog Posts */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.blogPosts}</div>
                  <p className="text-xs text-slate-600 mt-1">
                    Published articles
                  </p>
                  <Button variant="link" className="px-0 mt-2" onClick={() => router.push("/admin/blog")}>
                    Manage blog →
                  </Button>
                </CardContent>
              </Card>

              {/* Newsletter Subscribers */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Newsletter</CardTitle>
                  <Mail className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.newsletterSubscribers}</div>
                  <p className="text-xs text-slate-600 mt-1">
                    Active subscribers
                  </p>
                  <Button variant="link" className="px-0 mt-2" onClick={() => router.push("/admin/newsletter")}>
                    View subscribers →
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Inquiries */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contact Inquiries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.contactInquiries}</div>
                  <p className="text-xs text-slate-600 mt-1">
                    <span className="font-semibold text-blue-600">{stats.newInquiries} new</span> inquiries
                  </p>
                  <Button variant="link" className="px-0 mt-2" onClick={() => router.push("/admin/contacts")}>
                    View inquiries →
                  </Button>
                </CardContent>
              </Card>

              {/* Platform Activity */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Activity</CardTitle>
                  <TrendingUp className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Active</div>
                  <p className="text-xs text-slate-600 mt-1">
                    All systems operational
                  </p>
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                    Healthy
                  </Badge>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                  <Users className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => router.push("/admin/blog")}
                  >
                    Create New Post
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => router.push("/admin/cases")}
                  >
                    View Cases
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Activity Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates across your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8 text-slate-500">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>No recent activity to display</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
}