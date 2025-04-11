import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Bell } from "lucide-react"

interface UserProfileProps {
  name: string
  role: string
  unreadMessages: number
  unreadNotifications: number
}

export function UserProfile({ name, role, unreadMessages, unreadNotifications }: UserProfileProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm text-muted-foreground">{role}</p>
            <div className="mt-2 flex gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {unreadMessages}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Bell className="h-3 w-3" />
                {unreadNotifications}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
