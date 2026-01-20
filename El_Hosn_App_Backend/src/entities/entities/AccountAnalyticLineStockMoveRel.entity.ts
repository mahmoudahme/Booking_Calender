import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_analytic_line_stock_move_rel', { schema: 'public' })
export class AccountAnalyticLineStockMoveRel {
  @PrimaryColumn()
  stock_move_id!: number;

  @PrimaryColumn()
  account_analytic_line_id!: number;

}
