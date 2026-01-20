import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('approval_rule_users_to_notify_rel', { schema: 'public' })
export class ApprovalRuleUsersToNotifyRel {
  @PrimaryColumn()
  studio_approval_rule_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
