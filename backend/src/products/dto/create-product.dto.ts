import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsNumber,
  IsBoolean,
  IsEnum,
  Min,
  MaxLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Currency {
  PYG = 'PYG',
  USD = 'USD',
  EUR = 'EUR',
}

export class CreateProductDto {
  @IsOptional()
  @IsUUID('4', { message: 'subcategoryId debe ser un UUID válido' })
  subcategoryId?: string;

  @IsOptional()
  @IsString({ message: 'subcategorySlug debe ser una cadena' })
  @MaxLength(100, { message: 'subcategorySlug no debe superar los 100 caracteres' })
  subcategorySlug?: string;

  @IsString({ message: 'name debe ser una cadena' })
  @IsNotEmpty({ message: 'name es obligatorio' })
  @MaxLength(100, { message: 'name no debe superar los 100 caracteres' })
  name: string;

  @IsString({ message: 'description debe ser una cadena' })
  @IsOptional()
  @MaxLength(500, { message: 'description no debe superar los 500 caracteres' })
  description?: string;

  @IsString({ message: 'brand debe ser una cadena' })
  @IsNotEmpty({ message: 'brand es obligatorio' })
  @MaxLength(50, { message: 'brand no debe superar los 50 caracteres' })
  brand: string;

  @IsNumber({}, { message: 'weight debe ser un número' })
  @Min(0, { message: 'weight no puede ser negativo' })
  @IsOptional()
  @Type(() => Number)
  weight?: number;

  @IsNumber({}, { message: 'height debe ser un número' })
  @Min(0, { message: 'height no puede ser negativo' })
  @IsOptional()
  @Type(() => Number)
  height?: number;

  @IsNumber({}, { message: 'width debe ser un número' })
  @Min(0, { message: 'width no puede ser negativo' })
  @IsOptional()
  @Type(() => Number)
  width?: number;

  @IsNumber({}, { message: 'depth debe ser un número' })
  @Min(0, { message: 'depth no puede ser negativo' })
  @IsOptional()
  @Type(() => Number)
  depth?: number;

  @IsNumber({}, { message: 'price debe ser un número' })
  @Min(0.01, { message: 'price debe ser mayor a 0' })
  @Type(() => Number)
  price: number;

  @IsEnum(Currency, { message: 'currency debe ser uno de: PYG, USD, EUR' })
  @IsOptional()
  currency?: Currency = Currency.PYG;

  @IsNumber({}, { message: 'stock debe ser un número' })
  @Min(0, { message: 'stock no puede ser negativo' })
  @IsOptional()
  @Type(() => Number)
  stock?: number = 0;

  @IsBoolean({ message: 'isActive debe ser un booleano' })
  @IsOptional()
  isActive?: boolean = true;
}
