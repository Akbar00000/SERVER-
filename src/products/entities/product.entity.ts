import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { ProductDetails } from './product-details.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty({ example: 'b21586aa-799f-41bd-9ba3-23f1be64d1a2' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'iPhone 15', description: 'Product title' })
  @Column()
  title: string;

  @ApiPropertyOptional({ example: 'Latest Apple smartphone', description: 'Short description' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 999.99, description: 'Product price' })
  @Column('decimal')
  price: number;

  @ApiPropertyOptional({ example: 'iphone15.png', description: 'Product image URL' })
  @Column({ nullable: true })
  image: string;

  @ApiPropertyOptional({ example: ['smartphone', 'apple'], description: 'Product tags' })
  @Column('simple-array', { nullable: true })
  tags: string[];

  @ApiProperty({ description: 'Product category' })
  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @ApiPropertyOptional({ type: ProductDetails })
  @OneToOne(() => ProductDetails, details => details.product, { cascade: true, eager: true })
  @JoinColumn()
  details: ProductDetails;
}
