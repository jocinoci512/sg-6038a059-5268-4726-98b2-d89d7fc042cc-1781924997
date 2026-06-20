import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Mail, 
  FolderKanban,
  Loader2 
} from "lucide-react";

interface AnalyticsData {
  totalCases: number;
  activeCases: number;
  totalClients: number;
  blogPosts: number;
  publishedPosts: number;
  newsletterSubscribers: number;
  contactInquiries: number;
  newInquiries: number;
  casesThisMonth: number;
  subscribersThisMonth: number;
}

export function AnalyticsSection() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalCases: 0,
    activeCases: 0,
    totalClients: 0,
    blogPosts: 0,
    publishedPosts: 0,
    newsletterSubscribers: 0,
    contactInquiries: 0,
    newInquiries: 0,
    casesThisMonth: 0,
    subscribersThisMonth: 0,
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Cases
      const { count: totalCases } = await supabase
        .from("cases")
        .select("*", { count: "exact", head: true });

      const { count: activeCases } = await supabase
        .from("cases")
        .select("*", { count: "exact", head: true })
        .not("status", "in", '("completed","closed")');

      const { count: casesThisMonth } = await supabase
        .from("cases")
        .select("*", { count: "exact", head: true })
        .gte("created_at", thirtyDaysAgo.toISOString());

      // Clients - fetch all profiles and count client roles
      const { data: allProfiles } = await supabase
        .from("profiles")
        .select("*");
    
      const totalClients = allProfiles?.filter(p => (p as any).role === "client").length || 0;

      // Blog
      const { count: blogPosts } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });

      const { count: publishedPosts } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");

      // Newsletter
      const { count: newsletterSubscribers } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      const { count: subscribersThisMonth } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
        .gte("subscribed_at", thirtyDaysAgo.toISOString());

      // Contact Inquiries
      const { count: contactInquiries } = await supabase
        .from("contact_inquiries")
        .select("*", { count: "exact", head: true });

      const { count: newInquiries } = await supabase
        .from("contact_inquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");

      setAnalytics({
        totalCases: totalCases || 0,
        activeCases: activeCases || 0,
        totalClients: totalClients,
        blogPosts: blogPosts || 0,
        publishedPosts: publishedPosts || 0,
        newsletterSubscribers: newsletterSubscribers || 0,
        contactInquiries: contactInquiries || 0,
        newInquiries: newInquiries || 0,
        casesThisMonth: casesThisMonth || 0,
        subscribersThisMonth: subscribersThisMonth || 0,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error loading analytics:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
          <FolderKanban className="h-4 w-4 text-slate-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.totalCases}</div>
          <p className="text-xs text-slate-600">
            {analytics.activeCases} active · {analytics.casesThisMonth} this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clients</CardTitle>
          <Users className="h-4 w-4 text-slate-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.totalClients}</div>
          <p className="text-xs text-slate-600">Registered client accounts</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
          <FileText className="h-4 w-4 text-slate-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.blogPosts}</div>
          <p className="text-xs text-slate-600">
            {analytics.publishedPosts} published
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Newsletter</CardTitle>
          <Mail className="h-4 w-4 text-slate-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.newsletterSubscribers}</div>
          <p className="text-xs text-slate-600">
            +{analytics.subscribersThisMonth} this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contact Inquiries</CardTitle>
          <TrendingUp className="h-4 w-4 text-slate-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.contactInquiries}</div>
          <p className="text-xs text-slate-600">
            {analytics.newInquiries} pending response
          </p>
        </CardContent>
      </Card>
    </div>
  );
}