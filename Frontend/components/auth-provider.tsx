"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

type UserRole = "learner" | "mentor" | null

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  skills?: string[]
  hourlyRate?: number
  currency?: string
  verified?: boolean
  profileCompletion?: number
  introVideoUrl?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in from cookies
    const storedUser = Cookies.get("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing user cookie:", error)
        Cookies.remove("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // Mock API call - in a real app, this would be a fetch to your auth endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data based on email and selected role
      const mockUser: User = {
        id: "user123",
        name: email.split("@")[0],
        email,
        role: role || (email.includes("mentor") ? "mentor" : "learner"),
        avatar: `/placeholder.svg?height=40&width=40&text=${email[0].toUpperCase()}`,
        skills: role === "mentor" ? ["JavaScript", "React", "Node.js"] : undefined,
        hourlyRate: role === "mentor" ? 1200 : undefined,
        currency: role === "mentor" ? "₹" : undefined,
        verified: role === "mentor" ? false : undefined,
        profileCompletion: role === "mentor" ? 35 : 70,
        introVideoUrl: role === "mentor" ? "https://example.com/intro-video.mp4" : undefined,
      }

      setUser(mockUser)

      // Store in both localStorage and cookies for redundancy
      localStorage.setItem("user", JSON.stringify(mockUser))
      Cookies.set("user", JSON.stringify(mockUser), { expires: 7 }) // Expires in 7 days
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    Cookies.remove("user")
    router.push("/")
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // Mock API call - in a real app, this would be a fetch to your registration endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "user" + Math.floor(Math.random() * 1000),
        name,
        email,
        role,
        avatar: `/placeholder.svg?height=40&width=40&text=${name[0].toUpperCase()}`,
        skills: role === "mentor" ? [] : undefined,
        hourlyRate: role === "mentor" ? 0 : undefined,
        currency: role === "mentor" ? "₹" : undefined,
        verified: role === "mentor" ? false : undefined,
        profileCompletion: role === "mentor" ? 15 : 40,
        introVideoUrl: undefined,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      Cookies.set("user", JSON.stringify(mockUser), { expires: 7 }) // Expires in 7 days
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      Cookies.set("user", JSON.stringify(updatedUser), { expires: 7 })
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
