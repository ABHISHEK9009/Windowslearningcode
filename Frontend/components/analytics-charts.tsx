import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "@/components/ui/chart"

interface AnalyticsChartsProps {
  className?: string
}

// Mock data
const monthlyData = [
  { name: "Jan", sessions: 2, hours: 3 },
  { name: "Feb", sessions: 4, hours: 6 },
  { name: "Mar", sessions: 3, hours: 4.5 },
  { name: "Apr", sessions: 5, hours: 7.5 },
  { name: "May", sessions: 4, hours: 6 },
  { name: "Jun", sessions: 6, hours: 9 },
]

export function AnalyticsCharts({ className }: AnalyticsChartsProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Learning Analytics</CardTitle>
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="sessions" name="Sessions" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="hours" name="Hours" fill="#82ca9d" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
