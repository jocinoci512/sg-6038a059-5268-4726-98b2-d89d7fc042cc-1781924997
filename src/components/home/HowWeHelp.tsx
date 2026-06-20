import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Lock, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowWeHelp() {
  const benefits = [
    {
      icon: Shield,
      title: "Scam Recovery Assistance",
      description: "Our forensics experts help trace stolen funds and provide evidence for law enforcement and legal proceedings."
    },
    {
      icon: Users,
      title: "Transaction Safety",
      description: "Ensure your exchanges and wallets use compliant platforms with our AML screening technology."
    },
    {
      icon: Lock,
      title: "Privacy Protection",
      description: "Advanced tools that protect legitimate privacy while combating illicit financial activities."
    },
    {
      icon: BookOpen,
      title: "Education & Awareness",
      description: "Comprehensive resources to help you identify and avoid cryptocurrency scams and fraud."
    }
  ];

  const steps = [
    { step: "1", title: "Report to Authorities", description: "File a complaint with IC3.gov (US) or ActionFraud.police.uk (UK)" },
    { step: "2", title: "Contact Your Exchange", description: "Immediately notify your cryptocurrency exchange or wallet provider" },
    { step: "3", title: "Gather Evidence", description: "Collect all transaction IDs, addresses, and communication records" },
    { step: "4", title: "Seek Professional Help", description: "Contact Cipherstracer for advanced blockchain forensics assistance" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Individual Protection
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How We Help Individuals
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Whether you're a victim of crypto fraud or want to protect your investments, 
            Cipherstracer provides the tools and expertise to secure your digital assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center h-full">
              <CardHeader>
                <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-slate-50 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Steps After a Crypto Scam
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-4 -right-3 h-4 w-4 text-slate-400" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/contact">Report a Scam Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
