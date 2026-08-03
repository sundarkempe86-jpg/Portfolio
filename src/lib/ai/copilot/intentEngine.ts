import { CopilotResponse } from '../interfaces';
import candidateData from '@/knowledge-base/candidate.json';
import faqData from '@/knowledge-base/faq.json';
import projectsData from '@/knowledge-base/projects.json';

export class CopilotIntentEngine {
  public static query(userText: string): CopilotResponse {
    const text = userText.toLowerCase().trim();

    if (!text) {
      return {
        answer: "Hello! I am Sundar's AI Portfolio Assistant. Ask me anything about his projects (CyberGuard, DormX), VTU GEC degree, KodNest Java training, or certifications!",
        suggestedQuestions: [
          'What is Sundar\'s VTU CGPA?',
          'Tell me about CyberGuard project',
          'What certifications does he hold?',
          'What is his goal for MEXT 2027?',
        ],
      };
    }

    // Check FAQ intent rules
    for (const faq of faqData) {
      if (faq.keywords.some((kw) => text.includes(kw))) {
        return {
          answer: faq.response,
          suggestedQuestions: [
            'How can I contact Sundar?',
            'What is his KodNest training background?',
            'Show his skills matrix',
          ],
        };
      }
    }

    // Check Projects specific match
    if (text.includes('cyberguard') || text.includes('url') || text.includes('malicious') || text.includes('security')) {
      const p = projectsData.find((proj) => proj.id === 'cyberguard');
      return {
        answer: `CyberGuard is Sundar's AI Malicious URL Detection project. It uses FastAPI microservices and Python Scikit-Learn Random Forest model to achieve 98.4% accuracy in detecting phishing links with <45ms latency.`,
        suggestedQuestions: ['What tech stack was used in CyberGuard?', 'Tell me about DormX project', 'Show Sundar\'s GitHub profile'],
      };
    }

    if (text.includes('dormx') || text.includes('housing') || text.includes('pg') || text.includes('vtu')) {
      return {
        answer: `DormX is a Student Housing SaaS architecture connecting VTU engineering students with local accommodations around Bidar and Belagavi, built using Node.js, PostgreSQL, and Leaflet open-source mapping.`,
        suggestedQuestions: ['What is Sundar\'s VTU degree?', 'Tell me about Expense Tracker', 'How to contact Sundar?'],
      };
    }

    // Fallback context-aware response
    return {
      answer: `Sundar Raj Kempe is an AI/ML Engineer and Java Full-Stack Software Developer currently undergoing training at KodNest Bengaluru and completing his B.E. at GEC Bidar (VTU, 7.0 CGPA). He is proficient in Python ML, FastAPI, Java 17+, React, and holds Azure AI & Cisco Certifications.`,
      suggestedQuestions: [
        'Tell me about his key projects',
        'What are his contact details?',
        'Calculate job match score',
      ],
    };
  }
}
