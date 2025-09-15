"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: "user" | "admin") => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("user-session")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        // Also set cookie for middleware
        document.cookie = `user-session=${savedUser}; path=/; max-age=86400`
      } catch (error) {
        localStorage.removeItem("user-session")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "user" | "admin"): Promise<boolean> => {
    setIsLoading(true)

    // Mock authentication - in real app, this would call your API
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        role,
      }

      // Save to localStorage and cookie
      const userSession = JSON.stringify(userData)
      localStorage.setItem("user-session", userSession)
      document.cookie = `user-session=${userSession}; path=/; max-age=86400`

      setUser(userData)
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("user-session")
    document.cookie = "user-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Higher-order component for route protection
export function withAuth<P extends object>(Component: React.ComponentType<P>, requiredRole?: "admin") {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth()

    if (isLoading) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-primary">Loading...</div>
        </div>
      )
    }

    if (!user) {
      window.location.href = "/login"
      return null
    }

    if (requiredRole && user.role !== requiredRole) {
      window.location.href = "/access-denied"
      return null
    }

    return <Component {...props} />
  }
}
