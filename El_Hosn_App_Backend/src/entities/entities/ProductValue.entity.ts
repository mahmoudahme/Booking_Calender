import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_value', { schema: 'public' })
export class ProductValue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column({ nullable: true })
  lot_id!: number | null;

  @Column({ nullable: true })
  move_id!: number | null;

  @Column()
  company_id!: number;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  description!: string | null;

  @Column()
  value!: number;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
