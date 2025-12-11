import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Banner {
  @ApiProperty({ example: "a124b1d1-62c2-4fcd-9aac-d2u1a123aa12" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: "Black Friday Sale" })
  @Column()
  @IsString()
  title: string;

  @ApiProperty({ example: "Discounts up to 70%", required: false })
  @Column('text', { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "https://example.com/banner.jpg" })
  @Column()
  @IsString()
  image: string;

  @ApiProperty({ example: "https://shop.com", required: false })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  link?: string;
}
