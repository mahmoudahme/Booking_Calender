import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_return', { schema: 'public' })
export class AccountReturn {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  message_main_attachment_id!: number | null;

  @Column()
  type_id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  tax_unit_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  generic_state_tax_report!: string | null;

  @Column({ nullable: true })
  generic_state_only_pay!: string | null;

  @Column({ nullable: true })
  generic_state_review_submit!: string | null;

  @Column({ nullable: true })
  generic_state_review!: string | null;

  @Column()
  audit_status!: string;

  @Column({ nullable: true })
  skipped_check_cycles!: string | null;

  @Column()
  date_from!: Date;

  @Column()
  date_to!: Date;

  @Column({ nullable: true })
  date_deadline!: Date | null;

  @Column({ nullable: true })
  date_lock!: Date | null;

  @Column({ nullable: true })
  date_submission!: Date | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  total_amount_to_pay!: number | null;

  @Column({ nullable: true })
  period_amount_to_pay!: number | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  is_completed!: boolean | null;

  @Column({ nullable: true })
  manually_created!: boolean | null;

  @Column({ nullable: true })
  report_opened_once!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
