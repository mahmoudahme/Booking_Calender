import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_import_summary_account_move_rel', { schema: 'public' })
export class AccountImportSummaryAccountMoveRel {
  @PrimaryColumn()
  account_import_summary_id!: number;

  @PrimaryColumn()
  account_move_id!: number;

}
