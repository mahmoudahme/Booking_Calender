import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_tax_unit_res_company_rel', { schema: 'public' })
export class AccountTaxUnitResCompanyRel {
  @PrimaryColumn()
  res_company_id!: number;

  @PrimaryColumn()
  account_tax_unit_id!: number;

}
