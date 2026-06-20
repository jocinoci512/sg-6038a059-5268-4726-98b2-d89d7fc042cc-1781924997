
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Globe, Users, TrendingUp, Award, CheckCircle, Clock, Star, Heart, MapPin, Zap } from "lucide-react";

const trustMetrics = [
  {
    icon: Globe,
    number: "900+",
    label: "Cryptocurrencies Tracked",
    description: "Complete blockchain coverage",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Heart,
    number: "37K+",
    label: "Scam Victims Helped",
    description: "Lives changed worldwide",
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    icon: Shield,
    number: "$754M+",
    label: "Funds Recovered",
    description: "Money returned to victims",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: TrendingUp,
    number: "99.8%",
    label: "Success Rate",
    description: "Proven track record",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

const realTimeStats = [
  { label: "Cases Solved Today", value: "47", trend: "+12%", icon: CheckCircle },
  { label: "Active Investigations", value: "3,847", trend: "+23%", icon: Clock },
  { label: "Countries Served", value: "85+", trend: "+5%", icon: Globe },
  { label: "Client Satisfaction", value: "98.7%", trend: "+1.2%", icon: Star }
];

const certifications = [
  { name: "SOC 2 Type II Certified", icon: "🔒", description: "Highest security standards" },
  { name: "ISO 27001 Compliant", icon: "🛡️", description: "International security certification" },
  { name: "GDPR Compliant", icon: "🇪🇺", description: "European data protection" },
  { name: "Mastercard Acquired 2021", icon: "💳", description: "Trusted by financial leaders" }
];

const globalPresence = [
  { 
    region: "North America", 
    countries: ["🇺🇸 United States", "🇨🇦 Canada"], 
    clients: "285+", 
    recovered: "$320M+",
    highlight: "FBI Partnership"
  },
  { 
    region: "Europe", 
    countries: ["🇬🇧 United Kingdom", "🇩🇪 Germany", "🇫🇷 France", "🇪🇸 Spain"], 
    clients: "190+", 
    recovered: "€280M+",
    highlight: "Europol Collaboration"
  },
  { 
    region: "Asia-Pacific", 
    countries: ["🇯🇵 Japan", "🇦🇺 Australia", "🇸🇬 Singapore"], 
    clients: "95+", 
    recovered: "¥45B+",
    highlight: "Regional Hub Tokyo"
  },
  { 
    region: "Latin America", 
    countries: ["🇧🇷 Brazil", "🇲🇽 Mexico", "🇦🇷 Argentina"], 
    clients: "65+", 
    recovered: "R$180M+",
    highlight: "Growing Rapidly"
  }
];

const liveUpdates = [
  "🚨 Romance scam recovery: $2.3M traced in real-time",
  "✅ Investment fraud case closed: £1.8M returned to victims",
  "🔍 Employment scam network identified across 12 countries",
  "💰 Lottery fraud bust: CAD $950K recovered for families",
  "🎯 Government impersonation scam stopped: AUD $1.2M saved"
];

export default function TrustSignals() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 border-0">
            🌍 Global Leader in Scam Recovery
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 bg-clip-text text-transparent mb-6">
            Trusted Worldwide - Proven Results in 85+ Countries
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            From Silicon Valley tech companies to European banks, from scam victims to law enforcement agencies - CipherTrace is the global leader in blockchain intelligence and cryptocurrency recovery.
          </p>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-16 border-l-4 border-l-green-500">
          <div className="flex items-center mb-4">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
            <h3 className="text-lg font-bold text-slate-900">🔴 Live Recovery Updates</h3>
            <Badge variant="outline" className="ml-3 bg-green-100 text-green-700 border-green-300">
              Real-time
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveUpdates.map((update, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow-sm border text-sm text-slate-700 hover:shadow-md transition-shadow">
                {update}
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {realTimeStats.map((stat, index) => (
            <Card key={index} className="text-center p-4 bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-300">
              <CardContent className="p-0">
                <stat.icon className="h-6 w-6 text-blue-600 mx-auto mb-3" />
                <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-600 font-medium mb-2">
                  {stat.label}
                </div>
                <div className="text-xs text-green-600 font-semibold flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Core Trust Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustMetrics.map((metric, index) => (
            <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-blue-300">
              <CardContent className="p-0">
                <div className={`${metric.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-2">
                  {metric.number}
                </div>
                <div className="text-sm font-semibold text-slate-900 mb-2">
                  {metric.label}
                </div>
                <div className="text-xs text-slate-600">
                  {metric.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global Regional Presence */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-slate-900 mb-8 flex items-center justify-center">
            <MapPin className="h-6 w-6 text-blue-600 mr-2" />
            🌍 Global Recovery Operations
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalPresence.map((region, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-0">
                  <Badge variant="outline" className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
                    🏆 {region.highlight}
                  </Badge>
                  <h4 className="font-bold text-slate-900 mb-3">{region.region}</h4>
                  <div className="space-y-2 mb-4">
                    {region.countries.map((country, idx) => (
                      <div key={idx} className="text-sm text-slate-600">{country}</div>
                    ))}
                  </div>
                  <div className="border-t pt-3 space-y-1">
                    <div className="text-sm font-semibold text-green-600">{region.clients} active clients</div>
                    <div className="text-sm font-semibold text-blue-600">{region.recovered} recovered</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enterprise Security & Mastercard */}
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-blue-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Award className="h-7 w-7 text-blue-600 mr-3" />
                🛡️ Enterprise Security & Compliance
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center bg-white rounded-lg p-4 shadow-sm border">
                    <div className="text-2xl mr-3">{cert.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 mb-1">{cert.name}</div>
                      <div className="text-xs text-slate-600">{cert.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-2xl mb-3 shadow-lg">
                Mastercard
              </div>
              <Badge variant="outline" className="mb-3 bg-green-50 text-green-700 border-green-200">
                ✅ Acquired 2021
              </Badge>
              <div className="text-sm text-slate-600 mb-2">
                Part of the global Mastercard family
              </div>
              <div className="text-xs text-slate-500">
                Backed by a Fortune 100 company
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Response CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 rounded-2xl p-8 text-white shadow-2xl">
            <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ⚡ 24/7 Emergency Scam Recovery Hotline
            </h3>
            <p className="text-red-100 mb-6 max-w-3xl mx-auto">
              Don't wait - every minute counts in scam recovery. Our global team of blockchain experts is standing by to help trace your stolen funds and work with law enforcement worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-red-50 transition-colors shadow-lg text-lg">
                🚨 Emergency Response
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                💬 Free Consultation
              </button>
            </div>
            <div className="text-sm text-red-200">
              🌍 Available in 85+ countries • 🔒 Confidential • 💸 No recovery, no fee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
