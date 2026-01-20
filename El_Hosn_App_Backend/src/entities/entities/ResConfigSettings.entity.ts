import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_config_settings', { schema: 'public' })
export class ResConfigSettings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  web_app_name!: string | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  module_base_import!: boolean | null;

  @Column({ nullable: true })
  module_google_calendar!: boolean | null;

  @Column({ nullable: true })
  module_microsoft_calendar!: boolean | null;

  @Column({ nullable: true })
  module_mail_plugin!: boolean | null;

  @Column({ nullable: true })
  module_auth_oauth!: boolean | null;

  @Column({ nullable: true })
  module_auth_ldap!: boolean | null;

  @Column({ nullable: true })
  module_account_inter_company_rules!: boolean | null;

  @Column({ nullable: true })
  module_voip!: boolean | null;

  @Column({ nullable: true })
  module_web_unsplash!: boolean | null;

  @Column({ nullable: true })
  module_sms!: boolean | null;

  @Column({ nullable: true })
  module_partner_autocomplete!: boolean | null;

  @Column({ nullable: true })
  module_base_geolocalize!: boolean | null;

  @Column({ nullable: true })
  module_google_recaptcha!: boolean | null;

  @Column({ nullable: true })
  module_website_cf_turnstile!: boolean | null;

  @Column({ nullable: true })
  module_google_address_autocomplete!: boolean | null;

  @Column({ nullable: true })
  group_multi_currency!: boolean | null;

  @Column({ nullable: true })
  show_effect!: boolean | null;

  @Column({ nullable: true })
  profiling_enabled_until!: Date | null;

  @Column({ nullable: true })
  unsplash_access_key!: string | null;

  @Column({ nullable: true })
  unsplash_app_id!: string | null;

  @Column({ nullable: true })
  twilio_account_sid!: string | null;

  @Column({ nullable: true })
  twilio_account_token!: string | null;

  @Column({ nullable: true })
  sfu_server_url!: string | null;

  @Column({ nullable: true })
  sfu_server_key!: string | null;

  @Column({ nullable: true })
  tenor_api_key!: string | null;

  @Column({ nullable: true })
  google_translate_api_key!: string | null;

  @Column({ nullable: true })
  external_email_server_default!: boolean | null;

  @Column({ nullable: true })
  module_google_gmail!: boolean | null;

  @Column({ nullable: true })
  module_microsoft_outlook!: boolean | null;

  @Column({ nullable: true })
  restrict_template_rendering!: boolean | null;

  @Column({ nullable: true })
  use_twilio_rtc_servers!: boolean | null;

  @Column({ nullable: true })
  use_sfu_server!: boolean | null;

  @Column({ nullable: true })
  group_analytic_accounting!: boolean | null;

  @Column({ nullable: true })
  auth_signup_template_user_id!: number | null;

  @Column({ nullable: true })
  auth_signup_uninvited!: string | null;

  @Column({ nullable: true })
  auth_signup_reset_password!: boolean | null;

  @Column({ nullable: true })
  auth_totp_policy!: string | null;

  @Column({ nullable: true })
  auth_totp_enforce!: boolean | null;

  @Column({ nullable: true })
  google_gmail_client_identifier!: string | null;

  @Column({ nullable: true })
  google_gmail_client_secret!: string | null;

  @Column({ nullable: true })
  microsoft_outlook_client_identifier!: string | null;

  @Column({ nullable: true })
  microsoft_outlook_client_secret!: string | null;

  @Column({ nullable: true })
  product_weight_in_lbs!: string | null;

  @Column({ nullable: true })
  product_volume_volume_in_cubic_feet!: string | null;

  @Column({ nullable: true })
  group_uom!: boolean | null;

  @Column({ nullable: true })
  group_product_variant!: boolean | null;

  @Column({ nullable: true })
  module_loyalty!: boolean | null;

  @Column({ nullable: true })
  group_product_pricelist!: boolean | null;

  @Column({ nullable: true })
  disable_redirect_firebase_dynamic_link!: boolean | null;

  @Column({ nullable: true })
  enable_ocn!: boolean | null;

  @Column({ nullable: true })
  barcodelookup_api_key!: string | null;

  @Column({ nullable: true })
  digest_id!: number | null;

  @Column({ nullable: true })
  digest_emails!: boolean | null;

  @Column({ nullable: true })
  chart_template!: string | null;

  @Column({ nullable: true })
  module_account_accountant!: boolean | null;

  @Column({ nullable: true })
  group_cash_rounding!: boolean | null;

  @Column({ nullable: true })
  show_sale_receipts!: boolean | null;

  @Column({ nullable: true })
  module_account_budget!: boolean | null;

  @Column({ nullable: true })
  module_account_payment!: boolean | null;

  @Column({ nullable: true })
  module_account_reports!: boolean | null;

  @Column({ nullable: true })
  module_account_check_printing!: boolean | null;

  @Column({ nullable: true })
  module_account_batch_payment!: boolean | null;

  @Column({ nullable: true })
  module_account_iso20022!: boolean | null;

  @Column({ nullable: true })
  module_account_sepa_direct_debit!: boolean | null;

  @Column({ nullable: true })
  module_account_bank_statement_import_qif!: boolean | null;

  @Column({ nullable: true })
  module_currency_rate_live!: boolean | null;

  @Column({ nullable: true })
  module_account_intrastat!: boolean | null;

  @Column({ nullable: true })
  module_product_margin!: boolean | null;

  @Column({ nullable: true })
  module_account_extract!: boolean | null;

  @Column({ nullable: true })
  module_account_invoice_extract!: boolean | null;

  @Column({ nullable: true })
  module_account_bank_statement_extract!: boolean | null;

  @Column({ nullable: true })
  module_snailmail_account!: boolean | null;

  @Column({ nullable: true })
  module_account_peppol!: boolean | null;

  @Column({ nullable: true })
  use_invoice_terms!: boolean | null;

  @Column({ nullable: true })
  group_sale_delivery_address!: boolean | null;

  @Column({ nullable: true })
  group_fiscal_year!: boolean | null;

  @Column({ nullable: true })
  module_account_auto_transfer!: boolean | null;

  @Column({ nullable: true })
  pay_invoices_online!: boolean | null;

  @Column({ nullable: true })
  invoice_mail_template_id!: number | null;

  @Column({ nullable: true })
  default_invoice_policy!: string | null;

  @Column({ nullable: true })
  group_auto_done_setting!: boolean | null;

  @Column({ nullable: true })
  group_discount_per_so_line!: boolean | null;

  @Column({ nullable: true })
  group_proforma_sales!: boolean | null;

  @Column({ nullable: true })
  group_warning_sale!: boolean | null;

  @Column({ nullable: true })
  automatic_invoice!: boolean | null;

  @Column({ nullable: true })
  module_delivery!: boolean | null;

  @Column({ nullable: true })
  module_delivery_bpost!: boolean | null;

  @Column({ nullable: true })
  module_delivery_dhl!: boolean | null;

  @Column({ nullable: true })
  module_delivery_easypost!: boolean | null;

  @Column({ nullable: true })
  module_delivery_envia!: boolean | null;

  @Column({ nullable: true })
  module_delivery_fedex_rest!: boolean | null;

  @Column({ nullable: true })
  module_delivery_sendcloud!: boolean | null;

  @Column({ nullable: true })
  module_delivery_shiprocket!: boolean | null;

  @Column({ nullable: true })
  module_delivery_starshipit!: boolean | null;

  @Column({ nullable: true })
  module_delivery_ups_rest!: boolean | null;

  @Column({ nullable: true })
  module_delivery_usps_rest!: boolean | null;

  @Column({ nullable: true })
  module_product_email_template!: boolean | null;

  @Column({ nullable: true })
  module_sale_amazon!: boolean | null;

  @Column({ nullable: true })
  module_sale_commission!: boolean | null;

  @Column({ nullable: true })
  module_sale_gelato!: boolean | null;

  @Column({ nullable: true })
  module_sale_loyalty!: boolean | null;

  @Column({ nullable: true })
  module_sale_margin!: boolean | null;

  @Column({ nullable: true })
  module_sale_pdf_quote_builder!: boolean | null;

  @Column({ nullable: true })
  module_sale_product_matrix!: boolean | null;

  @Column({ nullable: true })
  module_sale_shopee!: boolean | null;

  @Column({ nullable: true })
  group_sale_order_template!: boolean | null;

  @Column({ nullable: true })
  map_box_token!: string | null;

  @Column({ nullable: true })
  barcode_separator!: string | null;

  @Column({ nullable: true })
  module_product_expiry!: boolean | null;

  @Column({ nullable: true })
  group_stock_production_lot!: boolean | null;

  @Column({ nullable: true })
  group_stock_lot_print_gs1!: boolean | null;

  @Column({ nullable: true })
  group_lot_on_delivery_slip!: boolean | null;

  @Column({ nullable: true })
  group_stock_tracking_lot!: boolean | null;

  @Column({ nullable: true })
  group_stock_tracking_owner!: boolean | null;

  @Column({ nullable: true })
  group_stock_adv_location!: boolean | null;

  @Column({ nullable: true })
  group_warning_stock!: boolean | null;

  @Column({ nullable: true })
  group_stock_sign_delivery!: boolean | null;

  @Column({ nullable: true })
  module_stock_picking_batch!: boolean | null;

  @Column({ nullable: true })
  module_stock_barcode!: boolean | null;

  @Column({ nullable: true })
  module_stock_barcode_barcodelookup!: boolean | null;

  @Column({ nullable: true })
  module_stock_sms!: boolean | null;

  @Column({ nullable: true })
  module_quality_control!: boolean | null;

  @Column({ nullable: true })
  module_quality_control_worksheet!: boolean | null;

  @Column({ nullable: true })
  group_stock_multi_locations!: boolean | null;

  @Column({ nullable: true })
  group_stock_reception_report!: boolean | null;

  @Column({ nullable: true })
  module_stock_dropshipping!: boolean | null;

  @Column({ nullable: true })
  module_stock_fleet!: boolean | null;

  @Column({ nullable: true })
  module_stock_landed_costs!: boolean | null;

  @Column({ nullable: true })
  group_lot_on_invoice!: boolean | null;

  @Column({ nullable: true })
  barcode_max_time_between_keys_in_ms!: number | null;

  @Column({ nullable: true })
  barcode_rfid_batch_time!: number | null;

  @Column({ nullable: true })
  barcode_separator_regex!: string | null;

  @Column({ nullable: true })
  stock_barcode_mute_sound_notifications!: boolean | null;

  @Column({ nullable: true })
  module_whatsapp_stock!: boolean | null;

  @Column()
  default_picking_policy!: string;

  @Column({ nullable: true })
  use_security_lead!: boolean | null;

  @Column({ nullable: true })
  lock_confirmed_po!: boolean | null;

  @Column({ nullable: true })
  po_order_approval!: boolean | null;

  @Column({ nullable: true })
  group_warning_purchase!: boolean | null;

  @Column({ nullable: true })
  module_account_3way_match!: boolean | null;

  @Column({ nullable: true })
  module_purchase_requisition!: boolean | null;

  @Column({ nullable: true })
  module_purchase_product_matrix!: boolean | null;

  @Column({ nullable: true })
  group_send_reminder!: boolean | null;

  @Column({ nullable: true })
  is_installed_sale!: boolean | null;

  @Column({ nullable: true })
  module_hr_presence!: boolean | null;

  @Column({ nullable: true })
  module_hr_skills!: boolean | null;

  @Column({ nullable: true })
  group_commission_forecast!: boolean | null;

}
