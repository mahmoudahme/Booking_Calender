import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_message_res_partner_starred_rel', { schema: 'public' })
export class MailMessageResPartnerStarredRel {
  @PrimaryColumn()
  mail_message_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
