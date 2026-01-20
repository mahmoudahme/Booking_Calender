import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_package_type_stock_putaway_rule_rel', { schema: 'public' })
export class StockPackageTypeStockPutawayRuleRel {
  @PrimaryColumn()
  stock_putaway_rule_id!: number;

  @PrimaryColumn()
  stock_package_type_id!: number;

}
