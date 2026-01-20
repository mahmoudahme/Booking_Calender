import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_line', { schema: 'public' })
export class AccountMoveLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  move_id!: number;

  @Column({ nullable: true })
  journal_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  company_currency_id!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  account_id!: number | null;

  @Column()
  currency_id!: number;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  reconcile_model_id!: number | null;

  @Column({ nullable: true })
  payment_id!: number | null;

  @Column({ nullable: true })
  statement_line_id!: number | null;

  @Column({ nullable: true })
  statement_id!: number | null;

  @Column({ nullable: true })
  group_tax_id!: number | null;

  @Column({ nullable: true })
  tax_line_id!: number | null;

  @Column({ nullable: true })
  tax_group_id!: number | null;

  @Column({ nullable: true })
  tax_repartition_line_id!: number | null;

  @Column({ nullable: true })
  full_reconcile_id!: number | null;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column({ nullable: true })
  product_uom_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  move_name!: string | null;

  @Column({ nullable: true })
  parent_state!: string | null;

  @Column({ nullable: true })
  ref!: string | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  matching_number!: string | null;

  @Column()
  display_type!: string;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  invoice_date!: Date | null;

  @Column({ nullable: true })
  date_maturity!: Date | null;

  @Column({ nullable: true })
  discount_date!: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  analytic_distribution!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  extra_tax_data!: any | null;

  @Column({ nullable: true })
  debit!: number | null;

  @Column({ nullable: true })
  credit!: number | null;

  @Column({ nullable: true })
  balance!: number | null;

  @Column({ nullable: true })
  amount_currency!: number | null;

  @Column({ nullable: true })
  tax_base_amount!: number | null;

  @Column({ nullable: true })
  amount_residual!: number | null;

  @Column({ nullable: true })
  amount_residual_currency!: number | null;

  @Column({ nullable: true })
  quantity!: number | null;

  @Column({ nullable: true })
  price_unit!: number | null;

  @Column({ nullable: true })
  price_subtotal!: number | null;

  @Column({ nullable: true })
  price_total!: number | null;

  @Column({ nullable: true })
  discount!: number | null;

  @Column({ nullable: true })
  discount_amount_currency!: number | null;

  @Column({ nullable: true })
  discount_balance!: number | null;

  @Column({ nullable: true })
  is_storno!: boolean | null;

  @Column({ nullable: true })
  is_imported!: boolean | null;

  @Column({ nullable: true })
  reconciled!: boolean | null;

  @Column({ nullable: true })
  collapse_composition!: boolean | null;

  @Column({ nullable: true })
  collapse_prices!: boolean | null;

  @Column({ nullable: true })
  no_followup!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  deductible_amount!: number | null;

  @Column({ nullable: true })
  deferred_start_date!: Date | null;

  @Column({ nullable: true })
  deferred_end_date!: Date | null;

  @Column({ nullable: true })
  exclude_bank_lines!: boolean | null;

  @Column({ nullable: true })
  followup_line_id!: number | null;

  @Column({ nullable: true })
  is_downpayment!: boolean | null;

  @Column({ nullable: true })
  cogs_origin_id!: number | null;

  @Column({ nullable: true })
  purchase_line_id!: number | null;

}
