'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating adaptive quizzes.
 *
 * The flow takes a user's learning history as input and generates a quiz that is tailored to their skill level.
 * It exports:
 * - `generateAdaptiveQuiz`: The main function to generate an adaptive quiz.
 * - `AdaptiveQuizInput`: The input type for the `generateAdaptiveQuiz` function.
 * - `AdaptiveQuizOutput`: The output type for the `generateAdaptiveQuiz` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveQuizInputSchema = z.object({
  learningHistory: z
    .string()
    .describe(
      'A summary of the user learning history, including topics studied, quiz scores, and areas of difficulty.'
    ),
  desiredQuizLength: z
    .number()
    .int()
    .positive()
    .default(5)
    .describe('The desired number of questions in the quiz.'),
});
export type AdaptiveQuizInput = z.infer<typeof AdaptiveQuizInputSchema>;

const AdaptiveQuizOutputSchema = z.object({
  quizQuestions: z.array(
    z.object({
      question: z.string().describe('The text of the quiz question.'),
      options: z.array(z.string()).describe('The possible answers to the question.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
      topic: z.string().describe('The ML topic of the question'),
      difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty of the question'),
    })
  ).describe('An array of quiz questions tailored to the user.'),
});
export type AdaptiveQuizOutput = z.infer<typeof AdaptiveQuizOutputSchema>;

export async function generateAdaptiveQuiz(input: AdaptiveQuizInput): Promise<AdaptiveQuizOutput> {
  return adaptiveQuizFlow(input);
}

const adaptiveQuizPrompt = ai.definePrompt({
  name: 'adaptiveQuizPrompt',
  input: {schema: AdaptiveQuizInputSchema},
  output: {schema: AdaptiveQuizOutputSchema},
  prompt: `You are an expert in machine learning and education. Your task is to generate a quiz that adapts to the user's skill level based on their learning history.

  Learning History: {{{learningHistory}}}
  Desired Quiz Length: {{{desiredQuizLength}}}

  Generate a quiz with the specified number of questions. Each question should have multiple choice options, and indicate the correct answer.  Also indicate the ML topic of each question, and the difficulty.

  Ensure the quiz is appropriate for the user's level of understanding, focusing on areas where they need the most improvement. Vary the difficulty of questions to assess their knowledge comprehensively.

  Output in JSON format:
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const adaptiveQuizFlow = ai.defineFlow(
  {
    name: 'adaptiveQuizFlow',
    inputSchema: AdaptiveQuizInputSchema,
    outputSchema: AdaptiveQuizOutputSchema,
  },
  async input => {
    const {output} = await adaptiveQuizPrompt(input);
    return output!;
  }
);
