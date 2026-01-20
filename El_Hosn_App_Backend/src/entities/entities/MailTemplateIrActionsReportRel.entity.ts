import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_template_ir_actions_report_rel', { schema: 'public' })
export class MailTemplateIrActionsReportRel {
  @PrimaryColumn()
  mail_template_id!: number;

  @PrimaryColumn()
  ir_actions_report_id!: number;

}
