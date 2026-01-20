import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_model_spreadsheet_dashboard_rel', { schema: 'public' })
export class IrModelSpreadsheetDashboardRel {
  @PrimaryColumn()
  spreadsheet_dashboard_id!: number;

  @PrimaryColumn()
  ir_model_id!: number;

}
