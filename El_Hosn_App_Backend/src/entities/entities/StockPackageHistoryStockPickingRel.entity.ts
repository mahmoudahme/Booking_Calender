import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_package_history_stock_picking_rel', { schema: 'public' })
export class StockPackageHistoryStockPickingRel {
  @PrimaryColumn()
  stock_picking_id!: number;

  @PrimaryColumn()
  stock_package_history_id!: number;

}
