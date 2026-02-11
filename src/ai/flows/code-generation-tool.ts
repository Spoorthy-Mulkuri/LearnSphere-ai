'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating Python code snippets for various ML tasks and algorithms.
 *
 * The flow takes a description of the desired ML task and returns a Python code snippet that implements the task, including comments and explanations.
 *
 * @exports generateCodeSnippet - A function that triggers the code generation flow.
 * @exports CodeGenerationInput - The input type for the generateCodeSnippet function.
 * @exports CodeGenerationOutput - The output type for the generateCodeSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeGenerationInputSchema = z.object({
  taskDescription: z.string().describe('A detailed description of the machine learning task for which code needs to be generated.'),
});
export type CodeGenerationInput = z.infer<typeof CodeGenerationInputSchema>;

const CodeGenerationOutputSchema = z.object({
  codeSnippet: z.string().describe('A Python code snippet that implements the described machine learning task, including comments and explanations.'),
});
export type CodeGenerationOutput = z.infer<typeof CodeGenerationOutputSchema>;

export async function generateCodeSnippet(input: CodeGenerationInput): Promise<CodeGenerationOutput> {
  return generateCodeSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeGenerationPrompt',
  input: {schema: CodeGenerationInputSchema},
  output: {schema: CodeGenerationOutputSchema},
  prompt: `You are an expert machine learning code generator. Your task is to generate Python code snippets based on user requests.

  The code should be well-commented and include explanations of the different steps.

  User Request: {{{taskDescription}}}

  Ensure that the generated code is executable and addresses the user's request directly.
  Output only valid and complete Python code snippet.`,
});

const generateCodeSnippetFlow = ai.defineFlow(
  {
    name: 'generateCodeSnippetFlow',
    inputSchema: CodeGenerationInputSchema,
    outputSchema: CodeGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
