import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_supplierinfo', { schema: 'public' })
export class ProductSupplierinfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  partner_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  product_uom_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column()
  currency_id!: number;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column()
  product_tmpl_id!: number;

  @Column()
  delay!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  product_name!: string | null;

  @Column({ nullable: true })
  product_code!: string | null;

  @Column({ nullable: true })
  date_start!: Date | null;

  @Column({ nullable: true })
  date_end!: Date | null;

  @Column()
  min_qty!: number;

  @Column({ nullable: true })
  price!: number | null;

  @Column({ nullable: true })
  discount!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
