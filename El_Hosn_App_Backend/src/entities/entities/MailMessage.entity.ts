import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_message', { schema: 'public' })
export class MailMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column({ nullable: true })
  res_id!: number | null;

  @Column({ nullable: true })
  record_alias_domain_id!: number | null;

  @Column({ nullable: true })
  record_company_id!: number | null;

  @Column({ nullable: true })
  subtype_id!: number | null;

  @Column({ nullable: true })
  mail_activity_type_id!: number | null;

  @Column({ nullable: true })
  author_id!: number | null;

  @Column({ nullable: true })
  author_guest_id!: number | null;

  @Column({ nullable: true })
  mail_server_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  subject!: string | null;

  @Column({ nullable: true })
  model!: string | null;

  @Column()
  message_type!: string;

  @Column({ nullable: true })
  email_from!: string | null;

  @Column({ nullable: true })
  incoming_email_cc!: string | null;

  @Column({ nullable: true })
  outgoing_email_to!: string | null;

  @Column({ nullable: true })
  message_id!: string | null;

  @Column({ nullable: true })
  reply_to!: string | null;

  @Column({ nullable: true })
  email_layout_xmlid!: string | null;

  @Column({ nullable: true })
  body!: string | null;

  @Column({ nullable: true })
  incoming_email_to!: string | null;

  @Column({ nullable: true })
  is_internal!: boolean | null;

  @Column({ nullable: true })
  reply_to_force_new!: boolean | null;

  @Column({ nullable: true })
  email_add_signature!: boolean | null;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  pinned_at!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
