import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_warehouse', { schema: 'public' })
export class StockWarehouse {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column()
  view_location_id!: number;

  @Column()
  lot_stock_id!: number;

  @Column({ nullable: true })
  wh_input_stock_loc_id!: number | null;

  @Column({ nullable: true })
  wh_qc_stock_loc_id!: number | null;

  @Column({ nullable: true })
  wh_output_stock_loc_id!: number | null;

  @Column({ nullable: true })
  wh_pack_stock_loc_id!: number | null;

  @Column({ nullable: true })
  mto_pull_id!: number | null;

  @Column({ nullable: true })
  pick_type_id!: number | null;

  @Column({ nullable: true })
  pack_type_id!: number | null;

  @Column({ nullable: true })
  out_type_id!: number | null;

  @Column({ nullable: true })
  in_type_id!: number | null;

  @Column({ nullable: true })
  int_type_id!: number | null;

  @Column({ nullable: true })
  qc_type_id!: number | null;

  @Column({ nullable: true })
  store_type_id!: number | null;

  @Column({ nullable: true })
  xdock_type_id!: number | null;

  @Column({ nullable: true })
  reception_route_id!: number | null;

  @Column({ nullable: true })
  delivery_route_id!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ length: 5 })
  code!: string;

  @Column()
  reception_steps!: string;

  @Column()
  delivery_steps!: string;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  buy_pull_id!: number | null;

}
