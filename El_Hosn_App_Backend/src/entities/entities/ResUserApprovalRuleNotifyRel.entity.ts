import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_user_approval_rule_notify_rel', { schema: 'public' })
export class ResUserApprovalRuleNotifyRel {
  @PrimaryColumn()
  studio_approval_rule_delegate_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
