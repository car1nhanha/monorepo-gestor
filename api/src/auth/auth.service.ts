import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationUtil } from 'src/common/utils/location.util';
import { User, UserRole } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase(), role: UserRole.ADMIN },
    });

    if (!user) {
      throw new UnauthorizedException('Authentication failed');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedException('Authentication failed');
    }

    const payload = { id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { name, email, password, cep } = registerDto;

    const address = await LocationUtil.buscarCep(cep);
    if (!address.cep) throw new BadRequestException('Erro ao buscar o CEP.');

    const { results } = await LocationUtil.buscarGeolocalizacao(cep);
    if (!results || results.length === 0)
      throw new BadRequestException('Erro ao buscar a geolocalização.');

    const location = {
      lat: results[0].geometry.lat,
      lng: results[0].geometry.lng,
    };

    const existingUser = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) throw new BadRequestException('User already exists');

    const user = this.userRepository.create({
      name,
      email: email.toLowerCase(),
      password,
      location,
      role: UserRole.ADMIN,
      address: {
        street: address.logradouro,
        city: address.localidade,
        state: address.uf,
        postal_code: address.cep,
      },
    });
    await this.userRepository.save(user);

    return { message: 'Admin registered successfully' };
  }
}
