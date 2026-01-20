import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_exclude_res_currency_provision', { schema: 'public' })
export class AccountAccountExcludeResCurrencyProvision {
  @PrimaryColumn()
  account_account_id!: number;

  @PrimaryColumn()
  res_currency_id!: number;

}
