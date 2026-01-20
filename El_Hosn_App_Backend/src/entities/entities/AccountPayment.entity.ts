import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_payment', { schema: 'public' })
export class AccountPayment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  message_main_attachment_id!: number | null;

  @Column({ nullable: true })
  move_id!: number | null;

  @Column()
  journal_id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  partner_bank_id!: number | null;

  @Column({ nullable: true })
  paired_internal_transfer_payment_id!: number | null;

  @Column({ nullable: true })
  payment_method_line_id!: number | null;

  @Column({ nullable: true })
  payment_method_id!: number | null;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  outstanding_account_id!: number | null;

  @Column({ nullable: true })
  destination_account_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column()
  state!: string;

  @Column()
  payment_type!: string;

  @Column()
  partner_type!: string;

  @Column({ nullable: true })
  memo!: string | null;

  @Column({ nullable: true })
  payment_reference!: string | null;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  amount!: number | null;

  @Column({ nullable: true })
  amount_company_currency_signed!: number | null;

  @Column({ nullable: true })
  is_reconciled!: boolean | null;

  @Column({ nullable: true })
  is_matched!: boolean | null;

  @Column({ nullable: true })
  is_sent!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  payment_transaction_id!: number | null;

  @Column({ nullable: true })
  payment_token_id!: number | null;

  @Column({ nullable: true })
  source_payment_id!: number | null;

  @Column({ nullable: true })
  should_withhold_tax!: boolean | null;

}
