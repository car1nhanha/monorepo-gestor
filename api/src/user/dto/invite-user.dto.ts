import { ApiProperty } from '@nestjs/swagger';

export class InviteUserDto {
  @ApiProperty({ example: 'invitee@example.com' })
  email: string;
}
