import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_route_categ', { schema: 'public' })
export class StockRouteCateg {
  @PrimaryColumn()
  route_id!: number;

  @PrimaryColumn()
  categ_id!: number;

}
