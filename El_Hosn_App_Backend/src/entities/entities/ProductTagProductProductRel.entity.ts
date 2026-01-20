import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_tag_product_product_rel', { schema: 'public' })
export class ProductTagProductProductRel {
  @PrimaryColumn()
  product_product_id!: number;

  @PrimaryColumn()
  product_tag_id!: number;

}
