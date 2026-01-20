import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_activity_plan_template_mail_activity_type_rel', { schema: 'public' })
export class MailActivityPlanTemplateMailActivityTypeRel {
  @PrimaryColumn()
  mail_activity_plan_template_id!: number;

  @PrimaryColumn()
  mail_activity_type_id!: number;

}
