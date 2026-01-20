import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_activity_rel', { schema: 'public' })
export class MailActivityRel {
  @PrimaryColumn()
  activity_id!: number;

  @PrimaryColumn()
  recommended_id!: number;

}
