import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Activity,
  Users,
  Brain,
  Globe,
  AlertTriangle,
  TrendingUp,
  Lock,
  ArrowRight,
  Zap,
  Eye,
  MessageSquare,
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description:
        "Track disasters globally with live data feeds and interactive maps showing current threats and affected areas.",
      gradient: "from-emerald-500 to-green-400",
    },
    {
      icon: Brain,
      title: "AI Predictions",
      description:
        "Advanced machine learning algorithms predict disaster patterns and provide early warning systems for communities.",
      gradient: "from-green-500 to-lime-400",
    },
    {
      icon: Lock,
      title: "Blockchain Integrity",
      description:
        "Immutable data records ensure transparency and trust in disaster reporting through decentralized verification.",
      gradient: "from-lime-500 to-emerald-400",
    },
    {
      icon: Users,
      title: "Community Network",
      description:
        "Connect with local communities, share resources, and coordinate response efforts during emergency situations.",
      gradient: "from-green-400 to-emerald-500",
    },
  ]

  const stats = [
    { label: "Active Monitors", value: "24/7", icon: Eye },
    { label: "Communities Protected", value: "500K+", icon: Shield },
    { label: "Predictions Made", value: "1.2M", icon: TrendingUp },
    { label: "Lives Saved", value: "50K+", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance mb-6">
              <span className="text-foreground">Ethical</span>{" "}
              <span className="text-glow-green bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Disaster Monitoring
              </span>{" "}
              <span className="text-foreground">for All</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto leading-relaxed">
              Harness the power of AI, blockchain, and community collaboration to predict, monitor, and respond to
              natural disasters with unprecedented accuracy and transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 glow-green text-lg px-8 py-6">
                <Globe className="w-5 h-5 mr-2" />
                Explore Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-green-hover text-lg px-8 py-6 bg-transparent"
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Report Disaster
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary rounded-full animate-pulse glow-green"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-primary rounded-full animate-pulse glow-green"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-pulse glow-green"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors glow-green-hover">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary text-glow-green">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Advanced Disaster Intelligence</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Cutting-edge technology meets humanitarian purpose in our comprehensive disaster management ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 glow-green-hover group"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.gradient} glow-green`}>
                        <Icon className="w-6 h-6 text-background" />
                      </div>
                      <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-primary/10 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Join the Global Safety Network</h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Be part of a worldwide community dedicated to disaster preparedness and response. Together, we can save
            lives and protect communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 glow-green">
              <Zap className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-green-hover bg-transparent"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-cyber rounded-lg flex items-center justify-center glow-green">
              <Shield className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-bold text-glow-green">DisasterWatch</span>
          </div>
          <p className="text-muted-foreground">Protecting communities through technology and collaboration.</p>
        </div>
      </footer>
    </div>
  )
}
