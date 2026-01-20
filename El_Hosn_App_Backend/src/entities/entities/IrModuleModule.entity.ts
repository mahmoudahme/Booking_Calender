import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_module_module', { schema: 'public' })
export class IrModuleModule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  website!: string | null;

  @Column({ nullable: true })
  summary!: any | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  author!: string | null;

  @Column({ nullable: true })
  icon!: string | null;

  @Column({ nullable: true, length: 16 })
  state!: string | null;

  @Column({ nullable: true })
  latest_version!: string | null;

  @Column({ nullable: true })
  shortdesc!: any | null;

  @Column({ nullable: true })
  category_id!: number | null;

  @Column({ nullable: true })
  description!: any | null;

  @Column({ nullable: true, default: () => "false" })
  application!: boolean | null;

  @Column({ nullable: true, default: () => "false" })
  demo!: boolean | null;

  @Column({ nullable: true, default: () => "false" })
  web!: boolean | null;

  @Column({ nullable: true, length: 32 })
  license!: string | null;

  @Column({ nullable: true, default: () => "100" })
  sequence!: number | null;

  @Column({ nullable: true, default: () => "false" })
  auto_install!: boolean | null;

  @Column({ nullable: true, default: () => "false" })
  to_buy!: boolean | null;

  @Column({ nullable: true })
  maintainer!: string | null;

  @Column({ nullable: true })
  published_version!: string | null;

  @Column({ nullable: true })
  url!: string | null;

  @Column({ nullable: true })
  contributors!: string | null;

  @Column({ nullable: true })
  menus_by_module!: string | null;

  @Column({ nullable: true })
  reports_by_module!: string | null;

  @Column({ nullable: true })
  views_by_module!: string | null;

  @Column({ nullable: true })
  module_type!: string | null;

  @Column({ nullable: true })
  imported!: boolean | null;

}
