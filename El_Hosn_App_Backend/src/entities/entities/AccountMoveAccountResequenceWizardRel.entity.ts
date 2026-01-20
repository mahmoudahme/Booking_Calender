import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_account_resequence_wizard_rel', { schema: 'public' })
export class AccountMoveAccountResequenceWizardRel {
  @PrimaryColumn()
  account_resequence_wizard_id!: number;

  @PrimaryColumn()
  account_move_id!: number;

}
