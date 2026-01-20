import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('template_attribute_value_stock_move_rel', { schema: 'public' })
export class TemplateAttributeValueStockMoveRel {
  @PrimaryColumn()
  move_id!: number;

  @PrimaryColumn()
  template_attribute_value_id!: number;

}
