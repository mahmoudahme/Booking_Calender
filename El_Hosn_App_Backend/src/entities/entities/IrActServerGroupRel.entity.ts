import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_act_server_group_rel', { schema: 'public' })
export class IrActServerGroupRel {
  @PrimaryColumn()
  act_id!: number;

  @PrimaryColumn()
  gid!: number;

}
