import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    try {
      const organization = this.organizationRepository.create(
        createOrganizationDto,
      );
      return await this.organizationRepository.save(organization);
    } catch (error) {
      throw new BadRequestException({
        message: 'Error creating organization',
        error: error.message,
      });
    }
  }

  async getOrganizations(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    organizations: Organization[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const skip = (page - 1) * limit;
    const [organizations, total] =
      await this.organizationRepository.findAndCount({
        skip,
        take: limit,
      });
    return {
      organizations,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    };
  }

  async getOrganizationById(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    return organization;
  }

  async updateOrganization(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    let organization = await this.getOrganizationById(id);
    organization = { ...organization, ...updateOrganizationDto };
    return await this.organizationRepository.save(organization);
  }

  async deleteOrganization(id: string): Promise<{ message: string }> {
    const organization = await this.getOrganizationById(id);
    await this.organizationRepository.remove(organization);
    return { message: 'Organization deleted successfully' };
  }

  async searchOrganizations(name: string): Promise<Organization[]> {
    return await this.organizationRepository.find({
      where: { name: ILike(`%${name}%`) },
      select: ['id', 'name'],
    });
  }
}
