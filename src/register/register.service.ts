import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Salesman } from './entities/salesman.entity';
import { CreateUserDTO } from './dto/createuser.dto';
import { UpdateUserDTO } from './dto/updateuser.dto';
import { CreateSalesmanDTO } from './dto/createsalesman.dto';
import { Product } from './entities/product.entity';
import { UpdateSalesmanDTO } from './dto/updatesalesman.dto';
import { CreateProductDTO } from './dto/createproduct.dto';
import { ShoppingCart } from './entities/shoppingCar.entity';

@Injectable()
export class RegisterService {
  shoppingValue: number;
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(Salesman)
    private readonly salesmanRepository: Repository<Salesman>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
  ) {}

  async findAllUSer() {
    return await this.userRepository.find();
  }

  async findAllSalesman() {
    return await this.salesmanRepository.find({
      relations: ['product'],
    });
  }

  async findAllProduct() {
    return await this.productRepository.find();
  }

  async createUser(createUser: CreateUserDTO) {
    const user = this.userRepository.create(createUser);
    return this.userRepository.save(user);
  }

  async updateUser(cpf: string, updateUser: UpdateUserDTO) {
    const user = await this.userRepository.preload({
      ...updateUser,
      cpf,
    });
    if (!user) {
      throw new NotFoundException(`Usuário com CPF ${cpf}não cadastrado!`);
    }
    return this.userRepository.save(user);
  }

  async createSalesman(createSalesman: CreateSalesmanDTO) {
    const products = await Promise.all(
      createSalesman.products.map(async (product) => {
        const productName = product.name;
        const loadedProduct = await this.preloadProductByName(productName);
        return loadedProduct;
      }),
    );

    const salesmanData = { ...createSalesman, products };

    const salesman = this.salesmanRepository.create(salesmanData);

    return this.salesmanRepository.save(salesman);
  }

  async updateSalesman(cnpj: string, updateSalesman: UpdateSalesmanDTO) {
    const salesman = await this.salesmanRepository.preload({
      ...updateSalesman,
      cnpj,
    });

    if (!salesman) {
      throw new NotFoundException(`Lojista com CNPJ ${cnpj} não cadastrado!`);
    }

    return this.salesmanRepository.save(salesman);
  }

  async createProduct(createProduct: CreateProductDTO) {
    const product = this.productRepository.create(createProduct);
    return this.productRepository.save(product);
  }

  async checkWallet(cpf: string) {
    const user = await this.userRepository.findOne({
      where: { cpf },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.wallet > 0) {
      return `${user.name} tem dinheiro na carteira! Posteriormente realizar checagem se pode ser feito a transação`;
    }
  }

  async marketCar(cnpj: string, id: number, addToCar: boolean, cpf: string) {
    const salesman = await this.salesmanRepository.findOne({
      where: { cnpj },
      relations: ['products'],
    });

    if (!salesman) {
      throw new NotFoundException('Vendedor não cadastrado');
    }
    const product = salesman.product.find((product) => product.id === id);

    const user = await this.userRepository.findOne({
      where: { cpf },
      relations: ['shopping'],
    });

    if (!user) {
      throw new NotFoundException('Usuário  não cadastrado');
    }

    if (product && addToCar) {
      user.shoppingcart.shoppingValue += product.price;
      await this.shoppingCartRepository.save(user.shoppingcart);
    }
    return product.salesman.cnpj;
  }

  async payment(wallet: number, amount: number, cpf: string, cnpj: string) {
    let car: number = 0;
    const user = await this.userRepository.findOne({
      where: { cpf },
      relations: ['shopping'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não cadastrado');
    }

    const salesman = await this.salesmanRepository.findOne({
      where: { cnpj },
    });

    this.checkWallet(cpf);

    let money = user.wallet;

    car = user.shoppingcart.shoppingValue;

    if (car === 0) {
      throw new NotFoundException('Carrinho Vazio');
    }

    if (money > car) {
      money = -car;
      salesman.amount = +car;
    }
  }

  private async preloadProductByName(name: string): Promise<Product> {
    const products = await this.productRepository.findOne({
      where: { name },
    });
    if (products) {
      return products;
    }
    throw new NotFoundException('Product not found');
  }
}
