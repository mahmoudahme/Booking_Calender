import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_followers_mail_message_subtype_rel', { schema: 'public' })
export class MailFollowersMailMessageSubtypeRel {
  @PrimaryColumn()
  mail_followers_id!: number;

  @PrimaryColumn()
  mail_message_subtype_id!: number;

}
