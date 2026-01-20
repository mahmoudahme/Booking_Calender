import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_loan_compute_wizard', { schema: 'public' })
export class AccountLoanComputeWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  loan_id!: number;

  @Column()
  loan_term!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  payment_end_of_month!: string;

  @Column()
  compounding_method!: string;

  @Column()
  start_date!: Date;

  @Column()
  first_payment_date!: Date;

  @Column()
  loan_amount!: number;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  interest_rate!: number;

}
