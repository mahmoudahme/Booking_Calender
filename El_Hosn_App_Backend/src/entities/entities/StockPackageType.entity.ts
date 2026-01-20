import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_package_type', { schema: 'public' })
export class StockPackageType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  sequence_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  barcode!: string | null;

  @Column()
  package_use!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  height!: number | null;

  @Column({ nullable: true })
  width!: number | null;

  @Column({ nullable: true })
  packaging_length!: number | null;

  @Column({ nullable: true })
  base_weight!: number | null;

  @Column({ nullable: true })
  max_weight!: number | null;

}
