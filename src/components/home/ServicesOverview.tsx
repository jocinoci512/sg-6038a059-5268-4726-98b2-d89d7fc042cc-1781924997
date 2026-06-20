import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Search, AlertTriangle, Eye, Zap, Users, SearchCode, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ServicesOverview() {
  const services = [
    {
      icon: SearchCode,
      title: "Blockchain Forensic Investigation",
      description: "Advanced transaction tracing and wallet analysis across all major blockchains. We identify, track, and document cryptocurrency movements with forensic-grade precision for legal proceedings.",
      link: "/services"
    },
    {
      icon: ShieldCheck,
      title: "Digital Asset Recovery Services",
      description: "Expert recovery assistance for stolen cryptocurrency and digital assets. Our investigation team works directly with exchanges and law enforcement to freeze accounts and recover funds.",
      link: "/how-we-help-individuals"
    },
    {
      icon: Users,
      title: "Fraud Investigation & Analysis",
      description: "Comprehensive investigation of cryptocurrency scams including romance fraud, investment schemes, Ponzi operations, and exit scams. Detailed evidence compilation for prosecution.",
      link: "/services"
    },
    {
      icon: AlertCircle,
      title: "Risk Assessment & Due Diligence",
      description: "Pre-transaction blockchain analysis and counterparty verification. Protect your investments with professional due diligence before committing funds to projects or platforms.",
      link: "/contact"
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Comprehensive Blockchain Intelligence
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Our suite of advanced tools and services provides complete visibility into the cryptocurrency ecosystem, 
            helping businesses and individuals navigate the digital asset landscape safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <service.icon className="h-10 w-10 text-blue-600 mb-3" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/services">Contact Us for Solutions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
