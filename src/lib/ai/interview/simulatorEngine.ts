import { EvaluationResult } from '../interfaces';
import interviewData from '@/knowledge-base/interview.json';
import { InterviewQuestion } from '@/types';

export class InterviewSimulatorEngine {
  public static getRoles(): string[] {
    return interviewData.map((group) => group.role);
  }

  public static getQuestionsForRole(role: string): InterviewQuestion[] {
    const group = interviewData.find((g) => g.role.toLowerCase() === role.toLowerCase());
    return group ? (group.questions as InterviewQuestion[]) : (interviewData[0].questions as InterviewQuestion[]);
  }

  public static evaluateAnswer(questionId: string, userAnswer: string): EvaluationResult {
    if (!userAnswer || userAnswer.trim().length < 10) {
      return {
        score: 30,
        feedback: 'Answer is too brief. Try elaborating on engineering specifics, architecture choices, and metrics.',
        matchedKeywords: [],
        missingKeywords: ['technical specifics', 'architecture', 'metrics'],
      };
    }

    let targetQuestion: InterviewQuestion | undefined;
    for (const group of interviewData) {
      const q = group.questions.find((item) => item.id === questionId);
      if (q) {
        targetQuestion = q as InterviewQuestion;
        break;
      }
    }

    if (!targetQuestion) {
      targetQuestion = interviewData[0].questions[0] as InterviewQuestion;
    }

    const lowerAnswer = userAnswer.toLowerCase();
    const matched: string[] = [];
    const missing: string[] = [];

    targetQuestion.idealKeywords.forEach((kw) => {
      if (lowerAnswer.includes(kw.toLowerCase())) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    });

    const matchRatio = matched.length / targetQuestion.idealKeywords.length;
    const score = Math.min(96, Math.max(50, Math.round(matchRatio * 50 + (userAnswer.length > 80 ? 40 : 20))));

    let feedback = '';
    if (score >= 85) {
      feedback = 'Outstanding answer! You covered core architectural principles and key technical terms efficiently.';
    } else if (score >= 70) {
      feedback = 'Good answer! You demonstrated solid fundamental knowledge. Consider adding performance metrics or specific tool names.';
    } else {
      feedback = 'Decent start. Try incorporating keywords like: ' + missing.join(', ') + '.';
    }

    return {
      score,
      feedback,
      matchedKeywords: matched,
      missingKeywords: missing,
    };
  }
}
