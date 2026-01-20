import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_package_stock_put_in_pack_rel', { schema: 'public' })
export class StockPackageStockPutInPackRel {
  @PrimaryColumn()
  stock_put_in_pack_id!: number;

  @PrimaryColumn()
  stock_package_id!: number;

}
