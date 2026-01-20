import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('picking_label_type_stock_picking_rel', { schema: 'public' })
export class PickingLabelTypeStockPickingRel {
  @PrimaryColumn()
  picking_label_type_id!: number;

  @PrimaryColumn()
  stock_picking_id!: number;

}
