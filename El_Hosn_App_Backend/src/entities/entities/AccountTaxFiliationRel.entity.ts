import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_tax_filiation_rel', { schema: 'public' })
export class AccountTaxFiliationRel {
  @PrimaryColumn()
  parent_tax!: number;

  @PrimaryColumn()
  child_tax!: number;

}
