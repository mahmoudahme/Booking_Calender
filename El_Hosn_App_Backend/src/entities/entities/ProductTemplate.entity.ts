import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductCategory } from './ProductCategory.entity';

@Entity('product_template', { schema: 'public' })
export class ProductTemplate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  categ_id!: number | null;

  @ManyToOne(() => ProductCategory)
  @JoinColumn({ name: 'categ_id' })
  categ!: ProductCategory;

  @Column()
  uom_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  color!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  type!: string;

  @Column()
  service_tracking!: string;

  @Column({ nullable: true })
  default_code!: string | null;

  @Column({ type: 'jsonb' })
  name!: any;

  @Column({ type: 'jsonb', nullable: true })
  description!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  description_purchase!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  description_sale!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  product_properties!: any | null;

  @Column({ nullable: true })
  list_price!: number | null;

  @Column({ nullable: true })
  volume!: number | null;

  @Column({ nullable: true })
  weight!: number | null;

  @Column({ nullable: true })
  sale_ok!: boolean | null;

  @Column({ nullable: true })
  purchase_ok!: boolean | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  can_image_1024_be_zoomed!: boolean | null;

  @Column({ nullable: true })
  has_configurable_attributes!: boolean | null;

  @Column({ nullable: true })
  is_favorite!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  property_account_income_id!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_account_expense_id!: any | null;

  @Column({ nullable: true })
  service_group!: number | null;

  @Column({ nullable: true })
  service_duration!: number | null;

  @Column({ nullable: true })
  service_sub_group!: number | null;

  @Column({ nullable: true })
  doctor_specialty!: number | null;

  @Column({ nullable: true })
  billing_group!: number | null;

  @Column({ nullable: true })
  machine_model!: string | null;

  @Column({ nullable: true })
  medicines_model!: string | null;

  @Column({ nullable: true })
  service_name!: string | null;

  @Column({ nullable: true })
  service_status!: string | null;

  @Column({ nullable: true })
  order_code_alias!: string | null;

  @Column({ nullable: true })
  insurance_category!: string | null;

  @Column({ nullable: true })
  allow_rate_increase!: string | null;

  @Column({ nullable: true })
  conducting_personnel_role!: string | null;

  @Column({ nullable: true })
  duration_unit!: string | null;

  @Column({ nullable: true })
  reporting_activity_timing!: string | null;

  @Column({ nullable: true })
  service_dept!: string | null;

  @Column({ nullable: true })
  units!: string | null;

  @Column({ nullable: true })
  conduction_required!: string | null;

  @Column({ nullable: true })
  prior_auth_required!: string | null;

  @Column({ nullable: true })
  allow_rate_decrease!: string | null;

  @Column({ nullable: true })
  allow_zero_claim_amount!: string | null;

  @Column({ nullable: true })
  quantity_split_pending!: string | null;

  @Column({ nullable: true })
  exclude_selfpay_claim!: string | null;

  @Column({ nullable: true })
  conducting_doctor_required!: string | null;

  @Column({ nullable: true })
  tooth_num_required!: string | null;

  @Column({ nullable: true })
  schedulable_by!: string | null;

  @Column({ nullable: true })
  if_has_code!: string | null;

  @Column({ nullable: true })
  service_resources!: string | null;

  @Column({ nullable: true })
  service_remarks!: string | null;

  @Column({ nullable: true })
  service_tax_percentage!: number | null;

  @Column({ nullable: true })
  service_type!: string | null;

  @Column({ nullable: true })
  expense_policy!: string | null;

  @Column({ nullable: true })
  invoice_policy!: string | null;

  @Column({ nullable: true })
  sale_line_warn_msg!: string | null;

  @Column({ nullable: true })
  sale_delay!: number | null;

  @Column({ nullable: true })
  lot_sequence_id!: number | null;

  @Column()
  tracking!: string;

  @Column({ type: 'jsonb', nullable: true })
  responsible_id!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_stock_production!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_stock_inventory!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  description_picking!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  description_pickingout!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  description_pickingin!: any | null;

  @Column({ nullable: true })
  is_storable!: boolean | null;

  @Column({ type: 'jsonb', nullable: true })
  property_price_difference_account_id!: any | null;

  @Column({ nullable: true })
  lot_valuated!: boolean | null;

  @Column({ nullable: true })
  purchase_method!: string | null;

  @Column({ nullable: true })
  purchase_line_warn_msg!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  service_to_purchase!: any | null;

}
