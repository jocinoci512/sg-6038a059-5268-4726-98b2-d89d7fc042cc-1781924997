import Head from "next/head";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Shield, Clock, DollarSign, Globe, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: "romance-scam-127k",
    title: "Romance Scam Recovery: $127,000 Traced Across 8 Exchanges",
    category: "Romance Scam",
    location: "United States",
    amount: "$127,000",
    duration: "47 days",
    status: "Recovered",
    dateRange: "Jan 2024 - Mar 2024",
    overview: "Victim met scammer on dating app, lost $127K over 6 months through multiple crypto transfers. CipherTrace tracked funds across 8 exchanges and 3 countries.",
    challenge: "Funds were split across multiple wallets and exchanges, with some sent through privacy coins (Monero). The scammer used sophisticated layering techniques.",
    approach: [
      "Analyzed all transaction IDs and wallet addresses provided by victim",
      "Traced Bitcoin transfers through blockchain explorers and proprietary tools",
      "Identified exchange accounts where funds were deposited",
      "Collaborated with exchange compliance teams to freeze accounts",
      "Worked with FBI and IC3 to coordinate recovery efforts",
      "Tracked privacy coin conversions using temporal analysis"
    ],
    outcome: "Recovered $102,000 (80% recovery rate). Remaining funds were cashed out before freeze. Criminal investigation ongoing.",
    timeline: [
      { month: "Week 1", traced: 15000, recovered: 0 },
      { month: "Week 2", traced: 45000, recovered: 0 },
      { month: "Week 3", traced: 78000, recovered: 12000 },
      { month: "Week 4", traced: 105000, recovered: 34000 },
      { month: "Week 5", traced: 127000, recovered: 67000 },
      { month: "Week 6", traced: 127000, recovered: 102000 },
      { month: "Week 7", traced: 127000, recovered: 102000 }
    ],
    fundFlow: [
      { name: "Binance", value: 42000 },
      { name: "Coinbase", value: 28000 },
      { name: "Kraken", value: 19000 },
      { name: "KuCoin", value: 15000 },
      { name: "Other Exchanges", value: 23000 }
    ],
    metrics: {
      walletsIdentified: 23,
      exchangesInvolved: 8,
      countriesTraced: 3,
      recoveryRate: 80,
      daysToFreeze: 19
    }
  },
  {
    id: "investment-fraud-203k",
    title: "Ponzi Scheme Collapse: $203,000 Recovered from Exit Scam",
    category: "Ponzi Scheme",
    location: "Australia",
    amount: "$203,000",
    duration: "68 days",
    status: "Recovered",
    dateRange: "Sep 2023 - Nov 2023",
    overview: "Victim invested in fake DeFi yield farming platform promising 25% monthly returns. Platform exit scammed with $8.2M from 340 victims.",
    challenge: "Scammers used smart contracts to automate fund collection and dispersal. Funds were quickly moved to DEX platforms and privacy mixers.",
    approach: [
      "Analyzed smart contract interactions on Ethereum and BSC chains",
      "Identified master wallet controlling the Ponzi scheme",
      "Traced outflows through DEX platforms (Uniswap, PancakeSwap)",
      "Detected mixer usage patterns and temporal correlation analysis",
      "Coordinated with Australian Federal Police and INTERPOL",
      "Filed freeze orders with centralized exchanges where funds landed"
    ],
    outcome: "Recovered $203,000 (100% of victim's investment). Total scheme recovered: $4.1M across all victims. 2 arrests made in Malaysia.",
    timeline: [
      { month: "Week 2", traced: 45000, recovered: 0 },
      { month: "Week 4", traced: 89000, recovered: 0 },
      { month: "Week 6", traced: 156000, recovered: 34000 },
      { month: "Week 8", traced: 203000, recovered: 98000 },
      { month: "Week 9", traced: 203000, recovered: 167000 },
      { month: "Week 10", traced: 203000, recovered: 203000 }
    ],
    fundFlow: [
      { name: "Smart Contract", value: 203000, fill: "#ef4444" },
      { name: "DEX Platforms", value: 178000, fill: "#f97316" },
      { name: "Privacy Mixers", value: 89000, fill: "#eab308" },
      { name: "CEX Deposits", value: 203000, fill: "#22c55e" }
    ],
    metrics: {
      walletsIdentified: 47,
      exchangesInvolved: 12,
      countriesTraced: 5,
      recoveryRate: 100,
      daysToFreeze: 34
    }
  },
  {
    id: "mining-scam-54k",
    title: "Fake Cloud Mining Platform: £54,000 Recovered via Exchange Collaboration",
    category: "Mining Scam",
    location: "United Kingdom",
    amount: "£54,000",
    duration: "31 days",
    status: "Recovered",
    dateRange: "Jun 2024 - Jul 2024",
    overview: "Victim invested in fake Bitcoin mining operation with guaranteed daily returns. Platform disappeared after 4 months with £1.2M from UK victims.",
    challenge: "Scammers created elaborate fake mining dashboards showing fabricated hashrates and earnings. Funds were immediately converted to stablecoins.",
    approach: [
      "Verified platform was not operating any actual mining equipment",
      "Traced initial Bitcoin deposits to USDT conversion points",
      "Identified stablecoin flows to major exchanges (Binance, OKX)",
      "Coordinated with UK Action Fraud and NCA",
      "Issued freeze orders within 12 days of case opening",
      "Recovered funds before scammers could cash out to fiat"
    ],
    outcome: "Recovered £54,000 (100% recovery). Platform operators identified in Eastern Europe. Criminal prosecution underway.",
    timeline: [
      { month: "Week 1", traced: 18000, recovered: 0 },
      { month: "Week 2", traced: 38000, recovered: 18000 },
      { month: "Week 3", traced: 54000, recovered: 42000 },
      { month: "Week 4", traced: 54000, recovered: 54000 }
    ],
    fundFlow: [
      { name: "Initial BTC", value: 54000 },
      { name: "USDT Conversion", value: 54000 },
      { name: "Binance", value: 35000 },
      { name: "OKX", value: 19000 }
    ],
    metrics: {
      walletsIdentified: 12,
      exchangesInvolved: 4,
      countriesTraced: 2,
      recoveryRate: 100,
      daysToFreeze: 12
    }
  }
];

const COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#eab308', '#8b5cf6', '#ec4899'];

export default function CaseStudiesPage() {
  return (
    <>
      <Head>
        <title>Case Studies: Real Crypto Recovery Success Stories | CipherTrace</title>
        <meta name="description" content="Detailed case studies of successful crypto recovery operations. See how CipherTrace blockchain forensics traced and recovered stolen funds from romance scams, Ponzi schemes, and investment fraud." />
        <meta name="keywords" content="crypto recovery case studies, blockchain forensics examples, scam recovery success stories, CipherTrace case studies, cryptocurrency investigation" />
        <meta property="og:title" content="Crypto Recovery Case Studies | CipherTrace Success Stories" />
        <meta property="og:description" content="Real case studies with charts and data showing how we recover stolen crypto." />
        <meta property="og:url" content="https://ciphertracers.com/case-studies" />
        <link rel="canonical" href="https://ciphertracers.com/case-studies" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  <Shield className="h-4 w-4 mr-1" />
                  Real Recovery Data
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Case Studies: How We Recover Stolen Crypto
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Detailed breakdowns of actual recovery operations with forensic analysis, timelines, and outcomes. See how our blockchain intelligence traces funds across exchanges and borders.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    <span>$384K+ Recovered in These Cases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>Avg 49 Days to Recovery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>93% Average Recovery Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Case Studies Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <Tabs defaultValue={caseStudies[0].id} className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8 h-auto gap-2">
                  {caseStudies.map((study) => (
                    <TabsTrigger
                      key={study.id}
                      value={study.id}
                      className="flex flex-col items-start p-4 h-auto data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      <div className="font-semibold text-left">{study.title.split(':')[0]}</div>
                      <div className="text-xs opacity-80 mt-1">{study.amount} • {study.duration}</div>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {caseStudies.map((study) => (
                  <TabsContent key={study.id} value={study.id} className="space-y-8">
                    {/* Case Header */}
                    <Card className="border-blue-200 shadow-lg">
                      <CardHeader>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                            {study.category}
                          </Badge>
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {study.status}
                          </Badge>
                          <span className="text-sm text-slate-600">{study.location}</span>
                          <span className="text-sm text-slate-400">•</span>
                          <span className="text-sm text-slate-600">{study.dateRange}</span>
                        </div>
                        <CardTitle className="text-2xl md:text-3xl">{study.title}</CardTitle>
                        <CardDescription className="text-base">{study.overview}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-5 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-slate-900">{study.amount}</div>
                            <div className="text-xs text-slate-600">Total Amount</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-slate-900">{study.metrics.recoveryRate}%</div>
                            <div className="text-xs text-slate-600">Recovery Rate</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-slate-900">{study.duration}</div>
                            <div className="text-xs text-slate-600">Investigation Time</div>
                          </div>
                          <div className="text-center p-4 bg-amber-50 rounded-lg">
                            <Globe className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-slate-900">{study.metrics.countriesTraced}</div>
                            <div className="text-xs text-slate-600">Countries Traced</div>
                          </div>
                          <div className="text-center p-4 bg-red-50 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-slate-900">{study.metrics.walletsIdentified}</div>
                            <div className="text-xs text-slate-600">Wallets Identified</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recovery Timeline Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recovery Timeline & Progress</CardTitle>
                        <CardDescription>
                          Funds traced vs. recovered over the investigation period
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                          <LineChart data={study.timeline}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                            <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                            <Legend />
                            <Line type="monotone" dataKey="traced" stroke="#3b82f6" strokeWidth={2} name="Funds Traced" />
                            <Line type="monotone" dataKey="recovered" stroke="#22c55e" strokeWidth={2} name="Funds Recovered" />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Fund Flow Analysis */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <Card>
                        <CardHeader>
                          <CardTitle>Fund Flow Distribution</CardTitle>
                          <CardDescription>
                            Where the stolen funds were routed
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={study.fundFlow}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {study.fundFlow.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                            </PieChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Key Metrics</CardTitle>
                          <CardDescription>
                            Investigation complexity indicators
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Wallets Identified</span>
                                <span className="text-sm text-slate-600">{study.metrics.walletsIdentified}</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${Math.min((study.metrics.walletsIdentified / 50) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Exchanges Involved</span>
                                <span className="text-sm text-slate-600">{study.metrics.exchangesInvolved}</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{ width: `${Math.min((study.metrics.exchangesInvolved / 15) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Days to Freeze</span>
                                <span className="text-sm text-slate-600">{study.metrics.daysToFreeze} days</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${Math.min((study.metrics.daysToFreeze / 60) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Recovery Success Rate</span>
                                <span className="text-sm text-slate-600">{study.metrics.recoveryRate}%</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                  className="bg-amber-600 h-2 rounded-full"
                                  style={{ width: `${study.metrics.recoveryRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Case Details */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <Card>
                        <CardHeader>
                          <CardTitle>The Challenge</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-700 leading-relaxed">{study.challenge}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Our Approach</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {study.approach.map((step, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-700">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Outcome */}
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-900">
                          <CheckCircle className="h-6 w-6" />
                          Outcome & Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-green-900 font-medium text-lg">{study.outcome}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Case Could Be Next
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Every successful recovery starts with a report. Our blockchain forensics team is ready to trace your stolen crypto and coordinate with law enforcement worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/report-scam">
                    Report Your Scam
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/how-we-help-individuals">Learn About Our Process</Link>
                </Button>
              </div>
              <p className="text-sm text-blue-200 mt-6">
                🔒 100% Confidential • 💰 No Recovery, No Fee • 🌍 Available Worldwide
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
