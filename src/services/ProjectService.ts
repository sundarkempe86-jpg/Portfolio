import projectsData from '@/knowledge-base/projects.json';
import { Project } from '@/types';

export class ProjectService {
  public static getAllProjects(): Project[] {
    return (projectsData as unknown) as Project[];
  }

  public static getFeaturedProjects(): Project[] {
    return ((projectsData as unknown) as Project[]).filter((p) => p.featured);
  }

  public static getProjectById(id: string): Project | undefined {
    return ((projectsData as unknown) as Project[]).find((p) => p.id === id);
  }
}
