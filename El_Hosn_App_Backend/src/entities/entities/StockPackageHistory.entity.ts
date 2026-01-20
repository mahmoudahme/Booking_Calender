import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_package_history', { schema: 'public' })
export class StockPackageHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  location_id!: number | null;

  @Column({ nullable: true })
  location_dest_id!: number | null;

  @Column()
  package_id!: number;

  @Column({ nullable: true })
  parent_orig_id!: number | null;

  @Column({ nullable: true })
  parent_dest_id!: number | null;

  @Column({ nullable: true })
  outermost_dest_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  package_name!: string;

  @Column({ nullable: true })
  parent_orig_name!: string | null;

  @Column({ nullable: true })
  parent_dest_name!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
