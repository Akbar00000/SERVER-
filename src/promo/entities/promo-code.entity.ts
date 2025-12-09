import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PromoCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column('float')
  discountPercent: number;
}
