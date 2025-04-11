"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"

interface SkillAnalyzerProps {
  className?: string
}

export function SkillAnalyzer({ className }: SkillAnalyzerProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleCardClick = () => {
    if (!user) {
      setIsLoginModalOpen(true)
    } else {
      router.push("/skill-analyzer")
    }
  }

  return (
    <>
      <Card className={`${className} relative cursor-pointer transition-all hover:shadow-md`} onClick={handleCardClick}>
        {!user && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
            <Lock className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="text-lg font-medium">Unlock Your Career Potential</p>
            <p className="text-sm text-muted-foreground">Sign Up to Start!</p>
          </div>
        )}

        <CardHeader>
          <CardTitle>AI Skill Analyzer</CardTitle>
          <CardDescription>Assess your skills and get personalized learning recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] bg-muted rounded-md flex items-center justify-center">
            {/* This would be replaced with an actual chart or visualization */}
            <p className="text-muted-foreground">Skill visualization will appear here</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Analyze My Skills</Button>
        </CardFooter>
      </Card>

      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>You need to sign in to access the Skill Analyzer</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onSuccess={() => setIsLoginModalOpen(false)} />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm onSuccess={() => setIsLoginModalOpen(false)} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
