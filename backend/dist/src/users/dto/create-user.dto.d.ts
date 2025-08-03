import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    phone: string;
    role?: UserRole;
}
