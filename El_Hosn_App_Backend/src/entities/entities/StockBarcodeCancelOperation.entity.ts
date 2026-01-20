import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_barcode_cancel_operation', { schema: 'public' })
export class StockBarcodeCancelOperation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  picking_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
