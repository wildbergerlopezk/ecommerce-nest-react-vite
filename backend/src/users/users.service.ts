// src/users/users.service.ts
import { Injectable, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      // Verificar si el email ya existe
      const existingUserByEmail = await this.prisma.user.findUnique({
        where: { email: createUserDto.email }
      });

      if (existingUserByEmail) {
        throw new ConflictException('El email ya está registrado');
      }

      // Verificar si el teléfono ya existe
      const existingUserByPhone = await this.prisma.user.findUnique({
        where: { phone: createUserDto.phone }
      });

      if (existingUserByPhone) {
        throw new ConflictException('El teléfono ya está registrado');
      }

      // Hash de la contraseña
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

      // Crear el usuario
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      return new UserResponseDto(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    try {
      const users = await this.prisma.user.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      return users.map(user => new UserResponseDto(user));
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }

  async findOne(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return new UserResponseDto(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener el usuario');
    }
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return new UserResponseDto(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener el usuario');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    try {
      // Verificar si el usuario existe
      const existingUser = await this.prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Verificar conflictos de email si se está actualizando
      if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
        const userWithEmail = await this.prisma.user.findUnique({
          where: { email: updateUserDto.email }
        });

        if (userWithEmail) {
          throw new ConflictException('El email ya está registrado');
        }
      }

      // Verificar conflictos de teléfono si se está actualizando
      if (updateUserDto.phone && updateUserDto.phone !== existingUser.phone) {
        const userWithPhone = await this.prisma.user.findUnique({
          where: { phone: updateUserDto.phone }
        });

        if (userWithPhone) {
          throw new ConflictException('El teléfono ya está registrado');
        }
      }

      // Hash de la nueva contraseña si se está actualizando
      let dataToUpdate = { ...updateUserDto };
      if (updateUserDto.password) {
        const saltRounds = 12;
        dataToUpdate.password = await bcrypt.hash(updateUserDto.password, saltRounds);
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: dataToUpdate,
      });

      return new UserResponseDto(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async remove(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id }
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const deletedUser = await this.prisma.user.delete({
        where: { id },
      });

      return new UserResponseDto(deletedUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }

  async toggleUserStatus(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id }
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { isActive: !user.isActive },
      });

      return new UserResponseDto(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al cambiar el estado del usuario');
    }
  }

  async findRawByEmail(email: string) {
  return this.prisma.user.findUnique({
    where: { email },
  });
  }

}