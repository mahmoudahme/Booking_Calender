import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('iap_account_res_company_rel', { schema: 'public' })
export class IapAccountResCompanyRel {
  @PrimaryColumn()
  iap_account_id!: number;

  @PrimaryColumn()
  res_company_id!: number;

}
