import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { CreateProductDTO } from './createproduct.dto';

export class CreateSalesmanDTO {
  @IsString()
  cnpj: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  amount: number;

  @Type(() => CreateProductDTO)
  products: CreateProductDTO[];
}
