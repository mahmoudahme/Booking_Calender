import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_package_type_stock_route_rel', { schema: 'public' })
export class StockPackageTypeStockRouteRel {
  @PrimaryColumn()
  stock_package_type_id!: number;

  @PrimaryColumn()
  stock_route_id!: number;

}
