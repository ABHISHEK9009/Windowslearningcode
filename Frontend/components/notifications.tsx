import { Bell } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NotificationsProps {
  count?: number
}

// Mock data
const notifications = [
  {
    id: 1,
    title: "Session Reminder",
    message: "Your session with Dr. Sarah Chen starts in 1 hour.",
    time: "45 minutes ago",
  },
  {
    id: 2,
    title: "New Message",
    message: "Raj Patel sent you a message about your upcoming session.",
    time: "2 hours ago",
  },
  {
    id: 3,
    title: "Progress Update",
    message: "You've completed 65% of your Web Development track!",
    time: "1 day ago",
  },
]

export function Notifications({ count = 0 }: NotificationsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {count > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
            >
              {count}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 border-b last:border-0 hover:bg-muted/50 cursor-pointer">
              <h4 className="text-sm font-medium">{notification.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
            </div>
          ))}
        </div>
        <div className="p-2 border-t">
          <Button variant="ghost" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
