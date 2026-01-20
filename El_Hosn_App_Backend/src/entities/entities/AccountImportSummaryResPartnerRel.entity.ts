import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_import_summary_res_partner_rel', { schema: 'public' })
export class AccountImportSummaryResPartnerRel {
  @PrimaryColumn()
  account_import_summary_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
