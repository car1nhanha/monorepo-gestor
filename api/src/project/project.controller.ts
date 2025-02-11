import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './project.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully',
    type: Project,
  })
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return await this.projectsService.createProject(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get projects with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getProjects(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.projectsService.getProjects(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiParam({ name: 'id', description: 'Project id' })
  async getProjectById(@Param('id') id: string): Promise<Project> {
    return await this.projectsService.getProjectById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update project by id' })
  @ApiParam({ name: 'id', description: 'Project id' })
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectsService.updateProject(id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete project by id' })
  @ApiParam({ name: 'id', description: 'Project id' })
  async deleteProject(@Param('id') id: string): Promise<{ message: string }> {
    return await this.projectsService.deleteProject(id);
  }
}
