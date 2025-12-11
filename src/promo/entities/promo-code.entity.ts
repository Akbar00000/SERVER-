import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PromoCode {
  @ApiProperty({ example: 'b21586aa-799f-41bd-9ba3-23f1be64d1a2' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'BLACKFRIDAY', description: 'Unique promo code' })
  @Column({ unique: true })
  code: string;

  @ApiProperty({ example: 15, description: 'Discount percentage' })
  @Column('float')
  discountPercent: number;
}
