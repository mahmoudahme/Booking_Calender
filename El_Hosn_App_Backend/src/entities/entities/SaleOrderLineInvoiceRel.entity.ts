import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order_line_invoice_rel', { schema: 'public' })
export class SaleOrderLineInvoiceRel {
  @PrimaryColumn()
  invoice_line_id!: number;

  @PrimaryColumn()
  order_line_id!: number;

}
