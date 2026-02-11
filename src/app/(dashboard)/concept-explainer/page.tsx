import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConceptExplainerForm } from "@/components/features/concept-explainer-form";

export default function ConceptExplainerPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">AI Concept Explainer</CardTitle>
          <p className="text-muted-foreground">
            Stuck on a machine learning concept? Get a clear, simple explanation from our AI.
          </p>
        </CardHeader>
        <CardContent>
          <ConceptExplainerForm />
        </CardContent>
      </Card>
    </div>
  );
}
