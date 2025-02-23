import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Administrador' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'admin@teste.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '01001000',
    description:
      'CEP utilizado para buscar a localização (latitude e longitude)',
  })
  @IsString()
  cep: string;
}
