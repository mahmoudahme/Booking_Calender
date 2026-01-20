import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_line_account_reconcile_wizard_rel', { schema: 'public' })
export class AccountMoveLineAccountReconcileWizardRel {
  @PrimaryColumn()
  account_reconcile_wizard_id!: number;

  @PrimaryColumn()
  account_move_line_id!: number;

}
