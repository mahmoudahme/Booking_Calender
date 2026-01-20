import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_quant_stock_request_count_rel', { schema: 'public' })
export class StockQuantStockRequestCountRel {
  @PrimaryColumn()
  stock_request_count_id!: number;

  @PrimaryColumn()
  stock_quant_id!: number;

}
