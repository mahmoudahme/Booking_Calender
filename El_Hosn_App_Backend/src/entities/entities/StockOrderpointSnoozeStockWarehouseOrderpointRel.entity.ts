import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_orderpoint_snooze_stock_warehouse_orderpoint_rel', { schema: 'public' })
export class StockOrderpointSnoozeStockWarehouseOrderpointRel {
  @PrimaryColumn()
  stock_orderpoint_snooze_id!: number;

  @PrimaryColumn()
  stock_warehouse_orderpoint_id!: number;

}
