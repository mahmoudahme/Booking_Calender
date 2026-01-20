import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('studio_export_model', { schema: 'public' })
export class StudioExportModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  model_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  model_name!: string | null;

  @Column({ nullable: true })
  domain!: string | null;

  @Column({ nullable: true })
  is_demo_data!: boolean | null;

  @Column({ nullable: true })
  updatable!: boolean | null;

  @Column({ nullable: true })
  include_attachment!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
