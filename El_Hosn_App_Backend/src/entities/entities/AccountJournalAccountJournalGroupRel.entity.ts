import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_journal_account_journal_group_rel', { schema: 'public' })
export class AccountJournalAccountJournalGroupRel {
  @PrimaryColumn()
  account_journal_group_id!: number;

  @PrimaryColumn()
  account_journal_id!: number;

}
