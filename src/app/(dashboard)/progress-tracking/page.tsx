import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ProgressTracker } from "@/components/features/progress-tracker";

export default function ProgressTrackingPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your Learning Progress</CardTitle>
          <CardDescription>
            Track your journey through various machine learning topics and see how far you've come.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressTracker />
        </CardContent>
      </Card>
    </div>
  );
}
