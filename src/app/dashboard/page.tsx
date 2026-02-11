import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Book,
  BrainCircuit,
  Code,
  ListChecks,
  Mic,
  Presentation,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Personalized Learning Path",
    description: "Craft a unique ML journey based on your skills and goals.",
    icon: Book,
    href: "/dashboard/learning-path",
    color: "text-sky-500",
  },
  {
    title: "AI Concept Explainer",
    description: "Demystify complex ML topics with clear, adaptive explanations.",
    icon: BrainCircuit,
    href: "/dashboard/concept-explainer",
    color: "text-amber-500",
  },
  {
    title: "Code Generation Tool",
    description: "Generate Python code for ML algorithms on the fly.",
    icon: Code,
    href: "/dashboard/code-generator",
    color: "text-emerald-500",
  },
  {
    title: "Visual Learning Aids",
    description: "Illustrate concepts with dynamic charts and diagrams.",
    icon: Presentation,
    href: "/dashboard/visual-aids",
    color: "text-purple-500",
  },
  {
    title: "Audio Explanations",
    description: "Listen to concepts explained in various tones for auditory learners.",
    icon: Mic,
    href: "/dashboard/audio-explanations",
    color: "text-red-500",
  },
  {
    title: "Adaptive Quizzes",
    description: "Test your knowledge with quizzes that adapt to your skill level.",
    icon: ListChecks,
    href: "/dashboard/quizzes",
    color: "text-indigo-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to LearnSphere AI</h1>
        <p className="text-muted-foreground">Your personal AI-powered guide to mastering Machine Learning.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <feature.icon className={`size-8 ${feature.color}`} />
              <div className="grid gap-1">
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={feature.href}>
                  Get Started <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
