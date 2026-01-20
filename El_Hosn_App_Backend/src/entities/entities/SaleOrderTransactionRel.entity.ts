import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order_transaction_rel', { schema: 'public' })
export class SaleOrderTransactionRel {
  @PrimaryColumn()
  transaction_id!: number;

  @PrimaryColumn()
  sale_order_id!: number;

}
