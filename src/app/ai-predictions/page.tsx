"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Brain, AlertTriangle, Activity, Zap, Eye, Target, BarChart3, LineChart, MapPin, Clock } from "lucide-react"

interface AIPrediction {
  id: string
  type: "earthquake" | "flood" | "wildfire" | "storm"
  location: string
  probability: number
  timeframe: string
  severity: "low" | "medium" | "high" | "critical"
  confidence: number
  factors: string[]
  lastUpdated: string
}

interface PredictionChart {
  id: string
  title: string
  type: "line" | "bar" | "area"
  data: { time: string; value: number; prediction?: number }[]
  color: string
}

const mockPredictions: AIPrediction[] = [
  {
    id: "1",
    type: "earthquake",
    location: "San Francisco Bay Area",
    probability: 73,
    timeframe: "Next 48 hours",
    severity: "medium",
    confidence: 89,
    factors: ["Increased seismic activity", "Historical patterns", "Tectonic stress buildup"],
    lastUpdated: "5 minutes ago",
  },
  {
    id: "2",
    type: "wildfire",
    location: "Southern California",
    probability: 91,
    timeframe: "Next 7 days",
    severity: "high",
    confidence: 95,
    factors: ["Extreme drought conditions", "High wind speeds", "Low humidity", "Temperature anomalies"],
    lastUpdated: "2 minutes ago",
  },
  {
    id: "3",
    type: "flood",
    location: "Houston, TX",
    probability: 45,
    timeframe: "Next 24 hours",
    severity: "medium",
    confidence: 78,
    factors: ["Heavy rainfall forecast", "Saturated soil conditions", "River levels rising"],
    lastUpdated: "8 minutes ago",
  },
]

const mockChartData: PredictionChart[] = [
  {
    id: "1",
    title: "Earthquake Risk Trend",
    type: "line",
    color: "#22c55e",
    data: [
      { time: "00:00", value: 45, prediction: 48 },
      { time: "04:00", value: 52, prediction: 55 },
      { time: "08:00", value: 61, prediction: 64 },
      { time: "12:00", value: 68, prediction: 71 },
      { time: "16:00", value: 73, prediction: 76 },
      { time: "20:00", value: 71, prediction: 74 },
      { time: "24:00", value: 69, prediction: 72 },
    ],
  },
  {
    id: "2",
    title: "Wildfire Probability",
    type: "area",
    color: "#22c55e",
    data: [
      { time: "Mon", value: 78 },
      { time: "Tue", value: 82 },
      { time: "Wed", value: 87 },
      { time: "Thu", value: 91 },
      { time: "Fri", value: 89 },
      { time: "Sat", value: 85 },
      { time: "Sun", value: 83 },
    ],
  },
]

export default function AIPredictionsPage() {
  const [activeTab, setActiveTab] = useState("predictions")
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null)

  const severityColors = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  const typeIcons = {
    earthquake: Activity,
    flood: Activity,
    wildfire: Zap,
    storm: Activity,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground text-glow-green mb-4">AI Prediction Engine</h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Advanced machine learning algorithms analyzing patterns to predict and prevent disasters
            </p>
          </div>

          {/* AI Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Prediction Accuracy", value: "94.7%", icon: Target },
              { label: "Models Running", value: "12", icon: Brain },
              { label: "Data Points", value: "2.8M", icon: BarChart3 },
              { label: "Early Warnings", value: "156", icon: AlertTriangle },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
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
                value="predictions"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Brain className="w-4 h-4 mr-2" />
                Live Predictions
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <LineChart className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="models"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Target className="w-4 h-4 mr-2" />
                AI Models
              </TabsTrigger>
            </TabsList>

            <TabsContent value="predictions" className="space-y-6">
              {/* Live Predictions */}
              <div className="space-y-4">
                {mockPredictions.map((prediction) => {
                  const Icon = typeIcons[prediction.type]
                  return (
                    <Card
                      key={prediction.id}
                      className="bg-card/50 backdrop-blur-sm border-border glow-green-hover cursor-pointer"
                      onClick={() => setSelectedPrediction(selectedPrediction === prediction.id ? null : prediction.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground mb-1">
                                {prediction.type.charAt(0).toUpperCase() + prediction.type.slice(1)} Prediction
                              </h3>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                                <MapPin className="w-4 h-4" />
                                <span>{prediction.location}</span>
                                <span>•</span>
                                <Clock className="w-4 h-4" />
                                <span>{prediction.timeframe}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={severityColors[prediction.severity]}>{prediction.severity}</Badge>
                                <Badge className="bg-primary/20 text-primary border-primary/30">
                                  {prediction.confidence}% confidence
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-primary mb-1">{prediction.probability}%</div>
                            <div className="text-sm text-muted-foreground">Probability</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Risk Level</span>
                            <span className="text-primary">{prediction.probability}%</span>
                          </div>
                          <Progress value={prediction.probability} className="h-3" />
                        </div>

                        {selectedPrediction === prediction.id && (
                          <div className="mt-4 pt-4 border-t border-border space-y-3">
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Contributing Factors</h4>
                              <div className="space-y-1">
                                {prediction.factors.map((factor, index) => (
                                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                    {factor}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Last updated: {prediction.lastUpdated}
                              </span>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-primary text-primary glow-green-hover bg-transparent"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  Details
                                </Button>
                                <Button size="sm" className="bg-primary hover:bg-primary/90 glow-green">
                                  <AlertTriangle className="w-4 h-4 mr-1" />
                                  Alert Authorities
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Prediction Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                {mockChartData.map((chart) => (
                  <Card key={chart.id} className="bg-black/90 backdrop-blur-sm border-primary/30 glow-green">
                    <CardHeader>
                      <CardTitle className="text-primary font-mono">{chart.title}</CardTitle>
                      <CardDescription className="text-primary/70">AI-generated prediction analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 relative">
                        {/* Simulated Chart Background */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded"></div>

                        {/* Chart Grid Lines */}
                        <svg className="absolute inset-0 w-full h-full">
                          {/* Horizontal grid lines */}
                          {[0, 25, 50, 75, 100].map((y) => (
                            <line
                              key={y}
                              x1="0"
                              y1={`${100 - y}%`}
                              x2="100%"
                              y2={`${100 - y}%`}
                              stroke="oklch(0.7 0.3 130 / 0.2)"
                              strokeWidth="1"
                            />
                          ))}
                          {/* Vertical grid lines */}
                          {chart.data.map((_, index) => (
                            <line
                              key={index}
                              x1={`${(index / (chart.data.length - 1)) * 100}%`}
                              y1="0"
                              x2={`${(index / (chart.data.length - 1)) * 100}%`}
                              y2="100%"
                              stroke="oklch(0.7 0.3 130 / 0.2)"
                              strokeWidth="1"
                            />
                          ))}

                          {/* Chart Line */}
                          <polyline
                            fill="none"
                            stroke="oklch(0.7 0.3 130)"
                            strokeWidth="3"
                            points={chart.data
                              .map((point, index) => `${(index / (chart.data.length - 1)) * 100},${100 - point.value}`)
                              .join(" ")}
                            className="glow-green"
                          />

                          {/* Prediction Line (if available) */}
                          {chart.data.some((d) => d.prediction) && (
                            <polyline
                              fill="none"
                              stroke="oklch(0.7 0.3 130 / 0.6)"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                              points={chart.data
                                .map(
                                  (point, index) =>
                                    `${(index / (chart.data.length - 1)) * 100},${100 - (point.prediction || point.value)}`,
                                )
                                .join(" ")}
                            />
                          )}

                          {/* Data Points */}
                          {chart.data.map((point, index) => (
                            <circle
                              key={index}
                              cx={`${(index / (chart.data.length - 1)) * 100}%`}
                              cy={`${100 - point.value}%`}
                              r="4"
                              fill="oklch(0.7 0.3 130)"
                              className="glow-green"
                            />
                          ))}
                        </svg>

                        {/* Chart Labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-primary/70 font-mono">
                          {chart.data.map((point, index) => (
                            <span key={index}>{point.time}</span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="models" className="space-y-6">
              {/* AI Models Status */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Seismic Pattern Analyzer",
                    type: "Deep Neural Network",
                    accuracy: 94.7,
                    status: "active",
                    lastTrained: "2 hours ago",
                  },
                  {
                    name: "Weather Correlation Engine",
                    type: "Random Forest",
                    accuracy: 91.2,
                    status: "active",
                    lastTrained: "6 hours ago",
                  },
                  {
                    name: "Fire Risk Predictor",
                    type: "Gradient Boosting",
                    accuracy: 96.8,
                    status: "training",
                    lastTrained: "1 day ago",
                  },
                  {
                    name: "Flood Probability Model",
                    type: "LSTM Network",
                    accuracy: 89.4,
                    status: "active",
                    lastTrained: "4 hours ago",
                  },
                  {
                    name: "Multi-Hazard Ensemble",
                    type: "Ensemble Method",
                    accuracy: 97.1,
                    status: "active",
                    lastTrained: "30 minutes ago",
                  },
                  {
                    name: "Social Media Analyzer",
                    type: "NLP Transformer",
                    accuracy: 87.6,
                    status: "maintenance",
                    lastTrained: "12 hours ago",
                  },
                ].map((model, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          className={
                            model.status === "active"
                              ? "bg-primary/20 text-primary border-primary/30"
                              : model.status === "training"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                          }
                        >
                          {model.status.toUpperCase()}
                        </Badge>
                        <div className="text-2xl font-bold text-primary">{model.accuracy}%</div>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{model.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{model.type}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Accuracy</span>
                          <span className="text-primary">{model.accuracy}%</span>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                        <div className="text-xs text-muted-foreground">Last trained: {model.lastTrained}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
