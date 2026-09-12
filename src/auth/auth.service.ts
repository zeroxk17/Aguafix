import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/CreateUserDto';
import { LoginDto } from './dtos/LoginDto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(createUserDto.email);
    if (existing) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const hashedPassword = bcryptjs.hashSync(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const { password: _, ...result } = user;
    return { message: 'Usuario registrado exitosamente', user: result };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || !bcryptjs.compareSync(loginDto.password, user.password)) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const { password: _, ...result } = user;
    return { message: 'Inicio de sesión exitoso', user: result };
  }
}
