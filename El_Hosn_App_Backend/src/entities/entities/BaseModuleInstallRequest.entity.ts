import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('base_module_install_request', { schema: 'public' })
export class BaseModuleInstallRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  module_id!: number;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  body_html!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
