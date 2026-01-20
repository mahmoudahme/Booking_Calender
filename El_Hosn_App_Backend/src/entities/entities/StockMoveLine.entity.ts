import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_move_line', { schema: 'public' })
export class StockMoveLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  picking_id!: number | null;

  @Column({ nullable: true })
  move_id!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column()
  product_uom_id!: number;

  @Column({ nullable: true })
  package_id!: number | null;

  @Column({ nullable: true })
  lot_id!: number | null;

  @Column({ nullable: true })
  result_package_id!: number | null;

  @Column({ nullable: true })
  package_history_id!: number | null;

  @Column({ nullable: true })
  owner_id!: number | null;

  @Column()
  location_id!: number;

  @Column()
  location_dest_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  lot_name!: string | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  quantity!: number | null;

  @Column({ nullable: true })
  quantity_product_uom!: number | null;

  @Column({ nullable: true })
  picked!: boolean | null;

  @Column({ nullable: true })
  is_entire_pack!: boolean | null;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  location_processed!: boolean | null;

}
