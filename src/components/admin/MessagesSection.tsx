import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MessageItem {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
  source?: "contact" | "report-scam" | "chat" | "other";
}

export function MessagesSection() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [lastLoaded, setLastLoaded] = useState<string>("");

  const load = () => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("site_messages");
      const parsed: MessageItem[] = raw ? JSON.parse(raw) : [];
      parsed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setMessages(parsed);
      setLastLoaded(new Date().toISOString());
    } catch {
      setMessages([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Website Messages</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Last loaded: {lastLoaded ? new Date(lastLoaded).toLocaleString() : "—"}</span>
          <Button size="sm" variant="outline" onClick={load}>Refresh</Button>
        </div>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-slate-600">
            No messages yet. Submissions from the Contact and Report pages will appear here.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {messages.map((m) => (
            <Card key={m.id} className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-slate-900">{m.subject || "Message"}</div>
                  <div className="text-xs text-slate-500">{new Date(m.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-sm text-slate-700 mt-2 whitespace-pre-wrap">{m.message}</div>
                <div className="text-xs text-slate-500 mt-3">
                  From: {m.name || "Anonymous"} • {m.email || "No email"} • {m.phone || "No phone"} • Source: {m.source || "contact"}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
