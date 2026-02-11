import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeGeneratorForm } from "@/components/features/code-generator-form";

export default function CodeGeneratorPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Code Generation Tool</CardTitle>
          <p className="text-muted-foreground">
            Describe a machine learning task, and our AI will generate the Python code for you.
          </p>
        </CardHeader>
        <CardContent>
          <CodeGeneratorForm />
        </CardContent>
      </Card>
    </div>
  );
}
