import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_canned_response_res_groups_rel', { schema: 'public' })
export class MailCannedResponseResGroupsRel {
  @PrimaryColumn()
  mail_canned_response_id!: number;

  @PrimaryColumn()
  res_groups_id!: number;

}
