"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { getVisualExplanation } from "@/app/actions";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { VisualExplanationOutput } from "@/ai/flows/visual-concept-explanation";

const formSchema = z.object({
  concept: z.string().min(3, {
    message: "Please enter a concept of at least 3 characters.",
  }),
});

export function VisualExplainerForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<VisualExplanationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      try {
        const result = await getVisualExplanation(values);
        setResult(result);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred.",
          description: "Failed to generate visual explanation. Please try again.",
        });
        console.error(error);
      }
    });
  }

  const hint = form.getValues("concept").split(" ").slice(0, 2).join(" ");

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="concept"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ML Concept</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Convolutional Neural Network', 'Gradient Descent'" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the machine learning concept you want a visual explanation for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Visual
          </Button>
        </form>
      </Form>

      {isPending && (
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-2xl aspect-video bg-muted animate-pulse rounded-lg flex items-center justify-center">
            <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />
          </div>
        </div>
      )}

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Visual Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={result.imageUrl}
              alt={`Visual explanation for ${form.getValues("concept")}`}
              width={1024}
              height={576}
              className="rounded-lg border"
              {...(result.isPlaceholder && { "data-ai-hint": hint })}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
