import { IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly type: string;

  @IsNumber()
  readonly price: number;
}
