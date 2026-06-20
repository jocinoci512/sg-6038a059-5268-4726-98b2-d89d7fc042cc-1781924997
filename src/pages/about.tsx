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
  // Removed unused teamMembers variable
  // const teamMembers = [
  //   {
  //     name: "Dr. Alice Crypto",
  //     role: "Chief Executive Officer",
  //     bio: "Visionary leader with 15+ years in cybersecurity and blockchain technology.",
  //     imageUrl: "/placeholder-person.jpg" // Replace with actual image path
  //   },
  //   {
  //     name: "Bob Chain",
  //     role: "Head of Forensics",
  //     bio: "Expert in digital forensics and cryptocurrency tracing, solving complex cybercrime cases.",
  //     imageUrl: "/placeholder-person.jpg" // Replace with actual image path
  //   },
  //   {
  //     name: "Carol Secure",
  //     role: "Chief Technology Officer",
  //     bio: "Innovator in AML/CFT solutions and architect of CipherTrace's core platforms.",
  //     imageUrl: "/placeholder-person.jpg" // Replace with actual image path
  //   }
  // ];

  return (
    <>
      <Head>
        <title>About CipherTracers | Our Mission & History in Blockchain Security</title>
        <meta name="description" content="Learn about CipherTracers' mission to protect the blockchain economy, our history including the Mastercard acquisition, and our commitment to combating illicit finance while preserving privacy." />
        <meta name="keywords" content="CipherTracers mission, Mastercard acquisition, blockchain security history, crypto compliance team" />
        <meta property="og:title" content="About CipherTracers | Our Mission & History" />
        <meta property="og:description" content="Protecting the blockchain economy by combating illicit finance while preserving privacy." />
        <meta property="og:url" content="https://ciphertracers.com/about" />
        <meta property="og:site_name" content="CipherTracers" />
        <link rel="canonical" href="https://ciphertracers.com/about" />
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
                CipherTracers, a Mastercard company, is dedicated to making the crypto economy safer and more secure for everyone.
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
                    Protecting the blockchain economy by combating illicit finance while preserving privacy.
                  </p>
                  <p className="text-slate-600">
                    We provide powerful tools and intelligence to financial institutions, government agencies, and cryptocurrency businesses, enabling them to identify and mitigate risks associated with digital assets. Our commitment is to foster innovation and growth in the crypto space by building a foundation of trust and security.
                  </p>
                </div>
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
                  {/* You can ask the user to upload an image for this section */}
                  <Image src="https://images.unsplash.com/photo-1639754390422-a97d07219757?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="CipherTrace Mission Abstract" layout="fill" objectFit="cover" />
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
                  From a pioneering startup to a key part of Mastercard, our journey has been driven by innovation and a commitment to security.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-6 w-6 text-blue-600 mr-2" />
                      Early Innovations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Founded with the vision to bring transparency and security to the emerging world of cryptocurrencies. Developed groundbreaking tools for blockchain analytics.</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="h-6 w-6 mr-2" />
                      Mastercard Acquisition (2021)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Joining Mastercard marked a new era, combining our specialized crypto intelligence with Mastercard's global network and expertise in payments and security. This synergy enhances our ability to tackle complex challenges in the digital asset space.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-6 w-6 text-blue-600 mr-2" />
                      Key Partnerships
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Collaborating with leading exchanges like Crypto.com, financial institutions, and regulatory bodies worldwide to foster a safer crypto ecosystem for all participants.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Placeholder for Team Section - Can be expanded if user provides team details */}
          <section className="py-16 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-12">Meet Our Experts (Placeholder)</h2>
               <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                Our team comprises leading experts in blockchain, cybersecurity, AML, and financial regulation.
                We can showcase some key team members here if you provide details.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact?subject=TeamInquiry">Learn More About Our Team</Link>
              </Button>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
