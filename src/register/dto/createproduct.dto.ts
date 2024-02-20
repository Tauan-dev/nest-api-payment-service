import { IsNumber, IsString } from 'class-validator';

export class CreateProduct {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly type: string;

  @IsNumber()
  readonly price: string;
}
