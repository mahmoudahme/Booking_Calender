import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_taxes_rel', { schema: 'public' })
export class ProductTaxesRel {
  @PrimaryColumn()
  prod_id!: number;

  @PrimaryColumn()
  tax_id!: number;

}
