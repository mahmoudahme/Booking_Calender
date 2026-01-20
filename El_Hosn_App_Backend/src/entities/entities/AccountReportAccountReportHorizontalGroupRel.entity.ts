import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_report_account_report_horizontal_group_rel', { schema: 'public' })
export class AccountReportAccountReportHorizontalGroupRel {
  @PrimaryColumn()
  account_report_id!: number;

  @PrimaryColumn()
  account_report_horizontal_group_id!: number;

}
