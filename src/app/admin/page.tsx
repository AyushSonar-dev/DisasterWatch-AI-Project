"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Users,
  AlertTriangle,
  Activity,
  Settings,
  Database,
  Radio,
  Eye,
  CheckCircle,
  XCircle,
  Zap,
  Globe,
  Lock,
  Unlock,
  Bell,
  Cpu,
  HardDrive,
  Server,
} from "lucide-react"

interface SystemStatus {
  component: string
  status: "online" | "offline" | "warning"
  uptime: string
  load: number
}

interface PendingReport {
  id: string
  title: string
  location: string
  severity: "low" | "medium" | "high" | "critical"
  reporter: string
  timestamp: string
  status: "pending" | "approved" | "rejected"
}

interface ResponseTeam {
  id: string
  name: string
  type: "fire" | "medical" | "police" | "rescue"
  status: "available" | "deployed" | "offline"
  location: string
  members: number
}

const systemComponents: SystemStatus[] = [
  { component: "AI Prediction Engine", status: "online", uptime: "99.9%", load: 67 },
  { component: "Blockchain Network", status: "online", uptime: "100%", load: 23 },
  { component: "Satellite Feed", status: "warning", uptime: "98.2%", load: 89 },
  { component: "Emergency Alerts", status: "online", uptime: "99.8%", load: 45 },
  { component: "Community Platform", status: "online", uptime: "99.5%", load: 78 },
  { component: "Data Analytics", status: "online", uptime: "99.7%", load: 56 },
]

const pendingReports: PendingReport[] = [
  {
    id: "1",
    title: "Wildfire Spotted Near Highway 101",
    location: "Marin County, CA",
    severity: "high",
    reporter: "Sarah Chen",
    timestamp: "15 minutes ago",
    status: "pending",
  },
  {
    id: "2",
    title: "Flash Flood Warning Downtown",
    location: "Austin, TX",
    severity: "medium",
    reporter: "Mike Rodriguez",
    timestamp: "32 minutes ago",
    status: "pending",
  },
  {
    id: "3",
    title: "Earthquake Aftershocks Continuing",
    location: "San Francisco, CA",
    severity: "medium",
    reporter: "Dr. Lisa Park",
    timestamp: "1 hour ago",
    status: "approved",
  },
]

const responseTeams: ResponseTeam[] = [
  { id: "1", name: "Fire Station 12", type: "fire", status: "available", location: "Downtown", members: 8 },
  { id: "2", name: "Rescue Team Alpha", type: "rescue", status: "deployed", location: "Highway 101", members: 6 },
  { id: "3", name: "Medical Unit 5", type: "medical", status: "available", location: "North District", members: 4 },
  { id: "4", name: "Police Unit 23", type: "police", status: "available", location: "City Center", members: 12 },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [autoVerification, setAutoVerification] = useState(false)
  const [emergencyMode, setEmergencyMode] = useState(false)

  const statusColors = {
    online: "text-primary",
    offline: "text-red-400",
    warning: "text-yellow-400",
  }

  const statusBgColors = {
    online: "bg-primary/20 border-primary/30",
    offline: "bg-red-500/20 border-red-500/30",
    warning: "bg-yellow-500/20 border-yellow-500/30",
  }

  const severityColors = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  const teamStatusColors = {
    available: "bg-primary/20 text-primary border-primary/30",
    deployed: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    offline: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  const teamIcons = {
    fire: Zap,
    medical: Activity,
    police: Shield,
    rescue: Users,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground text-glow-green mb-2">Authority Control Panel</h1>
              <p className="text-muted-foreground">Centralized disaster management and system administration</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Emergency Mode</span>
                <Switch
                  checked={emergencyMode}
                  onCheckedChange={setEmergencyMode}
                  className="data-[state=checked]:bg-red-500"
                />
              </div>
              <Badge
                className={
                  emergencyMode
                    ? "bg-red-500/20 text-red-400 border-red-500/30 glow-green"
                    : "bg-primary/20 text-primary border-primary/30"
                }
              >
                {emergencyMode ? "EMERGENCY ACTIVE" : "NORMAL OPERATIONS"}
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Active Alerts", value: "12", icon: AlertTriangle, color: "text-red-400" },
              { label: "Response Teams", value: "47", icon: Users, color: "text-primary" },
              { label: "System Uptime", value: "99.8%", icon: Activity, color: "text-primary" },
              { label: "Verified Reports", value: "156", icon: CheckCircle, color: "text-primary" },
            ].map((stat, index) => {
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-card/50 border border-border">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Activity className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="teams"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="w-4 h-4 mr-2" />
                Teams
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Settings className="w-4 h-4 mr-2" />
                System
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Shield className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* System Status */}
                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Server className="w-5 h-5 text-primary" />
                      <span>System Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemComponents.map((component, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${component.status === "online" ? "bg-primary glow-green" : component.status === "warning" ? "bg-yellow-400" : "bg-red-400"}`}
                          ></div>
                          <div>
                            <div className="font-medium text-foreground">{component.component}</div>
                            <div className="text-sm text-muted-foreground">Uptime: {component.uptime}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={statusBgColors[component.status]}>{component.status}</Badge>
                          <div className="text-sm text-muted-foreground mt-1">Load: {component.load}%</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Real-time Monitoring */}
                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Eye className="w-5 h-5 text-primary" />
                      <span>Real-time Monitoring</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Active Sensors</span>
                        <span className="text-primary font-medium">2,847</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Data Processing</span>
                        <span className="text-primary font-medium">67 TB/day</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Alert Response Time</span>
                        <span className="text-primary font-medium">1.2s avg</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">24/7</div>
                          <div className="text-xs text-muted-foreground">Monitoring</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">99.9%</div>
                          <div className="text-xs text-muted-foreground">Accuracy</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Control Panel */}
              <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <Settings className="w-5 h-5 text-primary" />
                    <span>System Controls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Alert System</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Global Alerts</span>
                          <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Auto-Verification</span>
                          <Switch checked={autoVerification} onCheckedChange={setAutoVerification} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Communication</h4>
                      <div className="space-y-2">
                        <Button className="w-full bg-primary hover:bg-primary/90 glow-green" size="sm">
                          <Radio className="w-4 h-4 mr-2" />
                          Broadcast Alert
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary glow-green-hover bg-transparent"
                          size="sm"
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Send Notification
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Emergency Actions</h4>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                          size="sm"
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Activate Emergency
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary glow-green-hover bg-transparent"
                          size="sm"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Coordinate Response
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                <CardHeader>
                  <CardTitle className="text-foreground">Pending Report Verification</CardTitle>
                  <CardDescription>Review and verify community disaster reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-foreground">{report.title}</h3>
                            <Badge className={severityColors[report.severity]}>{report.severity}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {report.location} • Reported by {report.reporter} • {report.timestamp}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {report.status === "pending" ? (
                            <>
                              <Button size="sm" className="bg-primary hover:bg-primary/90 glow-green">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          ) : (
                            <Badge
                              className={
                                report.status === "approved"
                                  ? "bg-primary/20 text-primary border-primary/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                              }
                            >
                              {report.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teams" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                <CardHeader>
                  <CardTitle className="text-foreground">Response Team Management</CardTitle>
                  <CardDescription>Monitor and coordinate emergency response teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {responseTeams.map((team) => {
                      const Icon = teamIcons[team.type]
                      return (
                        <div
                          key={team.id}
                          className="p-4 bg-background/50 rounded-lg border border-border glow-green-hover"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium text-foreground">{team.name}</h3>
                                <p className="text-sm text-muted-foreground">{team.location}</p>
                              </div>
                            </div>
                            <Badge className={teamStatusColors[team.status]}>{team.status}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{team.members} members</span>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-primary text-primary glow-green-hover bg-transparent"
                              >
                                Contact
                              </Button>
                              {team.status === "available" && (
                                <Button size="sm" className="bg-primary hover:bg-primary/90 glow-green">
                                  Deploy
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Database className="w-5 h-5 text-primary" />
                      <span>Database Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Storage Used</span>
                        <span className="text-primary font-medium">847 GB / 2 TB</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-primary hover:bg-primary/90 glow-green" size="sm">
                        <HardDrive className="w-4 h-4 mr-2" />
                        Backup Database
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary glow-green-hover bg-transparent"
                        size="sm"
                      >
                        <Database className="w-4 h-4 mr-2" />
                        Optimize Tables
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Cpu className="w-5 h-5 text-primary" />
                      <span>Performance Metrics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">CPU Usage</span>
                        <span className="text-primary font-medium">34%</span>
                      </div>
                      <Progress value={34} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Memory Usage</span>
                        <span className="text-primary font-medium">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Network I/O</span>
                        <span className="text-primary font-medium">23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                <CardHeader>
                  <CardTitle className="text-foreground">User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Chen", role: "Community Reporter", status: "active", reputation: 95 },
                      { name: "Dr. Lisa Park", role: "Expert Contributor", status: "active", reputation: 100 },
                      { name: "Mike Rodriguez", role: "Community Member", status: "suspended", reputation: 78 },
                      { name: "Emergency Coordinator", role: "Response Team", status: "active", reputation: 100 },
                    ].map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-medium">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {user.role} • Reputation: {user.reputation}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              user.status === "active"
                                ? "bg-primary/20 text-primary border-primary/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {user.status}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-primary text-primary glow-green-hover bg-transparent"
                          >
                            {user.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
