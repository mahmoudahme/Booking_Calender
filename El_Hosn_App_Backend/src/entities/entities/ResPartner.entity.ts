import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_partner', { schema: 'public' })
export class ResPartner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  state_id!: number | null;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  industry_id!: number | null;

  @Column({ nullable: true })
  color!: number | null;

  @Column({ nullable: true })
  commercial_partner_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  complete_name!: string | null;

  @Column({ nullable: true })
  ref!: string | null;

  @Column({ nullable: true })
  lang!: string | null;

  @Column({ nullable: true })
  tz!: string | null;

  @Column({ nullable: true })
  vat!: string | null;

  @Column({ nullable: true })
  company_registry!: string | null;

  @Column({ nullable: true })
  website!: string | null;

  @Column({ nullable: true })
  function!: string | null;

  @Column({ nullable: true })
  type!: string | null;

  @Column({ nullable: true })
  street!: string | null;

  @Column({ nullable: true })
  street2!: string | null;

  @Column({ nullable: true })
  zip!: string | null;

  @Column({ nullable: true })
  city!: string | null;

  @Column({ nullable: true })
  email!: string | null;

  @Column({ nullable: true })
  phone!: string | null;

  @Column({ nullable: true })
  commercial_company_name!: string | null;

  @Column({ nullable: true })
  company_name!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  properties!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  barcode!: any | null;

  @Column({ nullable: true })
  comment!: string | null;

  @Column({ nullable: true })
  partner_latitude!: number | null;

  @Column({ nullable: true })
  partner_longitude!: number | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  employee!: boolean | null;

  @Column({ nullable: true })
  is_company!: boolean | null;

  @Column({ nullable: true })
  partner_share!: boolean | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  message_bounce!: number | null;

  @Column({ nullable: true })
  email_normalized!: string | null;

  @Column({ nullable: true })
  signup_type!: string | null;

  @Column({ nullable: true })
  phone_sanitized!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  specific_property_product_pricelist!: any | null;

  @Column({ nullable: true })
  ocn_token!: string | null;

  @Column({ nullable: true })
  invoice_template_pdf_report_id!: number | null;

  @Column({ nullable: true })
  supplier_rank!: number | null;

  @Column({ nullable: true })
  customer_rank!: number | null;

  @Column()
  autopost_bills!: string;

  @Column({ type: 'jsonb', nullable: true })
  credit_limit!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_account_payable_id!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_account_receivable_id!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_account_position_id!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_payment_term_id!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_supplier_payment_term_id!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  trust!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  ignore_abnormal_invoice_date!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  ignore_abnormal_invoice_amount!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  invoice_sending_method!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  invoice_edi_format_store!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_outbound_payment_method_line_id!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_inbound_payment_method_line_id!: any | null;

  @Column({ nullable: true })
  global_location_number!: string | null;

  @Column({ nullable: true })
  peppol_endpoint!: string | null;

  @Column({ nullable: true })
  peppol_eas!: string | null;

  @Column({ nullable: true })
  online_partner_information!: string | null;

  @Column({ nullable: true })
  followup_reminder_type!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  followup_next_action_date!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  followup_responsible_id!: any | null;

  @Column({ nullable: true })
  sale_warn_msg!: string | null;

  @Column({ nullable: true })
  contact_address_complete!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  property_stock_customer!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_stock_supplier!: any | null;

  @Column({ nullable: true })
  picking_warn_msg!: string | null;

  @Column({ nullable: true })
  buyer_id!: number | null;

  @Column({ type: 'jsonb', nullable: true })
  property_purchase_currency_id!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  receipt_reminder_email!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  reminder_date_before_receipt!: any | null;

  @Column({ nullable: true })
  purchase_warn_msg!: string | null;

  @Column({ nullable: true })
  suggest_days!: number | null;

  @Column({ nullable: true })
  suggest_percent!: number | null;

  @Column({ nullable: true })
  suggest_based_on!: string | null;

  @Column()
  group_rfq!: string;

  @Column()
  group_on!: string;

  @Column({ nullable: true })
  vies_valid!: boolean | null;

  @Column({ nullable: true })
  l10n_sa_edi_building_number!: string | null;

  @Column({ nullable: true })
  l10n_sa_edi_plot_identification!: string | null;

  @Column({ nullable: true })
  l10n_sa_edi_additional_identification_scheme!: string | null;

  @Column({ nullable: true })
  l10n_sa_edi_additional_identification_number!: string | null;

}
