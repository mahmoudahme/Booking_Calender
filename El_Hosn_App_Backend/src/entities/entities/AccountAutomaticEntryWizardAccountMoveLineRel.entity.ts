import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_automatic_entry_wizard_account_move_line_rel', { schema: 'public' })
export class AccountAutomaticEntryWizardAccountMoveLineRel {
  @PrimaryColumn()
  account_automatic_entry_wizard_id!: number;

  @PrimaryColumn()
  account_move_line_id!: number;

}
