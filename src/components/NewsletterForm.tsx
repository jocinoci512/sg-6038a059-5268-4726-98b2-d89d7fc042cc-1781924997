import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/services/supabaseHelpers";
import { Mail, CheckCircle } from "lucide-react";

interface NewsletterFormProps {
  source?: string;
  className?: string;
}

export function NewsletterForm({ source = "footer", className = "" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: subscribeError } = await subscribeNewsletter(email, undefined, source);

    if (subscribeError) {
      setError(subscribeError.message || "Failed to subscribe. Please try again.");
      setLoading(false);
      return;
    }

    setSubscribed(true);
    setEmail("");
    setLoading(false);

    setTimeout(() => setSubscribed(false), 5000);
  };

  if (subscribed) {
    return (
      <div className={`flex items-center gap-2 text-green-600 ${className}`}>
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm font-medium">Successfully subscribed!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "..." : <Mail className="h-4 w-4" />}
        </Button>
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </form>
  );
}