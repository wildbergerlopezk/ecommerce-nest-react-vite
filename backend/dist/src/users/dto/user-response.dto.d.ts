import { UserRole } from '@prisma/client';
export declare class UserResponseDto {
    id: string;
    email: string;
    name: string;
    phone: string;
    isActive: boolean;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    constructor(user: any);
}
