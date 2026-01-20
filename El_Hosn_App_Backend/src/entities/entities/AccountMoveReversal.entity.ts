import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_reversal', { schema: 'public' })
export class AccountMoveReversal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  journal_id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  reason!: string | null;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  l10n_sa_reason!: string | null;

}
