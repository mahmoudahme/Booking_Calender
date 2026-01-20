import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_ui_menu_group_rel', { schema: 'public' })
export class IrUiMenuGroupRel {
  @PrimaryColumn()
  menu_id!: number;

  @PrimaryColumn()
  gid!: number;

}
