import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Briefcase, Award, Building, ShieldCheck, SearchCode, Eye, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Cipherstracer | Blockchain Investigation & Digital Asset Recovery</title>
        <meta name="description" content="Learn about Cipherstracer's mission to protect the blockchain economy through advanced investigation services and digital asset recovery. Professional blockchain forensics trusted worldwide." />
        <meta name="keywords" content="Cipherstracer mission, blockchain security, crypto compliance, digital asset investigation, blockchain forensics team" />
        <meta property="og:title" content="About Cipherstracer | Our Mission & Expertise" />
        <meta property="og:description" content="Protecting the blockchain economy through professional investigation and asset recovery services." />
        <meta property="og:url" content="https://cipherstracer.com/about" />
        <meta property="og:site_name" content="Cipherstracer" />
        <link rel="canonical" href="https://cipherstracer.com/about" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-20 bg-blue-700 text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">About Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Pioneering Trust in the Digital Asset Ecosystem
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Cipherstracer is dedicated to making the crypto economy safer and more secure for everyone through advanced blockchain investigation and digital asset recovery.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Users className="h-12 w-12 text-blue-600 mb-4" />
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
                  <p className="text-xl text-slate-700 mb-6">
                    Protecting the digital economy by combating cryptocurrency fraud while empowering victims with professional investigation and recovery services.
                  </p>
                  <p className="text-slate-600 mb-4">
                    Cipherstracer provides advanced blockchain forensics and cryptocurrency intelligence to individuals, financial institutions, government agencies, and law enforcement worldwide. Our mission is to make the crypto ecosystem safer by identifying and mitigating fraud while supporting victims in their recovery journey.
                  </p>
                  <p className="text-slate-600">
                    We believe in a future where blockchain technology can flourish without becoming a haven for financial crime. Through cutting-edge forensic technology, professional investigation methodology, and global law enforcement partnerships, we're building trust and accountability in the digital asset economy.
                  </p>
                </div>
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
                  <Image src="https://images.unsplash.com/photo-1639754390422-a97d07219757?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Cipherstracer Mission" layout="fill" objectFit="cover" />
                   <div className="absolute inset-0 bg-blue-600 opacity-30"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Investigation Methodology */}
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <ShieldCheck className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Investigation Methodology</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Professional blockchain forensics combining advanced technology with investigative expertise honed across thousands of cases worldwide.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <SearchCode className="h-6 w-6 text-blue-600 mr-2" />
                      1. Transaction Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Advanced blockchain parsing across 900+ cryptocurrencies. We trace funds through mixers, tumblers, exchanges, and DeFi protocols with forensic precision. Every transaction hop is documented with timestamps, amounts, and wallet relationships.</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="h-6 w-6 mr-2" />
                      2. Entity Attribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Wallet clustering and behavioral analysis to link addresses to real-world entities. We combine on-chain data with KYC information from exchanges, IP intelligence, and OSINT techniques to identify bad actors and establish evidence chains.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-6 w-6 text-blue-600 mr-2" />
                      3. Evidence & Recovery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Court-ready forensic reports with complete documentation. We coordinate with exchanges to freeze assets and work with law enforcement globally to support criminal prosecution and civil recovery proceedings.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Briefcase className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Journey</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  From pioneering blockchain analytics to becoming a trusted global leader in digital asset investigation and recovery.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-6 w-6 text-blue-600 mr-2" />
                      Innovation & Technology
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Founded to bring transparency and accountability to cryptocurrency. Our team of cryptography experts, financial investigators, and data scientists developed groundbreaking blockchain forensics technology now trusted by law enforcement worldwide.</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="h-6 w-6 mr-2" />
                      Global Expansion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Established partnerships with FBI, Europol, Interpol, and law enforcement in 85+ countries. Our services have recovered over $2.8 billion in stolen assets and helped prosecute hundreds of cryptocurrency fraud operations globally.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-6 w-6 text-blue-600 mr-2" />
                      Industry Leadership
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Setting the standard for blockchain intelligence and victim advocacy. We collaborate with financial regulators, cryptocurrency exchanges, and victim support organizations to build a safer digital asset ecosystem for all participants.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Team Expertise */}
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">World-Class Expertise</h2>
               <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
                Our team combines decades of experience in blockchain forensics, cybersecurity, financial crime investigation, law enforcement, and regulatory compliance. We bring together former FBI agents, certified fraud examiners, cryptography experts, and data scientists who have investigated some of the largest cryptocurrency fraud cases in history.
              </p>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                  <div className="text-sm text-slate-600">Years Combined Experience</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">40+</div>
                  <div className="text-sm text-slate-600">Certified Investigators</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-sm text-slate-600">Countries Represented</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-sm text-slate-600">Cases Investigated</div>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link href="/contact?subject=TeamInquiry">Contact Our Team</Link>
              </Button>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
