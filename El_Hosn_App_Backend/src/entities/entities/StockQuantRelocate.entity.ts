import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_quant_relocate', { schema: 'public' })
export class StockQuantRelocate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  dest_location_id!: number | null;

  @Column({ nullable: true })
  dest_package_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  message!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
