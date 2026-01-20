import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_journal_account_reconcile_model_rel', { schema: 'public' })
export class AccountJournalAccountReconcileModelRel {
  @PrimaryColumn()
  account_reconcile_model_id!: number;

  @PrimaryColumn()
  account_journal_id!: number;

}
