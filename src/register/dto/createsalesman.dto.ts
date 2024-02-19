import { IsNumber, IsString } from 'class-validator';

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
}
