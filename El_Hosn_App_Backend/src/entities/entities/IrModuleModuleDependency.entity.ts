import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_module_module_dependency', { schema: 'public' })
export class IrModuleModuleDependency {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  module_id!: number | null;

  @Column({ nullable: true, default: () => "true" })
  auto_install_required!: boolean | null;

}
