import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_fiscal_position_res_country_state_rel', { schema: 'public' })
export class AccountFiscalPositionResCountryStateRel {
  @PrimaryColumn()
  account_fiscal_position_id!: number;

  @PrimaryColumn()
  res_country_state_id!: number;

}
