import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_reference_purchase_rel', { schema: 'public' })
export class StockReferencePurchaseRel {
  @PrimaryColumn()
  purchase_id!: number;

  @PrimaryColumn()
  reference_id!: number;

}
