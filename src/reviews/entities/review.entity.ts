import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Review {
  @ApiProperty({ example: 'b21586aa-799f-41bd-9ba3-23f1be64d1a2' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 5 })
  @Column({ type: 'int' })
  score: number;

  @ApiProperty({ example: 'Excellent product!', required: false })
  @Column({ type: 'text', nullable: true })
  comment: string;

  @ApiProperty({ example: '2025-12-10T14:50:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  product: Product;
}
