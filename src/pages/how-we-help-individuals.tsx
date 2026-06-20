import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  Shield, 
  Heart, 
  DollarSign, 
  Home, 
  Building, 
  Trophy, 
  Briefcase, 
  GraduationCap,
  Search,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  FileText,
  Phone,
  Mail
} from "lucide-react";

const scamTypes = [
  {
    icon: Shield,
    title: "Crypto & Investment Scams",
    description: "Fraudulent cryptocurrency investments, fake trading platforms, and Ponzi schemes targeting crypto investors.",
    recoveryMethods: [
      "Blockchain transaction tracing to identify scammer wallets",
      "Exchange cooperation to freeze suspicious accounts",
      "Asset recovery through legal channels with forensic evidence",
      "Pattern analysis to connect multiple victim cases"
    ],
    successRate: "78%",
    averageRecovery: "$45,000",
    color: "bg-blue-500"
  },
  {
    icon: Heart,
    title: "Romance Scams",
    description: "Online dating scams where criminals build fake relationships to steal money and cryptocurrency.",
    recoveryMethods: [
      "Digital forensics to trace cryptocurrency payments",
      "Social media and communication analysis",
      "Cross-platform investigation linking multiple accounts",
      "Collaboration with international law enforcement"
    ],
    successRate: "65%",
    averageRecovery: "$28,000",
    color: "bg-pink-500"
  },
  {
    icon: DollarSign,
    title: "Financial Scams",
    description: "Fake loan offers, credit repair scams, and fraudulent financial services targeting vulnerable individuals.",
    recoveryMethods: [
      "Payment trail analysis through multiple financial systems",
      "Bank and crypto exchange coordination",
      "Regulatory body cooperation for asset freezing",
      "Evidence compilation for legal proceedings"
    ],
    successRate: "72%",
    averageRecovery: "$35,000",
    color: "bg-green-500"
  },
  {
    icon: Home,
    title: "Estate Scams",
    description: "Inheritance fraud, fake estate sales, and property investment scams involving cryptocurrency payments.",
    recoveryMethods: [
      "Property record verification and blockchain analysis",
      "Legal document authentication with crypto forensics",
      "Multi-jurisdictional asset tracing",
      "Coordination with estate attorneys and law enforcement"
    ],
    successRate: "69%",
    averageRecovery: "$52,000",
    color: "bg-orange-500"
  },
  {
    icon: Building,
    title: "Government Impersonation Scams",
    description: "Criminals posing as government officials demanding cryptocurrency payments for fake fines or services.",
    recoveryMethods: [
      "Government agency verification and reporting",
      "Rapid blockchain tracing for quick asset recovery",
      "Inter-agency cooperation for immediate action",
      "Public awareness campaigns to prevent further victims"
    ],
    successRate: "81%",
    averageRecovery: "$15,000",
    color: "bg-red-500"
  },
  {
    icon: Trophy,
    title: "Lottery Scams",
    description: "Fake lottery winnings requiring upfront cryptocurrency payments to claim non-existent prizes.",
    recoveryMethods: [
      "Lottery organization verification and fraud reporting",
      "Cryptocurrency transaction reversal attempts",
      "Scammer network mapping and disruption",
      "Victim education and prevention programs"
    ],
    successRate: "58%",
    averageRecovery: "$12,000",
    color: "bg-yellow-500"
  },
  {
    icon: Briefcase,
    title: "Employment Scams",
    description: "Fake job offers requiring cryptocurrency payments for training, equipment, or processing fees.",
    recoveryMethods: [
      "Employment verification with legitimate companies",
      "Payment processing analysis and reversal",
      "Fake company investigation and shutdown",
      "Career platform cooperation for scammer removal"
    ],
    successRate: "74%",
    averageRecovery: "$8,500",
    color: "bg-purple-500"
  },
  {
    icon: GraduationCap,
    title: "Scholarship Scams",
    description: "Fraudulent scholarship offers requiring cryptocurrency payments for applications or processing.",
    recoveryMethods: [
      "Educational institution verification",
      "Scholarship database cross-referencing",
      "Student financial aid office coordination",
      "Academic fraud prevention network collaboration"
    ],
    successRate: "76%",
    averageRecovery: "$6,200",
    color: "bg-indigo-500"
  }
];

const recoveryProcess = [
  {
    step: 1,
    title: "Initial Assessment",
    description: "We analyze your case details, transaction records, and evidence to determine recovery potential.",
    icon: Search,
    timeframe: "24-48 hours"
  },
  {
    step: 2,
    title: "Blockchain Investigation",
    description: "Our forensics team traces cryptocurrency transactions across multiple blockchains and exchanges.",
    icon: Shield,
    timeframe: "3-7 days"
  },
  {
    step: 3,
    title: "Evidence Compilation",
    description: "We prepare comprehensive forensic reports and evidence packages for legal proceedings.",
    icon: FileText,
    timeframe: "5-10 days"
  },
  {
    step: 4,
    title: "Recovery Action",
    description: "Working with law enforcement and legal teams to freeze assets and initiate recovery procedures.",
    icon: CheckCircle,
    timeframe: "2-8 weeks"
  }
];

const globalStats = [
  { label: "Cases Resolved", value: "12,847", trend: "+23%" },
  { label: "Funds Recovered", value: "$2.8B", trend: "+45%" },
  { label: "Success Rate", value: "73%", trend: "+8%" },
  { label: "Countries Served", value: "52", trend: "+12%" }
];

export default function HowWeHelpIndividualsPage() {
  return (
    <>
      <Head>
        <title>Cipherstracer Fund Recovery | Crypto Scam Recovery & Asset Tracing</title>
        <meta name="description" content="Cipherstracer helps individuals recover funds from crypto scams, romance scams, investment fraud, and more. Expert blockchain forensics and asset recovery services." />
        <meta name="keywords" content="crypto scam recovery, fund recovery, blockchain forensics, romance scam help, investment fraud recovery, Cipherstracer recovery services" />
        <meta property="og:title" content="Cipherstracer | Professional Fund Recovery Services" />
        <meta property="og:description" content="Recover your stolen cryptocurrency and assets with our expert blockchain forensics and investigation services." />
        <meta property="og:url" content="https://cipherstracer.com/how-we-help-individuals" />
        <meta property="og:site_name" content="Cipherstracer" />
        <link rel="canonical" href="https://cipherstracer.com/how-we-help-individuals" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                Fund Recovery Services
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Recover Your Stolen Funds
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
                Cipherstracer specializes in helping individuals recover funds lost to cryptocurrency scams, romance fraud, investment schemes, and other financial crimes. Our advanced blockchain forensics have recovered over $2.8 billion for victims worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg">
                  Start Recovery Process
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                  Free Consultation
                </Button>
              </div>
            </div>
          </section>

          {/* Global Recovery Stats */}
          <section className="py-16 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700">
                  Proven Results
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Global Fund Recovery Impact
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Our track record speaks for itself. See how we've helped thousands of individuals across the US, UK, Germany, and beyond recover their stolen assets.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {globalStats.map((stat, index) => (
                  <Card key={index} className="text-center p-6 border-2 border-green-100 hover:border-green-300 transition-colors">
                    <CardContent className="p-0">
                      <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-600 font-medium mb-2">
                        {stat.label}
                      </div>
                      <div className="text-xs text-green-600 font-medium flex items-center justify-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.trend}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Scam Types We Handle */}
          <section className="py-20 bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700">
                  Comprehensive Coverage
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Types of Scams We Help Recover From
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Our expert team has experience recovering funds from all major types of financial and cryptocurrency scams. No case is too complex for our advanced forensics capabilities.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {scamTypes.map((scam, index) => (
                  <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className={`${scam.color} p-4 text-white`}>
                        <div className="flex items-center justify-between mb-3">
                          <scam.icon className="h-8 w-8" />
                          <div className="text-right">
                            <div className="text-lg font-bold">{scam.successRate}</div>
                            <div className="text-xs opacity-90">Success Rate</div>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold">{scam.title}</h3>
                      </div>
                      <div className="p-6">
                        <p className="text-slate-700 mb-4 leading-relaxed">
                          {scam.description}
                        </p>
                        <div className="mb-4">
                          <div className="text-sm font-semibold text-slate-900 mb-2">Recovery Methods:</div>
                          <ul className="text-xs text-slate-600 space-y-1">
                            {scam.recoveryMethods.map((method, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {method}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4 border-t">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Avg. Recovery:</span>
                            <span className="font-bold text-green-600">{scam.averageRecovery}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Recovery Process */}
          <section className="py-20 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
                  Our Process
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  How We Recover Your Funds
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Our proven 4-step recovery process combines cutting-edge blockchain forensics with legal expertise to maximize your chances of fund recovery.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {recoveryProcess.map((process, index) => (
                  <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-8">
                      <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                        <process.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        Step {process.step}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">
                        {process.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {process.description}
                      </p>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {process.timeframe}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Emergency Contact Section */}
          <section className="py-16 bg-red-50 border-l-4 border-l-red-500">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Recently Scammed? Act Fast!
                </h2>
                <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-8">
                  Time is critical in fund recovery. The sooner you contact us after being scammed, the higher your chances of successful recovery. Our emergency response team is available 24/7.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center p-6 border-2 border-red-200">
                  <CardContent className="p-0">
                    <Phone className="h-8 w-8 text-red-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Emergency Hotline</h3>
                    <p className="text-slate-600 mb-4">24/7 immediate response for recent scam victims</p>
                    <Button className="bg-red-600 hover:bg-red-700 w-full">
                      Call Now: 1-800-RECOVER
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center p-6 border-2 border-red-200">
                  <CardContent className="p-0">
                    <Mail className="h-8 w-8 text-red-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Priority Email</h3>
                    <p className="text-slate-600 mb-4">Fast-track your case with our priority email</p>
                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 w-full" asChild>
                      <Link href="mailto:support@cipherstracer.com">
                        support@cipherstracer.com
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center p-6 border-2 border-red-200">
                  <CardContent className="p-0">
                    <FileText className="h-8 w-8 text-red-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Online Report</h3>
                    <p className="text-slate-600 mb-4">Submit your case details through our secure portal</p>
                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 w-full">
                      File Emergency Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-slate-600">
                  <strong>Important:</strong> Also report to authorities - 
                  <Link href="https://www.ic3.gov" className="text-red-600 hover:underline ml-1" target="_blank">
                    IC3.gov (US)
                  </Link> or 
                  <Link href="https://www.actionfraud.police.uk" className="text-red-600 hover:underline ml-1" target="_blank">
                    ActionFraud (UK)
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700">
                  Success Stories
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Real People, Real Recoveries
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Read how we've helped individuals across the globe recover millions in stolen cryptocurrency and assets.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">🇺🇸</div>
                      <div>
                        <div className="font-bold text-slate-900">Sarah M.</div>
                        <div className="text-sm text-slate-600">New York, USA</div>
                      </div>
                    </div>
                    <p className="text-slate-700 mb-4 italic">
                      "Lost $85,000 to a romance scam. Cipherstracer traced the Bitcoin transactions and helped law enforcement recover 78% of my funds. I can't thank them enough."
                    </p>
                    <Badge className="bg-green-100 text-green-700">
                      Recovered: $66,300
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">🇬🇧</div>
                      <div>
                        <div className="font-bold text-slate-900">James T.</div>
                        <div className="text-sm text-slate-600">London, UK</div>
                      </div>
                    </div>
                    <p className="text-slate-700 mb-4 italic">
                      "Fake investment platform stole £120,000. Cipherstracer's blockchain forensics identified the scammers and froze their accounts. Got most of my money back."
                    </p>
                    <Badge className="bg-green-100 text-green-700">
                      Recovered: £95,000
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">🇩🇪</div>
                      <div>
                        <div className="font-bold text-slate-900">Klaus W.</div>
                        <div className="text-sm text-slate-600">Berlin, Germany</div>
                      </div>
                    </div>
                    <p className="text-slate-700 mb-4 italic">
                      "Government impersonation scam cost me €45,000. Cipherstracer worked with German authorities to track down the criminals and recover my Ethereum."
                    </p>
                    <Badge className="bg-green-100 text-green-700">
                      Recovered: €38,000
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold mb-6">
                Don't Let Scammers Win
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Every day you wait reduces your chances of recovery. Our expert team is ready to start investigating your case immediately. With a 73% success rate and over $2.8 billion recovered, we're your best chance at getting your money back.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg">
                  Start Your Recovery Today
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg" asChild>
                  <Link href="/contact">Get Free Consultation</Link>
                </Button>
              </div>
              <p className="text-sm text-blue-200 mt-6">
                No upfront fees • Success-based pricing • 100% confidential
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
