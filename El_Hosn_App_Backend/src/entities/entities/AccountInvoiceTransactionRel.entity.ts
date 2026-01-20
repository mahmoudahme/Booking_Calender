import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_invoice_transaction_rel', { schema: 'public' })
export class AccountInvoiceTransactionRel {
  @PrimaryColumn()
  invoice_id!: number;

  @PrimaryColumn()
  transaction_id!: number;

}
