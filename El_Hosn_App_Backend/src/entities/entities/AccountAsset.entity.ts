import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_asset', { schema: 'public' })
export class AccountAsset {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  method_number!: number | null;

  @Column({ nullable: true })
  account_asset_id!: number | null;

  @Column({ nullable: true })
  asset_group_id!: number | null;

  @Column({ nullable: true })
  account_depreciation_id!: number | null;

  @Column({ nullable: true })
  account_depreciation_expense_id!: number | null;

  @Column({ nullable: true })
  journal_id!: number | null;

  @Column({ nullable: true })
  model_id!: number | null;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  method!: string | null;

  @Column({ nullable: true })
  method_period!: string | null;

  @Column()
  prorata_computation_type!: string;

  @Column()
  prorata_date!: Date;

  @Column({ nullable: true })
  acquisition_date!: Date | null;

  @Column({ nullable: true })
  disposal_date!: Date | null;

  @Column({ nullable: true })
  analytic_distribution!: any | null;

  @Column({ nullable: true })
  asset_properties_definition!: any | null;

  @Column({ nullable: true })
  asset_properties!: any | null;

  @Column({ nullable: true })
  original_value!: number | null;

  @Column({ nullable: true })
  book_value!: number | null;

  @Column({ nullable: true })
  salvage_value!: number | null;

  @Column({ nullable: true })
  non_deductible_tax_value!: number | null;

  @Column({ nullable: true })
  already_depreciated_amount_import!: number | null;

  @Column({ nullable: true })
  net_gain_on_sale!: number | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  method_progress_factor!: number | null;

  @Column({ nullable: true })
  salvage_value_pct!: number | null;

  @Column({ nullable: true })
  asset_paused_days!: number | null;

}
