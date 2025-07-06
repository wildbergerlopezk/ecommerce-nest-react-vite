import { UserRole } from '@prisma/client';

export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  phone: string;
  isActive: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.phone = user.phone;
    this.isActive = user.isActive;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}