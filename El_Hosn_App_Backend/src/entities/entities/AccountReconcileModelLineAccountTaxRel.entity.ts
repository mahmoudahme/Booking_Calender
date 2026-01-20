import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_reconcile_model_line_account_tax_rel', { schema: 'public' })
export class AccountReconcileModelLineAccountTaxRel {
  @PrimaryColumn()
  account_reconcile_model_line_id!: number;

  @PrimaryColumn()
  account_tax_id!: number;

}
