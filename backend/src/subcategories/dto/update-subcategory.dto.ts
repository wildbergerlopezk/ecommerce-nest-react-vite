import { 
  IsString, 
  IsUUID, 
  IsOptional, 
  MinLength, 
  MaxLength, 
  ValidateIf, 
  Matches 
} from 'class-validator';

export class UpdateSubcategoryDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre debe tener máximo 50 caracteres' })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'La descripción puede tener máximo 255 caracteres' })
  description?: string;

  @ValidateIf(o => !o.categorySlug)
  @IsUUID('4', { message: 'categoryId debe ser un UUID válido' })
  @IsOptional()
  categoryId?: string;

  @ValidateIf(o => !o.categoryId)
  @IsString()
  @MinLength(1, { message: 'categorySlug no puede estar vacío' })
  @MaxLength(100)
  @Matches(/\S/, { message: 'categorySlug no puede ser solo espacios en blanco' })
  @IsOptional()
  categorySlug?: string;
}
