import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_compose_message', { schema: 'public' })
export class MailComposeMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  template_id!: number | null;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column({ nullable: true })
  author_id!: number | null;

  @Column({ nullable: true })
  res_domain_user_id!: number | null;

  @Column({ nullable: true })
  record_alias_domain_id!: number | null;

  @Column({ nullable: true })
  record_company_id!: number | null;

  @Column({ nullable: true })
  subtype_id!: number | null;

  @Column({ nullable: true })
  mail_activity_type_id!: number | null;

  @Column({ nullable: true })
  mail_server_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  lang!: string | null;

  @Column({ nullable: true })
  subject!: string | null;

  @Column({ nullable: true })
  email_layout_xmlid!: string | null;

  @Column({ nullable: true })
  email_from!: string | null;

  @Column({ nullable: true })
  composition_mode!: string | null;

  @Column({ nullable: true })
  composition_comment_option!: string | null;

  @Column({ nullable: true })
  model!: string | null;

  @Column()
  message_type!: string;

  @Column({ nullable: true })
  reply_to!: string | null;

  @Column({ nullable: true })
  scheduled_date!: string | null;

  @Column({ nullable: true })
  template_name!: string | null;

  @Column({ nullable: true })
  body!: string | null;

  @Column({ nullable: true })
  res_ids!: string | null;

  @Column({ nullable: true })
  res_domain!: string | null;

  @Column({ nullable: true })
  email_add_signature!: boolean | null;

  @Column({ nullable: true })
  reply_to_force_new!: boolean | null;

  @Column({ nullable: true })
  auto_delete!: boolean | null;

  @Column({ nullable: true })
  auto_delete_keep_log!: boolean | null;

  @Column({ nullable: true })
  force_send!: boolean | null;

  @Column({ nullable: true })
  notify_author!: boolean | null;

  @Column({ nullable: true })
  notify_author_mention!: boolean | null;

  @Column({ nullable: true })
  notify_skip_followers!: boolean | null;

  @Column({ nullable: true })
  use_exclusion_list!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  account_reports_annotation_date!: Date | null;

}
