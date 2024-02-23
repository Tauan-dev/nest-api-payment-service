import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShoppingCart } from './shoppingCar.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
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
  shoppingCart: ShoppingCart;
    shoppingcart: any;
}
