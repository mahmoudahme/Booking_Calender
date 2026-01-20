import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_advance_payment_inv_sale_order_rel', { schema: 'public' })
export class SaleAdvancePaymentInvSaleOrderRel {
  @PrimaryColumn()
  sale_advance_payment_inv_id!: number;

  @PrimaryColumn()
  sale_order_id!: number;

}
