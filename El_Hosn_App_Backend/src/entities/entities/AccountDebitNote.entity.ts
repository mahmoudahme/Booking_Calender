import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_debit_note', { schema: 'public' })
export class AccountDebitNote {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  journal_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  reason!: string | null;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  copy_lines!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  l10n_sa_reason!: string | null;

}
