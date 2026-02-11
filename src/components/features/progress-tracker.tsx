import { CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const learningModules = [
  { name: "Introduction to Machine Learning", progress: 100, completed: true },
  { name: "Supervised Learning: Regression", progress: 100, completed: true },
  { name: "Supervised Learning: Classification", progress: 80, completed: false },
  { name: "Unsupervised Learning: Clustering", progress: 45, completed: false },
  { name: "Deep Learning & Neural Networks", progress: 15, completed: false },
  { name: "Natural Language Processing (NLP)", progress: 0, completed: false },
  { name: "Model Deployment", progress: 0, completed: false },
];

const totalProgress = learningModules.reduce((acc, mod) => acc + mod.progress, 0) / learningModules.length;

export function ProgressTracker() {
  return (
    <div className="space-y-8">
       <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <Progress value={totalProgress} />
            <p className="text-sm text-muted-foreground">{Math.round(totalProgress)}% Complete</p>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Modules</h3>
        {learningModules.map((module) => (
          <Card key={module.name}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-shrink-0">
                {module.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-grow">
                <p className="font-medium">{module.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={module.progress} className="h-2" />
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {module.progress}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
