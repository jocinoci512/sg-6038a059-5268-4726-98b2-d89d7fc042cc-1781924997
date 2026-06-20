import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, GripVertical, Loader2, ArrowUp, ArrowDown } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export function FAQManagementSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    is_active: true
  });

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error loading FAQs:", error);
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingFAQ(null);
    setFormData({
      question: "",
      answer: "",
      category: "general",
      is_active: true
    });
    setShowEditor(true);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "general",
      is_active: faq.is_active
    });
    setShowEditor(true);
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      if (editingFAQ) {
        // Update existing FAQ
        const { error } = await supabase
          .from("faqs")
          .update(formData)
          .eq("id", editingFAQ.id);

        if (error) throw error;
      } else {
        // Create new FAQ - get max display_order
        const maxOrder = faqs.length > 0 
          ? Math.max(...faqs.map(f => f.display_order)) 
          : 0;

        const { error } = await supabase
          .from("faqs")
          .insert({
            ...formData,
            display_order: maxOrder + 1
          });

        if (error) throw error;
      }

      setShowEditor(false);
      loadFAQs();
      setSaving(false);
    } catch (error) {
      console.error("Error saving FAQ:", error);
      setSaving(false);
      alert("Failed to save FAQ. Please try again.");
    }
  };

  const handleDelete = async (faqId: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const { error } = await supabase
        .from("faqs")
        .delete()
        .eq("id", faqId);

      if (error) throw error;
      loadFAQs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Failed to delete FAQ. Please try again.");
    }
  };

  const handleToggleActive = async (faqId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from("faqs")
        .update({ is_active: !isActive })
        .eq("id", faqId);

      if (error) throw error;
      loadFAQs();
    } catch (error) {
      console.error("Error toggling FAQ status:", error);
      alert("Failed to update FAQ status. Please try again.");
    }
  };

  const handleReorder = async (faqId: string, direction: "up" | "down") => {
    const currentIndex = faqs.findIndex(f => f.id === faqId);
    if (currentIndex === -1) return;

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= faqs.length) return;

    const currentFAQ = faqs[currentIndex];
    const targetFAQ = faqs[targetIndex];

    try {
      // Swap display orders
      await supabase
        .from("faqs")
        .update({ display_order: targetFAQ.display_order })
        .eq("id", currentFAQ.id);

      await supabase
        .from("faqs")
        .update({ display_order: currentFAQ.display_order })
        .eq("id", targetFAQ.id);

      loadFAQs();
    } catch (error) {
      console.error("Error reordering FAQs:", error);
      alert("Failed to reorder FAQs. Please try again.");
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">FAQs</h2>
          <p className="text-slate-600 mt-1">Manage frequently asked questions</p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          New FAQ
        </Button>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-slate-500">No FAQs found. Create your first FAQ!</p>
            </CardContent>
          </Card>
        ) : (
          faqs.map((faq, index) => (
            <Card key={faq.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-1 mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReorder(faq.id, "up")}
                      disabled={index === 0}
                      className="h-6 w-6 p-0"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReorder(faq.id, "down")}
                      disabled={index === faqs.length - 1}
                      className="h-6 w-6 p-0"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                        <Badge variant={faq.is_active ? "default" : "secondary"}>
                          {faq.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(faq.id, faq.is_active)}
                        >
                          {faq.is_active ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(faq)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(faq.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{faq.answer}</p>
                    {faq.category && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingFAQ ? "Edit FAQ" : "Create New FAQ"}
            </DialogTitle>
            <DialogDescription>
              {editingFAQ ? "Update your FAQ entry" : "Add a new frequently asked question"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="question">Question *</Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Enter the question"
                required
              />
            </div>

            <div>
              <Label htmlFor="answer">Answer *</Label>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Enter the detailed answer"
                rows={6}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., general, services, process"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Active (Show on website)</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditor(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                editingFAQ ? "Update FAQ" : "Create FAQ"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}