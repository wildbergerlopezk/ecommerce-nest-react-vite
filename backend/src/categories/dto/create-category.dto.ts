import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre debe tener máximo 50 caracteres' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'La descripción puede tener máximo 255 caracteres' })
  description?: string;
}
