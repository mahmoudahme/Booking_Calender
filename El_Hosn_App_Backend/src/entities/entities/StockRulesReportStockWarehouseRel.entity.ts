import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_rules_report_stock_warehouse_rel', { schema: 'public' })
export class StockRulesReportStockWarehouseRel {
  @PrimaryColumn()
  stock_rules_report_id!: number;

  @PrimaryColumn()
  stock_warehouse_id!: number;

}
