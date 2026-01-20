import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_move', { schema: 'public' })
export class StockMove {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  company_id!: number;

  @Column()
  product_id!: number;

  @Column()
  product_uom!: number;

  @Column()
  location_id!: number;

  @Column()
  location_dest_id!: number;

  @Column({ nullable: true })
  location_final_id!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  picking_id!: number | null;

  @Column({ nullable: true })
  scrap_id!: number | null;

  @Column({ nullable: true })
  rule_id!: number | null;

  @Column({ nullable: true })
  picking_type_id!: number | null;

  @Column({ nullable: true })
  origin_returned_move_id!: number | null;

  @Column({ nullable: true })
  restrict_partner_id!: number | null;

  @Column({ nullable: true })
  warehouse_id!: number | null;

  @Column({ nullable: true })
  next_serial_count!: number | null;

  @Column({ nullable: true })
  orderpoint_id!: number | null;

  @Column({ nullable: true })
  packaging_uom_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  priority!: string | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  origin!: string | null;

  @Column()
  procure_method!: string;

  @Column({ nullable: true })
  inventory_name!: string | null;

  @Column({ nullable: true })
  reference!: string | null;

  @Column({ nullable: true })
  next_serial!: string | null;

  @Column({ nullable: true })
  reservation_date!: Date | null;

  @Column({ nullable: true })
  description_picking_manual!: string | null;

  @Column({ nullable: true })
  product_qty!: number | null;

  @Column()
  product_uom_qty!: number;

  @Column({ nullable: true })
  quantity!: number | null;

  @Column({ nullable: true })
  picked!: boolean | null;

  @Column({ nullable: true })
  propagate_cancel!: boolean | null;

  @Column({ nullable: true })
  is_inventory!: boolean | null;

  @Column({ nullable: true })
  additional!: boolean | null;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  date_deadline!: Date | null;

  @Column({ nullable: true })
  delay_alert_date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  price_unit!: number | null;

  @Column({ nullable: true })
  packaging_uom_qty!: number | null;

  @Column({ nullable: true })
  account_move_id!: number | null;

  @Column({ nullable: true })
  value!: number | null;

  @Column({ nullable: true })
  to_refund!: boolean | null;

  @Column({ nullable: true })
  is_in!: boolean | null;

  @Column({ nullable: true })
  is_out!: boolean | null;

  @Column({ nullable: true })
  is_dropship!: boolean | null;

  @Column({ nullable: true })
  sale_line_id!: number | null;

  @Column({ nullable: true })
  purchase_line_id!: number | null;

}
