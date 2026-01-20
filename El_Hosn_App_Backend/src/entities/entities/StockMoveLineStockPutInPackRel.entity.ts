import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_move_line_stock_put_in_pack_rel', { schema: 'public' })
export class StockMoveLineStockPutInPackRel {
  @PrimaryColumn()
  stock_put_in_pack_id!: number;

  @PrimaryColumn()
  stock_move_line_id!: number;

}
