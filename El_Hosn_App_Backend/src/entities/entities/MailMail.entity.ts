import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_mail', { schema: 'public' })
export class MailMail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mail_message_id!: number;

  @Column({ nullable: true })
  fetchmail_server_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  email_cc!: string | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  failure_type!: string | null;

  @Column({ nullable: true })
  body_html!: string | null;

  @Column({ nullable: true })
  references!: string | null;

  @Column({ nullable: true })
  headers!: string | null;

  @Column({ nullable: true })
  email_to!: string | null;

  @Column({ nullable: true })
  failure_reason!: string | null;

  @Column({ nullable: true })
  is_notification!: boolean | null;

  @Column({ nullable: true })
  auto_delete!: boolean | null;

  @Column({ nullable: true })
  scheduled_date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
