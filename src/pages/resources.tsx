import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Rss, Download, Mail, BookOpen, FileText } from "lucide-react";

// Placeholder data for blog posts and guides
const blogPosts = [
  {
    id: 1,
    title: "Top 5 Crypto Scams and How to Avoid Them",
    date: "June 15, 2025",
    excerpt: "Learn to identify common cryptocurrency scams like phishing, rug pulls, and fake ICOs to protect your investments.",
    category: "Scam Prevention",
    slug: "/blog/top-5-crypto-scams"
  },
  {
    id: 2,
    title: "Understanding Blockchain Security: A Beginner's Guide",
    date: "June 10, 2025",
    excerpt: "Demystifying blockchain technology and exploring the security measures that keep your transactions safe.",
    category: "Blockchain Security",
    slug: "/blog/blockchain-security-guide"
  },
  {
    id: 3,
    title: "The Importance of AML Compliance in Crypto",
    date: "June 5, 2025",
    excerpt: "Why Anti-Money Laundering regulations are crucial for the legitimacy and safety of the cryptocurrency ecosystem.",
    category: "Compliance",
    slug: "/blog/aml-compliance-crypto"
  }
];

const downloadableGuides = [
  {
    id: 1,
    title: "Comprehensive Guide: How to Spot Crypto Scams",
    description: "A detailed PDF guide with checklists and red flags to help you identify and avoid cryptocurrency scams.",
    icon: FileText,
    downloadLink: "/downloads/how-to-spot-crypto-scams.pdf" // Placeholder link
  },
  {
    id: 2,
    title: "Securing Your Digital Wallet: Best Practices",
    description: "Learn the essential steps to protect your crypto wallet from hackers and theft.",
    icon: BookOpen,
    downloadLink: "/downloads/securing-digital-wallet-guide.pdf" // Placeholder link
  }
];

export default function ResourcesPage() {
  return (
    <>
      <Head>
        <title>Cipherstracer Resources | Crypto Security Blog & Guides</title>
        <meta name="description" content="Access Cipherstracer's blog for articles on scam prevention, blockchain security, and downloadable guides to enhance your crypto knowledge." />
        <meta name="keywords" content="crypto security blog, blockchain guides, scam prevention tips, Cipherstracer resources, crypto education" />
        <meta property="og:title" content="Cipherstracer Resources | Blog & Downloadable Guides" />
        <meta property="og:description" content="Stay informed with our expert articles and practical guides on cryptocurrency security." />
        <meta property="og:url" content="https://cipherstracer.com/resources" />
        <meta property="og:site_name" content="Cipherstracer" />
        <link rel="canonical" href="https://cipherstracer.com/resources" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-20 bg-blue-700 text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">Resources</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Knowledge is Power in Crypto
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Explore our curated resources to stay ahead in the evolving world of digital assets and blockchain security.
              </p>
            </div>
          </section>

          {/* Blog Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Rss className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest Insights & Articles</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Stay informed with our expert analysis on cryptocurrency security, compliance, and fraud prevention.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <Badge variant="outline" className="mb-2 w-fit">{post.category}</Badge>
                      <CardTitle className="text-xl hover:text-blue-600">
                        <Link href={post.slug}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription>{post.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-slate-600 text-sm">{post.excerpt}</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Button variant="link" asChild className="p-0 h-auto text-blue-600 hover:text-blue-700">
                        <Link href={post.slug}>Read More &rarr;</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Link href="/blog">View All Articles</Link> {/* Placeholder link */}
                </Button>
              </div>
            </div>
          </section>

          {/* Downloadable Guides Section */}
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Download className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Downloadable Guides</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Practical guides and checklists to help you navigate the crypto landscape securely.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {downloadableGuides.map((guide) => (
                  <Card key={guide.id} className="bg-white">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <guide.icon className="h-10 w-10 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild>
                        <Link href={guide.downloadLink} target="_blank" rel="noopener noreferrer">
                          Download PDF <Download className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Subscription Section */}
          <section className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto max-w-3xl px-4 md:px-6 lg:px-8 text-center">
              <Mail className="h-12 w-12 mb-4 mx-auto" />
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl text-blue-100 mb-8">
                Subscribe to our newsletter for the latest Cipherstracer news, product updates, and crypto security insights.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-white text-slate-900 placeholder:text-slate-500 flex-grow" 
                  aria-label="Email for newsletter"
                />
                <Button type="submit" variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-blue-200 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
