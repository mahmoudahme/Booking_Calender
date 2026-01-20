import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_inventory_conflict_stock_quant_rel', { schema: 'public' })
export class StockInventoryConflictStockQuantRel {
  @PrimaryColumn()
  stock_inventory_conflict_id!: number;

  @PrimaryColumn()
  stock_quant_id!: number;

}
