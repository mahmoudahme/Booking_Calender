import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order_line_stock_route_rel', { schema: 'public' })
export class SaleOrderLineStockRouteRel {
  @PrimaryColumn()
  sale_order_line_id!: number;

  @PrimaryColumn()
  stock_route_id!: number;

}
