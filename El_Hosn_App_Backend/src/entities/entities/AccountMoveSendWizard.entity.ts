import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_send_wizard', { schema: 'public' })
export class AccountMoveSendWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  template_id!: number | null;

  @Column()
  move_id!: number;

  @Column({ nullable: true })
  pdf_report_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  lang!: string | null;

  @Column({ nullable: true })
  subject!: string | null;

  @Column({ nullable: true })
  model!: string | null;

  @Column({ nullable: true })
  template_name!: string | null;

  @Column({ nullable: true })
  sending_method_checkboxes!: any | null;

  @Column({ nullable: true })
  extra_edi_checkboxes!: any | null;

  @Column({ nullable: true })
  mail_attachments_widget!: any | null;

  @Column({ nullable: true })
  body!: string | null;

  @Column({ nullable: true })
  res_ids!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
