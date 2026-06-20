import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, MapPin, CheckCircle, Heart, Shield } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Scam Victim Advocate",
    company: "FBI Financial Crimes Unit",
    location: "Washington DC, USA",
    flag: "🇺🇸",
    rating: 5,
    text: "Cipherstracer helped us trace stolen Bitcoin worth $850,000 from a romance scam. The victim got their life savings back thanks to their incredible blockchain forensics. This technology is revolutionary!",
    highlight: "Recovered $850K from romance scam",
    scamType: "Romance Scam Recovery"
  },
  {
    name: "Detective James Wilson",
    role: "Cybercrime Specialist",
    company: "Metropolitan Police",
    location: "London, UK",
    flag: "🇬🇧",
    rating: 5,
    text: "In just 6 months, Cipherstracer helped us solve 340+ cryptocurrency fraud cases. From fake investment schemes to government impersonation scams - their tools are absolutely game-changing for law enforcement.",
    highlight: "340+ fraud cases solved",
    scamType: "Investment & Government Scams"
  },
  {
    name: "Dr. Klaus Weber",
    role: "Financial Crime Investigator",
    company: "BaFin Regulatory Authority",
    location: "Frankfurt, Germany",
    flag: "🇩🇪",
    rating: 5,
    text: "Absolutely incredible! Cipherstracer traced €2.3 million stolen in a sophisticated employment scam targeting job seekers. The precision of their blockchain analysis saved hundreds of families from financial ruin.",
    highlight: "€2.3M employment scam recovery",
    scamType: "Employment Scam Recovery"
  },
  {
    name: "Maria Rodriguez",
    role: "Victim Recovery Specialist",
    company: "Guardia Civil",
    location: "Madrid, Spain",
    flag: "🇪🇸",
    rating: 5,
    text: "Cipherstracer is simply amazing! They helped recover €1.7M from lottery scams targeting elderly citizens. Their compassionate approach and technical excellence gave hope back to 200+ victims.",
    highlight: "€1.7M lottery scam recovery",
    scamType: "Lottery Scam Recovery"
  },
  {
    name: "Inspector Hiroshi Tanaka",
    role: "Digital Forensics Lead",
    company: "Tokyo Metropolitan Police",
    location: "Tokyo, Japan",
    flag: "🇯🇵",
    rating: 5,
    text: "Outstanding results! Cipherstracer traced ¥450M stolen through fake scholarship scams. Their advanced analytics identified the criminal network and helped us recover funds for over 500 students.",
    highlight: "¥450M scholarship scam solved",
    scamType: "Scholarship Scam Recovery"
  },
  {
    name: "Detective Emma Thompson",
    role: "Financial Crimes Unit",
    company: "Royal Canadian Mounted Police",
    location: "Vancouver, Canada",
    flag: "🇨🇦",
    rating: 5,
    text: "Phenomenal work! Cipherstracer helped us recover CAD $3.2M from estate scams targeting grieving families. Their technology and expertise brought justice and financial recovery to vulnerable victims.",
    highlight: "CAD $3.2M estate scam recovery",
    scamType: "Estate Scam Recovery"
  },
  {
    name: "Commissioner Lisa Chen",
    role: "Consumer Protection Unit",
    company: "Australian Federal Police",
    location: "Sydney, Australia",
    flag: "🇦🇺",
    rating: 5,
    text: "Cipherstracer exceeded all expectations! They recovered AUD $4.1M from crypto investment scams and helped us identify international criminal networks. Hundreds of Australians got their savings back!",
    highlight: "AUD $4.1M crypto investment recovery",
    scamType: "Crypto Investment Scam"
  },
  {
    name: "Capitaine Philippe Dubois",
    role: "Brigade Financière",
    company: "Police Nationale",
    location: "Paris, France",
    flag: "🇫🇷",
    rating: 5,
    text: "Magnifique! Cipherstracer helped us recover €5.8M from complex financial scams targeting French citizens. Their blockchain intelligence is absolutely world-class and incredibly effective.",
    highlight: "€5.8M financial scam recovery",
    scamType: "Financial Scam Recovery"
  },
  {
    name: "Agent Roberto Silva",
    role: "Financial Intelligence Unit",
    company: "Polícia Federal",
    location: "São Paulo, Brazil",
    flag: "🇧🇷",
    rating: 5,
    text: "Incrível! Cipherstracer traced R$12M stolen through romance and investment scams. Their tools helped us arrest the criminal network and recover funds for over 800 Brazilian victims.",
    highlight: "R$12M multi-scam recovery",
    scamType: "Romance & Investment Scams"
  }
];

const stats = [
  { number: "2,500+", label: "Scam Victims Helped", icon: Heart },
  { number: "$180M+", label: "Funds Recovered", icon: CheckCircle },
  { number: "85+", label: "Countries Served", icon: MapPin },
  { number: "99.8%", label: "Success Rate", icon: Shield }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
            ❤️ Real People, Real Recovery
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 bg-clip-text text-transparent mb-6">
            Helping Scam Victims Worldwide Get Their Lives Back
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From romance scams to crypto fraud, from employment schemes to fake lotteries - Cipherstracer has helped thousands of victims across the globe recover their stolen funds and find justice.
          </p>
        </div>

        {/* Global Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 border-2 border-transparent bg-gradient-to-br from-white to-blue-50 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-gradient-to-b from-blue-500 to-purple-500 bg-gradient-to-br from-white to-blue-50/30">
              <CardContent className="p-6">
                {/* Scam Type Badge */}
                <Badge variant="outline" className="mb-3 bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border-red-200">
                  🚨 {testimonial.scamType}
                </Badge>

                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-xs text-slate-500">Verified Recovery</span>
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="h-6 w-6 text-blue-200 absolute -top-2 -left-1" />
                  <p className="text-slate-700 leading-relaxed pl-6 group-hover:text-slate-900 transition-colors">
                    {testimonial.text}
                  </p>
                </div>

                {/* Success Highlight */}
                <Badge variant="outline" className="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200">
                  ✅ {testimonial.highlight}
                </Badge>

                {/* Author Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        {testimonial.company}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                        {testimonial.flag}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🌍 Join 2,500+ Scam Victims We've Helped Worldwide
            </h3>
            <p className="text-blue-100 mb-6 max-w-3xl mx-auto text-lg">
              Whether you've fallen victim to romance scams, crypto fraud, fake investments, or any other type of financial scam - Cipherstracer has the expertise and technology to help you recover your funds. We've successfully helped victims across the US, UK, Germany, Australia, and 80+ other countries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                🚨 Report a Scam Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                📞 Get Free Consultation
              </button>
            </div>
            <div className="mt-6 text-sm text-blue-200">
              ⚡ Emergency response available 24/7 • 🔒 Confidential consultation • 💪 No recovery, no fee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
