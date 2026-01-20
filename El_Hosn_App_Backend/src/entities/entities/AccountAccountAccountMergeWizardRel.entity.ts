import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_account_merge_wizard_rel', { schema: 'public' })
export class AccountAccountAccountMergeWizardRel {
  @PrimaryColumn()
  account_merge_wizard_id!: number;

  @PrimaryColumn()
  account_account_id!: number;

}
