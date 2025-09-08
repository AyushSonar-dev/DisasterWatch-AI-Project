"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Heart,
  Share2,
  Send,
  Plus,
  Filter,
  Search,
  Flame,
  CloudRain,
  Mountain,
  Zap,
  Camera,
  Shield,
  Star,
} from "lucide-react"

interface DisasterReport {
  id: string
  type: "earthquake" | "flood" | "wildfire" | "storm"
  title: string
  description: string
  location: string
  coordinates: [number, number]
  severity: "low" | "medium" | "high" | "critical"
  status: "unverified" | "verified" | "investigating"
  reporter: {
    name: string
    avatar: string
    reputation: number
  }
  timestamp: string
  likes: number
  comments: number
  images?: string[]
  tags: string[]
}

interface ForumPost {
  id: string
  author: {
    name: string
    avatar: string
    role: "community" | "responder" | "expert"
    reputation: number
  }
  title: string
  content: string
  timestamp: string
  likes: number
  replies: number
  category: "general" | "preparedness" | "recovery" | "resources"
  tags: string[]
  isSticky?: boolean
}

const mockReports: DisasterReport[] = [
  {
    id: "1",
    type: "wildfire",
    title: "Smoke Visible from Highway 101",
    description:
      "Large plumes of smoke visible from multiple locations. Fire appears to be spreading rapidly through dry vegetation. Local residents are beginning to evacuate.",
    location: "Marin County, CA",
    coordinates: [38.0834, -122.7633],
    severity: "high",
    status: "verified",
    reporter: {
      name: "Sarah Chen",
      avatar: "/diverse-woman-portrait.png",
      reputation: 95,
    },
    timestamp: "15 minutes ago",
    likes: 23,
    comments: 8,
    images: ["/wildfire.jpg"],
    tags: ["evacuation", "highway101", "urgent"],
  },
  {
    id: "2",
    type: "flood",
    title: "River Overflowing Downtown",
    description:
      "Main Street is completely flooded. Water level rising rapidly. Several cars stranded. Emergency services on scene.",
    location: "Austin, TX",
    coordinates: [30.2672, -97.7431],
    severity: "medium",
    status: "investigating",
    reporter: {
      name: "Mike Rodriguez",
      avatar: "/thoughtful-man.png",
      reputation: 78,
    },
    timestamp: "32 minutes ago",
    likes: 15,
    comments: 12,
    tags: ["flooding", "downtown", "rescue"],
  },
  {
    id: "3",
    type: "earthquake",
    title: "Strong Shaking Felt",
    description:
      "Significant earthquake felt across the bay area. Some minor damage to buildings reported. Aftershocks continuing.",
    location: "San Francisco, CA",
    coordinates: [37.7749, -122.4194],
    severity: "medium",
    status: "verified",
    reporter: {
      name: "Dr. Lisa Park",
      avatar: "/scientist-in-lab.png",
      reputation: 100,
    },
    timestamp: "1 hour ago",
    likes: 45,
    comments: 23,
    tags: ["earthquake", "bayarea", "aftershocks"],
  },
]

const mockForumPosts: ForumPost[] = [
  {
    id: "1",
    author: {
      name: "Emergency Coordinator",
      avatar: "/event-coordinator.png",
      role: "responder",
      reputation: 100,
    },
    title: "Wildfire Season Preparation Checklist",
    content:
      "With fire season approaching, here's a comprehensive checklist to help your family prepare. Please share your own tips and experiences.",
    timestamp: "2 hours ago",
    likes: 67,
    replies: 24,
    category: "preparedness",
    tags: ["wildfire", "checklist", "preparation"],
    isSticky: true,
  },
  {
    id: "2",
    author: {
      name: "Community Volunteer",
      avatar: "/volunteer-community-garden.png",
      role: "community",
      reputation: 85,
    },
    title: "Organizing Neighborhood Emergency Response Team",
    content:
      "Looking to start a CERT team in our area. Who's interested in joining? We can coordinate training and resources together.",
    timestamp: "4 hours ago",
    likes: 32,
    replies: 18,
    category: "general",
    tags: ["CERT", "neighborhood", "training"],
  },
  {
    id: "3",
    author: {
      name: "Dr. Weather Expert",
      avatar: "/expert-consultation.png",
      role: "expert",
      reputation: 98,
    },
    title: "Understanding Hurricane Categories and Preparation",
    content:
      "Educational post about hurricane classification and what each category means for preparation and evacuation decisions.",
    timestamp: "6 hours ago",
    likes: 89,
    replies: 15,
    category: "preparedness",
    tags: ["hurricane", "education", "categories"],
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("reports")
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    location: "",
    type: "wildfire" as const,
    severity: "medium" as const,
  })
  const [newPost, setNewPost] = useState("")

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
    unverified: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    investigating: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    verified: "bg-primary/20 text-primary border-primary/30",
  }

  const roleColors = {
    community: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    responder: "bg-red-500/20 text-red-400 border-red-500/30",
    expert: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground text-glow-green mb-4">Community Hub</h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Connect with your community, report disasters, and share resources for collective safety
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Active Members", value: "12.5K", icon: Users },
              { label: "Reports Today", value: "47", icon: AlertTriangle },
              { label: "Verified Reports", value: "89%", icon: CheckCircle },
              { label: "Response Teams", value: "23", icon: Shield },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardContent className="p-4 text-center">
                    <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-border">
              <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Disaster Reports
              </TabsTrigger>
              <TabsTrigger
                value="forum"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Community Forum
              </TabsTrigger>
              <TabsTrigger
                value="submit"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Submit Report
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-6">
              {/* Search and Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports by location or description..."
                    className="pl-10 bg-background border-border"
                  />
                </div>
                <Button variant="outline" className="border-primary text-primary glow-green-hover bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Reports Grid */}
              <div className="space-y-6">
                {mockReports.map((report) => {
                  const Icon = disasterIcons[report.type]
                  return (
                    <Card key={report.id} className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={report.reporter.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{report.reporter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-foreground">{report.title}</h3>
                                {report.status === "verified" && (
                                  <CheckCircle className="w-5 h-5 text-primary glow-green" />
                                )}
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                                <span>{report.reporter.name}</span>
                                <span>•</span>
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-primary mr-1" />
                                  {report.reporter.reputation}
                                </div>
                                <span>•</span>
                                <Clock className="w-3 h-3" />
                                <span>{report.timestamp}</span>
                              </div>
                              <div className="flex items-center space-x-2 mb-3">
                                <div className="flex items-center space-x-1">
                                  <Icon className="w-4 h-4 text-primary" />
                                  <Badge className={severityColors[report.severity]}>{report.severity}</Badge>
                                </div>
                                <Badge className={statusColors[report.status]}>{report.status}</Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {report.location}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{report.description}</p>

                        {report.images && (
                          <div className="mb-4">
                            <img
                              src={report.images[0] || "/placeholder.svg"}
                              alt="Disaster report"
                              className="w-full h-48 object-cover rounded-lg border border-border"
                            />
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                          {report.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-primary/30 text-muted-foreground"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <Heart className="w-4 h-4 mr-1" />
                              {report.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {report.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                          </div>
                          {report.status === "unverified" && (
                            <Button size="sm" className="bg-primary hover:bg-primary/90 glow-green">
                              Verify Report
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="forum" className="space-y-6">
              {/* Forum Header */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Input placeholder="Search discussions..." className="w-64 bg-background border-border" />
                  <Button variant="outline" className="border-primary text-primary glow-green-hover bg-transparent">
                    <Filter className="w-4 h-4 mr-2" />
                    Categories
                  </Button>
                </div>
                <Button className="bg-primary hover:bg-primary/90 glow-green">
                  <Plus className="w-4 h-4 mr-2" />
                  New Discussion
                </Button>
              </div>

              {/* Forum Posts */}
              <div className="space-y-4">
                {mockForumPosts.map((post) => (
                  <Card
                    key={post.id}
                    className={`bg-card/50 backdrop-blur-sm border-border glow-green-hover ${
                      post.isSticky ? "border-primary/50" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {post.isSticky && (
                              <Badge className="bg-primary/20 text-primary border-primary/30">Pinned</Badge>
                            )}
                            <Badge className={roleColors[post.author.role]}>{post.author.role}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {post.author.name} • {post.timestamp}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                          <p className="text-muted-foreground mb-3">{post.content}</p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-primary/30 text-muted-foreground"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <Heart className="w-4 h-4 mr-1" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {post.replies} replies
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Reply */}
              <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="Share your thoughts with the community..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="bg-background border-border resize-none"
                        rows={3}
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <Camera className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 glow-green"
                          disabled={!newPost.trim()}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submit" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                    <span>Submit Disaster Report</span>
                  </CardTitle>
                  <CardDescription>Help your community by reporting disasters and emergency situations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Report Title</label>
                        <Input
                          placeholder="Brief description of the situation"
                          value={newReport.title}
                          onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                        <Input
                          placeholder="City, State or specific address"
                          value={newReport.location}
                          onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Disaster Type</label>
                          <select
                            value={newReport.type}
                            onChange={(e) => setNewReport({ ...newReport, type: e.target.value as any })}
                            className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
                          >
                            <option value="wildfire">Wildfire</option>
                            <option value="flood">Flood</option>
                            <option value="earthquake">Earthquake</option>
                            <option value="storm">Storm</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Severity</label>
                          <select
                            value={newReport.severity}
                            onChange={(e) => setNewReport({ ...newReport, severity: e.target.value as any })}
                            className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                        <Textarea
                          placeholder="Detailed description of what you're observing..."
                          value={newReport.description}
                          onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                          className="bg-background border-border resize-none"
                          rows={6}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Photos/Videos</label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Drag and drop files here or click to upload</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" className="border-primary text-primary glow-green-hover bg-transparent">
                      Save Draft
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 glow-green">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reporting Guidelines */}
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Reporting Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                        Do Include
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Specific location details</li>
                        <li>• Current conditions and changes</li>
                        <li>• Photos or videos if safe to take</li>
                        <li>• Time-sensitive information</li>
                        <li>• Evacuation routes if blocked</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-red-400" />
                        Safety First
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Don't put yourself in danger</li>
                        <li>• Call 911 for immediate emergencies</li>
                        <li>• Verify information before sharing</li>
                        <li>• Respect privacy and property</li>
                        <li>• Follow evacuation orders</li>
                      </ul>
                    </div>
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
