import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms_template_sms_template_reset_rel', { schema: 'public' })
export class SmsTemplateSmsTemplateResetRel {
  @PrimaryColumn()
  sms_template_reset_id!: number;

  @PrimaryColumn()
  sms_template_id!: number;

}
