import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_move_created_purchase_line_rel', { schema: 'public' })
export class StockMoveCreatedPurchaseLineRel {
  @PrimaryColumn()
  created_purchase_line_id!: number;

  @PrimaryColumn()
  move_id!: number;

}
