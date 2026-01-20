import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_label_layout_product_product_rel', { schema: 'public' })
export class ProductLabelLayoutProductProductRel {
  @PrimaryColumn()
  product_label_layout_id!: number;

  @PrimaryColumn()
  product_product_id!: number;

}
