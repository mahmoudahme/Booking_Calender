import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move', { schema: 'public' })
export class AccountMove {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence_number!: number | null;

  @Column({ nullable: true })
  message_main_attachment_id!: number | null;

  @Column()
  journal_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  origin_payment_id!: number | null;

  @Column({ nullable: true })
  statement_line_id!: number | null;

  @Column({ nullable: true })
  tax_cash_basis_rec_id!: number | null;

  @Column({ nullable: true })
  tax_cash_basis_origin_move_id!: number | null;

  @Column({ nullable: true })
  auto_post_origin_id!: number | null;

  @Column({ nullable: true })
  secure_sequence_number!: number | null;

  @Column({ nullable: true })
  invoice_payment_term_id!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  commercial_partner_id!: number | null;

  @Column({ nullable: true })
  partner_shipping_id!: number | null;

  @Column({ nullable: true })
  partner_bank_id!: number | null;

  @Column({ nullable: true })
  fiscal_position_id!: number | null;

  @Column({ nullable: true })
  preferred_payment_method_line_id!: number | null;

  @Column()
  currency_id!: number;

  @Column({ nullable: true })
  reversed_entry_id!: number | null;

  @Column({ nullable: true })
  invoice_user_id!: number | null;

  @Column({ nullable: true })
  invoice_incoterm_id!: number | null;

  @Column({ nullable: true })
  invoice_cash_rounding_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  sequence_prefix!: string | null;

  @Column({ nullable: true })
  access_token!: string | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  ref!: string | null;

  @Column()
  state!: string;

  @Column()
  move_type!: string;

  @Column()
  auto_post!: string;

  @Column({ nullable: true })
  inalterable_hash!: string | null;

  @Column({ nullable: true })
  payment_reference!: string | null;

  @Column({ nullable: true })
  qr_code_method!: string | null;

  @Column({ nullable: true })
  payment_state!: string | null;

  @Column({ nullable: true })
  invoice_source_email!: string | null;

  @Column({ nullable: true })
  invoice_partner_display_name!: string | null;

  @Column({ nullable: true })
  invoice_origin!: string | null;

  @Column({ nullable: true })
  incoterm_location!: string | null;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  auto_post_until!: Date | null;

  @Column({ nullable: true })
  invoice_date!: Date | null;

  @Column({ nullable: true })
  invoice_date_due!: Date | null;

  @Column({ nullable: true })
  delivery_date!: Date | null;

  @Column({ nullable: true })
  taxable_supply_date!: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  sending_data!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  narration!: any | null;

  @Column({ nullable: true })
  invoice_currency_rate!: number | null;

  @Column({ nullable: true })
  amount_untaxed!: number | null;

  @Column({ nullable: true })
  amount_tax!: number | null;

  @Column({ nullable: true })
  amount_total!: number | null;

  @Column({ nullable: true })
  amount_residual!: number | null;

  @Column({ nullable: true })
  amount_untaxed_signed!: number | null;

  @Column({ nullable: true })
  amount_untaxed_in_currency_signed!: number | null;

  @Column({ nullable: true })
  amount_tax_signed!: number | null;

  @Column({ nullable: true })
  amount_total_signed!: number | null;

  @Column({ nullable: true })
  amount_total_in_currency_signed!: number | null;

  @Column({ nullable: true })
  amount_residual_signed!: number | null;

  @Column({ nullable: true })
  quick_edit_total_amount!: number | null;

  @Column({ nullable: true })
  always_tax_exigible!: boolean | null;

  @Column({ nullable: true })
  checked!: boolean | null;

  @Column({ nullable: true })
  posted_before!: boolean | null;

  @Column({ nullable: true })
  made_sequence_gap!: boolean | null;

  @Column({ nullable: true })
  is_manually_modified!: boolean | null;

  @Column({ nullable: true })
  is_move_sent!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  signing_user!: number | null;

  @Column({ nullable: true })
  payment_state_before_switch!: string | null;

  @Column({ nullable: true })
  closing_return_id!: number | null;

  @Column({ nullable: true })
  asset_id!: number | null;

  @Column({ nullable: true })
  asset_number_days!: number | null;

  @Column({ nullable: true })
  asset_move_type!: string | null;

  @Column({ nullable: true })
  asset_depreciation_beginning_date!: Date | null;

  @Column({ nullable: true })
  depreciation_value!: number | null;

  @Column({ nullable: true })
  asset_value_change!: boolean | null;

  @Column({ nullable: true })
  generating_loan_line_id!: number | null;

  @Column({ nullable: true })
  is_loan_payment_move!: boolean | null;

  @Column({ nullable: true })
  campaign_id!: number | null;

  @Column({ nullable: true })
  source_id!: number | null;

  @Column({ nullable: true })
  medium_id!: number | null;

  @Column({ nullable: true })
  team_id!: number | null;

  @Column({ nullable: true })
  debit_origin_id!: number | null;

  @Column({ nullable: true })
  l10n_sa_reason!: string | null;

  @Column({ nullable: true })
  l10n_sa_confirmation_datetime!: Date | null;

  @Column({ nullable: true })
  edi_state!: string | null;

  @Column({ nullable: true })
  l10n_sa_chain_index!: number | null;

  @Column({ nullable: true })
  l10n_sa_edi_chain_head_id!: number | null;

  @Column({ nullable: true })
  l10n_sa_uuid!: string | null;

  @Column({ nullable: true })
  l10n_sa_invoice_signature!: string | null;

}
