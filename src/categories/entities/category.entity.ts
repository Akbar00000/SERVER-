import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty({ example: "b21586aa-799f-41bd-9ba3-23f1be64d1a2" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: "Clothes" })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({ example: "Men and Women clothing", required: false })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "https://example.com/image.jpg", required: false })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ type: () => [Product], required: false })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
