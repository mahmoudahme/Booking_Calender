import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_report', { schema: 'public' })
export class AccountReport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  root_report_id!: number | null;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  load_more_limit!: number | null;

  @Column({ nullable: true })
  prefix_groups_threshold!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  chart_template!: string | null;

  @Column({ nullable: true })
  availability_condition!: string | null;

  @Column({ nullable: true })
  integer_rounding!: string | null;

  @Column({ nullable: true })
  default_opening_date_filter!: string | null;

  @Column({ nullable: true })
  currency_translation!: string | null;

  @Column({ nullable: true })
  filter_multi_company!: string | null;

  @Column({ nullable: true })
  filter_hide_0_lines!: string | null;

  @Column({ nullable: true })
  filter_hierarchy!: string | null;

  @Column({ nullable: true })
  filter_account_type!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  use_sections!: boolean | null;

  @Column({ nullable: true })
  only_tax_exigible!: boolean | null;

  @Column({ nullable: true })
  search_bar!: boolean | null;

  @Column({ nullable: true })
  allow_foreign_vat!: boolean | null;

  @Column({ nullable: true })
  filter_date_range!: boolean | null;

  @Column({ nullable: true })
  filter_show_draft!: boolean | null;

  @Column({ nullable: true })
  filter_unreconciled!: boolean | null;

  @Column({ nullable: true })
  filter_unfold_all!: boolean | null;

  @Column({ nullable: true })
  filter_period_comparison!: boolean | null;

  @Column({ nullable: true })
  filter_growth_comparison!: boolean | null;

  @Column({ nullable: true })
  filter_journals!: boolean | null;

  @Column({ nullable: true })
  filter_analytic!: boolean | null;

  @Column({ nullable: true })
  filter_partner!: boolean | null;

  @Column({ nullable: true })
  filter_aml_ir_filters!: boolean | null;

  @Column({ nullable: true })
  filter_budgets!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  custom_handler_model_id!: number | null;

  @Column({ nullable: true })
  send_and_print_values!: any | null;

  @Column({ nullable: true })
  allow_account_audit_status_on_lines!: boolean | null;

  @Column({ nullable: true })
  filter_analytic_groupby!: boolean | null;

}
