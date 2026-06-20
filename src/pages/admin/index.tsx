import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AnalyticsSection } from "@/components/admin/AnalyticsSection";
import { MessagesSection } from "@/components/admin/MessagesSection";
import { NewsletterSection } from "@/components/admin/NewsletterSection";
import { BlogManagementSection } from "@/components/admin/BlogManagementSection";
import { FAQManagementSection } from "@/components/admin/FAQManagementSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authService } from "@/services/authService";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await authService.getSession();

      if (!session) {
        router.push("/admin/login");
        return;
      }

      const isAdminUser = await authService.isAdmin(session.user.id);
      if (!isAdminUser) {
        router.push("/");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/admin/login");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Cipherstracer</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-2">
              Manage your blockchain investigation platform
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
              <TabsTrigger value="cases">Cases</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <AnalyticsSection />
            </TabsContent>

            <TabsContent value="blog">
              <BlogManagementSection />
            </TabsContent>

            <TabsContent value="faqs">
              <FAQManagementSection />
            </TabsContent>

            <TabsContent value="messages">
              <MessagesSection />
            </TabsContent>

            <TabsContent value="newsletter">
              <NewsletterSection />
            </TabsContent>

            <TabsContent value="cases">
              <div className="text-center py-12 text-slate-600">
                Case management interface coming soon
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
}