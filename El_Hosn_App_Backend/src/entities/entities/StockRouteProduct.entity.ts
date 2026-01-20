import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_route_product', { schema: 'public' })
export class StockRouteProduct {
  @PrimaryColumn()
  route_id!: number;

  @PrimaryColumn()
  product_id!: number;

}
