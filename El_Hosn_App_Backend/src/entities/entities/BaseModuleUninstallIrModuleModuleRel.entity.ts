import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('base_module_uninstall_ir_module_module_rel', { schema: 'public' })
export class BaseModuleUninstallIrModuleModuleRel {
  @PrimaryColumn()
  base_module_uninstall_id!: number;

  @PrimaryColumn()
  ir_module_module_id!: number;

}
