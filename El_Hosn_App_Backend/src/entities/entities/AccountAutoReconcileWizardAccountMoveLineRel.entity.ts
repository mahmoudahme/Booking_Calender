import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_auto_reconcile_wizard_account_move_line_rel', { schema: 'public' })
export class AccountAutoReconcileWizardAccountMoveLineRel {
  @PrimaryColumn()
  account_auto_reconcile_wizard_id!: number;

  @PrimaryColumn()
  account_move_line_id!: number;

}
