import { 
  IsString, 
  IsOptional, 
  ValidateIf, 
  MinLength, 
  MaxLength, 
  Matches, 
  IsUUID 
} from 'class-validator';

export class CreateSubcategoryDto {
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

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
