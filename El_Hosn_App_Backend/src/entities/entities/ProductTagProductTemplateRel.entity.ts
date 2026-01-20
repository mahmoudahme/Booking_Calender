import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_tag_product_template_rel', { schema: 'public' })
export class ProductTagProductTemplateRel {
  @PrimaryColumn()
  product_template_id!: number;

  @PrimaryColumn()
  product_tag_id!: number;

}
