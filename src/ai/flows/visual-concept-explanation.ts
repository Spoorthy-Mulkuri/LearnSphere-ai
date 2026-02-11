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
import { Buffer } from 'node:buffer';

const VisualExplanationInputSchema = z.object({
  concept: z.string().describe('The ML concept to explain visually.'),
});
export type VisualExplanationInput = z.infer<typeof VisualExplanationInputSchema>;

const VisualExplanationOutputSchema = z.object({
  explanation: z.string().describe('The AI-generated textual explanation of the concept.'),
  imageUrl: z.string().describe('A data URI of a generated SVG image that visually explains the concept.'),
});
export type VisualExplanationOutput = z.infer<typeof VisualExplanationOutputSchema>;


// This is the schema for what the LLM should output
const PromptOutputSchema = z.object({
    explanation: z.string().describe('A clear, concise, and accurate textual explanation of the machine learning concept.'),
    svgDiagram: z.string().describe('A valid, self-contained SVG string that visually explains the concept. The SVG should be simple, clear, and use basic shapes and text. It must have a viewbox and not rely on external stylesheets or fonts. Use a light theme with dark text and colored accents.'),
});

const visualExplanationPrompt = ai.definePrompt({
    name: 'visualExplanationPrompt',
    input: { schema: VisualExplanationInputSchema },
    output: { schema: PromptOutputSchema },
    prompt: `You are an expert in machine learning and an excellent visual communicator.
Your task is to generate a textual explanation and a simple SVG diagram for a given machine learning concept.

Concept: "{{{concept}}}"

1.  **Text Explanation**: Provide a clear and concise explanation of the concept. This explanation will be displayed alongside the visual diagram.
2.  **SVG Diagram**: Generate a valid, self-contained SVG string that visually represents the core idea of the concept.
    - The SVG MUST be well-formed XML.
    - It MUST include an 'xmlns="http://www.w3.org/2000/svg"' attribute on the <svg> tag.
    - Use a 'viewBox' attribute to ensure it is scalable. A good default is "0 0 400 225".
    - Use a light-colored background for the entire SVG, like a <rect> with fill="#ffffff" or a transparent background.
    - Use dark text/lines (e.g., stroke="#020617" fill="#020617") and some color for emphasis (e.g. fill="#3b82f6" for nodes).
    - Keep the design simple, clean, and informative. Use clear, legible labels with a sans-serif font.
    - DO NOT use <style> blocks or external fonts. Use inline 'style' attributes or presentation attributes (fill, stroke, font-size).
    - Ensure all text is clearly visible against its background.
`
});

const visualExplanationFlow = ai.defineFlow(
  {
    name: 'visualExplanationFlow',
    inputSchema: VisualExplanationInputSchema,
    outputSchema: VisualExplanationOutputSchema,
  },
  async ( input ) => {
    const {output} = await visualExplanationPrompt(input);
    if (!output) {
        throw new Error('Failed to generate visual explanation from AI.');
    }

    const imageUrl = `data:image/svg+xml;base64,${Buffer.from(output.svgDiagram).toString('base64')}`;
    
    return {
      explanation: output.explanation,
      imageUrl: imageUrl,
    };
  }
);

export async function generateVisualExplanation(input: VisualExplanationInput): Promise<VisualExplanationOutput> {
  return visualExplanationFlow(input);
}
