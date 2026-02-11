"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getCodeSnippet } from "@/app/actions";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  taskDescription: z.string().min(10, {
    message: "Please describe the task in at least 10 characters.",
  }),
});

export function CodeGeneratorForm() {
  const [isPending, startTransition] = useTransition();
  const [code, setCode] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskDescription: "",
    },
  });

  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      toast({
        title: "Copied to clipboard!",
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCode(null);
    startTransition(async () => {
      try {
        const result = await getCodeSnippet(values);
        setCode(result.codeSnippet);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred.",
          description: "Failed to generate code. Please try again.",
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
            name="taskDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'A simple linear regression model using scikit-learn on a sample dataset.'"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe the ML task or algorithm you want code for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Code
          </Button>
        </form>
      </Form>

       {isPending && (
         <div className="mt-8 space-y-4 rounded-lg bg-muted p-4">
            <div className="w-1/4 h-4 bg-muted-foreground/20 animate-pulse rounded-md"></div>
            <div className="w-1/2 h-4 bg-muted-foreground/20 animate-pulse rounded-md"></div>
            <div className="w-1/3 h-4 bg-muted-foreground/20 animate-pulse rounded-md"></div>
            <div className="w-3/4 h-4 bg-muted-foreground/20 animate-pulse rounded-md"></div>
        </div>
      )}

      {code && (
        <Card className="mt-8 bg-black/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-primary-foreground">Generated Python Code</CardTitle>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-white/10">
              <Clipboard className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="p-4 rounded-md bg-black/50 text-white overflow-x-auto text-sm">
              <code>{code}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </>
  );
}
