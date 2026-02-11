"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getLearningPath } from "@/app/actions";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  existingKnowledge: z.string().min(10, {
    message: "Please describe your knowledge in at least 10 characters.",
  }),
  learningStyle: z.string().min(3, {
    message: "Please describe your learning style.",
  }),
  goals: z.string().min(10, {
    message: "Please describe your goals in at least 10 characters.",
  }),
});

export function LearningPathForm() {
  const [isPending, startTransition] = useTransition();
  const [learningPath, setLearningPath] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      existingKnowledge: "",
      learningStyle: "",
      goals: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLearningPath(null);
    startTransition(async () => {
      try {
        const result = await getLearningPath(values);
        setLearningPath(result.learningPath);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred.",
          description: "Failed to generate learning path. Please try again.",
        });
        console.error(error);
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="existingKnowledge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Existing ML Knowledge</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'Beginner, familiar with Python and basic algebra.'"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe your current understanding of machine learning concepts.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="learningStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Learning Style</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Visual', 'Hands-on coding', 'Theoretical'" {...field} />
                </FormControl>
                <FormDescription>
                  How do you learn best?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learning Goals</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'Build a career in data science', 'Understand neural networks'"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What do you want to achieve?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Path
          </Button>
        </form>
      </Form>

      {isPending && (
         <div className="mt-8 space-y-4">
            <div className="w-full h-8 bg-muted animate-pulse rounded-md"></div>
            <div className="w-3/4 h-4 bg-muted animate-pulse rounded-md"></div>
            <div className="w-full h-4 bg-muted animate-pulse rounded-md"></div>
            <div className="w-full h-4 bg-muted animate-pulse rounded-md"></div>
        </div>
      )}

      {learningPath && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Personalized Learning Path</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
            {learningPath}
          </CardContent>
        </Card>
      )}
    </>
  );
}
