import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_return_type', { schema: 'public' })
export class AccountReturnType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  report_id!: number | null;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  payment_partner_bank_id!: number | null;

  @Column({ nullable: true })
  default_deadline_days_delay!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  category!: string;

  @Column({ nullable: true })
  states_workflow!: string | null;

  @Column({ nullable: true })
  default_deadline_periodicity!: string | null;

  @Column({ nullable: true })
  default_deadline_start_date!: Date | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  deadline_periodicity!: any | null;

  @Column({ nullable: true })
  deadline_start_date!: any | null;

  @Column({ nullable: true })
  deadline_days_delay!: any | null;

  @Column({ nullable: true })
  auto_generate!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
