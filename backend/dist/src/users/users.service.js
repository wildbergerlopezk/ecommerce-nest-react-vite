"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_response_dto_1 = require("./dto/user-response.dto");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        try {
            const existingUserByEmail = await this.prisma.user.findUnique({
                where: { email: createUserDto.email }
            });
            if (existingUserByEmail) {
                throw new common_1.ConflictException('El email ya está registrado');
            }
            const existingUserByPhone = await this.prisma.user.findUnique({
                where: { phone: createUserDto.phone }
            });
            if (existingUserByPhone) {
                throw new common_1.ConflictException('El teléfono ya está registrado');
            }
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
            const user = await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword,
                },
            });
            return new user_response_dto_1.UserResponseDto(user);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al crear el usuario');
        }
    }
    async findAll() {
        try {
            const users = await this.prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return users.map(user => new user_response_dto_1.UserResponseDto(user));
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al obtener los usuarios');
        }
    }
    async findOne(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new common_1.NotFoundException('Usuario no encontrado');
            }
            return new user_response_dto_1.UserResponseDto(user);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al obtener el usuario');
        }
    }
    async findByEmail(email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new common_1.NotFoundException('Usuario no encontrado');
            }
            return new user_response_dto_1.UserResponseDto(user);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al obtener el usuario');
        }
    }
    async update(id, updateUserDto) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { id }
            });
            if (!existingUser) {
                throw new common_1.NotFoundException('Usuario no encontrado');
            }
            if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
                const userWithEmail = await this.prisma.user.findUnique({
                    where: { email: updateUserDto.email }
                });
                if (userWithEmail) {
                    throw new common_1.ConflictException('El email ya está registrado');
                }
            }
            if (updateUserDto.phone && updateUserDto.phone !== existingUser.phone) {
                const userWithPhone = await this.prisma.user.findUnique({
                    where: { phone: updateUserDto.phone }
                });
                if (userWithPhone) {
                    throw new common_1.ConflictException('El teléfono ya está registrado');
                }
            }
            let dataToUpdate = { ...updateUserDto };
            if (updateUserDto.password) {
                const saltRounds = 12;
                dataToUpdate.password = await bcrypt.hash(updateUserDto.password, saltRounds);
            }
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: dataToUpdate,
            });
            return new user_response_dto_1.UserResponseDto(updatedUser);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al actualizar el usuario');
        }
    }
    async remove(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id }
            });
            if (!user) {
                throw new common_1.NotFoundException('Usuario no encontrado');
            }
            const deletedUser = await this.prisma.user.delete({
                where: { id },
            });
            return new user_response_dto_1.UserResponseDto(deletedUser);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al eliminar el usuario');
        }
    }
    async toggleUserStatus(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id }
            });
            if (!user) {
                throw new common_1.NotFoundException('Usuario no encontrado');
            }
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: { isActive: !user.isActive },
            });
            return new user_response_dto_1.UserResponseDto(updatedUser);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al cambiar el estado del usuario');
        }
    }
    async findRawByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map