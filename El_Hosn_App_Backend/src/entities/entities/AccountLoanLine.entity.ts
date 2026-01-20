import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_loan_line', { schema: 'public' })
export class AccountLoanLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  loan_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  principal!: number | null;

  @Column({ nullable: true })
  interest!: number | null;

  @Column({ nullable: true })
  payment!: number | null;

  @Column({ nullable: true })
  long_term_theoretical_balance!: number | null;

  @Column({ nullable: true })
  short_term_theoretical_balance!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
