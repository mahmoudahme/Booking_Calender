import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order_line', { schema: 'public' })
export class SaleOrderLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  order_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  order_partner_id!: number | null;

  @Column({ nullable: true })
  salesman_id!: number | null;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column({ nullable: true })
  product_uom_id!: number | null;

  @Column({ nullable: true })
  linked_line_id!: number | null;

  @Column({ nullable: true })
  combo_item_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  display_type!: string | null;

  @Column({ nullable: true })
  virtual_id!: string | null;

  @Column({ nullable: true })
  linked_virtual_id!: string | null;

  @Column({ nullable: true })
  qty_delivered_method!: string | null;

  @Column({ nullable: true })
  invoice_status!: string | null;

  @Column({ nullable: true })
  analytic_distribution!: any | null;

  @Column({ nullable: true })
  extra_tax_data!: any | null;

  @Column()
  name!: string;

  @Column()
  product_uom_qty!: number;

  @Column()
  price_unit!: number;

  @Column({ nullable: true })
  discount!: number | null;

  @Column({ nullable: true })
  price_subtotal!: number | null;

  @Column({ nullable: true })
  price_total!: number | null;

  @Column({ nullable: true })
  price_reduce_taxexcl!: number | null;

  @Column({ nullable: true })
  price_reduce_taxinc!: number | null;

  @Column({ nullable: true })
  qty_delivered!: number | null;

  @Column({ nullable: true })
  qty_invoiced!: number | null;

  @Column({ nullable: true })
  qty_to_invoice!: number | null;

  @Column({ nullable: true })
  untaxed_amount_invoiced!: number | null;

  @Column({ nullable: true })
  untaxed_amount_to_invoice!: number | null;

  @Column({ nullable: true })
  is_downpayment!: boolean | null;

  @Column({ nullable: true })
  is_expense!: boolean | null;

  @Column({ nullable: true })
  collapse_prices!: boolean | null;

  @Column({ nullable: true })
  collapse_composition!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  technical_price_unit!: number | null;

  @Column({ nullable: true })
  price_tax!: number | null;

  @Column()
  customer_lead!: number;

  @Column({ nullable: true })
  is_optional!: boolean | null;

  @Column({ nullable: true })
  warehouse_id!: number | null;

}
