import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_package', { schema: 'public' })
export class StockPackage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  package_type_id!: number | null;

  @Column({ nullable: true })
  location_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  parent_package_id!: number | null;

  @Column({ nullable: true })
  package_dest_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  complete_name!: string | null;

  @Column({ nullable: true })
  parent_path!: string | null;

  @Column({ nullable: true })
  pack_date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  shipping_weight!: number | null;

}
