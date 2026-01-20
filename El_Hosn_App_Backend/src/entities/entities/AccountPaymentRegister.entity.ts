import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_payment_register', { schema: 'public' })
export class AccountPaymentRegister {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  journal_id!: number | null;

  @Column({ nullable: true })
  partner_bank_id!: number | null;

  @Column({ nullable: true })
  custom_user_currency_id!: number | null;

  @Column({ nullable: true })
  source_currency_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  payment_method_line_id!: number | null;

  @Column({ nullable: true })
  writeoff_account_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  communication!: string | null;

  @Column({ nullable: true })
  installments_mode!: string | null;

  @Column({ nullable: true })
  payment_type!: string | null;

  @Column({ nullable: true })
  partner_type!: string | null;

  @Column({ nullable: true })
  payment_difference_handling!: string | null;

  @Column({ nullable: true })
  writeoff_label!: string | null;

  @Column()
  payment_date!: Date;

  @Column({ nullable: true })
  amount!: number | null;

  @Column({ nullable: true })
  custom_user_amount!: number | null;

  @Column({ nullable: true })
  source_amount!: number | null;

  @Column({ nullable: true })
  source_amount_currency!: number | null;

  @Column({ nullable: true })
  group_payment!: boolean | null;

  @Column({ nullable: true })
  can_edit_wizard!: boolean | null;

  @Column({ nullable: true })
  can_group_payments!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  payment_token_id!: number | null;

  @Column({ nullable: true })
  withholding_outstanding_account_id!: number | null;

  @Column({ nullable: true })
  withholding_net_amount!: number | null;

  @Column({ nullable: true })
  should_withhold_tax!: boolean | null;

}
