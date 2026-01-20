import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_scheduled_message', { schema: 'public' })
export class MailScheduledMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  res_id!: number;

  @Column()
  author_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  subject!: string | null;

  @Column({ nullable: true })
  composition_comment_option!: string | null;

  @Column()
  model!: string;

  @Column({ nullable: true })
  send_context!: any | null;

  @Column({ nullable: true })
  body!: string | null;

  @Column({ nullable: true })
  notification_parameters!: string | null;

  @Column({ nullable: true })
  is_note!: boolean | null;

  @Column()
  scheduled_date!: Date;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  account_reports_annotation_date!: Date | null;

}
