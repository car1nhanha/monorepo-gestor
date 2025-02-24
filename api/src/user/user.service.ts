import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/common/email/email.service';
import { LocationUtil } from 'src/common/utils/location.util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { cep, ...userData } = createUserDto;

      const userExists = await this.getUserByEmail(userData.email);
      if (userExists) throw new BadRequestException('Usuário já cadastrado');

      const address = await LocationUtil.buscarCep(cep);
      console.log({ address });
      if (!address.cep) throw new BadRequestException('Erro ao buscar o CEP.');

      const { results } = await LocationUtil.buscarGeolocalizacao(cep);
      if (!results || results.length === 0) {
        throw new BadRequestException('CEP inválido.');
      }
      const location = {
        lat: results[0].geometry.lat,
        lng: results[0].geometry.lng,
      };

      const user = this.userRepository.create({
        ...userData,
        location,
        role: UserRole.VOLUNTEER,
        address: {
          street: address.logradouro,
          city: address.localidade,
          state: address.uf,
          postal_code: address.cep,
        },
      });
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao criar usuário',
        error: error.message,
      });
    }
  }

  public async getUsers(
    page: number,
    limit: number,
  ): Promise<{
    users: User[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const skip = (page - 1) * limit;
    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take: limit,
    });
    return {
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    };
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.getUserById(id);
    if (updateUserDto.cep) {
      const geolocationResponse = await LocationUtil.buscarGeolocalizacao(
        updateUserDto.cep,
      );
      const results = geolocationResponse.results;
      if (!results || results.length === 0) {
        throw new BadRequestException('CEP inválido.');
      }
      user.location = {
        lat: results[0].geometry.lat,
        lng: results[0].geometry.lng,
      };
      delete updateUserDto.cep;
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  public async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
    return { message: 'Usuário removido com sucesso' };
  }

  public async getLocations(): Promise<{ users: Partial<User>[] }> {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'location'],
    });
    return { users };
  }

  public async inviteUser(
    indicatorId: string,
    inviteUserDto: InviteUserDto,
  ): Promise<{ message: string }> {
    const indicator = await this.getUserById(indicatorId);
    if (!indicator) {
      throw new NotFoundException('Indicador não encontrado');
    }
    try {
      const { email } = inviteUserDto;
      const appUrl = this.configService.get('VITE_API_URL');
      const replacements = {
        name: email.split('@')[0],
        inviter: indicator.name,
        registration_link: `${appUrl}/self-register?indicator=${indicatorId}`,
      };
      const dataToSend = {
        to: email.toLowerCase(),
        subject: 'Bem-vindo!',
        templateName: 'welcome',
        replacements,
      };
      await EmailService.sendEmail(dataToSend);
      return { message: `Volunteer invited: ${email}` };
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao enviar convite',
        error: error.message,
      });
    }
  }

  private async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
