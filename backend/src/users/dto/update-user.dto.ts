import { IsEmail, IsOptional, IsString, IsEnum, IsBoolean, MinLength, MaxLength, Matches } from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(50, { message: 'La contraseña no puede tener más de 50 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'  
    })

  password?: string;

    @IsOptional()
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
    })
    name?: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @Matches(/^[+]?[\d\s\-()]{8,15}$/, {
    message: 'El teléfono debe tener un formato válido'
  })
  phone?: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un valor booleano' })
  isActive?: boolean;

  @IsOptional()
  @IsEnum(UserRole, { message: 'El rol debe ser CUSTOMER, ADMIN o SELLER' })
  role?: UserRole;
}