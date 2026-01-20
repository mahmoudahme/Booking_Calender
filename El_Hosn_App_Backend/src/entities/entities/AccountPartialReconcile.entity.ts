import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_partial_reconcile', { schema: 'public' })
export class AccountPartialReconcile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  debit_move_id!: number;

  @Column()
  credit_move_id!: number;

  @Column({ nullable: true })
  full_reconcile_id!: number | null;

  @Column({ nullable: true })
  exchange_move_id!: number | null;

  @Column({ nullable: true })
  debit_currency_id!: number | null;

  @Column({ nullable: true })
  credit_currency_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  max_date!: Date | null;

  @Column({ nullable: true })
  draft_caba_move_vals!: any | null;

  @Column({ nullable: true })
  amount!: number | null;

  @Column({ nullable: true })
  debit_amount_currency!: number | null;

  @Column({ nullable: true })
  credit_amount_currency!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
