import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_compose_message_res_partner_rel', { schema: 'public' })
export class MailComposeMessageResPartnerRel {
  @PrimaryColumn()
  wizard_id!: number;

  @PrimaryColumn()
  partner_id!: number;

}
