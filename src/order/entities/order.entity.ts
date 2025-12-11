import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @ApiProperty({ example: "b21586aa-799f-41bd-9ba3-23f1be64d1a2" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: "Home", description: "Short name for address" })
  @Column()
  addressName: string;

  @ApiProperty({ example: "123 Main St, Apt 4", description: "Full address" })
  @Column()
  addressFull: string;

  @ApiProperty({ example: "+998901234567", description: "Customer phone number" })
  @Column()
  phone: string;

  @ApiProperty({ example: "Tashkent" })
  @Column()
  city: string;

  @ApiProperty({ example: "100000" })
  @Column()
  zip: string;

  @ApiProperty({ example: "Courier", description: "Shipping method" })
  @Column()
  shippingMethod: string;

  @ApiProperty({ example: 15.5, description: "Shipping price" })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  shippingPrice: number;

  @ApiProperty({ example: "2025-12-15", description: "Expected shipping date" })
  @Column()
  shippingDate: string;

  @ApiProperty({ example: "BLACKFRIDAY", required: false })
  @Column({ type: 'varchar', nullable: true })
  promoCode: string | null;

  @ApiProperty({ example: 10, required: false })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountAmount: number;

  @ApiProperty({ type: [Object], default: [], description: "List of ordered items" })
  @Column({ type: 'json', nullable: true, default: [] })
  items: any[];

  @ApiProperty({ example: 100 })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @ApiProperty({ example: 10 })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  estimatedTax: number;

  @ApiProperty({ example: 5 })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  estimatedShipping: number;

  @ApiProperty({ example: 85 })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  finalPrice: number;

  @ApiProperty({ example: 'pending' })
  @Column({ default: 'pending' })
  status: string;

  @ApiProperty({ example: false })
  @Column({ default: false })
  isPaid: boolean;

  @ApiProperty({ required: false, nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  paidAt: Date | null;
}
