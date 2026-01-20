import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_quant', { schema: 'public' })
export class StockQuant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column()
  location_id!: number;

  @Column({ nullable: true })
  lot_id!: number | null;

  @Column({ nullable: true })
  package_id!: number | null;

  @Column({ nullable: true })
  owner_id!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  inventory_date!: Date | null;

  @Column({ nullable: true })
  quantity!: number | null;

  @Column()
  reserved_quantity!: number;

  @Column({ nullable: true })
  inventory_quantity!: number | null;

  @Column({ nullable: true })
  inventory_diff_quantity!: number | null;

  @Column({ nullable: true })
  inventory_quantity_set!: boolean | null;

  @Column()
  in_date!: Date;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  accounting_date!: Date | null;

}
