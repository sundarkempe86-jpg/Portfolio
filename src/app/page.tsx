import React from 'react';
import { HeroModule } from '@/features/hero/HeroModule';
import { AboutModule } from '@/features/about/AboutModule';
import { SkillsModule } from '@/features/skills/SkillsModule';
import { ExperienceEducationModule } from '@/features/experience/ExperienceEducationModule';
import { ProjectsModule } from '@/features/projects/ProjectsModule';
import { SystemDesignModule } from '@/features/system-design/SystemDesignModule';
import { CertificationsModule } from '@/features/certifications/CertificationsModule';
import { BlogModule } from '@/features/blog/BlogModule';
import { ResumeModule } from '@/features/resume/ResumeModule';
import { RecruiterDashboardModule } from '@/features/recruiter/RecruiterDashboardModule';
import { AiJobAssistantModule } from '@/features/ai-job-assistant/AiJobAssistantModule';
import { AiRoadmapModule } from '@/features/ai-roadmap/AiRoadmapModule';
import { AchievementsModule } from '@/features/achievements/AchievementsModule';
import { ContactModule } from '@/features/contact/ContactModule';

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <HeroModule />
      <AboutModule />
      <SkillsModule />
      <ExperienceEducationModule />
      <ProjectsModule />
      <SystemDesignModule />
      <CertificationsModule />
      <BlogModule />
      <ResumeModule />
      <RecruiterDashboardModule />
      <AiJobAssistantModule />
      <AiRoadmapModule />
      <AchievementsModule />
      <ContactModule />
    </div>
  );
}
