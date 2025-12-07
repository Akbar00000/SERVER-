import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array', { nullable: true })
  colors: string[];

  @Column('simple-array', { nullable: true })
  storageOptions: string[];

  @Column('json', { nullable: true })
  specs: any;

  @Column('text', { nullable: true })
  description: string;

  @OneToOne(() => Product, product => product.details, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;
}
