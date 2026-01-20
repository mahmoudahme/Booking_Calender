import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_bank_statement_line', { schema: 'public' })
export class AccountBankStatementLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  move_id!: number;

  @Column()
  journal_id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  statement_id!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  foreign_currency_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  account_number!: string | null;

  @Column({ nullable: true })
  partner_name!: string | null;

  @Column({ nullable: true })
  transaction_type!: string | null;

  @Column({ nullable: true })
  payment_ref!: string | null;

  @Column({ nullable: true })
  internal_index!: string | null;

  @Column({ nullable: true })
  transaction_details!: any | null;

  @Column({ nullable: true })
  amount!: number | null;

  @Column({ nullable: true })
  amount_currency!: number | null;

  @Column({ nullable: true })
  is_reconciled!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  amount_residual!: number | null;

  @Column({ nullable: true })
  message_main_attachment_id!: number | null;

  @Column({ nullable: true })
  cron_last_check!: Date | null;

  @Column({ nullable: true })
  unique_import_id!: string | null;

  @Column({ nullable: true })
  online_account_id!: number | null;

  @Column({ nullable: true })
  online_link_id!: number | null;

  @Column({ nullable: true })
  online_transaction_identifier!: string | null;

  @Column({ nullable: true })
  online_partner_information!: string | null;

}
