"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Activity,
  Users,
  Database,
  Brain,
  Globe,
  Zap,
  CheckCircle,
  AlertTriangle,
  Eye,
  ArrowRight,
  Sparkles,
  Heart,
} from "lucide-react"

export default function ExplorePage() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  const features = [
    {
      id: "monitoring",
      title: "Real-Time Monitoring",
      description: "Track disasters globally in real time with interactive maps and live sensor data.",
      icon: Activity,
      color: "text-primary",
      details:
        "Advanced satellite feeds, IoT sensors, and AI-powered detection systems provide 24/7 monitoring coverage.",
    },
    {
      id: "predictions",
      title: "AI Predictions",
      description: "Forecast probability & severity using advanced machine learning algorithms.",
      icon: Brain,
      color: "text-blue-400",
      details:
        "Our AI analyzes weather patterns, geological data, and historical trends to predict disasters before they happen.",
    },

    {
      id: "community",
      title: "Community Reports",
      description: "Citizens contribute to real-time updates and ground-truth verification.",
      icon: Users,
      color: "text-orange-400",
      details:
        "Crowdsourced reporting with verification systems creates the most comprehensive disaster intelligence network.",
    },
  ]

  const benefits = [
    {
      title: "Faster Alerts",
      description: "Get notified within seconds of disaster detection",
      icon: Zap,
      stat: "1.2s avg response time",
    },
    {
      title: "Verified Reports",
      description: "AI and community verification ensure accuracy",
      icon: CheckCircle,
      stat: "99.7% accuracy rate",
    },
    {
      title: "Community Engagement",
      description: "Join thousands of active disaster monitors",
      icon: Heart,
      stat: "50K+ active users",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-primary/20 text-primary border-primary/30 glow-green mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                Next-Generation Disaster Monitoring
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary glow-text mb-6 leading-tight">
                Empowering Communities with{" "}
                <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                  Smarter Disaster Monitoring
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Real-time insights, AI predictions, and blockchain transparency for safer futures. Join the revolution
                in disaster preparedness and response.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/dashboard">
                <Button className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-4 text-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300">
                  <Globe className="w-5 h-5 mr-2" />
                  View Dashboard
                </Button>
              </Link>
              <Link href="/report-disaster">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-black glow-green-hover bg-transparent px-8 py-4 text-lg"
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Report Disaster
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: "Active Sensors", value: "2,847" },
                { label: "Countries Covered", value: "195" },
                { label: "Lives Protected", value: "2.4M+" },
                { label: "Response Time", value: "1.2s" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary glow-text">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-primary glow-text mb-4">Revolutionary Features</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Cutting-edge technology meets humanitarian mission to create the world's most advanced disaster
                monitoring platform
              </p>
            </div>

            <div className="grid   md:grid-cols-3 gap-12">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={feature.id}
                    className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredFeature(feature.id)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className={`w-8 h-8 ${feature.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-primary glow-text">{feature.title}</CardTitle>
                          <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {hoveredFeature === feature.id ? feature.details : feature.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary text-sm font-medium">
                        Learn more <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Interactive Preview */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary glow-text mb-6">
                  Interactive Dashboard Preview
                </h3>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Experience real-time disaster monitoring with our intuitive dashboard. Track disasters globally, view
                  AI predictions, and coordinate response efforts all from one powerful interface.
                </p>
                <div className="space-y-4">
                  {[
                    "Live satellite feeds and sensor data",
                    "AI-powered risk assessment and predictions",
                    "Interactive global disaster map",
                    "Real-time community reports and verification",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard">
                  <Button className="mt-8 bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-3 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300">
                    Try Dashboard Now
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <div className="bg-black border-2 border-primary/20 rounded-lg p-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-primary font-semibold">Global Disaster Map</h4>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      <Activity className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                  <div className="relative h-64 bg-gradient-to-br from-gray-900 to-black rounded border border-primary/10 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/dark-world-map.png')] bg-cover bg-center opacity-20"></div>
                    {/* Simulated disaster markers */}
                    <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]"></div>
                    <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                  </div>
                  <div className="mt-4 text-xs text-gray-400">
                    Real-time monitoring of 12 active disasters across 8 countries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Platform */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-primary glow-text mb-4">Why Choose Our Platform?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Built by experts, trusted by communities, and powered by cutting-edge technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card
                    key={index}
                    className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 text-center"
                  >
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-primary glow-text mb-2">{benefit.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                      <div className="text-2xl font-bold text-primary">{benefit.stat}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Get Started CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 to-black border-2 border-primary/30 shadow-[0_0_40px_rgba(34,197,94,0.4)] overflow-hidden">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-5xl font-bold text-primary glow-text mb-4">
                    Stay Informed. Stay Safe. Join the Movement.
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Be part of the global community working together to make the world safer. Start monitoring,
                    reporting, and responding to disasters today.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/Auth/signup">
                    <Button className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-4 text-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300">
                      <Users className="w-5 h-5 mr-2" />
                      Sign Up Free
                    </Button>
                  </Link>
                  <Link href="/Auth/login">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-black glow-green-hover bg-transparent px-8 py-4 text-lg"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Login
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 text-sm text-gray-400">
                  Join 50,000+ users already protecting their communities
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold text-primary">DisasterWatch</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Empowering communities with next-generation disaster monitoring and response technology.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Platform</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/dashboard" className="block text-gray-400 hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/precautions" className="block text-gray-400 hover:text-primary transition-colors">
                    Precautions
                  </Link>
                  <Link href="/community" className="block text-gray-400 hover:text-primary transition-colors">
                    Community
                  </Link>
                  <Link href="/ai-predictions" className="block text-gray-400 hover:text-primary transition-colors">
                    AI Predictions
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Resources</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/about" className="block text-gray-400 hover:text-primary transition-colors">
                    About
                  </Link>
                  <Link href="/blockchain" className="block text-gray-400 hover:text-primary transition-colors">
                    Blockchain
                  </Link>
                  <Link href="/report-disaster" className="block text-gray-400 hover:text-primary transition-colors">
                    Report Disaster
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-gray-400 hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-primary transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
              © 2024 DisasterWatch. All rights reserved. Built with ❤️ for global safety.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
