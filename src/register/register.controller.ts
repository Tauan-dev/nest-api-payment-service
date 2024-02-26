import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDTO } from './dto/createuser.dto';
import { CreateSalesmanDTO } from './dto/createsalesman.dto';
import { CreateProductDTO } from './dto/createproduct.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('user')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.registerService.createUser(createUserDTO);
  }

  @Post('salesman')
  async createSalesman(@Body() createSalesmanDTO: CreateSalesmanDTO) {
    return this.registerService.createSalesman(createSalesmanDTO);
  }

  @Post('product')
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    return this.registerService.createProduct(createProductDTO);
  }

  @Post('market/:cnpj/:id/:addToCart/:cpf')
  async marketCar(
    @Param('cnpj') cnpj: string,
    @Param('id') id: number,
    @Param('addToCart') addToCart: boolean,
    @Param('cpf') cpf: string,
  ) {
    return this.registerService.marketCar(cnpj, id, addToCart, cpf);
  }

  @Post('payment/:wallet/:amount/:cpf/:cnpj/')
  async payment(
    @Param('wallet') wallet: number,
    @Param('amount') amount: number,
    @Param('cpf') cpf: string,
    @Param('cnpj') cnpj: string,
  ) {
    return this.registerService.payment(wallet, amount, cpf, cnpj);
  }
}
