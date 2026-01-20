import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_loan', { schema: 'public' })
export class AccountLoan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  duration!: number | null;

  @Column({ nullable: true })
  long_term_account_id!: number | null;

  @Column({ nullable: true })
  short_term_account_id!: number | null;

  @Column({ nullable: true })
  expense_account_id!: number | null;

  @Column({ nullable: true })
  journal_id!: number | null;

  @Column({ nullable: true })
  asset_group_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  display_name!: string | null;

  @Column()
  name!: string;

  @Column()
  state!: string;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  skip_until_date!: Date | null;

  @Column({ nullable: true })
  loan_properties!: any | null;

  @Column({ nullable: true })
  amount_borrowed!: number | null;

  @Column({ nullable: true })
  interest!: number | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
