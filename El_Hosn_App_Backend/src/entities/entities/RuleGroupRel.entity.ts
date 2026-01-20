import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rule_group_rel', { schema: 'public' })
export class RuleGroupRel {
  @PrimaryColumn()
  rule_group_id!: number;

  @PrimaryColumn()
  group_id!: number;

}
