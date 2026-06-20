import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Globe, MessageCircle, AlertTriangle, DollarSign } from "lucide-react";

export default function AnalyticsSection() {
  const analyticsData = {
    totalVisitors: 12847,
    messagesSent: 156,
    scamReports: 23,
    countriesReached: 45,
    recoveredFunds: "$2.3M",
    successRate: "78%"
  };

  const recentActivity = [
    { action: "New scam report", details: "Romance scam from New York", time: "2 hours ago", type: "alert" },
    { action: "Contact form submission", details: "AML inquiry from London", time: "4 hours ago", type: "message" },
    { action: "Website visit", details: "Visitor from Germany", time: "6 hours ago", type: "visit" },
    { action: "Scam report resolved", details: "Investment scam case closed", time: "1 day ago", type: "success" }
  ];

  const topCountries = [
    { country: "United States", messages: 45, flag: "🇺🇸" },
    { country: "United Kingdom", messages: 23, flag: "🇬🇧" },
    { country: "Germany", messages: 18, flag: "🇩🇪" },
    { country: "Canada", messages: 12, flag: "🇨🇦" },
    { country: "Australia", messages: 8, flag: "🇦🇺" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Visitors</p>
                <p className="text-3xl font-bold text-slate-900">{analyticsData.totalVisitors.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last month
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Messages Received</p>
                <p className="text-3xl font-bold text-slate-900">{analyticsData.messagesSent}</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% from last month
                </p>
              </div>
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Scam Reports</p>
                <p className="text-3xl font-bold text-slate-900">{analyticsData.scamReports}</p>
                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                  <AlertTriangle className="h-3 w-3" />
                  Urgent attention needed
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Countries Reached</p>
                <p className="text-3xl font-bold text-slate-900">{analyticsData.countriesReached}</p>
              </div>
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Funds Recovered</p>
                <p className="text-3xl font-bold text-slate-900">{analyticsData.recoveredFunds}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Success Rate</p>
                <p className="text-3xl font-bold text-slate-900">{analyticsData.successRate}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and events on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "alert" ? "bg-red-500" :
                    activity.type === "message" ? "bg-blue-500" :
                    activity.type === "success" ? "bg-green-500" : "bg-gray-500"
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-slate-600">{activity.details}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle>Messages by Country</CardTitle>
            <CardDescription>Geographic distribution of incoming messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{country.flag}</span>
                    <span className="font-medium">{country.country}</span>
                  </div>
                  <Badge variant="secondary">{country.messages} messages</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}