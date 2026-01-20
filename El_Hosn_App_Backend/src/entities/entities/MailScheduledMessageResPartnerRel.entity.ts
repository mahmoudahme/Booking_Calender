import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_scheduled_message_res_partner_rel', { schema: 'public' })
export class MailScheduledMessageResPartnerRel {
  @PrimaryColumn()
  mail_scheduled_message_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
