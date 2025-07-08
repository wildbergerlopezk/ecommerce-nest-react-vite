import {
  IsString,
  IsOptional,
  IsUUID,
  IsNumber,
  IsBoolean,
  IsEnum,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Currency } from './create-product.dto'; // o definirlo acá también

export class UpdateProductDto {
  @IsOptional()
  @IsUUID('4', { message: 'subcategoryId debe ser un UUID válido' })
  subcategoryId?: string;

  @IsOptional()
  @IsString({ message: 'subcategorySlug debe ser una cadena' })
  @MaxLength(100, { message: 'subcategorySlug no debe superar los 100 caracteres' })
  subcategorySlug?: string;

  @IsOptional()
  @IsString({ message: 'name debe ser una cadena' })
  @MaxLength(100, { message: 'name no debe superar los 100 caracteres' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'description debe ser una cadena' })
  @MaxLength(500, { message: 'description no debe superar los 500 caracteres' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'brand debe ser una cadena' })
  @MaxLength(50, { message: 'brand no debe superar los 50 caracteres' })
  brand?: string;

  @IsOptional()
  @IsNumber({}, { message: 'weight debe ser un número' })
  @Min(0, { message: 'weight no puede ser negativo' })
  @Type(() => Number)
  weight?: number;

  @IsOptional()
  @IsNumber({}, { message: 'height debe ser un número' })
  @Min(0, { message: 'height no puede ser negativo' })
  @Type(() => Number)
  height?: number;

  @IsOptional()
  @IsNumber({}, { message: 'width debe ser un número' })
  @Min(0, { message: 'width no puede ser negativo' })
  @Type(() => Number)
  width?: number;

  @IsOptional()
  @IsNumber({}, { message: 'depth debe ser un número' })
  @Min(0, { message: 'depth no puede ser negativo' })
  @Type(() => Number)
  depth?: number;

  @IsOptional()
  @IsNumber({}, { message: 'price debe ser un número' })
  @Min(0.01, { message: 'price debe ser mayor a 0' })
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsEnum(Currency, { message: 'currency debe ser uno de: PYG, USD, EUR' })
  currency?: Currency;

  @IsOptional()
  @IsNumber({}, { message: 'stock debe ser un número' })
  @Min(0, { message: 'stock no puede ser negativo' })
  @Type(() => Number)
  stock?: number;

  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un booleano' })
  isActive?: boolean;
}
