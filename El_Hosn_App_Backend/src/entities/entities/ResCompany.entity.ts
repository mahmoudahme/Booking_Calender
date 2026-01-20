import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_company', { schema: 'public' })
export class ResCompany {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  partner_id!: number;

  @Column()
  currency_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  parent_path!: string | null;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column({ nullable: true })
  paperformat_id!: number | null;

  @Column({ nullable: true })
  external_report_layout_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  email!: string | null;

  @Column({ nullable: true })
  phone!: string | null;

  @Column({ nullable: true })
  font!: string | null;

  @Column({ nullable: true })
  primary_color!: string | null;

  @Column({ nullable: true })
  secondary_color!: string | null;

  @Column()
  layout_background!: string;

  @Column({ type: 'jsonb', nullable: true })
  report_header!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  report_footer!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  company_details!: any | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  uses_default_logo!: boolean | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  logo_web!: string | null;

  @Column({ nullable: true })
  resource_calendar_id!: number | null;

  @Column({ nullable: true })
  alias_domain_id!: number | null;

  @Column({ nullable: true })
  email_primary_color!: string | null;

  @Column({ nullable: true })
  email_secondary_color!: string | null;

  @Column({ nullable: true })
  iap_enrich_auto_done!: boolean | null;

  @Column({ nullable: true })
  snailmail_color!: boolean | null;

  @Column({ nullable: true })
  snailmail_cover!: boolean | null;

  @Column({ nullable: true })
  snailmail_duplex!: boolean | null;

  @Column()
  fiscalyear_last_day!: number;

  @Column({ nullable: true })
  transfer_account_id!: number | null;

  @Column({ nullable: true })
  default_cash_difference_income_account_id!: number | null;

  @Column({ nullable: true })
  default_cash_difference_expense_account_id!: number | null;

  @Column({ nullable: true })
  account_journal_suspense_account_id!: number | null;

  @Column({ nullable: true })
  account_journal_early_pay_discount_gain_account_id!: number | null;

  @Column({ nullable: true })
  account_journal_early_pay_discount_loss_account_id!: number | null;

  @Column({ nullable: true })
  account_sale_tax_id!: number | null;

  @Column({ nullable: true })
  account_purchase_tax_id!: number | null;

  @Column({ nullable: true })
  account_purchase_receipt_fiscal_position_id!: number | null;

  @Column({ nullable: true })
  currency_exchange_journal_id!: number | null;

  @Column({ nullable: true })
  income_currency_exchange_account_id!: number | null;

  @Column({ nullable: true })
  expense_currency_exchange_account_id!: number | null;

  @Column({ nullable: true })
  incoterm_id!: number | null;

  @Column({ nullable: true })
  batch_payment_sequence_id!: number | null;

  @Column({ nullable: true })
  account_opening_move_id!: number | null;

  @Column({ nullable: true })
  account_default_pos_receivable_account_id!: number | null;

  @Column({ nullable: true })
  expense_accrual_account_id!: number | null;

  @Column({ nullable: true })
  revenue_accrual_account_id!: number | null;

  @Column({ nullable: true })
  automatic_entry_default_journal_id!: number | null;

  @Column({ nullable: true })
  domestic_fiscal_position_id!: number | null;

  @Column({ nullable: true })
  account_fiscal_country_id!: number | null;

  @Column({ nullable: true })
  tax_cash_basis_journal_id!: number | null;

  @Column({ nullable: true })
  account_cash_basis_base_account_id!: number | null;

  @Column({ nullable: true })
  account_discount_income_allocation_id!: number | null;

  @Column({ nullable: true })
  account_discount_expense_allocation_id!: number | null;

  @Column({ nullable: true })
  income_account_id!: number | null;

  @Column({ nullable: true })
  expense_account_id!: number | null;

  @Column({ nullable: true })
  price_difference_account_id!: number | null;

  @Column()
  fiscalyear_last_month!: string;

  @Column({ nullable: true })
  chart_template!: string | null;

  @Column({ nullable: true })
  bank_account_code_prefix!: string | null;

  @Column({ nullable: true })
  cash_account_code_prefix!: string | null;

  @Column({ nullable: true })
  transfer_account_code_prefix!: string | null;

  @Column({ nullable: true })
  tax_calculation_rounding_method!: string | null;

  @Column({ nullable: true })
  terms_type!: string | null;

  @Column({ nullable: true })
  quick_edit_mode!: string | null;

  @Column()
  account_price_include!: string;

  @Column({ nullable: true })
  fiscalyear_lock_date!: Date | null;

  @Column({ nullable: true })
  tax_lock_date!: Date | null;

  @Column({ nullable: true })
  sale_lock_date!: Date | null;

  @Column({ nullable: true })
  purchase_lock_date!: Date | null;

  @Column({ nullable: true })
  hard_lock_date!: Date | null;

  @Column({ nullable: true })
  account_opening_date!: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  invoice_terms!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  invoice_terms_html!: any | null;

  @Column({ nullable: true })
  expects_chart_of_accounts!: boolean | null;

  @Column({ nullable: true })
  anglo_saxon_accounting!: boolean | null;

  @Column({ nullable: true })
  qr_code!: boolean | null;

  @Column({ nullable: true })
  link_qr_code!: boolean | null;

  @Column({ nullable: true })
  display_invoice_amount_total_words!: boolean | null;

  @Column({ nullable: true })
  display_invoice_tax_company_currency!: boolean | null;

  @Column({ nullable: true })
  account_use_credit_limit!: boolean | null;

  @Column({ nullable: true })
  tax_exigibility!: boolean | null;

  @Column({ nullable: true })
  account_storno!: boolean | null;

  @Column({ nullable: true })
  restrictive_audit_trail!: boolean | null;

  @Column({ nullable: true })
  autopost_bills!: boolean | null;

  @Column({ nullable: true })
  signing_user!: number | null;

  @Column({ nullable: true })
  deferred_expense_journal_id!: number | null;

  @Column({ nullable: true })
  deferred_expense_account_id!: number | null;

  @Column({ nullable: true })
  deferred_revenue_journal_id!: number | null;

  @Column({ nullable: true })
  deferred_revenue_account_id!: number | null;

  @Column()
  generate_deferred_expense_entries_method!: string;

  @Column()
  deferred_expense_amount_computation_method!: string;

  @Column()
  generate_deferred_revenue_entries_method!: string;

  @Column()
  deferred_revenue_amount_computation_method!: string;

  @Column({ nullable: true })
  invoicing_switch_threshold!: Date | null;

  @Column({ nullable: true })
  predict_bill_product!: boolean | null;

  @Column({ nullable: true })
  sign_invoice!: boolean | null;

  @Column()
  currency_interval_unit!: string;

  @Column({ nullable: true })
  currency_provider!: string | null;

  @Column({ nullable: true })
  currency_next_execution_date!: Date | null;

  @Column()
  account_return_reminder_day!: number;

  @Column({ nullable: true })
  account_tax_return_journal_id!: number | null;

  @Column({ nullable: true })
  account_revaluation_journal_id!: number | null;

  @Column({ nullable: true })
  account_revaluation_expense_provision_account_id!: number | null;

  @Column({ nullable: true })
  account_revaluation_income_provision_account_id!: number | null;

  @Column({ nullable: true })
  account_representative_id!: number | null;

  @Column()
  account_return_periodicity!: string;

  @Column({ nullable: true })
  totals_below_sections!: boolean | null;

  @Column({ nullable: true })
  account_last_return_cron_refresh!: Date | null;

  @Column({ nullable: true })
  gain_account_id!: number | null;

  @Column({ nullable: true })
  loss_account_id!: number | null;

  @Column({ nullable: true })
  quotation_validity_days!: number | null;

  @Column({ nullable: true })
  sale_discount_product_id!: number | null;

  @Column({ nullable: true })
  downpayment_account_id!: number | null;

  @Column({ nullable: true })
  sale_onboarding_payment_method!: string | null;

  @Column({ nullable: true })
  portal_confirmation_sign!: boolean | null;

  @Column({ nullable: true })
  portal_confirmation_pay!: boolean | null;

  @Column({ nullable: true })
  prepayment_percent!: number | null;

  @Column({ nullable: true })
  sale_order_template_id!: number | null;

  @Column({ nullable: true })
  nomenclature_id!: number | null;

  @Column({ nullable: true })
  internal_transit_location_id!: number | null;

  @Column({ nullable: true })
  stock_mail_confirmation_template_id!: number | null;

  @Column({ nullable: true })
  annual_inventory_day!: number | null;

  @Column({ nullable: true })
  annual_inventory_month!: string | null;

  @Column({ nullable: true })
  stock_confirmation_type!: string | null;

  @Column({ nullable: true })
  stock_move_email_validation!: boolean | null;

  @Column({ nullable: true })
  stock_text_confirmation!: boolean | null;

  @Column()
  horizon_days!: number;

  @Column({ nullable: true })
  account_stock_journal_id!: number | null;

  @Column({ nullable: true })
  account_stock_valuation_id!: number | null;

  @Column({ nullable: true })
  account_production_wip_account_id!: number | null;

  @Column({ nullable: true })
  account_production_wip_overhead_account_id!: number | null;

  @Column()
  inventory_period!: string;

  @Column({ nullable: true })
  inventory_valuation!: string | null;

  @Column()
  cost_method!: string;

  @Column({ nullable: true })
  stock_sms_confirmation_template_id!: number | null;

  @Column({ nullable: true })
  has_received_warning_stock_sms!: boolean | null;

  @Column()
  security_lead!: number;

  @Column({ nullable: true })
  po_lock!: string | null;

  @Column({ nullable: true })
  po_double_validation!: string | null;

  @Column({ nullable: true })
  po_double_validation_amount!: number | null;

  @Column({ nullable: true })
  days_to_purchase!: number | null;

  @Column({ nullable: true })
  hr_presence_control_email_amount!: number | null;

  @Column({ nullable: true })
  contract_expiration_notice_period!: number | null;

  @Column({ nullable: true })
  work_permit_expiration_notice_period!: number | null;

  @Column({ nullable: true })
  hr_presence_control_ip_list!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  employee_properties_definition!: any | null;

  @Column({ nullable: true })
  hr_presence_control_login!: boolean | null;

  @Column({ nullable: true })
  hr_presence_control_email!: boolean | null;

  @Column({ nullable: true })
  hr_presence_control_ip!: boolean | null;

  @Column({ nullable: true })
  hr_presence_control_attendance!: boolean | null;

  @Column({ nullable: true })
  withholding_tax_base_account_id!: number | null;

  @Column({ nullable: true })
  l10n_gcc_dual_language_invoice!: boolean | null;

  @Column({ nullable: true })
  vat_check_vies!: boolean | null;

  @Column({ nullable: true })
  l10n_sa_private_key_id!: number | null;

  @Column()
  l10n_sa_api_mode!: string;

  @Column({ nullable: true })
  l10n_sa_edi_is_production!: boolean | null;

}
