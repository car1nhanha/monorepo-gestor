import { ApiProperty } from '@nestjs/swagger';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  VOLUNTEER = 'volunteer',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @ApiProperty({
    example: 'f1b7d4e0-4b8c-4c0b-9d7c-2c1a7c5b8e5d',
    description: 'The unique identifier of the user',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'teste@teste.com',
    description: 'The email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: {
      street: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      postal_code: '01310-100',
    },
    description:
      'The address of the user, including street, city, state and postal code',
  })
  @Column({ type: 'simple-json', nullable: true })
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
  };

  @ApiProperty({
    example: { lat: 0, lng: 0 },
    description: 'The location of the user',
  })
  @Column({ type: 'simple-json', nullable: true })
  location?: {
    lat: number;
    lng: number;
  };

  @ApiProperty({
    example: 'admin',
    description: 'The role of the user',
  })
  @Column({ default: UserRole.ADMIN })
  role: UserRole;

  @ApiProperty({
    example: '123456',
    description: 'The password of the user',
  })
  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'The date when the user was created',
  })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    if (!this.password) return false;
    return argon2.verify(this.password, candidatePassword);
  }
}
