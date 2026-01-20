import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_template_uom_uom_rel', { schema: 'public' })
export class ProductTemplateUomUomRel {
  @PrimaryColumn()
  product_template_id!: number;

  @PrimaryColumn()
  uom_uom_id!: number;

}
