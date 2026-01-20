import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lot_label_layout_stock_move_line_rel', { schema: 'public' })
export class LotLabelLayoutStockMoveLineRel {
  @PrimaryColumn()
  lot_label_layout_id!: number;

  @PrimaryColumn()
  stock_move_line_id!: number;

}
