import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { 
  Shield, Search, Network, TrendingUp, Users, Building, 
  Briefcase, FileText, ArrowRight, CheckCircle, Star,
  Globe, Lock, Zap, Eye, AlertTriangle, Code, Database,
  BarChart3, Cpu, Activity, Target, Award, Clock,
  Mail, Phone, Send, Play, ChevronRight, Sparkles
} from "lucide-react";
import { useState } from "react";

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

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What services does Cipherstracer provide?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    Cipherstracer provides comprehensive blockchain investigation and digital asset intelligence services including cryptocurrency fraud investigation, wallet tracing, transaction analysis, asset recovery assistance, forensic evidence collection, and compliance support. We serve individuals, businesses, law enforcement agencies, and financial institutions worldwide.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How does blockchain transaction analysis work?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    Our forensic platform traces cryptocurrency movements across blockchain networks by mapping transaction flows from wallet to wallet, identifying wallet clusters controlled by the same entity, determining when funds enter or exit exchanges, and analyzing patterns even through mixers and tumblers. We combine on-chain data with KYC information from exchanges (obtained through legal channels) to link addresses to real-world identities.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What information do I need to start a case review?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    To begin, provide: (1) A detailed description of the incident or fraud, (2) All relevant cryptocurrency wallet addresses and transaction IDs, (3) Communications with the other party (emails, messages, screenshots), (4) Dates and amounts of transactions, and (5) Any documentation from exchanges or wallets involved. The more information you provide, the more effective our investigation will be.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How long does an investigation take?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    Investigation timelines vary based on complexity. Initial case assessment typically takes 24-48 hours. Basic transaction tracing may be completed within 3-5 business days. Complex cases involving multiple blockchains, exchanges, or international actors can take 2-4 weeks. Emergency cases receive expedited processing with preliminary findings often available within 48 hours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Which blockchain networks do you support?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    We support comprehensive analysis across 50+ blockchain networks including Bitcoin, Ethereum, Binance Smart Chain, Tron, Litecoin, Bitcoin Cash, Ripple, Cardano, Polkadot, and 900+ cryptocurrencies. This includes ERC-20 tokens, stablecoins like USDT and USDC, and DeFi protocols. We also trace transactions through cross-chain bridges and decentralized exchanges.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How is my information protected?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    All case data is protected with AES-256 military-grade encryption both at rest and in transit. We apply attorney-client privilege protocols where applicable and never share case details without explicit consent. Our systems are SOC 2 Type II certified and comply with GDPR, CCPA, and international data protection standards. Multi-region redundant backups ensure data integrity with strict access controls and comprehensive audit logging.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Do you provide investigation reports?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    Yes. We provide detailed forensic reports with complete transaction documentation, wallet attribution evidence, visual transaction flow diagrams, and expert analysis. Reports meet evidentiary standards for criminal and civil proceedings worldwide. We can also provide expert witness testimony and technical consultation for legal teams when required.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can businesses use your services?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    Absolutely. We serve cryptocurrency exchanges, financial institutions, compliance teams, legal professionals, and businesses requiring blockchain intelligence. Our enterprise services include AML/KYC compliance support, transaction monitoring, security audits, custom intelligence solutions, and professional training programs. We work with 200+ exchanges and institutions globally.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What happens after I submit a contact request?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    After submission, you'll receive an automated confirmation email. Within 24 hours, a case specialist will review your inquiry and contact you to discuss your situation in detail. If you qualify for our services, we'll provide a clear proposal outlining scope, timeline, and costs. Emergency cases receive priority response within 2-4 hours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do I speak with a specialist?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    Contact us via email at support@cipherstracer.com, phone at +1 (940) 560-9662, or submit the consultation form on this page. For urgent matters requiring immediate attention, call our emergency hotline. Our team is available 24/7 to assist with critical cases. All initial consultations are confidential.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* FAQ Schema for SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What services does Cipherstracer provide?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Cipherstracer provides comprehensive blockchain investigation and digital asset intelligence services including cryptocurrency fraud investigation, wallet tracing, transaction analysis, asset recovery assistance, forensic evidence collection, and compliance support."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How does blockchain transaction analysis work?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our forensic platform traces cryptocurrency movements across blockchain networks by mapping transaction flows from wallet to wallet, identifying wallet clusters, determining exchange activity, and analyzing patterns even through mixers and tumblers."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What information do I need to start a case review?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Provide: (1) A detailed description of the incident, (2) Cryptocurrency wallet addresses and transaction IDs, (3) Communications with the other party, (4) Dates and amounts of transactions, and (5) Documentation from exchanges or wallets involved."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How long does an investigation take?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Initial case assessment: 24-48 hours. Basic tracing: 3-5 business days. Complex cases: 2-4 weeks. Emergency cases receive expedited processing with preliminary findings within 48 hours."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Which blockchain networks do you support?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We support 50+ blockchain networks including Bitcoin, Ethereum, Binance Smart Chain, Tron, and 900+ cryptocurrencies including ERC-20 tokens, stablecoins, and DeFi protocols."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How is my information protected?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "All case data is protected with AES-256 military-grade encryption. We're SOC 2 Type II certified and comply with GDPR, CCPA, and international data protection standards with strict access controls and audit logging."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do you provide investigation reports?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. We provide detailed forensic reports with transaction documentation, wallet attribution evidence, visual diagrams, and expert analysis that meet evidentiary standards for legal proceedings worldwide."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can businesses use your services?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. We serve exchanges, financial institutions, compliance teams, and businesses with AML/KYC compliance support, transaction monitoring, security audits, and custom intelligence solutions."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What happens after I submit a contact request?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You'll receive an automated confirmation. Within 24 hours, a specialist will review your inquiry and contact you. Emergency cases receive priority response within 2-4 hours."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How do I speak with a specialist?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Contact us via email at support@cipherstracer.com, phone at +1 (940) 560-9662, or submit the consultation form. Our team is available 24/7 for critical cases."
                      }
                    }
                  ]
                })
              }}
            />
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