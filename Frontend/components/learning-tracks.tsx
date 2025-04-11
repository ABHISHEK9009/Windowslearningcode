import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LearningTracksProps {
  tracks: string[]
}

export function LearningTracks({ tracks }: LearningTracksProps) {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Learning Tracks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tracks.map((track) => (
            <Badge key={track} variant="outline" className="text-xs">
              #{track}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
