"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface VideoIntroductionProps {
  videoUrl: string
  title?: string
  description?: string
  className?: string
}

export function VideoIntroduction({
  videoUrl,
  title = "Introduction Video",
  description = "Get to know me and my teaching style",
  className = "",
}: VideoIntroductionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const handleSeek = (value: number[]) => {
    const seekTime = value[0]
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration)
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full rounded-md"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <div className="relative flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleMute}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>

                {showVolumeSlider && (
                  <div
                    className="absolute bottom-full left-0 mb-2 p-2 bg-background border rounded-md shadow-md w-24"
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <Slider value={[volume]} min={0} max={1} step={0.1} onValueChange={handleVolumeChange} />
                  </div>
                )}
              </div>

              <Button variant="outline" size="icon" onClick={skipBackward} aria-label="Skip backward 10 seconds">
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" onClick={skipForward} aria-label="Skip forward 10 seconds">
                <SkipForward className="h-4 w-4" />
              </Button>

              <div className="flex-1 mx-2">
                <Slider value={[currentTime]} min={0} max={duration || 100} step={0.1} onValueChange={handleSeek} />
              </div>

              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <Button variant="outline" size="icon" onClick={handleFullscreen} aria-label="Fullscreen">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
