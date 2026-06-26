import { useState } from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Quote, PlayCircle, CheckCircle, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";

const videoTestimonials = [
  {
    id: "996807223",
    name: "Sarah Mitchell",
    role: "Investment Fraud Victim",
    location: "London, UK",
    amount: "$450,000",
    type: "Investment Scam",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    recovered: "92%",
    duration: "5 months"
  },
  {
    id: "996807160",
    name: "David Chen",
    role: "Romance Scam Recovery",
    location: "Singapore",
    amount: "$850,000",
    type: "Romance Scam",
    thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    recovered: "85%",
    duration: "6 months"
  },
  {
    id: "996807100",
    name: "Maria Rodriguez",
    role: "Cryptocurrency Theft",
    location: "Miami, USA",
    amount: "$320,000",
    type: "Wallet Hack",
    thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    recovered: "88%",
    duration: "4 months"
  },
  {
    id: "996806916",
    name: "James Thompson",
    role: "Employment Scam Victim",
    location: "Toronto, Canada",
    amount: "$125,000",
    type: "Fake Job Offer",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    recovered: "95%",
    duration: "3 months"
  },
  {
    id: "996805094",
    name: "Emily Watson",
    role: "NFT Fraud Recovery",
    location: "New York, USA",
    amount: "$275,000",
    type: "NFT Scam",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    recovered: "90%",
    duration: "4 months"
  }
];

const writtenReviews = [
  {
    name: "Robert Martinez",
    role: "DeFi Protocol Victim",
    location: "Austin, Texas",
    amount: "$580,000",
    rating: 5,
    date: "2 weeks ago",
    review: "After losing $580K in a DeFi rug pull, I was devastated. Cipherstracer's team worked tirelessly to trace the funds across multiple blockchains. They identified the scammers, coordinated with law enforcement, and helped recover 87% of my investment. Their blockchain forensics expertise is unmatched.",
    recovered: "87%"
  },
  {
    name: "Lisa Chang",
    role: "Business Owner",
    location: "Hong Kong",
    amount: "$1,200,000",
    rating: 5,
    date: "1 month ago",
    review: "Our company fell victim to a sophisticated BEC attack that resulted in $1.2M being sent to fraudulent crypto wallets. Cipherstracer traced the funds through multiple exchanges and mixer services. Within 7 months, we recovered $950K thanks to their expert investigation and law enforcement coordination.",
    recovered: "79%"
  },
  {
    name: "Michael Okonkwo",
    role: "Real Estate Developer",
    location: "Lagos, Nigeria",
    amount: "$350,000",
    rating: 5,
    date: "3 weeks ago",
    review: "I was scammed in a fake real estate investment opportunity that only accepted cryptocurrency. Cipherstracer's forensic analysis identified the criminal network and traced my $350K through complex wallet structures. They recovered 91% of my funds and provided crucial evidence for prosecution.",
    recovered: "91%"
  },
  {
    name: "Sophie Laurent",
    role: "Crypto Trader",
    location: "Paris, France",
    amount: "€420,000",
    rating: 5,
    date: "2 months ago",
    review: "A fake trading platform stole €420K from my account. Cipherstracer's team conducted a thorough blockchain investigation, identified the perpetrators, and worked with international law enforcement. The recovery process took 5 months, but they successfully recovered 83% of my stolen funds.",
    recovered: "83%"
  },
  {
    name: "Ahmed Al-Rashid",
    role: "Business Executive",
    location: "Dubai, UAE",
    amount: "$725,000",
    rating: 5,
    date: "1 month ago",
    review: "After being targeted by a business email compromise scam, I lost $725K in Bitcoin. Cipherstracer's forensic team traced the funds through multiple international exchanges and identified the criminal organization. Their work led to law enforcement action and recovery of 86% of my assets.",
    recovered: "86%"
  },
  {
    name: "Carlos Mendez",
    role: "Investment Manager",
    location: "Madrid, Spain",
    amount: "€890,000",
    rating: 5,
    date: "6 weeks ago",
    review: "Cipherstracer helped me recover from a Ponzi scheme that collapsed with my €890K investment. Their blockchain forensics identified where the funds went, and their legal coordination resulted in asset freezes across multiple jurisdictions. We recovered 74% so far, with more expected.",
    recovered: "74%"
  }
];

export default function ReviewsPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "romance", "investment", "employment", "theft", "nft"];
  
  const filteredVideos = selectedCategory === "all" 
    ? videoTestimonials 
    : videoTestimonials.filter(v => v.type.toLowerCase().includes(selectedCategory));

  const totalRecovered = "$3,120,000+";
  const averageRecovery = "88%";
  const successRate = "94%";

  return (
    <>
      <Head>
        <title>Client Success Stories & Video Testimonials | Cipherstracer</title>
        <meta
          name="description"
          content="Real recovery stories from Cipherstracer clients. Watch video testimonials and read reviews from victims who successfully recovered their stolen cryptocurrency and digital assets."
        />
        <meta property="og:title" content="Client Success Stories & Video Testimonials | Cipherstracer" />
        <meta property="og:description" content="Real recovery stories from Cipherstracer clients. $3.2M+ recovered across 500+ cases." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cipherstracer.com/reviews" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
            
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="outline" className="mb-6 border-blue-400 text-blue-200">
                  Real Results, Real People
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Client Success Stories
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                  Watch real video testimonials from clients who recovered their stolen cryptocurrency through our blockchain forensics and investigation services
                </p>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{totalRecovered}</div>
                    <div className="text-sm text-slate-300">Total Recovered</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">{averageRecovery}</div>
                    <div className="text-sm text-slate-300">Average Recovery Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">{successRate}</div>
                    <div className="text-sm text-slate-300">Case Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Video Testimonials Section */}
          <section className="py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4">Video Testimonials</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Hear Directly From Our Clients
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Real stories of cryptocurrency recovery and justice from victims who trusted Cipherstracer to investigate their cases
                </p>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videoTestimonials.map((video) => (
                  <Card key={video.id} className="group hover:shadow-2xl transition-all duration-300 border-slate-200 overflow-hidden">
                    <CardContent className="p-0">
                      {/* Video Container */}
                      <div className="relative aspect-video bg-slate-900 overflow-hidden">
                        {activeVideo === video.id ? (
                          <iframe
                            src={`https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0&badge=0`}
                            className="absolute inset-0 w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            title={`${video.name} Testimonial`}
                          ></iframe>
                        ) : (
                          <>
                            <img 
                              src={video.thumbnail} 
                              alt={video.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                            <button
                              onClick={() => setActiveVideo(video.id)}
                              className="absolute inset-0 flex items-center justify-center group"
                            >
                              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                                <PlayCircle className="w-12 h-12 text-white" />
                              </div>
                            </button>
                            
                            {/* Overlay Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-green-500/90 text-white text-xs">
                                  {video.recovered} Recovered
                                </Badge>
                                <Badge variant="outline" className="border-white/50 text-white text-xs">
                                  {video.duration}
                                </Badge>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Video Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-1">{video.name}</h3>
                            <p className="text-sm text-slate-600">{video.location}</p>
                          </div>
                          <Shield className="w-5 h-5 text-green-600" />
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Case Type:</span>
                            <span className="font-semibold text-slate-900">{video.type}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Amount Lost:</span>
                            <span className="font-bold text-red-600">{video.amount}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Recovered:</span>
                            <span className="font-bold text-green-600">{video.recovered}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <div className="flex items-center gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Written Reviews Section */}
          <section className="py-20 bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4">Written Reviews</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  More Success Stories
                </h2>
                <p className="text-lg text-slate-600">
                  Read detailed accounts from clients who recovered their stolen assets
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {writtenReviews.map((review, index) => (
                  <Card key={index} className="hover:shadow-xl transition-shadow border-slate-200">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {review.recovered} Recovered
                        </Badge>
                      </div>

                      <Quote className="w-10 h-10 text-blue-600 mb-4 opacity-20" />

                      <p className="text-slate-700 leading-relaxed mb-6">
                        {review.review}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                        <div>
                          <div className="font-bold text-slate-900">{review.name}</div>
                          <div className="text-sm text-slate-600">{review.role}</div>
                          <div className="text-sm text-slate-500">{review.location}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-red-600">{review.amount}</div>
                          <div className="text-xs text-slate-500">{review.date}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
            <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Recovery?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Join hundreds of satisfied clients who successfully recovered their stolen cryptocurrency
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                  <Link href="/report-scam">Report Your Case</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8">
                  <Link href="/contact">Schedule Consultation</Link>
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