import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('salesmans')
export class Salesman {
  @PrimaryGeneratedColumn()
  cnpj: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
