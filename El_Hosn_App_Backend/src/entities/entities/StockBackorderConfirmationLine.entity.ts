import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_backorder_confirmation_line', { schema: 'public' })
export class StockBackorderConfirmationLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  backorder_confirmation_id!: number | null;

  @Column({ nullable: true })
  picking_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  to_backorder!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
