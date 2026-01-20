import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_location', { schema: 'public' })
export class StockLocation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  location_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  removal_strategy_id!: number | null;

  @Column({ nullable: true })
  cyclic_inventory_frequency!: number | null;

  @Column({ nullable: true })
  warehouse_id!: number | null;

  @Column({ nullable: true })
  storage_category_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  complete_name!: string | null;

  @Column()
  usage!: string;

  @Column({ nullable: true })
  parent_path!: string | null;

  @Column({ nullable: true })
  barcode!: string | null;

  @Column({ nullable: true })
  last_inventory_date!: Date | null;

  @Column({ nullable: true })
  next_inventory_date!: Date | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  replenish_location!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  valuation_account_id!: number | null;

}
