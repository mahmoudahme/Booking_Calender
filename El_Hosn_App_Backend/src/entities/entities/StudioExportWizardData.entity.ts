import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('studio_export_wizard_data', { schema: 'public' })
export class StudioExportWizardData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  res_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  model!: string;

  @Column({ nullable: true })
  model_name!: string | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  xmlid!: string | null;

  @Column({ nullable: true })
  pre!: boolean | null;

  @Column({ nullable: true })
  post!: boolean | null;

  @Column({ nullable: true })
  studio!: boolean | null;

  @Column({ nullable: true })
  is_demo_data!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
