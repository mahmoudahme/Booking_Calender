import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_activity_type_mail_template_rel', { schema: 'public' })
export class MailActivityTypeMailTemplateRel {
  @PrimaryColumn()
  mail_activity_type_id!: number;

  @PrimaryColumn()
  mail_template_id!: number;

}
