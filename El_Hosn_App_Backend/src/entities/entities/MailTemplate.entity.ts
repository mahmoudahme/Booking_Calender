import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_template', { schema: 'public' })
export class MailTemplate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  model_id!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  mail_server_id!: number | null;

  @Column({ nullable: true })
  ref_ir_act_window!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  template_fs!: string | null;

  @Column({ nullable: true })
  lang!: string | null;

  @Column({ nullable: true })
  model!: string | null;

  @Column({ nullable: true })
  email_from!: string | null;

  @Column({ nullable: true })
  email_to!: string | null;

  @Column({ nullable: true })
  partner_to!: string | null;

  @Column({ nullable: true })
  email_cc!: string | null;

  @Column({ nullable: true })
  reply_to!: string | null;

  @Column({ nullable: true })
  email_layout_xmlid!: string | null;

  @Column({ nullable: true })
  scheduled_date!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  name!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  description!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  subject!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  body_html!: any | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  use_default_to!: boolean | null;

  @Column({ nullable: true })
  auto_delete!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
