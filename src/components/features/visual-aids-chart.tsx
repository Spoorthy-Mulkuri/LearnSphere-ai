"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

const chartData = [
  { model: "SVM", accuracy: 88, f1: 0.86 },
  { model: "LogReg", accuracy: 92, f1: 0.91 },
  { model: "RF", accuracy: 95, f1: 0.94 },
  { model: "NN", accuracy: 97, f1: 0.96 },
  { model: "XGBoost", accuracy: 96, f1: 0.95 },
]

const chartConfig = {
  accuracy: {
    label: "Accuracy (%)",
    color: "hsl(var(--primary))",
  },
  f1: {
    label: "F1-Score",
    color: "hsl(var(--accent))",
  },
}

export function VisualAidsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance Comparison</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="model"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="accuracy" fill="var(--color-accuracy)" radius={4} />
            <Bar dataKey="f1" fill="var(--color-f1)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
