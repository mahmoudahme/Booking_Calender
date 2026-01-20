import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_followup_followup_line', { schema: 'public' })
export class AccountFollowupFollowupLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  delay!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  mail_template_id!: number | null;

  @Column({ nullable: true })
  sms_template_id!: number | null;

  @Column({ nullable: true })
  activity_type_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  activity_summary!: string | null;

  @Column()
  activity_default_responsible_type!: string;

  @Column()
  name!: any;

  @Column({ nullable: true })
  activity_note!: string | null;

  @Column({ nullable: true })
  send_email!: boolean | null;

  @Column({ nullable: true })
  join_invoices!: boolean | null;

  @Column({ nullable: true })
  send_sms!: boolean | null;

  @Column({ nullable: true })
  create_activity!: boolean | null;

  @Column({ nullable: true })
  auto_execute!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  send_letter!: boolean | null;

}
