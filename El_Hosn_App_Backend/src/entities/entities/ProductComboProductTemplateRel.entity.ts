import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_combo_product_template_rel', { schema: 'public' })
export class ProductComboProductTemplateRel {
  @PrimaryColumn()
  product_template_id!: number;

  @PrimaryColumn()
  product_combo_id!: number;

}
