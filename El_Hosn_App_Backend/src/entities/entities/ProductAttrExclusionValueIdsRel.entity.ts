import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_attr_exclusion_value_ids_rel', { schema: 'public' })
export class ProductAttrExclusionValueIdsRel {
  @PrimaryColumn()
  product_template_attribute_exclusion_id!: number;

  @PrimaryColumn()
  product_template_attribute_value_id!: number;

}
