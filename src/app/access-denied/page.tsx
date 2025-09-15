"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, AlertTriangle } from "lucide-react"

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-black border-2 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all duration-300">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-red-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-400 glow-text">Access Denied</CardTitle>
            <CardDescription className="text-gray-300">Admins Only - Insufficient Permissions</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-gray-300 text-sm">
                You don't have the required administrator privileges to access this area. Contact your system
                administrator if you believe this is an error.
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/user-dashboard">
                <Button className="w-full bg-primary hover:bg-primary/90 text-black font-semibold shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300">
                  Go to User Dashboard
                </Button>
              </Link>

              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-black glow-green-hover bg-transparent flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500">
                Need admin access? Contact your system administrator or
                <Link href="/community" className="text-primary hover:text-primary/80 ml-1">
                  report an issue
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
