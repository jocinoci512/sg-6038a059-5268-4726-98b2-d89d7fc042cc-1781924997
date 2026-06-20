import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type BlogPost = Tables<"blog_posts">;

interface BlogPostProps {
  post: BlogPost | null;
  exists: boolean;
}

export default function BlogPostPage({ post, exists }: BlogPostProps) {
  const router = useRouter();

  if (!exists || !post) {
    return (
      <>
        <Head>
          <title>Blog Post Not Found | CipherTrace</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
          <Header />
          <main className="container mx-auto max-w-4xl px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog Post Not Found</h1>
            <p className="text-slate-600 mb-8">The blog post you're looking for doesn't exist or hasn't been published yet.</p>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.seo_title || post.title} | CipherTrace Blog</title>
        <meta name="description" content={post.seo_description || post.title} />
        <meta name="keywords" content={post.seo_keywords || "cryptocurrency, blockchain, security, CipherTrace"} />
        <meta property="og:title" content={`${post.seo_title || post.title} | CipherTrace Blog`} />
        <meta property="og:description" content={post.seo_description || post.title} />
        <meta property="og:url" content={`https://ciphertracers.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="CipherTrace" />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta property="article:published_time" content={post.publish_date || post.created_at} />
        <link rel="canonical" href={`https://ciphertracers.com/blog/${post.slug}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <Header />

        <main className="py-12">
          {/* Back Button */}
          <div className="container mx-auto max-w-4xl px-4 mb-8">
            <Button variant="ghost" asChild className="group">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Blog Post Content */}
          <article className="container mx-auto max-w-4xl px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              {/* Featured Image */}
              {post.featured_image && (
                <div className="mb-8 -mx-8 md:-mx-12 -mt-8 md:-mt-12">
                  <img 
                    src={post.featured_image} 
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover rounded-t-lg"
                  />
                </div>
              )}

              {/* Blog Header */}
              <header className="mb-8 pb-8 border-b border-slate-200">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    <time dateTime={post.publish_date || post.created_at}>
                      {new Date(post.publish_date || post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{post.author_name || "CipherTrace Team"}</span>
                  </div>
                  {post.category && (
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {post.category}
                    </div>
                  )}
                </div>
              </header>

              {/* Blog Content */}
              <div 
                className="blog-content prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:my-4 prose-ol:my-4 prose-li:text-slate-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Call to Action */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Need Help with Crypto Security?
                  </h3>
                  <p className="text-slate-700 mb-4">
                    Contact CipherTrace for expert blockchain intelligence and fraud investigation services.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/report-scam">Report a Scam</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Related Content */}
          <div className="container mx-auto max-w-4xl px-4 mt-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">More Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/resources" className="p-4 border border-slate-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors">
                  <h4 className="font-semibold text-slate-900 mb-2">All Blog Posts</h4>
                  <p className="text-sm text-slate-600">Explore our complete library of crypto security articles</p>
                </Link>
                <Link href="/how-we-help-individuals" className="p-4 border border-slate-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors">
                  <h4 className="font-semibold text-slate-900 mb-2">Recovery Services</h4>
                  <p className="text-sm text-slate-600">Learn how we help scam victims recover their assets</p>
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return {
      props: {
        post: null,
        exists: false,
      },
    };
  }

  // Fetch blog post from database
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    return {
      props: {
        post: null,
        exists: false,
      },
    };
  }

  return {
    props: {
      post,
      exists: true,
    },
  };
};