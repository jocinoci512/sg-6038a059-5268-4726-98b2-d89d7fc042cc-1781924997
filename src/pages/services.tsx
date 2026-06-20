import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, SearchCode, AlertTriangle, Eye, Zap, Briefcase, CheckSquare, Network } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: ShieldCheck,
      title: "Blockchain Investigation Services",
      shortDescription: "Professional blockchain forensics and cryptocurrency tracing for individuals, businesses, and law enforcement.",
      details: [
        { name: "Transaction Tracing", description: "Advanced tools for tracking cryptocurrency transactions across multiple blockchains and exchanges." },
        { name: "Wallet Analysis", description: "Comprehensive investigation of wallet addresses, transaction patterns, and fund flows." }
      ],
      ctaText: "Learn More",
      ctaLink: "/contact?subject=InvestigationInquiry"
    },
    {
      icon: SearchCode,
      title: "Digital Asset Recovery",
      shortDescription: "Expert recovery services for stolen cryptocurrency and digital assets through forensic investigation.",
      details: [
        { name: "Fraud Case Investigation", description: "Detailed analysis of cryptocurrency fraud cases with evidence compilation for legal proceedings." },
        { name: "Asset Freezing Coordination", description: "Working with exchanges and law enforcement to freeze and recover stolen assets." }
      ],
      ctaText: "Start Recovery",
      ctaLink: "/contact?subject=RecoveryInquiry"
    },
    {
      icon: AlertTriangle,
      title: "Scam Prevention & Analysis",
      shortDescription: "Proactive identification and analysis of cryptocurrency scams, fraud schemes, and emerging threats.",
      details: [
        { name: "Scam Detection", description: "Real-time monitoring and identification of fraudulent platforms, addresses, and schemes." },
        { name: "Risk Assessment", description: "Comprehensive risk analysis for cryptocurrency investments and transactions." }
      ],
      ctaText: "Protect Your Assets",
      ctaLink: "/contact?subject=PreventionInquiry"
    },
    {
      icon: Eye,
      title: "Forensic Evidence Collection",
      shortDescription: "Professional blockchain forensic analysis and evidence compilation for legal proceedings.",
      details: [
        { name: "Evidence Documentation", description: "Detailed forensic reports with blockchain transaction evidence for court proceedings." },
        { name: "Expert Testimony", description: "Professional expert witness services for cryptocurrency-related legal cases." }
      ],
      ctaText: "Request Analysis",
      ctaLink: "/contact?subject=ForensicsInquiry"
    },
    {
      icon: Zap,
      title: "Emergency Response Services",
      shortDescription: "24/7 rapid response for recent cryptocurrency fraud victims requiring immediate investigation.",
      details: [
        { name: "Immediate Investigation", description: "Fast-track blockchain analysis for recent fraud cases to maximize recovery chances." },
        { name: "Exchange Coordination", description: "Emergency coordination with exchanges to freeze suspicious accounts and prevent fund movement." }
      ],
      ctaText: "Get Emergency Help",
      ctaLink: "/contact?subject=EmergencyInquiry"
    }
  ];

  return (
    <>
      <Head>
        <title>Cipherstracer Services | Blockchain Investigation & Asset Recovery</title>
        <meta name="description" content="Professional blockchain investigation, digital asset recovery, cryptocurrency fraud analysis, and forensic services. Expert solutions for individuals and institutions." />
        <meta name="keywords" content="Cipherstracer services, blockchain investigation, crypto recovery, asset tracing, fraud analysis, forensic evidence, scam prevention" />
        <meta property="og:title" content="Cipherstracer Services | Advanced Blockchain Forensics" />
        <meta property="og:description" content="Comprehensive blockchain investigation and digital asset recovery services trusted by victims and law enforcement worldwide." />
        <meta property="og:url" content="https://cipherstracer.com/services" />
        <meta property="og:site_name" content="Cipherstracer" />
        <link rel="canonical" href="https://cipherstracer.com/services" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-20 bg-blue-700 text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">Our Services</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Professional Blockchain Investigation Services
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Cipherstracer provides comprehensive blockchain forensics and digital asset recovery solutions for individuals, businesses, and law enforcement agencies worldwide.
              </p>
            </div>
          </section>

          {/* Services Grid Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Briefcase className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Services</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  From cryptocurrency fraud investigation to asset recovery, our expert team provides the tools and expertise needed to navigate the complex world of digital assets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {services.map((service, index) => (
                  <Card key={index} className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="items-center text-center">
                      <service.icon className="h-12 w-12 text-blue-600 mb-3" />
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-sm">{service.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <Accordion type="single" collapsible className="w-full">
                        {service.details.map((detail, idx) => (
                          <AccordionItem value={`item-${idx}`} key={idx}>
                            <AccordionTrigger className="text-base font-semibold hover:text-blue-600">
                              <div className="flex items-center">
                                <CheckSquare className="h-5 w-5 mr-2 text-blue-500" />
                                {detail.name}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-slate-600 pl-2 border-l-2 border-blue-100">
                              {detail.description}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                       <Button size="lg" className="w-full mt-4" asChild>
                         <Link href={service.ctaLink}>{service.ctaText}</Link>
                       </Button>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Protect Your Digital Assets?</h3>
                <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
                  Our blockchain investigation experts are ready to help you secure your cryptocurrency and recover stolen assets.
                </p>
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/contact?subject=SolutionsInquiry">Contact Us Today</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
