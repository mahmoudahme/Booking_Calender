import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_supplierinfo_stock_replenishment_info_rel', { schema: 'public' })
export class ProductSupplierinfoStockReplenishmentInfoRel {
  @PrimaryColumn()
  stock_replenishment_info_id!: number;

  @PrimaryColumn()
  product_supplierinfo_id!: number;

}
