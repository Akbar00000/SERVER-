import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ProductDetails } from './product-details.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  title: string;

  @Column('text', { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column('decimal')
  @IsNumber()
  price: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Column('simple-array', { default: '' })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  @JoinColumn()
  category: Category;

  @OneToOne(() => ProductDetails, details => details.product)
  details: ProductDetails;


}


