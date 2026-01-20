import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_orderpoint_snooze', { schema: 'public' })
export class StockOrderpointSnooze {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  predefined_date!: string | null;

  @Column({ nullable: true })
  snoozed_until!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
