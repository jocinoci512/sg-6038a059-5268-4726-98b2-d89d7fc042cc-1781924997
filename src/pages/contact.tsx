import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, MessageSquare, Send, Twitter, ExternalLink, AlertOctagon, Phone, MessageCircle, Smartphone } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "");
    const message = String(formData.get("message") || "");

    try {
      const emailContent = `
NEW CONTACT FORM SUBMISSION

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Submitted: ${new Date().toLocaleString()}
      `.trim();

      const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

      if (!web3formsKey) {
        throw new Error("Email service not configured. Please contact support directly at support@cipherstracer.com");
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Contact Form: ${subject}`,
          from_name: name,
          email: email,
          message: emailContent,
          to_email: "support@cipherstracer.com"
        }),
      });

      const result = await response.json();

      if (result.success) {
        const payload = {
          id: crypto.randomUUID(),
          name,
          email,
          subject,
          message,
          createdAt: new Date().toISOString(),
          source: "contact"
        };

        try {
          const raw = window.localStorage.getItem("site_messages");
          const list = raw ? JSON.parse(raw) : [];
          list.push(payload);
          window.localStorage.setItem("site_messages", JSON.stringify(list));
        } catch (storageError) {
          console.error("LocalStorage save failed:", storageError);
        }

        setSubmitted(true);
        setSubmitting(false);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again or email us directly at support@cipherstracer.com");
      console.error("Contact form error:", err);
    }
  };

  // Contact URLs
  const phoneNumber = "+19405609662";
  const displayPhone = "+1 (940) 560-9662";
  const whatsappUrl = `https://wa.me/19405609662?text=${encodeURIComponent("Hello, I need help with crypto fraud case support.")}`;
  const smsUrl = `sms:${phoneNumber}`;
  const telUrl = `tel:${phoneNumber}`;

  return (
    <>
      <Head>
        <title>Contact Cipherstracer | Blockchain Investigation & Asset Recovery Support</title>
        <meta name="description" content="Contact Cipherstracer for expert blockchain investigation, cryptocurrency fraud recovery, and digital asset tracing services. 24/7 support available." />
        <meta name="keywords" content="contact Cipherstracer, crypto fraud investigation, blockchain investigation support, asset recovery contact, cryptocurrency tracing inquiry" />
        <meta property="og:title" content="Contact Cipherstracer | Expert Blockchain Investigation" />
        <meta property="og:description" content="Reach out to our team for professional blockchain investigation and digital asset recovery services." />
        <meta property="og:url" content="https://cipherstracer.com/contact" />
        <meta property="og:site_name" content="Cipherstracer" />
        <link rel="canonical" href="https://cipherstracer.com/contact" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-20 bg-blue-700 text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">Contact Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                We&apos;re here to help with your cryptocurrency intelligence and security needs. Reach out to our team for support or inquiries.
              </p>
            </div>
          </section>

          {/* Quick Contact Banner */}
          <section className="py-8 bg-gradient-to-r from-green-600 to-green-700">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-white text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Need Immediate Assistance?</h2>
                  <p className="text-green-100 text-lg">Connect with us instantly via phone, WhatsApp, or message</p>
                  <p className="text-white font-mono font-bold text-xl mt-2">{displayPhone}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50 min-w-[140px]">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 min-w-[140px]">
                    <a href={smsUrl}>
                      <Smartphone className="mr-2 h-5 w-5" />
                      iMessage/SMS
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 min-w-[140px]">
                    <a href={telUrl}>
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form and Information Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Contact Form */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <MessageSquare className="h-7 w-7 mr-2 text-blue-600" />
                      Send Us a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below, and we will get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {error && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    {submitted && (
                      <Alert className="mb-4 border-green-200 bg-green-50">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          Thank you! Your message has been sent successfully. We will respond within 24-48 hours.
                        </AlertDescription>
                      </Alert>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" type="text" placeholder="John Doe" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="john.doe@example.com" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" name="subject" type="text" placeholder="Inquiry about services" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" placeholder="Your message..." rows={5} className="mt-1" required />
                      </div>
                      <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                        {submitting ? "Sending..." : "Submit Inquiry"} <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <div className="space-y-8">
                  {/* Quick Contact Card */}
                  <Card className="shadow-lg border-green-200 bg-gradient-to-br from-green-50 to-white">
                    <CardHeader className="border-b bg-green-50/50">
                      <CardTitle className="text-2xl flex items-center text-green-700">
                        <Phone className="h-7 w-7 mr-2" />
                        Quick Contact
                      </CardTitle>
                      <CardDescription className="text-green-600">
                        Connect with us instantly through your preferred channel
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="text-center mb-6">
                        <p className="text-sm font-medium text-slate-600 mb-2">24/7 Support Line</p>
                        <a href={telUrl} className="text-3xl font-bold text-green-700 hover:text-green-800 font-mono">
                          {displayPhone}
                        </a>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 w-full h-16 text-lg">
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="mr-3 h-6 w-6" />
                            <div className="text-left flex-1">
                              <div className="font-semibold">WhatsApp Chat</div>
                              <div className="text-xs text-green-100">Instant messaging support</div>
                            </div>
                          </a>
                        </Button>
                        
                        <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 w-full h-16 text-lg">
                          <a href={smsUrl}>
                            <Smartphone className="mr-3 h-6 w-6" />
                            <div className="text-left flex-1">
                              <div className="font-semibold">iMessage / SMS</div>
                              <div className="text-xs text-slate-500">Text message support</div>
                            </div>
                          </a>
                        </Button>
                        
                        <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 w-full h-16 text-lg">
                          <a href={telUrl}>
                            <Phone className="mr-3 h-6 w-6" />
                            <div className="text-left flex-1">
                              <div className="font-semibold">Direct Phone Call</div>
                              <div className="text-xs text-slate-500">Speak with our team</div>
                            </div>
                          </a>
                        </Button>
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-slate-700">
                          <strong>Response Time:</strong> We typically respond within 1-2 hours during business hours (9 AM - 6 PM EST) and within 24 hours outside business hours.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <Mail className="h-6 w-6 mr-2 text-blue-600" />
                        Email Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700">For general inquiries, support, or partnership opportunities:</p>
                      <a href="mailto:support@cipherstracer.com" className="text-blue-600 hover:text-blue-700 font-medium text-lg break-all">
                        support@cipherstracer.com
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <Twitter className="h-6 w-6 mr-2 text-blue-600" />
                        Connect on Social Media
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-2">Follow us for the latest updates and insights:</p>
                      <Button variant="outline" asChild>
                        <Link href="https://twitter.com/Cipherstracer" target="_blank" rel="noopener noreferrer">
                          @Cipherstracer on Twitter <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="shadow-md border-red-500">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center text-red-600">
                        <AlertOctagon className="h-6 w-6 mr-2" />
                        Report a Scam
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-3">
                        If you believe you are a victim of a cryptocurrency scam, please report it to the relevant authorities:
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50" asChild>
                          <Link href="https://www.ic3.gov" target="_blank" rel="noopener noreferrer">
                            Report to IC3.gov (USA) <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50" asChild>
                          <Link href="https://www.actionfraud.police.uk" target="_blank" rel="noopener noreferrer">
                            Report to ActionFraud (UK) <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                       <p className="text-xs text-slate-500 mt-3">
                        Note: Cipherstracer provides blockchain investigation and asset recovery services. Reporting to authorities is a crucial first step.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
