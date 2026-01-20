import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_template_attribute_value_purchase_order_line_rel', { schema: 'public' })
export class ProductTemplateAttributeValuePurchaseOrderLineRel {
  @PrimaryColumn()
  purchase_order_line_id!: number;

  @PrimaryColumn()
  product_template_attribute_value_id!: number;

}
