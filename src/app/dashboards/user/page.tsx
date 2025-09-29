"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Menu, X, Info, Database, Brain } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert as UIAlert, AlertDescription } from "@/components/ui/alert";
import {
  Activity,
  AlertTriangle,
  Flame,
  CloudRain,
  Zap,
  Mountain,
  Globe,
  RefreshCw,
  Users,
  Clock,
  Shield,
  Bell,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Eye,
} from "lucide-react";
import { account } from "@/lib/appwrite/config";
import dynamic from "next/dynamic";
const DisasterMap = dynamic(() => import("@/components/DisasterMap"), {
  ssr: false,
});

interface Disaster {
  id: string;
  
  type: "earthquake" | "flood" | "wildfire" | "storm";
  location: string;
  coordinates: [number, number];
  severity: "low" | "medium" | "high" | "critical";
  status: "active" | "monitoring" | "resolved";
  affectedPeople: number;
  lastUpdate: string;
  date: string; 
  closed?: string | null;
  description?: string;
}

interface DisasterAlert {
  id: string;
  type: "warning" | "emergency" | "info";
  title: string;
  message: string;
  timestamp: string;
  location: string;
}
const logouthandler = async () => {
  try {
    await account.deleteSession("current");
    window.location.href = "/"; // Redirect to login page
  } catch (err) {
    console.error("Logout failed:", err);
  }
};


const mockAlerts: DisasterAlert[] = [
  {
    id: "1",
    type: "emergency",
    title: "Wildfire Emergency Alert",
    message:
      "Immediate evacuation required for residents in Zone A. Follow designated evacuation routes.",
    timestamp: "3 minutes ago",
    location: "California, USA",
  },
  {
    id: "2",
    type: "warning",
    title: "Earthquake Aftershock Warning",
    message:
      "Aftershocks expected in the next 24 hours. Stay prepared and avoid damaged structures.",
    timestamp: "10 minutes ago",
    location: "Tokyo, Japan",
  },
];
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboards/user", icon: Activity },
    { name: "Precautions", href: "/precautions", icon: Shield },
    { name: "Community", href: "/dashboards/user/community", icon: Users },

    { name: "AI Predictions", href: "/ai-predictions", icon: Brain },

    { name: "About", href: "/about", icon: Info },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-cyber rounded-lg flex items-center justify-center glow-green-hover">
              <Shield className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-bold text-glow-green">
              DisasterWatch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-300 glow-green-hover"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link onClick={logouthandler} href="/Auth/login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-green">
                logout
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card/50 backdrop-blur-sm rounded-lg mt-2 border border-border">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 space-y-2">
                <Link href="/report-disaster">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Report Disaster
                  </Button>
                </Link>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Explore Platform
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function UserDashboard() {
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  
  
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);
  const [loading, setLoading] = useState(true);

  const disasterIcons = {
    earthquake: Mountain,
    flood: CloudRain,
    wildfire: Flame,
    storm: Zap,
  };
  
  const isInIndia = (lat: number, lon: number): boolean => {
    // Approximate bounding box for India mainland and nearby territories
    // Latitude: ~6 to ~37, Longitude: ~68 to ~98
    return lat >= 6 && lat <= 37 && lon >= 68 && lon <= 98;
  };
  useEffect(() => {
    const mapCategoryToType = (title: string): Disaster["type"] | null => {
      const t = title.toLowerCase();
      if (t === "wildfires") return "wildfire";
      if (t === "severe storms") return "storm";
      if (t === "earthquakes") return "earthquake";
      if (t === "floods") return "flood";
      return null;
    };

    const cleanLocationFromTitle = (title: string, mappedType: Disaster["type"], lat: number, lon: number): string => {
      let text = title || "";
      // Prefer the part after the last ' - '
      if (text.includes(" - ")) {
        const parts = text.split(" - ");
        text = parts[parts.length - 1];
      }
      // Prefer the part after the last ' in '
      if (/\bin\b/i.test(text)) {
        const idx = text.toLowerCase().lastIndexOf(" in ");
        if (idx !== -1) {
          text = text.slice(idx + 4);
        }
      }
      // Remove category words and generic tokens
      const categoryPatterns: Record<Disaster["type"], RegExp> = {
        wildfire: /\b(wildfire|wildfires)\b/gi,
        storm: /\b(severe\s*storm|severe\s*storms|storm|storms)\b/gi,
        earthquake: /\b(earthquake|earthquakes)\b/gi,
        flood: /\b(flood|floods|flooding)\b/gi,
      };
      text = text.replace(categoryPatterns[mappedType], "");
      text = text.replace(/\b(event|alert|hazard)\b/gi, "");
      // Remove standalone numbers
      text = text.replace(/\b\d+\b/g, "");
      // Cleanup punctuation/extra whitespace
      text = text.replace(/[\-–—_,]+/g, " ").replace(/\s+/g, " ").trim();
      // Remove trailing 'in' if left hanging
      text = text.replace(/\bin\s*$/i, "").trim();
      if (!text) {
        text = "Unknown";
      }
      if (isInIndia(lat, lon) && !/\bindia\b/i.test(text)) {
        text = `${text}, India`;
      }
      return text;
    };

    const extractLatLon = (geometry: any): { lat: number; lon: number } => {
      // EONET: coordinates may be [lon, lat] or nested arrays for polygons
      const findPair = (coords: any): [number, number] | null => {
        if (!Array.isArray(coords)) return null;
        if (coords.length >= 2 && typeof coords[0] === "number" && typeof coords[1] === "number") {
          return [coords[1], coords[0]]; // return [lat, lon]
        }
        for (const c of coords) {
          const pair = findPair(c);
          if (pair) return pair;
        }
        return null;
      };
      const pair = findPair(geometry?.coordinates);
      if (!pair) return { lat: 0, lon: 0 };
      return { lat: pair[0], lon: pair[1] };
    };

    const fetchDisasters = async () => {
      try {
        // Fetch open events from NASA EONET v3
        const res = await fetch(
          "https://eonet.gsfc.nasa.gov/api/v3/events?status=open"
        );
        const data = await res.json();

        const parsed: Disaster[] = (data.events || [])
          .map((ev: any) => {
            const primaryCategory = ev.categories && ev.categories[0];
            const mappedType = primaryCategory
              ? mapCategoryToType(primaryCategory.title)
              : null;
            if (!mappedType) return null; // ignore unsupported categories

            // Use the latest geometry; EONET coords are [lon, lat]
            const latestGeometry = ev.geometries && ev.geometries.length
              ? ev.geometries[ev.geometries.length - 1]
              : null;
            const { lat, lon } = extractLatLon(latestGeometry);

            const eventDate = latestGeometry?.date || ev.geometry?.date || ev.closed || ev.open || new Date().toISOString();

            // Heuristic severity by type
            const severity: Disaster["severity"] =
              mappedType === "earthquake"
                ? "critical"
                : mappedType === "wildfire"
                ? "high"
                : mappedType === "storm"
                ? "high"
                : "medium";

            const niceLocation = cleanLocationFromTitle(ev.title || "", mappedType, lat, lon);

            // Skip invalid coordinates (allow 0 values; only exclude non-finite)
            if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

            return {
              id: String(ev.id ?? ev.title),
              type: mappedType,
              location: niceLocation,
              coordinates: [lat, lon],
              severity,
              status: "active",
              affectedPeople: 0,
              lastUpdate: new Date(eventDate).toLocaleString(),
              date: eventDate,
              closed: null,
              description: ev.title,
            } as Disaster;
          })
          .filter(Boolean);
        
        // Filter for India region using coordinates or location text
        const latestTen = (parsed as Disaster[])
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10);

        setDisasters(latestTen);

        // Temporary sample alert (can be replaced later)
        setAlerts([
          {
            id: "1",
            type: "emergency",
            title: "Live Data Active",
            message: "Disasters are loaded from NASA EONET (open events).",
            timestamp: new Date().toLocaleString(),
            location: "Global",
          },
        ]);
      } catch (err) {
        console.error("Error fetching EONET disasters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasters();
  }, []);

  const severityColors = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const alertTypeColors = {
    emergency: "border-red-500/50 bg-red-500/10",
    warning: "border-yellow-500/50 bg-yellow-500/10",
    info: "border-blue-500/50 bg-blue-500/10",
  };

  const stats = [
    {
      label: "Active Disasters",
      value: disasters.filter((d) => d.status === "active").length,
      icon: AlertTriangle,
      color: "text-red-400",
    },
    {
      label: "People Affected",
      value: disasters
        .reduce((sum, d) => sum + d.affectedPeople, 0)
        .toLocaleString(),
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Active Alerts",
      value: mockAlerts.length,
      icon: Bell,
      color: "text-yellow-400",
    },
    {
      label: "Your Reports",
      value: "3",
      icon: TrendingUp,
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary glow-text mb-2">
                User Dashboard
              </h1>
              <p className="text-gray-300">
                Monitor disasters, stay informed, and contribute to community
                safety
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-black glow-green-hover bg-transparent"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
              <Badge className="bg-primary/20 text-primary border-primary/30 glow-green">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
          </div>

          {/* Emergency Alerts */}
          {mockAlerts.length > 0 && (
            <div className="mb-8 space-y-4">
              <h2 className="text-xl font-semibold text-primary glow-text">
                Emergency Alerts
              </h2>
              {mockAlerts.map((alert) => (
                <UIAlert
                  key={alert.id}
                  className={`${
                    alertTypeColors[alert.type]
                  } border-2 glow-green-hover`}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-white">
                          {alert.title}
                        </div>
                        <div className="text-gray-200 mt-1">
                          {alert.message}
                        </div>
                        <div className="text-sm text-gray-400 mt-2">
                          {alert.location} • {alert.timestamp}
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {alert.type}
                      </Badge>
                    </div>
                  </AlertDescription>
                </UIAlert>
              ))}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>
                          {stat.value}
                        </p>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2">
              <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary glow-text">
                    <Globe className="w-5 h-5" />
                    <span>Global Disaster Map</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Interactive world map showing active disaster hotspots
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-96 bg-gradient-to-br from-gray-900 to-black rounded-lg border border-primary/20 overflow-hidden">
                    {loading ? (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
                        Loading disasters...
                      </div>
                    ) : disasters.length === 0 ? (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                        No disasters available.
                      </div>
                    ) : (
                      <DisasterMap disasters={disasters} />
                    )}

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-primary/20">
                      <div className="text-xs font-medium text-primary mb-2">
                        Severity Levels
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]"></div>
                          <span className="text-xs text-gray-300">
                            Low-Medium
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <span className="text-xs text-gray-300">High</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-xs text-gray-300">
                            Critical
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary glow-text">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-black font-semibold shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report Disaster
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-black glow-green-hover bg-transparent"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    View Precautions
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-black glow-green-hover bg-transparent"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Community Forum
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-black glow-green-hover bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    AI Predictions
                  </Button>
                </CardContent>
              </Card>

              {/* Safety Tips */}
              <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary glow-text">
                    <BookOpen className="w-5 h-5" />
                    <span>Safety Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-gray-900/50 rounded-lg border border-primary/10">
                    <h4 className="font-medium text-primary mb-1">
                      Earthquake Safety
                    </h4>
                    <p className="text-sm text-gray-300">
                      Drop, Cover, and Hold On during shaking
                    </p>
                  </div>
                  <div className="p-3 bg-gray-900/50 rounded-lg border border-primary/10">
                    <h4 className="font-medium text-primary mb-1">
                      Wildfire Preparedness
                    </h4>
                    <p className="text-sm text-gray-300">
                      Create defensible space around your home
                    </p>
                  </div>
                  <div className="p-3 bg-gray-900/50 rounded-lg border border-primary/10">
                    <h4 className="font-medium text-primary mb-1">
                      Flood Response
                    </h4>
                    <p className="text-sm text-gray-300">
                      Never drive through flooded roads
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Disasters */}
          <div className="mt-8">
            <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-primary glow-text">
                  Recent Disasters ({disasters.length})
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Stay informed about current disaster situations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading && (
                    <div className="text-sm text-gray-400">Loading...</div>
                  )}
                  {!loading && disasters.length === 0 && (
                    <div className="text-sm text-gray-400">No recent disasters.</div>
                  )}
                  {disasters.map((disaster) => {
                    const Icon = disasterIcons[disaster.type];
                    return (
                      <a
                        key={disaster.id}
                        href={`https://news.google.com/search?q=${encodeURIComponent(`${disaster.type} ${disaster.location}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-primary/10 hover:border-primary/30 transition-all duration-300 glow-green-hover"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">
                              {disaster.location}
                            </h3>
                            <p className="text-sm text-gray-300">
                              {disaster.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                className={severityColors[disaster.severity]}
                              >
                                {disaster.severity}
                              </Badge>
                              <Badge className="bg-primary/20 text-primary border-primary/30">
                                {disaster.status}
                              </Badge>
                            </div>
                            <div className="mt-2">
                              <a
                                href={`https://news.google.com/search?q=${encodeURIComponent(`${disaster.type} ${disaster.location}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline text-xs"
                              >
                                Latest news
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-primary">
                            {disaster.affectedPeople.toLocaleString()} affected
                          </div>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {disaster.lastUpdate}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
