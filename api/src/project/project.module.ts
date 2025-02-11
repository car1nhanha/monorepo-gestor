import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { Project } from './entities/project.entity';
import { ProjectsController } from './project.controller';
import { ProjectsService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Organization])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
