import { IsNumber } from 'class-validator';

export class ShoppingCartDTO {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly shoopingvalue: number;
}
