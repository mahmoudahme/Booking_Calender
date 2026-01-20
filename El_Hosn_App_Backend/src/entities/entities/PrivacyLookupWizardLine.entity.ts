import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('privacy_lookup_wizard_line', { schema: 'public' })
export class PrivacyLookupWizardLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  wizard_id!: number | null;

  @Column()
  res_id!: number;

  @Column({ nullable: true })
  res_model_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  res_name!: string | null;

  @Column({ nullable: true })
  res_model!: string | null;

  @Column({ nullable: true })
  execution_details!: string | null;

  @Column({ nullable: true })
  has_active!: boolean | null;

  @Column({ nullable: true })
  is_active!: boolean | null;

  @Column({ nullable: true })
  is_unlinked!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
