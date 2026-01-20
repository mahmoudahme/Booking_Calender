import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dms_acc_rep_export_wizard_format_rel', { schema: 'public' })
export class DmsAccRepExportWizardFormatRel {
  @PrimaryColumn()
  account_reports_export_wizard_id!: number;

  @PrimaryColumn()
  account_reports_export_wizard_format_id!: number;

}
