import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
