"use server";

import {
  generatePersonalizedLearningPath,
  type PersonalizedLearningPathInput,
} from "@/ai/flows/personalized-learning-path";
import {
  explainConcept,
  type ExplainConceptInput,
} from "@/ai/flows/ai-concept-explanation";
import {
  generateCodeSnippet,
  type CodeGenerationInput,
} from "@/ai/flows/code-generation-tool";
import {
  generateAdaptiveQuiz,
  type AdaptiveQuizInput,
} from "@/ai/flows/adaptive-quizzes";
import {
  generateVisualExplanation,
  type VisualExplanationInput,
} from "@/ai/flows/visual-concept-explanation";

export async function getLearningPath(input: PersonalizedLearningPathInput) {
  const result = await generatePersonalizedLearningPath(input);
  return result;
}

export async function getConceptExplanation(input: ExplainConceptInput) {
  const result = await explainConcept(input);
  return result;
}

export async function getCodeSnippet(input: CodeGenerationInput) {
  const result = await generateCodeSnippet(input);
  return result;
}

export async function getAdaptiveQuiz(input: AdaptiveQuizInput) {
  const result = await generateAdaptiveQuiz(input);
  return result;
}

export async function getVisualExplanation(input: VisualExplanationInput) {
  const result = await generateVisualExplanation(input);
  return result;
}
