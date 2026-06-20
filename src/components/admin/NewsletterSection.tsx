import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Download, Trash2, Search, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Subscriber {
  id: string;
  email: string;
  full_name: string | null;
  is_active: boolean;
  subscribed_at: string;
  subscription_source: string | null;
}

export function NewsletterSection() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error("Error loading subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", id);

      if (error) throw error;
      loadSubscribers();
    } catch (error) {
      console.error("Error deleting subscriber:", error);
    }
  };

  const exportToCSV = () => {
    const csv = [
      ["Email", "Name", "Status", "Source", "Subscribed Date"],
      ...subscribers.map((sub) => [
        sub.email,
        sub.full_name || "",
        sub.is_active ? "Active" : "Inactive",
        sub.subscription_source || "Website",
        format(new Date(sub.subscribed_at), "yyyy-MM-dd HH:mm:ss"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.full_name && sub.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activeSubscribers = filteredSubscribers.filter((s) => s.is_active);
  const inactiveSubscribers = filteredSubscribers.filter((s) => !s.is_active);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search subscribers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeSubscribers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-400">{inactiveSubscribers.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscriber List</CardTitle>
          <CardDescription>
            {filteredSubscribers.length} subscriber{filteredSubscribers.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredSubscribers.length === 0 ? (
              <p className="text-sm text-slate-500 py-8 text-center">No subscribers found</p>
            ) : (
              filteredSubscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <div>
                      <div className="font-medium text-slate-900">{subscriber.email}</div>
                      <div className="text-sm text-slate-500">
                        {subscriber.full_name && <span>{subscriber.full_name} · </span>}
                        {format(new Date(subscriber.subscribed_at), "MMM d, yyyy")}
                        {subscriber.subscription_source && (
                          <span className="ml-2 text-xs">via {subscriber.subscription_source}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={subscriber.is_active ? "default" : "secondary"}
                      className={subscriber.is_active ? "bg-green-100 text-green-800" : ""}
                    >
                      {subscriber.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSubscriber(subscriber.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}