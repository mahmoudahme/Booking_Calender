import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rel_studio_export_wizard_data', { schema: 'public' })
export class RelStudioExportWizardData {
  @PrimaryColumn()
  studio_export_wizard_id!: number;

  @PrimaryColumn()
  studio_export_wizard_data_id!: number;

}
