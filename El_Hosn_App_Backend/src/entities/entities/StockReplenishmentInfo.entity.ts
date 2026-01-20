import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_replenishment_info', { schema: 'public' })
export class StockReplenishmentInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  orderpoint_id!: number | null;

  @Column()
  percent_factor!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  based_on!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
