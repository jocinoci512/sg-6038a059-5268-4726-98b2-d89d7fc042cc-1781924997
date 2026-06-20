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
      title: "Cryptocurrency AML Compliance",
      shortDescription: "Robust solutions for Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) in the crypto space.",
      details: [
        { name: "Sentry", description: "Real-time transaction monitoring and risk scoring for exchanges, DeFi platforms, and financial institutions." },
        { name: "Traveler", description: "Comprehensive solution for FATF Travel Rule compliance, ensuring secure and compliant information sharing." }
      ],
      ctaText: "Explore AML Solutions",
      ctaLink: "/contact?subject=AMLInquiry"
    },
    {
      icon: SearchCode,
      title: "Blockchain Forensics",
      shortDescription: "Advanced tools and expertise for tracing and analyzing cryptocurrency transactions.",
      details: [
        { name: "Inspector", description: "Powerful blockchain analytics platform for visualizing fund flows, identifying illicit actors, and supporting investigations." },
        { name: "Case Management", description: "Streamline your investigative workflow with our integrated case management tools." }
      ],
      ctaText: "Discover Forensics Tools",
      ctaLink: "/contact?subject=ForensicsInquiry"
    },
    {
      icon: AlertTriangle,
      title: "Threat Intelligence",
      shortDescription: "Proactive identification and mitigation of crypto-related threats and vulnerabilities.",
      details: [
        { name: "Armada", description: "Comprehensive threat intelligence feed covering high-risk addresses, malware, phishing sites, and emerging threats." },
        { name: "Risk Scoring", description: "Assess the risk profile of cryptocurrency addresses, entities, and transactions." }
      ],
      ctaText: "Get Threat Intel",
      ctaLink: "/contact?subject=ThreatIntelInquiry"
    },
    {
      icon: Eye,
      title: "De-Anonymization Tools",
      shortDescription: "Cutting-edge technology to attribute real-world identities to cryptocurrency transactions when legally permissible.",
      details: [
        { name: "Attribution Engine", description: "Leverage vast datasets and advanced heuristics to link crypto activity to known entities." },
        { name: "Dark Web Intelligence", description: "Monitor illicit marketplaces and forums for compromised data and threat actor activity." }
      ],
      ctaText: "Learn About De-Anonymization",
      ctaLink: "/contact?subject=DeAnonymizationInquiry"
    },
    {
      icon: Zap,
      title: "Ransomware Detection",
      shortDescription: "Specialized services to track, analyze, and combat ransomware attacks involving cryptocurrencies.",
      details: [
        { name: "Ransomware Payment Tracking", description: "Identify and trace ransomware payments to help victims and law enforcement." },
        { name: "Proactive Defense", description: "Intelligence to help organizations defend against ransomware threats." }
      ],
      ctaText: "Combat Ransomware",
      ctaLink: "/contact?subject=RansomwareInquiry"
    }
  ];

  return (
    <>
      <Head>
        <title>CipherTracers Services | AML, Forensics, Threat Intelligence</title>
        <meta name="description" content="Explore CipherTracers' comprehensive suite of services: Cryptocurrency AML Compliance (Sentry, Traveler), Blockchain Forensics (Inspector), Threat Intelligence (Armada), De-Anonymization, and Ransomware Detection." />
        <meta name="keywords" content="CipherTracers services, AML Sentry, Traveler FATF, Blockchain Inspector, Armada threat intelligence, crypto de-anonymization, ransomware detection" />
        <meta property="og:title" content="CipherTracers Services | Advanced Blockchain Security Solutions" />
        <meta property="og:description" content="Empowering businesses and individuals with cutting-edge tools for crypto AML, forensics, and threat intelligence." />
        <meta property="og:url" content="https://ciphertracers.com/services" />
        <meta property="og:site_name" content="CipherTracers" />
        <link rel="canonical" href="https://ciphertracers.com/services" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-20 bg-blue-700 text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">Our Services</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Securing the Crypto Economy, Together
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                CipherTracers provides a comprehensive suite of industry-leading solutions to protect your digital assets and ensure compliance.
              </p>
            </div>
          </section>

          {/* Services Grid/Accordion Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Briefcase className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Offerings</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  From regulatory compliance to advanced threat detection, our tools are designed to provide clarity and security in the complex world of digital assets.
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
                                {detail.name === "Sentry" || detail.name === "Inspector" || detail.name === "Armada" ? 
                                  <Network className="h-5 w-5 mr-2 text-blue-500" /> : 
                                  <CheckSquare className="h-5 w-5 mr-2 text-blue-500" />
                                }
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
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Enhance Your Crypto Security?</h3>
                <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
                  Our experts are here to help you find the right solutions for your specific needs.
                </p>
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/contact?subject=SolutionsInquiry">Contact Us for Solutions</Link>
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
