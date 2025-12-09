import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() addressName: string;
  @Column() addressFull: string;
  @Column() phone: string;
  @Column() city: string;
  @Column() zip: string;

  @Column() shippingMethod: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) shippingPrice: number;
  @Column() shippingDate: string;

  
  @Column({ type: 'varchar', nullable: true })
  promoCode: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'json', nullable: true, default: [] })
  items: any[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalPrice: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  estimatedTax: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  estimatedShipping: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  finalPrice: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ type: 'timestamp', nullable: true })
  paidAt: Date | null;
}
