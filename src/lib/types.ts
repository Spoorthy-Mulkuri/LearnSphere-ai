import type { generateAdaptiveQuiz } from "@/ai/flows/adaptive-quizzes";

export type AdaptiveQuiz = Awaited<ReturnType<typeof generateAdaptiveQuiz>>;
export type QuizQuestion = AdaptiveQuiz["quizQuestions"][0];
