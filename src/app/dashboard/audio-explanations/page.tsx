import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AudioExplanationsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="max-w-xl text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
             <Mic className="size-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Audio Explanations</CardTitle>
          <CardDescription>
            Our audio explanation feature is integrated directly into the AI Concept Explainer. Generate an explanation, then click the speaker icon to have it read aloud.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/dashboard/concept-explainer">
              Try the Concept Explainer
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
