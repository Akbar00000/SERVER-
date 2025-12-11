import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class ProductDetails {
  @ApiPropertyOptional({ example: ['red', 'blue'], description: 'Available colors' })
  @Column('simple-array', { nullable: true })
  colors: string[];

  @ApiPropertyOptional({ example: ['64GB', '128GB'], description: 'Available storage options' })
  @Column('simple-array', { nullable: true })
  storageOptions: string[];

  @ApiPropertyOptional({ example: { screen: '6.1 inch', battery: '3000mAh' }, description: 'Product specifications' })
  @Column('json', { nullable: true })
  specs: any;

  @ApiPropertyOptional({ example: 'High quality smartphone', description: 'Detailed description' })
  @Column('text', { nullable: true })
  description: string;

  @OneToOne(() => Product, product => product.details, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;

  @PrimaryGeneratedColumn('uuid')
  id: string;
}
