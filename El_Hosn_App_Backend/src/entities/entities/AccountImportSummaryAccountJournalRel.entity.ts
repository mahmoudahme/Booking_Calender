import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_import_summary_account_journal_rel', { schema: 'public' })
export class AccountImportSummaryAccountJournalRel {
  @PrimaryColumn()
  account_import_summary_id!: number;

  @PrimaryColumn()
  account_journal_id!: number;

}
