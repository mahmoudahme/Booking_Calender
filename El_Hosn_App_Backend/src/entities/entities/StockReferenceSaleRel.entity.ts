import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_reference_sale_rel', { schema: 'public' })
export class StockReferenceSaleRel {
  @PrimaryColumn()
  sale_id!: number;

  @PrimaryColumn()
  reference_id!: number;

}
