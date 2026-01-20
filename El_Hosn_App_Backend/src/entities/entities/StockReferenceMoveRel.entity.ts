import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_reference_move_rel', { schema: 'public' })
export class StockReferenceMoveRel {
  @PrimaryColumn()
  move_id!: number;

  @PrimaryColumn()
  reference_id!: number;

}
