import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_bank_statement_line_transient', { schema: 'public' })
export class AccountBankStatementLineTransient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  journal_id!: number | null;

  @Column({ nullable: true })
  online_account_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  foreign_currency_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  online_transaction_identifier!: string | null;

  @Column({ nullable: true })
  payment_ref!: string | null;

  @Column({ nullable: true })
  account_number!: string | null;

  @Column({ nullable: true })
  partner_name!: string | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  transaction_details!: any | null;

  @Column({ nullable: true })
  amount!: number | null;

  @Column({ nullable: true })
  amount_currency!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
