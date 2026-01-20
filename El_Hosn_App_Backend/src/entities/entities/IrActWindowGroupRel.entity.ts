import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_act_window_group_rel', { schema: 'public' })
export class IrActWindowGroupRel {
  @PrimaryColumn()
  act_id!: number;

  @PrimaryColumn()
  gid!: number;

}
