import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_route_move', { schema: 'public' })
export class StockRouteMove {
  @PrimaryColumn()
  move_id!: number;

  @PrimaryColumn()
  route_id!: number;

}
