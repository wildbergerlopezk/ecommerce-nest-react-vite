import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum, IsPhoneNumber, MinLength, MaxLength, Matches } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(50, { message: 'La contraseña no puede tener más de 50 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'})
  password: string;

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
    })
    name: string;


  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @Matches(/^[+]?[\d\s\-()]{8,15}$/, {
    message: 'El teléfono debe tener un formato válido'
  })
  phone: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'El rol debe ser CUSTOMER, ADMIN o SELLER' })
  role?: UserRole;
}