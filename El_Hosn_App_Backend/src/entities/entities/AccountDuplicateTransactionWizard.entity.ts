import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_duplicate_transaction_wizard', { schema: 'public' })
export class AccountDuplicateTransactionWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  journal_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
