import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Salesman } from './salesman.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @ManyToOne(() => Salesman, (salesman) => salesman.product, {
    cascade: true,
  })
  salesman: Salesman;
}
