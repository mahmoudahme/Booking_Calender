import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_tax_alternatives', { schema: 'public' })
export class AccountTaxAlternatives {
  @PrimaryColumn()
  dest_tax_id!: number;

  @PrimaryColumn()
  src_tax_id!: number;

}
