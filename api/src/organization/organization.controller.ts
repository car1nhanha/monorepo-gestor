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
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { OrganizationsService } from './organization.service';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({
    status: 201,
    description: 'Organization created successfully',
    type: Organization,
  })
  async createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return await this.organizationsService.createOrganization(
      createOrganizationDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get organizations with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getOrganizations(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.organizationsService.getOrganizations(
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by id' })
  @ApiParam({ name: 'id', description: 'Organization id' })
  async getOrganizationById(@Param('id') id: string): Promise<Organization> {
    return await this.organizationsService.getOrganizationById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update organization by id' })
  @ApiParam({ name: 'id', description: 'Organization id' })
  async updateOrganization(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    return await this.organizationsService.updateOrganization(
      id,
      updateOrganizationDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete organization by id' })
  @ApiParam({ name: 'id', description: 'Organization id' })
  async deleteOrganization(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return await this.organizationsService.deleteOrganization(id);
  }

  @Get('search/:name')
  @ApiOperation({ summary: 'Search organizations by name' })
  async searchOrganizations(@Param('name') name: string) {
    return await this.organizationsService.searchOrganizations(name);
  }
}
