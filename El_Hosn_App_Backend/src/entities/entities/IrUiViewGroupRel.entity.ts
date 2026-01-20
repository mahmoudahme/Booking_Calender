import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_ui_view_group_rel', { schema: 'public' })
export class IrUiViewGroupRel {
  @PrimaryColumn()
  view_id!: number;

  @PrimaryColumn()
  group_id!: number;

}
