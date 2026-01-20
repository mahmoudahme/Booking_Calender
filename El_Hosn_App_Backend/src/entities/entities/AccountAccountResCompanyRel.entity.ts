import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_res_company_rel', { schema: 'public' })
export class AccountAccountResCompanyRel {
  @PrimaryColumn()
  account_account_id!: number;

  @PrimaryColumn()
  res_company_id!: number;

}
