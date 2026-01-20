import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_account_auto_reconcile_wizard_rel', { schema: 'public' })
export class AccountAccountAccountAutoReconcileWizardRel {
  @PrimaryColumn()
  account_auto_reconcile_wizard_id!: number;

  @PrimaryColumn()
  account_account_id!: number;

}
