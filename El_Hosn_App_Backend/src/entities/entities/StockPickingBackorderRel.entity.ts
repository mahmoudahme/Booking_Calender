import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_picking_backorder_rel', { schema: 'public' })
export class StockPickingBackorderRel {
  @PrimaryColumn()
  stock_backorder_confirmation_id!: number;

  @PrimaryColumn()
  stock_picking_id!: number;

}
