import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { VisualExplainerForm } from "@/components/features/visual-explainer-form";

export default function VisualExplainerPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Visual Concept Explainer</CardTitle>
          <CardDescription>
            Generate a visual explanation for a complex machine learning concept.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VisualExplainerForm />
        </CardContent>
      </Card>
    </div>
  );
}
