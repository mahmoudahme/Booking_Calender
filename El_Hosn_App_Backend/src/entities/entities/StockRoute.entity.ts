import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_route', { schema: 'public' })
export class StockRoute {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  supplied_wh_id!: number | null;

  @Column({ nullable: true })
  supplier_wh_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  product_selectable!: boolean | null;

  @Column({ nullable: true })
  product_categ_selectable!: boolean | null;

  @Column({ nullable: true })
  warehouse_selectable!: boolean | null;

  @Column({ nullable: true })
  package_type_selectable!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  sale_selectable!: boolean | null;

}
