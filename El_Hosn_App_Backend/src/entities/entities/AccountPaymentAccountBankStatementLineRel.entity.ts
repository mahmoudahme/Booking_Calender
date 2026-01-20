import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_payment_account_bank_statement_line_rel', { schema: 'public' })
export class AccountPaymentAccountBankStatementLineRel {
  @PrimaryColumn()
  account_bank_statement_line_id!: number;

  @PrimaryColumn()
  account_payment_id!: number;

}
