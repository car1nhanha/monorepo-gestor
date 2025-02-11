import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Project Title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Project description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'organization-uuid',
    description: 'UUID of the organization',
  })
  @IsNotEmpty()
  @IsString()
  organization_id: string;

  @ApiProperty({
    example: 'active',
    enum: ['active', 'completed', 'planned'],
  })
  @IsIn(['active', 'completed', 'planned'])
  status: string;

  @ApiProperty({ example: '2025-03-10T00:00:00Z' })
  @IsDateString()
  start_date: Date;

  @ApiProperty({ example: '2025-04-10T00:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  end_date?: Date;

  @ApiProperty({ example: 5 })
  @IsNumber()
  volunteers_needed: number;

  @ApiProperty({ example: 0, default: 0, required: false })
  @IsOptional()
  @IsNumber()
  current_volunteers?: number;

  @ApiProperty({ example: ['skill1', 'skill2'], isArray: true })
  @IsArray()
  @IsString({ each: true })
  skills_required: string[];
}
