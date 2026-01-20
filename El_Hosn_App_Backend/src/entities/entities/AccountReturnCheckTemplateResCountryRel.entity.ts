import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_return_check_template_res_country_rel', { schema: 'public' })
export class AccountReturnCheckTemplateResCountryRel {
  @PrimaryColumn()
  account_return_check_template_id!: number;

  @PrimaryColumn()
  res_country_id!: number;

}
