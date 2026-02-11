import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { VisualAidsChart } from "@/components/features/visual-aids-chart";

export default function VisualAidsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Visual Learning Aids</CardTitle>
          <CardDescription>
            Visualize complex data and machine learning concepts with interactive charts and diagrams.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VisualAidsChart />
        </CardContent>
      </Card>
    </div>
  );
}
