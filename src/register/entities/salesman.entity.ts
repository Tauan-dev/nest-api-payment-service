import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { ShoppingCart } from './shoppingCar.entity';

@Entity('salesmans')
export class Salesman {
  @PrimaryGeneratedColumn()
  cnpj: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  amount: number;

  @OneToMany(() => Product, (product) => product.salesman, {
    cascade: true,
  })
  product: Product[];

  @OneToMany(() => ShoppingCart, (shoppingcart) => shoppingcart.salesman, {
    cascade: true,
  })
  shoppingcart: ShoppingCart;
}
