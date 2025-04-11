import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, PieChart, Pie, Cell } from "@/components/ui/chart"

interface ProgressMetricsProps {
  skillCompletion: number
  sessionCount: number
  hoursLearned: number
  yearlyGoal: number
}

export function ProgressMetrics({ skillCompletion, sessionCount, hoursLearned, yearlyGoal }: ProgressMetricsProps) {
  const data = [
    { name: "Completed", value: yearlyGoal },
    { name: "Remaining", value: 100 - yearlyGoal },
  ]

  const COLORS = ["#0088FE", "#EEEEEE"]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Progress Metrics</CardTitle>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Progress
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium">Skill Completion</span>
              </div>
              <span className="text-sm font-bold">{skillCompletion}%</span>
            </div>
            <Progress value={skillCompletion} className="h-2" />

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium">Sessions</span>
              </div>
              <span className="text-sm font-bold">{sessionCount}</span>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium">Hours Learned</span>
              </div>
              <span className="text-sm font-bold">{hoursLearned}</span>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center justify-center">
            <div className="w-full max-w-[200px] aspect-square">
              <ChartContainer>
                <PieChart>
                  <ChartTooltip />
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="text-center mt-2">
                <p className="text-sm font-medium">Yearly Goal: {yearlyGoal}%</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
