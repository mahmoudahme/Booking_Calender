import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_route_stock_rules_report_rel', { schema: 'public' })
export class StockRouteStockRulesReportRel {
  @PrimaryColumn()
  stock_rules_report_id!: number;

  @PrimaryColumn()
  stock_route_id!: number;

}
