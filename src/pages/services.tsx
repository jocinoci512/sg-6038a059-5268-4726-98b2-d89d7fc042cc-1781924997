import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, SearchCode, AlertTriangle, Eye, Zap, Briefcase, CheckSquare, Network, Building } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: ShieldCheck,
      title: "Blockchain Investigation Services",
      shortDescription: "Professional blockchain forensics and cryptocurrency tracing for individuals, businesses, and law enforcement.",
      details: [
        { name: "Multi-Chain Transaction Tracing", description: "Advanced tracking across Bitcoin, Ethereum, Tether (USDT), and 900+ cryptocurrencies. Our forensic tools map complete transaction flows from origin to destination, including mixer and tumbler traversal." },
        { name: "Wallet Attribution & Analysis", description: "Comprehensive investigation linking wallet addresses to real-world entities through clustering analysis, behavioral patterns, and exchange identification. Essential for legal proceedings." },
        { name: "Smart Contract Forensics", description: "Detailed analysis of DeFi protocols, token contracts, and decentralized applications involved in fraud schemes. We identify vulnerabilities and trace fund flows through complex DeFi operations." },
        { name: "Exchange Coordination", description: "Direct communication with 200+ cryptocurrency exchanges worldwide to freeze suspicious accounts, obtain KYC data (with legal authorization), and facilitate asset recovery operations." }
      ],
      ctaText: "Request Investigation",
      ctaLink: "/contact?subject=InvestigationInquiry"
    },
    {
      icon: SearchCode,
      title: "Digital Asset Recovery",
      shortDescription: "Expert recovery services for stolen cryptocurrency and digital assets through forensic investigation.",
      details: [
        { name: "Rapid Response Protocol", description: "24-48 hour emergency investigation launch for recent fraud cases. Time is critical—our fast-track analysis maximizes recovery chances by identifying and freezing assets before they're moved or liquidated." },
        { name: "Legal Evidence Compilation", description: "Court-ready forensic reports with complete transaction documentation, wallet attribution evidence, and expert analysis. Our reports meet evidentiary standards for criminal and civil proceedings worldwide." },
        { name: "Law Enforcement Liaison", description: "Professional coordination with FBI, Europol, Interpol, and local agencies across 85+ countries. We provide technical expertise to support criminal investigations and asset seizure operations." },
        { name: "Exchange Asset Freezing", description: "Emergency contact with exchanges to freeze identified accounts containing stolen funds. We've successfully frozen over $340M in assets pending recovery proceedings." }
      ],
      ctaText: "Start Recovery Case",
      ctaLink: "/report-scam"
    },
    {
      icon: AlertTriangle,
      title: "Scam Prevention & Analysis",
      shortDescription: "Proactive identification and analysis of cryptocurrency scams, fraud schemes, and emerging threats.",
      details: [
        { name: "Real-Time Scam Detection", description: "Continuous monitoring of blockchain activity to identify fraudulent platforms, Ponzi schemes, and rug pulls. Our intelligence database tracks 50,000+ known scam addresses and operators." },
        { name: "Investment Due Diligence", description: "Pre-investment verification of cryptocurrency projects, ICOs, DeFi protocols, and trading platforms. We analyze team credentials, smart contracts, tokenomics, and on-chain activity patterns." },
        { name: "Threat Intelligence Reports", description: "Detailed analysis of emerging scam tactics including romance fraud, phishing operations, fake exchanges, and employment scams. Stay ahead of evolving threats with our intelligence updates." },
        { name: "Wallet Safety Assessment", description: "Comprehensive security analysis of your cryptocurrency holdings including wallet configuration review, transaction pattern analysis, and exposure assessment to known threat actors." }
      ],
      ctaText: "Get Risk Assessment",
      ctaLink: "/contact?subject=PreventionInquiry"
    },
    {
      icon: Eye,
      title: "Forensic Evidence Collection",
      shortDescription: "Professional blockchain forensic analysis and evidence compilation for legal proceedings.",
      details: [
        { name: "Chain-of-Custody Documentation", description: "Forensically sound evidence collection following international standards. Complete documentation of data acquisition, analysis methodology, and findings preservation for court admissibility." },
        { name: "Expert Witness Testimony", description: "Professional expert witness services for cryptocurrency-related legal cases. Our investigators have testified in criminal trials, civil litigation, and regulatory proceedings across multiple jurisdictions." },
        { name: "Transaction Timeline Reconstruction", description: "Detailed chronological mapping of all cryptocurrency movements in fraud cases. We reconstruct complete event sequences with timestamps, amounts, and wallet relationships for investigative clarity." },
        { name: "Reporting & Visualization", description: "Clear, professional reports with transaction flow diagrams, wallet relationship maps, and fund movement visualizations. Technical findings translated into accessible formats for legal teams and juries." }
      ],
      ctaText: "Request Forensic Analysis",
      ctaLink: "/contact?subject=ForensicsInquiry"
    },
    {
      icon: Zap,
      title: "Emergency Response Services",
      shortDescription: "24/7 rapid response for recent cryptocurrency fraud victims requiring immediate investigation.",
      details: [
        { name: "Immediate Case Assessment", description: "Within 2 hours of contact, our team evaluates your case, identifies recovery options, and initiates blockchain tracing. Critical for cases where stolen funds are still moving through exchanges." },
        { name: "Global Exchange Network", description: "Direct relationships with major exchanges worldwide enable rapid account freezing and KYC disclosure (with proper legal authority). We've successfully frozen assets in over 40 countries." },
        { name: "Priority Investigation Queue", description: "Emergency cases receive immediate analyst assignment and round-the-clock monitoring. Our global team operates 24/7 across all time zones to maximize recovery windows." },
        { name: "Victim Support & Guidance", description: "Step-by-step guidance through reporting to authorities, gathering evidence, and coordinating with financial institutions. We help victims navigate the complex recovery process with clarity and confidence." }
      ],
      ctaText: "Get Emergency Help Now",
      ctaLink: "/report-scam"
    },
    {
      icon: Building,
      title: "Enterprise & Institutional Services",
      shortDescription: "Custom blockchain intelligence solutions for financial institutions, exchanges, and compliance teams.",
      details: [
        { name: "AML/KYC Compliance Support", description: "Blockchain analytics integration for anti-money laundering programs. Real-time transaction monitoring, suspicious activity identification, and regulatory reporting assistance for crypto businesses." },
        { name: "Exchange Security Audits", description: "Comprehensive security assessments of cryptocurrency exchange operations including wallet security review, transaction monitoring capabilities, and fraud prevention protocol evaluation." },
        { name: "Custom Intelligence Solutions", description: "Tailored blockchain analysis tools and intelligence feeds for institutional clients. API integration, custom dashboards, and ongoing threat intelligence for enterprise security operations." },
        { name: "Training & Education", description: "Professional training programs for compliance teams, law enforcement, and financial investigators. Learn blockchain forensics fundamentals, investigation techniques, and regulatory frameworks." }
      ],
      ctaText: "Enterprise Inquiry",
      ctaLink: "/contact?subject=EnterpriseInquiry"
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
