"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getAdaptiveQuiz } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { AdaptiveQuiz as QuizData } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";

const formSchema = z.object({
  learningHistory: z.string().min(10, {
    message: "Please describe your history in at least 10 characters.",
  }),
});

type UserAnswers = { [key: number]: string };

export function AdaptiveQuiz() {
  const [isPending, startTransition] = useTransition();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learningHistory: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setQuizData(null);
    setShowResults(false);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    startTransition(async () => {
      try {
        const result = await getAdaptiveQuiz({
          learningHistory: values.learningHistory,
          desiredQuizLength: 5,
        });
        setQuizData(result);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred.",
          description: "Failed to generate quiz. Please try again.",
        });
        console.error(error);
      }
    });
  }

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const score = quizData
    ? Object.keys(userAnswers).reduce((correctCount, qIndex) => {
        const question = quizData.quizQuestions[Number(qIndex)];
        if (question && question.correctAnswer === userAnswers[Number(qIndex)]) {
          return correctCount + 1;
        }
        return correctCount;
      }, 0)
    : 0;
  
  const resetQuiz = () => {
    setQuizData(null);
    setShowResults(false);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    form.reset();
  }

  if (showResults && quizData) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
                <p className="text-muted-foreground pt-2">You answered <span className="font-bold text-foreground">{score}</span> out of <span className="font-bold text-foreground">{quizData.quizQuestions.length}</span> questions correctly.</p>
            </CardHeader>
            <CardContent className="space-y-4">
                {quizData.quizQuestions.map((q, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${userAnswers[index] === q.correctAnswer ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                        <p className="font-semibold">{index + 1}. {q.question}</p>
                        <p className="text-sm mt-2">Your answer: {userAnswers[index] || 'Not answered'}</p>
                        <p className="text-sm">Correct answer: {q.correctAnswer}</p>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                 <Button onClick={resetQuiz}>Take Another Quiz</Button>
            </CardFooter>
        </Card>
    )
  }

  if (quizData) {
    const question = quizData.quizQuestions[currentQuestionIndex];
    return (
        <Card>
            <CardHeader>
                <CardTitle>Question {currentQuestionIndex + 1} of {quizData.quizQuestions.length}</CardTitle>
                <div className="flex items-center gap-2">
                    <Badge variant="outline">{question.topic}</Badge>
                    <Badge variant="secondary">{question.difficulty}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="font-semibold text-lg mb-6">{question.question}</p>
                <RadioGroup onValueChange={(value) => handleAnswerSelect(currentQuestionIndex, value)} value={userAnswers[currentQuestionIndex]}>
                    {question.options.map((option, i) => (
                        <div key={i} className="flex items-center space-x-3">
                            <RadioGroupItem value={option} id={`q-${currentQuestionIndex}-option-${i}`} />
                            <Label htmlFor={`q-${currentQuestionIndex}-option-${i}`} className="font-normal">{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentQuestionIndex(i => i - 1)} disabled={currentQuestionIndex === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                 {currentQuestionIndex < quizData.quizQuestions.length - 1 ? (
                    <Button onClick={() => setCurrentQuestionIndex(i => i + 1)} disabled={!userAnswers[currentQuestionIndex]}>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button onClick={() => setShowResults(true)} disabled={!userAnswers[currentQuestionIndex]} className="bg-green-600 hover:bg-green-700">
                        Finish Quiz
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="learningHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Learning History</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 'Completed modules on regression and classification. Struggled with unsupervised learning concepts.'"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Help the AI create a quiz based on what you've studied and where you need practice.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Quiz
        </Button>
      </form>
    </Form>
  );
}
