import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ShoppingCart } from './shoppingCar.entity';

@Entity('users')
export class Users {
  @PrimaryColumn()
  cpf: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  wallet: number;

  @OneToOne(() => ShoppingCart, (shoppingcart) => shoppingcart.users)
  @JoinColumn()
  shoppingcart: ShoppingCart;
}
