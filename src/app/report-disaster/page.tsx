"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MapPin, Upload, AlertTriangle, CheckCircle } from "lucide-react"

function ReportDisasterPage() {
  const [formData, setFormData] = useState({
    disasterType: "",
    location: "",
    dateTime: "",
    description: "",
    severity: "",
    evidence: null as File | null,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.disasterType) newErrors.disasterType = "Please select a disaster type"
    if (!formData.location) newErrors.location = "Location is required"
    if (!formData.dateTime) newErrors.dateTime = "Date and time are required"
    if (!formData.description) newErrors.description = "Please provide a description"
    if (!formData.severity) newErrors.severity = "Please select severity level"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, evidence: file }))
    }
  }

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setFormData((prev) => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }))
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background pt-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 glow-green">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4 glow-green" />
              <h2 className="text-2xl font-bold text-glow-green mb-2">Report Submitted Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                ✅ Your disaster report has been submitted and will be reviewed shortly.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({
                      disasterType: "",
                      location: "",
                      dateTime: "",
                      description: "",
                      severity: "",
                      evidence: null,
                    })
                  }}
                  className="bg-primary hover:bg-primary/90 glow-green"
                >
                  Submit Another Report
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-green-hover bg-transparent ml-4"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-glow-green mb-4">Report a Disaster</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help authorities and communities respond faster by reporting incidents in real time.
          </p>
        </div>

        {/* Report Form */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 glow-green">
          <CardHeader>
            <CardTitle className="text-2xl text-glow-green flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Incident Report Form
            </CardTitle>
            <CardDescription>
              Please provide accurate information to help emergency responders assess the situation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Disaster Type */}
              <div className="space-y-2">
                <Label htmlFor="disaster-type" className="text-foreground font-medium">
                  Disaster Type *
                </Label>
                <Select
                  value={formData.disasterType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, disasterType: value }))}
                >
                  <SelectTrigger
                    className={`bg-background/50 border-border hover:border-primary/50 transition-colors ${errors.disasterType ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select disaster type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="flood">Flood</SelectItem>
                    <SelectItem value="earthquake">Earthquake</SelectItem>
                    <SelectItem value="fire">Fire</SelectItem>
                    <SelectItem value="cyclone">Cyclone</SelectItem>
                    <SelectItem value="landslide">Landslide</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.disasterType && <p className="text-red-500 text-sm">{errors.disasterType}</p>}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-foreground font-medium">
                  Location *
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter location or coordinates"
                    className={`bg-background/50 border-border hover:border-primary/50 focus:border-primary transition-colors flex-1 ${errors.location ? "border-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={useCurrentLocation}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-green-hover bg-transparent"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Use My Location
                  </Button>
                </div>
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
              </div>

              {/* Date & Time */}
              <div className="space-y-2">
                <Label htmlFor="datetime" className="text-foreground font-medium">
                  Date & Time *
                </Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dateTime: e.target.value }))}
                  className={`bg-background/50 border-border hover:border-primary/50 focus:border-primary transition-colors ${errors.dateTime ? "border-red-500" : ""}`}
                />
                {errors.dateTime && <p className="text-red-500 text-sm">{errors.dateTime}</p>}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what happened, current conditions, and any immediate dangers..."
                  rows={4}
                  className={`bg-background/50 border-border hover:border-primary/50 focus:border-primary transition-colors resize-none ${errors.description ? "border-red-500" : ""}`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>

              {/* Upload Evidence */}
              <div className="space-y-2">
                <Label htmlFor="evidence" className="text-foreground font-medium">
                  Upload Evidence (Optional)
                </Label>
                <div className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-lg p-6 text-center">
                  <input
                    id="evidence"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="evidence" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      {formData.evidence ? formData.evidence.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Images and videos up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Severity Level */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Severity Level *</Label>
                <RadioGroup
                  value={formData.severity}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, severity: value }))}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {[
                    { value: "low", label: "Low", color: "text-green-400" },
                    { value: "medium", label: "Medium", color: "text-yellow-400" },
                    { value: "high", label: "High", color: "text-orange-400" },
                    { value: "critical", label: "Critical", color: "text-red-400" },
                  ].map((severity) => (
                    <div key={severity.value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={severity.value}
                        id={severity.value}
                        className="border-border data-[state=checked]:border-primary data-[state=checked]:text-primary"
                      />
                      <Label htmlFor={severity.value} className={`cursor-pointer ${severity.color}`}>
                        {severity.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.severity && <p className="text-red-500 text-sm">{errors.severity}</p>}
              </div>

              {/* Submit Section */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 glow-green flex-1 sm:flex-none"
                >
                  {isLoading ? "Submitting..." : "Submit Report"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-green-hover bg-transparent flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ReportDisasterPage;
