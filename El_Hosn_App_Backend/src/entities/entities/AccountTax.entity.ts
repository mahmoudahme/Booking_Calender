import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_tax', { schema: 'public' })
export class AccountTax {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column()
  sequence!: number;

  @Column()
  tax_group_id!: number;

  @Column({ nullable: true })
  cash_basis_transition_account_id!: number | null;

  @Column()
  country_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  type_tax_use!: string;

  @Column({ nullable: true })
  tax_scope!: string | null;

  @Column()
  amount_type!: string;

  @Column({ nullable: true })
  price_include_override!: string | null;

  @Column({ nullable: true })
  tax_exigibility!: string | null;

  @Column({ type: 'jsonb' })
  name!: any;

  @Column({ type: 'jsonb', nullable: true })
  description!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  invoice_label!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  invoice_legal_notes!: any | null;

  @Column()
  amount!: number;

  @Column({ nullable: true })
  is_domestic!: boolean | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  include_base_amount!: boolean | null;

  @Column({ nullable: true })
  is_base_affected!: boolean | null;

  @Column({ nullable: true })
  analytic!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  ubl_cii_tax_category_code!: string | null;

  @Column({ nullable: true })
  ubl_cii_tax_exemption_reason_code!: string | null;

  @Column({ nullable: true })
  withholding_sequence_id!: number | null;

  @Column({ nullable: true })
  is_withholding_tax_on_payment!: boolean | null;

  @Column({ nullable: true })
  l10n_sa_exemption_reason_code!: string | null;

  @Column({ nullable: true })
  l10n_sa_is_retention!: boolean | null;

}
