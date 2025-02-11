import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
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
import { CreateUserDto } from './dto/create-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Cria um volunteer (user)' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    type: User,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtém todos os volunteers (users) com paginação' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getUsers(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.usersService.getUsers(Number(page), Number(limit));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('locations')
  @ApiOperation({
    summary: 'Obtém as localizações de todos os volunteers (users)',
  })
  async getLocations() {
    return await this.usersService.getLocations();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtém um volunteer (user) pelo id' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um volunteer (user)' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um volunteer (user)' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('invite')
  @ApiOperation({ summary: 'Envia convite para um volunteer' })
  async inviteUser(
    @Headers('x-user-id') xUserId: string,
    @Body() inviteUserDto: InviteUserDto,
  ) {
    return await this.usersService.inviteUser(xUserId, inviteUserDto);
  }
}
