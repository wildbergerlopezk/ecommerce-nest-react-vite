import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        email: string;
        name: string;
        phone: string;
        role: import(".prisma/client").$Enums.UserRole;
        isActive: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            email: string;
            name: string;
            phone: string;
            role: import(".prisma/client").$Enums.UserRole;
            isActive: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
