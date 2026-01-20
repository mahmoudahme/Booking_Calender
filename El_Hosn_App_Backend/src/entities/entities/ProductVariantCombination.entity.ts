import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_variant_combination', { schema: 'public' })
export class ProductVariantCombination {
  @PrimaryColumn()
  product_product_id!: number;

  @PrimaryColumn()
  product_template_attribute_value_id!: number;

}
