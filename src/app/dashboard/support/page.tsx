import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Support</CardTitle>
          <CardDescription>
            Get help and support.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Support content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
