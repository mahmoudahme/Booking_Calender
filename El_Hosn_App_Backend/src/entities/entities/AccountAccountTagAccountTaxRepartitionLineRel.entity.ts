import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_tag_account_tax_repartition_line_rel', { schema: 'public' })
export class AccountAccountTagAccountTaxRepartitionLineRel {
  @PrimaryColumn()
  account_tax_repartition_line_id!: number;

  @PrimaryColumn()
  account_account_tag_id!: number;

}
