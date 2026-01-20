import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_label_layout_stock_move_rel', { schema: 'public' })
export class ProductLabelLayoutStockMoveRel {
  @PrimaryColumn()
  product_label_layout_id!: number;

  @PrimaryColumn()
  stock_move_id!: number;

}
