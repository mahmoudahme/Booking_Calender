import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_template_mail_template_reset_rel', { schema: 'public' })
export class MailTemplateMailTemplateResetRel {
  @PrimaryColumn()
  mail_template_reset_id!: number;

  @PrimaryColumn()
  mail_template_id!: number;

}
