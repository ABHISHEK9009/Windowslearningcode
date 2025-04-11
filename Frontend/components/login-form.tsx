"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"learner" | "mentor">("learner")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await login(email, password, role)
      toast({
        title: "Login successful",
        description: "Welcome back to Windows Learning!",
      })

      // Redirect based on role
      router.push(`/${role}/dashboard`)
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Login as</Label>
        <RadioGroup
          value={role}
          onValueChange={(value) => setRole(value as "learner" | "mentor")}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="learner" id="login-learner" />
            <Label htmlFor="login-learner">Learner</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mentor" id="login-mentor" />
            <Label htmlFor="login-mentor">Mentor</Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
            Logging in...
          </span>
        ) : (
          "Login"
        )}
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        <p>Demo accounts:</p>
        <p>learner@example.com / mentor@example.com</p>
        <p>Password: password</p>
      </div>
    </form>
  )
}
