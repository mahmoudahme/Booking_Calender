import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_picking_type', { schema: 'public' })
export class StockPickingType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  color!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  sequence_id!: number | null;

  @Column()
  default_location_src_id!: number;

  @Column()
  default_location_dest_id!: number;

  @Column({ nullable: true })
  return_picking_type_id!: number | null;

  @Column({ nullable: true })
  warehouse_id!: number | null;

  @Column({ nullable: true })
  reservation_days_before!: number | null;

  @Column({ nullable: true })
  reservation_days_before_priority!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  sequence_code!: string;

  @Column()
  code!: string;

  @Column()
  reservation_method!: string;

  @Column({ nullable: true })
  product_label_format!: string | null;

  @Column({ nullable: true })
  lot_label_format!: string | null;

  @Column({ nullable: true })
  package_label_to_print!: string | null;

  @Column({ nullable: true })
  barcode!: string | null;

  @Column()
  create_backorder!: string;

  @Column()
  move_type!: string;

  @Column()
  name!: any;

  @Column({ nullable: true })
  picking_properties_definition!: any | null;

  @Column({ nullable: true })
  show_entire_packs!: boolean | null;

  @Column({ nullable: true })
  set_package_type!: boolean | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  use_create_lots!: boolean | null;

  @Column({ nullable: true })
  use_existing_lots!: boolean | null;

  @Column({ nullable: true })
  print_label!: boolean | null;

  @Column({ nullable: true })
  show_operations!: boolean | null;

  @Column({ nullable: true })
  auto_show_reception_report!: boolean | null;

  @Column({ nullable: true })
  auto_print_delivery_slip!: boolean | null;

  @Column({ nullable: true })
  auto_print_return_slip!: boolean | null;

  @Column({ nullable: true })
  auto_print_product_labels!: boolean | null;

  @Column({ nullable: true })
  auto_print_lot_labels!: boolean | null;

  @Column({ nullable: true })
  auto_print_reception_report!: boolean | null;

  @Column({ nullable: true })
  auto_print_reception_report_labels!: boolean | null;

  @Column({ nullable: true })
  auto_print_packages!: boolean | null;

  @Column({ nullable: true })
  auto_print_package_label!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  restrict_put_in_pack!: string;

  @Column()
  restrict_scan_tracking_number!: string;

  @Column()
  restrict_scan_source_location!: string;

  @Column()
  restrict_scan_dest_location!: string;

  @Column({ nullable: true })
  barcode_allow_extra_product!: boolean | null;

  @Column({ nullable: true })
  barcode_validation_after_dest_location!: boolean | null;

  @Column({ nullable: true })
  barcode_validation_all_product_packed!: boolean | null;

  @Column({ nullable: true })
  barcode_validation_full!: boolean | null;

  @Column({ nullable: true })
  restrict_scan_product!: boolean | null;

  @Column({ nullable: true })
  show_reserved_sns!: boolean | null;

}
