import { IsInt, Min } from 'class-validator';

export class UpdateCartDto {
  @IsInt({ message: 'La cantidad debe ser un número entero.' })
  @Min(1, { message: 'La cantidad mínima es 1.' })
  quantity: number;
}

