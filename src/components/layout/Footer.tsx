import Link from "next/link";
import { Shield, Twitter, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  const phoneNumber = "+1 (214) 689-9293";
  const whatsappUrl = "https://wa.me/12146899293?text=Hello%2C%20I%20need%20help%20with%20crypto%20security.";
  const telUrl = "tel:+12146899293";

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">CipherTrace</span>
            </div>
            <p className="text-slate-300 text-sm">
              Securing the crypto economy through world-class blockchain intelligence and AML compliance solutions.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com/CipherTrace" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:contact@ciphertrace.com" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/services" className="hover:text-white transition-colors">AML Compliance</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Blockchain Forensics</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Threat Intelligence</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">De-Anonymization Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/resources" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Security Guides</Link></li>
              <li><Link href="/help-individuals" className="hover:text-white transition-colors">Scam Recovery</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Report Fraud</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-green-400" />
              24/7 Support
            </h3>
            <div className="space-y-3">
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">Call or Text Anytime</p>
                <a href={telUrl} className="text-lg font-bold text-green-400 hover:text-green-300 transition-colors font-mono">
                  {phoneNumber}
                </a>
              </div>
              <div className="space-y-2">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Chat</span>
                </a>
                <a 
                  href={telUrl}
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-green-400 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Direct Call</span>
                </a>
                <Link 
                  href="/contact"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} CipherTrace. A Mastercard Company. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link href="/admin" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
