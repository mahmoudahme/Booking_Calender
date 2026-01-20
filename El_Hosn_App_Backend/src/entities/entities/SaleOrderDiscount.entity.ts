import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order_discount', { schema: 'public' })
export class SaleOrderDiscount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sale_order_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  discount_type!: string | null;

  @Column({ nullable: true })
  discount_amount!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  discount_percentage!: number | null;

}
