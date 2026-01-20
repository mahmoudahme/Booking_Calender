import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_wh_resupply_table', { schema: 'public' })
export class StockWhResupplyTable {
  @PrimaryColumn()
  supplied_wh_id!: number;

  @PrimaryColumn()
  supplier_wh_id!: number;

}
