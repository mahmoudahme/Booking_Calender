import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_return_res_company_rel', { schema: 'public' })
export class AccountReturnResCompanyRel {
  @PrimaryColumn()
  account_return_id!: number;

  @PrimaryColumn()
  res_company_id!: number;

}
