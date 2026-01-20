import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_groups_spreadsheet_dashboard_rel', { schema: 'public' })
export class ResGroupsSpreadsheetDashboardRel {
  @PrimaryColumn()
  spreadsheet_dashboard_id!: number;

  @PrimaryColumn()
  res_groups_id!: number;

}
