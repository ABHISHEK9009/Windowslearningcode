"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Eye, Play } from "lucide-react"

interface PremiumVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  price: number
}

interface PremiumVideosProps {
  videos: PremiumVideo[]
  currency?: string
  className?: string
  onPurchase?: (videoId: string) => void
}

export function PremiumVideos({ videos, currency = "₹", className = "", onPurchase }: PremiumVideosProps) {
  const { toast } = useToast()
  const [selectedVideo, setSelectedVideo] = useState<PremiumVideo | null>(null)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePreview = (video: PremiumVideo) => {
    setSelectedVideo(video)
    setIsPreviewModalOpen(true)
  }

  const handlePurchase = (video: PremiumVideo) => {
    setSelectedVideo(video)
    setIsPurchaseModalOpen(true)
  }

  const confirmPurchase = () => {
    if (!selectedVideo) return

    setIsSubmitting(true)

    // In a real app, you would call an API to process the purchase
    setTimeout(() => {
      if (onPurchase) {
        onPurchase(selectedVideo.id)
      }

      toast({
        title: "Video purchased!",
        description: `You now have access to "${selectedVideo.title}".`,
      })

      setIsSubmitting(false)
      setIsPurchaseModalOpen(false)
    }, 1500)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Premium Content</CardTitle>
        <CardDescription>Access specialized video content ({currency}21 per video)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button variant="outline" onClick={() => handlePreview(video)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">{video.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    {currency}
                    {video.price}
                  </span>
                  <Button size="sm" onClick={() => handlePurchase(video)}>
                    Purchase
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Modal */}
        <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedVideo?.title}</DialogTitle>
              <DialogDescription>Preview</DialogDescription>
            </DialogHeader>
            <div className="aspect-video bg-muted rounded-md relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="outline" size="icon" className="h-16 w-16 rounded-full bg-background/80">
                  <Play className="h-8 w-8" />
                </Button>
              </div>
              <img
                src={selectedVideo?.thumbnail || "/placeholder.svg"}
                alt={selectedVideo?.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <p className="py-2">{selectedVideo?.description}</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPreviewModalOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsPreviewModalOpen(false)
                  if (selectedVideo) handlePurchase(selectedVideo)
                }}
              >
                Purchase ({currency}
                {selectedVideo?.price})
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Purchase Modal */}
        <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase Video</DialogTitle>
              <DialogDescription>{selectedVideo?.title}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="aspect-video bg-muted rounded-md mb-4">
                <img
                  src={selectedVideo?.thumbnail || "/placeholder.svg"}
                  alt={selectedVideo?.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <p className="mb-4">{selectedVideo?.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Duration: {selectedVideo?.duration}</p>
                </div>
                <div className="text-xl font-bold">
                  {currency}
                  {selectedVideo?.price}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPurchaseModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmPurchase} disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Purchase Video"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
