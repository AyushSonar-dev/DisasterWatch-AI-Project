"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { account } from "@/lib/appwrite/config"; // <-- import Appwrite client

interface User {
  $id: string;
  name: string;
  email: string;
  role?: "user" | "admin"; // optional, can store in Appwrite attributes
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser as User);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  // 🔹 Login (Appwrite Email Session)
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await account.createEmailSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser as User);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
      return false;
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// 🔹 Route protection
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: "admin"
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-primary">Loading...</div>
        </div>
      );
    }

    if (!user) {
      if (typeof window !== "undefined") window.location.href = "/login";
      return null;
    }

    if (requiredRole && user.role !== requiredRole) {
      if (typeof window !== "undefined") window.location.href = "/access-denied";
      return null;
    }

    return <Component {...props} />;
  };
}
