'use server';

/**
 * @fileOverview Visual Concept Explanation Flow.
 *
 * This file defines a Genkit flow that provides AI-generated visual and textual explanations of complex ML concepts.
 *
 * @exports generateVisualExplanation - The main function to trigger the visual explanation flow.
 * @exports VisualExplanationInput - The input type for the generateVisualExplanation function.
 * @exports VisualExplanationOutput - The output type for the generateVisualExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisualExplanationInputSchema = z.object({
  concept: z.string().describe('The ML concept to explain visually.'),
});
export type VisualExplanationInput = z.infer<typeof VisualExplanationInputSchema>;

const VisualExplanationOutputSchema = z.object({
  explanation: z.string().describe('The AI-generated textual explanation of the concept.'),
  imageUrl: z.string().describe('The URL of the generated image that visually explains the concept.'),
  isPlaceholder: z.boolean().optional().describe('Whether the image is a placeholder.'),
});
export type VisualExplanationOutput = z.infer<typeof VisualExplanationOutputSchema>;

export async function generateVisualExplanation(input: VisualExplanationInput): Promise<VisualExplanationOutput> {
  return visualExplanationFlow(input);
}

const visualExplanationFlow = ai.defineFlow(
  {
    name: 'visualExplanationFlow',
    inputSchema: VisualExplanationInputSchema,
    outputSchema: VisualExplanationOutputSchema,
  },
  async ({ concept }) => {
    const imagePromise = (async () => {
      try {
        const { media } = await ai.generate({
            model: 'googleai/imagen-4.0-fast-generate-001',
            prompt: `Generate a clear, simple, and informative diagram or visual explanation for the following machine learning concept: "${concept}". The image should be easy to understand and suitable for a learning platform. Focus on illustrating the core idea of the concept. Style: Flat, 2D, infographic style with clear labels.`,
        });

        if (!media) {
            throw new Error('Failed to generate image.');
        }

        return {
            imageUrl: media.url,
            isPlaceholder: false
        };
      } catch (error) {
        // The Imagen API may require a billed account. As a fallback, we'll use a placeholder image.
        const seed = concept.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const imageUrl = `https://picsum.photos/seed/${seed}/1024/576`;
        return {
            imageUrl,
            isPlaceholder: true,
        };
      }
    })();

    const textPromise = (async () => {
      const { text } = await ai.generate({
          prompt: `Explain the machine learning concept "${concept}" in a clear and concise way. This explanation will be displayed alongside a visual diagram.`,
      });
      return text;
    })();

    const [imageResult, explanation] = await Promise.all([imagePromise, textPromise]);
    
    return {
      explanation,
      imageUrl: imageResult.imageUrl,
      isPlaceholder: imageResult.isPlaceholder,
    };
  }
);
