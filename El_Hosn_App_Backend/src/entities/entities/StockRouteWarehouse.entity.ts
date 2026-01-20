import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_route_warehouse', { schema: 'public' })
export class StockRouteWarehouse {
  @PrimaryColumn()
  route_id!: number;

  @PrimaryColumn()
  warehouse_id!: number;

}
