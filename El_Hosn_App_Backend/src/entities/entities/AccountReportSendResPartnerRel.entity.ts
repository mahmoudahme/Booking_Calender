import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_report_send_res_partner_rel', { schema: 'public' })
export class AccountReportSendResPartnerRel {
  @PrimaryColumn()
  account_report_send_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
