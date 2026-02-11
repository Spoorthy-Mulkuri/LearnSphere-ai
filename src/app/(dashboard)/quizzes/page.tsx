import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AdaptiveQuiz } from "@/components/features/adaptive-quiz";

export default function QuizzesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Adaptive Quizzes</CardTitle>
          <CardDescription>
            Generate a quiz tailored to your skill level to test your knowledge and identify areas for improvement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdaptiveQuiz />
        </CardContent>
      </Card>
    </div>
  );
}
