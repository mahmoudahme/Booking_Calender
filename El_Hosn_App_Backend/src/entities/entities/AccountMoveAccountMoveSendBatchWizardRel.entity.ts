import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_account_move_send_batch_wizard_rel', { schema: 'public' })
export class AccountMoveAccountMoveSendBatchWizardRel {
  @PrimaryColumn()
  account_move_send_batch_wizard_id!: number;

  @PrimaryColumn()
  account_move_id!: number;

}
