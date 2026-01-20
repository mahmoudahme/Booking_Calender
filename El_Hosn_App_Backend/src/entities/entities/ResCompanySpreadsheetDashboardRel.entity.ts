import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_company_spreadsheet_dashboard_rel', { schema: 'public' })
export class ResCompanySpreadsheetDashboardRel {
  @PrimaryColumn()
  spreadsheet_dashboard_id!: number;

  @PrimaryColumn()
  res_company_id!: number;

}
