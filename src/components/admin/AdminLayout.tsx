import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  Mail, 
  MessageSquare, 
  HelpCircle, 
  Image, 
  Settings, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Cases", href: "/admin/cases", icon: FolderKanban },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { name: "Contact Inquiries", href: "/admin/contacts", icon: MessageSquare },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { name: "Media Library", href: "/admin/media", icon: Image },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authService.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-slate-800">
            <h1 className="text-xl font-bold">Cipherstracer Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {children}
        </div>
      </div>
    </div>
  );
}