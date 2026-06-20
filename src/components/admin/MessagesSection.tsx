import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Search, CheckCircle, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface ContactInquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
  form_source: string | null;
}

export function MessagesSection() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error("Error loading inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsResolved = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_inquiries")
        .update({ status: "resolved", resolved_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      loadInquiries();
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const newInquiries = filteredInquiries.filter((i) => i.status === "new");
  const resolvedInquiries = filteredInquiries.filter((i) => i.status === "resolved");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Input
          placeholder="Search inquiries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* New Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              New Inquiries ({newInquiries.length})
            </CardTitle>
            <CardDescription>Requires response</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {newInquiries.length === 0 ? (
              <p className="text-sm text-slate-500">No new inquiries</p>
            ) : (
              newInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer"
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900">{inquiry.full_name}</h4>
                      <p className="text-sm text-slate-600">{inquiry.email}</p>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      New
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{inquiry.message}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    {format(new Date(inquiry.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Resolved Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Resolved ({resolvedInquiries.length})
            </CardTitle>
            <CardDescription>Completed inquiries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {resolvedInquiries.length === 0 ? (
              <p className="text-sm text-slate-500">No resolved inquiries</p>
            ) : (
              resolvedInquiries.slice(0, 5).map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer"
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900">{inquiry.full_name}</h4>
                      <p className="text-sm text-slate-600">{inquiry.email}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Resolved
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{inquiry.message}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    {format(new Date(inquiry.created_at), "MMM d, yyyy")}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected Inquiry Detail */}
      {selectedInquiry && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Inquiry Details</CardTitle>
                <CardDescription>
                  From {selectedInquiry.full_name} on{" "}
                  {format(new Date(selectedInquiry.created_at), "MMMM d, yyyy")}
                </CardDescription>
              </div>
              {selectedInquiry.status === "new" && (
                <Button onClick={() => markAsResolved(selectedInquiry.id)} size="sm">
                  Mark as Resolved
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="text-slate-900">{selectedInquiry.full_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-slate-900">{selectedInquiry.email}</p>
            </div>
            {selectedInquiry.phone && (
              <div>
                <label className="text-sm font-medium">Phone</label>
                <p className="text-slate-900">{selectedInquiry.phone}</p>
              </div>
            )}
            {selectedInquiry.subject && (
              <div>
                <label className="text-sm font-medium">Subject</label>
                <p className="text-slate-900">{selectedInquiry.subject}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium">Message</label>
              <p className="text-slate-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Source</label>
              <p className="text-slate-900">{selectedInquiry.form_source || "Website"}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}