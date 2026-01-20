import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_users_spreadsheet_dashboard_rel', { schema: 'public' })
export class ResUsersSpreadsheetDashboardRel {
  @PrimaryColumn()
  spreadsheet_dashboard_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
