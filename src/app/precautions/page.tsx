"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Brain,
  CheckCircle,
  Clock,
  Users,
  Phone,
  MapPin,
  Flame,
  CloudRain,
  Mountain,
  Zap,
  Heart,
  Home,
  Briefcase,
  Car,
  Smartphone,
  Radio,
} from "lucide-react"

interface SafetyGuide {
  id: string
  type: "earthquake" | "flood" | "wildfire" | "storm"
  title: string
  description: string
  priority: "high" | "medium" | "low"
  steps: string[]
  supplies: string[]
  timeframe: string
}

interface AISuggestion {
  id: string
  type: "prediction" | "preparation" | "response"
  title: string
  description: string
  confidence: number
  urgency: "immediate" | "soon" | "monitor"
  location?: string
}

const safetyGuides: SafetyGuide[] = [
  {
    id: "1",
    type: "earthquake",
    title: "Earthquake Preparedness",
    description: "Essential steps to protect yourself and your family during seismic events",
    priority: "high",
    timeframe: "Before, During & After",
    steps: [
      "Drop to hands and knees immediately",
      "Take cover under a sturdy desk or table",
      "Hold on to your shelter and protect your head",
      "Stay away from windows and heavy objects",
      "If outdoors, move away from buildings and power lines",
      "After shaking stops, evacuate if building is damaged",
    ],
    supplies: [
      "Emergency kit",
      "Water (1 gallon per person per day)",
      "Non-perishable food",
      "First aid kit",
      "Flashlight",
      "Battery radio",
    ],
  },
  {
    id: "2",
    type: "wildfire",
    title: "Wildfire Safety Protocol",
    description: "Critical actions for wildfire threats and evacuation procedures",
    priority: "high",
    timeframe: "Immediate Action Required",
    steps: [
      "Monitor local emergency broadcasts",
      "Prepare evacuation routes and meeting points",
      "Create defensible space around your home",
      "Close all windows and doors",
      "Turn on lights to increase visibility",
      "Evacuate immediately when ordered",
    ],
    supplies: [
      "Go-bag with essentials",
      "Important documents",
      "Medications",
      "Phone chargers",
      "Cash",
      "Pet supplies",
    ],
  },
  {
    id: "3",
    type: "flood",
    title: "Flood Response Guide",
    description: "Water safety measures and evacuation protocols for flooding events",
    priority: "medium",
    timeframe: "Seasonal Preparation",
    steps: [
      "Never walk through moving water",
      "Avoid driving through flooded roads",
      "Move to higher ground immediately",
      "Turn off utilities if instructed",
      "Stay informed via weather radio",
      "Signal for help if trapped",
    ],
    supplies: [
      "Waterproof containers",
      "Life jackets",
      "Emergency radio",
      "Water purification tablets",
      "Rope",
      "Whistle",
    ],
  },
  {
    id: "4",
    type: "storm",
    title: "Severe Storm Safety",
    description: "Hurricane and tornado preparedness and shelter procedures",
    priority: "medium",
    timeframe: "Seasonal Monitoring",
    steps: [
      "Secure outdoor furniture and objects",
      "Board up windows with plywood",
      "Stock up on emergency supplies",
      "Identify safe room in your home",
      "Stay indoors during the storm",
      "Avoid using electrical appliances",
    ],
    supplies: ["Plywood and nails", "Tarps", "Generator (if safe)", "Extra batteries", "Manual can opener", "Blankets"],
  },
]

const aiSuggestions: AISuggestion[] = [
  {
    id: "1",
    type: "prediction",
    title: "Increased Seismic Activity Detected",
    description: "AI models predict 73% chance of moderate earthquake in your region within 48 hours",
    confidence: 73,
    urgency: "soon",
    location: "San Francisco Bay Area",
  },
  {
    id: "2",
    type: "preparation",
    title: "Wildfire Season Preparation",
    description: "Weather patterns suggest early wildfire season. Recommend immediate defensible space creation",
    confidence: 89,
    urgency: "immediate",
    location: "Southern California",
  },
  {
    id: "3",
    type: "response",
    title: "Evacuation Route Optimization",
    description: "Current traffic patterns suggest alternate evacuation routes for faster emergency response",
    confidence: 95,
    urgency: "monitor",
  },
]

export default function PrecautionsPage() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("guides")

  const disasterIcons = {
    earthquake: Mountain,
    flood: CloudRain,
    wildfire: Flame,
    storm: Zap,
  }

  const priorityColors = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-green-500/20 text-green-400 border-green-500/30",
  }

  const urgencyColors = {
    immediate: "bg-red-500/20 text-red-400 border-red-500/30",
    soon: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    monitor: "bg-primary/20 text-primary border-primary/30",
  }

  const filteredGuides =
    selectedType === "all" ? safetyGuides : safetyGuides.filter((guide) => guide.type === selectedType)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground text-glow-green mb-4">Precaution & Response Hub</h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              AI-powered safety guidance and emergency response protocols to protect your community
            </p>
          </div>

          {/* AI Suggestions Banner */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 glow-green">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Brain className="w-6 h-6 text-primary" />
                  <span>AI-Powered Insights</span>
                  <Badge className="bg-primary/20 text-primary border-primary/30">Live</Badge>
                </CardTitle>
                <CardDescription>Real-time AI analysis and personalized safety recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {aiSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="p-4 bg-background/50 rounded-lg border border-border glow-green-hover"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={urgencyColors[suggestion.urgency]}>{suggestion.urgency}</Badge>
                        <span className="text-sm text-primary font-medium">{suggestion.confidence}% confidence</span>
                      </div>
                      <h3 className="font-medium text-foreground mb-1">{suggestion.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                      {suggestion.location && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          {suggestion.location}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-card/50 border border-border">
              <TabsTrigger
                value="guides"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Shield className="w-4 h-4 mr-2" />
                Safety Guides
              </TabsTrigger>
              <TabsTrigger
                value="emergency"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency
              </TabsTrigger>
              <TabsTrigger
                value="supplies"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Supplies
              </TabsTrigger>
              <TabsTrigger
                value="family"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="w-4 h-4 mr-2" />
                Family Plan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="space-y-6">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("all")}
                  className={
                    selectedType === "all"
                      ? "bg-primary glow-green"
                      : "border-primary text-primary glow-green-hover bg-transparent"
                  }
                >
                  All Disasters
                </Button>
                {Object.entries(disasterIcons).map(([type, Icon]) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className={
                      selectedType === type
                        ? "bg-primary glow-green"
                        : "border-primary text-primary glow-green-hover bg-transparent"
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>

              {/* Safety Guides Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredGuides.map((guide) => {
                  const Icon = disasterIcons[guide.type]
                  return (
                    <Card key={guide.id} className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-foreground">{guide.title}</CardTitle>
                              <CardDescription>{guide.description}</CardDescription>
                            </div>
                          </div>
                          <Badge className={priorityColors[guide.priority]}>{guide.priority}</Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{guide.timeframe}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                            Action Steps
                          </h4>
                          <ul className="space-y-1">
                            {guide.steps.map((step, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start">
                                <span className="text-primary mr-2 font-medium">{index + 1}.</span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2 flex items-center">
                            <Briefcase className="w-4 h-4 mr-2 text-primary" />
                            Essential Supplies
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {guide.supplies.map((supply, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-primary/30 text-muted-foreground"
                              >
                                {supply}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Phone className="w-5 h-5 text-primary" />
                      <span>Emergency Contacts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                      <div className="font-medium text-red-400">Emergency Services</div>
                      <div className="text-2xl font-bold text-red-400">911</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Poison Control</span>
                        <span className="text-foreground">1-800-222-1222</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Red Cross</span>
                        <span className="text-foreground">1-800-733-2767</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">FEMA</span>
                        <span className="text-foreground">1-800-621-3362</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Radio className="w-5 h-5 text-primary" />
                      <span>Emergency Alerts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                      <div className="font-medium text-primary">Weather Radio</div>
                      <div className="text-sm text-muted-foreground">NOAA Weather Radio frequencies</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Local Emergency</span>
                        <span className="text-foreground">162.550 MHz</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Backup Channel</span>
                        <span className="text-foreground">162.400 MHz</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <span>Mobile Alerts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                      <div className="font-medium text-primary">Emergency Apps</div>
                      <div className="text-sm text-muted-foreground">Download recommended apps</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="text-muted-foreground">• FEMA Mobile App</div>
                      <div className="text-muted-foreground">• Red Cross Emergency</div>
                      <div className="text-muted-foreground">• Weather Underground</div>
                      <div className="text-muted-foreground">• Zello Walkie Talkie</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="supplies" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Home className="w-5 h-5 text-primary" />
                      <span>Home Emergency Kit</span>
                    </CardTitle>
                    <CardDescription>Essential supplies for 72-hour home shelter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          category: "Water & Food",
                          items: [
                            "1 gallon water per person per day",
                            "3-day food supply",
                            "Manual can opener",
                            "Paper plates & utensils",
                          ],
                        },
                        {
                          category: "Safety & Tools",
                          items: ["First aid kit", "Flashlight", "Battery radio", "Multi-tool", "Duct tape"],
                        },
                        {
                          category: "Personal Items",
                          items: ["Medications", "Important documents", "Cash", "Phone chargers", "Blankets"],
                        },
                      ].map((section, index) => (
                        <div key={index}>
                          <h4 className="font-medium text-foreground mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                            {section.category}
                          </h4>
                          <ul className="space-y-1 ml-6">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-sm text-muted-foreground">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Car className="w-5 h-5 text-primary" />
                      <span>Vehicle Emergency Kit</span>
                    </CardTitle>
                    <CardDescription>Portable supplies for evacuation and travel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          category: "Vehicle Safety",
                          items: ["Jumper cables", "Tire repair kit", "Emergency flares", "Reflective triangles"],
                        },
                        {
                          category: "Survival Gear",
                          items: ["Emergency blankets", "Water bottles", "Energy bars", "First aid supplies"],
                        },
                        {
                          category: "Communication",
                          items: ["Car charger", "Emergency radio", "Whistle", "Emergency contact list"],
                        },
                      ].map((section, index) => (
                        <div key={index}>
                          <h4 className="font-medium text-foreground mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                            {section.category}
                          </h4>
                          <ul className="space-y-1 ml-6">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-sm text-muted-foreground">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="family" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      <span>Communication Plan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                      <div className="font-medium text-primary mb-2">Family Meeting Points</div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <div className="text-foreground">Primary: Home Address</div>
                          <div className="text-muted-foreground">If safe to return home</div>
                        </div>
                        <div>
                          <div className="text-foreground">Secondary: Local School</div>
                          <div className="text-muted-foreground">Neighborhood evacuation</div>
                        </div>
                        <div>
                          <div className="text-foreground">Regional: City Center</div>
                          <div className="text-muted-foreground">Area-wide emergency</div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 glow-green">
                      <Users className="w-4 h-4 mr-2" />
                      Create Family Plan
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Heart className="w-5 h-5 text-primary" />
                      <span>Special Needs</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-foreground mb-1">Medical Considerations</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Prescription medications (7-day supply)</li>
                          <li>• Medical equipment & batteries</li>
                          <li>• Medical alert bracelets</li>
                          <li>• Emergency medical information</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium text-foreground mb-1">Pet Preparedness</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Pet carriers & leashes</li>
                          <li>• Food & water (3-day supply)</li>
                          <li>• Vaccination records</li>
                          <li>• Pet-friendly shelter locations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Practice & Review</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                        <div className="font-medium text-yellow-400 mb-1">Monthly Drills</div>
                        <div className="text-sm text-muted-foreground">
                          Practice evacuation routes and meeting points
                        </div>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                        <div className="font-medium text-primary mb-1">Supply Check</div>
                        <div className="text-sm text-muted-foreground">Review and rotate emergency supplies</div>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                        <div className="font-medium text-blue-400 mb-1">Plan Updates</div>
                        <div className="text-sm text-muted-foreground">Update contact information and routes</div>
                      </div>
                    </div>
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
