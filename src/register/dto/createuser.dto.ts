import { IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly cpf: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsNumber()
  readonly wallet: number;
}
