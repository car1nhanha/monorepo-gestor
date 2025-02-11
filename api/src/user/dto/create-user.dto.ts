import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'joao.silva@example.com' })
  @IsString()
  email: string;

  @ApiProperty({
    example: '01001000',
    description:
      'CEP utilizado para buscar a localização (latitude e longitude)',
  })
  @IsString()
  cep: string;
}
