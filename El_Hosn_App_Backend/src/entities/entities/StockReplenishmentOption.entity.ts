import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_replenishment_option', { schema: 'public' })
export class StockReplenishmentOption {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  route_id!: number | null;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column({ nullable: true })
  replenishment_info_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
