import Api from "./api";
import { Project, ProjectInput } from "./types/project";

interface ProjectListResponse {
  projects: Project[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

class ProjectService extends Api {
  async getProjects(
    page: number = 1,
    limit: number = 10
  ): Promise<ProjectListResponse> {
    return this.get<ProjectListResponse>(
      `/projects?page=${page}&limit=${limit}`
    );
  }

  async getProjectById(id: string): Promise<Project> {
    return this.get<Project>(`/projects/${id}`);
  }

  async createProject(projectData: ProjectInput): Promise<Project> {
    return this.post<Project>("/projects", projectData);
  }

  async updateProject(
    id: string,
    projectData: Partial<ProjectInput>
  ): Promise<Project> {
    return this.put<Project>(`/projects/${id}`, projectData);
  }

  async deleteProject(id: string): Promise<void> {
    return this.delete<void>(`/projects/${id}`);
  }
}

export default new ProjectService();
