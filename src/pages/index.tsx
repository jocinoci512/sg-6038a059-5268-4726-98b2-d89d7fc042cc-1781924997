import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowRight, 
  Shield, 
  Search, 
  FileText, 
  Scale, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Star, 
  PlayCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Target,
  Zap,
  Lock,
  Globe,
  AlertCircle,
  Activity,
  Network,
  Database,
  ChevronRight,
  Cpu,
  Code,
  Building,
  Briefcase,
  BarChart3,
  Send
} from "lucide-react";
import Link from "next/link";

const featuredTestimonials = [
  {
    id: "996807223",
    name: "Sarah M.",
    location: "London, UK",
    amount: "$450K",
    recovered: "92%",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
  },
  {
    id: "996807160",
    name: "David C.",
    location: "Singapore",
    amount: "$850K",
    recovered: "85%",
    thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
  },
  {
    id: "996807100",
    name: "Maria R.",
    location: "Miami, USA",
    amount: "$320K",
    recovered: "88%",
    thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400"
  }
];

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "" // Honeypot field
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [faqs, setFaqs] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Load FAQs from database
  useEffect(() => {
    async function loadFAQs() {
      const { data } = await supabase
        .from("faqs")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (data) {
        setFaqs(data);
      }
    }
    loadFAQs();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact-homepage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          website: formData.website // Honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to send message. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "", website: "" });
    } catch (err) {
      setError("An error occurred. Please try again or email us directly at support@cipherstracer.com");
      setSubmitting(false);
    }
  };

  // Generate FAQ schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Head>
        <title>Cipherstracer | Advanced Blockchain Intelligence & Digital Asset Investigation</title>
        <meta name="description" content="Professional blockchain investigation and cryptocurrency intelligence platform. Expert wallet tracing, fraud investigation, and digital asset forensics trusted by law enforcement and institutions worldwide." />
        <meta name="keywords" content="blockchain intelligence, cryptocurrency investigation, digital asset forensics, wallet tracing, fraud investigation, blockchain analytics, crypto compliance" />
        <meta property="og:title" content="Cipherstracer | Advanced Blockchain Intelligence Solutions" />
        <meta property="og:description" content="Leading blockchain investigation platform trusted by law enforcement, financial institutions, and compliance teams worldwide." />
        <meta property="og:url" content="https://cipherstracer.com" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://cipherstracer.com" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* SECTION 1: Premium Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            
            <div className="relative container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20 lg:py-28">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Content */}
                <div className="space-y-8 text-white">
                  <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 backdrop-blur-sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Trusted by 150+ Law Enforcement Agencies
                  </Badge>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Advanced Blockchain Intelligence & Digital Asset Investigation Solutions
                  </h1>
                  
                  <p className="text-xl text-blue-100 leading-relaxed">
                    Professional blockchain forensics and cryptocurrency intelligence platform serving law enforcement, financial institutions, and compliance teams across 85+ countries.
                  </p>

                  {/* Trust Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">28K+</div>
                      <div className="text-sm text-blue-200">Cases Reviewed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">2.4B+</div>
                      <div className="text-sm text-blue-200">Transactions Analyzed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">85+</div>
                      <div className="text-sm text-blue-200">Countries Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">98.7%</div>
                      <div className="text-sm text-blue-200">Client Satisfaction</div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl">
                      <Link href="/services">
                        Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                      <Link href="/contact">
                        Request Consultation
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right: Interactive Dashboard Mockup */}
                <div className="relative">
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 bg-slate-700/50 rounded px-3 py-1 text-xs text-slate-300">
                        Intelligence Dashboard
                      </div>
                    </div>
                    
                    {/* Mock Dashboard Content */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-200 text-sm font-medium">Live Transaction Analysis</span>
                          <Activity className="h-4 w-4 text-blue-400 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/4 animate-pulse"></div>
                            </div>
                            <span className="text-xs text-slate-300">BTC</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 w-2/3"></div>
                            </div>
                            <span className="text-xs text-slate-300">ETH</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 w-1/2"></div>
                            </div>
                            <span className="text-xs text-slate-300">USDT</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/50">
                          <Network className="h-5 w-5 text-blue-400 mb-2" />
                          <div className="text-lg font-bold text-white">847</div>
                          <div className="text-xs text-slate-400">Wallets Traced</div>
                        </div>
                        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/50">
                          <Target className="h-5 w-5 text-green-400 mb-2" />
                          <div className="text-lg font-bold text-white">$2.8M</div>
                          <div className="text-xs text-slate-400">Assets Located</div>
                        </div>
                      </div>

                      <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-green-200">Investigation Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl animate-bounce">
                    Live Tracking
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: Trust Bar */}
          <section className="py-6 bg-slate-50 border-y border-slate-200">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">SOC 2 Type II</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">ISO 27001</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">FinCEN Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">PCI DSS Certified</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: How Cipherstracer Works (4-Step Process) */}
          <section className="py-20 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">Our Process</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  How Cipherstracer Works
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Professional blockchain investigation delivered through our proven four-step methodology
                </p>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
                
                <div className="grid md:grid-cols-4 gap-8 relative">
                  {[
                    {
                      step: "01",
                      title: "Case Review",
                      description: "Submit your case details through our secure platform. Our team conducts initial assessment within 24 hours.",
                      icon: FileText,
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      step: "02",
                      title: "Blockchain Analysis",
                      description: "Advanced forensic analysis across all major blockchains. We trace transactions and identify wallet relationships.",
                      icon: Search,
                      color: "from-purple-500 to-purple-600"
                    },
                    {
                      step: "03",
                      title: "Digital Investigation",
                      description: "Deep dive into exchanges, mixers, and DeFi protocols. Entity attribution and evidence compilation.",
                      icon: Network,
                      color: "from-green-500 to-green-600"
                    },
                    {
                      step: "04",
                      title: "Intelligence Report",
                      description: "Detailed findings with actionable insights. Expert guidance on recovery options and law enforcement coordination.",
                      icon: Award,
                      color: "from-orange-500 to-orange-600"
                    }
                  ].map((item, index) => (
                    <div key={index} className="relative">
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg mb-4 relative z-10`}>
                          <item.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-sm font-bold text-slate-400 mb-2">STEP {item.step}</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: Featured Services Grid */}
          <section className="py-20 bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">Our Services</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Comprehensive Blockchain Intelligence
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Advanced investigation services for institutions, law enforcement, and individuals
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Search,
                    title: "Blockchain Transaction Analysis",
                    description: "Multi-chain transaction tracing across 900+ cryptocurrencies with forensic-grade precision.",
                    link: "/services"
                  },
                  {
                    icon: Shield,
                    title: "Cryptocurrency Fraud Investigation",
                    description: "Comprehensive investigation of scams, Ponzi schemes, and investment fraud with evidence compilation.",
                    link: "/services"
                  },
                  {
                    icon: Target,
                    title: "Wallet Tracing",
                    description: "Advanced wallet attribution linking addresses to real-world entities through clustering analysis.",
                    link: "/services"
                  },
                  {
                    icon: BarChart3,
                    title: "Digital Asset Intelligence",
                    description: "Real-time monitoring and risk assessment for cryptocurrency transactions and platforms.",
                    link: "/services"
                  },
                  {
                    icon: Activity,
                    title: "Exchange Activity Tracking",
                    description: "Direct coordination with 200+ exchanges for account freezing and KYC disclosure.",
                    link: "/services"
                  },
                  {
                    icon: Code,
                    title: "Cybercrime Investigation Support",
                    description: "Expert blockchain forensics supporting law enforcement and regulatory investigations.",
                    link: "/services"
                  }
                ].map((service, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-blue-500">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-slate-600">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="ghost" className="group-hover:text-blue-600">
                        <Link href={service.link}>
                          Learn More <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: Interactive Blockchain Visualization */}
          <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
            
            <div className="relative container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12 text-white">
                <Badge className="mb-4 bg-white/10 text-white border-white/20">Technology</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Real-Time Blockchain Network Intelligence
                </h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  Visualize cryptocurrency flows across complex blockchain networks with our advanced forensic tools
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                      <Network className="h-8 w-8 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">2.4B+</div>
                    <div className="text-sm text-slate-400">Transactions Mapped</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                      <Cpu className="h-8 w-8 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">900+</div>
                    <div className="text-sm text-slate-400">Cryptocurrencies Tracked</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                      <Globe className="h-8 w-8 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">50+</div>
                    <div className="text-sm text-slate-400">Blockchain Networks</div>
                  </div>
                </div>

                {/* Animated Network Visualization */}
                <div className="relative h-64 bg-slate-900/50 rounded-xl overflow-hidden">
                  <svg className="w-full h-full">
                    {/* Connection Lines */}
                    <line x1="20%" y1="50%" x2="40%" y2="30%" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
                    <line x1="20%" y1="50%" x2="40%" y2="70%" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
                    <line x1="40%" y1="30%" x2="60%" y2="40%" stroke="#8b5cf6" strokeWidth="2" opacity="0.5" />
                    <line x1="40%" y1="70%" x2="60%" y2="60%" stroke="#8b5cf6" strokeWidth="2" opacity="0.5" />
                    <line x1="60%" y1="40%" x2="80%" y2="50%" stroke="#10b981" strokeWidth="2" opacity="0.5" />
                    <line x1="60%" y1="60%" x2="80%" y2="50%" stroke="#10b981" strokeWidth="2" opacity="0.5" />
                    
                    {/* Nodes */}
                    <circle cx="20%" cy="50%" r="8" fill="#3b82f6" className="animate-pulse" />
                    <circle cx="40%" cy="30%" r="6" fill="#8b5cf6" />
                    <circle cx="40%" cy="70%" r="6" fill="#8b5cf6" />
                    <circle cx="60%" cy="40%" r="6" fill="#10b981" />
                    <circle cx="60%" cy="60%" r="6" fill="#10b981" />
                    <circle cx="80%" cy="50%" r="8" fill="#f59e0b" className="animate-pulse" />
                  </svg>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Activity className="h-12 w-12 mx-auto mb-2 text-blue-400 animate-pulse" />
                      <div className="text-sm font-medium">Live Network Analysis</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: Why Choose Cipherstracer */}
          <section className="py-20 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">Why Choose Us</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Industry-Leading Blockchain Intelligence
                </h2>
              </div>

              <div className="space-y-16">
                {/* Alternating Blocks */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 mb-4">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Experienced Investigation Team</h3>
                    <p className="text-slate-600 mb-4">
                      Our team comprises former law enforcement investigators, certified fraud examiners, and blockchain forensics experts with decades of combined experience in financial crime investigation.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Former FBI and Europol investigators
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Certified Fraud Examiners (CFE)
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Blockchain forensics specialists
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="h-24 w-24 text-white opacity-50" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-90"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code className="h-24 w-24 text-white opacity-50" />
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-600 mb-4">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Advanced Analytical Tools</h3>
                    <p className="text-slate-600 mb-4">
                      Proprietary blockchain intelligence platform with real-time transaction monitoring, wallet clustering, and entity attribution across all major cryptocurrency networks.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Multi-chain transaction tracing
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        AI-powered pattern recognition
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Real-time network monitoring
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 text-green-600 mb-4">
                      <Globe className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Global Blockchain Coverage</h3>
                    <p className="text-slate-600 mb-4">
                      Comprehensive investigation capabilities across 50+ blockchain networks and 900+ cryptocurrencies with partnerships spanning 85 countries worldwide.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Bitcoin, Ethereum, and all major chains
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        DeFi protocol analysis
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        200+ exchange partnerships
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 opacity-90"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="h-24 w-24 text-white opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7: Industries We Serve */}
          <section className="py-20 bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">Who We Serve</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Trusted Across Industries
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Serving diverse clients with specialized blockchain intelligence solutions
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Users,
                    title: "Individuals",
                    description: "Scam victims seeking asset recovery and investigation support for cryptocurrency fraud cases."
                  },
                  {
                    icon: Building,
                    title: "Businesses",
                    description: "Cryptocurrency exchanges, fintech companies, and blockchain platforms requiring compliance solutions."
                  },
                  {
                    icon: Briefcase,
                    title: "Legal Professionals",
                    description: "Law firms and attorneys handling cryptocurrency-related litigation and regulatory cases."
                  },
                  {
                    icon: Shield,
                    title: "Financial Institutions",
                    description: "Banks and financial services requiring AML/KYC compliance for digital asset transactions."
                  },
                  {
                    icon: CheckCircle,
                    title: "Compliance Teams",
                    description: "Risk and compliance professionals implementing blockchain transaction monitoring programs."
                  },
                  {
                    icon: Lock,
                    title: "Cybersecurity Organizations",
                    description: "Security firms investigating digital asset theft and cryptocurrency-related cybercrime."
                  }
                ].map((industry, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-4">
                        <industry.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl mb-2">{industry.title}</CardTitle>
                      <CardDescription>{industry.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8: Client Success Metrics */}
          <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">Our Impact</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Delivering Results That Matter
                </h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  Real metrics from real investigations across the global blockchain ecosystem
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { value: "28,450+", label: "Investigations Conducted", icon: Search },
                  { value: "$2.8B+", label: "Digital Assets Tracked", icon: TrendingUp },
                  { value: "50+", label: "Blockchain Networks Covered", icon: Network },
                  { value: "98.7%", label: "Client Retention Rate", icon: Star }
                ].map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                      <metric.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">{metric.value}</div>
                    <div className="text-blue-100">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9: Knowledge Center Preview */}
          <section className="py-20 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">Resources</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Knowledge Center
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Expert insights on blockchain security, cryptocurrency investigations, and digital asset protection
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    category: "Security",
                    title: "Blockchain Security Best Practices",
                    description: "Essential security measures for protecting digital assets in 2026"
                  },
                  {
                    category: "Awareness",
                    title: "Identifying Crypto Scams",
                    description: "Red flags and warning signs of cryptocurrency fraud schemes"
                  },
                  {
                    category: "Protection",
                    title: "Asset Protection Strategies",
                    description: "Comprehensive guide to securing your cryptocurrency holdings"
                  },
                  {
                    category: "Investigation",
                    title: "Digital Investigation Fundamentals",
                    description: "Introduction to blockchain forensics and transaction analysis"
                  }
                ].map((article, index) => (
                  <Card key={index} className="hover:shadow-xl transition-shadow group cursor-pointer">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-3">{article.category}</Badge>
                      <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                        Read Article <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                  <Link href="/resources">
                    View All Resources <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* SECTION 10: Testimonials Carousel */}
          <section className="py-20 bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">Client Feedback</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Trusted by Organizations Worldwide
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Sarah Mitchell",
                    role: "Financial Crimes Investigator",
                    company: "FBI",
                    location: "Washington DC, USA",
                    rating: 5,
                    text: "Cipherstracer's blockchain forensics helped us trace $850K in a complex romance scam case. Their tools are absolutely game-changing for law enforcement."
                  },
                  {
                    name: "Detective James Wilson",
                    role: "Cybercrime Specialist",
                    company: "Metropolitan Police",
                    location: "London, UK",
                    rating: 5,
                    text: "In 6 months, Cipherstracer helped us solve 340+ cryptocurrency fraud cases. The platform is essential for modern financial crime investigation."
                  },
                  {
                    name: "Dr. Klaus Weber",
                    role: "Financial Crime Investigator",
                    company: "BaFin",
                    location: "Frankfurt, Germany",
                    rating: 5,
                    text: "Outstanding blockchain analytics. Cipherstracer traced €2.3M in a sophisticated employment scam. The precision of their analysis is remarkable."
                  }
                ].map((testimonial, index) => (
                  <Card key={index} className="hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{testimonial.name}</div>
                          <div className="text-sm text-slate-600">{testimonial.role}</div>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4 italic">"{testimonial.text}"</p>
                      <div className="text-sm text-slate-500">
                        {testimonial.company} • {testimonial.location}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild size="lg">
                  <Link href="/reviews">
                    View All Testimonials <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* SECTION 9.5: Video Testimonials */}
          <section className="py-20 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
                  Video Testimonials
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Real Clients, Real Results
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Watch authentic recovery stories from cryptocurrency fraud victims who trusted Cipherstracer to investigate and recover their stolen assets
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {featuredTestimonials.map((video) => (
                  <Card key={video.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-slate-200">
                    <CardContent className="p-0">
                      {/* Video Player */}
                      <div className="relative aspect-video bg-slate-900 overflow-hidden">
                        {activeVideo === video.id ? (
                          <iframe
                            src={`https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0&badge=0`}
                            className="absolute inset-0 w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            title={`${video.name} Recovery Testimonial`}
                          ></iframe>
                        ) : (
                          <>
                            <img 
                              src={video.thumbnail} 
                              alt={video.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                            <button
                              onClick={() => setActiveVideo(video.id)}
                              className="absolute inset-0 flex items-center justify-center group/play"
                              aria-label={`Play ${video.name} testimonial`}
                            >
                              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center group-hover/play:bg-blue-700 group-hover/play:scale-110 transition-all duration-300 shadow-2xl">
                                <PlayCircle className="w-10 h-10 text-white" />
                              </div>
                            </button>
                            
                            {/* Recovery Badge */}
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-green-500/90 text-white font-semibold">
                                {video.recovered} Recovered
                              </Badge>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Video Info */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-slate-900">{video.name}</h3>
                            <p className="text-sm text-slate-600">{video.location}</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>

                        <div className="flex items-center justify-between text-sm pt-3 border-t border-slate-200">
                          <span className="text-slate-600">Amount Recovered:</span>
                          <span className="font-bold text-green-600">{video.amount}</span>
                        </div>

                        <div className="flex items-center gap-1 mt-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-slate-900 mb-1">88%</div>
                    <div className="text-sm text-slate-600">Average Recovery Rate</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
                  <CardContent className="p-6 text-center">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-slate-900 mb-1">500+</div>
                    <div className="text-sm text-slate-600">Successful Cases</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-slate-900 mb-1">$3.2M+</div>
                    <div className="text-sm text-slate-600">Total Recovered</div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/reviews">
                    Watch All Testimonials
                    <PlayCircle className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* SECTION 10.5: FAQ Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">FAQ</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-slate-600">
                  Common questions about our blockchain investigation services
                </p>
              </div>

              {faqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={faq.id} value={`item-${index + 1}`}>
                      <AccordionTrigger className="text-left text-lg font-semibold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 text-base leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center text-slate-500 py-8">
                  Loading FAQs...
                </div>
              )}
            </div>

            {/* FAQ Schema for SEO */}
            {faqs.length > 0 && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(faqSchema)
                }}
              />
            )}
          </section>

          {/* SECTION 11: Final Call to Action */}
          <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  <Badge className="mb-6 bg-blue-500/20 text-blue-200 border-blue-400/30">
                    Get Started
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Speak With a Blockchain Investigation Specialist
                  </h2>
                  <p className="text-xl text-blue-100 mb-8">
                    Schedule a consultation with our expert team to discuss your blockchain investigation needs. We provide confidential assessments for all inquiries.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-blue-200">Email</div>
                        <a href="mailto:support@cipherstracer.com" className="text-white font-semibold hover:text-blue-300">
                          support@cipherstracer.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-blue-200">Phone</div>
                        <a href="tel:+19405609662" className="text-white font-semibold hover:text-blue-300">
                          +1 (940) 560-9662
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-blue-200">Availability</div>
                        <div className="text-white font-semibold">24/7 Emergency Support</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Request Consultation</CardTitle>
                    <CardDescription>Fill out the form below and our team will contact you within 24 hours.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h3>
                        <p className="text-slate-600">Your message has been sent successfully. Our team will respond within 24 hours.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Honeypot field - hidden from users */}
                        <div style={{ position: 'absolute', left: '-9999px' }}>
                          <Input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            value={formData.website}
                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                          />
                        </div>

                        <div>
                          <Input 
                            placeholder="Full Name *" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            disabled={submitting}
                          />
                        </div>
                        <div>
                          <Input 
                            type="email" 
                            placeholder="Email Address *" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            disabled={submitting}
                          />
                        </div>
                        <div>
                          <Input 
                            type="tel" 
                            placeholder="Phone Number *" 
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            disabled={submitting}
                          />
                        </div>
                        <div>
                          <Textarea 
                            placeholder="Brief description of your case... *" 
                            rows={4}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            disabled={submitting}
                          />
                        </div>

                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                            {error}
                          </div>
                        )}

                        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                          {submitting ? (
                            <>Processing...</>
                          ) : (
                            <>Submit Request <Send className="ml-2 h-5 w-5" /></>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}