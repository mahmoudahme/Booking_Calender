import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_conflict_quant_rel', { schema: 'public' })
export class StockConflictQuantRel {
  @PrimaryColumn()
  stock_inventory_conflict_id!: number;

  @PrimaryColumn()
  stock_quant_id!: number;

}
