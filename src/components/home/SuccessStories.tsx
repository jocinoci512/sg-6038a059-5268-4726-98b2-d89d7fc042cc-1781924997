import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Users, Globe, CheckCircle, Award, Heart, DollarSign, AlertTriangle, ShieldCheck } from "lucide-react";

const successStories = [
  {
    icon: Heart,
    title: "Romance Scam Victims Saved",
    location: "United States 🇺🇸",
    amount: "$45M",
    description: "Successfully traced and recovered $45M stolen through romance scams targeting vulnerable individuals on dating platforms. Our forensics helped law enforcement arrest the criminal network and return funds to 850+ victims.",
    impact: "850+ victims helped",
    color: "bg-rose-500",
    scamType: "Romance Scam Recovery"
  },
  {
    icon: DollarSign,
    title: "Crypto Investment Fraud Bust",
    location: "United Kingdom 🇬🇧",
    amount: "£38M",
    description: "Exposed a massive fake cryptocurrency investment scheme targeting UK investors. Our blockchain analysis led to the arrest of 12 criminals and recovery of £38M in stolen Bitcoin and Ethereum.",
    impact: "2,100+ investors protected",
    color: "bg-blue-500",
    scamType: "Investment Scam Recovery"
  },
  {
    icon: Users,
    title: "Employment Scam Network Destroyed",
    location: "Germany 🇩🇪",
    amount: "€22M",
    description: "Dismantled an international employment scam network targeting job seekers with fake remote work opportunities. Recovered €22M and helped prosecute criminals across 8 countries.",
    impact: "1,650+ job seekers saved",
    color: "bg-green-600",
    scamType: "Employment Scam Recovery"
  },
  {
    icon: AlertTriangle,
    title: "Government Impersonation Scams",
    location: "Australia 🇦🇺",
    amount: "AUD $15M",
    description: "Identified and stopped government impersonation scams targeting elderly Australians with fake tax and pension threats. Our work led to AUD $15M in fund recovery.",
    impact: "900+ seniors protected",
    color: "bg-orange-500",
    scamType: "Government Scam Recovery"
  },
  {
    icon: Shield,
    title: "Lottery Scam Ring Eliminated",
    location: "Canada 🇨🇦",
    amount: "CAD $28M",
    description: "Exposed an elaborate lottery scam targeting immigrants with fake winning notifications. Recovered CAD $28M and helped victims across 15 provinces get their money back.",
    impact: "1,200+ families helped",
    color: "bg-purple-500",
    scamType: "Lottery Scam Recovery"
  },
  {
    icon: ShieldCheck,
    title: "Estate Scam Prevention",
    location: "Spain 🇪🇸",
    amount: "€19M",
    description: "Prevented estate scams targeting grieving families with fake inheritance opportunities. Our intervention saved €19M and protected over 500 vulnerable families during their time of loss.",
    impact: "500+ families protected",
    color: "bg-teal-500",
    scamType: "Estate Scam Prevention"
  }
];

const globalImpactStats = [
  { 
    label: "Active Recovery Cases", 
    value: "3,847", 
    trend: "+23%",
    description: "Currently investigating scam cases worldwide",
    icon: AlertTriangle
  },
  { 
    label: "Funds Recovered Today", 
    value: "$2.3M", 
    trend: "+15%",
    description: "Real-time fund recovery across all scam types",
    icon: DollarSign
  },
  { 
    label: "Victims Helped This Month", 
    value: "1,456", 
    trend: "+18%",
    description: "Individuals assisted with scam recovery",
    icon: Heart
  },
  { 
    label: "Countries with Active Cases", 
    value: "67", 
    trend: "+5%",
    description: "Global reach of our recovery operations",
    icon: Globe
  }
];

const scamTypeStats = [
  { type: "Romance Scams", recovered: "$180M+", victims: "8,500+", countries: "45+", color: "bg-rose-100 text-rose-700", emoji: "💔" },
  { type: "Investment Fraud", recovered: "$320M+", victims: "12,000+", countries: "52+", color: "bg-blue-100 text-blue-700", emoji: "📈" },
  { type: "Employment Scams", recovered: "$95M+", victims: "6,200+", countries: "38+", color: "bg-green-100 text-green-700", emoji: "💼" },
  { type: "Lottery Scams", recovered: "$76M+", victims: "4,800+", countries: "41+", color: "bg-yellow-100 text-yellow-700", emoji: "🎰" },
  { type: "Government Scams", recovered: "$45M+", victims: "3,100+", countries: "29+", color: "bg-orange-100 text-orange-700", emoji: "🏛️" },
  { type: "Estate Scams", recovered: "$38M+", victims: "2,200+", countries: "22+", color: "bg-purple-100 text-purple-700", emoji: "🏡" }
];

export default function SuccessStories() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-0">
            🌍 Global Impact Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 bg-clip-text text-transparent mb-6">
            How We're Helping Scam Victims Worldwide Recover Their Funds
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            From romance scams in the US to investment fraud in the UK, from employment scams in Germany to lottery fraud in Canada - CipherTrace has helped victims across 85+ countries recover over $754 million in stolen funds.
          </p>
        </div>

        {/* Live Recovery Dashboard */}
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl p-8 shadow-lg mb-16 border-l-4 border-l-green-500">
          <div className="flex items-center mb-6">
            <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse mr-3"></div>
            <h3 className="text-xl font-bold text-slate-900">🚨 Live Scam Recovery Dashboard</h3>
            <Badge variant="outline" className="ml-3 bg-green-50 text-green-700 border-green-200">
              ⚡ Real-time Updates
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {globalImpactStats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-lg p-4 shadow-sm border">
                <stat.icon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 mb-2">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium flex items-center justify-center mb-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </div>
                <div className="text-xs text-slate-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scam Type Recovery Stats */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">💪 Our Track Record by Scam Type</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scamTypeStats.map((scam, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{scam.emoji}</div>
                  <Badge className={`${scam.color} mb-4`}>
                    {scam.type}
                  </Badge>
                  <div className="space-y-2">
                    <div className="text-lg font-bold text-slate-900">{scam.recovered}</div>
                    <div className="text-sm text-slate-600">Funds Recovered</div>
                    <div className="text-sm text-green-600 font-semibold">{scam.victims} victims helped</div>
                    <div className="text-xs text-slate-500">{scam.countries} countries served</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Success Stories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">🎯 Featured Recovery Success Stories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="group shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`${story.color} p-4 text-white`}>
                    <div className="flex items-center justify-between">
                      <story.icon className="h-8 w-8" />
                      <div className="text-right">
                        <div className="text-2xl font-bold">{story.amount}</div>
                        <div className="text-sm opacity-90">Recovered</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <Badge variant="outline" className="mb-3 bg-red-50 text-red-700 border-red-200">
                      🚨 {story.scamType}
                    </Badge>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900">{story.title}</h3>
                      <div className="text-sm text-slate-500">{story.location}</div>
                    </div>
                    <p className="text-slate-700 leading-relaxed mb-4">{story.description}</p>
                    <div className="pt-4 border-t">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mb-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {story.impact}
                      </Badge>
                      <div className="text-xs text-slate-500">✅ Verified Recovery Success</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Global Recognition with Emergency CTA */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 rounded-2xl p-8 text-white text-center shadow-2xl">
          <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            🚨 Been Scammed? We Can Help You Recover Your Money!
          </h3>
          <p className="text-red-100 mb-6 max-w-3xl mx-auto text-lg">
            Whether you've fallen victim to romance scams, fake investments, employment fraud, lottery scams, or any other financial crime - CipherTrace has the expertise to trace your stolen funds and help law enforcement bring criminals to justice.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6 max-w-2xl mx-auto">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">$754M+</div>
              <div className="text-sm">Total Funds Recovered</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">37,000+</div>
              <div className="text-sm">Scam Victims Helped</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-red-50 transition-colors shadow-lg text-lg">
              🚨 Report Your Scam Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              📞 Emergency Consultation
            </button>
          </div>
          <div className="text-sm text-red-200">
            ⚡ 24/7 Emergency Response • 🔒 100% Confidential • 💪 No Recovery, No Fee • 🌍 Available Worldwide
          </div>
        </div>
      </div>
    </section>
  );
}
