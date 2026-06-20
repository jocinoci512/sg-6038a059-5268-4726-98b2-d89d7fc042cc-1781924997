import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Menu, MessageCircle, Search, FileText, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllBlogPosts } from "@/services/cmsBlogService";
import type { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";

type BlogPost = Tables<"blog_posts">;

// Services list for search
const SERVICES = [
  { title: "Cryptocurrency AML Compliance", slug: "services", description: "Sentry and Traveler solutions for compliance" },
  { title: "Blockchain Forensics", slug: "services", description: "Inspector tool for blockchain investigation" },
  { title: "Threat Intelligence", slug: "services", description: "Armada platform for threat detection" },
  { title: "De-Anonymization Tools", slug: "services", description: "Advanced tracking and tracing" },
  { title: "Ransomware Detection", slug: "services", description: "Identify and track ransomware transactions" },
  { title: "Scam Recovery Assistance", slug: "how-we-help-individuals", description: "Help for crypto fraud victims" },
];

export default function Header() {
  const whatsappUrl = "https://wa.me/19405609662?text=Hello%2C%20I%20need%20help%20with%20a%20crypto%20fraud%20case.";
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<{
    blogs: BlogPost[];
    services: typeof SERVICES;
  }>({ blogs: [], services: [] });

  // Load blog posts on mount
  useEffect(() => {
    async function fetchBlogPosts() {
      const { data } = await supabase
        .from("blog_posts")
        .select(`
          id,
          title,
          slug,
          category_id,
          blog_categories!inner (
            id,
            name,
            slug
          )
        `)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false })
        .limit(6);

      if (data) {
        setBlogPosts(data);
      }
    }

    fetchBlogPosts();
  }, []);

  const categories = blogPosts
    .map((post) => post.blog_categories)
    .filter((category, index, self) =>
      index === self.findIndex((c: any) => c?.slug === category?.slug)
    );

  // Search function
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ blogs: [], services: [] });
      return;
    }

    const query = searchQuery.toLowerCase();

    // Search blog posts
    const matchingBlogs = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content?.toLowerCase().includes(query) ||
        post.blog_categories?.name?.toLowerCase().includes(query)
    );

    // Search services
    const matchingServices = SERVICES.filter(
      (service) =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
    );

    setSearchResults({
      blogs: matchingBlogs.slice(0, 5), // Limit to 5 results
      services: matchingServices,
    });
  }, [searchQuery, blogPosts]);

  const hasResults = searchResults.blogs.length > 0 || searchResults.services.length > 0;

  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-slate-900 text-lg hover:text-blue-600 transition-colors shrink-0">
          Cipherstracer
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-slate-700">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-slate-900 transition-colors">About Us</Link>
          <Link href="/services" className="hover:text-slate-900 transition-colors">Services</Link>
          <Link href="/about#team" className="hover:text-slate-900 transition-colors">Teams</Link>
          <Link href="/reviews" className="hover:text-slate-900 transition-colors font-medium">Testimonials</Link>
          <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact Us</Link>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search blog posts and services..."
                  className="w-full pl-9 pr-4 bg-slate-50 border-slate-200 focus:bg-white"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Command>
                <CommandList>
                  {!searchQuery.trim() && (
                    <CommandEmpty>Start typing to search...</CommandEmpty>
                  )}
                  {searchQuery.trim() && !hasResults && (
                    <CommandEmpty>No results found.</CommandEmpty>
                  )}
                  
                  {searchResults.blogs.length > 0 && (
                    <CommandGroup heading="Blog Posts">
                      {searchResults.blogs.map((post) => (
                        <CommandItem
                          key={post.id}
                          onSelect={() => {
                            window.location.href = `/blog/${post.slug}`;
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="cursor-pointer"
                        >
                          <FileText className="mr-2 h-4 w-4 text-blue-600" />
                          <div className="flex-1">
                            <div className="font-medium">{post.title}</div>
                            {post.blog_categories && (
                              <div className="text-xs text-slate-500">{(post.blog_categories as any).name}</div>
                            )}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {searchResults.services.length > 0 && (
                    <CommandGroup heading="Services">
                      {searchResults.services.map((service) => (
                        <CommandItem
                          key={service.title}
                          onSelect={() => {
                            window.location.href = `/${service.slug}`;
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="cursor-pointer"
                        >
                          <Briefcase className="mr-2 h-4 w-4 text-blue-600" />
                          <div className="flex-1">
                            <div className="font-medium">{service.title}</div>
                            <div className="text-xs text-slate-500">{service.description}</div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Button asChild size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 mr-1" />
              WhatsApp
            </a>
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/report-scam">Report Fraud Case</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {/* Mobile Search */}
                <div className="mb-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search..."
                          className="w-full pl-9 pr-4 bg-slate-50"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[260px] p-0" align="start">
                      <Command>
                        <CommandList>
                          {!searchQuery.trim() && (
                            <CommandEmpty>Start typing...</CommandEmpty>
                          )}
                          {searchQuery.trim() && !hasResults && (
                            <CommandEmpty>No results found.</CommandEmpty>
                          )}
                          
                          {searchResults.blogs.length > 0 && (
                            <CommandGroup heading="Blog Posts">
                              {searchResults.blogs.map((post) => (
                                <CommandItem
                                  key={post.id}
                                  onSelect={() => {
                                    window.location.href = `/blog/${post.slug}`;
                                  }}
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span className="truncate">{post.title}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}

                          {searchResults.services.length > 0 && (
                            <CommandGroup heading="Services">
                              {searchResults.services.map((service) => (
                                <CommandItem
                                  key={service.title}
                                  onSelect={() => {
                                    window.location.href = `/${service.slug}`;
                                  }}
                                >
                                  <Briefcase className="mr-2 h-4 w-4" />
                                  <span className="truncate">{service.title}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <Link href="/" className="text-slate-700 hover:text-slate-900 py-2 border-b">Home</Link>
                <Link href="/about" className="text-slate-700 hover:text-slate-900 py-2 border-b">About Us</Link>
                <Link href="/services" className="text-slate-700 hover:text-slate-900 py-2 border-b">Services</Link>
                <Link href="/about#team" className="text-slate-700 hover:text-slate-900 py-2 border-b">Teams</Link>
                <Link href="/reviews" className="text-slate-700 hover:text-slate-900 py-2 border-b font-medium">Testimonials</Link>
                <Link href="/contact" className="text-slate-700 hover:text-slate-900 py-2 border-b">Contact Us</Link>
                <div className="flex flex-col gap-3 mt-4">
                  <Button asChild className="bg-green-600 hover:bg-green-700 w-full">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
                    <Link href="/report-scam">Report Fraud Case</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}