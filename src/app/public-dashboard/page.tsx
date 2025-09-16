"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  AlertTriangle,
  Flame,
  CloudRain,
  Zap,
  Mountain,
  Globe,
  Filter,
  RefreshCw,
  TrendingUp,
  Users,
  Clock,
  MapPin,
} from "lucide-react"

interface Disaster {
  id: string
  type: "earthquake" | "flood" | "wildfire" | "storm"
  location: string
  coordinates: [number, number]
  severity: "low" | "medium" | "high" | "critical"
  status: "active" | "monitoring" | "resolved"
  affectedPeople: number
  lastUpdate: string
  description: string
}

const mockDisasters: Disaster[] = [
  {
    id: "1",
    type: "earthquake",
    location: "Tokyo, Japan",
    coordinates: [35.6762, 139.6503],
    severity: "high",
    status: "active",
    affectedPeople: 50000,
    lastUpdate: "2 minutes ago",
    description: "7.2 magnitude earthquake detected in metropolitan area",
  },
  {
    id: "2",
    type: "wildfire",
    location: "California, USA",
    coordinates: [36.7783, -119.4179],
    severity: "critical",
    status: "active",
    affectedPeople: 25000,
    lastUpdate: "5 minutes ago",
    description: "Rapidly spreading wildfire threatening residential areas",
  },
  {
    id: "3",
    type: "flood",
    location: "Bangladesh",
    coordinates: [23.685, 90.3563],
    severity: "medium",
    status: "monitoring",
    affectedPeople: 100000,
    lastUpdate: "15 minutes ago",
    description: "Monsoon flooding affecting multiple districts",
  },
  {
    id: "4",
    type: "storm",
    location: "Florida, USA",
    coordinates: [27.7663, -82.6404],
    severity: "high",
    status: "active",
    affectedPeople: 75000,
    lastUpdate: "8 minutes ago",
    description: "Category 3 hurricane approaching coastline",
  },
]

export default function DashboardPage() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const disasterIcons = {
    earthquake: Mountain,
    flood: CloudRain,
    wildfire: Flame,
    storm: Zap,
  }

  const severityColors = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  const statusColors = {
    active: "bg-red-500/20 text-red-400 border-red-500/30",
    monitoring: "bg-primary/20 text-primary border-primary/30",
    resolved: "bg-green-500/20 text-green-400 border-green-500/30",
  }

  const filteredDisasters = mockDisasters.filter((disaster) => {
    return (
      (selectedType === "all" || disaster.type === selectedType) &&
      (selectedSeverity === "all" || disaster.severity === selectedSeverity) &&
      (selectedStatus === "all" || disaster.status === selectedStatus)
    )
  })

  const stats = [
    {
      label: "Active Disasters",
      value: mockDisasters.filter((d) => d.status === "active").length,
      icon: AlertTriangle,
      color: "text-red-400",
    },
    {
      label: "People Affected",
      value: mockDisasters.reduce((sum, d) => sum + d.affectedPeople, 0).toLocaleString(),
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Monitoring",
      value: mockDisasters.filter((d) => d.status === "monitoring").length,
      icon: Activity,
      color: "text-yellow-400",
    },
    {
      label: "Response Teams",
      value: "47",
      icon: TrendingUp,
      color: "text-primary",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground text-glow-green mb-2">Disaster Dashboard</h1>
              <p className="text-muted-foreground">Real-time global disaster monitoring and response coordination</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary glow-green-hover bg-transparent"
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

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2">
              <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <Globe className="w-5 h-5 text-primary" />
                    <span>Global Disaster Map</span>
                  </CardTitle>
                  <CardDescription>Interactive world map showing active disaster hotspots</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-96 bg-gradient-to-br from-background to-primary/5 rounded-lg border border-border overflow-hidden">
                    {/* Simulated World Map */}
                    <div className="absolute inset-0 bg-[url('/dark-world-map.png')] bg-cover bg-center opacity-30"></div>

                    {/* Disaster Hotspots */}
                    {mockDisasters.map((disaster) => (
                      <div
                        key={disaster.id}
                        className="absolute w-4 h-4 rounded-full animate-pulse glow-green cursor-pointer"
                        style={{
                          left: `${((disaster.coordinates[1] + 180) / 360) * 100}%`,
                          top: `${((90 - disaster.coordinates[0]) / 180) * 100}%`,
                          backgroundColor:
                            disaster.severity === "critical"
                              ? "#ef4444"
                              : disaster.severity === "high"
                                ? "#f97316"
                                : "#22c55e",
                        }}
                        title={`${disaster.type} - ${disaster.location}`}
                      >
                        <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-75"></div>
                      </div>
                    ))}

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <Button size="sm" variant="secondary" className="bg-card/80 backdrop-blur-sm">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border">
                      <div className="text-xs font-medium text-foreground mb-2">Severity Levels</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs text-muted-foreground">Low-Medium</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <span className="text-xs text-muted-foreground">High</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-xs text-muted-foreground">Critical</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Controls */}
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <Filter className="w-5 h-5 text-primary" />
                    <span>Filters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Disaster Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="earthquake">Earthquake</SelectItem>
                        <SelectItem value="flood">Flood</SelectItem>
                        <SelectItem value="wildfire">Wildfire</SelectItem>
                        <SelectItem value="storm">Storm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Severity</label>
                    <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="monitoring">Monitoring</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 glow-green">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report New Disaster
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary glow-green-hover bg-transparent"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    View Predictions
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary glow-green-hover bg-transparent"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Coordinate Response
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Disaster List */}
          <div className="mt-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
              <CardHeader>
                <CardTitle className="text-foreground">Active Disasters ({filteredDisasters.length})</CardTitle>
                <CardDescription>Real-time updates on current disaster situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDisasters.map((disaster) => {
                    const Icon = disasterIcons[disaster.type]
                    return (
                      <div
                        key={disaster.id}
                        className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 glow-green-hover"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{disaster.location}</h3>
                            <p className="text-sm text-muted-foreground">{disaster.description}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={severityColors[disaster.severity]}>{disaster.severity}</Badge>
                              <Badge className={statusColors[disaster.status]}>{disaster.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-primary">
                            {disaster.affectedPeople.toLocaleString()} affected
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {disaster.lastUpdate}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
