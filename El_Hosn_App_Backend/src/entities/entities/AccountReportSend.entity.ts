import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_report_send', { schema: 'public' })
export class AccountReportSend {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  mail_template_id!: number | null;

  @Column({ nullable: true })
  account_report_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  mode!: string | null;

  @Column({ nullable: true })
  mail_subject!: string | null;

  @Column({ nullable: true })
  report_options!: any | null;

  @Column({ nullable: true })
  mail_attachments_widget!: any | null;

  @Column({ nullable: true })
  mail_body!: string | null;

  @Column({ nullable: true })
  enable_download!: boolean | null;

  @Column({ nullable: true })
  checkbox_download!: boolean | null;

  @Column({ nullable: true })
  enable_send_mail!: boolean | null;

  @Column({ nullable: true })
  checkbox_send_mail!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
