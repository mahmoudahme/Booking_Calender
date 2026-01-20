import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_inventory_adjustment_name_stock_quant_rel', { schema: 'public' })
export class StockInventoryAdjustmentNameStockQuantRel {
  @PrimaryColumn()
  stock_inventory_adjustment_name_id!: number;

  @PrimaryColumn()
  stock_quant_id!: number;

}
