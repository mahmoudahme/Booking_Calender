import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_users_studio_approval_rule_delegate_rel', { schema: 'public' })
export class ResUsersStudioApprovalRuleDelegateRel {
  @PrimaryColumn()
  studio_approval_rule_delegate_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
