import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_inventory_warning_stock_quant_rel', { schema: 'public' })
export class StockInventoryWarningStockQuantRel {
  @PrimaryColumn()
  stock_inventory_warning_id!: number;

  @PrimaryColumn()
  stock_quant_id!: number;

}
