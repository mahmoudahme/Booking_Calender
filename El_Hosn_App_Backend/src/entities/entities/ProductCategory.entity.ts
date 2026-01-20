import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_category', { schema: 'public' })
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  complete_name!: string | null;

  @Column({ nullable: true })
  parent_path!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  product_properties_definition!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  property_account_income_categ_id!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_account_expense_categ_id!: any | null;

  @Column({ nullable: true })
  removal_strategy_id!: number | null;

  @Column({ nullable: true })
  packaging_reserve_method!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  property_valuation!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_cost_method!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_stock_journal!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_stock_valuation_account_id!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  property_price_difference_account_id!: any | null;

  @Column({ nullable: true })
  clinic_category!: boolean | null;

}
