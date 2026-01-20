import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('base_import_module', { schema: 'public' })
export class BaseImportModule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  import_message!: string | null;

  @Column({ nullable: true })
  modules_dependencies!: string | null;

  @Column({ nullable: true })
  force!: boolean | null;

  @Column({ nullable: true })
  with_demo!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  module_file!: string;

}
