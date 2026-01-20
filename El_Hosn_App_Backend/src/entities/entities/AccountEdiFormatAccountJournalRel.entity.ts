import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_edi_format_account_journal_rel', { schema: 'public' })
export class AccountEdiFormatAccountJournalRel {
  @PrimaryColumn()
  account_journal_id!: number;

  @PrimaryColumn()
  account_edi_format_id!: number;

}
