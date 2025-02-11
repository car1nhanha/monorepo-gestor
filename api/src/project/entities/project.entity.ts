import { ApiProperty } from '@nestjs/swagger';
import { Organization } from 'src/organization/entities/organization.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @ApiProperty({
    example: 'f1b7d4e0-4b8c-4c0b-9d7c-2c1a7c5b8e5d',
    description: 'The unique identifier of the project',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Project title',
    description: 'The title of the project',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'Project description',
    description: 'The description of the project',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: 'f1b7d4e0-4b8c-4c0b-9d7c-2c1a7c5b8e5d',
    description: 'The unique identifier of the organization',
  })
  @ManyToOne(() => Organization, { eager: true })
  organization: Organization;

  @ApiProperty({
    example: 'active',
    description: 'The status of the project',
  })
  @Column({ type: 'varchar', default: 'active' })
  status: string;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The start date of the project',
  })
  @Column()
  @CreateDateColumn({ name: 'start_date' })
  start_date: Date;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The end date of the project',
  })
  @Column()
  @CreateDateColumn({ name: 'end_date', nullable: true })
  end_date?: Date;

  @ApiProperty({
    example: 10,
    description: 'The number of volunteers needed for the project',
  })
  @Column()
  volunteers_needed: number;

  @ApiProperty({
    example: 0,
    description: 'The current number of volunteers for the project',
  })
  @Column({ default: 0 })
  current_volunteers: number;

  @ApiProperty({
    example: ['skill1', 'skill2'],
    description: 'The skills required for the project',
  })
  @Column('simple-array')
  skills_required: string[];

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'The date when the project was created',
  })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
