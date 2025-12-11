import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CartItem {
  @ApiProperty({ example: "d11c82fb-a1c1-4f8c-98d8-c281c41b4412" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product)
  product: Product;

  @ApiProperty({ example: 3 })
  @Column({ default: 1 })
  quantity: number;
}
