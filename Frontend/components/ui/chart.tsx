import type React from "react"
import {
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid as RechartsCartesianGrid,
  Legend as RechartsLegend,
  ResponsiveContainer as RechartsResponsiveContainer,
  Tooltip as RechartsTooltip,
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell as RechartsCell,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
} from "recharts"

export const BarChart = RechartsBarChart
export const Bar = RechartsBar
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis
export const CartesianGrid = RechartsCartesianGrid
export const Legend = RechartsLegend
export const ResponsiveContainer = RechartsResponsiveContainer
export const ChartTooltip = RechartsTooltip
export const PieChart = RechartsPieChart
export const Pie = RechartsPie
export const Cell = RechartsCell
export const LineChart = RechartsLineChart
export const Line = RechartsLine

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <RechartsResponsiveContainer width="100%" height="100%">
      {children}
    </RechartsResponsiveContainer>
  )
}
