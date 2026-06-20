import Head from "next/head";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, TrendingUp, Shield, Globe, CheckCircle } from "lucide-react";

const videoTestimonials = [
  {
    id: "996807223",
    title: "Romance Scam Recovery - $127,000 Recovered",
    location: "United States 🇺🇸",
    amount: "$127,000",
    description: "Sarah lost everything to a romance scammer. Our forensic team traced the transactions across multiple exchanges and helped recover her life savings.",
    category: "Romance Scam"
  },
  {
    id: "996807160",
    title: "Investment Fraud Case - €89,000 Recovered",
    location: "Germany 🇩🇪",
    amount: "€89,000",
    description: "Michael fell victim to a fake investment platform. We tracked the blockchain transactions and worked with authorities to freeze and return his funds.",
    category: "Investment Fraud"
  },
  {
    id: "996807100",
    title: "Crypto Mining Scam - £54,000 Recovered",
    location: "United Kingdom 🇬🇧",
    amount: "£54,000",
    description: "James invested in a fraudulent mining operation. Our intelligence tools exposed the scam network and led to successful fund recovery.",
    category: "Mining Scam"
  },
  {
    id: "996806916",
    title: "Ponzi Scheme Recovery - $203,000 Recovered",
    location: "Australia 🇦🇺",
    amount: "$203,000",
    description: "Emma was caught in an elaborate Ponzi scheme. CipherTrace's blockchain forensics unraveled the complex network and recovered her investment.",
    category: "Ponzi Scheme"
  },
  {
    id: "996805094",
    title: "Exit Scam Prevention - ¥12.5M Protected",
    location: "Japan 🇯🇵",
    amount: "¥12.5M",
    description: "Kenji detected suspicious activity on his exchange account. Our threat intelligence team identified an exit scam in progress and protected his assets.",
    category: "Exit Scam"
  }
];

const writtenTestimonials = [
  {
    name: "Carlos Martinez",
    location: "Mexico City 🇲🇽",
    amount: "$45,000",
    rating: 5,
    text: "I thought my money was gone forever after falling for a fake DeFi platform. CipherTrace not only traced my funds but also helped coordinate with law enforcement. Professional, fast, and effective.",
    scamType: "DeFi Scam"
  },
  {
    name: "Priya Sharma",
    location: "Mumbai 🇮🇳",
    amount: "₹3.2L",
    rating: 5,
    text: "The romance scammer had convinced me to send crypto over 6 months. CipherTrace's team was compassionate and highly skilled. They recovered 80% of my funds and gave me hope again.",
    scamType: "Romance Scam"
  },
  {
    name: "Ahmed Hassan",
    location: "Dubai 🇦🇪",
    amount: "$178,000",
    rating: 5,
    text: "A fake investment advisor disappeared with my Bitcoin. CipherTrace tracked the transactions through multiple mixers and tumblers. Their forensic capabilities are unmatched.",
    scamType: "Investment Fraud"
  },
  {
    name: "Sophie Laurent",
    location: "Paris 🇫🇷",
    amount: "€62,000",
    rating: 5,
    text: "I fell for a phishing attack that drained my wallet. CipherTrace identified the attacker's network and worked with Interpol. I got most of my funds back. Merci!",
    scamType: "Phishing Attack"
  },
  {
    name: "Liu Wei",
    location: "Shanghai 🇨🇳",
    amount: "¥850,000",
    rating: 5,
    text: "CipherTrace helped me recover funds from a fraudulent exchange that claimed to be regulated. Their blockchain intelligence is truly world-class.",
    scamType: "Exchange Fraud"
  },
  {
    name: "Maria Silva",
    location: "São Paulo 🇧🇷",
    amount: "R$215,000",
    rating: 5,
    text: "After losing money to a pyramid scheme, I was devastated. CipherTrace's team gave me detailed updates throughout the recovery process. Highly recommend!",
    scamType: "Pyramid Scheme"
  }
];

export default function ReviewsPage() {
  return (
    <>
      <Head>
        <title>Client Success Stories & Video Reviews | CipherTrace Recovery Evidence</title>
        <meta name="description" content="Watch real video testimonials from clients who recovered their crypto funds with CipherTrace. See documented proof of successful scam recovery cases worldwide." />
        <meta name="keywords" content="crypto recovery testimonials, blockchain forensics reviews, scam recovery proof, CipherTrace success stories, video evidence recovery" />
        <meta property="og:title" content="Real Recovery Stories | CipherTrace Client Reviews" />
        <meta property="og:description" content="Video evidence of successful crypto scam recoveries. Real clients, real results, real hope." />
        <meta property="og:url" content="https://ciphertracers.com/reviews" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://ciphertracers.com/reviews" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified Success Stories
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Real People. Real Recovery. Real Hope.
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-8">
                  Watch actual clients share their journey from scam victim to fund recovery with CipherTrace blockchain intelligence.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>$12.8M+ Recovered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    <span>2,400+ Cases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    <span>78 Countries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-white" />
                    <span>4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Video Testimonials Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-700">
                  Video Evidence
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Watch Their Recovery Stories
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Every video is a real client who trusted CipherTrace to trace their stolen crypto. These are their stories of hope, recovery, and justice.
                </p>
              </div>

              <div className="grid gap-8 md:gap-10">
                {videoTestimonials.map((video, index) => (
                  <Card key={video.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-slate-200">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-5 gap-0">
                        {/* Video Player */}
                        <div className="md:col-span-3 bg-slate-900">
                          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                            <iframe
                              src={`https://player.vimeo.com/video/${video.id}?badge=0&autopause=0&player_id=0&app_id=58479`}
                              className="absolute top-0 left-0 w-full h-full"
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                              title={video.title}
                            />
                          </div>
                        </div>

                        {/* Video Details */}
                        <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center bg-white">
                          <Badge className="mb-3 w-fit bg-red-100 text-red-700 border-red-200">
                            {video.category}
                          </Badge>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                            {video.title}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-600 mb-4">
                            <Globe className="h-4 w-4" />
                            <span className="text-sm">{video.location}</span>
                            <span className="mx-2">•</span>
                            <span className="font-semibold text-green-600">{video.amount} Recovered</span>
                          </div>
                          <p className="text-slate-700 mb-6 leading-relaxed">
                            {video.description}
                          </p>
                          <div className="flex gap-2 mt-auto">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-slate-600">Verified Recovery</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Written Testimonials Section */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-700">
                  Client Testimonials
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Voices From Around the World
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Read what our clients have to say about their experience with CipherTrace recovery services.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {writtenTestimonials.map((testimonial, index) => (
                  <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-slate-200">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-blue-200 mb-3" />
                      <p className="text-slate-700 mb-4 leading-relaxed italic">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                      <div className="border-t pt-4">
                        <div className="font-semibold text-slate-900">{testimonial.name}</div>
                        <div className="text-sm text-slate-600 mt-1">{testimonial.location}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {testimonial.scamType}
                          </Badge>
                          <span className="text-sm font-semibold text-green-600">
                            {testimonial.amount} Recovered
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Bar */}
          <section className="py-12 bg-slate-900 text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">2,400+</div>
                  <div className="text-slate-300">Successful Cases</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">$12.8M+</div>
                  <div className="text-slate-300">Funds Recovered</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">78</div>
                  <div className="text-slate-300">Countries Served</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">4.9/5</div>
                  <div className="text-slate-300">Client Rating</div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Recovery Story Starts Here
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of clients worldwide who trusted CipherTrace to recover their stolen crypto. No upfront fees. No recovery, no charge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/report-scam">Report Your Scam Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/how-we-help-individuals">Learn About Our Process</Link>
                </Button>
              </div>
              <p className="text-sm text-blue-200 mt-6">
                🌍 Available Worldwide • 🔒 100% Confidential • 💰 No Recovery, No Fee
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
