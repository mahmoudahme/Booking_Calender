import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_notification', { schema: 'public' })
export class MailNotification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  author_id!: number | null;

  @Column()
  mail_message_id!: number;

  @Column({ nullable: true })
  mail_mail_id!: number | null;

  @Column({ nullable: true })
  res_partner_id!: number | null;

  @Column({ nullable: true })
  mail_email_address!: string | null;

  @Column()
  notification_type!: string;

  @Column({ nullable: true })
  notification_status!: string | null;

  @Column({ nullable: true })
  failure_type!: string | null;

  @Column({ nullable: true })
  failure_reason!: string | null;

  @Column({ nullable: true })
  is_read!: boolean | null;

  @Column({ nullable: true })
  read_date!: Date | null;

  @Column({ nullable: true })
  sms_id_int!: number | null;

  @Column({ nullable: true })
  sms_number!: string | null;

  @Column({ nullable: true })
  letter_id!: number | null;

}
