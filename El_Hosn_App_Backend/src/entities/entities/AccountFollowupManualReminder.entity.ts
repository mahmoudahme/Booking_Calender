import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_followup_manual_reminder', { schema: 'public' })
export class AccountFollowupManualReminder {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  template_id!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  sms_template_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  lang!: string | null;

  @Column({ nullable: true })
  subject!: string | null;

  @Column({ nullable: true })
  sms_body!: string | null;

  @Column({ nullable: true })
  body!: string | null;

  @Column({ nullable: true })
  email!: boolean | null;

  @Column({ nullable: true })
  sms!: boolean | null;

  @Column({ nullable: true })
  print!: boolean | null;

  @Column({ nullable: true })
  join_invoices!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  snailmail!: boolean | null;

}
