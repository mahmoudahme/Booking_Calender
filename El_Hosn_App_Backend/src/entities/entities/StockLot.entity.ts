import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_lot', { schema: 'public' })
export class StockLot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  location_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  ref!: string | null;

  @Column({ nullable: true })
  lot_properties!: any | null;

  @Column({ nullable: true })
  note!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  standard_price!: any | null;

  @Column({ nullable: true })
  avg_cost!: number | null;

}
