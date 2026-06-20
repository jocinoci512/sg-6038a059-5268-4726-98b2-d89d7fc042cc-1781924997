import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import TrustSignals from "@/components/home/TrustSignals";
import ServicesOverview from "@/components/home/ServicesOverview";
import HowWeHelp from "@/components/home/HowWeHelp";
import BlogPreview from "@/components/home/BlogPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SuccessStories from "@/components/home/SuccessStories";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Star, CheckCircle } from "lucide-react";

export default function HomePage() {
  const featuredVideos = [
    {
      id: "996807223",
      title: "Romance Scam - $127K Recovered",
      location: "United States 🇺🇸"
    },
    {
      id: "996807160",
      title: "Investment Fraud - €89K Recovered",
      location: "Germany 🇩🇪"
    },
    {
      id: "996807100",
      title: "Mining Scam - £54K Recovered",
      location: "United Kingdom 🇬🇧"
    }
  ];

  return (
    <>
      <Head>
        <title>CipherTrace | Secure Your Crypto Future with Blockchain Intelligence</title>
        <meta name="description" content="World-class blockchain intelligence to combat fraud and protect your crypto assets. Recover from scams with CipherTrace forensic tools and AML compliance solutions." />
        <meta name="keywords" content="CipherTrace, blockchain intelligence, crypto security, AML compliance, cryptocurrency forensics, scam recovery, Mastercard crypto, blockchain analytics" />
        <meta property="og:title" content="CipherTrace: Securing Your Crypto Future" />
        <meta property="og:description" content="Leading blockchain intelligence platform for crypto security, scam recovery, and AML compliance. A Mastercard Company." />
        <meta property="og:url" content="https://ciphertracers.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ciphertracers.com/og-image.jpg" />
        <link rel="canonical" href="https://ciphertracers.com" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <Header />
        
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Trust Signals */}
          <TrustSignals />

          {/* Video Testimonials Section - NEW */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-700">
                  <Play className="h-3 w-3 mr-1" />
                  Video Proof
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Real Clients. Real Recovery. Real Hope.
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Watch actual clients share their journey from scam victim to successful fund recovery with CipherTrace blockchain forensics.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {featuredVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all group border-slate-200">
                    <CardContent className="p-0">
                      <div className="relative w-full bg-slate-900" style={{ paddingBottom: "56.25%" }}>
                        <iframe
                          src={`https://player.vimeo.com/video/${video.id}?badge=0&autopause=0&player_id=0&app_id=58479`}
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                          title={video.title}
                        />
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="font-semibold text-slate-900 mb-2">{video.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{video.location}</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional Videos Row */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all border-slate-200">
                  <CardContent className="p-0">
                    <div className="relative w-full bg-slate-900" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        src="https://player.vimeo.com/video/996806916?badge=0&autopause=0&player_id=0&app_id=58479"
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                        title="Ponzi Scheme Recovery"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold text-slate-900 mb-2">Ponzi Scheme - $203K Recovered</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Australia 🇦🇺</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all border-slate-200">
                  <CardContent className="p-0">
                    <div className="relative w-full bg-slate-900" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        src="https://player.vimeo.com/video/996805094?badge=0&autopause=0&player_id=0&app_id=58479"
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                        title="Exit Scam Prevention"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold text-slate-900 mb-2">Exit Scam - ¥12.5M Protected</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Japan 🇯🇵</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA to Reviews Page */}
              <div className="text-center bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium text-slate-700">All testimonials verified • 2,400+ successful cases</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  See More Success Stories
                </h3>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                  Watch extended video interviews and read detailed written testimonials from clients across 78 countries who recovered their stolen crypto.
                </p>
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/reviews">View All Reviews & Video Testimonials</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* How We Help */}
          <HowWeHelp />

          {/* Services Overview */}
          <ServicesOverview />

          {/* Success Stories */}
          <SuccessStories />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* Blog Preview / Resources */}
          <BlogPreview />
        </main>

        <Footer />
      </div>
    </>
  );
}
