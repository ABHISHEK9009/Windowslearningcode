"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import { Paperclip, Send, Phone, Video, MoreVertical, Search } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    user: {
      id: "user1",
      name: "Dr. Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      online: true,
      lastSeen: new Date(),
    },
    lastMessage: {
      text: "I've shared some resources for our next session.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
    unread: 2,
  },
  {
    id: 2,
    user: {
      id: "user2",
      name: "Raj Patel",
      avatar: "/placeholder.svg?height=40&width=40&text=RP",
      online: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    lastMessage: {
      text: "Let me know if you have any questions about the assignment.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: true,
    },
    unread: 0,
  },
  {
    id: 3,
    user: {
      id: "user3",
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      online: true,
      lastSeen: new Date(),
    },
    lastMessage: {
      text: "Looking forward to our session tomorrow!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: true,
    },
    unread: 0,
  },
  {
    id: 4,
    user: {
      id: "user4",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
      online: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    },
    lastMessage: {
      text: "Thanks for the session today. I learned a lot!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
    unread: 0,
  },
]

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: 1,
    sender: "user1",
    text: "Hi there! I'm looking forward to our session tomorrow.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 30), // 1 day and 30 minutes ago
    read: true,
  },
  {
    id: 2,
    sender: "currentUser",
    text: "Hello! Yes, I'm excited too. I've been preparing some questions.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 25), // 1 day and 25 minutes ago
    read: true,
  },
  {
    id: 3,
    sender: "user1",
    text: "Great! Feel free to share them with me before the session if you'd like.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 20), // 1 day and 20 minutes ago
    read: true,
  },
  {
    id: 4,
    sender: "currentUser",
    text: "Sure, I'll send them over. My main focus is on advanced React patterns and state management.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 15), // 1 day and 15 minutes ago
    read: true,
  },
  {
    id: 5,
    sender: "user1",
    text: "Perfect! Those are great topics. I've been working with some advanced patterns recently that I think will be helpful for you.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 10), // 1 day and 10 minutes ago
    read: true,
  },
  {
    id: 6,
    sender: "user1",
    text: "I've shared some resources for our next session.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
  },
  {
    id: 7,
    sender: "user1",
    text: "Check out this article on React performance optimization: https://example.com/react-performance",
    timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    read: false,
  },
]

export default function MessagesPage() {
  const { user } = useAuth()
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conversation) =>
    conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: messages.length + 1,
      sender: "currentUser",
      text: newMessage,
      timestamp: new Date(),
      read: true,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <Card className="md:col-span-1 overflow-hidden">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="px-4 pb-4 space-y-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors ${selectedConversation.id === conversation.id ? "bg-muted" : ""}`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                      <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                    </Avatar>
                    {conversation.user.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{conversation.user.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.text}</p>
                  </div>

                  {conversation.unread > 0 && <Badge className="ml-auto">{conversation.unread}</Badge>}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 flex flex-col h-full">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
                    <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversation.user.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.user.online
                        ? "Online"
                        : `Last seen ${selectedConversation.user.lastSeen.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => {
                    const isCurrentUser = message.sender === "currentUser"
                    const showDate =
                      index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp)

                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <Badge variant="outline">{formatDate(message.timestamp)}</Badge>
                          </div>
                        )}

                        <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[70%] ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
                          >
                            <p>{message.text}</p>
                            <div
                              className={`text-xs mt-1 ${isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"} flex items-center justify-end`}
                            >
                              {formatTime(message.timestamp)}
                              {isCurrentUser && <span className="ml-1">{message.read ? "✓✓" : "✓"}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </DashboardShell>
  )
}
