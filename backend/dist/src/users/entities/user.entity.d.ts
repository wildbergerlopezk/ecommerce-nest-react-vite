export declare enum UserRole {
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN",
    SELLER = "SELLER"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    isActive: boolean;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
}
