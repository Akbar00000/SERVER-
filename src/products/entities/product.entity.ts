import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { ProductDetails } from './product-details.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  image: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToOne(() => ProductDetails, (details) => details.product, { cascade: true, eager: true })
  @JoinColumn()
  details: ProductDetails;
}
