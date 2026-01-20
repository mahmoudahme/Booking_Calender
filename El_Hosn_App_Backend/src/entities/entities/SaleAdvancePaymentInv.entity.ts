import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_advance_payment_inv', { schema: 'public' })
export class SaleAdvancePaymentInv {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  advance_payment_method!: string;

  @Column({ nullable: true })
  fixed_amount!: number | null;

  @Column({ nullable: true })
  deduct_down_payments!: boolean | null;

  @Column({ nullable: true })
  consolidated_billing!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  amount!: number | null;

}
