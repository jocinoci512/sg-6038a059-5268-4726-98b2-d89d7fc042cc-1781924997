import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Briefcase, Award, Building } from "lucide-react";

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
                    Protecting the blockchain economy by combating illicit finance while preserving privacy and supporting victims of cryptocurrency fraud.
                  </p>
                  <p className="text-slate-600">
                    We provide powerful blockchain forensics tools and intelligence to individuals, financial institutions, government agencies, and cryptocurrency businesses, enabling them to identify and mitigate risks associated with digital assets. Our commitment is to foster innovation and growth in the crypto space by building a foundation of trust, security, and justice.
                  </p>
                </div>
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
                  <Image src="https://images.unsplash.com/photo-1639754390422-a97d07219757?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Cipherstracer Mission" layout="fill" objectFit="cover" />
                   <div className="absolute inset-0 bg-blue-600 opacity-30"></div>
                </div>
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="py-16 bg-slate-50">
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
                    <p className="text-slate-600">Founded with the vision to bring transparency and security to the emerging world of cryptocurrencies. Developed groundbreaking tools for blockchain analytics and forensic investigation.</p>
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
                    <p>Established partnerships with law enforcement agencies, financial institutions, and cryptocurrency platforms worldwide. Our services now protect users across 85+ countries with over $2.8 billion in assets recovered.</p>
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
                    <p className="text-slate-600">Collaborating with leading exchanges, regulatory bodies, and victim advocacy groups worldwide to foster a safer crypto ecosystem for all participants and combat digital asset crime.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Team Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-12">Expert Team</h2>
               <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                Our team comprises leading experts in blockchain forensics, cybersecurity, financial crime investigation, and regulatory compliance. We combine cutting-edge technology with deep domain expertise to deliver results.
              </p>
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
