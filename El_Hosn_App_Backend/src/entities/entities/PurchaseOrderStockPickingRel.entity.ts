import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchase_order_stock_picking_rel', { schema: 'public' })
export class PurchaseOrderStockPickingRel {
  @PrimaryColumn()
  purchase_order_id!: number;

  @PrimaryColumn()
  stock_picking_id!: number;

}
