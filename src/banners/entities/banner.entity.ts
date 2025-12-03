import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsOptional } from 'class-validator';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  title: string;

  @Column('text', { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column()
  @IsString()
  image: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  link?: string;
}
