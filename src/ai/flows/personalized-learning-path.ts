'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a personalized learning path based on the user's existing ML knowledge and learning style.
 *
 * - generatePersonalizedLearningPath - A function that generates a personalized learning path.
 * - PersonalizedLearningPathInput - The input type for the generatePersonalizedLearningPath function.
 * - PersonalizedLearningPathOutput - The return type for the generatePersonalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPathInputSchema = z.object({
  existingKnowledge: z
    .string()
    .describe("The user's current knowledge and experience in machine learning."),
  learningStyle: z
    .string()
    .describe("The user's preferred learning style (e.g., visual, auditory, kinesthetic)."),
  goals: z.string().describe('The user’s specific learning goals in machine learning.'),
});
export type PersonalizedLearningPathInput = z.infer<typeof PersonalizedLearningPathInputSchema>;

const PersonalizedLearningPathOutputSchema = z.object({
  learningPath: z
    .string()
    .describe('A personalized learning path tailored to the user’s knowledge, style and goals.'),
});
export type PersonalizedLearningPathOutput = z.infer<typeof PersonalizedLearningPathOutputSchema>;

export async function generatePersonalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const personalizedLearningPathPrompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an expert in creating personalized machine learning learning paths.

  Based on the user's existing knowledge, learning style, and goals, create a tailored learning path.

  Existing Knowledge: {{{existingKnowledge}}}
  Learning Style: {{{learningStyle}}}
  Goals: {{{goals}}}

  Learning Path:`, // Changed from LearningGoals to Goals
});

const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await personalizedLearningPathPrompt(input);
    return output!;
  }
);
