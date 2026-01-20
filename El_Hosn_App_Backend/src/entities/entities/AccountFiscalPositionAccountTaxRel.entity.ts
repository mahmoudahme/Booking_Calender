import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_fiscal_position_account_tax_rel', { schema: 'public' })
export class AccountFiscalPositionAccountTaxRel {
  @PrimaryColumn()
  account_fiscal_position_id!: number;

  @PrimaryColumn()
  account_tax_id!: number;

}
