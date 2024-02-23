import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity('shopping')
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shoppingValue: number;

  @OneToOne(() => Users, (users) => users.shoppingcart)
  @JoinColumn()
  users: Users;
}
