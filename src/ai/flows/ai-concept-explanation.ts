'use server';

/**
 * @fileOverview AI Concept Explanation Flow.
 *
 * This file defines a Genkit flow that provides AI-generated explanations of complex ML concepts,
 * adapting the tone and level of detail based on user feedback.
 *
 * @exports explainConcept - The main function to trigger the concept explanation flow.
 * @exports ExplainConceptInput - The input type for the explainConcept function.
 * @exports ExplainConceptOutput - The output type for the explainConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptInputSchema = z.object({
  concept: z.string().describe('The ML concept to explain.'),
  userKnowledgeLevel: z
    .string()
    .optional()
    .describe('The user specified knowledge level of the concept.'),
  userFeedback: z
    .string()
    .optional()
    .describe('Feedback from the user to adjust the explanation.'),
});
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

const ExplainConceptOutputSchema = z.object({
  explanation: z.string().describe('The AI-generated explanation of the concept.'),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;

export async function explainConcept(input: ExplainConceptInput): Promise<ExplainConceptOutput> {
  return explainConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptPrompt',
  input: {schema: ExplainConceptInputSchema},
  output: {schema: ExplainConceptOutputSchema},
  prompt: `You are an expert in Machine Learning and AI.
  Your goal is to explain complex ML concepts in a clear and concise manner.

  Concept: {{{concept}}}

  {{~#if userKnowledgeLevel}}
  User Knowledge Level: {{{userKnowledgeLevel}}}
  {{~/if}}

  {{~#if userFeedback}}
  User Feedback: {{{userFeedback}}}
  Based on this feedback, adjust the explanation to be more clear and understandable.
  {{~/if}}

  Explanation:`,
});

const explainConceptFlow = ai.defineFlow(
  {
    name: 'explainConceptFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
