import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_scrap_stock_scrap_reason_tag_rel', { schema: 'public' })
export class StockScrapStockScrapReasonTagRel {
  @PrimaryColumn()
  stock_scrap_id!: number;

  @PrimaryColumn()
  stock_scrap_reason_tag_id!: number;

}
