import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_label_layout_product_template_rel', { schema: 'public' })
export class ProductLabelLayoutProductTemplateRel {
  @PrimaryColumn()
  product_label_layout_id!: number;

  @PrimaryColumn()
  product_template_id!: number;

}
