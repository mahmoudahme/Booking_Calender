import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_putaway_rule', { schema: 'public' })
export class StockPutawayRule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column({ nullable: true })
  category_id!: number | null;

  @Column()
  location_in_id!: number;

  @Column()
  location_out_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  storage_category_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  sublocation!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
