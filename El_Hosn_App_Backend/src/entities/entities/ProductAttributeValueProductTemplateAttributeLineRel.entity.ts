import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_attribute_value_product_template_attribute_line_rel', { schema: 'public' })
export class ProductAttributeValueProductTemplateAttributeLineRel {
  @PrimaryColumn()
  product_attribute_value_id!: number;

  @PrimaryColumn()
  product_template_attribute_line_id!: number;

}
