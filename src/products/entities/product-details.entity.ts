    
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;

  @Column("json", { nullable: true })
  colors: string[];

  @Column("json", { nullable: true })
  storageOptions: string[];

  @Column("json", { nullable: true })
  specs: any;

  @Column("text", { nullable: true })
  description: string;
}
