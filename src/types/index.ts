export interface Candidate {
  fullName: string;
  title: string;
  usn?: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  bio: string;
  status: string;
  vtuCgpa: string;
  languages: { name: string; fluency: string; level: string }[];
  targetCompanies: string[];
  mextGoal: string;
  resumeTitle?: string;
  resumeSummary?: string;
  resumeSkills?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  affiliation?: string;
  degree: string;
  duration: string;
  grade: string;
  location: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  skillsLearned: string[];
}

export interface ProjectMetric {
  [key: string]: string;
}

export interface ProjectCaseStudy {
  problem: string;
  research: string;
  architecture: string;
  challenges: string;
  solutions: string;
  performance: string;
  lessonsLearned: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  summary: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  metrics: ProjectMetric;
  caseStudy: ProjectCaseStudy;
}

export interface SkillItem {
  name: string;
  level: number;
  icon: string;
  tags: string[];
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  badgeUrl: string;
  skills: string[];
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
}

export interface FaqItem {
  keywords: string[];
  response: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  idealKeywords: string[];
  sampleAnswer: string;
}

export interface InterviewRoleGroup {
  role: string;
  questions: InterviewQuestion[];
}

export interface CareerRoadmap {
  targetMilestone: string;
  readinessScore: number;
  skillsAcquired: string[];
  inProgress: string[];
  upcomingPlan: { phase: string; goal: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category: string;
}
