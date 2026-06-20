import { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, Share2, Twitter, Linkedin, Facebook, ChevronRight, Home } from "lucide-react";

export interface ArticleMetadata {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  readingTime: string;
  category: string;
  featuredImage?: string;
  slug: string;
}

export interface RelatedArticle {
  title: string;
  category: string;
  slug: string;
  excerpt: string;
}

interface ArticleLayoutProps {
  metadata: ArticleMetadata;
  relatedArticles?: RelatedArticle[];
  children: ReactNode;
}

export function ArticleLayout({ metadata, relatedArticles = [], children }: ArticleLayoutProps) {
  const articleUrl = `https://cipherstracer.com/blog/${metadata.slug}`;
  const shareText = encodeURIComponent(metadata.title);
  
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(articleUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;

  return (
    <>
      <Head>
        <title>{metadata.title} | Cipherstracer Knowledge Center</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.author} />
        <meta property="article:published_time" content={metadata.publishDate} />
        <meta property="article:section" content={metadata.category} />
        
        {/* Open Graph */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        {metadata.featuredImage && <meta property="og:image" content={metadata.featuredImage} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        {metadata.featuredImage && <meta name="twitter:image" content={metadata.featuredImage} />}
        
        <link rel="canonical" href={articleUrl} />
        
        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": metadata.title,
              "description": metadata.description,
              "author": {
                "@type": "Person",
                "name": metadata.author
              },
              "datePublished": metadata.publishDate,
              "publisher": {
                "@type": "Organization",
                "name": "Cipherstracer",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://cipherstracer.com/logo.png"
                }
              },
              ...(metadata.featuredImage && {
                "image": metadata.featuredImage
              }),
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": articleUrl
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        <main>
          {/* Breadcrumb Navigation */}
          <section className="bg-slate-50 border-b border-slate-200 py-4">
            <div className="container mx-auto max-w-4xl px-4 md:px-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/resources" className="hover:text-blue-600">
                  Knowledge Center
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900">{metadata.category}</span>
              </div>
            </div>
          </section>

          {/* Article Header */}
          <section className="py-12 bg-white">
            <div className="container mx-auto max-w-4xl px-4 md:px-6">
              <Badge variant="secondary" className="mb-4">
                {metadata.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                {metadata.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{metadata.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(metadata.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{metadata.readingTime} read</span>
                </div>
              </div>

              {/* Social Sharing */}
              <div className="flex items-center gap-3 pb-8 border-b border-slate-200">
                <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share:
                </span>
                <Button asChild variant="outline" size="sm">
                  <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          {metadata.featuredImage && (
            <section className="py-8 bg-slate-50">
              <div className="container mx-auto max-w-4xl px-4 md:px-6">
                <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                  <Image 
                    src={metadata.featuredImage} 
                    alt={metadata.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Article Content */}
          <article className="py-12">
            <div className="container mx-auto max-w-4xl px-4 md:px-6">
              <div className="prose prose-lg prose-slate max-w-none">
                {children}
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="py-16 bg-slate-50">
              <div className="container mx-auto max-w-4xl px-4 md:px-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map((article, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow group">
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2">{article.category}</Badge>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${article.slug}`}>
                            {article.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>{article.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/blog/${article.slug}`}>
                            Read More <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Need Professional Blockchain Investigation?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Our expert team is ready to help with cryptocurrency fraud investigation and asset recovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                  <Link href="/contact">
                    Contact Us Today
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/services">
                    Explore Services
                  </Link>
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