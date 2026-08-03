import candidateData from '@/knowledge-base/candidate.json';
import educationData from '@/knowledge-base/education.json';
import experienceData from '@/knowledge-base/experience.json';
import skillsData from '@/knowledge-base/skills.json';
import certificationsData from '@/knowledge-base/certifications.json';
import faqData from '@/knowledge-base/faq.json';
import roadmapData from '@/knowledge-base/roadmap.json';

import { Candidate, EducationItem, ExperienceItem, SkillCategory, Certification, FaqItem, CareerRoadmap } from '@/types';

export class CandidateService {
  public static getProfile(): Candidate {
    return (candidateData as unknown) as Candidate;
  }

  public static getEducation(): EducationItem[] {
    return (educationData as unknown) as EducationItem[];
  }

  public static getExperience(): ExperienceItem[] {
    return (experienceData as unknown) as ExperienceItem[];
  }

  public static getSkills(): SkillCategory[] {
    return (skillsData as unknown) as SkillCategory[];
  }

  public static getCertifications(): Certification[] {
    return (certificationsData as unknown) as Certification[];
  }

  public static getFaqs(): FaqItem[] {
    return (faqData as unknown) as FaqItem[];
  }

  public static getRoadmap(): CareerRoadmap {
    return (roadmapData as unknown) as CareerRoadmap;
  }
}
