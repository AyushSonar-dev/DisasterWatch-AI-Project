"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Shield,
  Users,
  AlertTriangle,
  Activity,
  Settings,
  Database,
  Radio,
  CheckCircle,
  XCircle,
  Zap,
  Bell,
  Send,
  FileText,
  TrendingUp,
} from "lucide-react"

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [autoVerification, setAutoVerification] = useState(false)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

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
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary glow-text mb-2">Admin Dashboard</h1>
              <p className="text-gray-300">Manage disaster alerts, review reports, and coordinate responses</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">Emergency Mode</span>
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
              { label: "Pending Reports", value: "8", icon: FileText, color: "text-yellow-400" },
              { label: "Active Teams", value: "47", icon: Users, color: "text-primary" },
              { label: "System Uptime", value: "99.8%", icon: Activity, color: "text-primary" },
              { label: "Blockchain Records", value: "1,247", icon: Database, color: "text-primary" },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={index}
                  className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
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
            <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-primary/20">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary data-[state=active]:text-black text-gray-300"
              >
                <Activity className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-primary data-[state=active]:text-black text-gray-300"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="teams"
                className="data-[state=active]:bg-primary data-[state=active]:text-black text-gray-300"
              >
                <Users className="w-4 h-4 mr-2" />
                Teams
              </TabsTrigger>
              <TabsTrigger
                value="blockchain"
                className="data-[state=active]:bg-primary data-[state=active]:text-black text-gray-300"
              >
                <Database className="w-4 h-4 mr-2" />
                Blockchain
              </TabsTrigger>
              <TabsTrigger
                value="notices"
                className="data-[state=active]:bg-primary data-[state=active]:text-black text-gray-300"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notices
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-primary glow-text">
                      <TrendingUp className="w-5 h-5" />
                      <span>System Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Active Sensors</span>
                        <span className="text-primary font-medium">2,847</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Data Processing</span>
                        <span className="text-primary font-medium">67 TB/day</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-primary glow-text">
                      <Settings className="w-5 h-5" />
                      <span>System Controls</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Global Alerts</span>
                      <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Auto-Verification</span>
                      <Switch checked={autoVerification} onCheckedChange={setAutoVerification} />
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-black font-semibold shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300">
                      <Radio className="w-4 h-4 mr-2" />
                      Broadcast Emergency Alert
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary glow-text">Review Community Reports</CardTitle>
                  <CardDescription className="text-gray-300">
                    Verify and manage disaster reports from the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-primary/10"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-white">{report.title}</h3>
                            <Badge className={severityColors[report.severity]}>{report.severity}</Badge>
                          </div>
                          <div className="text-sm text-gray-400">
                            {report.location} • Reported by {report.reporter} • {report.timestamp}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {report.status === "pending" ? (
                            <>
                              <Button
                                size="sm"
                                className="bg-primary hover:bg-primary/90 text-black font-semibold shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                              >
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
              <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary glow-text">Response Team Management</CardTitle>
                  <CardDescription className="text-gray-300">
                    Monitor and coordinate emergency response teams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {responseTeams.map((team) => {
                      const Icon = teamIcons[team.type]
                      return (
                        <div
                          key={team.id}
                          className="p-4 bg-gray-900/50 rounded-lg border border-primary/10 glow-green-hover"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{team.name}</h3>
                                <p className="text-sm text-gray-400">{team.location}</p>
                              </div>
                            </div>
                            <Badge className={teamStatusColors[team.status]}>{team.status}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">{team.members} members</span>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary hover:text-black glow-green-hover bg-transparent"
                              >
                                Contact
                              </Button>
                              {team.status === "available" && (
                                <Button
                                  size="sm"
                                  className="bg-primary hover:bg-primary/90 text-black font-semibold shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                                >
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

            <TabsContent value="blockchain" className="space-y-6">
              <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary glow-text">Blockchain Aid Records</CardTitle>
                  <CardDescription className="text-gray-300">
                    Track and verify aid distribution through blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: "0x1a2b3c",
                        type: "Medical Supplies",
                        amount: "$50,000",
                        recipient: "Tokyo Emergency Center",
                        status: "Verified",
                      },
                      {
                        id: "0x4d5e6f",
                        type: "Food Aid",
                        amount: "$25,000",
                        recipient: "California Relief Fund",
                        status: "Pending",
                      },
                      {
                        id: "0x7g8h9i",
                        type: "Emergency Shelter",
                        amount: "$75,000",
                        recipient: "Bangladesh Disaster Relief",
                        status: "Verified",
                      },
                    ].map((record, index) => (
                      <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-primary/10 font-mono">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-primary text-sm">Transaction ID: {record.id}</div>
                            <div className="text-white font-medium mt-1">{record.type}</div>
                            <div className="text-gray-400 text-sm">{record.recipient}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-primary font-bold">{record.amount}</div>
                            <Badge
                              className={
                                record.status === "Verified"
                                  ? "bg-primary/20 text-primary border-primary/30"
                                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              }
                            >
                              {record.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notices" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-primary glow-text">Send Community Notice</CardTitle>
                    <CardDescription className="text-gray-300">
                      Broadcast important information to the community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Notice Message</label>
                      <Textarea
                        value={notificationMessage}
                        onChange={(e) => setNotificationMessage(e.target.value)}
                        placeholder="Enter your community notice message..."
                        className="bg-gray-900 border-gray-700 text-white focus:border-primary focus:ring-primary focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-300"
                        rows={4}
                      />
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-black font-semibold shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300">
                      <Send className="w-4 h-4 mr-2" />
                      Send Notice
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-primary glow-text">Emergency Alert</CardTitle>
                    <CardDescription className="text-gray-300">
                      Send urgent emergency alerts to all users
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Alert Message</label>
                      <Textarea
                        value={alertMessage}
                        onChange={(e) => setAlertMessage(e.target.value)}
                        placeholder="Enter emergency alert message..."
                        className="bg-gray-900 border-gray-700 text-white focus:border-primary focus:ring-primary focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-300"
                        rows={4}
                      />
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all duration-300">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Send Emergency Alert
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
