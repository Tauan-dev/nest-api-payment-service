import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Product } from './product.entity';
import { Salesman } from './salesman.entity';

@Entity('shopping')
export class ShoppingCart {
  push(product: Product) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shoppingValue: number;

  @OneToOne(() => Users, (users) => users.shoppingcart)
  @JoinColumn()
  users: Users;

  @ManyToOne(() => Salesman, (salesman) => salesman.shoppingcart)
  @JoinColumn()
  salesman: Salesman;
}
