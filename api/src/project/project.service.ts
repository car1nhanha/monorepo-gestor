import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { organization_id, ...projectData } = createProjectDto;

    // Busca a organização pelo id
    const organization = await this.organizationRepository.findOne({
      where: { id: organization_id },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const project = this.projectRepository.create({
      ...projectData,
      organization,
    });

    try {
      return await this.projectRepository.save(project);
    } catch (error) {
      throw new BadRequestException({
        message: 'Error creating project',
        error: error.message,
      });
    }
  }

  async getProjects(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    projects: Project[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const skip = (page - 1) * limit;
    const [projects, total] = await this.projectRepository.findAndCount({
      skip,
      take: limit,
    });
    return {
      projects,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    };
  }

  async getProjectById(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    let project = await this.getProjectById(id);

    // Se for informada uma nova organization_id, atualiza a relação
    if (updateProjectDto.organization_id) {
      const organization = await this.organizationRepository.findOne({
        where: { id: updateProjectDto.organization_id },
      });
      if (!organization) {
        throw new NotFoundException('Organization not found');
      }
      delete updateProjectDto.organization_id;
      project.organization = organization;
    }

    project = { ...project, ...updateProjectDto };
    return await this.projectRepository.save(project);
  }

  async deleteProject(id: string): Promise<{ message: string }> {
    const project = await this.getProjectById(id);
    await this.projectRepository.remove(project);
    return { message: 'Project deleted successfully' };
  }
}
