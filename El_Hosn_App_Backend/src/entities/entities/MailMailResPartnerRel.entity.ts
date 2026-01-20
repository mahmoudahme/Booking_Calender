import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_mail_res_partner_rel', { schema: 'public' })
export class MailMailResPartnerRel {
  @PrimaryColumn()
  mail_mail_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
