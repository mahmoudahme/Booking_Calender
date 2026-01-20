import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_warehouse_orderpoint', { schema: 'public' })
export class StockWarehouseOrderpoint {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  warehouse_id!: number;

  @Column()
  location_id!: number;

  @Column()
  product_id!: number;

  @Column({ nullable: true })
  replenishment_uom_id!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  route_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  trigger!: string;

  @Column({ nullable: true })
  snoozed_until!: Date | null;

  @Column({ nullable: true })
  deadline_date!: Date | null;

  @Column()
  product_min_qty!: number;

  @Column()
  product_max_qty!: number;

  @Column({ nullable: true })
  qty_to_order_computed!: number | null;

  @Column({ nullable: true })
  qty_to_order_manual!: number | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  supplier_id!: number | null;

}
