import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_embedded_actions_res_groups_rel', { schema: 'public' })
export class IrEmbeddedActionsResGroupsRel {
  @PrimaryColumn()
  ir_embedded_actions_id!: number;

  @PrimaryColumn()
  res_groups_id!: number;

}
