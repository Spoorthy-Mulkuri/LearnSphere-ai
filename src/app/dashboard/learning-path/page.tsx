import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LearningPathForm } from "@/components/features/learning-path-form";

export default function LearningPathPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Personalized Learning Path</CardTitle>
          <p className="text-muted-foreground">
            Tell us about your goals and experience, and our AI will create a
            custom learning path for you.
          </p>
        </CardHeader>
        <CardContent>
          <LearningPathForm />
        </CardContent>
      </Card>
    </div>
  );
}
