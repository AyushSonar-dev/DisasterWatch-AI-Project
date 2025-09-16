"use client";
import type { INewUser, IUser } from "@/types";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { create } from "domain";
import { createUser } from "@/lib/appwrite/api";

import { account, db } from "@/lib/appwrite/config";
import { ID, Query } from "appwrite";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const { login, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.role) newErrors.role = "Role selection is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const user: INewUser = {
      username: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      // Simulate account creation

      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.username
      );
      console.log(newAccount);

      // Auto-login after signup
      await db.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "database_id",
        process.env.NEXT_PUBLIC_APPWRITE_USER_ID || "user_collection_id",
        ID.unique(),
        {
          accountId: newAccount.$id, // <-- required field
          name: user.username,
          email: user.email,
          role: formData.role, // store user/admin role
        }
      );

      // Step 4: Fetch role back
      const roleDoc = await db.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "database_id",
        process.env.NEXT_PUBLIC_APPWRITE_USER_ID || "user_collection_id",
        [Query.equal("accountId", newAccount.$id)]
      );

      const role = roleDoc.documents[0]?.role || "user";

      // Step 5: Redirect based on backend role
      setSuccess(true);
      setTimeout(() => {
        if (role === "admin") {
          router.push("/dashboards/admin");
        } else {
          router.push("/dashboards/user");
        }
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrors({ general: "Account creation failed" });
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-primary mb-2">
              Account Created!
            </h2>
            <p className="text-gray-300 mb-4">
              Redirecting to your {formData.role} dashboard...
            </p>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full animate-pulse"
                style={{ width: "100%" }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-black border-2 border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary glow-text">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-300">
              Join the disaster monitoring network
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-gray-900 border-gray-700 text-white focus:border-primary focus:ring-primary focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-300"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="bg-gray-900 border-gray-700 text-white focus:border-primary focus:ring-primary focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-300 pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-200">
                  Role
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white focus:border-primary focus:ring-primary focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-300">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem
                      value="user"
                      className="text-white hover:bg-gray-800 focus:bg-gray-800"
                    >
                      User - Monitor & Report
                    </SelectItem>
                    <SelectItem
                      value="admin"
                      className="text-white hover:bg-gray-800 focus:bg-gray-800"
                    >
                      Admin - Manage System
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.role}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || authLoading}
                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-3 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300"
              >
                {isLoading || authLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/Auth/login"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
