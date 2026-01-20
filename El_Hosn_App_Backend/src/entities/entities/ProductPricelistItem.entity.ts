import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_pricelist_item', { schema: 'public' })
export class ProductPricelistItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  pricelist_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  categ_id!: number | null;

  @Column({ nullable: true })
  product_tmpl_id!: number | null;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column({ nullable: true })
  base_pricelist_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  applied_on!: string;

  @Column()
  display_applied_on!: string;

  @Column()
  base!: string;

  @Column()
  compute_price!: string;

  @Column({ nullable: true })
  min_quantity!: number | null;

  @Column({ nullable: true })
  fixed_price!: number | null;

  @Column({ nullable: true })
  price_discount!: number | null;

  @Column({ nullable: true })
  price_round!: number | null;

  @Column({ nullable: true })
  price_surcharge!: number | null;

  @Column({ nullable: true })
  price_markup!: number | null;

  @Column({ nullable: true })
  price_min_margin!: number | null;

  @Column({ nullable: true })
  price_max_margin!: number | null;

  @Column({ nullable: true })
  date_start!: Date | null;

  @Column({ nullable: true })
  date_end!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  percent_price!: number | null;

}
