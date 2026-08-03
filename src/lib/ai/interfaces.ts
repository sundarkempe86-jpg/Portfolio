export interface MatchResult {
  score: number;
  matchingSkills: string[];
  missingSkills: string[];
  recommendations: string[];
}

export interface CopilotResponse {
  answer: string;
  suggestedQuestions: string[];
}

export interface EvaluationResult {
  score: number;
  feedback: string;
  matchedKeywords: string[];
  missingKeywords: string[];
}
