import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
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
