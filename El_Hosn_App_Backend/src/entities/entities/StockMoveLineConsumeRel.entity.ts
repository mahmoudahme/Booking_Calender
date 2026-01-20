import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_move_line_consume_rel', { schema: 'public' })
export class StockMoveLineConsumeRel {
  @PrimaryColumn()
  consume_line_id!: number;

  @PrimaryColumn()
  produce_line_id!: number;

}
