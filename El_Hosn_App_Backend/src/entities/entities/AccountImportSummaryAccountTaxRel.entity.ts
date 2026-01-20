import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_import_summary_account_tax_rel', { schema: 'public' })
export class AccountImportSummaryAccountTaxRel {
  @PrimaryColumn()
  account_import_summary_id!: number;

  @PrimaryColumn()
  account_tax_id!: number;

}
