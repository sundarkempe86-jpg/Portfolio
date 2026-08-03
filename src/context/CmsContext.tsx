'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import candidateData from '@/knowledge-base/candidate.json';
import projectsData from '@/knowledge-base/projects.json';
import skillsData from '@/knowledge-base/skills.json';
import certsData from '@/knowledge-base/certifications.json';
import educationData from '@/knowledge-base/education.json';
import experienceData from '@/knowledge-base/experience.json';

import { Candidate, Project, SkillCategory, Certification, EducationItem, ExperienceItem } from '@/types';

export interface FullPortfolioState {
  candidate: Candidate;
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  education: EducationItem[];
  experience: ExperienceItem[];
}

const defaultPortfolioState: FullPortfolioState = {
  candidate: candidateData as Candidate,
  projects: projectsData as unknown as Project[],
  skills: skillsData as unknown as SkillCategory[],
  certifications: certsData as unknown as Certification[],
  education: educationData as unknown as EducationItem[],
  experience: experienceData as unknown as ExperienceItem[],
};

interface CmsContextType {
  state: FullPortfolioState;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  updateCandidate: (fields: Partial<Candidate>) => void;
  updateProjects: (projects: Project[]) => void;
  updateProjectItem: (id: string, updated: Partial<Project>) => void;
  addProjectItem: (newProj: Project) => void;
  deleteProjectItem: (id: string) => void;
  updateSkills: (skills: SkillCategory[]) => void;
  updateCertifications: (certs: Certification[]) => void;
  updateEducation: (edu: EducationItem[]) => void;
  updateExperience: (exp: ExperienceItem[]) => void;
  resetToFactoryDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => boolean;
}

const CmsContext = createContext<CmsContextType>({
  state: defaultPortfolioState,
  editMode: false,
  setEditMode: () => { },
  updateCandidate: () => { },
  updateProjects: () => { },
  updateProjectItem: () => { },
  addProjectItem: () => { },
  deleteProjectItem: () => { },
  updateSkills: () => { },
  updateCertifications: () => { },
  updateEducation: () => { },
  updateExperience: () => { },
  resetToFactoryDefaults: () => { },
  exportJSON: () => '',
  importJSON: () => false,
});

const STORAGE_KEY = 'antigravity_master_portfolio_cms_v2';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<FullPortfolioState>(defaultPortfolioState);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({ ...prev, ...parsed }));
      }
      // Restore session if owner was logged in
      if (sessionStorage.getItem('owner_auth') === '1') setEditMode(true);
    } catch {
      // Ignore fallback
    }
  }, []);

  const handleSetEditMode = (val: boolean) => {
    setEditMode(val);
    try {
      if (val) sessionStorage.setItem('owner_auth', '1');
      else sessionStorage.removeItem('owner_auth');
    } catch { }
  };

  const saveToStorage = (newState: FullPortfolioState) => {
    setState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch {
      // Storage failure ignore
    }
  };

  const updateCandidate = (fields: Partial<Candidate>) => {
    const newState = {
      ...state,
      candidate: { ...state.candidate, ...fields },
    };
    saveToStorage(newState);
  };

  const updateProjects = (projects: Project[]) => {
    saveToStorage({ ...state, projects });
  };

  const updateProjectItem = (id: string, updated: Partial<Project>) => {
    const newProjs = state.projects.map((p) => (p.id === id ? { ...p, ...updated } : p));
    saveToStorage({ ...state, projects: newProjs });
  };

  const addProjectItem = (newProj: Project) => {
    saveToStorage({ ...state, projects: [newProj, ...state.projects] });
  };

  const deleteProjectItem = (id: string) => {
    saveToStorage({ ...state, projects: state.projects.filter((p) => p.id !== id) });
  };

  const updateSkills = (skills: SkillCategory[]) => {
    saveToStorage({ ...state, skills });
  };

  const updateCertifications = (certifications: Certification[]) => {
    saveToStorage({ ...state, certifications });
  };

  const updateEducation = (education: EducationItem[]) => {
    saveToStorage({ ...state, education });
  };

  const updateExperience = (experience: ExperienceItem[]) => {
    saveToStorage({ ...state, experience });
  };

  const resetToFactoryDefaults = () => {
    saveToStorage(defaultPortfolioState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage failure ignore
    }
  };

  const exportJSON = (): string => {
    return JSON.stringify(state, null, 2);
  };

  const importJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.candidate && parsed.projects) {
        saveToStorage(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        state,
        editMode,
        setEditMode: handleSetEditMode,
        updateCandidate,
        updateProjects,
        updateProjectItem,
        addProjectItem,
        deleteProjectItem,
        updateSkills,
        updateCertifications,
        updateEducation,
        updateExperience,
        resetToFactoryDefaults,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCMS = () => useContext(CmsContext);
