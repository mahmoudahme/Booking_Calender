import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order', { schema: 'public' })
export class SaleOrder {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  campaign_id!: number | null;

  @Column({ nullable: true })
  source_id!: number | null;

  @Column({ nullable: true })
  medium_id!: number | null;

  @Column()
  company_id!: number;

  @Column()
  partner_id!: number;

  @Column({ nullable: true })
  pending_email_template_id!: number | null;

  @Column({ nullable: true })
  journal_id!: number | null;

  @Column()
  partner_invoice_id!: number;

  @Column()
  partner_shipping_id!: number;

  @Column({ nullable: true })
  fiscal_position_id!: number | null;

  @Column({ nullable: true })
  payment_term_id!: number | null;

  @Column({ nullable: true })
  preferred_payment_method_line_id!: number | null;

  @Column({ nullable: true })
  pricelist_id!: number | null;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  team_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  access_token!: string | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  client_order_ref!: string | null;

  @Column({ nullable: true })
  origin!: string | null;

  @Column({ nullable: true })
  reference!: string | null;

  @Column({ nullable: true })
  signed_by!: string | null;

  @Column({ nullable: true })
  invoice_status!: string | null;

  @Column({ nullable: true })
  validity_date!: Date | null;

  @Column({ nullable: true })
  note!: string | null;

  @Column({ nullable: true })
  currency_rate!: number | null;

  @Column({ nullable: true })
  amount_untaxed!: number | null;

  @Column({ nullable: true })
  amount_tax!: number | null;

  @Column({ nullable: true })
  amount_total!: number | null;

  @Column({ nullable: true })
  locked!: boolean | null;

  @Column({ nullable: true })
  require_signature!: boolean | null;

  @Column({ nullable: true })
  require_payment!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  commitment_date!: Date | null;

  @Column()
  date_order!: Date;

  @Column({ nullable: true })
  signed_on!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  prepayment_percent!: number | null;

  @Column({ nullable: true })
  sale_order_template_id!: number | null;

  @Column({ nullable: true })
  customizable_pdf_form_fields!: any | null;

  @Column({ nullable: true })
  incoterm!: number | null;

  @Column({ nullable: true })
  warehouse_id!: number | null;

  @Column({ nullable: true })
  incoterm_location!: string | null;

  @Column()
  picking_policy!: string;

  @Column({ nullable: true })
  delivery_status!: string | null;

  @Column({ nullable: true })
  effective_date!: Date | null;

}
