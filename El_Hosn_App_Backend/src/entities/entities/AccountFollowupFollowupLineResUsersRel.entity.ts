import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_followup_followup_line_res_users_rel', { schema: 'public' })
export class AccountFollowupFollowupLineResUsersRel {
  @PrimaryColumn()
  account_followup_followup_line_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
