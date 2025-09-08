import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Globe, Heart, CheckCircle, Star } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground text-glow-green mb-4">About DisasterWatch</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Protecting communities through ethical technology and collaborative disaster management
            </p>
          </div>

          {/* Mission */}
          <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Heart className="w-6 h-6 text-primary" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                DisasterWatch is dedicated to creating a safer world through innovative disaster monitoring and response
                technology. We believe that by combining artificial intelligence, blockchain transparency, and community
                collaboration, we can build resilient communities that are better prepared for natural disasters and
                emergencies.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: Shield,
                title: "Ethical Technology",
                description:
                  "We prioritize privacy, transparency, and responsible AI development in all our disaster monitoring systems.",
              },
              {
                icon: Users,
                title: "Community First",
                description:
                  "Our platform empowers local communities with the tools and information they need to stay safe and prepared.",
              },
              {
                icon: Globe,
                title: "Global Impact",
                description:
                  "Working towards worldwide disaster resilience through collaborative international monitoring networks.",
              },
              {
                icon: CheckCircle,
                title: "Data Integrity",
                description:
                  "Blockchain-verified disaster data ensures accuracy and builds trust in our emergency response systems.",
              },
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Team */}
          <Card className="bg-card/50 backdrop-blur-sm border-border glow-green-hover">
            <CardHeader>
              <CardTitle className="text-foreground">Our Team</CardTitle>
              <CardDescription>Experts in disaster management, AI, and community safety</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Dr. Sarah Chen",
                    role: "Chief Technology Officer",
                    expertise: "AI & Machine Learning",
                    rating: 5,
                  },
                  {
                    name: "Mike Rodriguez",
                    role: "Community Outreach Director",
                    expertise: "Emergency Response",
                    rating: 5,
                  },
                  {
                    name: "Dr. Lisa Park",
                    role: "Lead Data Scientist",
                    expertise: "Predictive Analytics",
                    rating: 5,
                  },
                ].map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-primary">{member.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{member.role}</p>
                    <p className="text-xs text-muted-foreground mb-2">{member.expertise}</p>
                    <div className="flex justify-center">
                      {[...Array(member.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-primary fill-current" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
