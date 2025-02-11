import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrganizationType } from '../entities/organization.entity';

class SocialMediaDto {
  @ApiProperty({ example: 'facebook.com/organization', required: false })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiProperty({ example: 'instagram.com/organization', required: false })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiProperty({
    example: 'linkedin.com/company/organization',
    required: false,
  })
  @IsOptional()
  @IsString()
  linkedin?: string;
}

class LocationDto {
  @ApiProperty({ example: -23.5505 })
  @IsNotEmpty()
  lat: number;

  @ApiProperty({ example: -46.6333 })
  @IsNotEmpty()
  lng: number;
}

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Nome da Organização' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: OrganizationType, example: OrganizationType.NGO })
  @IsEnum(OrganizationType)
  type: OrganizationType;

  @ApiProperty({ example: 'Descrição da organização' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '+55 11 12345678' })
  @IsNotEmpty()
  contact: string;

  @ApiProperty({ example: 'http://organization.com', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ type: SocialMediaDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  social_media?: SocialMediaDto;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty({ example: ['educação', 'saúde'], isArray: true })
  @IsArray()
  @IsString({ each: true })
  areas_of_activity: string[];
}
