import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_report_section_rel', { schema: 'public' })
export class AccountReportSectionRel {
  @PrimaryColumn()
  main_report_id!: number;

  @PrimaryColumn()
  sub_report_id!: number;

}
