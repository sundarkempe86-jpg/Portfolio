import candidateData from '@/knowledge-base/candidate.json';
import educationData from '@/knowledge-base/education.json';
import experienceData from '@/knowledge-base/experience.json';
import projectsData from '@/knowledge-base/projects.json';
import certsData from '@/knowledge-base/certifications.json';

import { Candidate, Project, EducationItem, ExperienceItem, Certification } from '@/types';

export type ResumeRoleProfile = 'AIML' | 'JAVA' | 'FULLSTACK' | 'CYBERSECURITY';

export interface TailoredResume {
  profileTitle: string;
  summary: string;
  topSkills: string[];
  keyProjects: Project[];
  education: EducationItem[];
  experience: ExperienceItem[];
  certifications: Certification[];
}

export interface ResumeDataOverride {
  candidate?: Candidate;
  projects?: Project[];
  education?: EducationItem[];
  experience?: ExperienceItem[];
  certifications?: Certification[];
}

export class ResumeService {
  public static getTailoredResume(role: ResumeRoleProfile, overrides?: ResumeDataOverride): TailoredResume {
    const candidate = overrides?.candidate ?? (candidateData as unknown as Candidate);
    const allProjects = overrides?.projects ?? ((projectsData as unknown) as Project[]);
    const allEducation = overrides?.education ?? ((educationData as unknown) as EducationItem[]);
    const allExperience = overrides?.experience ?? ((experienceData as unknown) as ExperienceItem[]);
    const allCerts = overrides?.certifications ?? ((certsData as unknown) as Certification[]);

    const defaultRoleData = {
      AIML: {
        profileTitle: 'AI / Machine Learning Engineer Resume',
        summary: `${candidate.fullName} - Specialized in Python ML, Scikit-Learn, FastAPI microservices, TF-IDF cosine matching, and Azure AI Foundry. Lead developer of CyberGuard AI.`,
        topSkills: ['Python ML', 'FastAPI', 'Scikit-Learn', 'Azure AI Foundry', 'RAG & Prompt Flow', 'TensorFlow/PyTorch'],
      },
      JAVA: {
        profileTitle: 'Java Backend Software Developer Resume',
        summary: `${candidate.fullName} - KodNest Bengaluru Trainee specializing in Core & Enterprise Java 17+, SQL Relational Databases, OOP Design Patterns, and Data Structures & Algorithms.`,
        topSkills: ['Java 17+', 'Enterprise OOP', 'PostgreSQL / MySQL', 'Data Structures & Algorithms', 'REST API Design', 'Git & Docker'],
      },
      CYBERSECURITY: {
        profileTitle: 'Cybersecurity & Web Defense Analyst Resume',
        summary: `${candidate.fullName} - Cisco Endpoint Security Certified engineer skilled in AI-driven malicious URL detection, OWASP Top 10 mitigation, and secure FastAPI microservice architectures.`,
        topSkills: ['Endpoint Security', 'Malicious URL Detection', 'FastAPI Hardening', 'Network Defense', 'Python Security', 'Cisco Badged'],
      },
      FULLSTACK: {
        profileTitle: 'Java & Web Full-Stack Developer Resume',
        summary: `${candidate.fullName} - Versatile developer experienced in React 19, Next.js App Router, TypeScript, Tailwind CSS, Node.js, and Python FastAPI backends.`,
        topSkills: ['React 19 & Next.js', 'TypeScript', 'Tailwind CSS', 'Java Full Stack', 'Node.js & Express', 'PostgreSQL'],
      },
    } as const;

    const roleData = defaultRoleData[role];
    const profileTitle = candidate.resumeTitle || roleData.profileTitle;
    const summary = candidate.resumeSummary || roleData.summary;
    const topSkills = (candidate.resumeSkills && candidate.resumeSkills.length > 0 ? candidate.resumeSkills : [...roleData.topSkills]) as string[];

    switch (role) {
      case 'AIML':
        return {
          profileTitle,
          summary,
          topSkills,
          keyProjects: allProjects.filter((p) => p.id === 'cyberguard' || p.id === 'expense-tracker'),
          education: allEducation,
          experience: allExperience,
          certifications: allCerts.filter((c) => c.id.includes('azure') || c.id.includes('learn')),
        };
      case 'JAVA':
        return {
          profileTitle,
          summary,
          topSkills,
          keyProjects: allProjects.filter((p) => p.id === 'dormx' || p.id === 'expense-tracker'),
          education: allEducation,
          experience: allExperience,
          certifications: allCerts,
        };
      case 'CYBERSECURITY':
        return {
          profileTitle,
          summary,
          topSkills,
          keyProjects: allProjects.filter((p) => p.id === 'cyberguard'),
          education: allEducation,
          experience: allExperience,
          certifications: allCerts.filter((c) => c.id === 'cisco-endpoint-security' || c.id === 'azure-ai-fundamentals'),
        };
      case 'FULLSTACK':
      default:
        return {
          profileTitle,
          summary,
          topSkills,
          keyProjects: allProjects,
          education: allEducation,
          experience: allExperience,
          certifications: allCerts,
        };
    }
  }
}
