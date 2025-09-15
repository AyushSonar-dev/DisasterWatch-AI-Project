"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const role = formData.email.includes("admin") ? "admin" : "user"
    const success = await login(formData.email, formData.password, role)

    if (success) {
      // Redirect based on role
      if (role === "admin") {
        router.push("/admin-dashboard")
      } else {
        router.push("/user-dashboard")
      }
    } else {
      setErrors({ general: "Invalid credentials" })
    }
  }

  if (errors.general) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
            <p className="text-gray-300 mb-4">{errors.general}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary glow-text">Welcome Back</CardTitle>
            <CardDescription className="text-gray-300">Sign in to your disaster monitoring account</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white focus:border-primary focus:ring-primary focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-300"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white focus:border-primary focus:ring-primary focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-300 pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-3 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link href="/Auth/signup" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Create Account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
