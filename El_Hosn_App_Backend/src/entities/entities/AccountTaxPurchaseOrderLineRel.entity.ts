import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_tax_purchase_order_line_rel', { schema: 'public' })
export class AccountTaxPurchaseOrderLineRel {
  @PrimaryColumn()
  purchase_order_line_id!: number;

  @PrimaryColumn()
  account_tax_id!: number;

}
