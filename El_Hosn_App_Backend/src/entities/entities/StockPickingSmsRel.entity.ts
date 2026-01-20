import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_picking_sms_rel', { schema: 'public' })
export class StockPickingSmsRel {
  @PrimaryColumn()
  confirm_stock_sms_id!: number;

  @PrimaryColumn()
  stock_picking_id!: number;

}
