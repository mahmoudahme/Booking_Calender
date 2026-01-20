import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_followers_edit_res_partner_rel', { schema: 'public' })
export class MailFollowersEditResPartnerRel {
  @PrimaryColumn()
  mail_followers_edit_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
