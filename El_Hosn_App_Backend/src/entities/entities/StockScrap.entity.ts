import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_scrap', { schema: 'public' })
export class StockScrap {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column()
  product_id!: number;

  @Column()
  product_uom_id!: number;

  @Column({ nullable: true })
  lot_id!: number | null;

  @Column({ nullable: true })
  package_id!: number | null;

  @Column({ nullable: true })
  owner_id!: number | null;

  @Column({ nullable: true })
  picking_id!: number | null;

  @Column()
  location_id!: number;

  @Column()
  scrap_location_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  origin!: string | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column()
  scrap_qty!: number;

  @Column({ nullable: true })
  should_replenish!: boolean | null;

  @Column({ nullable: true })
  date_done!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
