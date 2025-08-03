import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    findOne(id: string): Promise<UserResponseDto>;
    findByEmail(email: string): Promise<UserResponseDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: string): Promise<UserResponseDto>;
    toggleUserStatus(id: string): Promise<UserResponseDto>;
    findRawByEmail(email: string): Promise<{
        email: string;
        password: string;
        name: string;
        phone: string;
        role: import(".prisma/client").$Enums.UserRole;
        isActive: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
