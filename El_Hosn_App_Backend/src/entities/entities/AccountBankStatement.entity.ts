import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_bank_statement', { schema: 'public' })
export class AccountBankStatement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  journal_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  reference!: string | null;

  @Column({ nullable: true })
  first_line_index!: string | null;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  balance_start!: number | null;

  @Column({ nullable: true })
  balance_end!: number | null;

  @Column({ nullable: true })
  balance_end_real!: number | null;

  @Column({ nullable: true })
  is_complete!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  message_main_attachment_id!: number | null;

}
