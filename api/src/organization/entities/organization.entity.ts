import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OrganizationType {
  NGO = 'ngo',
  ASSOCIATION = 'association',
}

@Entity('organizations')
export class Organization {
  @ApiProperty({
    example: 'f1b7d4e0-4b8c-4c0b-9d7c-2c1a7c5b8e5d',
    description: 'The unique identifier of the organization',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'My Organization',
    description: 'The name of the organization',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'ngo',
    description: 'The type of the organization',
  })
  @Column({ type: 'varchar', default: OrganizationType.NGO })
  type: OrganizationType;

  @ApiProperty({
    example: 'Description of my organization',
    description: 'The description of the organization',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: '123456789',
    description: 'The contact number of the organization',
  })
  @Column()
  contact: string;

  @ApiProperty({
    example: 'https://www.example.com',
    description: 'The website of the organization',
  })
  @Column({ nullable: true })
  website?: string;

  @ApiProperty({
    example: {
      facebook: 'https://www.facebook.com/example',
      instagram: 'https://www.instagram.com/example',
      linkedin: 'https://www.linkedin.com/example',
    },
    description: 'The social media of the organization',
  })
  @Column({ type: 'simple-json', nullable: true })
  social_media?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };

  @ApiProperty({
    example: {
      lat: 0,
      lng: 0,
    },
    description: 'The location of the organization',
  })
  @Column({ type: 'simple-json' })
  location: {
    lat: number;
    lng: number;
  };

  @ApiProperty({
    example: ['education', 'health'],
    description: 'The areas of activity of the organization',
  })
  @Column('simple-array')
  areas_of_activity: string[];

  @ApiProperty({
    example: 'f1b7d4e0-4b8c-4c0b-9d7c-2c1a7c5b8e5d',
    description: 'The unique identifier of the user who is the indicator',
  })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({
    example: {
      id: 'f1b7d4e0-4b8c-4c0b-9d7c-2c1a7c5b8e5d',
    },
    description: 'The user who is the indicator',
  })
  @ManyToOne(() => User, { nullable: true, eager: true })
  indicator?: User;
}
