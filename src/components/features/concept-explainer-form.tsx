"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getConceptExplanation } from "@/app/actions";
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
import { Loader2, Volume2, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  concept: z.string().min(3, {
    message: "Please enter a concept of at least 3 characters.",
  }),
  userKnowledgeLevel: z.string().optional(),
  userFeedback: z.string().optional(),
});

export function ConceptExplainerForm() {
  const [isPending, startTransition] = useTransition();
  const [explanation, setExplanation] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // On component unmount, ensure any active speech is stopped.
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    if (explanation) {
      const newUtterance = new SpeechSynthesisUtterance(explanation);
      newUtterance.onend = () => {
        setIsSpeaking(false);
      };
      newUtterance.onerror = (e) => {
        if (e.error !== 'cancelled') {
          console.error("Speech synthesis error", e);
          toast({
            variant: "destructive",
            title: "Audio Error",
            description: "Could not play the explanation.",
          });
        }
        setIsSpeaking(false);
      }
      synth.speak(newUtterance);
      setIsSpeaking(true);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept: "",
      userKnowledgeLevel: "",
      userFeedback: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setExplanation(null);
    startTransition(async () => {
      try {
        const result = await getConceptExplanation(values);
        setExplanation(result.explanation);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred.",
          description: "Failed to generate explanation. Please try again.",
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
            name="concept"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ML Concept</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Backpropagation', 'Generative Adversarial Networks'" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the machine learning concept you want to understand.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="userKnowledgeLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Knowledge Level (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Complete beginner', 'Familiar with basics'" {...field} />
                </FormControl>
                 <FormDescription>
                  Help the AI tailor the explanation to your level.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="userFeedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Refine Explanation (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., 'Explain it like I'm five', 'Focus more on the math'" {...field} />
                </FormControl>
                <FormDescription>
                  Provide feedback to refine a previous explanation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Explain Concept
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

      {explanation && (
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>AI Explanation</CardTitle>
            <Button variant="outline" size="icon" onClick={handleSpeak} title={isSpeaking ? "Stop" : "Read aloud"}>
              {isSpeaking ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
            {explanation}
          </CardContent>
        </Card>
      )}
    </>
  );
}
