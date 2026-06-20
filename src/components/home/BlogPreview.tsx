
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPreview() {
  const articles = [
    {
      title: "How to Spot Cryptocurrency Scams in 2024",
      description: "Learn the latest tactics scammers use and how to protect yourself from crypto fraud.",
      category: "Security",
      date: "Dec 15, 2024",
      readTime: "5 min read"
    },
    {
      title: "Understanding AML Compliance for Crypto Businesses",
      description: "A comprehensive guide to anti-money laundering requirements in the cryptocurrency industry.",
      category: "Compliance",
      date: "Dec 12, 2024",
      readTime: "8 min read"
    },
    {
      title: "The Future of Blockchain Forensics",
      description: "Exploring emerging technologies and methodologies in cryptocurrency investigation.",
      category: "Technology",
      date: "Dec 10, 2024",
      readTime: "6 min read"
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Latest Insights & Resources
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Stay informed with the latest trends, threats, and best practices in cryptocurrency security 
            and blockchain intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {articles.map((article, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                </div>
                <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{article.readTime}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/resources" className="flex items-center">
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <Button size="lg" asChild>
            <Link href="/resources">Subscribe to Our Newsletter</Link>
          </Button>
          <p className="text-sm text-slate-600">
            Get the latest security insights and industry updates delivered to your inbox.
          </p>
        </div>
      </div>
    </section>
  );
}
