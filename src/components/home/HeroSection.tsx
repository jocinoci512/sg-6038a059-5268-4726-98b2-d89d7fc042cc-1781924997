import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import BlockchainAnimation from "@/components/ui/BlockchainAnimation";
import { AlertTriangle, Shield, Globe, Zap, Heart, TrendingUp, Users, DollarSign } from "lucide-react";

const liveStats = [
  { label: "Funds Recovered", value: "$754M+", icon: DollarSign, color: "text-green-400" },
  { label: "Victims Helped", value: "37,000+", icon: Heart, color: "text-red-400" },
  { label: "Countries Served", value: "85+", icon: Globe, color: "text-blue-400" },
  { label: "Success Rate", value: "99.8%", icon: TrendingUp, color: "text-purple-400" }
];

const urgentAlerts = [
  "🚨 Romance scam recovery: $2.3M traced live",
  "✅ Investment fraud resolved: £1.8M returned",
  "🔍 Employment scam network identified",
  "💰 Lottery scam stopped: CAD $950K saved"
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 min-h-[600px] flex items-center">
      {/* Premium Cybersecurity Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-parallax"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      
      {/* Dark Blue Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-slate-900/85 to-blue-950/90" />
      
      {/* Blockchain Animation Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <BlockchainAnimation />
      </div>

      {/* Content */}
      <div className="relative container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-20 z-10">
        <div className="max-w-4xl">
          <Badge className="mb-6 bg-blue-500/20 text-blue-100 border-blue-400/30 backdrop-blur-sm">
            <Shield className="h-4 w-4 mr-2" />
            Blockchain Investigation & Digital Asset Recovery
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Professional Blockchain Investigation & Digital Asset Recovery
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl leading-relaxed">
            Advanced blockchain forensics and cryptocurrency fraud investigation trusted by law enforcement, financial institutions, and scam victims worldwide. Expert asset tracing with proven results.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">$2.8B+</div>
              <div className="text-sm text-blue-100">Assets Recovered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">85+</div>
              <div className="text-sm text-blue-100">Countries Served</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">150+</div>
              <div className="text-sm text-blue-100">Law Enforcement Partners</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-blue-100">Expert Support</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/50">
              <Link href="/services">Explore Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
              <Link href="/report-scam">Report Fraud Case</Link>
            </Button>
          </div>

          {/* Urgent Alerts Marquee */}
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-3 overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-300 animate-pulse" />
              <span className="text-xs font-semibold text-red-200 uppercase tracking-wide">Live Recovery Operations</span>
            </div>
            <div className="relative overflow-hidden h-6">
              <div className="marquee-content whitespace-nowrap text-sm text-white">
                {urgentAlerts.map((alert, i) => (
                  <span key={i} className="inline-block mx-8">{alert}</span>
                ))}
                {urgentAlerts.map((alert, i) => (
                  <span key={`dup-${i}`} className="inline-block mx-8">{alert}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for Parallax and Marquee */}
      <style jsx>{`
        .hero-parallax {
          animation: slowPan 20s ease-in-out infinite alternate;
        }

        @keyframes slowPan {
          0% {
            transform: scale(1.05) translateX(0);
          }
          100% {
            transform: scale(1.05) translateX(-20px);
          }
        }

        .marquee-content {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-parallax,
          .marquee-content {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}