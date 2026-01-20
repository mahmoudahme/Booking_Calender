import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_attribute_product_template_rel', { schema: 'public' })
export class ProductAttributeProductTemplateRel {
  @PrimaryColumn()
  product_attribute_id!: number;

  @PrimaryColumn()
  product_template_id!: number;

}
