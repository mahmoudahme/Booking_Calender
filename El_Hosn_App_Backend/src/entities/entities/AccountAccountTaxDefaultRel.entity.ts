import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_tax_default_rel', { schema: 'public' })
export class AccountAccountTaxDefaultRel {
  @PrimaryColumn()
  account_id!: number;

  @PrimaryColumn()
  tax_id!: number;

}
