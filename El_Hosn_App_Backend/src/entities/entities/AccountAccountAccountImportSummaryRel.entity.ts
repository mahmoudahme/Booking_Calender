import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_account_import_summary_rel', { schema: 'public' })
export class AccountAccountAccountImportSummaryRel {
  @PrimaryColumn()
  account_import_summary_id!: number;

  @PrimaryColumn()
  account_account_id!: number;

}
