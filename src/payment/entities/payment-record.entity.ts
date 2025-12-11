import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('payments')
export class Payment {
  @ApiProperty({ example: 'a1b2c3d4-5678-90ef-gh12-345678ijklmn' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => Order })
  @ManyToOne(() => Order, { eager: true })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ApiProperty({ example: 120.5 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({ example: 'manual', description: 'Payment method' })
  @Column({ type: 'varchar', length: 50, default: 'manual' })
  method: string; 

  @ApiProperty({ example: 'paid', description: 'Payment status' })
  @Column({ type: 'varchar', length: 20, default: 'paid' })
  status: string;

  @ApiProperty({ type: String, example: new Date().toISOString() })
  @CreateDateColumn()
  createdAt: Date;
}
