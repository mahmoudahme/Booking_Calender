import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_move_move_rel', { schema: 'public' })
export class StockMoveMoveRel {
  @PrimaryColumn()
  move_orig_id!: number;

  @PrimaryColumn()
  move_dest_id!: number;

}
