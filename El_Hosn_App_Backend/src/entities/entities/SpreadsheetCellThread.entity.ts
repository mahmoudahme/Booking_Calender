import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spreadsheet_cell_thread', { schema: 'public' })
export class SpreadsheetCellThread {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  dashboard_id!: number | null;

  @Column({ nullable: true })
  sale_order_spreadsheet_id!: number | null;

}
