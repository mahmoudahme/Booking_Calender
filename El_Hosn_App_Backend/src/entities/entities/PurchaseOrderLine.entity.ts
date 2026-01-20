import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchase_order_line', { schema: 'public' })
export class PurchaseOrderLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  product_uom_id!: number | null;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column()
  order_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  qty_received_method!: string | null;

  @Column({ nullable: true })
  display_type!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  analytic_distribution!: any | null;

  @Column()
  name!: string;

  @Column()
  product_qty!: number;

  @Column({ nullable: true })
  discount!: number | null;

  @Column()
  price_unit!: number;

  @Column({ nullable: true })
  price_subtotal!: number | null;

  @Column({ nullable: true })
  price_total!: number | null;

  @Column({ nullable: true })
  qty_invoiced!: number | null;

  @Column({ nullable: true })
  qty_received!: number | null;

  @Column({ nullable: true })
  qty_received_manual!: number | null;

  @Column({ nullable: true })
  qty_to_invoice!: number | null;

  @Column({ nullable: true })
  is_downpayment!: boolean | null;

  @Column({ nullable: true })
  date_planned!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  product_uom_qty!: number | null;

  @Column({ nullable: true })
  price_tax!: number | null;

  @Column({ nullable: true })
  technical_price_unit!: number | null;

  @Column({ nullable: true })
  orderpoint_id!: number | null;

  @Column({ nullable: true })
  location_final_id!: number | null;

  @Column({ nullable: true })
  product_description_variants!: string | null;

  @Column({ nullable: true })
  propagate_cancel!: boolean | null;

  @Column({ nullable: true })
  sale_line_id!: number | null;

}
