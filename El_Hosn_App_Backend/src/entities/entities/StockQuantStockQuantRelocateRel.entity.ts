import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_quant_stock_quant_relocate_rel', { schema: 'public' })
export class StockQuantStockQuantRelocateRel {
  @PrimaryColumn()
  stock_quant_relocate_id!: number;

  @PrimaryColumn()
  stock_quant_id!: number;

}
