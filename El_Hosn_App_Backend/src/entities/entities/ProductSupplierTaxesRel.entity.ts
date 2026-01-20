import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_supplier_taxes_rel', { schema: 'public' })
export class ProductSupplierTaxesRel {
  @PrimaryColumn()
  prod_id!: number;

  @PrimaryColumn()
  tax_id!: number;

}
