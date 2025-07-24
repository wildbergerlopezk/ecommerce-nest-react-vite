import { IsUUID, IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsUUID()
  @IsNotEmpty({ message: 'El ID del producto es obligatorio.' })
  productId: string;

  @IsInt({ message: 'La cantidad debe ser un número entero.' })
  @Min(1, { message: 'La cantidad mínima es 1.' })
  quantity: number;
}
