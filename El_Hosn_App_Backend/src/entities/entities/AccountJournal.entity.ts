import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_journal', { schema: 'public' })
export class AccountJournal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  alias_id!: number | null;

  @Column({ nullable: true })
  default_account_id!: number | null;

  @Column({ nullable: true })
  suspense_account_id!: number | null;

  @Column({ nullable: true })
  non_deductible_account_id!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  invoice_template_pdf_report_id!: number | null;

  @Column({ nullable: true })
  profit_account_id!: number | null;

  @Column({ nullable: true })
  loss_account_id!: number | null;

  @Column({ nullable: true })
  bank_account_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  color!: number | null;

  @Column({ nullable: true })
  access_token!: string | null;

  @Column({ length: 5 })
  code!: string;

  @Column()
  type!: string;

  @Column()
  invoice_reference_type!: string;

  @Column()
  invoice_reference_model!: string;

  @Column({ nullable: true })
  bank_statements_source!: string | null;

  @Column({ nullable: true })
  incoming_einvoice_notification_email!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  sequence_override_regex!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  is_self_billing!: boolean | null;

  @Column({ nullable: true })
  restrict_mode_hash_table!: boolean | null;

  @Column({ nullable: true })
  refund_sequence!: boolean | null;

  @Column({ nullable: true })
  payment_sequence!: boolean | null;

  @Column({ nullable: true })
  show_on_dashboard!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  account_online_account_id!: number | null;

  @Column({ nullable: true })
  account_online_link_id!: number | null;

  @Column({ nullable: true })
  loan_properties_definition!: any | null;

  @Column({ nullable: true })
  debit_sequence!: boolean | null;

  @Column({ nullable: true })
  l10n_sa_production_csid_certificate_id!: number | null;

  @Column({ nullable: true })
  l10n_sa_compliance_csid_certificate_id!: number | null;

  @Column({ nullable: true })
  l10n_sa_chain_sequence_id!: number | null;

  @Column({ nullable: true })
  l10n_sa_compliance_csid_json!: string | null;

  @Column({ nullable: true })
  l10n_sa_production_csid_json!: string | null;

  @Column({ nullable: true })
  l10n_sa_latest_submission_hash!: string | null;

  @Column({ nullable: true })
  l10n_sa_csr_errors!: string | null;

  @Column({ nullable: true })
  l10n_sa_compliance_checks_passed!: boolean | null;

}
